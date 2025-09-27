// import { createClient } from '@supabase/supabase-js';

// export const supabase = {
//   from: () => ({
//     select: () => ({ data: null, error: null }),
//     insert: () => ({ data: null, error: null }),
//     update: () => ({ data: null, error: null }),
//   }),
//   auth: {
//     signIn: async () => ({ user: null, error: null }),
//     signOut: async () => ({ error: null }),
//   }
// };

import { createClient } from '@supabase/supabase-js'

// ⚠️ Замени эти строки на свои значения:
const supabaseUrl = 'https://jmliyolllwemixymxsgu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbGl5b2xsbHdlbWl4eW14c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNjMyMTcsImV4cCI6MjA3MzYzOTIxN30.kMPWHalWVg6FD99boKERKTNbAb8f-Y4rnilcZpM4QO4'

// 📌 Клиент Supabase — используем везде
export const supabase = createClient(supabaseUrl, supabaseKey)

