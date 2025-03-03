import {
  ChefHat,
  Loader2,
  UtensilsCrossed,
  Clock,
  GaugeCircle,
} from "lucide-react";
import "./styles/animations.css";
import "./styles/background.css";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import useRecipeStore from "./stores/recipeStore";



function App() {
  const { recipe, isLoading } = useRecipeStore();

  return (
    <div
      className={`min-h-screen bg-pattern p-4 sm:p-8 font-sans text-warmstone-800 overflow-x-hidden ${
        recipe ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl flex flex-col transition-all duration-700 ease-in-out ${
          recipe
            ? "space-y-8 pt-4"
            : "min-h-[calc(100vh-4rem)] justify-center items-center space-y-8"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Input Form */}
        <SearchField />

        <div>
          {isLoading && (
            <div className="mb-4 p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm flex items-center justify-center space-x-3 animate-pulse rounded-lg">
              <Loader2 className="w-5 h-5 text-emerald-600" strokeWidth={2} />
              <span className="text-emerald-800 font-medium">
                Crafting your recipe...
              </span>
            </div>
          )}
        </div>

        {/* Recipe Result */}
        {recipe && (
          <div className="w-full animate-fade-in space-y-6 transition-all duration-700 ease-in-out">
            {/* Recipe Header */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-medium text-warmstone-900 mb-3">
                {recipe.title}
              </h2>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock
                    className="w-4 h-4 text-emerald-600"
                    strokeWidth={1.5}
                  />
                  <span className="text-warmstone-700">
                    {recipe.cookingTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <GaugeCircle
                    className="w-4 h-4 text-emerald-600"
                    strokeWidth={1.5}
                  />
                  <span className="text-warmstone-700">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredients Column */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-4 relative z-10">
                  <UtensilsCrossed
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-lg font-medium text-warmstone-900">
                    Ingredients
                  </h3>
                </div>
                <ul className="space-y-2.5 relative z-10">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 animate-slide-in text-sm border-b border-warmstone-200/30 pb-2 last:border-b-0"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Column */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-4 relative z-10">
                  <ChefHat
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-lg font-medium text-warmstone-900">
                    Instructions
                  </h3>
                </div>
                <ol className="space-y-3 relative z-10">
                  {recipe.instructions.map((instruction, index) => (
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
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
