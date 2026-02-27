"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ─── Full Menu Data ───────────────────────────────────────────
const menuData = [
    {
        emoji: "🔥",
        category: "Hot Coffee",
        note: "Shot Add On ₹30",
        color: "#BE9B5A",
        items: [
            { name: "Espresso (Single Shot)", price: "₹69" },
            { name: "Americano", price: "₹79" },
            { name: "Iced Americano", price: "₹89" },
            { name: "Café Latte", price: "₹109" },
            { name: "Café Mocha", price: "₹129" },
            { name: "Cappuccino", price: "₹89" },
            { name: "Hazelnut Cappuccino", price: "₹109" },
            { name: "Irish Cappuccino", price: "₹109" },
            { name: "Caramel Cappuccino", price: "₹109" },
            { name: "Vanilla Cappuccino", price: "₹109" },
            { name: "Nutella Cappuccino", price: "₹129" },
            { name: "POC Hot Chocolate", price: "₹129" },
        ],
    },
    {
        emoji: "❄️",
        category: "Cold Coffee",
        color: "#6B92B5",
        items: [
            { name: "Mini", price: "₹59" },
            { name: "Regular", price: "₹89" },
            { name: "Caramel", price: "₹109" },
            { name: "Hazelnut", price: "₹109" },
            { name: "Irish", price: "₹109" },
            { name: "Chocochips", price: "₹129" },
            { name: "Brownie Coffee", price: "₹149" },
        ],
    },
    {
        emoji: "🧃",
        category: "Thirst Quenchers",
        color: "#7BA36B",
        items: [
            { name: "Lemonade", price: "₹89" },
            { name: "Lemon Soda", price: "₹99" },
            { name: "Lemon Mint Ice Tea", price: "₹129" },
            { name: "Cranberry Ice Tea", price: "₹129" },
            { name: "Peach Ice Tea", price: "₹139" },
            { name: "Litchi Ice Tea", price: "₹139" },
            { name: "Watermelon Ice Tea", price: "₹139" },
            { name: "Blackcurrant Ice Tea", price: "₹139" },
            { name: "Bubble Gum Ice Tea", price: "₹139" },
            { name: "Blue Berry Ice Tea", price: "₹139" },
            { name: "Red Bull Ice Tea", price: "₹219" },
        ],
    },
    {
        emoji: "🍔",
        category: "Burgers",
        color: "#C47A3A",
        items: [
            { name: "Veg Burger", price: "₹79" },
            { name: "Veg Cheese Burger", price: "₹99" },
            { name: "Peri Peri Burger", price: "₹109" },
            { name: "Tandoori Burger", price: "₹109" },
            { name: "Cottage Cheese Burger", price: "₹129" },
            { name: "Cheese Spicy Burger", price: "₹129" },
            { name: "Add on Cheese", price: "₹25" },
        ],
    },
    {
        emoji: "🥪",
        category: "Sandwiches",
        color: "#B58A3A",
        items: [
            { name: "Veg. Cheese Sandwich", price: "₹109" },
            { name: "Junglee Paneer Sandwich", price: "₹129" },
            { name: "Paneer Tikka Sandwich", price: "₹149" },
            { name: "Cheese & Corn Sandwich", price: "₹159" },
            { name: "Chilli Cheese Toast", price: "₹159" },
            { name: "Cheesy Garlic Bread", price: "₹159" },
            { name: "POC Club Sandwich", price: "₹189" },
            { name: "Say Cheese Please", price: "₹219" },
        ],
    },
    {
        emoji: "🥖",
        category: "Submarine Sandwiches",
        color: "#A67C52",
        items: [
            { name: "Aloo Patty Sub", price: "₹179" },
            { name: "Veg. Patty Sub", price: "₹189" },
            { name: "Corn & Peas", price: "₹199" },
        ],
    },
    {
        emoji: "🔥",
        category: "Sizzlers",
        color: "#C43A3A",
        items: [
            { name: "China Town Sizzler", price: "₹269" },
            { name: "Italian Sizzler", price: "₹289" },
            { name: "Sizzling Brownie with Ice Cream", price: "₹249" },
        ],
    },
    {
        emoji: "🍝",
        category: "Pasta",
        note: "Options: Spaghetti, Penne, Macaroni",
        color: "#A67C52",
        items: [
            { name: "Italian Tomato & Fresh Basil (Red)", price: "₹169" },
            { name: "Parmesan Cream & Parsley (White)", price: "₹189" },
            { name: "Tomato Parmesan Cream (Brown)", price: "₹199" },
            { name: "Mac & Cheese", price: "₹249" },
            { name: "Lasagne", price: "₹259" },
        ],
    },
    {
        emoji: "🍕",
        category: "Pizza",
        color: "#C4613A",
        pizzaTable: true,
        items: [
            { name: "Margherita", thin: "₹169", burst: "₹269" },
            { name: "Cheese & Corn", thin: "₹179", burst: "₹289" },
            { name: "OTC Pizza", thin: "₹189", burst: "₹299" },
            { name: "Farm House", thin: "₹199", burst: "₹309" },
            { name: "Paneer Tikka", thin: "₹239", burst: "₹349" },
        ],
    },
    {
        emoji: "🍜",
        category: "Maggi",
        color: "#BE9B5A",
        items: [
            { name: "Masala Maggi", price: "₹99" },
            { name: "Vegetable Masala Maggi", price: "₹119" },
            { name: "Vegetable Cheese Maggi", price: "₹139" },
            { name: "Chilli Garlic Maggi", price: "₹149" },
            { name: "Add on Cheese", price: "₹25" },
        ],
    },
    {
        emoji: "🍟",
        category: "Ready to Eat",
        color: "#C4A03A",
        items: [
            { name: "Spring Rolls", price: "₹149" },
            { name: "Masala Fries", price: "₹109" },
            { name: "Peri Peri Masala Fries", price: "₹129" },
            { name: "Tandoori Loaded Fries", price: "₹159" },
            { name: "Peri Peri Loaded Fries", price: "₹159" },
            { name: "Cheese Loaded Fries", price: "₹169" },
            { name: "Potato Wedges", price: "₹109" },
            { name: "Peri Peri Loaded Wedges", price: "₹159" },
            { name: "Tandoori Loaded Wedges", price: "₹159" },
            { name: "Cheese Loaded Wedges", price: "₹169" },
            { name: "Nachos With Exotic Salsa", price: "₹139" },
            { name: "Peri Peri Loaded Nachos", price: "₹159" },
            { name: "Cheesy Loaded Nachos", price: "₹169" },
        ],
    },
    {
        emoji: "🥟",
        category: "Momos",
        color: "#8B6B9A",
        items: [
            { name: "Veg Fried Momos", price: "₹129" },
            { name: "Paneer Fried Momos", price: "₹139" },
            { name: "Cheese & Corn Momos", price: "₹149" },
        ],
    },
    {
        emoji: "🥣",
        category: "Gravy Momos",
        color: "#A0527A",
        items: [
            { name: "Creamy Momos", price: "₹159" },
            { name: "Pink Sauce Momos", price: "₹159" },
            { name: "Tandoori Momos", price: "₹159" },
        ],
    },
];

