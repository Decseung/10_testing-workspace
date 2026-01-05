import Link from 'next/link';
import SignupForm from './components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">회원가입</h1>
        
        <SignupForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
