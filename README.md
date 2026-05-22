# Python Tutorial Library

This folder contains a self-contained web textbook for the first four Python fundamentals lessons. It was built from the original lesson PDFs and assignment text files, with the study material rewritten into longer beginner-friendly explanations.

## What Is Included

- `web/index.html` - the main website file to open in a browser
- `web/styles.css` - the website styling
- `web/app.js` - navigation, tabs, hints, code-copy behavior, and the optional Class Board
- `web/community-config.js` - Supabase connection settings for the optional Class Board
- `supabase/class-board-schema.sql` - database tables and security policies for the Class Board
- `Lesson 1.pdf` through `Lesson 4.pdf` - original lesson slide decks
- `Lesson 1 Assignments.txt` through `Lesson 4 Assignments.txt` - assignment/lab source text
- `lesson_tutorial.py` - older terminal version kept for reference

The website itself only needs the `web` folder. The PDFs and assignment text files are included as source/reference material.
The optional Class Board also needs a Supabase project if you want classmates to sign in, post, and comment.

## How To Run The Website

1. Keep the whole project folder together.
2. Open the `web` folder.
3. Double-click `index.html`.
4. The site should open in your default browser.

If double-clicking does not work, right-click `index.html`, choose **Open with**, then select Chrome, Edge, Firefox, or another browser.

## Recommended Folder Layout

Do not move `index.html` away from `styles.css` or `app.js`. They work together from the same `web` folder.

```text
Python Tutorial Library/
  README.md
  Lesson 1.pdf
  Lesson 1 Assignments.txt
  Lesson 2.pdf
  Lesson 2 Assignments.txt
  Lesson 3.pdf
  Lesson 3 Assignments.txt
  Lesson 4.pdf
  Lesson 4 Assignments.txt
  lesson_tutorial.py
  supabase/
    class-board-schema.sql
  web/
    index.html
    styles.css
    app.js
    community-config.js
```

## How To Use The Site

- Use **Chapters** to return to the chapter selection page.
- Open a lesson card to read the study material.
- Use the left table of contents inside each lesson to jump between topics.
- Use **Testing** to jump to the practice/assignment page for the current lesson.
- Use **Community** to open the optional Class Board for questions, code snippets, and class discussion.
- Concept reminders are hidden by default. Open them only when you need a hint.
- The testing pages do not provide completed solutions.

## Optional: Enable The Class Board

The Class Board is built into the site, but it is disabled until Supabase is configured. Supabase provides the user accounts, database, and real-time post/comment updates.

1. Create a Supabase project at `https://supabase.com`.
2. In the Supabase dashboard, choose your new project.
3. Open **SQL Editor** from the left sidebar.
4. Choose **New query**.
5. Open `supabase/class-board-schema.sql` from this project folder.
6. Copy the whole SQL file into the Supabase query editor.
7. Click **Run**. This creates the `profiles`, `board_posts`, and `board_comments` tables, enables Row Level Security, and adds the policies that protect user content.
8. In Supabase, go to **Project Settings > API**.
9. Copy the **Project URL**. It looks like `https://your-project-id.supabase.co`.
10. Copy the **anon public** key. Do not copy the service-role key.
11. Open `web/community-config.js`.
12. Replace `YOUR_PROJECT_URL` and `YOUR_SUPABASE_ANON_PUBLIC_KEY` with the values from Supabase.
13. Open `web/index.html`, then choose **Community**.

The anon key is safe for browser code when Row Level Security is enabled. The schema file enables RLS and includes policies so public visitors can read posts, but only signed-in users can create posts or comments, and users can only delete their own content.

Do not put a Supabase service-role key in `web/community-config.js`.

To make yourself a moderator, create your account through the site first, then run this in the Supabase SQL editor with your email address:

```sql
update public.profiles
set role = 'admin'
where id = (
  select id
  from auth.users
  where email = 'your-email@example.com'
);
```

Admins can delete any post or comment. Regular students can only delete their own posts and comments.

## Sharing With A Classmate

Send the entire `Python Tutorial Library` folder as a zip file. Your classmate should unzip it first, then open:

```text
web/index.html
```

No installation is required to read the website. A modern browser is enough.

If you enable the Class Board, the shared site needs to be hosted somewhere public, such as Netlify, Vercel, or GitHub Pages, so everyone reaches the same Supabase-backed board. If classmates open separate zipped copies locally, they can still connect to the same Supabase database as long as `community-config.js` contains the same project settings.

## Getting A Public URL

Right now the project is just files on your computer, so classmates cannot visit it through a URL yet. The fastest path is Netlify:

1. Create a free Netlify account.
2. Open Netlify and choose **Add new site > Deploy manually**.
3. Drag the `web` folder into Netlify.
4. Netlify gives you a public URL.
5. Share that URL with classmates.

For a cleaner long-term setup, put the project in GitHub and connect the repository to Vercel or Netlify. Then every update can be deployed from GitHub instead of dragging files manually.

## Optional: Run With A Local Server

The site can be opened directly, but a local server also works if you prefer.

From inside the `web` folder, run:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

This optional step requires Python to be installed and available from the terminal.
