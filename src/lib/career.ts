// Pure helpers over src/data/career.json, the single source of truth for
// employers, titles, dates, locations, published bullets, and skills.
// Shared by the site components, scripts/career-sync.mjs (which generates the
// LinkedIn paste doc), and the consistency tests. Keep this
// file free of JSON imports and non-erasable TypeScript syntax (enums,
// namespaces): Node runs it directly via type stripping.

export type Position = {
  title: string;
  start: string; // "YYYY-MM"
  end: string | null; // "YYYY-MM", or null for a current role
  location?: string; // as shown on LinkedIn (company office city for remote roles)
  locationType?: "Remote"; // resumes show "Remote" for these
  description?: string;
  bullets: string[];
};

export type Company = {
  id: string;
  name: string;
  linkedinName: string;
  logo: string;
  homepage: string;
  logoFit?: "cover" | "contain";
  logoPosition?: string;
  positions: Position[];
};

export type SkillGroup = { label: string; items: string[] };

export type ResumeRules = {
  forbiddenTitles: string[];
  forbiddenPhrases: string[];
};

export type Profile = {
  headline: string;
  summary: string[]; // shared: LinkedIn Summary and the first paragraphs of the site About
  siteOnlyAbout: string[]; // extra About paragraphs that stay off LinkedIn
  topSkills: string[]; // the three skills to pin on LinkedIn
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  minor?: string;
  start: string;
  end: string;
};

export type Certification = {
  name: string;
  issuer: string;
  issued?: string; // "YYYY-MM"
  onLinkedIn: boolean; // false means it still has to be added to LinkedIn
};

export type Career = {
  companies: Company[];
  skills: SkillGroup[];
  profile: Profile;
  education: Education[];
  certifications: Certification[];
  resumeRules: ResumeRules;
};

export const LINKEDIN_DESCRIPTION_LIMIT = 2000;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseMonth(value: string): { year: number; month: number } {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) throw new Error(`Invalid month "${value}", expected YYYY-MM`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

export function monthIndex(value: string): number {
  const { year, month } = parseMonth(value);
  return year * 12 + (month - 1);
}

export function formatMonth(value: string, full = false): string {
  const { year, month } = parseMonth(value);
  return `${(full ? FULL_MONTHS : MONTHS)[month - 1]} ${year}`;
}

export function formatRange(position: Pick<Position, "start" | "end">): string {
  return `${formatMonth(position.start)} – ${position.end ? formatMonth(position.end) : "Present"}`;
}

export function linkedinDescription(position: Position): string {
  const parts: string[] = [];
  if (position.description) parts.push(position.description);
  if (position.bullets.length > 0) parts.push(position.bullets.map((b) => `• ${b}`).join("\n"));
  return parts.join("\n\n");
}

export function allPositions(career: Career) {
  return career.companies.flatMap((company) =>
    company.positions.map((position) => ({ company, position })),
  );
}

// Returns human-readable problems; an empty array means the data is consistent.
export function validateCareer(career: Career): string[] {
  const problems: string[] = [];
  const stints = allPositions(career).map(({ company, position }) => ({
    label: `${position.title} at ${company.name}`,
    start: monthIndex(position.start),
    end: position.end ? monthIndex(position.end) : Number.POSITIVE_INFINITY,
    position,
  }));

  for (const s of stints) {
    if (s.end < s.start) problems.push(`${s.label}: ends before it starts`);
    if (linkedinDescription(s.position).length > LINKEDIN_DESCRIPTION_LIMIT) {
      problems.push(`${s.label}: LinkedIn description exceeds ${LINKEDIN_DESCRIPTION_LIMIT} characters`);
    }
    for (const forbidden of career.resumeRules.forbiddenTitles) {
      if (s.position.title === forbidden) problems.push(`${s.label}: uses forbidden title "${forbidden}"`);
    }
  }

  // No two stints may overlap; sharing a boundary month is fine (job changes mid-month).
  const byStart = [...stints].sort((a, b) => a.start - b.start);
  for (let i = 1; i < byStart.length; i += 1) {
    if (byStart[i].start < byStart[i - 1].end) {
      problems.push(`${byStart[i].label} overlaps ${byStart[i - 1].label}`);
    }
  }

  // Display order on the site and LinkedIn: most recent first, at company and position level.
  for (const company of career.companies) {
    const starts = company.positions.map((p) => monthIndex(p.start));
    if (starts.some((s, i) => i > 0 && s > starts[i - 1])) {
      problems.push(`${company.name}: positions are not newest first`);
    }
  }
  const companyStarts = career.companies.map((c) => Math.max(...c.positions.map((p) => monthIndex(p.start))));
  if (companyStarts.some((s, i) => i > 0 && s > companyStarts[i - 1])) {
    problems.push("Companies are not ordered newest first");
  }

  return problems;
}

export function renderLinkedIn(career: Career): string {
  const fence = (text: string) => ["```text", text, "```", ""];
  const out: string[] = [
    "# LinkedIn update",
    "",
    "Open the PR, read its \"LinkedIn: paste these\" list, and paste only those sections. Each box has a copy button. Everything below is the full reference, in the order LinkedIn's edit forms ask for it.",
    "",
    "## Profile > Headline",
    "",
    ...fence(career.profile.headline),
    "## Profile > About",
    "",
    ...fence(career.profile.summary.join("\n\n")),
  ];
  for (const company of career.companies) {
    for (const position of company.positions) {
      const end = position.end ? formatMonth(position.end, true) : "Present";
      const where = [`Location: ${position.location ?? "(not set)"}`];
      if (position.locationType) where.push(`Location type: ${position.locationType}`);
      out.push(
        `## Experience > ${position.title} at ${company.linkedinName}`,
        "",
        "Title:",
        "",
        ...fence(position.title),
        `Company: pick **${company.linkedinName}** from the list`,
        "",
        `Dates: ${formatMonth(position.start, true)} to ${end}`,
        "",
        `${where.join(" | ")}`,
        "",
        "Description:",
        "",
        ...fence(linkedinDescription(position)),
      );
    }
  }
  out.push("## Skills > Add skill (one at a time)", "", ...fence(career.skills.flatMap((g) => g.items).join("\n")));
  out.push("## Education > Lehigh", "");
  for (const e of career.education) {
    out.push(
      `School: ${e.school} | Degree: ${e.degree} | Field of study: ${e.field} | Dates: ${e.start} to ${e.end}`,
      "",
    );
    if (e.minor) out.push("Description:", "", ...fence(`Minor in ${e.minor}`));
  }
  out.push("## Licenses and certifications", "");
  const missing = career.certifications.filter((c) => !c.onLinkedIn);
  if (missing.length === 0) {
    out.push("No action. All certifications are already on LinkedIn.");
  } else {
    out.push("Add these:", "");
    for (const c of missing) {
      out.push(`- ${c.name}, issued by ${c.issuer}${c.issued ? `, ${formatMonth(c.issued, true)}` : ""}`);
    }
  }
  out.push("");
  return out.join("\n");
}
