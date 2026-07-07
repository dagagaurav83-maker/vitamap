import {
  Activity,
  Apple,
  Bone,
  Brain,
  CircleGauge,
  Droplets,
  HeartPulse,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Sun,
  TestTube2,
  TimerReset,
} from "lucide-react";

export type StatusColor = "red" | "green" | "yellow";

export const statusStyles: Record<
  StatusColor,
  { fill: string; bg: string; border: string; text: string; label: string }
> = {
  red: {
    fill: "#FF3B30",
    bg: "bg-[#FFF1F0]",
    border: "border-[#FF3B30]/20",
    text: "text-[#C92A22]",
    label: "Needs attention",
  },
  green: {
    fill: "#30D158",
    bg: "bg-[#F0FFF4]",
    border: "border-[#30D158]/20",
    text: "text-[#15803D]",
    label: "Looking good",
  },
  yellow: {
    fill: "#FF9F0A",
    bg: "bg-[#FFFBEB]",
    border: "border-[#FF9F0A]/25",
    text: "text-[#B45309]",
    label: "Watch this",
  },
};

export const memberData = {
  member: "Rahul Sharma",
  lastTested: "June 2026",
  nextTestDue: "Oct 2026",
  daysToNextTest: 117,
  labPartner: "Thyrocare",
  sampleCollectedAt: "Home collection, 8:10 AM",
  score: 67,
  streak: 3,
  organStatus: {
    heart: "red",
    liver: "green",
    pancreas: "yellow",
    thyroid: "green",
    kidneys: "green",
    lungs: "green",
    brain: "green",
    bones: "red",
  } as Record<string, StatusColor>,
  flaggedMarkers: [
    {
      name: "LDL Cholesterol",
      friendlyName: "Bad Cholesterol",
      value: "148 mg/dL",
      gaugeScore: 42,
      status: "high",
      organ: "heart",
      linkedOrgan: "Heart",
      pastValues: ["Jan 2026: 138", "Mar 2026: 142", "Jun 2026: 148"],
      plainText:
        "Your bad cholesterol is higher than it should be. This puts extra pressure on your heart.",
      goal: "Get below 130 mg/dL by December",
      nextAction: "Walk 30 minutes daily and swap heavy cooking fats at least 3 times this week.",
      explain: [
        "LDL is the sticky cholesterol that can build up inside blood vessels.",
        "When it stays high, your heart has to work against tighter pipes.",
        "Walking more and changing cooking fats can lower it over time.",
      ],
    },
    {
      name: "Vitamin D",
      friendlyName: "Vitamin D",
      value: "14 ng/mL",
      gaugeScore: 28,
      status: "low",
      organ: "bones",
      linkedOrgan: "Bones",
      pastValues: ["Jan 2026: 10", "Mar 2026: 12", "Jun 2026: 14"],
      plainText:
        "Your Vitamin D is very low. This weakens bones and can cause fatigue and joint pain.",
      goal: "Reach 30 ng/mL before your next test",
      nextAction: "Get morning sunlight and follow the doctor-approved supplement plan this week.",
      explain: [
        "Vitamin D helps your body use calcium to keep bones strong.",
        "Low levels can make you feel tired and achy even when sleep is fine.",
        "Sunlight, food choices, and doctor-approved supplements can help.",
      ],
    },
    {
      name: "HbA1c",
      friendlyName: "Blood Sugar",
      value: "5.9%",
      gaugeScore: 61,
      status: "borderline",
      organ: "pancreas",
      linkedOrgan: "Pancreas",
      pastValues: ["Jan 2026: 5.7", "Mar 2026: 5.8", "Jun 2026: 5.9"],
      plainText:
        "Your blood sugar control is borderline. Not diabetic yet, but heading in that direction.",
      goal: "Bring HbA1c below 5.7%",
      nextAction: "Take a 10-minute walk after lunch and dinner for the next 7 days.",
      explain: [
        "HbA1c shows your average blood sugar over the last few months.",
        "A borderline number means your body is starting to struggle with sugar.",
        "Meals, walking after food, and weight changes can move this number.",
      ],
    },
  ],
};

export const healthyMarkers = [
  { friendlyName: "Liver Enzymes", value: "Normal", status: "good", gaugeScore: 96 },
  { friendlyName: "Kidney Function", value: "Normal", status: "good", gaugeScore: 94 },
  { friendlyName: "Thyroid", value: "Normal", status: "good", gaugeScore: 92 },
  { friendlyName: "Inflammation", value: "Low", status: "good", gaugeScore: 89 },
  { friendlyName: "Hemoglobin", value: "14.2 g/dL", status: "good", gaugeScore: 87 },
  { friendlyName: "B12", value: "Good", status: "good", gaugeScore: 85 },
  { friendlyName: "Triglycerides", value: "Good", status: "good", gaugeScore: 83 },
];

