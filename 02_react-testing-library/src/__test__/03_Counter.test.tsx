import Counter from "@/components/03_Counter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Counter 컴포넌트 테스트", () => {
  test("초기값이 0으로 표시된다.", () => {
    render(<Counter />);
    const countDisplay = screen.getByTestId("count");
    expect(countDisplay).toHaveTextContent("0");
  });

  test("증가 버튼을 클릭하면 카운트 1 증가한다.", async () => {
    // Arrange
    render(<Counter />);

    // Act
    const countDisplay = screen.getByTestId("count");
    const increaseBtn = screen.getByRole("button", { name: "증가" });

    expect(countDisplay).toHaveTextContent("0");

    // 가상의 사용자 인스턴스 생성
    const user = userEvent.setup();
    await user.click(increaseBtn);

    // Assert
    expect(countDisplay).toHaveTextContent("1");
  });

  // 감소 버튼
  test("감소 버튼 클릭하면 카운트 1 감소한다.", async () => {
    render(<Counter />);

    const counterDisplay = screen.getByTestId("count");
    const decreaseBtn = screen.getByRole("button", { name: "감소" });

    expect(counterDisplay).toHaveTextContent("0");

    const user = userEvent.setup();
    await user.click(decreaseBtn);

    expect(counterDisplay).toHaveTextContent("-1");
  });

  // 리셋 버튼

  test("리셋 버튼 클릭하면 카운트 리셋", async () => {
    render(<Counter />);

    const counterDisplay = screen.getByTestId("count");
    const increaseBtn = screen.getByRole("button", { name: "증가" });
    const resetBtn = screen.getByRole("button", { name: "리셋" });
    expect(counterDisplay).toHaveTextContent("0");

    const user = userEvent.setup();
    await user.click(increaseBtn);
    await user.click(increaseBtn);
    expect(counterDisplay).toHaveTextContent("2");

    await user.click(resetBtn);
    expect(counterDisplay).toHaveTextContent("0");
  });
});
