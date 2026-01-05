import Header from '@/components/Header';
import ContactForm from './components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">문의하기</h1>

        <div className="bg-white p-8 rounded-lg shadow">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
