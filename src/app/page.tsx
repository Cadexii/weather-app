"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/components/Contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [user, router]);

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
