import { expect, test } from "@playwright/test";

test("host can reach dashboard and edit scaffolded settings", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: "Appointment scheduler" })).toBeVisible();
  await expect(page.getByText("Upcoming", { exact: true })).toBeVisible();

  await page.getByLabel("Title").fill("Discovery Call");
  await page.getByLabel("Duration").selectOption("15");
  await page.getByRole("button", { name: "Save draft" }).click();
  await expect(page.getByText("Draft settings saved locally.")).toBeVisible();

  await page.getByRole("button", { name: "Save availability" }).click();
  await expect(page.getByText("Availability draft saved locally.")).toBeVisible();
});

test("invitee can book a public appointment slot", async ({ page }) => {
  await page.goto("/book/strategy-call");

  await expect(page.getByRole("heading", { name: "Strategy Call" })).toBeVisible();
  await page.locator("button").filter({ hasText: /AM|PM/ }).first().click();
  await page.getByLabel("Name").fill("Taylor Reed");
  await page.getByLabel("Email").fill("taylor@example.com");
  await page.getByLabel("Notes").fill("Looking forward to talking.");
  await page.getByRole("button", { name: "Confirm appointment" }).click();

  await expect(page.getByRole("heading", { name: "Booking confirmed" })).toBeVisible();
});

test("invitee can open a cancellation link", async ({ page }) => {
  await page.goto("/cancel/cancel-demo-001");

  await expect(page.getByRole("heading", { name: "Cancel appointment" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Confirm cancellation" })).toBeVisible();
});

test("host can use the email and password login screen", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Show password" })).toBeVisible();
  await expect(page.getByText("No social login options on this screen.")).toBeVisible();

  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByRole("textbox", { name: "Password" }).fill("password123");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(page.getByRole("button", { name: "Hide password" })).toBeVisible();
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("status")).toContainText("Email and password sign-in");

  await page.getByRole("link", { name: "Privacy policy" }).click();
  await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
  await page.goto("/login");
  await page.getByRole("link", { name: "Terms" }).click();
  await expect(page.getByRole("heading", { name: "Terms" })).toBeVisible();
});
