import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f6f9fc] px-4 py-10 text-[#0a2540]">
      <article className="surface-enter mx-auto max-w-3xl rounded-2xl border border-[#d8e2ef] bg-white p-8 shadow-[0_24px_70px_rgba(10,37,64,0.10)]">
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">Privacy policy</h1>
        <p className="mt-4 leading-7 text-[#425466]">
          Slotwise collects the minimum information needed to manage appointments: host account details, invitee booking details, availability settings, and confirmation records.
        </p>
        <p className="mt-4 leading-7 text-[#425466]">
          This scaffold does not send data to external calendar or email providers until those integrations are connected.
        </p>
        <Link className="mt-8 inline-block font-semibold text-[#0a66ff] underline-offset-4 hover:underline" href="/login">
          Back to login
        </Link>
      </article>
    </main>
  );
}

