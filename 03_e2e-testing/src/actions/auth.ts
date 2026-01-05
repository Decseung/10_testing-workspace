'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginAction(
  prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 실제로는 DB 확인, 여기서는 목업
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'test@example.com' && password === 'password123') {
    // 쿠키에 세션 저장 (실제로는 JWT 등 사용)
    (await cookies()).set('session', 'mock-session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1주일
      path: '/',
    });

    redirect('/dashboard');
  } else {
    return {
      success: false,
      error: '이메일 또는 비밀번호가 잘못되었습니다',
    };
  }
}

export async function logoutAction() {
  (await cookies()).delete('session');
  redirect('/login');
}



const signupSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  confirmPassword: z.string(),
  terms: z.literal('on').or(z.literal(true)),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

interface SignupResult {
  success: boolean;
  errors?: Record<string, string[]>;
}

export async function signupAction(
  prevState: SignupResult | null,
  formData: FormData
): Promise<SignupResult> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    terms: formData.get('terms'), // 'on' 또는 null
  };

  // terms 체크박스 검증
  if (!rawData.terms) {
    return {
      success: false,
      errors: {
        terms: ['이용약관에 동의해주세요'],
      },
    };
  }

  // Zod 검증
  const validation = signupSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // DB 저장 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 성공 시 자동 로그인
  (await cookies()).set('session', 'mock-session-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  redirect('/dashboard');
}

