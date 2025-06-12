"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/components/Contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [user, router, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Icon icon="svg-spinners:270-ring-with-bg" color="#888" width={50} />
    </div>
  );
}
