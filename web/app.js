const routes = {
  home: document.querySelector("#home-view"),
  testing: document.querySelector("#testing-view"),
  study: document.querySelector("#study-view"),
  practice: document.querySelector("#practice-view"),
  "lesson2-study": document.querySelector("#lesson2-study-view"),
  "lesson2-practice": document.querySelector("#lesson2-practice-view"),
  "lesson3-study": document.querySelector("#lesson3-study-view"),
  "lesson3-practice": document.querySelector("#lesson3-practice-view"),
  "lesson4-study": document.querySelector("#lesson4-study-view"),
  "lesson4-practice": document.querySelector("#lesson4-practice-view"),
  community: document.querySelector("#community-view"),
};

const routeLabels = {
  home: ["Chapters", "home", "Chapter Select"],
  testing: ["Testing", "testing", "Choose a Lesson"],
  study: ["Lesson 1", "study", "Introduction to Python"],
  practice: ["Lesson 1", "study", "Testing Environment"],
  "lesson2-study": ["Lesson 2", "lesson2-study", "Flow Control and Loops"],
  "lesson2-practice": ["Lesson 2", "lesson2-study", "Testing Environment"],
  "lesson3-study": ["Lesson 3", "lesson3-study", "Python Functions"],
  "lesson3-practice": ["Lesson 3", "lesson3-study", "Testing Environment"],
  "lesson4-study": ["Lesson 4", "lesson4-study", "File I/O and Modules"],
  "lesson4-practice": ["Lesson 4", "lesson4-study", "Testing Environment"],
  community: ["Community", "community", "Class Board"],
};

let currentRoute = "home";

function setRoute(routeName) {
  const safeRoute = routes[routeName] ? routeName : "home";
  currentRoute = safeRoute;

  for (const [name, view] of Object.entries(routes)) {
    view.classList.toggle("active", name === safeRoute);
  }

  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === safeRoute);
  });
  document.querySelector("#testing-nav")?.classList.toggle("active", safeRoute === "testing" || safeRoute.includes("practice"));

  const [lessonLabel, lessonRoute, pageLabel] = routeLabels[safeRoute] || routeLabels.home;
  const lessonCrumb = document.querySelector("#crumb-lesson");
  const pageCrumb = document.querySelector("#crumb-page");
  const footerNext = document.querySelector("[data-footer-next]");
  if (lessonCrumb && pageCrumb) {
    lessonCrumb.textContent = lessonLabel;
    lessonCrumb.dataset.route = lessonRoute;
    lessonCrumb.setAttribute("href", `#${lessonRoute}`);
    pageCrumb.textContent = pageLabel;
  }

  if (footerNext) {
    const nextRoutes = {
      study: ["Proceed to Lesson 2", "lesson2-study"],
      practice: ["Proceed to Lesson 2", "lesson2-study"],
      "lesson2-study": ["Proceed to Lesson 3", "lesson3-study"],
      "lesson2-practice": ["Proceed to Lesson 3", "lesson3-study"],
      "lesson3-study": ["Proceed to Lesson 4", "lesson4-study"],
      "lesson3-practice": ["Proceed to Lesson 4", "lesson4-study"],
      "lesson4-study": ["Return to Chapters", "home"],
      "lesson4-practice": ["Return to Chapters", "home"],
    };
    const next = nextRoutes[safeRoute];
    footerNext.hidden = !next;
    if (next) {
      footerNext.textContent = next[0];
      footerNext.dataset.route = next[1];
      footerNext.setAttribute("href", `#${next[1]}`);
    }
  }

  if (location.hash.replace("#", "") !== safeRoute) {
    history.replaceState(null, "", `#${safeRoute}`);
  }

  window.scrollTo({ top: 0, behavior: "instant" });

  if (safeRoute === "community") {
    initCommunityBoard();
  }
}

