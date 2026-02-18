"use client";

import Link from "next/link";
import { AuthHeader, FormInput } from "./AuthReusable";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/');
    };
  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">
      <div className="flex flex-col gap-12">    

        <AuthHeader
          title="Set New Password"
          description="Make sure it's strong and unique to keep your account secure."
        />

        <div className="w-[360px] sm:w-[550px] mx-auto bg-[#F8F9FB] rounded-2xl p-6 sm:p-8">

          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>

            <FormInput placeholder="Password" type="password" />
            <FormInput placeholder="Confirm Password" type="password" />

            <button type="submit" className="auth-btn">
              Submit
            </button>

            <p className="text-[#4A4C56] text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#2382B0]">
                Sign up
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}
