import TodoInput from "@/components/04_TodoInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TodoInput 컴포넌트 테스트", () => {
  test("입력 필드가 렌더링된다.", () => {
    const mockOnSubmit = jest.fn(); // () => {}
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");
    expect(input).toBeInTheDocument();
  });

  test("사용자 입력하면 값이 변경된다.", async () => {
    const mockOnSubmit = jest.fn(); // () => {}
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");

    const user = userEvent.setup();
    await user.type(input, "김밥 먹기"); // type() :  호버 => 클릭 => 포커스 => 키다운 => 입력 => 키업
  });

  test("추가 버튼을 클릭하면 onSubmit이 호출된다.", async () => {
    const mockOnSubmit = jest.fn(); // () => {}
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    // 입력(타이핑) 후 추가 버튼 클릭
    const user = userEvent.setup();
    await user.type(input, "라면 먹기");
    await user.click(submitBtn);

    // onSubmit으로 전달한 mock 함수가 1회 호출되는지, 올바른값이 전달되면서 호출되는지 확인
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("라면 먹기");
  });

  test("타이핑시 Enter키가 눌려지면 onSubmit이 호출된다.", async () => {
    const mockOnSubmit = jest.fn(); // () => {}
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");

    const user = userEvent.setup();
    // 특수키 : {Enter}, {Tab}, {Escape}, {Backspace}
    await user.type(input, "밥먹으러 가자{Enter}");
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("밥먹으러 가자");
  });

  test("공백만 입력하고 제출하면 onSubmit이 호출되지 않는다.", async () => {
    const mockOnSubmit = jest.fn();
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "      ");
    await user.click(submitBtn);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("제출 후 입력 필드는 초기화", async () => {
    const mockOnSubmit = jest.fn();
    render(<TodoInput onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "퇴근 하기");
    await user.click(submitBtn);

    expect(input).toHaveValue("");
  });
});
