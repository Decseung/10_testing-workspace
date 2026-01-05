import test, { expect } from "@playwright/test";

test("홈페이지가 정상적으로 렌더링 된다.", async ({ page }) => {
  // 홈페이지로 이동
  await page.goto("/"); // baseURL(http://localhost:3000) + /

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "환영합니다"
  );

  await expect(page.getByRole("link", { name: "문의" })).toBeVisible();
  await expect(page.getByRole("link", { name: "로그인" })).toBeVisible();
});
