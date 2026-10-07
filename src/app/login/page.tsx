import { CalendarDays, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f9fc] px-4 py-8 text-[#0a2540]">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div className="surface-enter max-w-xl">
          <Link href="/" className="inline-flex items-center gap-3 rounded-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0a66ff] text-white shadow-[0_8px_22px_rgba(10,102,255,0.22)]">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-semibold">Slotwise</span>
              <span className="block text-xs text-[#5f6f86]">Scheduling workspace</span>
            </span>
          </Link>

          <h1 className="mt-10 max-w-lg text-4xl font-semibold tracking-[-0.035em] text-[#0a2540] sm:text-5xl">
            Sign in to manage every booking in one clean workspace.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#425466]">
            Use your email and password to access appointment types, availability, booking records, and confirmation settings.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-[#425466]">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eaf2ff] text-[#0a66ff]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              No social login options on this screen.
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eaf2ff] text-[#0a66ff]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              Password recovery is one click away.
            </div>
          </div>
        </div>

        <div className="surface-enter surface-enter-delay-1 rounded-2xl border border-[#d8e2ef] bg-white p-6 shadow-[0_24px_70px_rgba(10,37,64,0.10)] sm:p-8">
          <div>
            <p className="inline-flex rounded-full border border-[#bdd3f5] bg-[#eaf2ff] px-2.5 py-1 text-xs font-semibold text-[#0846b8]">
              Email and password
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-[#0a2540]">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-[#425466]">
              Enter your credentials to continue to Slotwise.
            </p>
          </div>

          <LoginForm />

          <footer className="mt-8 border-t border-[#d8e2ef] pt-5 text-sm text-[#425466]">
            <p>
              By signing in, you agree to the{" "}
              <Link className="font-semibold text-[#0a66ff] underline-offset-4 hover:underline" href="/terms">
                Terms
              </Link>{" "}
              and acknowledge the{" "}
              <Link className="font-semibold text-[#0a66ff] underline-offset-4 hover:underline" href="/privacy">
                Privacy policy
              </Link>
              .
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}

