"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Truck, ShieldCheck, MapPin, Star, CheckCircle, 
  ArrowRight, Menu, X, ChevronDown, ThumbsUp, 
  ChevronLeft, ChevronRight, Quote, Box, Clock, Shield, Map as MapIcon, Zap,
  MessageCircle, Home, Building2, Briefcase, Calendar
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'motion/react';

// --- Helper Components ---

const AnimatedCounter = ({ from, to, duration = 2, suffix = "", prefix = "" }: { from: number, to: number, duration?: number, suffix?: string, prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
};

const TwoToneIcon = ({ icon: Icon }: { icon: any }) => (
  <div className="relative inline-flex items-center justify-center w-16 h-16 group">
    <div className="absolute inset-0 bg-red-100 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12 duration-300"></div>
    <div className="absolute inset-0 bg-blue-100 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6 duration-300"></div>
    <div className="absolute inset-0 bg-white rounded-2xl shadow-sm border border-gray-50"></div>
    <Icon size={32} className="relative z-10 text-blue-900 transition-transform group-hover:scale-110 duration-300" />
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Multi-step quote form state
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    moveSize: '',
    fromZip: '',
    toZip: '',
    date: '',
    name: '',
    email: '',
    phone: ''
  });

  // Parallax & Scroll Animations
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroBgOpacity = useTransform(scrollY, [0, 500], [0.2, 0]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial Auto-play
  const testimonials = [
    { name: "Sarah J.", role: "Moved to Burnaby", text: "NorthPrime Movers handled our recent move with incredible care. They really went above and beyond to make sure everything was perfect. Highly recommended!" },
    { name: "Mark T.", role: "Moved to Surrey", text: "Affordable, reliable, and on time. The truck was spotless and the crew was very professional. They took the stress completely out of moving day." },
    { name: "Emily R.", role: "Moved within Vancouver", text: "I was nervous about hiring movers, but they exceeded all expectations. No hidden fees, exactly as quoted. Great experience." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const faqs = [
    { q: "Are there any hidden fees?", a: "No! We provide transparent, upfront pricing. The quote you receive is the price you pay, with no surprise charges on moving day." },
    { q: "Are my belongings insured during the move?", a: "Absolutely. We are fully licensed and insured. Your items are covered from the moment we pick them up until they are safely placed in your new home." },
    { q: "Do you disassemble and reassemble furniture?", a: "Yes, our team comes equipped with the necessary tools to safely disassemble large furniture and reassemble it at your destination." },
    { q: "How far in advance should I book?", a: "We recommend booking at least 2-4 weeks in advance, especially during the busy summer months or month-end dates, to secure your preferred time." }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      
      {/* Top Discount Banner */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'} bg-red-600 text-white text-center py-2 px-4 shadow-[0_2px_10px_rgba(220,38,38,0.4)]`}>
        <div className="font-bold text-sm sm:text-base flex items-center justify-center gap-2 tracking-wide">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          10% DISCOUNT FOR FIRST-TIME CUSTOMERS
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'top-0 bg-white/90 backdrop-blur-md shadow-md py-3' : 'top-10 bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-lg flex items-center justify-center shadow-lg">
              <Truck size={24} />
            </div>
            <span className={`font-heading font-extrabold text-2xl tracking-tight ${isScrolled ? 'text-blue-950' : 'text-white'}`}>
              NorthPrime <span className="text-red-600">Movers</span>
            </span>
          </div>

          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
            <a href="#services" className="hover:text-red-600 transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-red-600 transition-colors">How it Works</a>
            <a href="#fleet" className="hover:text-red-600 transition-colors">Our Promise</a>
            <a href="#reviews" className="hover:text-red-600 transition-colors">Reviews</a>
          </div>

          <div className="hidden md:block">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+16044426622"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-colors"
            >
              <Phone size={18} /> 604-442-6622
            </motion.a>
          </div>

          <button 
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4 text-gray-800 font-medium">
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
                <a href="#fleet" onClick={() => setIsMobileMenuOpen(false)}>Our Promise</a>
                <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
                <a href="tel:+16044426622" className="bg-red-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mt-2">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section (Parallax) */}
      <section className="relative bg-blue-950 text-white pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <motion.div 
          style={{ y: heroBgY, opacity: heroBgOpacity }} 
          className="absolute inset-0 bg-[url('https://storage.googleapis.com/aistudio-user-assets/sandybarret58%40gmail.com/1743070632313_truck.jpg')] bg-cover bg-center mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/95 to-blue-900/60"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl pt-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-800 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-blue-200 font-medium text-sm">Premium Movers in Vancouver You Can Trust</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              A Fresh Start <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Deserves a Flawless Move.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed font-light">
              Premium trucks, pristine equipment, and a team dedicated to earning your 5-star review.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+16044426622"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-colors"
              >
                <Phone size={20} /> 604-442-6622
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-blue-200">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white"><AnimatedCounter from={0} to={100} suffix="%" /></span>
                <span>Fully Insured</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white"><AnimatedCounter from={0} to={0} prefix="$" /></span>
                <span>Hidden Fees</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white"><AnimatedCounter from={0} to={24} suffix="/7" /></span>
                <span>Customer Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-gray-900 border border-gray-100 relative mt-10 lg:mt-0"
          >
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full shadow-lg transform rotate-3 border-2 border-white text-sm whitespace-nowrap">
              10% Off For First-Time Customers
            </div>
            
            <AnimatePresence mode="wait">
              {!isFormSubmitted ? (
                <motion.div key={`step-${quoteStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  
                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className={`h-2 flex-1 rounded-full ${step <= quoteStep ? 'bg-red-600' : 'bg-gray-100'}`} />
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

                  <form className="space-y-4" onSubmit={(e) => { 
                    e.preventDefault(); 
                    if (quoteStep < 4) setQuoteStep(quoteStep + 1);
                    else setIsFormSubmitted(true); 
                  }}>
                    
                    {quoteStep === 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'studio', label: 'Studio / 1 Bed', icon: Home },
                          { id: '2bed', label: '2-3 Bedrooms', icon: Home },
                          { id: '4bed', label: '4+ Bedrooms', icon: Building2 },
                          { id: 'office', label: 'Office / Commercial', icon: Briefcase }
                        ].map((size) => (
                          <div 
                            key={size.id}
                            onClick={() => { setQuoteData({...quoteData, moveSize: size.id}); setQuoteStep(2); }}
                            className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-2 text-center transition-all ${quoteData.moveSize === size.id ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-100 hover:border-red-200 hover:bg-gray-50 text-gray-600'}`}
                          >
                            <size.icon size={24} className={quoteData.moveSize === size.id ? 'text-red-600' : 'text-gray-400'} />
                            <span className="font-medium text-sm">{size.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {quoteStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Moving From (City or Postal Code)</label>
                          <input required value={quoteData.fromZip} onChange={e => setQuoteData({...quoteData, fromZip: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g. Vancouver, V6B 1A1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Moving To (City or Postal Code)</label>
                          <input required value={quoteData.toZip} onChange={e => setQuoteData({...quoteData, toZip: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="e.g. Surrey, V3T 1A1" />
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button type="button" onClick={() => setQuoteStep(1)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Back</button>
                          <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">Next <ArrowRight size={18} /></button>
                        </div>
                      </div>
                    )}

                    {quoteStep === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input required value={quoteData.date} onChange={e => setQuoteData({...quoteData, date: e.target.value})} type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button type="button" onClick={() => setQuoteStep(2)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Back</button>
                          <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">Next <ArrowRight size={18} /></button>
                        </div>
                      </div>
                    )}

                    {quoteStep === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input required value={quoteData.name} onChange={e => setQuoteData({...quoteData, name: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input required value={quoteData.phone} onChange={e => setQuoteData({...quoteData, phone: e.target.value})} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="604-442-6622" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input required value={quoteData.email} onChange={e => setQuoteData({...quoteData, email: e.target.value})} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button type="button" onClick={() => setQuoteStep(3)} className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Back</button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-colors"
                          >
                            Get My Instant Quote <ArrowRight size={20} />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 font-heading text-blue-950">Quote Requested!</h3>
                  <p className="text-gray-600 mb-6">Thank you! One of our moving specialists will call you within 15 minutes with your free quote.</p>
                  <button onClick={() => setIsFormSubmitted(false)} className="text-blue-600 font-medium hover:underline">
                    Submit another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Realistic Trust Strip */}
      <div className="bg-white border-b border-gray-200 py-6 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-gray-600">
          <div className="flex items-center gap-2 font-bold text-lg"><ShieldCheck className="text-red-600"/> 100% Satisfaction Guarantee</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Shield className="text-blue-600"/> Fully Insured & Bonded</div>
          <div className="flex items-center gap-2 font-bold text-lg"><CheckCircle className="text-red-600"/> Licensed Professionals</div>
          <div className="flex items-center gap-2 font-bold text-lg"><ThumbsUp className="text-blue-600"/> 5-Star Service Standard</div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-blue-950">Moving Services Tailored to You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Whether you&apos;re moving across the street or across the province, we have you covered.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Local Moving", desc: "Expert local moving services in Vancouver, Surrey, Burnaby, and surrounding areas." },
              { icon: Truck, title: "Long Distance", desc: "Reliable long-distance moving to Kelowna, Kamloops, Alberta, and across Canada." },
              { icon: Box, title: "Packing & Loading", desc: "Professional packing and loading services to ensure your items are safe." }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-6"><TwoToneIcon icon={service.icon} /></div>
                <h3 className="text-2xl font-bold mb-4 text-blue-950">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Visuals */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-1/2">
              <h2 className="font-heading text-4xl font-bold mb-6 text-blue-950">Proudly Serving the Lower Mainland</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                As a locally owned and operated company, we know the ins and outs of Metro Vancouver. From downtown high-rises to suburban family homes, we navigate the logistics so you don&apos;t have to.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam', 'Langley'].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-blue-900 font-medium">
                    <MapPin size={18} className="text-red-600" /> {city}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="h-48 rounded-3xl bg-[url('https://picsum.photos/seed/vancouver/600/400')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">Vancouver</span>
                </div>
                <div className="h-64 rounded-3xl bg-[url('https://picsum.photos/seed/burnaby/600/500')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">Burnaby</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 rounded-3xl bg-[url('https://picsum.photos/seed/surrey/600/500')] bg-cover bg-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors"></div>
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">Surrey</span>
                </div>
                <div className="h-48 rounded-3xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center flex-col text-blue-600 shadow-inner">
                  <MapIcon size={32} className="mb-2 opacity-50" />
                  <span className="font-medium px-4 text-center">And everywhere in between!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Timeline: How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-950 to-blue-950"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-blue-200">Three simple steps to your new home.</p>
          </motion.div>

          <div ref={timelineRef} className="relative pl-12 md:pl-0">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-900 -translate-x-1/2 rounded-full"></div>
            <motion.div style={{ height: lineHeight }} className="hidden md:block absolute left-1/2 top-0 w-1 bg-red-600 -translate-x-1/2 rounded-full origin-top"></motion.div>

            {/* Mobile Left Line */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-1 bg-blue-900 rounded-full"></div>
            <motion.div style={{ height: lineHeight }} className="md:hidden absolute left-4 top-0 w-1 bg-red-600 rounded-full origin-top"></motion.div>

            {[
              { step: "1", title: "Request a Quote", desc: "Fill out our simple form or call us to get a free, no-obligation moving quote tailored to your specific needs.", align: "right" },
              { step: "2", title: "Schedule Your Move", desc: "Choose a date and time that works for you. We'll confirm the details and send you a preparation checklist.", align: "left" },
              { step: "3", title: "We Handle Everything", desc: "Our premium trucks and professional crew arrive on time to pack, load, and move your belongings safely.", align: "right" }
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal w-full mb-16 last:mb-0 ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Node */}
                <div className="absolute left-[-48px] md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-blue-950 border-4 border-red-600 flex items-center justify-center font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  {item.step}
                </div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: item.align === 'left' ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full md:w-[45%] bg-blue-900/40 backdrop-blur-sm border border-blue-800 p-8 rounded-3xl hover:bg-blue-900/60 transition-colors`}
                >
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-blue-200 leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise / Fleet Section */}
      <section id="fleet" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-6">
                  <Zap size={16} /> The NorthPrime Advantage
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-blue-950">Premium Service.<br/>Pristine Equipment.</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We believe in doing things right, which means we never rely on old, broken-down trucks or dirty moving pads. We invest heavily in state-of-the-art equipment to ensure your belongings are treated with the utmost respect and care.
                </p>
                <ul className="space-y-4">
                  {[
                    "Premium, fully-equipped moving trucks",
                    "Fresh, clean moving blankets for every job",
                    "Modern dollies and lifting straps",
                    "Highly motivated crew eager to earn your 5-star review"
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                      <CheckCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <img src="https://storage.googleapis.com/aistudio-user-assets/sandybarret58%40gmail.com/1743070632313_truck.jpg" alt="Premium Moving Truck" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">Our fleet is ready for your move.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section id="reviews" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-blue-950">Early Customer Love</h2>
            <p className="text-xl text-gray-600">See what our first clients are saying about the NorthPrime standard.</p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gray-50 rounded-[2rem] p-8 md:p-16 text-center border border-gray-100 relative"
              >
                <Quote className="absolute top-8 left-8 text-blue-100 w-24 h-24 -z-0" />
                <div className="relative z-10">
                  <div className="flex justify-center text-yellow-400 mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                  </div>
                  <p className="text-2xl md:text-3xl text-gray-800 font-medium italic mb-10 leading-relaxed">
                    &quot;{testimonials[currentTestimonial].text}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-xl text-blue-950">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4 text-blue-950">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about moving with us.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg text-blue-950 pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-blue-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract/1920/1080?blur=10')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl font-bold mb-6">Ready for a Stress-Free Move?</h2>
          <p className="text-2xl text-blue-100 mb-10">Get your free quote today and let us handle the heavy lifting.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+16044426622"
              className="bg-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-2 shadow-xl shadow-red-600/30"
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
              Vancouver&apos;s premier moving service. Dedicated to providing stress-free, reliable, and transparent moving experiences across the Lower Mainland.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 cursor-pointer transition-colors">FB</div>
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-blue-800 cursor-pointer transition-colors">IG</div>
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
                <span>1234 Moving Way<br/>Vancouver, BC V6B 1A1</span>
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
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insurance Details</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-blue-900/50 text-center text-sm text-blue-200/50">
          <p>&copy; {new Date().getFullYear()} NorthPrime Movers. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Mobile Call Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-40"
      >
        <a href="tel:+16044426622" className="bg-red-600 text-white font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(220,38,38,0.5)] border border-red-500">
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
          <p className="text-sm font-medium text-gray-800">Need a quick estimate? Chat with us now!</p>
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
