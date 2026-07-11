import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'aisha' | 'user';
  text: string;
  timestamp: Date;
  actions?: { label: string; actionKey: string }[];
}

export default function ShopAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'g1',
          sender: 'aisha',
          text: "Hi there! 🏫 I'm Aisha, your Pusat Jagaan Sri Elit academic coordinator. Welcome to our virtual center! How can I help you find the right tutoring or daycare program for your child today?",
          timestamp: new Date(),
          actions: [
            { label: '📍 Where is your center?', actionKey: 'location' },
            { label: '📚 Tutoring & Daycare fees', actionKey: 'fees' },
            { label: '🗣️ Sensory Playgroups & Camps', actionKey: 'playgroup' },
            { label: '✏️ Program Finder Quiz', actionKey: 'quiz' }
          ]
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleActionClick = (actionKey: string, label: string) => {
    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: label,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate AI thinking & reply
    setTimeout(() => {
      let replyText = '';
      let actions: { label: string; actionKey: string }[] | undefined = undefined;

      switch (actionKey) {
        case 'location':
          replyText = "We are located at Pusat Jagaan Sri Elit, #26, Tingkat Kledangb 3, Taman Kledang Sentosa, 31450 Ipoh, Perak. 📍 We are situated near the scenic Kledang Hill, so stop by for a physical assessment and tour! We have bright, air-conditioned study rooms and quiet spaces.";
          actions = [
            { label: '🕒 Center hours', actionKey: 'hours' },
            { label: '💬 Register for center tour', actionKey: 'register' }
          ];
          break;
        case 'fees':
          replyText = "We offer flexible tuition and daycare supervision packages! 🎒 Our Standard Lower Primary (Std 1-3) tuition is RM 180/month, Upper Primary (Std 4-6) tuition is RM 240/month, and comprehensive full-day Daycare with hot meals is RM 450/month.";
          actions = [
            { label: '📚 Explore Programs', actionKey: 'browse' }
          ];
          break;
        case 'playgroup':
          replyText = "Every weekend morning, we host our signature interactive Sensory Playgroups and school holiday enrichment workshops at our Kledang Sentosa center. It's designed to build verbal confidence, motor coordination, and STEM curiosity! 🎨 Slots are limited to 10 students.";
          actions = [
            { label: '✨ Register student', actionKey: 'register' },
            { label: '📞 WhatsApp manager', actionKey: 'whatsapp_direct' }
          ];
          break;
        case 'quiz':
          replyText = "Finding the right SJK-aligned academic coaching is our priority! 📚 You can try our smart 'Program Finder Quiz' on this page, or tell me here: What standard is your child in, and what are your primary enrollment needs?";
          break;
        case 'hours':
          replyText = "Our daycare and tuition center is open Monday to Friday from 12:00 PM to 8:00 PM, and Saturday morning from 9:00 AM to 1:00 PM for special workshops. We follow the school calendar!";
          break;
        case 'register':
          replyText = "How wonderful! To schedule a center tour, academic diagnostic trial, or reserve a slot in our sensory playgroups, please leave your name and contact details here, or use our contact form below. I will reach out to you immediately!";
          break;
        case 'whatsapp_direct':
          replyText = "You can directly connect with our center principal via WhatsApp at +6012-925 0328 for prompt assistance on SJK syllabus alignment or specific student attention needs.";
          break;
        default:
          replyText = "I'm always here to help. Feel free to explore our SJK tuition programs, after-school daycare supervision, and creative enrichment classes! Let me know if you have any questions.";
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'aisha',
        text: replyText,
        timestamp: new Date(),
        actions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // AI Semantic Parsing logic
    setTimeout(() => {
      let replyText = '';
      const textLower = userText.toLowerCase();

      if (textLower.includes('location') || textLower.includes('address') || textLower.includes('where') || textLower.includes('find') || textLower.includes('map')) {
        replyText = "You can find us at #26, Tingkat Kledangb 3, Taman Kledang Sentosa, 31450 Ipoh, Perak! 📍 We're near the tranquil Kledang Hill. Stop by for a free tour!";
      } else if (textLower.includes('fee') || textLower.includes('price') || textLower.includes('cost') || textLower.includes('tuition') || textLower.includes('daycare')) {
        replyText = "Our fees are highly affordable! 🎒 Primary tuition ranges from RM 180 to RM 240 depending on the standard. Full after-school daycare is RM 450/month, and half-day supervision is RM 320/month. No hidden charges!";
      } else if (textLower.includes('playgroup') || textLower.includes('saturday') || textLower.includes('camp') || textLower.includes('holiday') || textLower.includes('event')) {
        replyText = "We hold regular weekend sensory playgroups and school break enrichment masterclasses (like BM/Chinese writing booster camps). These are great for building academic confidence and soft skills!";
      } else if (textLower.includes('syllabus') || textLower.includes('sjk') || textLower.includes('chinese') || textLower.includes('school')) {
        replyText = "We are highly specialized in the SJK(C), SJK(T), and national SK school syllabus! Our coaching covers standard-aligned Chinese, Bahasa Melayu, English, Mathematics, and Science subjects with experienced tutors.";
      } else if (textLower.includes('discount') || textLower.includes('sale') || textLower.includes('promo') || textLower.includes('cheap')) {
        replyText = "We have a special neighborhood promotion! 🌟 Use code **SRIELITLOVE** when you enroll your child to receive RM 50 off your first month's enrollment fee!";
      } else if (textLower.includes('phone') || textLower.includes('contact') || textLower.includes('call') || textLower.includes('whatsapp')) {
        replyText = "You can call or WhatsApp our center principal directly at +6012-925 0328. We look forward to talking to you!";
      } else {
        replyText = "That sounds wonderful! As Ipoh's premier SJK-aligned tuition and daycare center, we focus on safe care and absolute academic excellence. Please come visit us at Taman Kledang Sentosa to see our center facilities up close!";
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'aisha',
        text: replyText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div id="shop-assistant-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="bg-white border-3 border-brand-black shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] w-[350px] sm:w-[380px] h-[500px] flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-brand-dark px-5 py-4 flex items-center justify-between text-white border-b-3 border-brand-black">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-brand-cream rounded-none flex items-center justify-center font-bold text-lg border-2 border-brand-black select-none">
                    🏫
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-brand-black rounded-full" />
                </div>
                <div>
                  <h4 className="font-black font-display text-sm tracking-tight uppercase leading-tight">Aisha</h4>
                  <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-orange fill-brand-orange" />
                    <span>Academic Coordinator • Online</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-none border-2 border-transparent hover:border-brand-black transition-all cursor-pointer text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body (Messages) */}
            <div className="flex-1 overflow-y-auto p-4 bg-brand-cream/35 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%] items-end">
                    {msg.sender === 'aisha' && (
                      <div className="w-7 h-7 bg-brand-orange border border-brand-black flex items-center justify-center text-xs select-none shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] shrink-0">
                        👩‍🏫
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div
                        className={`p-3.5 border-2 border-brand-black text-xs leading-relaxed font-bold ${
                          msg.sender === 'user'
                            ? 'bg-brand-black text-white rounded-br-none shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                            : 'bg-white text-brand-black border-2 border-brand-black rounded-bl-none shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Interactive Buttons under message */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.actions.map((act) => (
                            <button
                              key={act.actionKey}
                              onClick={() => handleActionClick(act.actionKey, act.label)}
                              className="text-[10px] font-black uppercase tracking-wider text-brand-black bg-white hover:bg-brand-orange border-2 border-brand-black px-2.5 py-1.5 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] items-center">
                    <div className="w-7 h-7 bg-brand-orange border border-brand-black flex items-center justify-center text-xs select-none">
                      👩‍🏫
                    </div>
                    <div className="bg-white border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] px-4 py-2.5 rounded-bl-none flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleCustomSubmit} className="p-3 border-t-3 border-brand-black bg-white flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Aisha about daycare & tuition..."
                className="flex-1 bg-brand-cream/50 border-2 border-brand-black px-3 py-2 text-xs font-bold focus:outline-hidden focus:bg-brand-cream transition-colors text-brand-black placeholder-stone-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-brand-red hover:bg-brand-orange text-white border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Trigger */}
      <button
        id="shop-assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-red hover:bg-brand-orange text-white border-3 border-brand-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 stroke-[3px]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 stroke-[2.5px]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-orange rounded-full border-2 border-brand-black animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text tooltip */}
        {!isOpen && (
          <span className="absolute right-18 top-1/2 -translate-y-1/2 bg-brand-black text-white text-[10px] font-black tracking-wider uppercase px-3 py-2 border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Chat with Aisha 🏫
          </span>
        )}
      </button>
    </div>
  );
}
