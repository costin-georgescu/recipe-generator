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
import aiRecipeService from "./services/aiRecipeService";
import "./styles/animations.css";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
}

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recipeText = await aiRecipeService.generateRecipe(ingredients);

      const parsedRecipe = parseRecipeText(recipeText);
      setRecipe(parsedRecipe);
      setIsLoading(false);
      setIngredients([]);
      setIsMultiline(false);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.join(", ").trim()) return;
    await generateRecipe();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      setIsMultiline(true);
    }
  };

  const parseRecipeText = (text: string): Recipe => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let title = "";
    let cookingTime = "25 minutes";
    let difficulty = "Medium";
    let ingredients: string[] = [];
    let instructions: string[] = [];
    let currentSection = "";

    for (const line of lines) {
      // Parse title
      if (line.toLowerCase().includes("recipe name:")) {
        title = line.split(":")[1]?.trim() || "Custom Recipe";
        continue;
      }

      // Parse cooking time
      if (line.toLowerCase().includes("cooking time:")) {
        cookingTime = line.split(":")[1]?.trim() || "25 minutes";
        continue;
      }

      // Parse difficulty
      if (line.toLowerCase().includes("difficulty:")) {
        difficulty = line.split(":")[1]?.trim() || "Medium";
        continue;
      }

      // Identify sections
      if (
        line.toLowerCase() === "ingredients:" ||
        line.toLowerCase().includes("ingredients list:")
      ) {
        currentSection = "ingredients";
        continue;
      }

      if (
        line.toLowerCase() === "instructions:" ||
        line.toLowerCase().includes("steps:")
      ) {
        currentSection = "instructions";
        continue;
      }

      // Parse ingredients
      if (currentSection === "ingredients" && line.startsWith("-")) {
        const ingredient = line.substring(1).trim();
        if (ingredient) {
          ingredients.push(ingredient);
        }
        continue;
      }

      // Parse instructions
      if (currentSection === "instructions" && /^\d+\./.test(line)) {
        const instruction = line.replace(/^\d+\.\s*/, "").trim();
        if (instruction) {
          instructions.push(instruction);
        }
      }
    }

    // Ensure we have at least empty arrays
    ingredients = ingredients.length > 0 ? ingredients : [];
    instructions = instructions.length > 0 ? instructions : [];

    return {
      title: title || "Custom Recipe",
      ingredients,
      instructions,
      cookingTime,
      difficulty,
    };
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-warmgray-50 via-warmgray-100 to-warmgray-200 p-4 sm:p-8 font-sans text-warmstone-800 overflow-x-hidden ${
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
        <div
          className={`flex flex-col items-center transition-transform duration-700 ease-in-out ${
            recipe ? "transform -translate-y-2" : ""
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
          className={`w-full transition-all duration-700 ease-in-out ${
            recipe
              ? "transform -translate-y-2 scale-95 opacity-90 hover:opacity-100"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="relative flex items-center max-w-2xl mx-auto">
            <textarea
              value={ingredients.join(", ")}
              onChange={(e) => setIngredients(e.target.value.split(", "))}
              onKeyDown={handleKeyDown}
              placeholder="Enter your ingredients (e.g., chicken, rice, tomatoes...)"
              rows={isMultiline ? 3 : 1}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-warmstone-300/50 bg-white shadow-sm focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-200 resize-none text-warmstone-800 placeholder-warmstone-400/60 text-sm sm:text-base overflow-hidden hover:shadow-md"
            />
            <button
              type="submit"
              disabled={isLoading || !ingredients.join(", ").trim()}
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
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </form>

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
      </div>
    </div>
  );
}

export default App;
