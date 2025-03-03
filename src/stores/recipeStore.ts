// src/stores/recipeStore.ts
import { create } from "zustand";

interface Recipe {
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
  setRecipe: (recipe: Recipe | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useRecipeStore = create<RecipeStore>((set) => ({
  recipe: null,
  isLoading: false,
  error: null,
  setRecipe: (recipe) => set({ recipe }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useRecipeStore;
