'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from '@/actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? '로그인 중...' : '로그인'}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state?.error && (
        <div role="alert" className="text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
