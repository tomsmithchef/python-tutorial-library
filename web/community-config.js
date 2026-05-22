// Supabase connection settings for the Python Class Board.
//
// 1. Create a Supabase project.
// 2. Run ../supabase/class-board-schema.sql in the Supabase SQL editor.
// 3. Replace the placeholder values below with your Project URL and anon public key.
//
// The anon key is safe to use in browser code when Row Level Security policies
// are enabled. Do not put service-role keys in this file.
window.PY_TUTORIAL_SUPABASE = {
  // This must be the Supabase Project URL, not the Vercel website URL.
  // It usually looks like: https://your-project-ref.supabase.co
  url: "https://xcmqqtdeqpmpryzocwpu.supabase.co",

  // This must be the publishable/anon public key from Supabase Project Settings > API.
  // New keys usually start with "sb_publishable_"; older anon keys often start with "eyJ".
  // Do not use the service-role or secret key.
  anonKey: "sb_publishable_M8QNKDPd6NKA7EY2JClFOg_YZAuwxGt",
};
