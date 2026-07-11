export interface Toy {
  id: string;
  name: string;
  category: 'daycare' | 'tuition' | 'secondary' | 'holiday';
  price: number;
  description: string;
  image: string;
  ageRange: 'std1_3' | 'std4_6' | 'form1_3' | 'form4_5' | 'all';
  ageLabel: string;
  interest: 'daycare' | 'academic' | 'secondary' | 'creative';
  rating: number;
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    icon: string;
    description?: string;
  }[];
}

export const TOY_CATEGORIES = [
  {
    id: 'daycare',
    name: 'Daycare & Homework Club',
    description: 'Complete primary school supervision including SJK(C) / SK transport pickups, hot nutritious meals, warm showers, and spelling supervision (Ting Xie/Ejaan).',
    image: '/src/assets/images/daycare_study_1783737368795.jpg',
    color: 'bg-amber-100/60 border-amber-200 text-amber-800'
  },
  {
    id: 'tuition',
    name: 'Primary SJK / SK Tuition',
    description: 'Comprehensive KSSR-aligned syllabus tutoring for Standard 1 to Standard 6 SJK(C), SJK(T), and SK. Focused on UASA examination preparation.',
    image: '/src/assets/images/primary_tuition_1783737382677.jpg',
    color: 'bg-emerald-100/60 border-emerald-200 text-emerald-800'
  },
  {
    id: 'secondary',
    name: 'Secondary SMK Tuition',
    description: 'KSSM-aligned school syllabus tutoring for Form 1 to Form 5. Specialized SPM exam-target strategies for Core, Science, and Arts streams.',
    image: '/src/assets/images/secondary_tuition_1783737396294.jpg',
    color: 'bg-sky-100/60 border-sky-200 text-sky-800'
  },
  {
    id: 'holiday',
    name: 'Sensory & Booster Bootcamps',
    description: 'Active weekends and holiday workshops featuring Chinese/BM vocabulary builders, Tatabahasa, and fun interactive public speaking programs.',
    image: '/src/assets/images/sensory_camp_1783737410115.jpg',
    color: 'bg-rose-100/60 border-rose-200 text-rose-800'
  }
];

