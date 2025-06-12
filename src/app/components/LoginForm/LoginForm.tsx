"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <button>Log in</button>
        {error && <p className={styles.error}>{error}</p>}
        {loading && (
          <Icon icon="svg-spinners:270-ring-with-bg" color="#888" width={50} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
