import Link from 'next/link';
import { ArrowRight, Grid, PieChart, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Intuition
          </span>
          .Math
        </h1>
        <p className="text-xl md:text-2xl text-text-dim max-w-2xl mb-12">
          Don&apos;t just read math. <span className="text-white">Touch it.</span><br />
          Interactive explorations of Linear Algebra, Probability, and Statistics.
        </p>

        <Link
          href="/linear-algebra/vectors"
          className="group px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-white transition-colors flex items-center gap-2"
        >
          Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Modules Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-12 border-b border-white/10 pb-4">Modules</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link href="/linear-algebra/vectors" className="glass-panel p-8 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Grid className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Linear Algebra</h3>
            <p className="text-text-dim">Vectors, Matrices, and the structure of space.</p>
          </Link>

          {/* Card 2 */}
          <div className="glass-panel p-8 opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
              <PieChart className="text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Probability</h3>
            <p className="text-text-dim">Uncertainty, Distributions, and Chance. (Coming Soon)</p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Activity className="text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Statistics</h3>
            <p className="text-text-dim">Describing the world with data. (Coming Soon)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
