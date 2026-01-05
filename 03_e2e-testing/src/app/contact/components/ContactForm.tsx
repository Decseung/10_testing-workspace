'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactMessage } from '@/actions/contact';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? '전송중...' : '제출'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.name && (
          <p className="text-red-600 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.email && (
          <p className="text-red-600 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          메시지 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.message && (
          <p className="text-red-600 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {state?.success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
