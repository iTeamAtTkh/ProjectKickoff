import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://supabase.com/dashboard/project/nfxryxdpolhaerrhchvk", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5meHJ5eGRwb2xoYWVycmhjaHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MDkzOTAsImV4cCI6MjA3MDE4NTM5MH0.vsj1BvbWjk08fncNfjTEY5EhfQk7YxRiSiEbQ0G7a2s");

export default supabase;
