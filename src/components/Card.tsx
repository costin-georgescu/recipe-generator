import { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  items: string[];
  type: 'ingredients' | 'instructions';
}

const Card = ({ title, icon, items, type }: CardProps) => {
  const isEmpty = items.length === 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300 h-full w-full min-h-[400px]">
      <div className="flex items-center space-x-2 mb-4 relative z-10">
        {icon}
        <h3 className="text-lg font-medium text-warmstone-900">{title}</h3>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center h-[300px] text-warmstone-500 text-sm italic">
          Sorry, no recipe available. Please try a different search.
        </div>
      ) : type === 'ingredients' ? (
        <ul className="space-y-2.5 relative z-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 animate-slide-in text-sm border-b border-warmstone-200/30 pb-2 last:border-b-0"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="space-y-3 relative z-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 animate-slide-in text-sm border-b border-warmstone-200/30 pb-2 last:border-b-0"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="w-5 h-5 flex-shrink-0 rounded-full bg-emerald-500/80 text-white flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Card;
