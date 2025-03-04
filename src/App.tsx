import { ChefHat, Loader2, UtensilsCrossed } from "lucide-react";
import "./styles/animations.css";
import "./styles/background.css";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import useRecipeStore from "./stores/recipeStore";
import Card from "./components/Card";
import RecipeHeader from "./components/RecipeHeader";

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
            <RecipeHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                title="Ingredients"
                icon={
                  <UtensilsCrossed
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={1.5}
                  />
                }
                items={recipe.ingredients}
                type="ingredients"
              />
              <Card
                title="Instructions"
                icon={
                  <ChefHat
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={1.5}
                  />
                }
                items={recipe.instructions}
                type="instructions"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
