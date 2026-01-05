import test, { expect } from "@playwright/test";

test("전체 구매 프로세스 (홈페이지 접속 -> 상품선택 -> 장바구니 -> 주문 -> 완료) 테스트", async ({
  page,
}) => {
  page.goto("/");
  expect(page.getByRole("heading", { level: 1 })).toHaveText("환영합니다");

  await page.getByRole("link", { name: "쇼핑 시작하기" }).click();

  await expect(page).toHaveURL("/products");

  await page.getByRole("article").first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "무선 키보드"
  );
  await page.getByRole("button", { name: "장바구니 담기" }).click();
  await expect(page.getByText("장바구니에 추가되었습니다")).toBeVisible();
  await expect(page.getByText("장바구니에 추가되었습니다")).toBeHidden();

  await page.getByRole("link", { name: "장바구니" }).click();
  await expect(page).toHaveURL("/cart");

  await page.getByRole("button", { name: "구매하기" }).click();
  await expect(page).toHaveURL("/checkout");

  await page.getByLabel("받는 사람").fill("홍길동");
  await page.getByLabel("연락처").fill("01012341234");
  await page.getByLabel("주소").fill("서울");
  await page.getByLabel("카드 번호").fill("1234567890123456");
  await page.getByLabel("만료일").fill("12/25");
  await page.getByLabel("CVC").fill("486");
  await page.getByRole("button", { name: "결제하기" }).click();

  await expect(page.getByText("결제 처리중...")).toBeVisible();
  await expect(page.getByText("결제 처리중...")).toBeHidden();

  await expect(page).toHaveURL(/\/order\/\d+/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "주문이 완료되었습니다"
  );

  await page.getByRole("link", { name: "홈으로" }).click();
  await expect(page).toHaveURL("/");
});
