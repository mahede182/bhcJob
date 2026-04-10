import { SAR_TO_BDT } from "@/constants/data";

/**
 * Format salary range with BDT approximation.
 * e.g. "SAR 1,700 - 2,000 (BDT 56,100 approx.)"
 */
export function formatSalary(
  min: number,
  max: number | null,
  currency: string,
): { primary: string; secondary: string } {
  const fmtNum = (n: number) => n.toLocaleString("en-US");

  const primary = max
    ? `${currency} ${fmtNum(min)} - ${fmtNum(max)}`
    : `${currency} ${fmtNum(min)}`;

  const bdtMin = min * SAR_TO_BDT;
  const bdtMax = max ? max * SAR_TO_BDT : null;

  const secondary = bdtMax
    ? `BDT ${fmtNum(bdtMin)} - ${fmtNum(bdtMax)} approx.`
    : `BDT ${fmtNum(bdtMin)} approx.`;

  return { primary, secondary };
}

/**
 * Format food option display text.
 * Returns null if no food benefit exists.
 */
export function formatFoodAllowance(
  foodOption: "provided" | "allowance" | null,
  foodAmount: number | null,
  currency: string,
): { primary: string; secondary: string } | null {
  if (!foodOption) return null;

  if (foodOption === "provided") {
    return { primary: "Food Provided", secondary: "by the company" };
  }

  if (foodOption === "allowance" && foodAmount) {
    const bdtAmount = foodAmount * SAR_TO_BDT;
    const fmtNum = (n: number) => n.toLocaleString("en-US");
    return {
      primary: `Food Allowance: ${currency} ${fmtNum(foodAmount)}`,
      secondary: `BDT ${fmtNum(bdtAmount)} approx.`,
    };
  }

  return null;
}

/**
 * Format expiry date to readable deadline string.
 * e.g. "21 April, 2026"
 */
export function formatDeadline(expiry: string | null): string | null {
  if (!expiry) return null;

  try {
    const date = new Date(expiry);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}
