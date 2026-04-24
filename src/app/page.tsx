"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// AI-generated skit "videos" — each has a sequence of frames (emoji animations + text)
const SKITS = [
  { id: "1", title: "When the WiFi drops mid-Zoom", creator: "AI Comedy Lab", emoji: "🤣", category: "comedy", isPremium: false,
    frames: [
      { emoji: "👨‍💼", text: "And that's why our Q3 revenue...", delay: 2000 },
      { emoji: "📡❌", text: "*WiFi disconnected*", delay: 1500 },
      { emoji: "👨‍💼🤷", text: "Hello? Can anyone hear me?", delay: 2000 },
      { emoji: "👩‍💻", text: "Your WiFi just left the chat", delay: 2000 },
      { emoji: "👨‍💼😤", text: "WHY DOES THIS ALWAYS—", delay: 1500 },
      { emoji: "📡✅", text: "*WiFi reconnected*", delay: 1500 },
      { emoji: "👨‍💼", text: "...so as I was saying—", delay: 1500 },
      { emoji: "👩‍💻😴", text: "Meeting's been over for 20 min", delay: 2500 },
    ]},
  { id: "2", title: "POV: You're the last slice of pizza", creator: "SkitBot", emoji: "🍕", category: "comedy", isPremium: false,
    frames: [
      { emoji: "🍕🍕🍕", text: "The pizza arrives. 8 slices.", delay: 2000 },
      { emoji: "🍕🍕", text: "5 minutes later...", delay: 2000 },
      { emoji: "🍕", text: "Everyone looks at the last slice", delay: 2000 },
      { emoji: "🧑", text: "I'm not hungry", delay: 1500 },
      { emoji: "🧑‍🤝‍🧑", text: "Me neither", delay: 1500 },
      { emoji: "👀🍕", text: "...", delay: 2000 },
      { emoji: "🏃💨🍕", text: "MINE", delay: 2000 },
      { emoji: "😭", text: "They chose violence", delay: 2500 },
    ]},
  { id: "3", title: "How cats see vacuum cleaners", creator: "PetAI Studios", emoji: "🐱", category: "animals", isPremium: false,
    frames: [
      { emoji: "🐱😌", text: "Just a peaceful Tuesday", delay: 2000 },
      { emoji: "🤖🔊", text: "VROOOOOM", delay: 1500 },
      { emoji: "🐱😱", text: "THE DEMON AWAKENS", delay: 2000 },
      { emoji: "🐱💨", text: "Evacuate immediately", delay: 2000 },
      { emoji: "🐱🧗", text: "Scale the curtains", delay: 1500 },
      { emoji: "🐱🪴", text: "Knock over every plant", delay: 2000 },
      { emoji: "🤖🔇", text: "*vacuum stops*", delay: 1500 },
      { emoji: "🐱😌", text: "What demon? I was always here", delay: 2500 },
    ]},
  { id: "4", title: "The Karen vs the self-checkout", creator: "AI Comedy Lab", emoji: "😤", category: "comedy", isPremium: true,
    frames: [
      { emoji: "👩‍🦳🛒", text: "Scans item... BEEP", delay: 2000 },
      { emoji: "🤖", text: "Unexpected item in bagging area", delay: 2000 },
      { emoji: "👩‍🦳", text: "There's NOTHING there", delay: 1500 },
      { emoji: "🤖", text: "Please wait for assistance", delay: 2000 },
      { emoji: "👩‍🦳📞", text: "I want to speak to your manager", delay: 2000 },
      { emoji: "🤖", text: "I AM the manager", delay: 2000 },
      { emoji: "👩‍🦳😱", text: "...", delay: 2000 },
      { emoji: "🤖😊", text: "Please remove the unexpected item: your ego", delay: 2500 },
    ]},
  { id: "5", title: "When autocorrect ruins your job interview", creator: "SkitBot", emoji: "📱", category: "relatable", isPremium: true,
    frames: [
      { emoji: "📱", text: "Typing to recruiter...", delay: 2000 },
      { emoji: "🧑", text: "I'm very excited for this opportunity", delay: 2000 },
      { emoji: "📱", text: "Sent: I'm very excited for this operatic community", delay: 2500 },
      { emoji: "🧑😱", text: "NO WAIT", delay: 1500 },
      { emoji: "📱", text: "I have strong attention to detail", delay: 2000 },
      { emoji: "📱", text: "Sent: I have strong denture to the tea", delay: 2500 },
      { emoji: "🧑💀", text: " autocorrect pls ", delay: 1500 },
      { emoji: "📱", text: "Sent: I'll bring passionate to the team", delay: 2500 },
    ]},
  { id: "6", title: "Dog realizes it's bath day", creator: "PetAI Studios", emoji: "🐕", category: "animals", isPremium: false,
    frames: [
      { emoji: "🐕😊", text: "Best day ever! Going for a walk!", delay: 2000 },
      { emoji: "🐕🤔", text: "Wait... this isn't the park", delay: 2000 },
      { emoji: "🚿", text: "The bathroom appears", delay: 1500 },
      { emoji: "🐕😱", text: "BETRAYAL", delay: 2000 },
      { emoji: "🐕🏃", text: "Not today Satan", delay: 2000 },
      { emoji: "👩🚿", text: "Get back here!", delay: 1500 },
      { emoji: "🐕🛁", text: "This is fine. I'm fine.", delay: 2000 },
      { emoji: "🐕💦", text: "I will remember this", delay: 2500 },
    ]},
  { id: "7", title: "Boss catches you dancing at your desk", creator: "OfficeAI", emoji: "💃", category: "relatable", isPremium: true,
    frames: [
      { emoji: "🧑‍💻🎵", text: "Working hard or hardly working", delay: 2000 },
      { emoji: "🧑‍💻🕺", text: "Wait... my jam comes on", delay: 2000 },
      { emoji: "🧑‍💻💃🔥", text: "FULL DANCE MODE", delay: 2000 },
      { emoji: "👔👀", text: "...", delay: 1500 },
      { emoji: "🧑‍💻🫣", text: "How long have you been there?", delay: 2000 },
      { emoji: "👔", text: "Long enough", delay: 2000 },
      { emoji: "👔🕺", text: "But I respect the moves", delay: 2000 },
      { emoji: "🧑‍💻💃👔💃", text: "OFFICE DANCE PARTY", delay: 2500 },
    ]},
  { id: "8", title: "When GPS says 'you have arrived'", creator: "AI Comedy Lab", emoji: "🗺️", category: "comedy", isPremium: false,
    frames: [
      { emoji: "🚗📍", text: "You have arrived at your destination", delay: 2000 },
      { emoji: "🧑", text: "...I'm in a cornfield", delay: 2000 },
      { emoji: "📱", text: "Recalculating...", delay: 1500 },
      { emoji: "📱", text: "You have arrived", delay: 1500 },
      { emoji: "🧑", text: "This is a LAKE", delay: 2000 },
      { emoji: "📱", text: "Recalculating...", delay: 1500 },
      { emoji: "📱", text: "You have arrived", delay: 1500 },
      { emoji: "🧑🏠", text: "I live 3 blocks away from here", delay: 2500 },
    ]},
  { id: "9", title: "Cat judges your life choices at 3am", creator: "PetAI Studios", emoji: "🐈‍⬛", category: "animals", isPremium: true,
    frames: [
      { emoji: "🕐3️⃣", text: "3:00 AM", delay: 1500 },
      { emoji: "🧑📱", text: "Just one more video...", delay: 2000 },
      { emoji: "🐈‍⬛👀", text: "The cat appears", delay: 1500 },
      { emoji: "🐈‍⬛😐", text: "You have work in 5 hours", delay: 2000 },
      { emoji: "🧑", text: "I know but—", delay: 1500 },
      { emoji: "🐈‍⬛", text: "Your life is a mess", delay: 2000 },
      { emoji: "🧑😭", text: "You're right", delay: 1500 },
      { emoji: "🐈‍⬛😴", text: "*falls asleep on your phone*", delay: 2500 },
    ]},
  { id: "10", title: "The group chat when someone says 'who's paying?'", creator: "SkitBot", emoji: "💰", category: "relatable", isPremium: false,
    frames: [
      { emoji: "🧑", text: "Who's paying for dinner?", delay: 2000 },
      { emoji: "👥", text: "...", delay: 2000 },
      { emoji: "🧑‍🦱", text: "I paid last time", delay: 1500 },
      { emoji: "🧑‍🦰", text: "My wallet is at home", delay: 1500 },
      { emoji: "🧑", text: "I only have card", delay: 1500 },
      { emoji: "📱", text: "*everyone goes offline*", delay: 2000 },
      { emoji: "🧑😩", text: "Every. Single. Time.", delay: 2000 },
      { emoji: "🧑💳", text: "*pays for everyone*", delay: 2500 },
    ]},
];

