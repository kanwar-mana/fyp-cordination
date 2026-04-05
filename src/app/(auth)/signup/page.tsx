"use client";
import SignupForm from "./signupForm";
import OtpInput from "@/components/auth/otpInput";
import { useState } from "react";

export default function Page() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] =
    useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex-3 flex items-center w-full justify-center">
        <div className="mx-auto flex w-full max-w-md items-center justify-center">
          {isVerificationCodeSent ? (
            <OtpInput email={userEmail} />
          ) : (
            <SignupForm
              setIsVerificationCodeSent={setIsVerificationCodeSent}
              setUserEmail={setUserEmail}
            />
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-4 relative bg-primary" />
    </div>
  );
}
