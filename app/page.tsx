"use client";

import React, { useState, useEffect } from "react";

import {
  Phone,
  Truck,
  ShieldCheck,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ThumbsUp,
  Quote,
  Box,
  Clock,
  Shield,
  Map as MapIcon,
  Headphones,
  MessageCircle,
  Home,
  Building2,
  Briefcase,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// --- Helper Components ---

const ServiceIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-red-100 transition-colors duration-300">
    <Icon
      size={26}
      className="text-blue-800 group-hover:text-red-700 transition-colors duration-300"
    />
  </div>
);

const WaveDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full overflow-hidden leading-none ${className}`}>
    <svg
      viewBox="0 0 1440 100"
      className="w-full h-14 md:h-20 fill-current"
      preserveAspectRatio="none"
    >
      <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z" />
    </svg>
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Multi-step quote form state
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    moveSize: "",
    fromZip: "",
    toZip: "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteStep < 4) {
      setQuoteStep(quoteStep + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        alert(
          "There was a problem submitting your quote. Please try calling us instead.",
        );
      }
    } catch (error) {
      console.error(error);
      alert("There was an error. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { scrollY } = useScroll();
  const heroBgOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Moved to Burnaby",
      text: "NorthPrime Movers handled our recent move with incredible care. They really went above and beyond to make sure everything was perfect. Highly recommended!",
    },
    {
      name: "Mark T.",
      role: "Moved to Surrey",
      text: "Affordable, reliable, and on time. The truck was spotless and the crew was very professional. They took the stress completely out of moving day.",
    },
    {
      name: "Emily R.",
      role: "Moved within Vancouver",
      text: "I was nervous about hiring movers, but they exceeded all expectations. No hidden fees, exactly as quoted. Great experience.",
    },
  ];

  const faqs = [
    {
      q: "Are there any hidden fees?",
      a: "No! We provide transparent, upfront pricing. The quote you receive is the price you pay, with no surprise charges on moving day.",
    },
    {
      q: "Are my belongings insured during the move?",
      a: "Absolutely. We are fully licensed and insured. Your items are covered from the moment we pick them up until they are safely placed in your new home.",
    },
    {
      q: "Do you disassemble and reassemble furniture?",
      a: "Yes, our team comes equipped with the necessary tools to safely disassemble large furniture and reassemble it at your destination.",
    },
    {
      q: "How far in advance should I book?",
      a: "We recommend booking at least 2-4 weeks in advance, especially during the busy summer months or month-end dates, to secure your preferred time.",
    },
  ];

  const standardPoints = [
    { icon: ShieldCheck, label: "100% Satisfaction" },
    { icon: Shield, label: "Insured & Bonded" },
    { icon: CheckCircle, label: "Licensed Crew" },
    { icon: ThumbsUp, label: "5-Star Standard" },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Request a Quote",
      desc: "Fill out our simple form or call us to get a free, no-obligation moving quote tailored to your specific needs.",
    },
    {
      step: "2",
      title: "Schedule Your Move",
      desc: "Choose a date and time that works for you. We'll confirm the details and send you a preparation checklist.",
    },
    {
      step: "3",
      title: "We Handle Everything",
      desc: "Our premium trucks and professional crew arrive on time to pack, load, and move your belongings safely.",
    },
  ];

  const services = [
    {
      icon: MapPin,
      title: "Local Moving",
      desc: "Expert local moving services in Vancouver, Surrey, Burnaby, and surrounding areas.",
      img: "/images/service-local.jpg",
      alt: "Local movers carrying boxes",
    },
    {
      icon: Truck,
      title: "Long Distance",
      desc: "Reliable long-distance moving to Kelowna, Kamloops, Alberta, and across Canada.",
      img: "/images/service-long-distance.jpg",
      alt: "Long distance moving truck on the highway",
    },
    {
      icon: Box,
      title: "Packing & Loading",
      desc: "Professional packing and loading services to ensure your items are safe.",
      img: "/images/packed.jpeg",
      alt: "Meticulously packed items and protective wrap",
    },
  ];

  const quoteFormCard = (
    <AnimatePresence mode="wait">
      {!isFormSubmitted ? (
        <motion.div
          key={`step-${quoteStep}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress Bar */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${step <= quoteStep ? "bg-red-600" : "bg-gray-100"}`}
              />
            ))}
          </div>

          <h3 className="text-3xl font-bold mb-2 font-heading text-blue-950">
            {quoteStep === 1 && "What are you moving?"}
            {quoteStep === 2 && "Where are you moving?"}
            {quoteStep === 3 && "When are you moving?"}
            {quoteStep === 4 && "Your Contact Info"}
          </h3>
          <p className="text-gray-500 mb-6">
            {quoteStep === 1 && "Select the size of your move."}
            {quoteStep === 2 && "Enter your pickup and drop-off locations."}
            {quoteStep === 3 && "Choose your preferred moving date."}
            {quoteStep === 4 && "We'll send your free quote immediately."}
          </p>

          <form className="space-y-4" onSubmit={handleQuoteSubmit}>
            {quoteStep === 1 && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "studio", label: "Studio / 1 Bed", icon: Home },
                  { id: "2bed", label: "2-3 Bedrooms", icon: Home },
                  { id: "4bed", label: "4+ Bedrooms", icon: Building2 },
                  {
                    id: "office",
                    label: "Office / Commercial",
                    icon: Briefcase,
                  },
                ].map((size) => (
                  <div
                    key={size.id}
                    onClick={() => {
                      setQuoteData({ ...quoteData, moveSize: size.id });
                      setQuoteStep(2);
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-2 text-center transition-all ${quoteData.moveSize === size.id ? "border-red-600 bg-red-50 text-red-700" : "border-gray-100 hover:border-red-200 hover:bg-gray-50 text-gray-600"}`}
                  >
                    <size.icon
                      size={24}
                      className={
                        quoteData.moveSize === size.id
                          ? "text-red-600"
                          : "text-gray-400"
                      }
                    />
                    <span className="font-medium text-sm">{size.label}</span>
                  </div>
                ))}
              </div>
            )}

            {quoteStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moving From (City or Postal Code)
                  </label>
                  <input
                    required
                    value={quoteData.fromZip}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        fromZip: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Vancouver, V6B 1A1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moving To (City or Postal Code)
                  </label>
                  <input
                    required
                    value={quoteData.toZip}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        toZip: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Surrey, V3T 1A1"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setQuoteStep(1)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {quoteStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      required
                      value={quoteData.date}
                      onChange={(e) =>
                        setQuoteData({
                          ...quoteData,
                          date: e.target.value,
                        })
                      }
                      type="date"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setQuoteStep(2)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {quoteStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      required
                      value={quoteData.name}
                      onChange={(e) =>
                        setQuoteData({
                          ...quoteData,
                          name: e.target.value,
                        })
                      }
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      required
                      value={quoteData.phone}
                      onChange={(e) =>
                        setQuoteData({
                          ...quoteData,
                          phone: e.target.value,
                        })
                      }
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="604-442-6622"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    required
                    value={quoteData.email}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setQuoteStep(3)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-colors"
                  >
                    {isSubmitting ? "Sending..." : "Get My Instant Quote"}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </motion.button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-bold mb-2 font-heading text-blue-950">
            Quote Requested!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you! One of our moving specialists will call you within 15
            minutes with your free quote.
          </p>
          <button
            onClick={() => setIsFormSubmitted(false)}
            className="text-blue-600 font-medium hover:underline"
          >
            Submit another request
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <main className="min-h-screen bg-gray-50 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md ${isScrolled ? "shadow-md py-3" : "py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-48 h-12 flex items-center">
              <Image
                src="/images/logo.png"
                alt="NorthPrime Movers Logo"
                fill
                sizes="(max-width: 768px) 200px, 200px"
                className="object-contain object-left"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#services" className="hover:text-red-600 transition-colors">
              Services
            </a>
            <a
              href="#how-it-works"
              className="hover:text-red-600 transition-colors"
            >
              How it Works
            </a>
            <a href="#fleet" className="hover:text-red-600 transition-colors">
              Our Promise
            </a>
            <a href="#reviews" className="hover:text-red-600 transition-colors">
              Reviews
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+16044426622"
              className="font-bold flex items-center gap-2 text-blue-950 transition-colors"
            >
              <Phone size={18} /> 604-442-6622
            </a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#quote"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 shadow-md transition-colors"
            >
              Get a Quote
            </motion.a>
          </div>

          <button
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4 text-gray-800 font-medium">
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>
                  Services
                </a>
                <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
                  How it Works
                </a>
                <a href="#fleet" onClick={() => setIsMobileMenuOpen(false)}>
                  Our Promise
                </a>
                <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>
                  Reviews
                </a>
                <a
                  href="#quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-red-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mt-2"
                >
                  Get a Free Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section: bold headline, framed photo, quote-teaser card */}
      <section className="relative bg-gray-50 pt-32 pb-16 px-6 overflow-hidden">
        {/* Decorative background wave lines */}
        <motion.svg
          style={{ opacity: heroBgOpacity }}
          className="absolute inset-0 w-full h-full text-blue-100"
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
        >
          <path
            d="M-50,200 C150,100 350,300 550,180 C650,120 750,200 850,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-50,350 C150,280 350,450 550,320 C650,260 750,340 850,300"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-50,480 C150,420 350,560 550,450 C650,400 750,470 850,430"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-red-600 rounded-full"></div>
              <span className="text-red-600 font-bold tracking-wide uppercase text-sm">
                Fast and Secure Move
              </span>
            </div>
            <h1 className="font-heading uppercase text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.05] text-blue-950">
              Moving Was
              <br />
              Never <span className="text-red-600">So Easy</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              Premium trucks, pristine equipment, and a team dedicated to
              earning your 5-star review across the Lower Mainland.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#quote"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                Get My Free Quote <ArrowRight size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+16044426622"
                className="bg-white border-2 border-blue-950 text-blue-950 font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={20} /> Call Now
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <Image
              src="/images/humans.jpeg"
              alt="NorthPrime Movers crew carrying boxes"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Quote teaser card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto mt-12 bg-red-600 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Headphones className="text-white" size={26} />
            </div>
            <div>
              <p className="text-red-100 font-medium text-sm uppercase tracking-wide">
                Get a Free Quote!
              </p>
              <p className="text-white font-heading text-2xl font-bold">
                604-442-6622
              </p>
            </div>
          </div>
          <p className="text-red-50 flex-1 text-center md:text-left">
            No hidden fees, no surprises &mdash; just a fast, honest quote
            from a licensed and insured local crew.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#quote"
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            Free Quote <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </section>

      {/* Get a Quote Section */}
      <section id="quote" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-blue-950">
              Get Your Free Quote in Under 60 Seconds
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              No hidden fees, no surprises. Tell us about your move and one
              of our specialists will call you back with a transparent,
              no-obligation quote.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Transparent, upfront pricing",
                "Fully licensed and insured crews",
                "Free, no-obligation quote in minutes",
                "Fast callback within 15 minutes",
              ].map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 font-medium"
                >
                  <CheckCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                  {point}
                </li>
              ))}
            </ul>
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl hidden lg:block">
              <Image
                src="/images/fleet-truck.jpg"
                alt="NorthPrime Movers truck ready for a move"
                fill
                sizes="50vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-gray-900 border border-gray-100 relative"
          >
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full shadow-lg transform rotate-3 border-2 border-white text-sm whitespace-nowrap">
              10% Off For First-Time Customers
            </div>
            {quoteFormCard}
          </motion.div>
        </div>
      </section>

      {/* Services Section: 2x2 grid */}
      <section id="services" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.4fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-red-600 rounded-full"></div>
              <span className="text-red-600 font-bold tracking-wide uppercase text-sm">
                Services
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold mb-6 text-blue-950">
              Precise and Hard Working
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you&apos;re moving across the street or across the
              province, we have you covered with a service built around your
              needs.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#quote"
              className="inline-flex bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl items-center gap-2 transition-colors"
            >
              Get a Quote <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <ServiceIcon icon={service.icon} />
                <h3 className="text-lg font-bold mt-4 mb-2 text-blue-950">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-sm min-h-[160px]"
            >
              <Image
                src="/images/truck-inner.jpeg"
                alt="Team loading a moving truck"
                fill
                sizes="25vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The NorthPrime Standard */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {standardPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-blue-950 rounded-2xl px-5 py-4"
              >
                <point.icon className="text-red-500 shrink-0" size={22} />
                <span className="text-white font-bold text-sm md:text-base">
                  {point.label}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-red-600 rounded-full"></div>
              <span className="text-red-600 font-bold tracking-wide uppercase text-sm">
                The NorthPrime Standard
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold mb-4 text-blue-950">
              What Every Move Includes
            </h2>
            <p className="text-gray-600 leading-relaxed">
              No matter the size of your move, every NorthPrime job comes
              with the same promise: transparent pricing, licensed and
              insured crews, and a team that treats your belongings like
              their own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Promise / Fleet Section */}
      <section id="fleet" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/room.jpeg"
              alt="Neatly packed and organized moving boxes"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-red-600 rounded-full"></div>
              <span className="text-red-600 font-bold tracking-wide uppercase text-sm">
                Why Us
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold mb-6 text-blue-950">
              Premium Service. Pristine Equipment.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in doing things right, which means we never rely on
              old, broken-down trucks or dirty moving pads. We invest heavily
              in state-of-the-art equipment to ensure your belongings are
              treated with the utmost respect and care.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Premium, fully-equipped moving trucks",
                "Fresh, clean moving blankets for every job",
                "Modern dollies and lifting straps",
                "Highly motivated crew eager to earn your 5-star review",
              ].map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 font-medium"
                >
                  <CheckCircle
                    className="text-red-600 shrink-0 mt-0.5"
                    size={20}
                  />
                  {point}
                </li>
              ))}
            </ul>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#quote"
              className="inline-flex bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl items-center gap-2 transition-colors"
            >
              Get My Free Quote <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Service Area Visuals */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h2 className="font-heading text-4xl font-bold mb-6 text-blue-950">
                Proudly Serving the Lower Mainland
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                As a locally owned and operated company, we know the ins and
                outs of Metro Vancouver. From downtown high-rises to suburban
                family homes, we navigate the logistics so you don&apos;t have
                to.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Vancouver",
                  "Surrey",
                  "Burnaby",
                  "Richmond",
                  "Coquitlam",
                  "Langley",
                  "Delta",
                  "Maple Ridge",
                  "New Westminster",
                  "North Vancouver",
                  "West Vancouver",
                  "Port Coquitlam",
                  "Pitt Meadows",
                  "White Rock",
                ].map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 text-blue-900 font-medium"
                  >
                    <MapPin size={18} className="text-red-600" /> {city}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 mt-8">
                <div className="h-48 rounded-3xl bg-[url('/images/service-local.jpg')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">
                    Vancouver
                  </span>
                </div>
                <div className="h-64 rounded-3xl bg-[url('/images/fleet-truck.jpg')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">
                    Burnaby
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 rounded-3xl bg-[url('/images/service-packing.jpg')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">
                    Surrey
                  </span>
                </div>
                <div className="h-48 rounded-3xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center flex-col text-blue-600 shadow-inner">
                  <MapIcon size={32} className="mb-2 opacity-50" />
                  <span className="font-medium px-4 text-center">
                    And everywhere in between!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works: horizontal stepper */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-blue-950 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-950 to-blue-950"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-200">
              Three simple steps to your new home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-1 bg-blue-900 rounded-full"></div>
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-blue-950 border-4 border-red-600 flex items-center justify-center font-bold text-xl mb-6 shadow-md">
                  {item.step}
                </div>
                <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-800 p-8 rounded-3xl hover:bg-blue-900/60 transition-colors h-full">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials: single card with dot navigation */}
      <section id="reviews" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-blue-950">
              Early Customer Love
            </h2>
            <p className="text-xl text-gray-600">
              See what our first clients are saying about the NorthPrime
              standard.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 relative text-center"
            >
              <Quote className="text-blue-100 w-12 h-12 mx-auto mb-6" />
              <div className="flex justify-center text-yellow-400 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-xl text-gray-800 leading-relaxed mb-8 italic">
                &quot;{testimonials[activeTestimonial].text}&quot;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-950 text-white font-bold flex items-center justify-center">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-950">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${activeTestimonial === i ? "w-8 bg-red-600" : "w-2.5 bg-gray-200 hover:bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold mb-4 text-blue-950">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about moving with us.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg text-blue-950 pr-8">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-400"}`}
                  >
                    <ChevronDown
                      className={`transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      size={20}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition into closing CTA */}
      <div className="bg-gray-50 text-blue-950">
        <WaveDivider />
      </div>

      {/* CTA Section */}
      <section className="pb-24 pt-4 px-6 bg-blue-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/truck-packed.jpeg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl font-bold mb-6">
            Ready for a Stress-Free Move?
          </h2>
          <p className="text-2xl text-blue-100 mb-10">
            Get your free quote today and let us handle the heavy lifting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#quote"
              className="bg-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 shadow-xl shadow-red-600/30"
            >
              Get My Free Quote <ArrowRight size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+16044426622"
              className="bg-blue-900/60 border border-blue-800 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Call Now: 604-442-6622
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-6 bg-blue-950 text-blue-200 border-t border-blue-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-900 text-white rounded-lg flex items-center justify-center">
                <Truck size={24} />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                NorthPrime <span className="text-red-600">Movers</span>
              </span>
            </div>
            <p className="text-blue-200/80 max-w-sm mb-6 leading-relaxed">
              Vancouver&apos;s premier moving service. Dedicated to providing
              stress-free, reliable, and transparent moving experiences across
              the Lower Mainland.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 cursor-pointer transition-colors">
                <a href="https://www.facebook.com/profile.php?id=61588982723029">
                  FB
                </a>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 cursor-pointer transition-colors">
                <a href="https://www.instagram.com/northprimemovers.ca/">IG</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-red-500 shrink-0 mt-0.5" />
                <span>604-442-6622</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-red-500 shrink-0 mt-0.5" />
                <span>
                  5960 142 Street
                  <br />
                  Surrey, BC V3X 1C8
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-red-500 shrink-0 mt-0.5" />
                <span>Mon-Sun: 7am - 8pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Insurance Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-blue-900/50 text-center text-sm text-blue-200/50">
          <p>
            &copy; {new Date().getFullYear()} NorthPrime Movers. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile Call Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-40"
      >
        <a
          href="#quote"
          className="bg-red-600 text-white font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-xl border border-red-500"
        >
          <Phone size={20} /> Get a Free Quote
        </a>
      </motion.div>

      {/* Floating Quick Chat Widget */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end gap-4"
      >
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 max-w-[250px] mb-2 relative animate-bounce-slow">
          <p className="text-sm font-medium text-gray-800">
            Need a quick estimate? Chat with us now!
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
        </div>
        <a
          href="https://wa.me/16044426622"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
        >
          <MessageCircle size={32} />
        </a>
      </motion.div>
    </main>
  );
}
