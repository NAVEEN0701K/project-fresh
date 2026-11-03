import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qrvrrbsrnnznqxbrdmqo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydnJyYnNybm56bnF4YnJkbXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MTYzODcsImV4cCI6MjEwOTI5MjM4N30.O2gTNe66iRezN8K0TFbkLLRgVR08bJojciS4iyPGbDc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
