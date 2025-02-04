import React, { useState, KeyboardEvent } from 'react';
import { ChefHat, Loader2, UtensilsCrossed, Send, Clock, GaugeCircle } from 'lucide-react';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
}

function App() {
  const [ingredients, setIngredients] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Enter' && e.shiftKey) {
      setIsMultiline(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    
    setIsLoading(true);
    
    // Simulated API call
    setTimeout(() => {
      setRecipe({
        title: "Delicious Pasta Primavera",
        ingredients: [
          "2 cups mixed vegetables",
          "8 oz pasta",
          "3 tbsp olive oil",
          "2 cloves garlic",
          "Fresh herbs",
          "Salt and pepper"
        ],
        instructions: [
          "Heat olive oil in a large pan over medium heat",
          "Add chopped vegetables and sauté until tender",
          "Cook pasta according to package instructions",
          "Combine pasta with vegetables and toss with herbs",
          "Season with salt and pepper to taste",
          "Serve hot with grated parmesan cheese"
        ],
        cookingTime: "25 minutes",
        difficulty: "Easy"
      });
      setIsLoading(false);
      setIngredients('');
      setIsMultiline(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-400/10 to-cyan-400/10 border border-teal-500/10">
              <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-teal-300" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Recipe<span className="text-teal-300">AI</span>
            </h1>
          </div>
          <p className="text-teal-200/70 text-sm sm:text-base font-light">Transform your ingredients into delicious recipes</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your ingredients (e.g., chicken, rice, tomatoes...)"
              rows={isMultiline ? 3 : 1}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-teal-500/20 bg-white/5 backdrop-blur-sm focus:border-teal-300/50 focus:ring-1 focus:ring-teal-300/25 transition-all duration-200 resize-none text-white placeholder-teal-300/40 text-sm sm:text-base overflow-hidden"
            />
            <button
              type="submit"
              disabled={isLoading || !ingredients.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-teal-500/80 text-white hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 backdrop-blur-sm"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
          <p className="text-center mt-2 text-teal-200/50 text-xs">
            Press Shift + Enter for multiple lines
          </p>
        </form>

        {/* Recipe Result */}
        {recipe && (
          <div className="animate-fade-in space-y-8">
            {/* Recipe Header */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-medium text-white mb-3">{recipe.title}</h2>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-teal-300" strokeWidth={1.5} />
                  <span className="text-teal-200/90">{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GaugeCircle className="w-4 h-4 text-teal-300" strokeWidth={1.5} />
                  <span className="text-teal-200/90">{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredients Column */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-teal-500/10 hover:border-teal-500/20 transition-colors duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-teal-300" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-white">Ingredients</h3>
                </div>
                <ul className="space-y-2.5">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 animate-slide-in text-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80" />
                      <span className="text-teal-100/90">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Column */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-teal-500/10 hover:border-teal-500/20 transition-colors duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <ChefHat className="w-5 h-5 text-teal-300" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-white">Instructions</h3>
                </div>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 animate-slide-in text-sm"
                      style={{ animationDelay: `${(index + recipe.ingredients.length) * 100}ms` }}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-teal-500/20 text-teal-200/90 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span className="text-teal-100/90 leading-relaxed">{instruction}</span>
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