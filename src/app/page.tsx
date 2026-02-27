"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── TEXT ANIMATION HELPERS ─── */
const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

/* ─── ANIMATED TEXT COMPONENT ─── */
function AnimatedText({ text, delay = 0, className = "", style = {} }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block', overflow: 'hidden', ...style }}
      className={className}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + (delay * 25)}
          variants={charVariants}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── SCROLL TEXT REVEAL ─── */
function ScrollRevealText({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── MAGNETIC ELEMENT ─── */
function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.1 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = () => setHovered(true);
    const out = () => setHovered(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
          borderRadius: '50%',
          background: '#BE9B5A',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? '#BE9B5A' : 'rgba(190,155,90,0.4)'}`,
          transform: 'translate(-50%, -50%)',
          zIndex: 9998,
          pointerEvents: 'none',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  );
}

/* ─── HORIZONTAL SCROLL LINE ─── */
function ScrollProgress() {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #BE9B5A, #D4B592, #BE9B5A)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 200,
      }}
    />
  );
}

/* ═══════════════════════════════════════ */
/*                  PAGE                  */
/* ═══════════════════════════════════════ */

export default function Page() {

  return (
    <div className="w-full min-h-screen overflow-x-hidden relative" style={{ background: '#1A0F08', cursor: 'none' }}>

      {/* Custom Cursor */}
      <CustomCursor />
      <ScrollProgress />

      {/* ─── FULLSCREEN VIDEO BACKGROUND ─── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
            filter: 'brightness(0.6) contrast(1.1) sepia(0.3)',
          }}
        >
          <source src="/videobg.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(26,15,8,0.7) 0%, rgba(26,15,8,0.5) 40%, rgba(26,15,8,0.85) 80%, #1A0F08 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* All content sits above the video */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── NAVBAR ─── */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(26, 15, 8, 0.85)',
            borderBottom: '1px solid rgba(139, 90, 51, 0.2)',
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: '0 auto',
              padding: '0 24px',
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Magnetic strength={0.15}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: 140,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    cursor: 'none',
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="POC - Peace Over Coffee"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
                  />
                </motion.div>
              </Magnetic>
            </Link>

            {/* Nav Links with magnetic effect */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Menu', href: '/menu' },
                { label: 'Delivery', href: '#delivery' },
                { label: 'Contact', href: '#contact' },
              ].map((item, i) => (
                <Magnetic key={i} strength={0.25}>
                  <Link
                    href={item.href}
                    data-cursor-hover
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#D4B592',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      position: 'relative',
                      cursor: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#BE9B5A')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#D4B592')}
                  >
                    {item.label}
                    {/* Underline animation */}
                    <motion.span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '100%',
                        height: 1,
                        background: '#BE9B5A',
                        transformOrigin: 'left',
                        scaleX: 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* ─── HERO ─── */}
        <section className="max-w-[960px] mx-auto px-4 pt-28 mb-24 flex flex-col md:flex-row items-center gap-12 md:gap-16" style={{ minHeight: '100vh' }}>

          {/* Left: coffee cup with steam + rotating ring */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: -30,
                  left: -30,
                  right: -30,
                  bottom: -30,
                  borderRadius: '50%',
                  border: '1px dashed rgba(190,155,90,0.2)',
                  pointerEvents: 'none',
                }}
              />
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: -55,
                  left: -55,
                  right: -55,
                  bottom: -55,
                  borderRadius: '50%',
                  border: '1px solid rgba(190,155,90,0.08)',
                  pointerEvents: 'none',
                }}
              />
              {/* Steam */}
              <div className="absolute flex gap-5 pointer-events-none" style={{ top: -28, left: '30%', zIndex: 2 }}>
                <div className="steam-1 rounded-full blur-sm" style={{ width: 10, height: 55, background: 'rgba(255,255,255,0.25)' }} />
                <div className="steam-2 rounded-full blur-sm" style={{ width: 16, height: 72, background: 'rgba(255,255,255,0.18)' }} />
                <div className="steam-3 rounded-full blur-sm" style={{ width: 10, height: 50, background: 'rgba(255,255,255,0.25)' }} />
              </div>
              <motion.img
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600"
                alt="POC Premium Coffee"
                className="float-anim"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 380,
                  borderRadius: '50%',
                  filter: 'brightness(0.88) contrast(1.22) sepia(0.22)',
                  boxShadow: '0 40px 60px -10px rgba(0,0,0,1), 0 0 0 1px #3D2616',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Right: text content with premium typography animations */}
          <div className="w-full md:w-1/2 text-center md:text-left">

            {/* Subtitle — letter by letter reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={lineVariants}>
                <span
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.4em', color: '#BE9B5A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}
                >
                  <AnimatedText text="Only Pure" delay={0.5} />
                </span>
              </motion.div>
              <motion.div variants={lineVariants}>
                <span
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 300, letterSpacing: '0.5em', color: 'rgba(230,222,195,0.5)', display: 'block', marginBottom: 28, textTransform: 'uppercase' }}
                >
                  <AnimatedText text="Peace & Coffee" delay={0.8} />
                </span>
              </motion.div>
            </motion.div>

            {/* Main heading — dramatic entrance */}
            <div style={{ overflow: 'hidden', marginBottom: 12 }}>
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(36px, 5.5vw, 58px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  textShadow: '0 0 20px rgba(190,155,90,0.3), 1px 1px 4px rgba(0,0,0,0.9)',
                }}
              >
                <AnimatedText text="COFFEE IS " delay={1.0} />
                <motion.em
                  initial={{ opacity: 0, scale: 1.3, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 400, color: '#BE9B5A', display: 'inline-block' }}
                >
                  WHAT
                </motion.em>
              </motion.h1>
            </div>

            {/* Tagline — blur in */}
            <motion.p
              initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontStyle: 'italic', color: '#D4B592', marginBottom: 32, letterSpacing: '0.02em' }}
            >
              gives us true peace of mind
            </motion.p>

            {/* Price line — slide in from right */}
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '0.12em', color: '#E6DEC3', lineHeight: 1.8, marginBottom: 36 }}
            >
              Hot espresso starts at just&nbsp;
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: '#BE9B5A', fontWeight: 700, display: 'inline-block' }}
              >
                ₹69
              </motion.span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
              style={{ justifyContent: 'center' }}
            >
              <Link href="/menu">
                <Magnetic strength={0.2}>
                  <motion.button
                    data-cursor-hover
                    whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(190,155,90,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(145deg, #D4B592, #BE9B5A)',
                      color: '#1A0F08',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      padding: '16px 40px',
                      border: 'none',
                      cursor: 'none',
                      borderRadius: 0,
                      transition: 'all 0.3s',
                    }}
                  >
                    Explore Menu
                  </motion.button>
                </Magnetic>
              </Link>
              <a href="#delivery">
                <Magnetic strength={0.2}>
                  <motion.button
                    data-cursor-hover
                    whileHover={{ scale: 1.06, borderColor: '#BE9B5A', color: '#BE9B5A' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'transparent',
                      color: '#E6DEC3',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      padding: '16px 40px',
                      border: '1px solid rgba(139,90,51,0.6)',
                      cursor: 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    Order Delivery
                  </motion.button>
                </Magnetic>
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="hidden md:flex flex-col items-center mt-16 gap-2"
            >
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,181,146,0.5)', textTransform: 'uppercase' }}>Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 1, height: 32, background: 'linear-gradient(180deg, rgba(190,155,90,0.5), transparent)' }}
              />
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURE CARDS ─── */}
        <section id="menu" className="max-w-[960px] mx-auto px-4 mb-8 flex flex-col md:flex-row gap-6">
          {[
            { icon: '☕', title: 'Hot Coffee', items: [{ name: 'Espresso', price: '₹69' }, { name: 'Americano', price: '₹79' }, { name: 'Café Latte', price: '₹109' }, { name: 'Hazelnut Cap.', price: '₹109' }] },
            { icon: '🥤', title: 'Quenchers', items: [{ name: 'Lemonade', price: '₹89' }, { name: 'Peach Ice Tea', price: '₹139' }, { name: 'Cold Coffee', price: '₹89' }, { name: 'Brownie Coffee', price: '₹149' }] },
            { icon: '🍔', title: 'Bites & Pizza', items: [{ name: 'Veg Cheese Burger', price: '₹99' }, { name: 'Farm House Pizza', price: '₹199' }, { name: 'Cheese Sandwich', price: '₹109' }, { name: 'Tandoori Fries', price: '₹159' }] },
          ].map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="flex-1 relative overflow-hidden group cursor-none crease-corner"
              data-cursor-hover
              style={{
                background: 'linear-gradient(145deg, #3D2616 0%, #2B1B0E 60%, #1A0F08 100%)',
                borderRadius: 12,
                border: '1px solid rgba(61,38,22,0.8)',
                padding: '32px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.85)',
              }}
            >
              {/* Hover top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, #BE9B5A, transparent)' }} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                style={{ width: 56, height: 56, background: '#E6DEC3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 20px', boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.35)' }}
              >
                {block.icon}
              </motion.div>

              {/* Title */}
              <ScrollRevealText delay={0.1}>
                <h3
                  className="group-hover:text-[#BE9B5A] transition-colors text-center mb-6"
                  style={{ fontFamily: 'Cinzel, serif', fontSize: 17, fontWeight: 600, color: '#E6DEC3', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  {block.title}
                </h3>
              </ScrollRevealText>

              {/* Items */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {block.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + i * 0.08, duration: 0.6 }}
                    style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(139,90,51,0.3)', paddingBottom: 8 }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#D4B592' }}>{item.name}</span>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 700, color: '#BE9B5A' }}>{item.price}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Corner fold */}
              <div className="absolute top-0 right-0 w-0 h-0 group-hover:border-b-[#BE9B5A] transition-colors" style={{ borderLeft: '28px solid transparent', borderBottom: '28px solid rgba(139,90,51,0.6)' }} />
              <div className="absolute top-0 right-0 w-0 h-0" style={{ borderTop: '28px solid #1A0F08', borderRight: '28px solid #1A0F08' }} />
            </motion.div>
          ))}
        </section>

        {/* View full menu CTA */}
        <div className="text-center mt-10 mb-24 px-4">
          <Link href="/menu">
            <Magnetic strength={0.2}>
              <motion.button
                data-cursor-hover
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(190,155,90,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(190,155,90,0.5)',
                  color: '#BE9B5A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  padding: '14px 48px',
                  cursor: 'none',
                  transition: 'all 0.3s',
                }}
              >
                — View Full Menu —
              </motion.button>
            </Magnetic>
          </Link>
        </div>

        {/* ─── DELIVERY CARD ─── */}
        <section id="delivery" className="max-w-[960px] mx-auto px-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(145deg, #3D2616 0%, #2B1B0E 60%, #1A0F08 100%)',
              borderRadius: 16,
              border: '1px solid rgba(61,38,22,1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.95)',
              overflow: 'hidden',
            }}
            className="flex flex-col md:flex-row"
          >
            {/* Gold top line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(190,155,90,0.3), transparent)' }} />

            {/* Left */}
            <div className="w-full md:w-[45%] relative flex items-center p-10 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(139,90,51,0.3)', borderStyle: 'dashed' }}>
              <div className="absolute bottom-3 left-3 text-[80px] opacity-20 hidden md:block" style={{ lineHeight: 1 }}>🛵</div>
              <div className="relative z-10 pl-4">
                <ScrollRevealText>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontStyle: 'italic', fontWeight: 400, color: '#FFFFFF', marginBottom: 10 }}>
                    Can we ring your bell?
                  </h3>
                </ScrollRevealText>
                <ScrollRevealText delay={0.15}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600, fontStyle: 'italic', color: '#E6DEC3', marginBottom: 14, lineHeight: 1.6 }}>
                    We&apos;ll come to you when you<br />can&apos;t come to us.
                  </p>
                </ScrollRevealText>
                <ScrollRevealText delay={0.3}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#D4B592', lineHeight: 1.9, marginBottom: 24 }}>
                    Our home delivery service offers our entire menu — from Margherita Pizzas to Peri Peri loaded fries. Always hot &amp; fresh!
                  </p>
                </ScrollRevealText>
                <Magnetic strength={0.2}>
                  <motion.button
                    data-cursor-hover
                    whileHover={{ scale: 1.06, background: '#FFFFFF' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: '#E6DEC3',
                      color: '#1A0F08',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      padding: '12px 28px',
                      border: 'none',
                      cursor: 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    Order Now
                  </motion.button>
                </Magnetic>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-[55%] p-10 flex flex-col justify-center gap-8">
              {[
                { title: 'Italian Lasagne', price: '₹259', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=200', desc: 'Indulgent cheesy layers of pasta baked to perfection.' },
                { title: 'Cheese Burst Pizza', price: '₹299', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200', desc: 'Oven-baked OTC pizza overflowing with rich molten cheese.' },
              ].map((food, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6 items-center group"
                  data-cursor-hover
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="group-hover:text-[#BE9B5A] transition-colors" style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontStyle: 'italic', color: '#E6DEC3', fontWeight: 400 }}>{food.title}</h4>
                      <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: '#BE9B5A', marginLeft: 12 }}>{food.price}</span>
                    </div>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#D4B592', lineHeight: 1.6 }}>{food.desc}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.12 }}
                    style={{ padding: 6, background: '#E6DEC3', boxShadow: '0 8px 20px rgba(0,0,0,0.7)', transform: idx === 0 ? 'rotate(3deg)' : 'rotate(-3deg)', width: 88, height: 88, flexShrink: 0, transition: 'all 0.3s' }}
                  >
                    <img src={food.img} alt={food.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── HAPPINESS SECTION ─── */}
        <section className="w-full relative overflow-hidden py-24" style={{ background: '#F5F1E1', boxShadow: 'inset 0 25px 30px -20px rgba(0,0,0,0.9)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.018) 20px, rgba(0,0,0,0.018) 40px)' }} />
          <div className="max-w-[960px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-7/12 text-center md:text-left pl-0 md:pl-6"
            >
              <motion.h2
                initial={{ opacity: 0, rotate: -8 }}
                whileInView={{ opacity: 1, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(70px, 12vw, 115px)', color: '#8B5A33', lineHeight: 1, display: 'inline-block', marginBottom: 4 }}
              >
                Peace
              </motion.h2>
              <ScrollRevealText>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(15px, 2.5vw, 22px)', fontWeight: 600, color: '#1A0F08', letterSpacing: '0.15em', marginBottom: 24 }}>
                  AT THE CLICK OF A BUTTON
                </h3>
              </ScrollRevealText>
              <ScrollRevealText delay={0.2}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 500, color: '#3D2616', lineHeight: 2, maxWidth: 400 }}>
                  We realise that it&apos;s not always possible to drop in for a peaceful coffee break, so we&apos;ve introduced a home delivery service offering our entire menu directly to you in Bhilwara.
                </p>
              </ScrollRevealText>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-5/12 flex justify-center"
            >
              <img
                src="/CAFE.png"
                alt="POC Cafe"
                style={{
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 16,
                  objectFit: 'cover',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '4px solid rgba(190,155,90,0.2)'
                }}
              />
            </motion.div>
          </div>
          {/* Skyline */}
          <div className="absolute bottom-6 left-0 w-full h-[65px]" style={{ background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 100\' preserveAspectRatio=\'none\'><path d=\'M0 100 V60 h20 v-10 h30 v20 h40 v-30 h10 v40 h50 v-10 h30 v-40 h20 v60 h40 v-20 h20 v-10 h20 v40 h30 v-50 h40 v20 h20 v60 h20 v-35 h30 v35 h30 v-45 h15 v45 h60 v-20 h20 v-10 h30 v35 h50 v-15 h20 v15 h60 v-30 h20 v30 Z\' fill=\'%231A0F08\'/></svg>") bottom/1100px 100% no-repeat' }} />
        </section>

        {/* ─── FOOTER ─── */}
        <footer id="contact" style={{ background: '#0F0804', borderTop: '1px solid #2C1B0F', padding: '24px 32px' }} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 600, color: '#E6DEC3', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>POC — Peace Over Coffee © 2026</p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: '#8B5A33', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Shastri Nagar, Bhilwara, Rajasthan</p>
          </div>
          <div className="flex gap-3">
            {[{ l: 'f', bg: '#3b5998' }, { l: 't', bg: '#00aced' }, { l: 'i', bg: 'linear-gradient(135deg,#f09433,#bc1888)' }].map(({ l, bg }, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.15 }} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'none', background: bg, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                {l}
              </motion.div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
