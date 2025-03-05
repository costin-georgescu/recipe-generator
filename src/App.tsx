import { ChefHat, UtensilsCrossed } from "lucide-react";
import "./App.css";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import useRecipeStore from "./stores/recipeStore";
import Card from "./components/Card";
import RecipeHeader from "./components/RecipeHeader";
import Skeleton from "./components/Skeleton";
import Footer from "./components/Footer";

function App() {
  const { recipe, isLoading } = useRecipeStore();

  return (
    <div
      className={`flex flex-col min-h-screen bg-pattern p-4 sm:p-8 font-sans text-warmstone-800 overflow-x-hidden ${
        recipe ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      <div
        className={`flex-grow mx-auto max-w-5xl w-full flex flex-col transition-all duration-700 ease-in-out ${
          recipe
            ? "space-y-8 pt-4"
            : "min-h-[calc(100vh-10rem)] justify-center items-center space-y-8"
        }`}
      >
        <Header />
        <SearchField />

        {isLoading && (
          <div className="w-full animate-fade-in space-y-6 transition-all duration-700 ease-in-out">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        )}

        {recipe && (
          <div className="w-full animate-fade-in space-y-6 transition-all duration-700 ease-in-out">
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
      <Footer />
    </div>
  );
}

export default App;
