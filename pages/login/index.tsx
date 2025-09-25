"use client";
import { useRouter } from "next/navigation";
import LoginForm from "@/component/common/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="m-6 border p-6 rounded-xl">
      <LoginForm closeModal={() => router.push("/")} />
       
    </div>
  );
}
