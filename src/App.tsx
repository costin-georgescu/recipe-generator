import React, { useState, KeyboardEvent } from "react";
import {
  ChefHat,
  Loader2,
  UtensilsCrossed,
  Clock,
  GaugeCircle,
  Sparkles,
  Brain,
  Lightbulb,
} from "lucide-react";
import aiRecipeService from './services/aiRecipeService';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
}

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [generatedRecipe, setGeneratedRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedRecipe('');

    try {
      const recipe = await aiRecipeService.generateRecipe(ingredients);
      setGeneratedRecipe(recipe);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      setIsMultiline(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.join(', ').trim()) return;

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
          "Salt and pepper",
        ],
        instructions: [
          "Heat olive oil in a large pan over medium heat",
          "Add chopped vegetables and sauté until tender",
          "Cook pasta according to package instructions",
          "Combine pasta with vegetables and toss with herbs",
          "Season with salt and pepper to taste",
          "Serve hot with grated parmesan cheese",
        ],
        cookingTime: "25 minutes",
        difficulty: "Easy",
      });
      setIsLoading(false);
      setIngredients([]);
      setIsMultiline(false);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-warmgray-50 via-warmgray-100 to-warmgray-200 p-4 sm:p-8 font-sans text-warmstone-800 flex flex-col items-center justify-center transition-all duration-700 ease-in-out`}
    >
      <div
        className={`flex-grow flex flex-col max-w-5xl w-full space-y-4 transition-all duration-700 ease-in-out ${
          recipe
            ? "justify-center transform translate-y-[-10vh]"
            : "justify-center"
        }`}
      >
        {/* Header */}
        <div
          className={`flex flex-col items-center justify-center mb-4 sm:mb-6 transition-transform duration-700 ease-in-out ${
            recipe ? "transform -translate-y-4" : ""
          }`}
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-warmgray-100 to-warmgray-200 border border-warmgray-200/50 shadow-md">
              <Lightbulb
                className="w-7 h-7 sm:w-8 sm:h-8 text-warmstone-700"
                strokeWidth={1.5}
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
            <span>AI-Powered Culinary Creativity</span>
          </p>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-700 ease-in-out ${
            recipe
              ? "scale-95 opacity-90 hover:opacity-100 transform -translate-y-4"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="relative flex items-center max-w-2xl mx-auto">
            <textarea
              value={ingredients.join(', ')}
              onChange={(e) => setIngredients(e.target.value.split(', '))}
              onKeyDown={handleKeyDown}
              placeholder="Enter your ingredients (e.g., chicken, rice, tomatoes...)"
              rows={isMultiline ? 3 : 1}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-warmstone-300/50 bg-white shadow-sm focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-200 resize-none text-warmstone-800 placeholder-warmstone-400/60 text-sm sm:text-base overflow-hidden hover:shadow-md"
            />
            <button
              type="submit"
              disabled={isLoading || !ingredients.join(', ').trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 transform rounded-lg bg-emerald-600/90 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ChefHat
                  className="w-5 h-5 group-hover:rotate-6 transition-transform"
                  strokeWidth={1.5}
                />
              )}
            </button>
          </div>
          <p className="text-center mt-2 text-warmstone-500 text-xs flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-emerald-500" strokeWidth={1.5} />
            <span>Press Shift + Enter for multiple lines</span>
            <Sparkles className="w-3 h-3 text-emerald-500" strokeWidth={1.5} />
          </p>
        </form>

        {/* Recipe Result */}
        {recipe && (
          <div className="animate-fade-in space-y-6 transition-all duration-700 ease-in-out transform translate-y-4">
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
              <div className="bg-[#fafaf5] rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[size:30px_30px] opacity-10 pointer-events-none"></div>
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
              <div className="bg-[#fafaf5] rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[size:30px_30px] opacity-10 pointer-events-none"></div>
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
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Recipe Generator</h1>
          <div className="mb-4 flex">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Enter an ingredient"
              className="flex-grow p-2 border rounded-l"
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            />
            <button 
              onClick={addIngredient}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {ingredients.map(ingredient => (
                <span 
                  key={ingredient} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
                >
                  {ingredient}
                  <button 
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={generateRecipe}
            disabled={isLoading}
            className={`w-full p-3 rounded ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {generatedRecipe && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Generated Recipe</h2>
              <pre className="whitespace-pre-wrap">{generatedRecipe}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
