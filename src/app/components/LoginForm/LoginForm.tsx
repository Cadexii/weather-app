"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./loginForm.module.css";
import { useAuth } from "../Contexts/AuthProvider";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch {
      if (!email || !password) {
        setError("Please fill in all fields.");
        setIsLoading(false);
      } else {
        setError("Invalid email or password.");
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }
    }
    console.log(user);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Log in to your account</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button onClick={handleLogin}>Log in</button>
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && (
          <Icon icon="svg-spinners:270-ring-with-bg" color="#888" width={50} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