function routeFromHash() {
  const hash = location.hash.replace("#", "");
  if (hash.includes("access_token=") || hash.includes("refresh_token=") || hash.includes("type=signup")) {
    return "community";
  }
  if (hash.startsWith("study-")) {
    return "study";
  }
  if (hash.startsWith("lesson2-") && !routes[hash]) {
    return "lesson2-study";
  }
  if (hash.startsWith("lesson3-") && !routes[hash]) {
    return "lesson3-study";
  }
  if (hash.startsWith("lesson4-") && !routes[hash]) {
    return "lesson4-study";
  }
  return hash || "home";
}

document.querySelectorAll("[data-route]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute(link.dataset.route);
  });
});

document.querySelectorAll("[data-scroll-top]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("hashchange", () => {
  setRoute(routeFromHash());
});

document.querySelectorAll(".sidebar a[href^='#study-']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute("study");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  });
});

document.querySelectorAll(".sidebar a[href^='#lesson2-']:not([data-route])").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute("lesson2-study");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  });
});

document.querySelectorAll(".sidebar a[href^='#lesson3-']:not([data-route])").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute("lesson3-study");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  });
});

document.querySelectorAll(".sidebar a[href^='#lesson4-']:not([data-route])").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute("lesson4-study");
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  });
});

document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".code-card");
    const code = card?.querySelector("code")?.innerText ?? "";

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1200);
    } catch {
      button.textContent = "Select code";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    }
  });
});

document.querySelectorAll("[data-practice-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const panelId = tab.dataset.practiceTab;
    const shell = tab.closest(".practice-shell");

    shell.querySelectorAll("[data-practice-tab]").forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    shell.querySelectorAll(".practice-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === panelId);
    });
  });
});

const boardState = {
  initialized: false,
  configured: false,
  client: null,
  user: null,
  session: null,
  profiles: new Map(),
  comments: new Map(),
  channel: null,
  signingOut: false,
  ignoreAuthUntil: 0,
  hasLoadedPosts: false,
  refreshTimer: null,
  isLoadingPosts: false,
};

const REQUEST_TIMEOUT_MS = 12000;
const AUTH_STORAGE_KEY = "python-tutorial-library-auth";

