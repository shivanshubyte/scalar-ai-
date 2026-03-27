"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  BarChart3, 
  Building2, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Search, 
  Loader2,
  Users,
  DollarSign,
  X,
  CheckCircle2,
  Gift,
  Layers,
  ArrowUpRight,
  Copy,
  Sparkles,
  Share2,
  Lock,
  Mail
} from "lucide-react";

interface Lead {
  name: string;
  founders: string;
  revenue: string;
  score: number;
}

const generateLeads = (keyword: string): Lead[] => {
  const k = keyword.toLowerCase();
  let baseNames: string[] = [];
  let founders: string[] = ["Elena Vance", "Marcus Thorne", "Sarah Jenkins", "David Chen", "Julian Ross", "Marina Sol", "Carlos Mendez", "Sarah Bright", "Kenji Sato", "Aisha Khan"];
  
  if (k.includes("saas") || k.includes("software") || k.includes("tech")) {
    baseNames = ["CloudFlow", "DataNexus", "SaaSify", "LogicNode", "ScaleUp", "Syncro", "Vertex", "StreamLine", "OpsGenie", "AutoBot"];
  } else if (k.includes("real estate") || k.includes("property") || k.includes("housing")) {
    baseNames = ["Prime Realty", "Apex Holdings", "Skyline Estates", "Urban Nest", "Heritage Homes", "Vista Properties", "Summit Realty", "Metro Square", "Coastal Living", "Terra Firma"];
  } else if (k.includes("miami")) {
    baseNames = ["Miami PropTech", "Vice Ventures", "Magic City AI", "BeachSide SaaS", "Solaris Miami", "Coral Gables Tech", "Atlantic Digital", "Palmetto Systems", "Everglades AI", "Biscayne Bay Lab"];
  } else {
    baseNames = ["Innova", "NextGen", "Quantum", "Pulse", "Stratosphere", "CoreSync", "Aero", "Vantage", "Element", "Zenith"];
  }

  const shuffled = [...baseNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10).map((name) => ({
    name: name.includes(" ") ? name : `${name} ${Math.random() > 0.5 ? 'Labs' : 'Systems'}`,
    founders: founders[Math.floor(Math.random() * founders.length)],
    revenue: `$${(Math.random() * 15 + 0.5).toFixed(1)}M`,
    score: Math.floor(Math.random() * (99 - 85 + 1)) + 85
  }));
};

