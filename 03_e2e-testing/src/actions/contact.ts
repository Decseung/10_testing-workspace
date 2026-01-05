'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  message: z.string().min(10, '메시지는 최소 10자 이상 입력해주세요'),
});

interface ContactResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function sendContactMessage(
  prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // 이메일 전송 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: '메시지가 전송되었습니다. 감사합니다!',
  };
}
