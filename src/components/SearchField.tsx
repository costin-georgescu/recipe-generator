import { KeyboardEvent } from 'react';
import useRecipeStore from '../recipeStore';
import { Loader2, ChefHat, Sparkles } from 'lucide-react';

const SearchField = () => {
  const {
    recipe,
    isLoading,
    error,
    ingredients,
    isMultiline,
    setIngredients,
    setIsMultiline,
    generateRecipe,
  } = useRecipeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.join(', ').trim()) return;
    await generateRecipe();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Enter' && e.shiftKey) {
      setIsMultiline(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full transition-all duration-700 ease-in-out ${
        recipe
          ? 'transform -translate-y-2 scale-95 opacity-90 hover:opacity-100'
          : 'scale-100 opacity-100'
      }`}
    >
      <div className="relative flex items-center max-w-2xl mx-auto">
        <textarea
          placeholder="Enter ingredients (chicken, rice...)"
          value={ingredients.join(', ')}
          onChange={(e) => setIngredients(e.target.value.split(', '))}
          onKeyDown={handleKeyDown}
          rows={isMultiline ? 3 : 1}
          className="w-full px-4 py-3 pr-12 rounded-xl border border-warmstone-300/50 bg-white shadow-sm focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 transition-all duration-200 resize-none text-warmstone-800 placeholder-warmstone-400/60 text-sm sm:text-base break-words whitespace-normal hover:shadow-md"
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
      {error && (
        <div className="max-w-md w-full mx-auto mb-4 p-4 mt-7 rounded-lg bg-red-100 border border-red-400 text-red-700 text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default SearchField;
