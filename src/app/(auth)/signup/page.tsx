"use client";
import SignupForm from "./signupForm";
import OtpInput from "@/components/auth/otpInput";
import { useState } from "react";

export default function Page() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] =
    useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background max-w-full">
      {isVerificationCodeSent ? (
        <OtpInput email={userEmail} />
      ) : (
        <SignupForm
          setIsVerificationCodeSent={setIsVerificationCodeSent}
          setUserEmail={setUserEmail}
        />
      )}
    </div>
  );
}