const categories = menuData.map((m) => m.category);

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = activeCategory
        ? menuData.filter((m) => m.category === activeCategory)
        : menuData;

    return (
        <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #3D2616 0%, #1A0F08 70%)' }}>

            {/* ─── Shared Navbar ─── */}
            <header className="w-full relative z-50 px-4 pt-4">
                <div className="max-w-[1000px] mx-auto relative h-[48px] bg-[#2C1B0F] border-y-2 border-[#1A0F08] shadow-[0_6px_20px_rgba(0,0,0,0.9)] flex items-center justify-between px-8">
                    <div className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border-y border-dashed border-[#8B5A33]/50 pointer-events-none" />

                    <nav className="flex gap-8 text-[11px] font-bold text-[#E6DEC3] tracking-[0.25em] z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Link href="/" className="hover:text-[#BE9B5A] transition-colors uppercase">Home</Link>
                    </nav>

                    {/* Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-[22px] z-50">
                        <Link href="/">
                            <div className="relative h-[90px] w-[130px] rounded-[50px] bg-[#1A0F08] border-2 border-[#2C1B0F] shadow-[0_8px_30px_rgba(0,0,0,0.9),_0_0_0_3px_#3D2616] flex flex-col items-center justify-center pulse-gold">
                                <div className="absolute inset-[4px] rounded-[46px] border border-dashed border-[#8B5A33]/60" />
                                <span className="relative z-10 leading-none" style={{ fontFamily: 'Cinzel, serif', fontSize: 30, fontWeight: 700, color: '#E6DEC3', letterSpacing: '0.15em', textShadow: '0 0 15px rgba(190,155,90,0.4)' }}>POC</span>
                                <span className="relative z-10 leading-none mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 7, fontWeight: 600, color: '#8B5A33', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Peace Over Coffee</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex gap-8 text-[11px] font-bold text-[#E6DEC3] tracking-[0.25em] z-10 justify-end" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Link href="/#delivery" className="hover:text-[#BE9B5A] transition-colors uppercase">Delivery</Link>
                    </nav>
                </div>
            </header>

            {/* ─── Menu Hero Banner ─── */}
            <div className="max-w-[1000px] mx-auto px-4 mt-24 mb-16 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[12px] tracking-[0.5em] text-[#BE9B5A] uppercase mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                    ☕ &nbsp;Shastri Nagar, Bhilwara
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 700, color: '#FFF', lineHeight: 1 }}
                    className="text-shadow-gold mb-4"
                >
                    OUR MENU
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-[2px] mx-auto mb-6"
                    style={{ background: 'linear-gradient(90deg, transparent, #BE9B5A, transparent)' }}
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontStyle: 'italic', color: '#D4B592' }}
                >
                    From first sip to last bite — crafted with peace
                </motion.p>
            </div>

            {/* ─── Category Filter Pills ─── */}
            <div className="max-w-[1000px] mx-auto px-4 mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap gap-3 justify-center"
                >
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-300 ${!activeCategory ? 'bg-[#BE9B5A] border-[#BE9B5A] text-[#1A0F08] font-bold' : 'border-[#8B5A33]/50 text-[#D4B592] hover:border-[#BE9B5A] hover:text-[#BE9B5A]'}`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-300 ${activeCategory === cat ? 'bg-[#BE9B5A] border-[#BE9B5A] text-[#1A0F08] font-bold' : 'border-[#8B5A33]/50 text-[#D4B592] hover:border-[#BE9B5A] hover:text-[#BE9B5A]'}`}
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* ─── Menu Cards Grid ─── */}
            <div className="max-w-[1000px] mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filtered.map((section, idx) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            className={`rounded-xl overflow-hidden relative card-gradient shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#3D2616] hover:border-[${section.color}]/40 transition-all duration-500 group ${section.pizzaTable ? 'md:col-span-2' : ''}`}
                        >
                            {/* Top colored accent line */}
                            <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }} />

                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-[52px] h-[52px] rounded-full bg-[#1A0F08] border border-[#3D2616] flex items-center justify-center text-2xl shadow-inner shrink-0">
                                        {section.emoji}
                                    </div>
                                    <div>
                                        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, color: '#E6DEC3', letterSpacing: '0.1em' }}>
                                            {section.category}
                                        </h2>
                                        {section.note && (
                                            <p className="text-[10px] tracking-widest text-[#8B5A33] uppercase mt-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                {section.note}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Pizza Table Layout */}
                                {section.pizzaTable ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-[#8B5A33]/30">
                                                    <th className="text-left text-[11px] text-[#8B5A33] tracking-[0.2em] uppercase pb-3 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pizza</th>
                                                    <th className="text-center text-[11px] text-[#BE9B5A] tracking-[0.2em] uppercase pb-3 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Thin Crust</th>
                                                    <th className="text-center text-[11px] text-[#C4613A] tracking-[0.2em] uppercase pb-3 font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Cheese Burst</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(section.items as { name: string; thin: string; burst: string }[]).map((row, i) => (
                                                    <tr key={i} className="border-b border-dotted border-[#3D2616] group/row hover:bg-[#2C1B0F]/40 transition-colors">
                                                        <td className="py-3 text-[#D4B592] text-[13px]" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.name}</td>
                                                        <td className="py-3 text-center font-bold text-[#BE9B5A] text-[13px]" style={{ fontFamily: 'Cinzel, serif' }}>{row.thin}</td>
                                                        <td className="py-3 text-center font-bold text-[#C4613A] text-[13px]" style={{ fontFamily: 'Cinzel, serif' }}>{row.burst}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    /* Regular Items List */
                                    <ul className="flex flex-col gap-2.5">
                                        {(section.items as { name: string; price: string }[]).map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.04 }}
                                                className="flex justify-between items-center border-b border-dotted border-[#3D2616] pb-2 group/item hover:border-[#8B5A33]/40 transition-colors"
                                            >
                                                <span className="text-[#D4B592] text-[13px] group-hover/item:text-[#E6DEC3] transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                    {item.name}
                                                </span>
                                                <span className="font-bold text-[13px] shrink-0 ml-4" style={{ fontFamily: 'Cinzel, serif', color: section.color }}>
                                                    {item.price}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Crease corner */}
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[28px] border-b-[28px] border-l-transparent group-hover:border-b-[#BE9B5A] transition-colors" style={{ borderBottomColor: section.color + '80' }} />
                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-r-[28px] border-t-[#1A0F08] border-r-[#1A0F08]" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Footer ─── */}
            <footer id="contact" className="w-full bg-[#0F0804] py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2C1B0F]">
                <div>
                    <p className="text-[#E6DEC3] text-[11px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'Cinzel, serif', fontWeight: 600 }}>POC — Peace Over Coffee © 2026</p>
                    <p className="text-[#8B5A33] text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Shastri Nagar, Bhilwara, Rajasthan</p>
                </div>
                <div className="flex gap-3">
                    {['f', 't', 'i'].map((l, i) => (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.15 }} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-lg ${i === 0 ? 'bg-[#3b5998]' : i === 1 ? 'bg-[#00aced]' : 'bg-gradient-to-br from-[#f09433] to-[#bc1888]'}`} style={{ fontFamily: 'serif' }}>
                            {l}
                        </motion.div>
                    ))}
                </div>
            </footer>
        </div>
    );
}
