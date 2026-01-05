describe("LifeCycle 동작 순서", () => {
  // 모든 테스트 케이스 시작 전에 한 번만 실행
  beforeAll(() => {
    console.log("======= beforeAll 동작 (최초한번) =======");
  });

  afterAll(() => {
    console.log("======= afterAll 동작 (최종 한번) =========");
  });

  beforeEach(() => {
    console.log("========= beForeEach (테스트 케이스 실행전) =========");
  });

  afterEach(() => {
    console.log("========= afterEach 동작 (각 테스트 실행 후에) =========");
  });

  test("첫번째", () => {
    console.log("첫번쨰 테스트 실행");
  });

  test("두번째", () => {
    console.log("두번째 테스트 실행");
  });
  test("세번째", () => {
    console.log("세번째 테스트 실행");
  });
});

// localStorage (Node.js 환경에서는 존재하지 않음) => Mock 객체 생성

const localStorageMock = () => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
};
global.localStorage = localStorageMock() as any;
import {
  addToCart,
  calculateCartTotal,
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  getCartItemCount,
  Product,
  removeFromCart,
} from "./03_lifecycle";

describe("장바구니 기능 테스트", () => {
  const testProduct1: Product = {
    id: 1,
    name: "노트북",
    price: 10000000,
    imageUrl: "/images/laptop.jpg",
  };
  const testProduct2: Product = {
    id: 2,
    name: "마우스",
    price: 30000,
    imageUrl: "/images/mouse.jpg",
  };

  afterEach(() => {
    localStorage.clear();
  });
  beforeEach(() => {
    localStorage.clear();
  });

  test("장바구니에 상품 추가 테스트", () => {
    const cart = addToCart(testProduct1, 1); // [{}]

    expect(cart).toHaveLength(1);
    expect(cart[0].productName).toBe("노트북");
    expect(cart[0].quantity).toBe(1);
  });

  test("장바구니에 같은 상품 추가시 수량만 증가되는지 테스트", () => {
    addToCart(testProduct1, 1);

    const cart = addToCart(testProduct1, 2);

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
  });

  test("장바구니 총 금액 계산 테스트", () => {
    addToCart(testProduct1, 1); // 1,000,000
    addToCart(testProduct2, 2); // 30,000 * 2 => 60,000

    const total = calculateCartTotal();
    const count = getCartItemCount();

    expect(total).toBe(10060000);
    expect(count).toBe(3);
  });

  test("장바구니에서 상품 제거 테스트", () => {
    addToCart(testProduct1);
    addToCart(testProduct2);

    const cart = removeFromCart(1);

    expect(cart).toHaveLength(1);
    expect(cart[0].productName).toBe("마우스");
  });

  test("장바구니 초기화", () => {
    addToCart(testProduct1, 1);
    addToCart(testProduct2, 1);

    clearCartFromLocalStorage();
    const cart = getCartFromLocalStorage();
    expect(cart).toHaveLength(0);
  });
});
