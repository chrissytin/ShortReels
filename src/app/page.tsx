"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  { id: "10", title: "Group chat: who's paying?", creator: "SkitBot", emoji: "💰", category: "relatable", isPremium: false,
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
  const frame = skit.frames[Math.min(frameIndex, skit.frames.length - 1)];
  const isFinished = frameIndex >= skit.frames.length;
  const progress = ((Math.min(frameIndex + 1, skit.frames.length)) / skit.frames.length) * 100;

  useEffect(() => {
    if (!isPlaying || isFinished) return;
    const timer = setTimeout(() => setFrameIndex((i) => i + 1), skit.frames[frameIndex].delay);
    return () => clearTimeout(timer);
  }, [frameIndex, isPlaying, isFinished, skit]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer" }}>✕</button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 480, padding: "0 24px" }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, textAlign: "center", marginBottom: 32 }}>{skit.title}</p>

        <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))" }}>
          {isFinished ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>😂</div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>The End</p>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 72, marginBottom: 24 }}>{frame.emoji}</div>
              <p style={{ color: "#fff", fontSize: 20, fontWeight: 600, lineHeight: 1.4 }}>{frame.text}</p>
            </div>
          )}
        </div>

        <div style={{ width: "100%", marginTop: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => { setFrameIndex(0); setIsPlaying(true); }} style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>↺</button>
          <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, transition: "width 0.3s", width: `${progress}%`, background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }} />
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{Math.min(frameIndex + 1, skit.frames.length)}/{skit.frames.length}</span>
        </div>

        <div style={{ width: "100%", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff" }}>{skit.creator.charAt(0)}</div>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{skit.creator}</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ background: "none", border: "none", fontSize: 20 }}>❤️</button>
            <button style={{ background: "none", border: "none", fontSize: 20 }}>↗️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingSkit, setPlayingSkit] = useState<typeof SKITS[0] | null>(null);

  const filtered = selectedCategory === "all" ? SKITS : SKITS.filter((s) => s.category === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff" }}>S</div>
            <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShortReels</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", padding: "8px 16px" }}>Log in</Link>
            <Link href="/register" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff", padding: "10px 20px", borderRadius: 20, fontSize: 14, fontWeight: 700 }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, background: "#ec4899", borderRadius: "50%" }} /> Click any skit to watch!
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            AI Skits You <span style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Can&apos;t Stop</span> Watching
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Hilarious animated skits generated by AI. Click to watch. New ones every day.</p>
          <a href="#feed" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff", padding: "14px 32px", borderRadius: 28, fontWeight: 700, fontSize: 16, display: "inline-block", boxShadow: "0 4px 20px rgba(139,92,246,0.4)", textDecoration: "none" }}>Watch Now — Free</a>
        </div>
      </section>

      {/* Feed */}
      <section id="feed" style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Categories */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 8 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", border: "none", cursor: "pointer", background: selectedCategory === cat.slug ? "#fff" : "rgba(255,255,255,0.05)", color: selectedCategory === cat.slug ? "#000" : "rgba(255,255,255,0.5)" }}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {filtered.map((skit) => (
              <div key={skit.id} onClick={() => setPlayingSkit(skit)} style={{ cursor: "pointer", transition: "transform 0.2s" }}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#141414", border: "1px solid rgba(255,255,255,0.05)", aspectRatio: "9/14" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))" }}>
                    <span style={{ fontSize: 48 }}>{skit.emoji}</span>
                  </div>
                  {/* Play icon on hover */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}>
                    <div style={{ width: 48, height: 48, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff", fontSize: 20 }}>▶</div>
                  </div>
                  {/* Premium badge */}
                  {skit.isPremium && (
                    <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(236,72,153,0.9)", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "#fff" }}>👑 PRO</div>
                  )}
                  {/* Title overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "32px 12px 12px" }}>
                    <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{skit.title}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{skit.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "80px 24px", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Choose Your <span style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Plan</span></h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>Start free. Go Pro when you&apos;re hooked.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Free */}
            <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 28, textAlign: "left" }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Free</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 16 }}>Taste the AI magic</p>
              <p style={{ fontSize: 36, fontWeight: 900, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16 }}>$0<span style={{ fontSize: 14, WebkitTextFillColor: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/forever</span></p>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {["Watch free skits", "Browse all categories", "Like & share", "5 skits/day limit"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}><span style={{ color: "#8b5cf6" }}>✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/register" style={{ display: "block", textAlign: "center", padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)", textDecoration: "none" }}>Get Started</Link>
            </div>
            {/* Pro */}
            <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.05), rgba(236,72,153,0.05))", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, padding: 28, textAlign: "left", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>7 Days Free</div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Pro</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 16 }}>Unlimited AI entertainment</p>
              <p style={{ fontSize: 36, fontWeight: 900, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16 }}>$4.99<span style={{ fontSize: 14, WebkitTextFillColor: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/month</span></p>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {["Unlimited skits", "All premium content 👑", "Early access", "Custom requests", "No ads", "HD quality"].map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}><span style={{ color: "#8b5cf6" }}>✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/register" style={{ display: "block", textAlign: "center", padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff", textDecoration: "none" }}>Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff" }}>S</div>
          <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShortReels</span>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>© 2026 ShortReels by Hyversa Pty Ltd</p>
      </footer>

      {/* Player overlay */}
      {playingSkit && <SkitPlayer skit={playingSkit} onClose={() => setPlayingSkit(null)} />}
    </div>
  );
}
