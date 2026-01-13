import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { buttonClassName } from "@/components/common/button";
import { Card } from "@/components/common/card";

const highlights = [
  {
    title: "Transparent pricing",
    description: "Students see AI estimates; admins approve before payment.",
  },
  {
    title: "Role clarity",
    description: "Students submit, writers execute, admins govern allocations and disputes.",
  },
  {
    title: "Academic tone",
    description: "Professional, neutral UI built for controlled workflows.",
  },
];

const roleCards = [
  {
    role: "Student",
    copy: "Submit tasks, track progress, and view read-only AI pricing before admin approval.",
    href: "/student/dashboard",
  },
  {
    role: "Writer",
    copy: "Work only on assigned tasks with clear deadlines, instructions, and revision history.",
    href: "/writer/dashboard",
  },
  {
    role: "Admin",
    copy: "Review pricing, allocate writers, and monitor revenue with explicit confirmations.",
    href: "/admin/dashboard",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
        <Badge tone="info">Academic Writing & Research Support</Badge>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">Controlled, ethical writing workflows.</h1>
            <p className="max-w-2xl text-lg text-slate-700">
              A role-based portal that keeps pricing transparent, allocations controlled, and academic deliverables on track.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/login" className={buttonClassName({ variant: "primary" })}>
              Log in
            </Link>
            <Link href="/register" className={buttonClassName({ variant: "secondary" })}>
              Create account
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} className="h-full" />
          ))}
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {roleCards.map((card) => (
          <Card key={card.role} title={card.role} description={card.copy} actions={<RoleLink href={card.href} />} />
        ))}
      </section>
    </div>
  );
}

function RoleLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Enter workspace
    </Link>
  );
}