const CATEGORIES = [
  { slug: "all", name: "🔥 All" },
  { slug: "comedy", name: "😂 Comedy" },
  { slug: "relatable", name: "🤷 Relatable" },
  { slug: "animals", name: "🐾 Animals" },
];

function SkitPlayer({ skit, onClose }: { skit: typeof SKITS[0]; onClose: () => void }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const frame = skit.frames[frameIndex];

  useEffect(() => {
    if (!isPlaying) return;
    if (frameIndex >= skit.frames.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setFrameIndex((prev) => prev + 1);
    }, skit.frames[frameIndex].delay);
    return () => clearTimeout(timer);
  }, [frameIndex, isPlaying, skit]);

  const progress = ((frameIndex + 1) / skit.frames.length) * 100;
  const isFinished = frameIndex >= skit.frames.length;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" onClick={onClose}>
      {/* Close button */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10">✕</button>

      {/* Video area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg px-8" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <p className="text-white font-bold text-lg text-center mb-8">{skit.title}</p>

        {/* Main frame */}
        <div className="w-full aspect-square rounded-3xl flex items-center justify-center relative" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))" }}>
          {isFinished ? (
            <div className="text-center">
              <span className="text-7xl block mb-4">😂</span>
              <p className="text-white font-bold text-xl">The End</p>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-7xl block mb-6 animate-bounce" key={frameIndex}>{frame.emoji}</span>
              <p className="text-white text-xl font-semibold px-4 leading-relaxed" key={`text-${frameIndex}`} style={{ animation: "fadeIn 0.3s ease-in" }}>{frame.text}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full mt-6 flex items-center gap-4">
          <button onClick={(e) => { e.stopPropagation(); setFrameIndex(0); setIsPlaying(true); }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">↺</button>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }} />
          </div>
          <span className="text-xs text-white/40">{Math.min(frameIndex + 1, skit.frames.length)}/{skit.frames.length}</span>
        </div>

        {/* Creator + actions */}
        <div className="w-full mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>{skit.creator.charAt(0)}</div>
            <span className="text-sm text-white/60">{skit.creator}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-lg hover:scale-110 transition">❤️</button>
            <button className="text-lg hover:scale-110 transition">↗️</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingSkit, setPlayingSkit] = useState<typeof SKITS[0] | null>(null);

  const filtered = selectedCategory === "all" ? SKITS : SKITS.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>S</div>
            <span className="font-extrabold text-xl gradient-text">ShortReels</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition px-4 py-2">Log in</Link>
            <Link href="/register" className="btn-brand !py-2.5 !px-5 !text-sm !rounded-full">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" /> Click any skit to watch it play!
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            AI Skits You <span className="gradient-text">Can't Stop</span> Watching
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Hilarious animated skits generated by AI. Click to watch. New ones every day.
          </p>
          <a href="#feed" className="btn-brand !py-3.5 !px-8 !rounded-full !text-base inline-block" style={{ boxShadow: "0 4px 20px rgba(139,92,246,0.4)" }}>Watch Now — It's Free</a>
        </div>
      </section>

      {/* Feed */}
      <section id="feed" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${selectedCategory === cat.slug ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((skit) => (
              <div key={skit.id} className="skit-card group" onClick={() => setPlayingSkit(skit)}>
                <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/5" style={{ aspectRatio: "9/14" }}>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))` }}>
                    <span className="text-5xl">{skit.emoji}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>▶</div>
                  </div>
                  {skit.isPremium && (
                    <div className="absolute top-2 right-2"><span className="tag tag-pink text-[9px]">👑 PRO</span></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{skit.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{skit.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skit Player Overlay */}
      {playingSkit && <SkitPlayer skit={playingSkit} onClose={() => setPlayingSkit(null)} />}

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-2">Choose Your <span className="gradient-text">Plan</span></h2>
          <p className="text-gray-500 mb-10">Start free. Go Pro when you're hooked.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="card text-left">
              <h3 className="text-lg font-bold mb-1">Free</h3>
              <p className="text-gray-500 text-sm mb-4">Taste the AI magic</p>
              <div className="mb-4"><span className="text-4xl font-black gradient-text">$0</span><span className="text-gray-500 text-sm">/forever</span></div>
              <ul className="space-y-2 mb-6">
                {["Watch free skits", "Browse all categories", "Like & share", "5 skits/day limit"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/register" className="btn-soft w-full block text-center">Get Started</Link>
            </div>
            <div className="card text-left !border-purple-500/50 relative" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.05), rgba(236,72,153,0.05))" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>7 Days Free</div>
              <h3 className="text-lg font-bold mb-1">Pro</h3>
              <p className="text-gray-500 text-sm mb-4">Unlimited AI entertainment</p>
              <div className="mb-4"><span className="text-4xl font-black gradient-text">$4.99</span><span className="text-gray-500 text-sm">/month</span></div>
              <ul className="space-y-2 mb-6">
                {["Unlimited skits", "All premium content 👑", "Early access releases", "Request custom skits", "No ads", "HD quality"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/register" className="btn-brand w-full block text-center">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-sm text-gray-600">© 2026 ShortReels by Hyversa Pty Ltd</p>
      </footer>
    </div>
  );
}
