import { useState, KeyboardEvent } from "react";
import useRecipeStore from "../stores/recipeStore";
import aiRecipeService from "../services/aiRecipeService";
import { Loader2, ChefHat, Sparkles } from "lucide-react";


interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
}

const SearchField = () => {
  const { recipe, isLoading, error, setRecipe, setIsLoading, setError } =
    useRecipeStore();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.join(", ").trim()) return;
    await generateRecipe();
  };

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
          placeholder="Enter ingredients (chicken, rice...)"
          value={ingredients.join(", ")}
          onChange={(e) => setIngredients(e.target.value.split(", "))}
          onKeyDown={handleKeyDown}
          rows={isMultiline ? 3 : 1}
          className="w-full px-4 py-3 pr-12 rounded-xl border border-warmstone-300/50 bg-white shadow-sm focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-200 resize-none text-warmstone-800 placeholder-warmstone-400/60 text-sm sm:text-base break-words whitespace-normal hover:shadow-md"
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
        <div className="max-w-md w-full mx-auto mb-4 p-4 mt-7 rounded-lg bg-red-100 border border-red-400 text-red-700 text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default SearchField;
