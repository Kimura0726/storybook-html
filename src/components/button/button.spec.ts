// button.spec.ts
import { expect } from "@playwright/test";
import { test } from "../../../test-helpers/a11y-reporter";

test("Button should be accessible", async ({ runA11yTest }) => {
  const { results } = await runA11yTest("components-button--primary", [
    "wcag2a",
    "wcag2aa",
  ]);
  expect(results.violations).toEqual([]);
});