export const TOYS_DATA: Toy[] = [
  {
    id: 'd1',
    name: 'Comprehensive After-School Daycare (SJK/SK)',
    category: 'daycare',
    price: 450,
    description: 'The ultimate care and homework support package. Includes secure transport pickup from local Ipoh SJK(C) schools, home-cooked balanced hot lunch, refreshing showers, and experienced spelling (Ejaan/Ting Xie) drills.',
    image: '/src/assets/images/daycare_study_1783737368795.jpg',
    ageRange: 'all',
    ageLabel: 'Standard 1 to 6',
    interest: 'daycare',
    rating: 5.0,
    features: ['SJK(C) school transit option', 'Freshly cooked nutritious hot lunch', 'Daily spelling spelling-check (BM & BC)']
  },
  {
    id: 'd2',
    name: 'Transit Homework Club & Reading Package',
    category: 'daycare',
    price: 320,
    description: 'Daily school-transit supervision and reading companion hours. Focuses on completing school homework correctly and clarifying doubts with primary school experts before parent pickup.',
    image: '/src/assets/images/daycare_study_1783737368795.jpg',
    ageRange: 'all',
    ageLabel: 'Standard 1 to 6',
    interest: 'daycare',
    rating: 4.8,
    features: ['Guided homework correction', 'Trilingual reading library access', 'Healthy afternoon snacks included']
  },
  {
    id: 't1',
    name: 'KSSR Lower Primary Tuition (Std 1-3)',
    category: 'tuition',
    price: 180,
    description: 'Aligned standard coaching designed for SJK(C), SJK(T), and national SK lower primary. Special focus on early Chinese character stroke-order, Bahasa Melayu grammar basics, and essential Matematik operations.',
    image: '/src/assets/images/primary_tuition_1783737382677.jpg',
    ageRange: 'std1_3',
    ageLabel: 'Standard 1 to 3',
    interest: 'academic',
    rating: 4.9,
    features: ['Mandarin writing boosters', 'Weekly vocabulary tests', 'Small groups of max 10 students']
  },
  {
    id: 't2',
    name: 'KSSR Upper Primary Tuition (Std 4-6)',
    category: 'tuition',
    price: 240,
    description: 'Rigorous exam preparation aligned with Malaysia’s official UASA (Ujian Akhir Sesi Akademik) format. Focuses on Bahasa Melayu Penulisan essay writing, Matematik problem-solving, and Sains test structures.',
    image: '/src/assets/images/primary_tuition_1783737382677.jpg',
    ageRange: 'std4_6',
    ageLabel: 'Standard 4 to 6',
    interest: 'academic',
    rating: 4.9,
    features: ['UASA mock exam paper drills', 'Step-by-step problem-solving tips', 'Qualified SJK school subject experts']
  },
  {
    id: 's1',
    name: 'KSSM Lower Secondary Tuition (Form 1-3)',
    category: 'secondary',
    price: 260,
    description: 'Comprehensive tuition focusing on secondary school adaptation and preparation for Form 3 UASA examinations. Covers core subjects: Bahasa Melayu, English, Mathematics, Science, and Sejarah (History).',
    image: '/src/assets/images/secondary_tuition_1783737396294.jpg',
    ageRange: 'form1_3',
    ageLabel: 'Form 1 to 3',
    interest: 'secondary',
    rating: 4.8,
    features: ['Sejarah memory mapping techniques', 'English essay and grammar focus', 'UASA-aligned test strategies']
  },
  {
    id: 's2',
    name: 'SPM Core Target Tuition (Form 4 & 5)',
    category: 'secondary',
    price: 300,
    description: 'Intensive coaching for the core Sijil Pelajaran Malaysia (SPM) papers. High-frequency target topic analysis for Sejarah Paper 2, Bahasa Melayu essay structure (Karangan), and CEFR English writing.',
    image: '/src/assets/images/secondary_tuition_1783737396294.jpg',
    ageRange: 'form4_5',
    ageLabel: 'Form 4 & 5',
    interest: 'secondary',
    rating: 4.9,
    features: ['SPM forecast paper drills', 'Detailed marking scheme insights', 'Experienced SPM exam examiners']
  },
  {
    id: 's3',
    name: 'SPM Pure Science Stream Electives',
    category: 'secondary',
    price: 350,
    description: 'Premium coaching for pure science electives including Additional Mathematics (Add Math), Physics, Chemistry, and Biology. Direct practice on Paper 3 practical test and Paper 2 essay answers.',
    image: '/src/assets/images/secondary_tuition_1783737396294.jpg',
    ageRange: 'form4_5',
    ageLabel: 'Form 4 & 5',
    interest: 'secondary',
    rating: 5.0,
    features: ['Add Math step formula sheets', 'Physics & Chemistry conceptual mapping', 'A-grade essay strategies']
  },
  {
    id: 'h1',
    name: 'BM Tatabahasa & Chinese Vocabulary Booster',
    category: 'holiday',
    price: 120,
    description: 'A signature vocabulary and grammar booster workshop focusing on rapid spelling, high-frequency characters, and fluid sentence structures for SJK primary schoolers.',
    image: '/src/assets/images/sensory_camp_1783737410115.jpg',
    ageRange: 'all',
    ageLabel: 'Standard 1 to 6',
    interest: 'creative',
    rating: 4.8,
    features: ['Interactive vocabulary games', 'Speed grammar challenges', 'Physical certificates included']
  },
  {
    id: 'h2',
    name: 'Sensory Public Speaking & English Confidence',
    category: 'holiday',
    price: 100,
    description: 'Weekly interactive hands-on weekend sensory programs designed to build strong speech confidence in English and Mandarin. Ideal for early verbal development and expression.',
    image: '/src/assets/images/sensory_camp_1783737410115.jpg',
    ageRange: 'std1_3',
    ageLabel: 'Standard 1 to 3',
    interest: 'creative',
    rating: 4.9,
    features: ['Interactive storytelling exercises', 'Small cozy coaching ratios', 'Improves presentation skills']
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    name: 'Sarah Mohamed',
    location: 'Taman Kledang Sentosa, Ipoh',
    rating: 5,
    date: '3 days ago',
    comment: 'The absolute best academic daycare in Ipoh! My daughter’s SJK(C) Yuk Choy Mandarin spelling and BM grammar improved dramatically. They provide secure transit from school and delicious hot lunches too.',
    avatar: 'SM'
  },
  {
    id: 'r2',
    name: 'Zarif Khairul',
    location: 'Menglembu, Ipoh',
    rating: 5,
    date: '2 weeks ago',
    comment: "Excellent SPM prep center. My son attends Form 5 pure science tuition here (Add Math & Physics). The classes are small and clear, his grades moved from D to solid A in the mid-term exams!",
    avatar: 'ZK'
  },
  {
    id: 'r3',
    name: 'Michelle Tan',
    location: 'Kledang Hill Area, Ipoh',
    rating: 5,
    date: '1 month ago',
    comment: 'Pusat Jagaan Sri Elit is a lifesaver for working parents. Knowing my daughter is picked up safely from school, fed, showered, and has her homework checked perfectly is worth every single ringgit.',
    avatar: 'MT'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'age',
    text: "Which grade or academic level is your child in?",
    options: [
      { label: "Lower Primary", value: "std1_3", icon: "✏️", description: "Standard 1 to Standard 3" },
      { label: "Upper Primary", value: "std4_6", icon: "📐", description: "Standard 4 to Standard 6 (UASA preparation)" },
      { label: "Lower Secondary", value: "form1_3", icon: "📚", description: "Form 1 to Form 3 (UASA transition)" },
      { label: "Upper Secondary / SPM", value: "form4_5", icon: "🎓", description: "Form 4 & Form 5 (Sijil Pelajaran Malaysia)" }
    ]
  },
  {
    id: 'interest',
    text: "What is your primary academic or care need?",
    options: [
      { label: "Primary Daycare & Transit", value: "daycare", icon: "🍲", description: "Pickups, hot meals, bathing & homework help" },
      { label: "Primary KSSR Syllabus Tuition", value: "academic", icon: "📚", description: "SJK(C) / SK Core subjects & UASA drills" },
      { label: "Secondary KSSM / SPM tuition", value: "secondary", icon: "🎓", description: "Core SPM subjects or Pure Sciences" },
      { label: "Booster Workshops", value: "creative", icon: "🗣️", description: "Spelling, grammar, public speaking" }
    ]
  },
  {
    id: 'budget',
    text: "Select a comfortable monthly budget range:",
    options: [
      { label: "Enrichment Modules", value: "budget_low", icon: "⭐", description: "Under RM 150 / month" },
      { label: "Core Syllabus Classes", value: "budget_mid", icon: "🎁", description: "RM 150 - RM 300 / month" },
      { label: "Full Daycare or Science streams", value: "budget_high", icon: "👑", description: "RM 300 / month and above" }
    ]
  }
];
