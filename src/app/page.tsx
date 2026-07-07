"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTube2,
  TimerReset,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { BottomTabBar } from "@/components/BottomTabBar";
import { VitaMap } from "@/components/VitaMap";
import { useCountUp } from "@/components/motion-utils";
import { categories, pricingPlans } from "@/lib/data";

const proofPoints = [
  ["60-100", "blood markers mapped"],
  ["3 mo", "retest rhythm"],
  ["5-15", "risks explained"],
];

const journey = [
  {
    title: "Home blood test",
    text: "Partner lab collects your sample at home and sends verified results.",
    icon: TestTube2,
  },
  {
    title: "Plain-English map",
    text: "Organix turns numbers into organ-level signals you can act on.",
    icon: Sparkles,
  },
  {
    title: "Focused next steps",
    text: "You see the few habits and markers that matter before the next test.",
    icon: ClipboardCheck,
  },
  {
    title: "Progress check",
    text: "Retest every few months and see what actually improved.",
    icon: TimerReset,
  },
];

const trustSignals = [
  { label: "Lab partner reports", icon: BadgeCheck },
  { label: "Doctor review on higher plans", icon: Stethoscope },
  { label: "Private health data", icon: LockKeyhole },
  { label: "Made for Indian families", icon: ShieldCheck },
];