const initialLeads: Lead[] = [
  { name: "NovaStream AI", founders: "Elena Vance", revenue: "$2.4M", score: 98 },
  { name: "Quantum Ledger", founders: "Marcus Thorne", revenue: "$850K", score: 94 },
  { name: "Veridian Bio", founders: "Sarah Jenkins", revenue: "$1.2M", score: 91 },
  { name: "Orbit Systems", founders: "David Chen", revenue: "$5.1M", score: 89 },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Accessing Scalar Database...");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [blurredLeads, setBlurredLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBlurredLeads(generateLeads("generic").slice(5));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsScanning(true);
    setProgress(0);
    setStatusText("Accessing Scalar Database...");
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setWaitlistNumber(Math.floor(Math.random() * (60 - 40 + 1)) + 40);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Waitlist submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("SCALAR100");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareOnX = () => {
    const text = "Just reserved my first 100 verified leads on Scalar AI. The future of lead gen is here. 🚀 #ScalarAI #SaaS";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  useEffect(() => {
    if (isScanning) {
      const duration = 1500;
      const intervalTime = 30;
      const steps = duration / intervalTime;
      const increment = 100 / steps;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 33 && next < 66) setStatusText("Filtering by Fit Score...");
          if (next >= 66 && next < 95) setStatusText("Verifying Lead Contact Info...");
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              const allGenerated = generateLeads(query);
              setLeads(allGenerated.slice(0, 5));
              setBlurredLeads(allGenerated.slice(5));
              setIsScanning(false);
            }, 200);
            return 100;
          }
          return next;
        });
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [isScanning, query]);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 overflow-hidden pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-10 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-8 animate-fade-in">
          <Zap className="w-4 h-4" />
          <span>v1.0 is now live for enterprise</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-[1.1]">
          Intelligence <br /> that Scales.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Automated growth infrastructure for the next generation of startups. 
          Identify, qualify, and close leads with precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => { setIsModalOpen(true); setIsSuccess(false); }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all backdrop-blur-sm">
            Book Demo
          </button>
        </div>

        {/* Scalar Intelligence Search */}
        <div className="max-w-3xl mx-auto mb-20 relative group">
          <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur-lg group-focus-within:bg-blue-500/40 transition-all duration-500" />
          <form onSubmit={handleSearch} className="relative flex items-center p-2 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl">
            <Search className="w-6 h-6 ml-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads by niche, location, or tech stack..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 px-4 py-4 text-lg outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isScanning}
            />
            <button 
              type="submit"
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-blue-900/20"
            >
              {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Search Leads
            </button>
          </form>

          {isScanning && (
            <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between text-xs font-mono text-blue-400">
                <span>{statusText}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-100 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Lead Discovery Dashboard */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-4 text-xs text-slate-500 font-mono">intelligence_engine.v4.0</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">LIVE DATA FEED</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-white/5">
                    <th className="pb-4 font-medium px-4">Company Name</th>
                    <th className="pb-4 font-medium px-4">Founders</th>
                    <th className="pb-4 font-medium px-4">Est. Revenue</th>
                    <th className="pb-4 font-medium px-4 text-right">Scalar Fit Score</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {leads.map((lead) => (
                    <tr key={lead.name} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 font-medium px-4 text-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Building2 className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-bold">{lead.name}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-tighter">verified company</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-slate-400 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-600" />
                          {lead.founders}
                        </div>
                      </td>
                      <td className="py-5 px-4 font-medium text-slate-300">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-600" />
                          {lead.revenue}
                        </div>
                      </td>
                      <td className="py-5 text-right px-4">
                        <div className="inline-flex items-center gap-3">
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90 transform">
                              <circle 
                                cx="24" cy="24" r="20" 
                                fill="none" stroke="currentColor" 
                                strokeWidth="4" className="text-white/5" 
                              />
                              <circle 
                                cx="24" cy="24" r="20" 
                                fill="none" stroke="currentColor" 
                                strokeWidth="4" 
                                strokeDasharray={126}
                                strokeDashoffset={126 - (126 * lead.score) / 100}
                                strokeLinecap="round"
                                className="text-blue-500 transition-all duration-1000 delay-300" 
                              />
                            </svg>
                            <span className="absolute text-[10px] font-bold text-slate-300">{lead.score}%</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {blurredLeads.map((lead, idx) => (
                    <tr key={`blur-${idx}`} className="border-b border-white/5 last:border-0 blur-[6px] opacity-20 select-none grayscale pointer-events-none">
                      <td className="py-5 font-medium px-4 text-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="font-bold">{lead.name}</div>
                        </div>
                      </td>
                      <td className="py-5 text-slate-400 px-4">{lead.founders}</td>
                      <td className="py-5 px-4 font-medium text-slate-300">{lead.revenue}</td>
                      <td className="py-5 text-right px-4">
                        <div className="inline-flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full border-4 border-white/5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!isScanning && (
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent flex items-end justify-center pb-8">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold backdrop-blur-md"
                  >
                    <Lock className="w-4 h-4" />
                    Reveal 100+ More Leads
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-10">
            Trusted by the next generation of giants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale contrast-125">
            <div className="flex items-center gap-2 font-bold text-xl"><Rocket className="w-6 h-6" /> STARLING</div>
            <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 className="w-6 h-6" /> NEXUS</div>
            <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> FORTRESS</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> PULSE</div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {!isSuccess ? (
              <div className="p-8 md:p-12">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-8">
                  <Gift className="w-8 h-8 text-blue-400" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Join the Scalar Beta</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Experience automated lead discovery. When you join our beta, you'll receive <span className="text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">100 Verified Leads for free</span>.
                </p>

                {/* Email Form */}
                <form onSubmit={handleReserve} className="space-y-6 mb-8">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                      <Layers className="w-4 h-4" /> Compare Tiers
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                          Pro <ArrowUpRight className="w-3 h-3 text-slate-500" />
                        </div>
                        <div className="text-[11px] text-slate-400">500 Leads/mo + CSV Export</div>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                        <div className="text-sm font-bold text-blue-400 mb-1 flex items-center justify-between">
                          Scale <ArrowUpRight className="w-3 h-3 text-blue-400" />
                        </div>
                        <div className="text-[11px] text-slate-400">1,000 Leads/mo + AI Analysis</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reserve My 100 Free Leads"}
                  </button>
                  <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    Limited to the first 100 beta testers to ensure lead quality.
                  </p>
                </form>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-8 mx-auto">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>

                <h2 className="text-4xl font-bold text-white mb-2">You're in!</h2>
                <p className="text-blue-400 font-mono text-sm mb-8 tracking-widest uppercase">
                  You are # {waitlistNumber} on the priority list.
                </p>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-bold">Your Beta Access Code</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-black text-white tracking-[0.2em]">{isCopied ? "COPIED!" : "SCALAR100"}</span>
                    {!isCopied && (
                      <button 
                        onClick={copyToClipboard}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                      >
                        <Copy className="w-5 h-5 text-slate-400 group-hover:text-white" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={shareOnX}
                    className="w-full py-4 bg-slate-50 hover:bg-white text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <Share2 className="w-5 h-5" />
                    Share on X for Priority Access
                  </button>
                  <p className="text-[10px] text-slate-500 italic">
                    Refer your first partner to jump 10 spots ahead.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-slate-600 text-xs">
        &copy; 2026 Scalar AI Platform. All rights reserved. Built for hyper-scale.
      </footer>
    </main>
  );
}
