import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { solutions } from '../solutionsData';
import { Shield } from 'lucide-react';

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = solutions.find(s => s.id === id);
  if (!item) return notFound();

  const Icon = item.icon as any;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumbs & Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link> 
          <span className="mx-2">/</span> 
          <Link href="/solutions" className="text-green-500 hover:text-green-400 transition-colors">SOLUTIONS</Link>
          <span className="mx-2">/</span> 
          <span className="text-gray-200 uppercase tracking-wider">{item.navLabel}</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
          <img src={item.image || '/assets/mission-critical.jpg'} alt={item.pageH1} className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/20 text-green-400 backdrop-blur-md border border-green-500/30 mb-6">
              <Icon className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{item.pageH1}</h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{item.navShortText}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Solution Overview Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1 bg-green-500 rounded-full" />
                <h2 className="text-3xl font-bold">Solution Overview</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {item.headIntro}
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  {item.overviewExtended}
                </p>
              </div>
            </section>

            {/* Key Features / Key Points */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black hover:border-green-500/30 transition-all group overflow-hidden">
                <div className="h-40 w-full overflow-hidden relative">
                  <img 
                    src="/assets/wireless-radio.jpg" 
                    alt="Technical Hardware" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </span>
                    Technical Excellence
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    {item.technicalPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-green-500 font-bold">0{idx + 1}</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black hover:border-green-500/30 transition-all group overflow-hidden">
                <div className="h-40 w-full overflow-hidden relative">
                  <img 
                    src="/assets/managed-network.jpg" 
                    alt="Network Management" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5" />
                    </span>
                    Enterprise Resilience
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    {item.resiliencePoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-green-500 font-bold">0{idx + 1}</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Strategic Value */}
            <section className="rounded-3xl border border-white/10 p-8 md:p-12 bg-[#050505] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] -mr-32 -mt-32" />
              <h3 className="text-2xl font-bold mb-8">Strategic Advantage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {item.strategicAdvantages.map((adv, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-green-400 font-semibold uppercase tracking-wider text-sm">{adv.title}</h4>
                    <p className="text-gray-400 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact Section */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold">Industry-Specific Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(item as any).impactBullets?.map((b: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{b}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300">Rapid deployment without trenching fiber</span>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300">Enterprise-grade reliability for mission-critical workloads</span>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Contact/CTA Card */}
              <div className="rounded-2xl bg-green-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Deploy?</h3>
                <p className="text-green-100 mb-6">
                  Consult with our network engineers to design a custom solution for your specific requirements.
                </p>
                <Link 
                  href="/#demo-form" 
                  className="block w-full py-3 px-6 bg-white text-green-600 text-center font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Request a Solution
                </Link>
              </div>

              {/* Navigation Card */}
              <div className="rounded-2xl border border-white/10 p-8 bg-[#0a0a0a]">
                <h3 className="text-xl font-semibold mb-6">Other Solutions</h3>
                <div className="space-y-4">
                  {solutions.filter(s => s.id !== item.id).slice(0, 5).map(s => {
                    const OtherIcon = s.icon as any;
                    return (
                      <Link 
                        key={s.id} 
                        href={`/solutions/${s.id}`} 
                        className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="text-sm font-medium">{s.navLabel}</span>
                        <div className="h-px flex-grow mx-4 bg-white/5 group-hover:bg-green-500/30 transition-colors" />
                        <OtherIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link 
                href="/solutions" 
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>View All Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
