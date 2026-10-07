import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f6f9fc] px-4 py-10 text-[#0a2540]">
      <article className="surface-enter mx-auto max-w-3xl rounded-2xl border border-[#d8e2ef] bg-white p-8 shadow-[0_24px_70px_rgba(10,37,64,0.10)]">
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">Terms</h1>
        <p className="mt-4 leading-7 text-[#425466]">
          Slotwise is currently an MVP scaffold for scheduling workflows. Production terms should be reviewed before inviting real customers or collecting live booking data.
        </p>
        <p className="mt-4 leading-7 text-[#425466]">
          Hosts are responsible for keeping appointment details, availability, and cancellation policies accurate.
        </p>
        <Link className="mt-8 inline-block font-semibold text-[#0a66ff] underline-offset-4 hover:underline" href="/login">
          Back to login
        </Link>
      </article>
    </main>
  );
}

