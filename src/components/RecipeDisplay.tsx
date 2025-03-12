import { ChefHat, UtensilsCrossed } from 'lucide-react';
import useRecipeStore from '../recipeStore';
import Card from './Card';
import RecipeHeader from './RecipeHeader';
import LoadingSkeleton from './LoadingSkeleton';

const RecipeDisplay = () => {
  const { recipe, isLoading } = useRecipeStore();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!recipe) {
    return null;
  }

  return (
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
            <ChefHat className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
          }
          items={recipe.instructions}
          type="instructions"
        />
      </div>
    </div>
  );
};

export default RecipeDisplay;
