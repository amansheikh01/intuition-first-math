import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <div className="layout-container text-center py-20">
          <h1 className="text-5xl md:text-7xl mb-8 leading-tight tracking-tight text-text-primary">
            Redefining Mathematical <br />
            Understanding
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary font-sans max-w-2xl mx-auto leading-relaxed mb-12">
            Advanced interactive learning systems built with clarity,
            visual intuition, and computational rigor.
          </p>

          <Link
            href="/subjects"
            className="inline-block px-10 py-5 bg-text-primary text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl shadow-xl shadow-black/10"
          >
            Explore Subjects
          </Link>
        </div>
      </main>
    </div>
  );
}