export const markerCards = [
  ...memberData.flaggedMarkers,
  ...healthyMarkers.map((marker) => ({
    ...marker,
    name: marker.friendlyName,
    organ: "general",
    linkedOrgan: "Whole body",
    pastValues: ["Jan 2026: In range", "Mar 2026: In range", "Jun 2026: In range"],
    plainText: `${marker.friendlyName} is currently in a healthy range.`,
    goal: "Keep this marker in range at the next retest",
    nextAction: "Keep your current routine steady and recheck this marker in the next panel.",
    explain: [
      "This marker is sitting where we want it.",
      "Keep your current habits steady.",
      "We will keep watching it during each retest.",
    ],
  })),
];

export const pricingPlans = [
  {
    name: "Essential",
    price: "Rs. 3,999/year",
    detail: "40 tests, 1 draw, AI report",
  },
  {
    name: "Plus",
    price: "Rs. 6,999/year",
    detail: "70 tests, 2 draws, doctor consult",
    popular: true,
  },
  {
    name: "Premium",
    price: "Rs. 13,999/year",
    detail: "100+ tests, quarterly draws, 3 doctor consults",
  },
];

export const categories = [
  ["Heart & Cholesterol", HeartPulse],
  ["Blood Sugar & Diabetes Risk", Droplets],
  ["Hormones", Activity],
  ["Vitamins & Minerals", Sun],
  ["Liver & Kidney", TestTube2],
  ["Immunity & Inflammation", ShieldPlus],
];

export const howItWorks = [
  ["Book your first test", "At-home blood draw through a partner lab.", Stethoscope],
  ["Get your Organix map", "See which organs need attention in plain English.", Sparkles],
  ["Track 10 markers", "Follow the few numbers that matter most to you.", CircleGauge],
  ["Watch progress", "Retest every 3 months and see what changed.", TimerReset],
];

export const progressData = [
  {
    marker: "LDL Cholesterol",
    value: "148 mg/dL",
    change: "8% worse",
    goal: "Get below 130 mg/dL by December",
    data: [
      { date: "Jan 2026", value: 138 },
      { date: "Mar 2026", value: 142 },
      { date: "Jun 2026", value: 148 },
    ],
  },
  {
    marker: "Vitamin D",
    value: "14 ng/mL",
    change: "18% improved",
    goal: "Reach 30 ng/mL before your next test",
    data: [
      { date: "Jan 2026", value: 10 },
      { date: "Mar 2026", value: 12 },
      { date: "Jun 2026", value: 14 },
    ],
  },
  {
    marker: "HbA1c",
    value: "5.9%",
    change: "2% worse",
    goal: "Bring HbA1c below 5.7%",
    data: [
      { date: "Jan 2026", value: 5.7 },
      { date: "Mar 2026", value: 5.8 },
      { date: "Jun 2026", value: 5.9 },
    ],
  },
];

export const recommendationCards = [
  {
    icon: HeartPulse,
    title: "Lower your bad cholesterol",
    color: "red",
    actions: [
      "Walk 30 mins daily",
      "Replace ghee with olive oil 3x a week",
      "Eat 1 handful of walnuts daily",
    ],
    retest: "Retest in 4 months to see impact",
  },
  {
    icon: Sun,
    title: "Boost your Vitamin D",
    color: "yellow",
    actions: [
      "Spend 20 mins in morning sunlight",
      "Take a Vitamin D3 supplement after checking dosage with your doctor",
      "Eat more eggs and fatty fish",
    ],
    retest: "Retest in 3 months to confirm recovery",
  },
  {
    icon: Apple,
    title: "Steady your blood sugar",
    color: "yellow",
    actions: [
      "Take a 10-minute walk after lunch and dinner",
      "Add protein to breakfast",
      "Keep sweets to planned portions twice a week",
    ],
    retest: "Retest HbA1c with the next panel",
  },
];

export const doctorReviewPack = {
  preparedFor: "Dr. Meera Iyer",
  visitReason: "Review heart, bone, and blood sugar risk markers before the next test.",
  memberNote:
    "Rahul wants a clear plan for the next 12 weeks and wants to know which changes matter most.",
  summary:
    "Three markers need discussion. Bad cholesterol moved higher, Vitamin D improved but is still low, and blood sugar remains close to the warning range.",
  markers: [
    {
      marker: "Bad Cholesterol",
      current: "148 mg/dL",
      trend: "Worse than March",
      goal: "Below 130 mg/dL by December",
      ask: "Should Rahul adjust diet first, or does this need medicine discussion?",
      color: "red",
    },
    {
      marker: "Vitamin D",
      current: "14 ng/mL",
      trend: "Improving slowly",
      goal: "Reach 30 ng/mL before the next test",
      ask: "What supplement dose is appropriate for the next 8-12 weeks?",
      color: "red",
    },
    {
      marker: "Blood Sugar",
      current: "5.9%",
      trend: "Slightly worse",
      goal: "Below 5.7%",
      ask: "Should Rahul repeat fasting sugar or insulin markers?",
      color: "yellow",
    },
  ],
};

