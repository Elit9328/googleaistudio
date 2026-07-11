import { Toy } from '../data/toys';
import { Star, BookmarkCheck, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  toy: Toy;
  onAddToCart: (toy: Toy) => void;
  isAdded: boolean;
}

export default function ProductCard({ toy, onAddToCart, isAdded }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map category to a strong flat accent color
  const getCategoryTheme = () => {
    switch (toy.category) {
      case 'daycare':
        return { text: 'text-brand-dark', bg: 'bg-brand-orange', border: 'border-brand-black' };
      case 'tuition':
        return { text: 'text-brand-black', bg: 'bg-brand-teal', border: 'border-brand-black' };
      case 'secondary':
        return { text: 'text-white', bg: 'bg-brand-black', border: 'border-brand-black' };
      default:
        return { text: 'text-brand-red', bg: 'bg-brand-red', border: 'border-brand-black' };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div
      id={`toy-card-${toy.id}`}
      className="bg-white border-3 border-brand-black shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badge */}
      <div className="relative aspect-4/3 w-full bg-brand-cream overflow-hidden border-b-3 border-brand-black">
        <img
          src={toy.image}
          alt={toy.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        {/* Age Label Badge */}
        <span className="absolute top-3 left-3 bg-brand-cream text-brand-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
          {toy.ageLabel}
        </span>
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-brand-orange text-brand-black text-[11px] font-black px-2.5 py-1 border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-brand-black stroke-brand-black" />
          <span>{toy.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category Tag */}
          <span className="text-xs uppercase tracking-wider font-black text-brand-red block text-left mb-1">
            {toy.category === 'daycare' && '🍲 After-School Daycare'}
            {toy.category === 'tuition' && '📚 SJK Primary Tuition'}
            {toy.category === 'secondary' && '🎓 SMK Secondary Tuition'}
            {toy.category === 'holiday' && '🎨 Sensory & Booster Camps'}
          </span>
          
          {/* Product Name */}
          <h3 className="text-brand-black text-xl font-black font-display tracking-tight uppercase leading-tight text-left mt-1 mb-2 group-hover:text-brand-red transition-colors">
            {toy.name}
          </h3>
          
          {/* Product Description */}
          <p className="text-stone-600 text-xs leading-relaxed text-left line-clamp-2 mb-4 font-medium">
            {toy.description}
          </p>

          {/* Bullet features */}
          <ul className="space-y-1.5 mb-5 hidden sm:block text-left">
            {toy.features.slice(0, 2).map((feat, i) => (
              <li key={i} className="text-[11px] text-brand-black font-bold flex items-center gap-2">
                <span className="w-4 h-4 bg-brand-teal border border-brand-black flex items-center justify-center text-[8px] text-white shrink-0">✓</span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Add to Bag Row */}
        <div className="pt-4 border-t-2 border-brand-black/10 flex items-center justify-between mt-auto">
          <div className="text-left">
            <span className="text-stone-500 text-[9px] block font-black uppercase tracking-widest">Monthly Fee</span>
            <span className="text-2xl font-black text-brand-black font-display tracking-tight">
              RM {toy.price}
            </span>
          </div>

          <button
            id={`add-btn-${toy.id}`}
            onClick={() => onAddToCart(toy)}
            className={`px-4 py-3 border-2 border-brand-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] ${
              isAdded 
                ? 'bg-brand-teal text-white' 
                : 'bg-brand-cream text-brand-black hover:bg-brand-orange'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>Selected!</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>Select Program</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
