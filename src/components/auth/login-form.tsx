"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <form
      className="mt-8 grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("submitted");
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#5f6f86]" aria-hidden="true" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11 pl-10"
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-[#0a66ff] underline-offset-4 transition-colors hover:text-[#0846b8] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#5f6f86]" aria-hidden="true" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={8}
            className="h-11 pl-10 pr-12"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="interactive-lift focus-ring absolute right-2 top-1.5 flex h-8 w-8 items-center justify-center rounded-md text-[#425466] hover:bg-[#eaf2ff] hover:text-[#0a2540]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="h-11 w-full">
        Sign in
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      {status === "submitted" ? (
        <p role="status" className="surface-enter rounded-lg border border-[#bdd3f5] bg-[#eaf2ff] px-3 py-2 text-sm font-medium text-[#0846b8]">
          Email and password sign-in is ready to connect to the auth handler.
        </p>
      ) : null}
    </form>
  );
}

