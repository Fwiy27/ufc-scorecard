import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqgqgwjypstbijezxbaa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZ3Fnd2p5cHN0YmlqZXp4YmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzgwNjYsImV4cCI6MjA2NDYxNDA2Nn0.T2d_q3k8GtuMohHYaFIqQqhlDhRc3NLXCnair31IkAE";
export const supabase = createClient(supabaseUrl, supabaseKey);
