import Card from "@/components/02_Card";
import { render, screen } from "@testing-library/react";

describe("Card 컴포넌트 테스트", () => {
  test("필수 props인 title이 렌더링된다.", () => {
    render(<Card title="카드 제목" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("카드 제목");
  });

  test("description props를 전달하면 렌더링된다.", () => {
    render(<Card title="카드 제목" description="카드 설명입니다." />);

    expect(screen.getByText("카드 설명입니다.")).toBeInTheDocument();
  });

  test("description props를 전달하지 않으면 렌더링 되지 않는다.", () => {
    render(<Card title="카드 제목" />);

    expect(screen.queryByText("카드 설명입니다.")).not.toBeInTheDocument();
    expect(screen.queryByText("카드 설명입니다.")).toBeNull();
  });

  test("모든 props가 제공되면 완전한 카드가 렌더링된다.", () => {
    render(
      <Card
        title="완전한 카드"
        description="이것은 설명입니다."
        imageUrl="http://example.com/image.jpg"
        footer={<button>액션 버튼</button>}
      />
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "완전한 카드"
    );
    expect(screen.getByText("이것은 설명입니다.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "완전한 카드" })).toHaveAttribute(
      "src",
      "http://example.com/image.jpg"
    );
    expect(
      screen.getByRole("button", { name: "액션 버튼" })
    ).toBeInTheDocument();
  });
});
