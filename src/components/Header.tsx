import { Soup, Brain } from "lucide-react";

interface HeaderProps {
  recipe?: boolean;
}

const Header = ({ recipe = false }: HeaderProps) => {
  return (
    <div
      className={`flex flex-col items-center transition-transform duration-700 ease-in-out ${
        recipe ? "transform -translate-y-2" : ""
      }`}
    >
      <div className="flex items-center justify-center space-x-3 mb-3">
        <div className="p-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
          <Soup
            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
            strokeWidth={1.75}
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-warmstone-900">
          Recipe<span className="text-emerald-700">Genius</span>
          <sup className="text-xs bg-emerald-600 text-white rounded-full px-2 py-0.5 ml-2 align-top">
            AI
          </sup>
        </h1>
      </div>
      <p className="text-warmstone-600 text-sm sm:text-base font-light flex items-center space-x-2 justify-center">
        <Brain className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
        <span className="font-semibold">AI-Powered Culinary Creativity</span>
      </p>
    </div>
  );
};

export default Header;
