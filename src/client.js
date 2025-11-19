import { createClient } from '@supabase/supabase-js';

const URL = 'https://mizcsctrbmkgtforrhrj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pemNzY3RyYm1rZ3Rmb3JyaHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTQ4MTIsImV4cCI6MjA3OTA5MDgxMn0.SsI7kKkjSek_yIS40Uy90fME_lTtBqx6ZgTUvCUDDCU';

export const supabase = createClient(URL, API_KEY);