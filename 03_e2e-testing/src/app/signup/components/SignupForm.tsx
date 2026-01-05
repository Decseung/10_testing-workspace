'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signupAction } from '@/actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? '처리중...' : '회원가입'}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signupAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.name && (
          <p className="text-red-600 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

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
        />
        {state?.errors?.email && (
          <p className="text-red-600 text-sm mt-1">{state.errors.email[0]}</p>
        )}
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
        {state?.errors?.password && (
          <p className="text-red-600 text-sm mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{state.errors.confirmPassword[0]}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm">
          이용약관 동의 (필수)
        </label>
      </div>
      {state?.errors?.terms && (
        <p className="text-red-600 text-sm">{state.errors.terms[0]}</p>
      )}

      <SubmitButton />
    </form>
  );
}
