// 덧셈연산을 위한 함수
export function sum(a: number, b: number): number {
  return a + b;
}
// 나눗셈을 위한 함수
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }
  return a / b;
}
