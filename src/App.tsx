import { useState, useEffect, FormEvent } from 'react';
import {
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Star,
  Check,
  Menu,
  X,
  Gift,
  ShieldCheck,
  Users,
  Award,
  ChevronRight,
  Heart,
  MessageSquare,
  BookmarkCheck,
  Send
} from 'lucide-react';
import { TOYS_DATA, TOY_CATEGORIES, REVIEWS_DATA, Toy } from './data/toys';
import ProductCard from './components/ProductCard';
import ToyFinderQuiz from './components/ToyFinderQuiz';
import ShopAssistant from './components/ShopAssistant';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'daycare' | 'tuition' | 'secondary' | 'holiday'>('all');
  const [cart, setCart] = useState<Toy[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('playgroup');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cart Checkout Reservation state
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutMethod, setCheckoutMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleAddToCart = (toy: Toy) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === toy.id);
      if (exists) {
        // Remove if clicked again
        return prev.filter((item) => item.id !== toy.id);
      } else {
        return [...prev, toy];
      }
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (toyId: string) => {
    setWishlist((prev) =>
      prev.includes(toyId) ? prev.filter((id) => id !== toyId) : [...prev, toyId]
    );
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto-reset after some time
      setIsSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setIsCartOpen(false);
      setCheckoutName('');
      setCheckoutPhone('');
      setCheckoutAddress('');
    }, 4000);
  };

  const filteredToys = activeCategory === 'all' 
    ? TOYS_DATA 
    : TOYS_DATA.filter(t => t.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black font-sans selection:bg-brand-orange selection:text-brand-black overflow-x-hidden antialiased">
      
      {/* Upper Announcement Bar */}
      <div className="bg-brand-black text-brand-cream text-xs py-2 px-4 flex justify-between items-center z-40 relative border-b-2 border-brand-black font-mono font-bold uppercase tracking-wider">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 font-black">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange shrink-0" />
            <span>Use code <strong className="text-brand-orange">SRIELITLOVE</strong> for 10% off your first visit!</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5 font-black">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> Ipoh, Perak</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-orange" /> Daily : 11.00a.m. - 6.15p.m</span>
        </div>
      </div>

      {/* Primary Header */}
      <header className="sticky top-0 bg-brand-cream/95 backdrop-blur-md border-b-3 border-brand-black z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-3xl select-none group-hover:rotate-12 transition-transform duration-300">🏫</span>
            <div>
              <h1 className="font-display font-black text-xl sm:text-2xl tracking-tighter text-brand-black uppercase leading-none group-hover:text-brand-red transition-colors">
                Pusat Jagaan Sri Elit
              </h1>
              <p className="text-[10px] font-black text-brand-red tracking-widest uppercase mt-0.5">
                Ipoh, Perak
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-brand-black">
            <a href="#collections" className="hover:text-brand-red transition-colors">Academic Programs</a>
            <a href="#gift-quiz" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-brand-orange animate-bounce" />
              <span>Program Finder</span>
            </a>
            <a href="#community" className="hover:text-brand-red transition-colors">Sensory Playgroups</a>
            <a href="#visit" className="hover:text-brand-red transition-colors">Center Location</a>
            <a href="#reviews" className="hover:text-brand-red transition-colors">Neighborhood Reviews</a>
          </nav>

          {/* Cart & Contact Action */}
          <div className="flex items-center gap-4">
            
            {/* Quick Contact Line */}
            <a 
              href="https://wa.me/60129250328" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center gap-3 text-brand-black hover:text-brand-red transition-colors font-bold"
            >
              <div className="w-9 h-9 border-2 border-brand-black bg-brand-orange flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                <Phone className="w-4 h-4 text-brand-black" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] font-black text-stone-500 block uppercase tracking-wider">WhatsApp us</span>
                <span className="text-xs font-black text-brand-black">+6012-925 0328</span>
              </div>
            </a>

            {/* Shopping Bag Button */}
            <button
              id="header-bag-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-3 border-2 border-brand-black bg-brand-red text-white hover:bg-brand-orange transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-cream text-brand-black border-2 border-brand-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider px-1">
                RM {cartTotal}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border-2 border-brand-black bg-white text-brand-black hover:bg-brand-orange cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b-3 border-brand-black overflow-hidden z-25 relative"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 text-center font-black uppercase tracking-wider text-xs text-brand-black">
              <a 
                href="#collections" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block py-3 hover:text-brand-red border-b-2 border-brand-black/10"
              >
                Academic Programs
              </a>
              <a 
                href="#gift-quiz" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block py-3 hover:text-brand-red border-b-2 border-brand-black/10 flex items-center justify-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4 text-brand-orange" />
                <span>Program Finder</span>
              </a>
              <a 
                href="#community" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block py-3 hover:text-brand-red border-b-2 border-brand-black/10"
              >
                Sensory Playgroups
              </a>
              <a 
                href="#visit" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block py-3 hover:text-brand-red border-b-2 border-brand-black/10"
              >
                Center Location
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block py-3 hover:text-brand-red"
              >
                Neighborhood Reviews
              </a>
              
              <div className="pt-4 border-t-2 border-brand-black/10 flex flex-col items-center gap-3">
                <span className="text-[10px] text-stone-500 font-mono">Taman Kledang Sentosa, Ipoh</span>
                <a 
                  href="https://wa.me/60123456789" 
                  className="px-6 py-3 bg-brand-black text-white border-2 border-brand-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>WhatsApp: +60 12-345 6789</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Subtle decorative shapes to keep design clean and brutalist */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-orange/15 rounded-none rotate-12 -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-teal/10 rounded-none -rotate-12 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-orange border-2 border-brand-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] w-fit mx-auto lg:mx-0 mb-6">
                <span className="text-[10px] font-mono font-black text-brand-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-red border border-brand-black animate-ping" />
                  Premium Primary & Secondary Academic Center in Perak
                </span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-black tracking-tighter uppercase leading-[0.95] mb-6">
                Nurturing Minds <br />in the Heart of <span className="text-brand-red underline decoration-brand-black decoration-4 underline-offset-4">Ipoh</span>
              </h2>

              <p className="text-brand-black text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
                Welcome to <strong>Pusat Jagaan Sri Elit</strong>, Ipoh's trusted neighborhood SJK/SK primary school daycare (Standard 1 to 6), academic tuition center (KSSR/UASA), and secondary school coaching hub (Form 1 to 5 KSSM/SPM). We combine syllabus-aligned homework guidance, hot nutritious meals, and diagnostic evaluations to help your child thrive.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full">
                <a 
                  href="#collections" 
                  className="w-full sm:w-auto text-center px-8 py-4.5 bg-brand-black hover:bg-brand-red text-white border-2 border-brand-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(230,57,70,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Explore Academic Programs
                </a>
                <a 
                  href="#visit" 
                  className="w-full sm:w-auto text-center px-8 py-4.5 bg-white hover:bg-brand-cream text-brand-black border-2 border-brand-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <span>Visit Our Center</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-12 border-t-3 border-brand-black/10 mt-12 max-w-md mx-auto lg:mx-0">
                <div className="text-left">
                  <span className="block text-3xl font-black font-display text-brand-black tracking-tight leading-none uppercase">KSSR</span>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mt-1 font-mono">Syllabus Aligned</span>
                </div>
                <div className="text-left">
                  <span className="block text-3xl font-black font-display text-brand-black tracking-tight leading-none uppercase">100%</span>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mt-1 font-mono">Qualified Tutors</span>
                </div>
                <div className="text-left">
                  <span className="block text-3xl font-black font-display text-brand-black tracking-tight leading-none uppercase">Transit</span>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mt-1 font-mono">School Pickups</span>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6 relative">
              
              {/* Main Photo Frame */}
              <div className="relative border-4 border-brand-black shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] aspect-16/10 lg:aspect-4/3 max-w-xl mx-auto overflow-hidden group">
                <img 
                  src="/src/assets/images/academic_hero_1783737352143.jpg" 
                  alt="Inside our professional academic and daycare center in Ipoh, Perak" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 text-brand-black text-xs bg-brand-cream border-2 border-brand-black p-3 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] flex items-center justify-between">
                  <div className="text-left leading-tight pr-2">
                    <p className="font-black uppercase tracking-tight text-sm">Come visit our center today! 🏫</p>
                    <p className="font-semibold text-[10px] mt-0.5 text-stone-600">26, Tingkat Kledang 3, Taman Kledang Sentosa, 31450 Ipoh, Perak</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-brand-red shrink-0" />
                </div>
              </div>

              {/* Float-badge 1: Local community */}
              <div className="absolute -top-4 -right-4 bg-white border-2 border-brand-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-3 flex items-center gap-3 max-w-xs animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="w-10 h-10 border border-brand-black bg-brand-teal flex items-center justify-center text-lg select-none shrink-0">
                  🏫
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black uppercase tracking-tight text-brand-black font-display">Diagnostic Test</p>
                  <p className="text-[10px] text-stone-600 font-bold mt-0.5">Free Assessment with Enrollment</p>
                </div>
              </div>

              {/* Float-badge 2: Trust badge */}
              <div className="absolute -bottom-6 -left-4 bg-white border-2 border-brand-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="w-7 h-7 bg-brand-red text-white border border-brand-black flex items-center justify-center font-black text-[9px] select-none">A</span>
                  <span className="w-7 h-7 bg-brand-teal text-white border border-brand-black flex items-center justify-center font-black text-[9px] select-none">M</span>
                  <span className="w-7 h-7 bg-brand-orange text-brand-black border border-brand-black flex items-center justify-center font-black text-[9px] select-none">S</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-black pl-1">Loved by 200+ Ipoh parents</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-white border-y-3 border-brand-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 bg-brand-orange text-brand-black border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2px]" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-sm uppercase tracking-tight text-brand-black font-display">Licensed & Secure Care</h4>
                <p className="text-stone-500 text-xs mt-0.5 font-medium">Registered caretakers & secure entry controls.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 bg-brand-teal text-white border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 stroke-[2px]" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-sm uppercase tracking-tight text-brand-black font-display">SJK Syllabus Focus</h4>
                <p className="text-stone-500 text-xs mt-0.5 font-medium">Covers Chinese, BM, English, Maths, Science homework.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 bg-brand-red text-white border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 stroke-[2px]" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-sm uppercase tracking-tight text-brand-black font-display">Fresh Hot Lunch</h4>
                <p className="text-stone-500 text-xs mt-0.5 font-medium">Daily balanced meals, hot showers & quiet rest zones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <section id="collections" className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-black text-brand-red bg-white border-2 border-brand-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              Explore Our Programs
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black mt-6 mb-4 leading-none uppercase tracking-tighter">
              Curated Academic & Nurturing Care Programs
            </h2>
            <p className="text-brand-black text-xs sm:text-sm font-medium leading-relaxed">
              Click a program category tab below to filter our academic offerings. All tuition, supervision, and daycare programs can be reserved online for enrollment or assessment at our Kledang Sentosa center.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-2 border-brand-black ${
                activeCategory === 'all'
                  ? 'bg-brand-red text-white shadow-none translate-x-0.5 translate-y-0.5'
                  : 'bg-white text-brand-black hover:bg-brand-cream shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              🎒 All Programs
            </button>
            <button
              onClick={() => setActiveCategory('daycare')}
              className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-2 border-brand-black ${
                activeCategory === 'daycare'
                  ? 'bg-brand-red text-white shadow-none translate-x-0.5 translate-y-0.5'
                  : 'bg-white text-brand-black hover:bg-brand-cream shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              🍲 After-School Daycare
            </button>
            <button
              onClick={() => setActiveCategory('tuition')}
              className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-2 border-brand-black ${
                activeCategory === 'tuition'
                  ? 'bg-brand-red text-white shadow-none translate-x-0.5 translate-y-0.5'
                  : 'bg-white text-brand-black hover:bg-brand-cream shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              📚 SJK Primary Tuition
            </button>
             <button
              onClick={() => setActiveCategory('secondary')}
              className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-2 border-brand-black ${
                activeCategory === 'secondary'
                  ? 'bg-brand-red text-white shadow-none translate-x-0.5 translate-y-0.5'
                  : 'bg-white text-brand-black hover:bg-brand-cream shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              🎓 SMK Secondary Tuition
            </button>
            <button
              onClick={() => setActiveCategory('holiday')}
              className={`px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-wider cursor-pointer transition-all border-2 border-brand-black ${
                activeCategory === 'holiday'
                  ? 'bg-brand-red text-white shadow-none translate-x-0.5 translate-y-0.5'
                  : 'bg-white text-brand-black hover:bg-brand-cream shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              🗣️ Sensory & Booster Camps
            </button>
          </div>

          {/* Catalog Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredToys.map((toy) => (
                <motion.div
                  key={toy.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    toy={toy}
                    onAddToCart={handleAddToCart}
                    isAdded={cart.some((item) => item.id === toy.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Callout Info Section: Daycare & Study focus */}
      <section id="community" className="py-16 md:py-24 bg-brand-dark text-white relative overflow-hidden border-t-3 border-brand-black">
        {/* Abstract background decorative accent */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-brand-orange/10 rounded-none rotate-12 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left description */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange mb-2 block font-mono">
                Ipoh Community Focus
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-6 leading-tight uppercase tracking-tighter">
                Our Signature Academic Readiness & Sensory Playgroups
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6 font-medium">
                We believe that structured preparation paired with sensory discovery is key to primary school success. That is why we transformed a sunny corner of our Taman Kledang Sentosa center into an interactive learning library and sensory laboratory. 
              </p>
              <p className="text-stone-300 text-sm leading-relaxed mb-8 font-medium">
                Every Saturday morning, our senior educators host <strong>free interactive placement trials</strong>, vocabulary sensory games, and SJK essay outline booster sessions. We limit groups to 10 students to guarantee high-attention, low-stress personal guidance.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 border-2 border-brand-black bg-brand-orange text-brand-black flex items-center justify-center font-black text-sm shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">
                    ✓
                  </div>
                  <div className="text-left">
                    <h5 className="font-black text-sm text-stone-100 uppercase tracking-wide">Every Saturday, 10:30 AM</h5>
                    <p className="text-stone-400 text-xs mt-0.5 font-bold">Standard 1 to Standard 6 primary schoolers. Registration required.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 border-2 border-brand-black bg-brand-orange text-brand-black flex items-center justify-center font-black text-sm shrink-0 mt-0.5 shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">
                    ✓
                  </div>
                  <div className="text-left">
                    <h5 className="font-black text-sm text-stone-100 uppercase tracking-wide">Academic Diagnostic Assessment</h5>
                    <p className="text-stone-400 text-xs mt-0.5 font-bold">Find out your child's Chinese/BM/English spelling and comprehension levels instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Booking Form */}
            <div className="lg:col-span-6 bg-white text-brand-black p-6 sm:p-8 rounded-none border-3 border-brand-black shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl select-none">📝</span>
                <div className="text-left">
                  <h4 className="font-display font-black text-lg text-brand-black uppercase tracking-tight leading-none">
                    Schedule a Placement Tour & Assessment
                  </h4>
                  <p className="text-stone-500 text-[10px] font-black uppercase tracking-wider mt-1 block">
                    Free for Kledang Sentosa & surrounding Ipoh residents!
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="booking-form"
                    onSubmit={handleInquirySubmit} 
                    className="space-y-4 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block text-xs font-black text-brand-black uppercase tracking-wider mb-1.5">Parent's Full Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g., Sarah Mohamed"
                        className="w-full bg-brand-cream/40 border-2 border-brand-black focus:bg-brand-cream focus:outline-hidden p-3 rounded-none text-xs font-bold transition-all text-brand-black placeholder-stone-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-brand-black uppercase tracking-wider mb-1.5">Mobile Number (WhatsApp)</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g., +60 12-345 6789"
                          className="w-full bg-brand-cream/40 border-2 border-brand-black focus:bg-brand-cream focus:outline-hidden p-3 rounded-none text-xs font-bold transition-all text-brand-black placeholder-stone-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-brand-black uppercase tracking-wider mb-1.5">Inquiry Topic</label>
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full bg-brand-cream/40 border-2 border-brand-black focus:bg-brand-cream focus:outline-hidden p-3 rounded-none text-xs font-bold transition-all text-brand-black cursor-pointer"
                        >
                          <option value="daycare">Primary Daycare Enrollment</option>
                          <option value="tuition">Standard 1-6 Tuition Info</option>
                          <option value="playgroup">Sensory Playgroup Slot</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-brand-black uppercase tracking-wider mb-1.5">A Note about your Child (Grade / Standard / Study Needs)</label>
                      <textarea
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="e.g., Isaac is Standard 2, SJK(C) syllabus. Needs extra guidance with Chinese writing and homework coaching."
                        className="w-full bg-brand-cream/40 border-2 border-brand-black focus:bg-brand-cream focus:outline-hidden p-3 rounded-none text-xs font-bold transition-all text-brand-black resize-none placeholder-stone-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-brand-red hover:bg-brand-orange text-white font-black text-xs uppercase tracking-wider rounded-none shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Free Reservation</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-form"
                    className="py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <span className="text-5xl block mb-4 select-none animate-bounce">🎉</span>
                    <h4 className="font-display font-black text-xl text-brand-black uppercase">
                      Reservation Sent, {inquiryName}!
                    </h4>
                    <p className="text-stone-600 text-xs font-medium max-w-sm mx-auto mb-6 mt-2 leading-relaxed">
                      Thank you! Aisha or our center principal will send a direct confirmation to your WhatsApp at <strong className="text-brand-black">{inquiryPhone}</strong> shortly with your slot coordinates. See you!
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border-2 border-emerald-600 px-3 py-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved locally in physical books</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Program Finder Quiz Section */}
      <section id="gift-quiz" className="py-16 md:py-24 bg-brand-cream border-t-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-black text-brand-red bg-white border-2 border-brand-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              Program Finder Wizard
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black mt-6 mb-4 leading-none uppercase tracking-tighter">
              Let's Find the Perfect Program
            </h2>
            <p className="text-brand-black text-xs sm:text-sm font-medium leading-relaxed">
              Looking for SJK-aligned tutoring or safe after-school daycare? Take our quick interactive quiz, and we'll scan our academic curriculum to find the best match for your child.
            </p>
          </div>

          {/* Interactive Quiz Component */}
          <ToyFinderQuiz
            onAddToCart={handleAddToCart}
            cartIds={cart.map((t) => t.id)}
          />

        </div>
      </section>

      {/* Neighborhood Testimonials / Reviews */}
      <section id="reviews" className="py-16 md:py-24 bg-brand-cream border-t-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-brand-orange bg-white border-2 border-brand-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
              Community Love
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black mt-6 mb-4 leading-none uppercase tracking-tighter">
              What Sri Elit Parents Are Saying
            </h2>
            <p className="text-brand-black text-xs sm:text-sm font-medium leading-relaxed">
              We are so proud to be part of the Taman Kledang Sentosa neighborhood in Ipoh, Perak. Here are real remarks left by our regular parent visitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div 
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-white p-6 md:p-8 rounded-none border-2 border-brand-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-between text-left"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-brand-orange text-brand-black stroke-[2px]" />
                    ))}
                  </div>

                  <p className="text-brand-black text-xs leading-relaxed font-bold italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t-2 border-brand-black/10">
                  <div className="w-10 h-10 rounded-none border-2 border-brand-black bg-brand-orange flex items-center justify-center font-black text-brand-black text-sm shrink-0">
                    {rev.avatar}
                  </div>
                  <div className="text-left leading-tight">
                    <h5 className="text-brand-black font-black text-xs uppercase tracking-tight">{rev.name}</h5>
                    <p className="text-stone-500 text-[9px] font-black uppercase tracking-wider mt-0.5">{rev.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Store Location, Map Card, Transit & Contact Information */}
      <section id="visit" className="py-16 md:py-24 bg-white border-t-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Location Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block font-mono">
                Visit our Center
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-black mb-6 leading-none uppercase tracking-tighter">
                Our Physical Doors are Open Everyday
              </h2>
              <p className="text-brand-black text-sm leading-relaxed mb-8 font-medium">
                Nothing beats meeting our passionate primary tutors, touring our spacious air-conditioned study rooms, and viewing our child-safe rest and meal areas. Come say hello in person!
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-orange text-brand-black border-2 border-brand-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                    <MapPin className="w-5 h-5 stroke-[2px]" />
                  </div>
                  <div className="text-left leading-tight">
                    <h5 className="font-black text-xs text-brand-black uppercase tracking-wide">Our Location</h5>
                    <p className="text-stone-600 text-xs mt-1.5 font-bold leading-relaxed">
                      26, Tingkat Kledang 3, Taman Kledang Sentosa, 31450 Ipoh, Perak, Malaysia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-teal text-white border-2 border-brand-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                    <Clock className="w-5 h-5 stroke-[2px]" />
                  </div>
                  <div className="text-left leading-tight">
                    <h5 className="font-black text-xs text-brand-black uppercase tracking-wide">Center Hours</h5>
                    <p className="text-stone-600 text-xs mt-1.5 font-bold leading-relaxed">
                      Daily : 11.00a.m. - 6.15p.m
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-red text-white border-2 border-brand-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                    <Users className="w-5 h-5 stroke-[2px]" />
                  </div>
                  <div className="text-left leading-tight">
                    <h5 className="font-black text-xs text-brand-black uppercase tracking-wide">Easy Access</h5>
                    <p className="text-stone-600 text-xs mt-1.5 font-bold leading-relaxed">
                      We are situated in the serene <strong>Taman Kledang Sentosa</strong> residential suburb, right near scenic views of Kledang Hill.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Image and Transit Guide */}
            <div className="lg:col-span-7 bg-brand-cream/50 border-3 border-brand-black p-6 md:p-8 rounded-none flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]">
              <div className="text-left">
                <h4 className="font-display font-black text-xl text-brand-black uppercase leading-tight">
                  Find us on Tingkat Kledangb 3
                </h4>
                <p className="text-stone-600 text-xs mt-1.5 font-bold leading-relaxed">
                  Perfect secure parking right outside our storefront, with child-friendly spaces and a calm suburban environment.
                </p>
              </div>

              {/* Real-looking physical map visualizer */}
              <div className="bg-white rounded-none border-2 border-brand-black overflow-hidden relative aspect-video flex flex-col items-center justify-center group shadow-none my-6">
                
                {/* Simulated stylized map styling */}
                <div className="absolute inset-0 bg-[#f4ebd0]/50 p-4 flex flex-col justify-between select-none">
                  {/* Roads representation */}
                  <div className="w-full h-4 bg-white/85 rotate-2 absolute top-10 left-0 border-y-2 border-brand-black flex items-center justify-center">
                    <span className="text-[9px] text-brand-black font-black uppercase tracking-wider">Tingkat Kledangb 3</span>
                  </div>
                  <div className="w-4 h-full bg-white/85 rotate-12 absolute left-1/3 top-0 border-x-2 border-brand-black" />
                  <div className="w-full h-4 bg-white/85 -rotate-3 absolute bottom-12 left-0 border-y-2 border-brand-black flex items-center justify-center">
                    <span className="text-[9px] text-brand-black font-black uppercase tracking-wider">Jalan Kledang Sentosa</span>
                  </div>

                  {/* Kledang Landmark */}
                  <div className="absolute top-4 left-6 bg-[#0055a5] text-white px-2 py-0.5 border border-brand-black font-black text-[9px] shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1">
                    <span>⛰️</span>
                    <span>Kledang Hill view</span>
                  </div>

                  {/* Local Parks */}
                  <div className="absolute right-12 top-6 w-16 h-12 bg-emerald-100 border-2 border-brand-black rounded-none flex items-center justify-center text-[9px] text-brand-black font-black uppercase tracking-tight">
                    🌳 Playground
                  </div>

                  {/* Pin locator in the middle of Tingkat Kledangb 3 */}
                  <div className="absolute top-[35%] left-[45%] flex flex-col items-center z-10 animate-bounce">
                    <div className="bg-brand-red text-white border-2 border-brand-black rounded-none shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] p-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                      <span>🏫</span>
                      <span>Pusat Jagaan Sri Elit</span>
                    </div>
                    <div className="w-3 h-3 bg-brand-red rotate-45 -mt-1.5 border-r-2 border-b-2 border-brand-black" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 border border-brand-black text-[10px] font-black uppercase tracking-wider text-brand-black flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(26,26,26,1)]">
                  <span>🗺️</span>
                  <span>Center Location Coordinates</span>
                </div>
              </div>

              {/* Transit & Contact quick-links */}
              <div className="mt-2 flex flex-wrap gap-4 items-center justify-between pt-6 border-t-2 border-brand-black/10">
                <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                  📍 Street Address: 26, Tingkat Kledang 3, Taman Kledang Sentosa, 31450 Ipoh, Perak
                </span>
                <a
                  href="https://wa.me/60129250328"
                  target="_blank"
                  className="px-4 py-2.5 bg-brand-black hover:bg-brand-orange text-white hover:text-brand-black border-2 border-brand-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Call to Check Space</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Shopping Bag Slide-over drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-brand-black/60 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-screen max-w-md bg-white border-l-3 border-brand-black shadow-2xl flex flex-col justify-between"
              >
                
                {/* Cart Header */}
                <div className="px-6 py-5 bg-brand-cream border-b-3 border-brand-black flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-brand-red stroke-[2.5px]" />
                    <h3 className="text-brand-black text-lg font-black font-display uppercase tracking-tight">
                      Your Selected Programs
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-brand-orange border-2 border-brand-black text-brand-black bg-white shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
                  >
                    <X className="w-5 h-5 stroke-[2.5px]" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center">
                      <span className="text-5xl select-none mb-4 animate-pulse">🎒</span>
                      <h4 className="font-black text-brand-black font-display uppercase tracking-tight">No programs selected!</h4>
                      <p className="text-stone-500 text-xs mt-2 max-w-xs mx-auto font-semibold leading-relaxed">
                        Select SJK core tuition subjects, after-school daycare packages, or interactive enrichment playgroups to get started!
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-6 px-5 py-2.5 bg-brand-red hover:bg-brand-orange border-2 border-brand-black text-white hover:text-brand-black text-xs font-black uppercase tracking-wider cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      >
                        Browse Programs
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Cart List */}
                      <div className="space-y-4 text-left">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-3.5 bg-brand-cream border-2 border-brand-black rounded-none items-center justify-between shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] group"
                          >
                            <div className="flex gap-3 items-center text-left">
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 object-cover border-2 border-brand-black rounded-none bg-stone-200"
                              />
                              <div className="text-left">
                                <h4 className="font-black text-xs text-brand-black uppercase tracking-tight line-clamp-1">{item.name}</h4>
                                <span className="text-[9px] uppercase font-black text-brand-red block mt-0.5">
                                  {item.category === 'daycare' ? 'Daycare' : item.category === 'tuition' ? 'SJK Primary Tuition' : item.category === 'secondary' ? 'SMK Secondary Tuition' : 'Enrichment'}
                                </span>
                                <span className="text-xs font-black text-brand-black block mt-1">RM {item.price}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="p-1.5 text-brand-black border-2 border-brand-black bg-white hover:bg-brand-red hover:text-white rounded-none cursor-pointer shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:shadow-none transition-all"
                              title="Remove item"
                            >
                              <X className="w-4 h-4 stroke-[2.5px]" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Checkout Reservation Form */}
                      <div className="border-t-3 border-brand-black pt-6 mt-8 space-y-4 text-left">
                        <div className="flex items-center gap-1.5 mb-2">
                          <BookmarkCheck className="w-4.5 h-4.5 text-brand-red stroke-[2.5px]" />
                          <h4 className="font-black font-display text-sm text-brand-black uppercase tracking-tight">
                            Complete Enrollment Reservation
                          </h4>
                        </div>

                        <AnimatePresence mode="wait">
                          {!checkoutSuccess ? (
                            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                              <div>
                                <label className="block text-[10px] font-black text-brand-black uppercase tracking-wider mb-1">Your Name</label>
                                <input
                                  type="text"
                                  required
                                  value={checkoutName}
                                  onChange={(e) => setCheckoutName(e.target.value)}
                                  placeholder="e.g., Zarif Khairul"
                                  className="w-full bg-stone-50 border-2 border-brand-black p-2.5 rounded-none text-xs font-bold text-brand-black focus:outline-hidden focus:bg-brand-cream transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-brand-black uppercase tracking-wider mb-1">WhatsApp Number</label>
                                <input
                                  type="tel"
                                  required
                                  value={checkoutPhone}
                                  onChange={(e) => setCheckoutPhone(e.target.value)}
                                  placeholder="e.g., +60 12-345 6789"
                                  className="w-full bg-stone-50 border-2 border-brand-black p-2.5 rounded-none text-xs font-bold text-brand-black focus:outline-hidden focus:bg-brand-cream transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-brand-black uppercase tracking-wider mb-1">Transportation Method</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                  <button
                                    type="button"
                                    onClick={() => setCheckoutMethod('pickup')}
                                    className={`py-2 px-3 border-2 rounded-none text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                                      checkoutMethod === 'pickup'
                                        ? 'bg-brand-red text-white border-brand-black shadow-none translate-x-0.5 translate-y-0.5'
                                        : 'bg-white text-brand-black border-brand-black shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:bg-brand-cream active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                                    }`}
                                  >
                                    🏫 Parent Drop-off
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCheckoutMethod('delivery')}
                                    className={`py-2 px-3 border-2 rounded-none text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                                      checkoutMethod === 'delivery'
                                        ? 'bg-brand-red text-white border-brand-black shadow-none translate-x-0.5 translate-y-0.5'
                                        : 'bg-white text-brand-black border-brand-black shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:bg-brand-cream active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                                    }`}
                                  >
                                    🚌 School Pickup
                                  </button>
                                </div>
                              </div>

                              {checkoutMethod === 'delivery' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <label className="block text-[10px] font-black text-brand-black uppercase tracking-wider mb-1">Child's School Name & Class (Ipoh Area)</label>
                                  <textarea
                                    required={checkoutMethod === 'delivery'}
                                    rows={2}
                                    value={checkoutAddress}
                                    onChange={(e) => setCheckoutAddress(e.target.value)}
                                    placeholder="e.g., SJK(C) Yuk Choy, Class 2M"
                                    className="w-full bg-stone-50 border-2 border-brand-black p-2.5 rounded-none text-xs font-bold text-brand-black focus:outline-hidden focus:bg-brand-cream transition-all resize-none"
                                  />
                                </motion.div>
                              )}

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-brand-teal hover:bg-brand-orange text-white hover:text-brand-black border-2 border-brand-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all mt-4 cursor-pointer"
                              >
                                Submit Registration Reservation
                              </button>
                            </form>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-6 text-left"
                            >
                              <span className="text-4xl block mb-2 select-none animate-bounce">🎉</span>
                              <h5 className="font-black text-sm text-brand-black uppercase">Reservation Successful!</h5>
                              <p className="text-stone-700 text-[11px] font-bold mt-1 leading-relaxed">
                                We've received your registration request! Aisha or our center principal will send WhatsApp details to <strong className="text-brand-black">{checkoutPhone}</strong> shortly to arrange placement assessments.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="px-6 py-5 bg-brand-cream border-t-3 border-brand-black">
                    <div className="flex justify-between items-center text-brand-black font-bold text-xs mb-2 uppercase tracking-wide">
                      <span>Selected Programs</span>
                      <span>{cart.length} items</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-black font-black text-lg font-display uppercase tracking-tight">
                      <span>Grand Total</span>
                      <span>RM {cartTotal}</span>
                    </div>
                    <p className="text-[9px] text-stone-500 font-bold text-left mt-2 leading-tight">
                      *Payment is processed securely at our center register or via direct WhatsApp bank transfer.
                    </p>
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Widget */}
      <ShopAssistant />

      {/* Primary Footer */}
      <footer className="bg-brand-black text-stone-300 py-16 border-t-3 border-brand-black font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
            
            <div className="md:col-span-1">
              <span className="text-3xl block mb-2 select-none">🏫</span>
              <h4 className="font-display font-black text-white text-2xl uppercase tracking-tighter">Pusat Jagaan Sri Elit</h4>
              <span className="text-brand-orange font-black text-[10px] tracking-widest uppercase mt-1 block">Ipoh, Perak</span>
              <p className="text-stone-400 text-xs leading-relaxed mt-4 font-semibold">
                Providing premium SJK primary after-school daycare, syllabus tuition (Std 1 to 6), and interactive sensory learning to support parents in Ipoh, Perak.
              </p>
            </div>

            <div>
              <h5 className="text-white font-black text-xs uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-orange/40 inline-block">Quick Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#collections" className="hover:text-brand-orange transition-colors font-bold">Academic Catalog</a></li>
                <li><a href="#gift-quiz" className="hover:text-brand-orange transition-colors font-bold">Program Finder Wizard</a></li>
                <li><a href="#community" className="hover:text-brand-orange transition-colors font-bold">Sensory Playgroups</a></li>
                <li><a href="#visit" className="hover:text-brand-orange transition-colors font-bold">Visit our Ipoh Center</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black text-xs uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-orange/40 inline-block">Contact & Inquiries</h5>
              <ul className="space-y-2 text-xs font-bold text-stone-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>+6012-925 0328 (WhatsApp)</span>
                </li>
                <li>Email: pusatjagaansrielit@gmail.com</li>
                <li>Address: 26, Tingkat Kledang 3, Taman Kledang Sentosa, 31450 Ipoh, Perak</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black text-xs uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-orange/40 inline-block">Neighborhood Highlights</h5>
              <p className="text-stone-400 text-xs leading-relaxed font-semibold">
                Taman Kledang Sentosa is a vibrant, serene residential township in Ipoh, Perak, nestled near the scenic Kledang Hill, known for close-knit supportive families and supportive community. Come say hello!
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-bold gap-4">
            <p>© 2026 Pusat Jagaan Sri Elit (Ipoh, Perak). All rights reserved.</p>
            <p>Made with organic love for the local Ipoh parent community.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
