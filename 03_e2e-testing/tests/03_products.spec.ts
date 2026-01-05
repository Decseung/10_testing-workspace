import { expect, test } from "@playwright/test";

test.describe("상품 동적컨텐츠 테스트", () => {
  test("초기에 전체 상품 목록이 표시된다.", async ({ page }) => {
    await page.goto("/products");

    await expect(page.getByRole("article")).toHaveCount(12);
  });

  test("상품 검색 시나리오", async ({ page }) => {
    // 상품 목록 페이지 진입
    await page.goto("/products");

    // 검색어 ('마우스') 입력
    await page.getByPlaceholder("상품 검색").fill("마우스");
    // 검색 버튼 클릭
    await page.getByRole("button", { name: "검색" }).click();
    // 로딩상태 확인 - 로딩중... 보여지고 사라지는지
    await expect(page.getByText("로딩중...")).toBeVisible();
    await expect(page.getByText("로딩중...")).toBeHidden();
    // 필터링된 결과 확인 (4개의 상품인지)

    await expect(page.getByRole("article")).toHaveCount(4);
  });

  test("상품 상세 페이지 이동 시나리오", async ({ page }) => {
    await page.goto("/products");

    await page.getByRole("article").first().click();

    await expect(page).toHaveURL(/\/products\/\d+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "장바구니 담기" })
    ).toBeVisible();
  });
});
