import test, { expect } from "@playwright/test";

test.describe("사용자 인증 플로우", () => {
  test("로그인 성공 시나리오", async ({ page }) => {
    await page.goto("/login");

    // when: 실행
    await page.getByLabel("이메일").fill("test@example.com");
    await page.getByLabel("비밀번호").fill("password123");

    await page.getByRole("button", { name: "로그인" }).click();
    // Then: 검증(대시보드 리다이렉트 되었는지)
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "대시보드"
    );
  });

  test("로그인 실패 시나리오", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("이메일").fill("test@example.com");
    await page.getByLabel("비밀번호").fill("abcabcabc");

    // 로그인 요청
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(
      page.getByText("이메일 또는 비밀번호가 잘못되었습니다.")
    ).toBeVisible();

    // 여전히 로그인페이지에 있는지 확인(검증)
    await expect(page).toHaveURL("/login");
  });
});
