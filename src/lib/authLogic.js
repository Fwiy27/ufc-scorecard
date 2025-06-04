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

const loadAuth = async (setAuth) => {
  const storedAuth = JSON.parse(localStorage.getItem("auth-info"));

  if (storedAuth && storedAuth.session && storedAuth.session.refresh_token) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: storedAuth.session.refresh_token,
      });

      if (error) {
        console.error("Failed to refresh session:", error.message);
        setAuth({ session: null, user: null });
        localStorage.removeItem("auth-info");
        return;
      }

      const updatedAuth = {
        session: data.session,
        user: data.user,
      };

      localStorage.setItem("auth-info", JSON.stringify(updatedAuth));
      setAuth(updatedAuth);
      console.log("Session refreshed successfully");
    } catch (err) {
      console.error("Unexpected error during session refresh:", err);
      setAuth({ session: null, user: null });
      localStorage.removeItem("auth-info");
    }
  } else {
    setAuth({ session: null, user: null });
  }
};

export { handleLogin, handleSignup, loadAuth };
