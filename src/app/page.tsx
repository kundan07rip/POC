"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #3D2616 0%, #1A0F08 70%)' }}>

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
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 32,
                fontWeight: 700,
                color: '#E6DEC3',
                letterSpacing: '0.15em',
                lineHeight: 1,
                textShadow: '0 0 12px rgba(190,155,90,0.3)',
              }}>
                POC
              </span>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 8,
                fontWeight: 600,
                color: '#BE9B5A',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginTop: 6,
              }}>
                Peace Over Coffee
              </span>
            </motion.div>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Menu', href: '/menu' },
              { label: 'Delivery', href: '#delivery' },
              { label: 'Contact', href: '#contact' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
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
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#BE9B5A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D4B592')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="max-w-[960px] mx-auto px-4 pt-28 mb-24 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: coffee cup with steam */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            <div className="absolute flex gap-5 pointer-events-none" style={{ top: -28, left: '30%' }}>
              <div className="steam-1 rounded-full blur-sm" style={{ width: 10, height: 55, background: 'rgba(255,255,255,0.25)' }} />
              <div className="steam-2 rounded-full blur-sm" style={{ width: 16, height: 72, background: 'rgba(255,255,255,0.18)' }} />
              <div className="steam-3 rounded-full blur-sm" style={{ width: 10, height: 50, background: 'rgba(255,255,255,0.25)' }} />
            </div>
            <img
              src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600"
              alt="POC Premium Coffee"
              className="float-anim"
              style={{
                width: 380,
                borderRadius: '50%',
                filter: 'brightness(0.88) contrast(1.22) sepia(0.22)',
                boxShadow: '0 40px 60px -10px rgba(0,0,0,1), 0 0 0 1px #3D2616',
              }}
            />
          </div>
        </motion.div>

        {/* Right: text content */}
        <div className="w-full md:w-1/2 text-center md:text-left">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <span
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.4em', color: '#BE9B5A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}
            >
              Only Pure
            </span>
            <span
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 300, letterSpacing: '0.5em', color: 'rgba(230,222,195,0.5)', display: 'block', marginBottom: 28, textTransform: 'uppercase' }}
            >
              Peace &amp; Coffee
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(36px, 5.5vw, 54px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#FFFFFF',
              textShadow: '0 0 20px rgba(190,155,90,0.3), 1px 1px 4px rgba(0,0,0,0.9)',
              marginBottom: 12,
            }}
          >
            COFFEE IS{' '}
            <em style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 400, color: '#BE9B5A' }}>
              WHAT
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontStyle: 'italic', color: '#D4B592', marginBottom: 32 }}
          >
            gives us true peace of mind
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '0.12em', color: '#E6DEC3', lineHeight: 1.8, marginBottom: 36 }}
          >
            Hot espresso starts at just&nbsp;
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 20, color: '#BE9B5A', fontWeight: 700 }}>₹69</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
            style={{ justifyContent: 'center' }}
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(190,155,90,0.38)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#BE9B5A',
                  color: '#1A0F08',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '14px 36px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Explore Menu
              </motion.button>
            </Link>
            <a href="#delivery">
              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#BE9B5A', color: '#BE9B5A' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  color: '#E6DEC3',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '14px 36px',
                  border: '1px solid rgba(139,90,51,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                Order Delivery
              </motion.button>
            </a>
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="flex-1 relative overflow-hidden group cursor-pointer crease-corner"
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
              whileHover={{ rotate: 12, scale: 1.1 }}
              style={{ width: 56, height: 56, background: '#E6DEC3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 20px', boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.35)' }}
            >
              {block.icon}
            </motion.div>

            {/* Title */}
            <h3
              className="group-hover:text-[#BE9B5A] transition-colors text-center mb-6"
              style={{ fontFamily: 'Cinzel, serif', fontSize: 17, fontWeight: 600, color: '#E6DEC3', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              {block.title}
            </h3>

            {/* Items */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {block.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(139,90,51,0.3)', paddingBottom: 8 }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#D4B592' }}>{item.name}</span>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 700, color: '#BE9B5A' }}>{item.price}</span>
                </li>
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
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(190,155,90,0.2)' }}
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
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            — View Full Menu —
          </motion.button>
        </Link>
      </div>

      {/* ─── DELIVERY CARD ─── */}
      <section id="delivery" className="max-w-[960px] mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
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
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontStyle: 'italic', fontWeight: 400, color: '#FFFFFF', marginBottom: 10 }}>
                Can we ring your bell?
              </h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600, fontStyle: 'italic', color: '#E6DEC3', marginBottom: 14, lineHeight: 1.6 }}>
                We'll come to you when you<br />can't come to us.
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#D4B592', lineHeight: 1.9, marginBottom: 24 }}>
                Our home delivery service offers our entire menu — from Margherita Pizzas to Peri Peri loaded fries. Always hot &amp; fresh!
              </p>
              <motion.button
                whileHover={{ scale: 1.04, background: '#FFFFFF' }}
                whileTap={{ scale: 0.97 }}
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
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                Order Now
              </motion.button>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-[55%] p-10 flex flex-col justify-center gap-8">
            {[
              { title: 'Italian Lasagne', price: '₹259', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=200', desc: 'Indulgent cheesy layers of pasta baked to perfection.' },
              { title: 'Cheese Burst Pizza', price: '₹299', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200', desc: 'Oven-baked OTC pizza overflowing with rich molten cheese.' },
            ].map((food, idx) => (
              <div key={idx} className="flex gap-6 items-center group">
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="group-hover:text-[#BE9B5A] transition-colors" style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontStyle: 'italic', color: '#E6DEC3', fontWeight: 400 }}>{food.title}</h4>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: '#BE9B5A', marginLeft: 12 }}>{food.price}</span>
                  </div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#D4B592', lineHeight: 1.6 }}>{food.desc}</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.08 }}
                  style={{ padding: 6, background: '#E6DEC3', boxShadow: '0 8px 20px rgba(0,0,0,0.7)', transform: idx === 0 ? 'rotate(3deg)' : 'rotate(-3deg)', width: 88, height: 88, flexShrink: 0, transition: 'all 0.3s' }}
                >
                  <img src={food.img} alt={food.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HAPPINESS SECTION ─── */}
      <section className="w-full relative overflow-hidden py-24" style={{ background: '#F5F1E1', boxShadow: 'inset 0 25px 30px -20px rgba(0,0,0,0.9)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.018) 20px, rgba(0,0,0,0.018) 40px)' }} />
        <div className="max-w-[960px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="w-full md:w-7/12 text-center md:text-left pl-0 md:pl-6"
          >
            <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(70px, 12vw, 115px)', color: '#8B5A33', lineHeight: 1, transform: 'rotate(-3deg)', display: 'inline-block', marginBottom: 4 }}>
              Peace
            </h2>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(15px, 2.5vw, 22px)', fontWeight: 600, color: '#1A0F08', letterSpacing: '0.15em', marginBottom: 24 }}>
              AT THE CLICK OF A BUTTON
            </h3>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 500, color: '#3D2616', lineHeight: 2, maxWidth: 400 }}>
              We realise that it's not always possible to drop in for a peaceful coffee break, so we've introduced a home delivery service offering our entire menu directly to you in Bhilwara.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
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
            <motion.div key={i} whileHover={{ y: -4, scale: 1.15 }} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: bg, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
              {l}
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}