function withTimeout(promise, label, timeoutMs = REQUEST_TIMEOUT_MS) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(`${label} timed out. Check the Supabase project URL, public key, network access, and table policies.`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function friendlyBoardError(error) {
  const message = error?.message || String(error || "Something went wrong.");
  if (error?.details || error?.hint || error?.code) {
    return [message, error.details, error.hint, error.code ? `Code: ${error.code}` : ""].filter(Boolean).join(" ");
  }
  if (message.includes("lesson") || message.includes("category")) {
    return `${message}. Your Supabase table may still have the old lesson/category columns. Re-run the latest supabase/class-board-schema.sql file.`;
  }
  if (message.includes("row-level security") || message.includes("violates row-level security")) {
    return `${message}. Confirm the class-board SQL policies were run in Supabase.`;
  }
  return message;
}

async function supabaseRest(path, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const config = window.PY_TUTORIAL_SUPABASE;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  const { accessToken, headers: optionHeaders = {}, ...fetchOptions } = options;
  const headers = {
    apikey: config.anonKey,
    Authorization: `Bearer ${accessToken || config.anonKey}`,
    ...optionHeaders,
  };

  try {
    const response = await fetch(`${config.url}/rest/v1/${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    const text = await response.text();
    let body = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }

    if (!response.ok) {
      const error = typeof body === "object" && body ? body : { message: text || response.statusText };
      error.status = response.status;
      throw error;
    }

    return body;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Supabase did not answer the post request before the browser timed out. Check the browser console Network tab for a blocked POST request to /rest/v1/board_posts.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) {
    return "";
  }
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function boardMessage(id, message, isError = false) {
  const target = document.querySelector(id);
  if (!target) {
    return;
  }
  target.textContent = message;
  target.classList.toggle("error", isError);
}

function clearSupabaseAuthStorage() {
  const authKeys = [AUTH_STORAGE_KEY];
  const stores = [window.localStorage, window.sessionStorage];

  stores.forEach((store) => {
    try {
      authKeys.forEach((key) => store.removeItem(key));
      Object.keys(store).forEach((key) => {
        if ((key.startsWith("sb-") && key.includes("auth-token")) || key.includes("supabase.auth.token")) {
          store.removeItem(key);
        }
      });
    } catch {
      // Browser privacy settings can block storage access. Sign-out still updates the visible UI.
    }
  });
}

function selectAuthPanel(panelId) {
  const selectedPanel = panelId || "login-form";
  document.querySelectorAll("[data-auth-panel]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authPanel === selectedPanel);
  });
  document.querySelectorAll(".auth-panel").forEach((panel) => {
    panel.hidden = panel.id !== selectedPanel;
    panel.classList.toggle("active", panel.id === selectedPanel);
  });
}

function renderPostsLoading() {
  const postsList = document.querySelector("#posts-list");
  if (!postsList) {
    return;
  }
  postsList.innerHTML = `
    <article class="post-card empty-card">
      <h3>Loading class posts...</h3>
      <p>Checking the class board database.</p>
    </article>
  `;
}

function schedulePostsRefresh(delayMs = 350) {
  window.clearTimeout(boardState.refreshTimer);
  boardState.refreshTimer = window.setTimeout(() => {
    loadPosts({ showLoading: false });
  }, delayMs);
}

function isBoardConfigured() {
  const config = window.PY_TUTORIAL_SUPABASE || {};
  const url = config.url || "";
  const anonKey = config.anonKey || "";
  const hasValidPublicKey = anonKey.startsWith("sb_publishable_") || anonKey.startsWith("eyJ");
  return Boolean(
    url.startsWith("https://")
      && url.includes(".supabase.")
      && anonKey.length > 25
      && hasValidPublicKey
      && !url.includes("YOUR_PROJECT")
      && !anonKey.includes("YOUR_SUPABASE")
  );
}

function getBoardConfigMessage() {
  const config = window.PY_TUTORIAL_SUPABASE || {};
  const url = config.url || "";
  const anonKey = config.anonKey || "";

  if (!url || url.includes("YOUR_PROJECT")) {
    return "Supabase is not connected yet. Add your Supabase Project URL to web/community-config.js.";
  }
  if (url.includes("vercel.app")) {
    return "The board URL is set to the Vercel website. Use the Supabase Project URL instead, usually https://your-project-ref.supabase.co.";
  }
  if (!url.includes(".supabase.")) {
    return "The board URL does not look like a Supabase Project URL. It should usually end with .supabase.co.";
  }
  if (!anonKey || anonKey.includes("YOUR_SUPABASE")) {
    return "Add the anon public key from Supabase Project Settings > API to web/community-config.js.";
  }
  if (!anonKey.startsWith("sb_publishable_") && !anonKey.startsWith("eyJ")) {
    return "The public key does not look complete. Copy the publishable/anon public key from Supabase Project Settings > API. New keys usually start with sb_publishable_; older anon keys often start with eyJ.";
  }
  return "Supabase is not connected yet. Check web/community-config.js.";
}

function setBoardEnabled(enabled) {
  document.querySelectorAll("#community-view input, #community-view textarea, #community-view select, #community-view button")
    .forEach((field) => {
      if (field.id !== "refresh-posts") {
        field.disabled = !enabled;
      }
    });
  document.querySelector("#refresh-posts")?.toggleAttribute("disabled", !enabled);
  document.querySelector("#auth-card")?.classList.toggle("setup-required", !enabled);
  document.querySelector("#community-setup")?.classList.toggle("is-connected", enabled);
  document.querySelector("#thread-composer")?.classList.toggle("is-locked", !enabled || !boardState.user);
  if (!enabled) {
    boardMessage("#auth-message", "Connect Supabase before signing in.");
    boardMessage("#post-message", "Connect Supabase and sign in before posting.");
  }
}

async function initCommunityBoard() {
  if (boardState.initialized) {
    return;
  }
  boardState.initialized = true;

  if (!isBoardConfigured()) {
    boardMessage(
      "#community-status",
      getBoardConfigMessage()
    );
    setBoardEnabled(false);
    return;
  }

  if (!window.supabase?.createClient) {
    boardMessage(
      "#community-status",
      "Supabase is configured, but the Supabase browser library did not load. Check your internet connection or CDN access.",
      true
    );
    setBoardEnabled(false);
    return;
  }

  const config = window.PY_TUTORIAL_SUPABASE;
  boardState.client = window.supabase.createClient(config.url, config.anonKey, {
    auth: {
      storageKey: AUTH_STORAGE_KEY,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  boardState.configured = true;
  setBoardEnabled(true);
  boardMessage("#community-status", "Connected. Recent class posts will appear here.");

  bindCommunityEvents();
  await refreshSession();
  await loadPosts({ showLoading: true });
  subscribeToBoardChanges();
}

function bindCommunityEvents() {
  document.querySelectorAll("[data-auth-panel]").forEach((tab) => {
    tab.addEventListener("click", () => {
      selectAuthPanel(tab.dataset.authPanel);
      boardMessage("#auth-message", "");
    });
  });

  document.querySelector("#login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await signIn();
  });

  document.querySelector("#signup-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await signUp();
  });

  document.querySelector("#signout-button")?.addEventListener("click", async () => {
    await signOut();
  });

  document.querySelector("#post-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await createPost();
  });

  document.querySelector("#refresh-posts")?.addEventListener("click", () => loadPosts({ showLoading: true }));
  document.querySelector("#posts-list")?.addEventListener("submit", async (event) => {
    if (event.target.matches(".comment-form")) {
      event.preventDefault();
      await createComment(event.target);
    }
  });

  document.querySelector("#posts-list")?.addEventListener("click", async (event) => {
    const deletePostButton = event.target.closest("[data-delete-post]");
    const deleteCommentButton = event.target.closest("[data-delete-comment]");
    if (deletePostButton) {
      await deletePost(deletePostButton.dataset.deletePost);
    }
    if (deleteCommentButton) {
      await deleteComment(deleteCommentButton.dataset.deleteComment);
    }
  });

  boardState.client.auth.onAuthStateChange(async (event, session) => {
    if (boardState.signingOut) {
      return;
    }
    if (session?.user && Date.now() < boardState.ignoreAuthUntil) {
      return;
    }
    const previousUserId = boardState.user?.id || null;
    boardState.session = session || null;
    boardState.user = session?.user || null;
    updateAuthUi();
    if (event !== "TOKEN_REFRESHED" || previousUserId !== (boardState.user?.id || null)) {
      await loadPosts({ showLoading: false });
    }
  });
}

async function refreshSession() {
  try {
    const { data, error } = await withTimeout(boardState.client.auth.getSession(), "Checking sign-in session");
    if (error) {
      boardMessage("#auth-message", friendlyBoardError(error), true);
      return;
    }
    boardState.session = data.session || null;
    boardState.user = data.session?.user || null;
    updateAuthUi();
  } catch (error) {
    boardMessage("#auth-message", friendlyBoardError(error), true);
  }
}

function updateAuthUi() {
  const authTabs = document.querySelector(".auth-tabs");
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  const signedInPanel = document.querySelector("#signed-in-panel");
  const signedInLabel = document.querySelector("#signed-in-label");
  const postForm = document.querySelector("#post-form");
  const composer = document.querySelector("#thread-composer");

  if (!authTabs || !loginForm || !signupForm || !signedInPanel || !signedInLabel || !postForm) {
    return;
  }

  const isSignedIn = Boolean(boardState.user);
  authTabs.hidden = isSignedIn;
  loginForm.hidden = isSignedIn;
  signupForm.hidden = true;
  signedInPanel.hidden = !isSignedIn;
  postForm.querySelectorAll("input, textarea, select, button").forEach((field) => {
    field.disabled = !isSignedIn;
  });
  composer?.classList.toggle("is-locked", !isSignedIn);

  if (isSignedIn) {
    const name = boardState.user.user_metadata?.display_name || boardState.user.email;
    signedInLabel.innerHTML = `
      <div class="identity-card">
        <p class="identity-name">${escapeHtml(name)}</p>
        <p class="identity-email">${escapeHtml(boardState.user.email || "")}</p>
      </div>
    `;
    boardMessage("#auth-message", "");
  } else {
    loginForm.reset();
    signupForm.reset();
    selectAuthPanel("login-form");
    boardMessage("#auth-message", "Sign in to start threads or comment.");
  }
}

async function signIn() {
  const email = document.querySelector("#login-email")?.value.trim();
  const password = document.querySelector("#login-password")?.value;
  boardState.ignoreAuthUntil = 0;
  boardMessage("#auth-message", "Signing in...");
  try {
    const { data, error } = await withTimeout(
      boardState.client.auth.signInWithPassword({ email, password }),
      "Signing in"
    );
    if (error) {
      boardMessage("#auth-message", friendlyBoardError(error), true);
      return;
    }
    boardState.session = data.session || null;
    boardState.user = data.user || data.session?.user || null;
    updateAuthUi();
    boardMessage("#auth-message", "Signed in.");
  } catch (error) {
    boardMessage("#auth-message", friendlyBoardError(error), true);
  }
}

async function signOut() {
  boardState.signingOut = true;
  boardState.ignoreAuthUntil = Date.now() + 10000;
  boardState.user = null;
  boardState.session = null;
  clearSupabaseAuthStorage();
  updateAuthUi();
  boardMessage("#auth-message", "Signing out on this browser...");
  boardMessage("#post-message", "");
  let signOutMessage = "Signed out.";

  try {
    const { error } = await withTimeout(boardState.client.auth.signOut({ scope: "local" }), "Signing out", 6000);
    if (error) {
      signOutMessage = "Signed out locally. Supabase was slow to confirm the remote session cleanup.";
      return;
    }
  } catch (error) {
    signOutMessage = "Signed out locally. Supabase was slow to confirm the remote session cleanup.";
  } finally {
    clearSupabaseAuthStorage();
    boardState.user = null;
    boardState.session = null;
    boardState.signingOut = false;
    updateAuthUi();
    loadPosts({ showLoading: false });
    boardMessage("#auth-message", signOutMessage);
  }
}

async function signUp() {
  const email = document.querySelector("#signup-email")?.value.trim();
  const password = document.querySelector("#signup-password")?.value;
  const displayName = document.querySelector("#signup-name")?.value.trim() || email?.split("@")[0];
  const emailRedirectTo = `${window.location.origin}${window.location.pathname}`;
  boardState.ignoreAuthUntil = 0;
  boardMessage("#auth-message", "Creating account...");
  try {
    const { data, error } = await withTimeout(
      boardState.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: {
            display_name: displayName,
            app_name: "Python Tutorial Library",
          },
        },
      }),
      "Creating account"
    );
    if (error) {
      boardMessage("#auth-message", friendlyBoardError(error), true);
      return;
    }
    if (data.user) {
      await upsertProfile(data.user, displayName);
    }
    boardMessage("#auth-message", "Account created. If email confirmation is enabled, check your inbox before signing in.");
  } catch (error) {
    boardMessage("#auth-message", friendlyBoardError(error), true);
  }
}

async function upsertProfile(user, displayName) {
  try {
    const { error } = await withTimeout(
      boardState.client.from("profiles").upsert({
        id: user.id,
        display_name: displayName || user.email?.split("@")[0] || "Classmate",
      }),
      "Saving profile"
    );
    if (error) {
      boardMessage("#auth-message", friendlyBoardError(error), true);
    }
  } catch (error) {
    boardMessage("#auth-message", friendlyBoardError(error), true);
  }
}

async function ensureWriteSession(messageTarget = "#post-message") {
  if (!boardState.user) {
    boardMessage(messageTarget, "Sign in before posting.", true);
    return false;
  }

  if (!boardState.session?.access_token) {
    try {
      const { data, error } = await withTimeout(boardState.client.auth.getSession(), "Checking post session", 5000);
      if (error) {
        boardMessage(messageTarget, friendlyBoardError(error), true);
        return false;
      }
      boardState.session = data.session || null;
      boardState.user = data.session?.user || boardState.user;
    } catch (error) {
      boardMessage(messageTarget, "Your sign-in session could not be read. Sign out, sign in again, then retry.", true);
      return false;
    }
  }

  if (!boardState.session?.access_token) {
    boardMessage(messageTarget, "Your sign-in session is missing an access token. Sign out, sign in again, then retry.", true);
    return false;
  }

  return true;
}

async function createPost() {
  if (!(await ensureWriteSession("#post-message"))) {
    return;
  }

  const postForm = document.querySelector("#post-form");
  const submitButton = postForm?.querySelector("button[type='submit']");
  const originalLabel = submitButton?.textContent || "Post thread";
  const payload = {
    user_id: boardState.user.id,
    title: document.querySelector("#post-title").value.trim(),
    body: document.querySelector("#post-body").value.trim(),
    code_snippet: document.querySelector("#post-code").value.trim() || null,
  };

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Posting...";
  }
  boardMessage("#post-message", "Posting...");

  try {
    await supabaseRest("board_posts", {
      method: "POST",
      accessToken: boardState.session.access_token,
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    postForm.reset();
    boardMessage("#post-message", "Thread posted.");
    await loadPosts({ showLoading: false });
    document.querySelector("#thread-composer")?.removeAttribute("open");
  } catch (error) {
    boardMessage("#post-message", friendlyBoardError(error), true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
}

async function loadPosts({ showLoading = false } = {}) {
  if (!boardState.configured) {
    return;
  }
  if (boardState.isLoadingPosts && !showLoading) {
    return;
  }

  boardState.isLoadingPosts = true;
  if (showLoading || !boardState.hasLoadedPosts) {
    renderPostsLoading();
  }

  try {
    const posts = await supabaseRest("board_posts?select=*&order=created_at.desc&limit=50");
    await loadRelatedData(posts || []);
    renderPosts(posts || []);
    boardState.hasLoadedPosts = true;
  } catch (error) {
    renderPostError(friendlyBoardError(error));
  } finally {
    boardState.isLoadingPosts = false;
  }
}

async function loadRelatedData(posts) {
  const postIds = posts.map((post) => post.id);
  const userIds = new Set(posts.map((post) => post.user_id));
  if (boardState.user?.id) {
    userIds.add(boardState.user.id);
  }
  boardState.comments = new Map();
  boardState.profiles = new Map();

  if (postIds.length) {
    const postFilter = encodeURIComponent(`in.(${postIds.join(",")})`);
    const comments = await supabaseRest(`board_comments?select=*&post_id=${postFilter}&order=created_at.asc`);

    (comments || []).forEach((comment) => {
      userIds.add(comment.user_id);
      const group = boardState.comments.get(comment.post_id) || [];
      group.push(comment);
      boardState.comments.set(comment.post_id, group);
    });
  }

  if (userIds.size) {
    const userFilter = encodeURIComponent(`in.(${Array.from(userIds).join(",")})`);
    const profiles = await supabaseRest(`profiles?select=id,display_name,role&id=${userFilter}`);

    (profiles || []).forEach((profile) => {
      boardState.profiles.set(profile.id, profile);
    });
  }
}

function profileName(userId) {
  return boardState.profiles.get(userId)?.display_name || "Classmate";
}

function canModerate(userId) {
  if (!boardState.user) {
    return false;
  }
  const currentProfile = boardState.profiles.get(boardState.user.id);
  return boardState.user.id === userId || currentProfile?.role === "admin";
}

function renderPostError(message) {
  const postsList = document.querySelector("#posts-list");
  postsList.innerHTML = `
    <article class="post-card empty-card">
      <h3>Could not load posts.</h3>
      <p>${escapeHtml(message)}</p>
    </article>
  `;
}

function renderPosts(posts) {
  const postsList = document.querySelector("#posts-list");
  if (!postsList) {
    return;
  }

  if (!posts.length) {
    postsList.innerHTML = `
      <article class="post-card empty-card">
        <h3>No threads yet.</h3>
        <p>Start the first discussion when you have a question, idea, or useful code note.</p>
      </article>
    `;
    return;
  }

  postsList.innerHTML = posts.map(renderPost).join("");
}

function renderPost(post) {
  const canDelete = canModerate(post.user_id);
  const comments = boardState.comments.get(post.id) || [];
  const codeBlock = post.code_snippet
    ? `<pre class="post-code"><code>${escapeHtml(post.code_snippet)}</code></pre>`
    : "";
  const deleteButton = canDelete
    ? `<button type="button" class="button secondary" data-delete-post="${post.id}">Delete thread</button>`
    : "";
  const commentForm = boardState.user
    ? `
      <form class="comment-form" data-post-id="${post.id}">
        <textarea name="comment" rows="3" required placeholder="Add a helpful reply or follow-up question."></textarea>
        <button type="submit" class="button secondary">Comment</button>
      </form>
    `
    : `<p class="small-note">Sign in to comment.</p>`;

  return `
    <article class="post-card">
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">
        <span>Posted by ${escapeHtml(profileName(post.user_id))}</span>
        <span>${escapeHtml(formatDate(post.created_at))}</span>
      </div>
      <p class="post-body">${escapeHtml(post.body)}</p>
      ${codeBlock}
      <div class="post-tools">${deleteButton}</div>
      <div class="comments-list">
        ${comments.map(renderComment).join("")}
      </div>
      ${commentForm}
    </article>
  `;
}

function renderComment(comment) {
  const canDelete = canModerate(comment.user_id);
  const deleteButton = canDelete
    ? `<button type="button" class="button secondary" data-delete-comment="${comment.id}">Delete</button>`
    : "";

  return `
    <div class="comment-card">
      <div class="comment-meta">
        <strong>${escapeHtml(profileName(comment.user_id))}</strong>
        <span>${escapeHtml(formatDate(comment.created_at))}</span>
        ${deleteButton}
      </div>
      <p>${escapeHtml(comment.body)}</p>
    </div>
  `;
}

async function createComment(form) {
  if (!(await ensureWriteSession("#post-message"))) {
    return;
  }
  const body = form.elements.comment.value.trim();
  if (!body) {
    return;
  }
  const submitButton = form.querySelector("button[type='submit']");
  const originalLabel = submitButton?.textContent || "Comment";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Posting...";
  }

  try {
    await supabaseRest("board_comments", {
      method: "POST",
      accessToken: boardState.session.access_token,
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        post_id: form.dataset.postId,
        user_id: boardState.user.id,
        body,
      }),
    });
  } catch (error) {
    window.alert(friendlyBoardError(error));
    return;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
  form.reset();
  await loadPosts({ showLoading: false });
}

async function deletePost(postId) {
  if (!window.confirm("Delete this thread and its comments?")) {
    return;
  }
  if (!(await ensureWriteSession("#post-message"))) {
    return;
  }
  try {
    await supabaseRest(`board_posts?id=eq.${encodeURIComponent(postId)}`, {
      method: "DELETE",
      accessToken: boardState.session.access_token,
      headers: {
        Prefer: "return=minimal",
      },
    });
  } catch (error) {
    window.alert(friendlyBoardError(error));
    return;
  }
  await loadPosts({ showLoading: false });
}

async function deleteComment(commentId) {
  if (!(await ensureWriteSession("#post-message"))) {
    return;
  }
  try {
    await supabaseRest(`board_comments?id=eq.${encodeURIComponent(commentId)}`, {
      method: "DELETE",
      accessToken: boardState.session.access_token,
      headers: {
        Prefer: "return=minimal",
      },
    });
  } catch (error) {
    window.alert(friendlyBoardError(error));
    return;
  }
  await loadPosts({ showLoading: false });
}

function subscribeToBoardChanges() {
  if (boardState.channel) {
    return;
  }
  boardState.channel = boardState.client
    .channel("class-board")
    .on("postgres_changes", { event: "*", schema: "public", table: "board_posts" }, () => schedulePostsRefresh())
    .on("postgres_changes", { event: "*", schema: "public", table: "board_comments" }, () => schedulePostsRefresh())
    .subscribe();
}

setRoute(routeFromHash());
