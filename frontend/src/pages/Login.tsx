
import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const result = await loginUser({ email, password });

      if (!result.token) {
        throw new Error("Login succeeded but no token was returned.");
      }

      sessionStorage.setItem("token", result.token);

      setMessage("Login successful!");
      console.log("Logged-in user:", result.user);
      console.log("JWT received successfully");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? String(
              (error as { response?: { data?: { message?: string } } })
                .response?.data?.message ?? "Login failed."
            )
          : error instanceof Error
            ? error.message
            : "Login failed.";

      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p role="status">{message}</p>}
    </main>
  );
}

export default Login;
