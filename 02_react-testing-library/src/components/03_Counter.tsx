'use client';

import { useState } from 'react';

// useState를 사용하여 상태를 관리하고, 버튼 클릭으로 상태를 변경하는 컴포넌트
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">카운터</h2>
      <div className="text-4xl font-bold mb-4" data-testid="count">
        {count}
      </div>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          감소
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          리셋
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          증가
        </button>
      </div>
    </div>
  );
}

