import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f9fc] px-4 py-10 text-[#0a2540]">
      <section className="surface-enter w-full max-w-md rounded-2xl border border-[#d8e2ef] bg-white p-8 shadow-[0_24px_70px_rgba(10,37,64,0.10)]">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-[#425466]">
          Enter your account email and Slotwise will send password reset instructions when auth is connected.
        </p>
        <form className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input id="reset-email" type="email" required placeholder="alex@company.com" />
          </div>
          <Button type="submit">Send reset link</Button>
        </form>
        <Link className="mt-6 inline-block text-sm font-semibold text-[#0a66ff] underline-offset-4 hover:underline" href="/login">
          Back to login
        </Link>
      </section>
    </main>
  );
}