export const habitImpactForecasts = [
  {
    marker: "Bad Cholesterol",
    current: "148 mg/dL",
    estimate: "Could move toward 135-140 mg/dL",
    byWhen: "by the Oct 2026 retest",
    confidence: "Medium",
    actions: ["Walk 30 mins daily", "Swap heavy fats 3x a week", "Add nuts or fibre daily"],
    note: "Estimate only. Your next blood test confirms the real change.",
    color: "red",
  },
  {
    marker: "Vitamin D",
    current: "14 ng/mL",
    estimate: "Could move toward 22-28 ng/mL",
    byWhen: "by the Oct 2026 retest",
    confidence: "Medium-high",
    actions: ["Morning sunlight", "Doctor-approved supplement", "More eggs or fatty fish"],
    note: "Supplement dose should be checked with a doctor.",
    color: "yellow",
  },
  {
    marker: "Blood Sugar",
    current: "5.9%",
    estimate: "Could move toward 5.7-5.8%",
    byWhen: "by the next panel",
    confidence: "Medium",
    actions: ["10-minute walk after meals", "Protein at breakfast", "Planned sweet portions"],
    note: "Small meal and walking changes can show up in HbA1c.",
    color: "yellow",
  },
];

export const supplementMedicationPlan = [
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    type: "Supplement",
    tiedTo: "Vitamin D",
    startDate: "24 Jun 2026",
    doseNote: "Once weekly after a meal, as approved by doctor",
    adherence: 71,
    retestImpact: "Should help Vitamin D move closer to 30 ng/mL by the next test.",
    doctorNote: "Confirm dose and duration before continuing beyond 8-12 weeks.",
    color: "yellow",
  },
  {
    id: "omega-3",
    name: "Omega-3",
    type: "Supplement",
    tiedTo: "Bad Cholesterol",
    startDate: "01 Jul 2026",
    doseNote: "Daily with lunch, only if doctor agrees with the brand and dose",
    adherence: 58,
    retestImpact: "May support the cholesterol plan when paired with food and walking changes.",
    doctorNote: "Ask whether this is useful for Rahul's current cholesterol pattern.",
    color: "red",
  },
  {
    id: "post-meal-walk",
    name: "Post-meal walk",
    type: "Care habit",
    tiedTo: "Blood Sugar",
    startDate: "18 Jun 2026",
    doseNote: "10 minutes after lunch and dinner",
    adherence: 83,
    retestImpact: "Can help blood sugar trend down before the next HbA1c check.",
    doctorNote: "Check if any extra sugar tests are needed before the next panel.",
    color: "yellow",
  },
];

export const weeklyCarePlanReview = {
  weekOf: "1-7 Jul 2026",
  overall: "On track, but cholesterol needs more consistency this week.",
  habitAdherence: 68,
  supplementAdherence: 71,
  missedActions: [
    "Two post-dinner walks were missed.",
    "Omega-3 was skipped on three days.",
    "Only one heavy-fat meal swap was logged.",
  ],
  priority: "Make the heart plan boring and repeatable: walk daily, swap heavy fats, and keep the supplement reminder on.",
  wins: [
    "Vitamin D supplement routine is improving.",
    "Post-meal walks are happening more often after lunch.",
    "Sugar plan is still simple enough to follow.",
  ],
  nextCheckIn: "Review again next Monday",
};

export const familyRiskSnapshot = [
  {
    name: "Rahul",
    relation: "You",
    score: 67,
    status: "Needs attention",
    nextTest: "Oct 2026",
    focus: "Cholesterol, Vitamin D, blood sugar",
    sharedRisk: "Heart and sugar risk",
    color: "red",
    flaggedMarkers: ["Bad Cholesterol", "Vitamin D", "Blood Sugar"],
    strongestArea: "Kidney and liver markers are steady",
    lastTested: "Jun 2026",
    action: "Prioritise heart plan and Vitamin D recovery before Oct retest.",
  },
  {
    name: "Anika",
    relation: "Spouse",
    score: 82,
    status: "Looking good",
    nextTest: "Nov 2026",
    focus: "Thyroid watch",
    sharedRisk: "Vitamin D trend",
    color: "green",
    flaggedMarkers: ["Thyroid watch", "Vitamin D watch"],
    strongestArea: "Heart and sugar markers are in range",
    lastTested: "May 2026",
    action: "Keep the next thyroid check and continue sunlight routine.",
  },
  {
    name: "Mohan",
    relation: "Father",
    score: 59,
    status: "Needs attention",
    nextTest: "Due now",
    focus: "Sugar and heart markers",
    sharedRisk: "Family diabetes history",
    color: "red",
    flaggedMarkers: ["Blood Sugar", "Bad Cholesterol", "Blood Pressure"],
    strongestArea: "Kidney markers are currently stable",
    lastTested: "Jan 2026",
    action: "Book the overdue test and review sugar markers with a doctor.",
  },
];

export const organLabels: Record<string, string> = {
  brain: "Your Brain",
  thyroid: "Your Thyroid",
  heart: "Your Heart",
  lungs: "Your Lungs",
  liver: "Your Liver",
  pancreas: "Your Pancreas",
  kidneys: "Your Kidneys",
  bones: "Your Bones",
};

export const organIcons: Record<string, typeof Brain> = {
  brain: Brain,
  heart: HeartPulse,
  bones: Bone,
  thyroid: Activity,
  lungs: Activity,
  liver: TestTube2,
  pancreas: Droplets,
  kidneys: TestTube2,
};
