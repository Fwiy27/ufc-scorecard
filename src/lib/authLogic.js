import { supabase } from "./supabaseClient.js";

async function handleLogin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      return { success: false, error: error.message };
    }

    console.log("Login successful:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error during login:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

async function handleSignup(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup failed:", error.message);
      return { success: false, error: error.message };
    }

    // Safely log the data object by stringifying only the relevant parts
    console.log("Signup successful:", data);

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

const loadAuth = async () => {
  // Check localStorage for previous auth
  const stored = localStorage.getItem("auth-info");
  if (!stored) {
    console.log("No Previous Auth");
    return null;
  } else {
    try {
      const parsed = JSON.parse(stored);
      const refreshToken = parsed.session?.refresh_token;
      if (!refreshToken) {
        console.log("No refresh token found");
        return null;
      }

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        console.log("Error refreshing token:", error);
        localStorage.removeItem("auth-info");
        return null;
      }

      localStorage.setItem("auth-info", JSON.stringify(data));
      console.log("Successfully Refreshed Token");

      return data;
    } catch (err) {
      console.log("Unexpected error refreshing token:", err);
    }
  }
};

export { handleLogin, handleSignup, loadAuth };
