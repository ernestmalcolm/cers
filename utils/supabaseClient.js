import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = "https://gjghraakekbiiwvlmout.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZ2hyYWFrZWtiaWl3dmxtb3V0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MTgxODg3OSwiZXhwIjoxOTk3Mzk0ODc5fQ.WGP8Fx92DO1WgMS_e09YoDtg7JDdvf98MQ2N457BoqM";
export const supabase = createClient(supabaseUrl, supabaseKey);
