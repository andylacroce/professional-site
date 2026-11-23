import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import careerData from "@/data/career.json";
import {
  LINKEDIN_DESCRIPTION_LIMIT,
  allPositions,
  formatMonth,
  formatRange,
  linkedinDescription,
  monthIndex,
  renderFacts,
  renderLinkedIn,
  validateCareer,
  type Career,
} from "@/lib/career";

const career = careerData as Career;
const clone = (): Career => JSON.parse(JSON.stringify(career));
const read = (file: string) => readFileSync(path.join(process.cwd(), file), "utf8");

describe("career data", () => {
  it("is internally consistent", () => {
    expect(validateCareer(career)).toEqual([]);
  });

  it("has generated career/ files that match the data (run `npm run career:sync`)", () => {
    expect(read("career/linkedin.md")).toBe(renderLinkedIn(career));
    expect(read("career/facts.md")).toBe(renderFacts(career));
  });

  it("keeps every LinkedIn description within the character limit", () => {
    for (const { position } of allPositions(career)) {
      expect(linkedinDescription(position).length).toBeLessThanOrEqual(LINKEDIN_DESCRIPTION_LIMIT);
    }
  });
});

describe("validateCareer", () => {
  it("flags overlapping stints", () => {
    const bad = clone();
    bad.companies[0].positions[0].start = "2023-01";
    expect(validateCareer(bad).some((p) => p.includes("overlaps"))).toBe(true);
  });

  it("flags a stint that ends before it starts", () => {
    const bad = clone();
    bad.companies[0].positions[0].end = "2020-01";
    expect(validateCareer(bad).some((p) => p.includes("ends before it starts"))).toBe(true);
  });

  it("flags forbidden titles", () => {
    const bad = clone();
    bad.companies[0].positions[0].title = "Lead Technical Project Manager";
    expect(validateCareer(bad).some((p) => p.includes("forbidden title"))).toBe(true);
  });

  it("flags oversized LinkedIn descriptions", () => {
    const bad = clone();
    bad.companies[0].positions[0].bullets = ["x".repeat(LINKEDIN_DESCRIPTION_LIMIT + 1)];
    expect(validateCareer(bad).some((p) => p.includes("exceeds"))).toBe(true);
  });

  it("flags companies and positions that are not newest first", () => {
    const swapped = clone();
    swapped.companies.reverse();
    expect(validateCareer(swapped)).toContain("Companies are not ordered newest first");

    const reordered = clone();
    const comcast = reordered.companies.find((c) => c.id === "comcast")!;
    comcast.positions.reverse();
    expect(validateCareer(reordered).some((p) => p.includes("not newest first"))).toBe(true);
  });
});

describe("formatting", () => {
  it("formats months and ranges", () => {
    expect(formatMonth("2024-04")).toBe("Apr 2024");
    expect(formatMonth("2024-04", true)).toBe("April 2024");
    expect(formatRange({ start: "2024-04", end: "2025-06" })).toBe("Apr 2024 – Jun 2025");
    expect(formatRange({ start: "2024-04", end: null })).toBe("Apr 2024 – Present");
    expect(monthIndex("2024-02") - monthIndex("2024-01")).toBe(1);
  });

  it("rejects malformed months", () => {
    expect(() => formatMonth("2024-13")).toThrow();
  });

  it("builds LinkedIn descriptions from description and bullets", () => {
    expect(linkedinDescription({ title: "t", start: "2020-01", end: null, bullets: [] })).toBe("");
    expect(
      linkedinDescription({ title: "t", start: "2020-01", end: null, description: "d", bullets: ["a", "b"] }),
    ).toBe("d\n\n• a\n• b");
  });

  it("marks missing locations and current roles in generated docs", () => {
    const withCurrent = clone();
    withCurrent.companies[0].positions[0].end = null;
    withCurrent.companies[0].positions[0].location = undefined;
    expect(renderLinkedIn(withCurrent)).toContain("- End: Present");
    expect(renderFacts(withCurrent)).toContain("(not set)");
  });
});
