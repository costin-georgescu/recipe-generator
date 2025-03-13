import { create } from 'zustand';
import generateRecipeUtil from './utils/generateRecipe';

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
}

interface RecipeStore {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  ingredients: string[];
  isMultiline: boolean;
  setRecipe: (recipe: Recipe | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setIngredients: (ingredients: string[]) => void;
  setIsMultiline: (isMultiline: boolean) => void;
  resetForm: () => void;
  generateRecipe: () => Promise<void>;
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipe: null,
  isLoading: false,
  error: null,
  setRecipe: (recipe) => set({ recipe }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  ingredients: [],
  isMultiline: false,
  setIngredients: (ingredients) => set({ ingredients }),
  setIsMultiline: (isMultiline) => set({ isMultiline }),
  resetForm: () => set({ ingredients: [], isMultiline: false }),

  generateRecipe: async () => {
    const { ingredients } = get();

    if (ingredients.length === 0 || !ingredients.join(', ').trim()) {
      set({ error: 'Please add at least one ingredient' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const recipe = await generateRecipeUtil(ingredients);
      set({
        recipe,
        isLoading: false,
        ingredients: [],
        isMultiline: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to generate recipe',
        isLoading: false,
      });
    }
  },
}));

export default useRecipeStore;