export default function HomePage() {
  const [selectedOrgan, setSelectedOrgan] = useState("heart");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F8FA] pb-24 text-[#16181D] md:pb-0">
      <div className="flowing-home-gradient pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]" />
      <header className="sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <BrandLogo wordClassName="text-lg" />

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#58606B] md:flex">
            <a className="transition hover:text-[#16181D]" href="#product">
              Product
            </a>
            <a className="transition hover:text-[#16181D]" href="#plans">
              Plans
            </a>
            <a className="transition hover:text-[#16181D]" href="#teams">
              For teams
            </a>
            <Link className="transition hover:text-[#16181D]" href="/dashboard">
              Demo
            </Link>
          </nav>

          <Link
            href="/signup"
            className="flowing-green-cta inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Start <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <section className="relative">
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20 lg:pt-20">
          <div className="min-w-0 w-[min(340px,calc(100vw-32px))] sm:w-auto sm:max-w-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B7D9D2] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F766E] shadow-sm">
              <span className="size-2 rounded-full bg-[#30D158]" />
              Preventive health for urban India
            </div>

            <h1 className="mt-5 max-w-full break-words text-[36px] font-semibold leading-[1.08] tracking-normal text-[#111317] sm:max-w-3xl sm:text-6xl lg:text-7xl">
              See what your body needs before it becomes a problem.
            </h1>

            <p className="mt-6 max-w-full text-base leading-7 text-[#58606B] sm:max-w-2xl sm:text-lg sm:leading-8">
              Organix converts a full-body blood test into a simple body map,
              clear risk priorities, and a plan you can track every few months.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#113D3A] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(17,61,58,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0B2D2A]"
              >
                Get your health mapped <ArrowRight size={17} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#D7DCE2] bg-white px-5 text-sm font-semibold text-[#16181D] transition hover:-translate-y-0.5 hover:border-[#BFC7D0]"
              >
                Open demo dashboard <ChevronRight size={17} />
              </Link>
            </div>

            <div className="mt-9 grid max-w-full grid-cols-1 gap-3 sm:max-w-xl sm:grid-cols-3">
              {proofPoints.map(([value, label]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-lg border border-[#E2E6EA] bg-white p-4 shadow-sm"
                >
                  <p className="text-2xl font-semibold text-[#113D3A]">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-[#66707C]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 w-[min(340px,calc(100vw-32px))] sm:w-auto sm:max-w-none">
            <VitaMap selectedOrgan={selectedOrgan} onSelect={setSelectedOrgan} compact />
          </div>
        </div>
      </section>

      <section id="product" className="border-y border-[#E2E6EA] bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
              The product moment
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              A live body map that makes your report obvious.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#58606B]">
              Red means fix this, yellow means watch this, green means it is
              currently fine. Tap an organ and Organix explains the issue in
              words a normal person would use.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {categories.slice(0, 4).map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-3 rounded-lg border border-[#E2E6EA] bg-[#F8FAFB] p-3">
                  <Icon className="text-[#0F766E]" size={20} />
                  <span className="text-sm font-semibold text-[#29313A]">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
          <VitaMap selectedOrgan={selectedOrgan} onSelect={setSelectedOrgan} compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
            How Organix works
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            One test, then a clearer path forward.
          </h2>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-4">
          {journey.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-lg border border-[#E2E6EA] bg-white p-5 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.38 }}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#EAF7F3] text-[#0F766E]">
                <item.icon size={20} />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#8B949F]">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#66707C]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="plans" className="bg-[#101820] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#85E0D2]">
                Membership plans
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                Start simple. Upgrade when you need more support.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/62">
              Every plan keeps the same product experience. Higher plans add
              more testing and doctor time.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PriceCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="teams" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-lg border border-[#E2E6EA] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-[#EAF7F3] text-[#0F766E]">
              <Building2 size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#8B949F]">For companies</p>
              <h2 className="text-2xl font-semibold">Preventive health benefit</h2>
            </div>
          </div>
          <p className="mt-5 text-base leading-7 text-[#58606B]">
            Give employees a benefit they can understand: at-home tests,
            personal reports, and anonymised team health trends for HR.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#113D3A] px-4 text-sm font-semibold text-white transition hover:bg-[#0B2D2A]"
          >
            Talk to Organix <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustSignals.map((item) => (
            <div key={item.label} className="rounded-lg border border-[#E2E6EA] bg-white p-5 shadow-sm">
              <item.icon className="text-[#0F766E]" size={22} />
              <p className="mt-4 text-base font-semibold">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-[#66707C]">
                Built to reduce confusion and keep health decisions grounded in
                real test data.
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#E2E6EA] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <BrandLogo stacked tagline="Know what matters. Track what changes." />
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#58606B]">
            <Link className="hover:text-[#16181D]" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-[#16181D]" href="/recommendations">
              Recommendations
            </Link>
            <Link className="hover:text-[#16181D]" href="/progress">
              Progress
            </Link>
          </div>
        </div>
      </footer>
      <BottomTabBar />
    </main>
  );
}

function PriceCard({
  plan,
  index,
}: {
  plan: { name: string; price: string; detail: string; popular?: boolean };
  index: number;
}) {
  const amount = Number(plan.price.replace(/[^0-9]/g, ""));
  const { ref, value } = useCountUp(amount, 900);

  return (
    <motion.article
      className={`rounded-lg border p-5 ${
        plan.popular
          ? "border-[#85E0D2] bg-white text-[#16181D]"
          : "border-white/12 bg-white/[0.06] text-white"
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.38 }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        {plan.popular && (
          <span className="rounded-full bg-[#EAF7F3] px-3 py-1 text-xs font-semibold text-[#0F766E]">
            Popular
          </span>
        )}
      </div>
      <p className="mt-5 text-4xl font-semibold tracking-normal">
        Rs. <span ref={ref}>{value.toLocaleString("en-IN")}</span>
      </p>
      <p className={`mt-2 text-sm ${plan.popular ? "text-[#66707C]" : "text-white/62"}`}>
        per year
      </p>
      <p className={`mt-5 min-h-12 text-sm leading-6 ${plan.popular ? "text-[#58606B]" : "text-white/70"}`}>
        {plan.detail}
      </p>
      <Link
        href="/signup"
        className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
          plan.popular
            ? "bg-[#113D3A] text-white hover:bg-[#0B2D2A]"
            : "bg-white text-[#16181D] hover:bg-[#EDF1F4]"
        }`}
      >
        Choose plan <Check size={16} />
      </Link>
    </motion.article>
  );
}
