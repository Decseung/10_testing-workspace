import TodoList from "@/components/05_TodoList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { todo } from "node:test";

describe("TodoList 컴포넌트 테스트", () => {
  test("초기에는 할 일 목록이 비어있다.", () => {
    render(<TodoList />);

    expect(screen.getByText("할 일이 없습니다")).toBeInTheDocument();
  });

  test("할 일을 추가 할 수 있다.", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "모달 완성");
    await user.click(submitBtn);

    expect(screen.getByText("모달 완성")).toBeInTheDocument();
    expect(screen.queryByText("할 일이 없습니다")).not.toBeInTheDocument();
  });

  test("할 일을 완료 처리 할 수 있다.", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "모달 완성");
    await user.click(submitBtn);

    // checkbox 요소 찾기 : getByRole('checkbox', {name: aria-label})
    const checkbox = screen.getByRole("checkbox", {
      name: "모달 완성 완료 표시",
    });
    await user.click(checkbox);

    // 특정 요소의 가장 가까운 xx 부모 요소 찾기 : 요소.closest('xx')
    const todoItem = checkbox.closest("li");
    // 요소가 특정 Class를 가지고 있는지 확인
    expect(todoItem).toHaveClass("line-through");
    // 요소가 체크 되었는지 확인
    expect(checkbox).toBeChecked();
  });

  test("완료된 할 일을 다시 활성화 할 수 있다.", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "모달 완성");
    await user.click(submitBtn);

    // checkbox 요소 찾기 : getByRole('checkbox', {name: aria-label})
    const checkbox = screen.getByRole("checkbox", {
      name: "모달 완성 완료 표시",
    });
    await user.click(checkbox);

    // 특정 요소의 가장 가까운 xx 부모 요소 찾기 : 요소.closest('xx')
    const todoItem = checkbox.closest("li");
    // 요소가 특정 Class를 가지고 있는지 확인
    expect(todoItem).toHaveClass("line-through");
    // 요소가 체크 되었는지 확인
    expect(checkbox).toBeChecked();

    // 다시 활성화
    await user.click(checkbox);
    expect(todoItem).not.toHaveClass("line-through");
    expect(checkbox).not.toBeChecked();
  });

  test("할 일을 삭제 할 수 있다.", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("할 일 입력");
    const submitBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "모달 완성");
    await user.click(submitBtn);

    // 할일 삭제
    const deleteBtn = screen.getByRole("button", { name: "모달 완성 삭제" });
    await user.click(deleteBtn);

    expect(screen.queryByText("모달 완성")).not.toBeInTheDocument();
  });

  test("필터링이 정상적으로 동작한다.", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("할 일 입력");
    const addBtn = screen.getByRole("button", { name: "추가" });

    const user = userEvent.setup();
    await user.type(input, "할일 1");
    await user.click(addBtn);
    await user.type(input, "할일 2");
    await user.click(addBtn);
    await user.type(input, "할일 3");
    await user.click(addBtn);

    const checkbox = screen.getByRole("checkbox", {
      name: "할일 1 완료 표시",
    });
    await user.click(checkbox);

    const allBtn = screen.getByRole("button", { name: /전체/ });
    const completeBtn = screen.getByRole("button", { name: /완료/ });
    const activeBtn = screen.getByRole("button", { name: /활성/ });

    await user.click(completeBtn);
    expect(screen.getByText("할일 1")).toBeInTheDocument();
    expect(screen.queryByText("할일 2")).not.toBeInTheDocument();
    expect(screen.queryByText("할일 3")).not.toBeInTheDocument();

    await user.click(activeBtn);
    expect(screen.queryByText("할일 1")).not.toBeInTheDocument();
    expect(screen.getByText("할일 2")).toBeInTheDocument();
    expect(screen.getByText("할일 3")).toBeInTheDocument();

    await user.click(allBtn);
    expect(screen.getByText("할일 1")).toBeInTheDocument();
    expect(screen.getByText("할일 2")).toBeInTheDocument();
    expect(screen.getByText("할일 3")).toBeInTheDocument();
  });
});
