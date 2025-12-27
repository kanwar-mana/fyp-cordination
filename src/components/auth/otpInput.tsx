"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAppDispatch } from "@/store/hooks";
import { verifyEmail } from "@/store/auth/authThunk";
import { verifyEmailRequest } from "@/types/auth.types";

export const title = "Email Verification Flow";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 characters.",
  }),
});

export default function OtpInput({ email, onVerification = () => {} }: any) {
  const dispatch = useAppDispatch();
  const [isVerifying, setIsVerifying] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: any = { email, verificationCode: values.code };
    setIsVerifying(true);
    await dispatch(verifyEmail(payload))
      .unwrap()
      .then(() => onVerification())
      .finally(() => setIsVerifying(false));
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a verification code to{" "}
          <span className="font-medium">{email}</span>
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={0} />
                        <InputOTPSlot className="bg-background" index={1} />
                        <InputOTPSlot className="bg-background" index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot className="bg-background" index={3} />
                        <InputOTPSlot className="bg-background" index={4} />
                        <InputOTPSlot className="bg-background" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isVerifying} type="submit">
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm text-muted-foreground">
        Didn't receive the email?{" "}
        <Button className="h-auto p-0 font-normal" type="button" variant="link">
          Resend code
        </Button>
      </div>
    </div>
  );
}
