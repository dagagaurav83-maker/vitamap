"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";

const reasons = [
  "General wellness",
  "Family history of disease",
  "Weight management",
  "Energy & fatigue",
  "Just curious",
];

const conditions = ["Diabetes", "Thyroid", "BP", "None", "Other"];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Plus");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(["None"]);

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700">
          <ArrowLeft size={16} />
          Organix
        </Link>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-teal-700">Create your health map</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Get your health mapped</h1>
            <div className="mt-6 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-teal-700 transition-all"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-500">Step {step} of 3</p>
          </div>

          {step === 1 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Basic info</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {["Name", "Age", "Gender", "City"].map((field) => (
                  <label key={field} className="text-sm font-semibold text-slate-700">
                    {field}
                    <input
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm"
                      placeholder={field === "Name" ? "Rahul Sharma" : field}
                    />
                  </label>
                ))}
              </div>
              <h3 className="mt-6 font-bold text-slate-950">What brings you here?</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => toggle(reason, selectedReasons, setSelectedReasons)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                      selectedReasons.includes(reason)
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-slate-300 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50/50"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Health history</h2>
              <h3 className="mt-5 font-bold text-slate-950">Any diagnosed conditions?</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggle(condition, selectedConditions, setSelectedConditions)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                      selectedConditions.includes(condition)
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-slate-300 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50/50"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Current medications?
                  <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  How often do you currently get tested?
                  <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm">
                    <option>Never</option>
                    <option>Once a year</option>
                    <option>More often</option>
                  </select>
                </label>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="text-xl font-bold text-slate-950">Select your plan</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pricingPlans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`rounded-xl border p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                      selectedPlan === plan.name
                        ? "border-teal-600 bg-teal-50 ring-2 ring-teal-100"
                        : "border-slate-200 bg-white hover:border-teal-200"
                    }`}
                  >
                    {plan.popular && (
                      <span className="rounded-full bg-teal-700 px-2 py-1 text-xs font-bold text-white">
                        Most popular
                      </span>
                    )}
                    <h3 className="mt-3 text-lg font-bold text-slate-950">{plan.name}</h3>
                    <p className="mt-2 text-2xl font-bold">{plan.price}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{plan.detail}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <button
              onClick={() => setStep((current) => Math.max(1, current - 1))}
              disabled={step === 1}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((current) => current + 1)}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800"
              >
                Proceed to book your first test <Check size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
