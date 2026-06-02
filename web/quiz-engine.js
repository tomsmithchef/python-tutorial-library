// Browser-native quiz engine inspired by WiliQuiz.
// Runs static lesson drills and imported DOCX/PDF quizzes in the web textbook UI.

(function () {
  const STORAGE_KEY = "python-tutorial-library-quiz-attempts";
  const MAX_ATTEMPTS = 40;

  const quizState = new WeakMap();

  function normalizeLesson(value = "") {
    const raw = String(value).toLowerCase().replace(/\s+/g, "");
    if (/^\d+$/.test(raw)) {
      return `lesson${Number(raw)}`;
    }
    return raw.replace(/^lesson0*/, "lesson");
  }

  function lessonFromPracticeView(view) {
    const id = view?.id || "";
    if (id === "practice-view") {
      return "lesson1";
    }
    const match = id.match(/lesson(\d+)-practice-view/);
    return match ? `lesson${match[1]}` : "";
  }

  function lessonNumber(lessonKey) {
    const match = String(lessonKey).match(/\d+/);
    return match ? Number(match[0]) : 1;
  }

  function cloneQuiz(quiz) {
    return JSON.parse(JSON.stringify(quiz));
  }

  function readAttempts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeAttempts(attempts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts.slice(0, MAX_ATTEMPTS)));
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return iso;
    }
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .replace(/[.;,:!?]+$/g, "")
      .toLowerCase();
  }

  function splitWrittenResponse(value) {
    return String(value || "")
      .split(/[;,\n]+/)
      .map((part) => normalizeText(part))
      .filter(Boolean);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getQuizForLesson(lessonKey) {
    const bank = window.PY_TUTORIAL_QUIZZES || {};
    const quiz = bank[normalizeLesson(lessonKey)];
    return quiz ? cloneQuiz(quiz) : null;
  }

  function createButton(label, className = "button secondary", type = "button") {
    const button = document.createElement("button");
    button.type = type;
    button.className = className;
    button.textContent = label;
    return button;
  }

  function createLauncher(shell, lessonKey) {
    if (shell.querySelector(".quiz-drill-panel")) {
      return;
    }

    const lessonLabel = `Lesson ${lessonNumber(lessonKey)}`;
    const quiz = getQuizForLesson(lessonKey);
    const panel = document.createElement("section");
    panel.className = "quiz-drill-panel";
    panel.dataset.quizLesson = lessonKey;

    panel.innerHTML = `
      <div class="quiz-drill-copy">
        <p class="eyebrow">Drill Mode</p>
        <h2>${lessonLabel} Quiz Drills</h2>
        <p>Practice this lesson with WiliQuiz-style feedback. These drills are separate from the assignment cards and save recent attempts in this browser.</p>
      </div>
      <div class="quiz-drill-actions">
        <button type="button" class="button primary" data-quiz-action="start">Start Lesson Drill</button>
        <button type="button" class="button secondary" data-quiz-action="import">Import Quiz File</button>
        <button type="button" class="button secondary" data-quiz-action="attempts">Review Recent Attempts</button>
      </div>
      <form class="quiz-import-form" hidden>
        <label>
          <span>DOCX or PDF quiz file</span>
          <input type="file" accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required>
        </label>
        <button type="submit" class="button primary">Import and Start</button>
        <p class="quiz-status" data-quiz-import-status></p>
      </form>
      <div class="quiz-attempts" hidden></div>
      <div class="quiz-stage" hidden></div>
    `;

    const tabs = shell.querySelector(".practice-tabs");
    if (tabs) {
      tabs.insertAdjacentElement("beforebegin", panel);
    } else {
      shell.querySelector(".practice-header")?.insertAdjacentElement("afterend", panel);
    }

    const state = {
      lessonKey,
      shell,
      panel,
      stage: panel.querySelector(".quiz-stage"),
      attemptsPanel: panel.querySelector(".quiz-attempts"),
      importForm: panel.querySelector(".quiz-import-form"),
      importStatus: panel.querySelector("[data-quiz-import-status]"),
      session: null
    };
    quizState.set(panel, state);

    panel.querySelector("[data-quiz-action='start']").disabled = !quiz;
    panel.querySelector("[data-quiz-action='start']").addEventListener("click", () => {
      if (quiz) {
        startQuiz(state, quiz);
      }
    });

    panel.querySelector("[data-quiz-action='import']").addEventListener("click", () => {
      state.importForm.hidden = !state.importForm.hidden;
      state.attemptsPanel.hidden = true;
      if (!state.importForm.hidden) {
        state.importForm.querySelector("input")?.focus();
      }
    });

    panel.querySelector("[data-quiz-action='attempts']").addEventListener("click", () => {
      renderAttempts(state);
      state.importForm.hidden = true;
      state.attemptsPanel.hidden = !state.attemptsPanel.hidden;
    });

    state.importForm.addEventListener("submit", (event) => {
      event.preventDefault();
      importQuizFile(state);
    });
  }

  function prepareQuiz(rawQuiz, lessonKey) {
    const quiz = cloneQuiz(rawQuiz);
    quiz.lesson = normalizeLesson(quiz.lesson || lessonKey);
    quiz.questions = Array.isArray(quiz.questions) ? quiz.questions : [];
    quiz.questions = quiz.questions.map((question, index) => ({
      id: question.id || `${quiz.lesson}-q${index + 1}`,
      type: question.type || (question.acceptedAnswers?.length ? "written" : question.correctLabels?.length > 1 ? "multi" : "choice"),
      text: question.text || "",
      options: Array.isArray(question.options) ? question.options : [],
      correctLabels: Array.isArray(question.correctLabels) ? question.correctLabels.map((label) => String(label).toUpperCase()) : [],
      acceptedAnswers: Array.isArray(question.acceptedAnswers) ? question.acceptedAnswers : [],
      hint: question.hint || "",
      explanation: question.explanation || "",
      sourceRef: question.sourceRef || null
    }));
    return quiz;
  }

  function startQuiz(state, rawQuiz) {
    const quiz = prepareQuiz(rawQuiz, state.lessonKey);
    state.session = {
      quiz,
      currentIndex: 0,
      results: {},
      startedAt: new Date().toISOString(),
      saved: false,
      reviewOpen: false
    };
    state.stage.hidden = false;
    state.attemptsPanel.hidden = true;
    state.importForm.hidden = true;
    renderQuestion(state);
    state.stage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function currentQuestion(session) {
    return session.quiz.questions[session.currentIndex];
  }

  function selectedChoiceValues(stage) {
    return Array.from(stage.querySelectorAll("[name='quiz-answer']:checked")).map((input) => input.value);
  }

  function writtenValue(stage) {
    return stage.querySelector("[data-written-answer]")?.value || "";
  }

  function evaluateQuestion(question, selected) {
    if (question.type === "written") {
      const accepted = question.acceptedAnswers.map(normalizeText).filter(Boolean);
      const selectedParts = splitWrittenResponse(selected.join("; "));
      const requiresAll = question.acceptedAnswers.length > 1;
      let matched = [];
      let missed = [];
      let extras = [];

      if (requiresAll) {
        matched = accepted.filter((answer) => selectedParts.includes(answer));
        missed = accepted.filter((answer) => !selectedParts.includes(answer));
        extras = selectedParts.filter((part) => !accepted.includes(part));
      } else {
        matched = selectedParts.filter((part) => accepted.includes(part));
        missed = matched.length ? [] : accepted;
        extras = matched.length ? selectedParts.filter((part) => !accepted.includes(part)) : selectedParts;
      }

      const score = accepted.length ? (requiresAll ? matched.length / accepted.length : (matched.length ? 1 : 0)) : 0;
      return {
        selected,
        score,
        maxScore: 1,
        fullyCorrect: score === 1 && extras.length === 0 && missed.length === 0,
        matched,
        missed,
        extras
      };
    }

    const selectedSet = new Set(selected.map((label) => String(label).toUpperCase()));
    const correctSet = new Set(question.correctLabels.map((label) => String(label).toUpperCase()));
    const correctSelected = [...selectedSet].filter((label) => correctSet.has(label));
    const incorrectSelected = [...selectedSet].filter((label) => !correctSet.has(label));
    const missed = [...correctSet].filter((label) => !selectedSet.has(label));
    const score = correctSet.size ? correctSelected.length / correctSet.size : 0;
    return {
      selected: [...selectedSet],
      score,
      maxScore: 1,
      fullyCorrect: score === 1 && incorrectSelected.length === 0 && missed.length === 0,
      correctSelected,
      incorrectSelected,
      missed
    };
  }

  function recordResult(state, result) {
    const session = state.session;
    const question = currentQuestion(session);
    session.results[question.id] = {
      questionId: question.id,
      questionText: question.text,
      score: result.score,
      maxScore: result.maxScore,
      fullyCorrect: result.fullyCorrect,
      selected: result.selected,
      missed: result.missed || [],
      incorrectSelected: result.incorrectSelected || [],
      matched: result.matched || [],
      extras: result.extras || [],
      skipped: Boolean(result.skipped),
      answeredAt: new Date().toISOString()
    };
  }

  function submitCurrent(state) {
    const session = state.session;
    const question = currentQuestion(session);
    if (!question || session.results[question.id]) {
      return;
    }

    const selected = question.type === "written" ? [writtenValue(state.stage)] : selectedChoiceValues(state.stage);
    if (!selected.some((value) => String(value).trim())) {
      setQuizStatus(state, "Choose or type an answer before submitting.");
      return;
    }

    const result = evaluateQuestion(question, selected);
    recordResult(state, result);
    renderQuestion(state);
  }

  function skipCurrent(state) {
    const session = state.session;
    const question = currentQuestion(session);
    if (!question || session.results[question.id]) {
      return;
    }
    recordResult(state, {
      selected: ["SKIPPED"],
      score: 0,
      maxScore: 1,
      fullyCorrect: false,
      skipped: true,
      missed: question.type === "written" ? question.acceptedAnswers : question.correctLabels
    });
    nextQuestion(state);
  }

  function nextQuestion(state) {
    const session = state.session;
    if (session.currentIndex >= session.quiz.questions.length - 1) {
      renderResults(state);
      return;
    }
    session.currentIndex += 1;
    renderQuestion(state);
  }

  function previousQuestion(state) {
    const session = state.session;
    if (session.currentIndex <= 0) {
      return;
    }
    session.currentIndex -= 1;
    renderQuestion(state);
  }

  function sessionStats(session) {
    const results = session.quiz.questions.map((question) => session.results[question.id]).filter(Boolean);
    const score = results.reduce((total, result) => total + Number(result.score || 0), 0);
    const maxScore = session.quiz.questions.length;
    const fullyCorrect = results.filter((result) => result.fullyCorrect).length;
    const partial = results.filter((result) => !result.fullyCorrect && result.score > 0).length;
    const missed = session.quiz.questions
      .filter((question) => !session.results[question.id]?.fullyCorrect)
      .map((question) => question.id);
    return { results, score, maxScore, fullyCorrect, partial, missed };
  }

  function optionText(question, label) {
    return question.options.find((option) => option.label.toUpperCase() === String(label).toUpperCase())?.text || label;
  }

  function renderQuestion(state) {
    const session = state.session;
    const question = currentQuestion(session);
    if (!question) {
      renderResults(state);
      return;
    }

    const result = session.results[question.id];
    const stats = sessionStats(session);
    const isAnswered = Boolean(result);
    const progress = `${session.currentIndex + 1}/${session.quiz.questions.length}`;
    const inputType = question.type === "multi" ? "checkbox" : "radio";
    const sourceRef = renderSourceRef(question.sourceRef);

    state.stage.innerHTML = `
      <article class="quiz-card">
        <div class="quiz-card-header">
          <div>
            <p class="eyebrow">Active Drill</p>
            <h3>${escapeHtml(session.quiz.title)}</h3>
          </div>
          <div class="quiz-progress">
            <span>${progress}</span>
            <strong>${formatScore(stats.score)} / ${stats.maxScore}</strong>
          </div>
        </div>
        <div class="quiz-progress-bar" aria-hidden="true"><span style="width: ${((session.currentIndex + 1) / session.quiz.questions.length) * 100}%"></span></div>
        <div class="quiz-question">
          <h4>${escapeHtml(question.text)}</h4>
          ${question.hint ? `<details class="quiz-hint"><summary>Hint</summary><p>${escapeHtml(question.hint)}</p></details>` : ""}
          ${sourceRef}
          <div class="quiz-answer-area">
            ${renderAnswerInputs(question, inputType, result)}
          </div>
          ${isAnswered ? renderFeedback(question, result) : ""}
          <p class="quiz-status" data-quiz-status></p>
        </div>
        <div class="quiz-controls">
          <button type="button" class="button secondary" data-quiz-nav="back" ${session.currentIndex === 0 ? "disabled" : ""}>Back</button>
          <button type="button" class="button secondary" data-quiz-nav="skip" ${isAnswered ? "disabled" : ""}>Skip</button>
          <button type="button" class="button primary" data-quiz-nav="submit" ${isAnswered ? "disabled" : ""}>Submit</button>
          <button type="button" class="button primary" data-quiz-nav="next">${session.currentIndex >= session.quiz.questions.length - 1 ? "Results" : "Next"}</button>
          <button type="button" class="button secondary" data-quiz-nav="cancel">Close Drill</button>
        </div>
      </article>
    `;

    state.stage.querySelector("[data-quiz-nav='back']").addEventListener("click", () => previousQuestion(state));
    state.stage.querySelector("[data-quiz-nav='skip']").addEventListener("click", () => skipCurrent(state));
    state.stage.querySelector("[data-quiz-nav='submit']").addEventListener("click", () => submitCurrent(state));
    state.stage.querySelector("[data-quiz-nav='next']").addEventListener("click", () => nextQuestion(state));
    state.stage.querySelector("[data-quiz-nav='cancel']").addEventListener("click", () => {
      state.stage.hidden = true;
      state.session = null;
    });
    bindSourceLinks(state.stage);
  }

  function renderAnswerInputs(question, inputType, result) {
    if (question.type === "written") {
      const value = result && result.selected && result.selected[0] !== "SKIPPED" ? result.selected[0] : "";
      return `
        <label class="quiz-written-label">
          <span>Written response</span>
          <textarea data-written-answer rows="4" ${result ? "disabled" : ""} placeholder="Type your answer here. Use semicolons if the question expects multiple parts.">${escapeHtml(value)}</textarea>
        </label>
      `;
    }

    const selected = new Set((result?.selected || []).map((label) => String(label).toUpperCase()));
    return `
      <div class="quiz-options ${question.type === "multi" ? "multi" : ""}">
        ${question.options.map((option) => {
          const label = String(option.label).toUpperCase();
          const checked = selected.has(label) ? "checked" : "";
          const stateClass = result ? optionStateClass(question, result, label) : "";
          return `
            <label class="quiz-option ${stateClass}">
              <input type="${inputType}" name="quiz-answer" value="${escapeHtml(label)}" ${checked} ${result ? "disabled" : ""}>
              <span class="quiz-option-label">${escapeHtml(label)}</span>
              <span>${escapeHtml(option.text)}</span>
            </label>
          `;
        }).join("")}
      </div>
    `;
  }

  function optionStateClass(question, result, label) {
    const correct = question.correctLabels.map((item) => item.toUpperCase()).includes(label);
    const selected = (result.selected || []).map((item) => String(item).toUpperCase()).includes(label);
    if (correct) {
      return "correct";
    }
    if (selected && !correct) {
      return "incorrect";
    }
    return "muted";
  }

  function renderFeedback(question, result) {
    if (result.skipped) {
      return `
        <div class="quiz-feedback incorrect">
          <strong>Skipped.</strong>
          <p>${escapeHtml(correctAnswerText(question))}</p>
          ${question.explanation ? `<p>${escapeHtml(question.explanation)}</p>` : ""}
        </div>
      `;
    }

    const status = result.fullyCorrect ? "Correct" : result.score > 0 ? "Partial credit" : "Not yet";
    const className = result.fullyCorrect ? "correct" : result.score > 0 ? "partial" : "incorrect";
    const detail = feedbackDetail(question, result);
    return `
      <div class="quiz-feedback ${className}">
        <strong>${status}</strong>
        ${detail ? `<p>${detail}</p>` : ""}
        ${question.explanation ? `<p>${escapeHtml(question.explanation)}</p>` : ""}
        ${!result.fullyCorrect ? `<p>${escapeHtml(correctAnswerText(question))}</p>` : ""}
      </div>
    `;
  }

  function feedbackDetail(question, result) {
    if (question.type === "written") {
      const parts = [];
      if (result.matched?.length) {
        parts.push(`Matched: ${result.matched.join(", ")}`);
      }
      if (result.missed?.length) {
        parts.push(`Missed: ${result.missed.join(", ")}`);
      }
      if (result.extras?.length) {
        parts.push(`Extra: ${result.extras.join(", ")}`);
      }
      return escapeHtml(parts.join(" | "));
    }

    const parts = [];
    if (result.correctSelected?.length) {
      parts.push(`Correct selected: ${result.correctSelected.join(", ")}`);
    }
    if (result.missed?.length) {
      parts.push(`Missed: ${result.missed.join(", ")}`);
    }
    if (result.incorrectSelected?.length) {
      parts.push(`Wrong selection: ${result.incorrectSelected.join(", ")}`);
    }
    return escapeHtml(parts.join(" | "));
  }

  function correctAnswerText(question) {
    if (question.type === "written") {
      return `Expected: ${question.acceptedAnswers.join("; ")}`;
    }
    const labels = question.correctLabels.join(", ");
    const text = question.correctLabels.map((label) => `${label}. ${optionText(question, label)}`).join("; ");
    return `Correct answer${question.correctLabels.length > 1 ? "s" : ""}: ${labels} (${text})`;
  }

  function renderSourceRef(sourceRef) {
    if (!sourceRef || !sourceRef.href) {
      return "";
    }
    const route = sourceRef.route ? ` data-quiz-study-route="${escapeHtml(sourceRef.route)}"` : "";
    return `<a class="page-ref quiz-ref" href="${escapeHtml(sourceRef.href)}"${route}>${escapeHtml(sourceRef.label || "Review study material")}</a>`;
  }

  function bindSourceLinks(container) {
    container.querySelectorAll("[data-quiz-study-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const route = link.dataset.quizStudyRoute;
        const targetSelector = link.getAttribute("href");
        const target = targetSelector ? document.querySelector(targetSelector) : null;
        if (typeof setRoute === "function" && route) {
          event.preventDefault();
          setRoute(route);
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", targetSelector);
            }, 0);
          }
        }
      });
    });
  }

  function setQuizStatus(state, message) {
    const slot = state.stage.querySelector("[data-quiz-status]");
    if (slot) {
      slot.textContent = message;
    }
  }

  function formatScore(value) {
    const number = Number(value || 0);
    return Number.isInteger(number) ? String(number) : number.toFixed(1);
  }

  function renderResults(state) {
    const session = state.session;
    const stats = sessionStats(session);
    const percent = stats.maxScore ? Math.round((stats.score / stats.maxScore) * 100) : 0;
    saveAttempt(state, stats, percent);

    state.stage.innerHTML = `
      <article class="quiz-card quiz-results">
        <p class="eyebrow">Drill Complete</p>
        <h3>${escapeHtml(session.quiz.title)}</h3>
        <div class="quiz-result-grid">
          <div><span>Score</span><strong>${formatScore(stats.score)} / ${stats.maxScore}</strong></div>
          <div><span>Percent</span><strong>${percent}%</strong></div>
          <div><span>Correct</span><strong>${stats.fullyCorrect}</strong></div>
          <div><span>Partial</span><strong>${stats.partial}</strong></div>
        </div>
        <div class="quiz-controls">
          <button type="button" class="button primary" data-quiz-result="retry">Retry Drill</button>
          <button type="button" class="button secondary" data-quiz-result="review">Review Questions</button>
          <button type="button" class="button secondary" data-quiz-result="attempts">Recent Attempts</button>
          <button type="button" class="button secondary" data-quiz-result="close">Close</button>
        </div>
        <div class="quiz-review-list" hidden></div>
      </article>
    `;

    state.stage.querySelector("[data-quiz-result='retry']").addEventListener("click", () => startQuiz(state, session.quiz));
    state.stage.querySelector("[data-quiz-result='review']").addEventListener("click", () => toggleReview(state));
    state.stage.querySelector("[data-quiz-result='attempts']").addEventListener("click", () => {
      renderAttempts(state);
      state.attemptsPanel.hidden = false;
    });
    state.stage.querySelector("[data-quiz-result='close']").addEventListener("click", () => {
      state.stage.hidden = true;
      state.session = null;
    });
  }

  function saveAttempt(state, stats, percent) {
    const session = state.session;
    if (session.saved) {
      return;
    }
    const attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      lesson: normalizeLesson(session.quiz.lesson || state.lessonKey),
      title: session.quiz.title,
      timestamp: new Date().toISOString(),
      score: Number(stats.score.toFixed(3)),
      total: stats.maxScore,
      percent,
      missedQuestionIds: stats.missed,
      complete: true,
      sourceFile: session.quiz.sourceFile || ""
    };
    const attempts = readAttempts();
    attempts.unshift(attempt);
    writeAttempts(attempts);
    session.saved = true;
  }

  function toggleReview(state) {
    const review = state.stage.querySelector(".quiz-review-list");
    if (!review || !state.session) {
      return;
    }
    review.hidden = !review.hidden;
    if (!review.hidden) {
      review.innerHTML = state.session.quiz.questions.map((question, index) => {
        const result = state.session.results[question.id];
        const answer = result?.selected?.join(", ") || "No answer";
        const score = result ? `${formatScore(result.score)} / 1` : "0 / 1";
        return `
          <article class="quiz-review-item">
            <h4>${index + 1}. ${escapeHtml(question.text)}</h4>
            <p><strong>Your answer:</strong> ${escapeHtml(answer)}</p>
            <p><strong>Score:</strong> ${escapeHtml(score)}</p>
            <p><strong>${escapeHtml(correctAnswerText(question))}</strong></p>
            ${question.explanation ? `<p>${escapeHtml(question.explanation)}</p>` : ""}
          </article>
        `;
      }).join("");
    }
  }

  function renderAttempts(state) {
    const attempts = readAttempts().filter((attempt) => normalizeAttachmentLessonShim(attempt.lesson) === normalizeAttachmentLessonShim(state.lessonKey));
    state.attemptsPanel.hidden = false;
    if (!attempts.length) {
      state.attemptsPanel.innerHTML = `
        <section class="quiz-attempt-card">
          <h3>No recent attempts yet.</h3>
          <p>Start a lesson drill or import a quiz file to save your first local attempt.</p>
        </section>
      `;
      return;
    }

    state.attemptsPanel.innerHTML = `
      <section class="quiz-attempt-card">
        <div class="quiz-attempt-head">
          <div>
            <p class="eyebrow">Local History</p>
            <h3>Recent Attempts</h3>
          </div>
          <button type="button" class="button secondary" data-clear-attempts>Clear Lesson History</button>
        </div>
        <div class="quiz-attempt-list">
          ${attempts.map((attempt) => `
            <article>
              <strong>${escapeHtml(attempt.title)}</strong>
              <span>${escapeHtml(formatDate(attempt.timestamp))}</span>
              <b>${escapeHtml(formatScore(attempt.score))} / ${escapeHtml(attempt.total)} (${escapeHtml(attempt.percent)}%)</b>
              ${attempt.missedQuestionIds?.length ? `<small>Review: ${escapeHtml(attempt.missedQuestionIds.join(", "))}</small>` : "<small>All questions fully correct.</small>"}
            </article>
          `).join("")}
        </div>
      </section>
    `;

    state.attemptsPanel.querySelector("[data-clear-attempts]").addEventListener("click", () => {
      const remaining = readAttempts().filter((attempt) => normalizeAttachmentLessonShim(attempt.lesson) !== normalizeAttachmentLessonShim(state.lessonKey));
      writeAttempts(remaining);
      renderAttempts(state);
    });
  }

  function normalizeAttachmentLessonShim(value) {
    return normalizeLesson(value);
  }

  async function importQuizFile(state) {
    const input = state.importForm.querySelector("input[type='file']");
    const file = input?.files?.[0];
    if (!file) {
      state.importStatus.textContent = "Choose a DOCX or PDF file first.";
      return;
    }

    if (location.protocol === "file:") {
      state.importStatus.textContent = "File import needs the deployed Vercel site or a local server with /api/import-quiz.";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    state.importStatus.textContent = "Importing quiz file...";

    try {
      const response = await fetch("/api/import-quiz", {
        method: "POST",
        body: formData
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "The import failed.");
      }
      if (!payload.questions || !payload.questions.length) {
        throw new Error("No questions were found in that file.");
      }
      const importedQuiz = {
        lesson: state.lessonKey,
        title: payload.title || file.name,
        sourceFile: payload.sourceFile || file.name,
        questions: payload.questions
      };
      state.importStatus.textContent = payload.warnings?.length ? payload.warnings.join(" ") : "Import ready.";
      startQuiz(state, importedQuiz);
    } catch (error) {
      state.importStatus.textContent = error.message || "The import failed.";
    }
  }

  function initQuizDrills() {
    document.querySelectorAll(".practice-shell").forEach((shell) => {
      const lessonKey = lessonFromPracticeView(shell.closest(".view"));
      if (lessonKey) {
        createLauncher(shell, lessonKey);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuizDrills);
  } else {
    initQuizDrills();
  }
})();
