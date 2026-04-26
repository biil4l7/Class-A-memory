// ═══════════════════════════════════════════════════════════
//  supabase.js — database connection & all queries
// ═══════════════════════════════════════════════════════════

const SUPABASE_URL      = 'https://rpvrfjksgyigqvwmwoeg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwdnJmamtzZ3lpZ3F2d213b2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzk1MzQsImV4cCI6MjA5MjcxNTUzNH0.JTgWliEDpsLpgaaVmMkmFtKUwyF0Qeeyf_RKnD5P9U0';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth (Admin) ────────────────────────────────────────────

async function dbGetSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

async function dbLogin(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function dbLogout() {
  await sb.auth.signOut();
}

// ── Auth (Student) ──────────────────────────────────────────
// Each student has a Supabase Auth account (email + password).
// Their display name is stored in user_metadata.full_name.

async function dbStudentLogin(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function dbStudentLogout() {
  await sb.auth.signOut();
}

async function dbGetStudentSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

// Returns the display name stored in Auth metadata, e.g. "Sara Ahmed"
function dbGetStudentName(session) {
  return session?.user?.user_metadata?.full_name || session?.user?.email || '';
}

// ── Student messages ─────────────────────────────────────────
// sender_name is taken from Auth — client does NOT send it.
// The DB column `user_id` is filled by a DEFAULT (auth.uid()) or policy.

async function dbInsertStudentMessage({ message, tagged_classmate }) {
  const { error } = await sb.from('student_messages').insert({
    message,
    tagged_classmate: tagged_classmate || null,
    // sender_name and user_id are set server-side via DB defaults/trigger
  });
  if (error) throw error;
}

async function dbGetStudentMessages() {
  const { data, error } = await sb
    .from('student_messages')
    .select('id, created_at, message, tagged_classmate, sender_name, user_id')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data || [];
}

// ── Teacher messages ─────────────────────────────────────────

async function dbInsertTeacherMessages(rows) {
  const { error } = await sb.from('teacher_messages').insert(rows);
  if (error) throw error;
}

async function dbGetTeacherMessages() {
  const { data, error } = await sb
    .from('teacher_messages')
    .select('id, created_at, teacher_name, student_name, message')
    .order('teacher_name');
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data || [];
}

// ── Teacher Auth ─────────────────────────────────────────
// Teachers log in with Supabase Auth just like students.
// Their display name is stored in user_metadata.full_name
// and their role is stored in user_metadata.role = 'teacher'.

async function dbTeacherLogin(email, password) {
  return dbStudentLogin(email, password); // same Supabase signIn
}

async function dbTeacherLogout() {
  return dbStudentLogout();
}
