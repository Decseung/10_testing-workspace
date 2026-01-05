import UserProfile from "@/components/06_UserProfile";
import { render, screen, waitFor } from "@testing-library/react";

describe("UserProfile 컴포넌트 테스트", () => {
  test("초기에는 로딩 중 상태가 표시되어야 함", () => {
    // Arrange
    render(<UserProfile userId={1} />);

    // Act
    const loadingBox = screen.getByText("로딩 중...");

    // Assertions
    expect(loadingBox).toBeInTheDocument();
  });

  test("데이터 로딩이 완료(사용자 정보 조회 성공)되면 사용자 정보가 표시되어야 함", async () => {
    // fetch를 mocking 시키기 - 임의의 Prmoise<Response> 반환하는 함수로
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          id: 1,
          name: "홍길동",
          email: "hong@example.com",
          avatar: "http://example.com/avatar.png",
        }),
    });
    render(<UserProfile userId={1} />);
    const loadingBox = screen.getByText("로딩 중...");
    expect(loadingBox).toBeInTheDocument();

    await waitFor(
      () => {
        expect(loadingBox).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("hong@example.com")).toBeInTheDocument();
  });

  test("존재하지 않는 사용자 ID일 때 에러 메시지가 표시되어야 함", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () =>
        Promise.resolve({
          message: "사용자를 찾을 수 없습니다",
        }),
    });
    render(<UserProfile userId={999} />);
    const loadingBox = screen.getByText("로딩 중...");
    expect(loadingBox).toBeInTheDocument();

    const alertDiv = await screen.findByRole("alert");

    expect(alertDiv).toBeInTheDocument();
    expect(alertDiv).toHaveTextContent("사용자를 찾을 수 없습니다");
  });
});
