export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">대시보드</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">환영합니다, 홍길동님!</h2>
          <p className="text-gray-600">
            로그인에 성공하셨습니다. 여기는 대시보드입니다.
          </p>
        </div>
      </main>
    </div>
  );
}
