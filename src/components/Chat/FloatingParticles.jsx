// ============================================
// Floating Book Particles Background
// ============================================
// Creates an immersive bookstore atmosphere
// with floating book-related emoji particles
// ============================================

import React, { useMemo } from 'react';

const PARTICLES = [
  { emoji: '📚', top: '8%', left: '5%', duration: '22s', delay: '0s', tx1: '40px', ty1: '-60px', tx2: '-30px', ty2: '-90px', tx3: '20px', ty3: '-40px' },
  { emoji: '📖', top: '15%', right: '8%', duration: '26s', delay: '3s', tx1: '-35px', ty1: '-45px', tx2: '25px', ty2: '-75px', tx3: '-15px', ty3: '-30px' },
  { emoji: '✨', top: '45%', left: '3%', duration: '18s', delay: '1s', tx1: '25px', ty1: '-50px', tx2: '-20px', ty2: '-70px', tx3: '30px', ty3: '-25px' },
  { emoji: '📕', top: '70%', right: '5%', duration: '24s', delay: '5s', tx1: '-40px', ty1: '-55px', tx2: '15px', ty2: '-80px', tx3: '-25px', ty3: '-35px' },
  { emoji: '🔖', top: '85%', left: '10%', duration: '20s', delay: '2s', tx1: '30px', ty1: '-40px', tx2: '-25px', ty2: '-65px', tx3: '15px', ty3: '-20px' },
  { emoji: '📗', top: '30%', right: '12%', duration: '28s', delay: '4s', tx1: '-20px', ty1: '-50px', tx2: '35px', ty2: '-85px', tx3: '-10px', ty3: '-45px' },
  { emoji: '⭐', top: '55%', left: '8%', duration: '19s', delay: '6s', tx1: '45px', ty1: '-35px', tx2: '-15px', ty2: '-60px', tx3: '25px', ty3: '-50px' },
  { emoji: '🎓', top: '20%', left: '15%', duration: '25s', delay: '7s', tx1: '-30px', ty1: '-70px', tx2: '20px', ty2: '-50px', tx3: '-35px', ty3: '-30px' },
];

function FloatingParticles() {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            '--duration': p.duration,
            '--delay': p.delay,
            '--tx1': p.tx1,
            '--ty1': p.ty1,
            '--tx2': p.tx2,
            '--ty2': p.ty2,
            '--tx3': p.tx3,
            '--ty3': p.ty3,
            animationDelay: p.delay,
            fontSize: `${1.2 + Math.random() * 0.8}rem`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

export default React.memo(FloatingParticles);