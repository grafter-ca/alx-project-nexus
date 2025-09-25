"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/component/common/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/auth/login");
  };

  return (
    <div className="m-6 border p-6 rounded-xl">
      <RegisterForm closeModal={() => router.push("/login")} />
    </div>
  );
}
