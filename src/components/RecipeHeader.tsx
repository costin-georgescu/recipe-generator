import { Clock, GaugeCircle } from 'lucide-react';

interface RecipeHeaderProps {
  title: string;
  cookingTime: string;
  difficulty: string;
}

const RecipeHeader = ({
  title,
  cookingTime,
  difficulty,
}: RecipeHeaderProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl sm:text-3xl font-medium text-warmstone-900 mb-3">
        {title}
      </h2>
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
          <span className="text-warmstone-700">{cookingTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <GaugeCircle className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
          <span className="text-warmstone-700">{difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
