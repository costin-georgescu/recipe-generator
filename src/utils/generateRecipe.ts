import aiRecipeService from '../services/aiRecipeService';
import { Recipe } from '../recipeStore';

const parseRecipeText = (text: string): Recipe => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  let title = '';
  let cookingTime = '25 minutes';
  let difficulty = 'Medium';
  let ingredients: string[] = [];
  let instructions: string[] = [];
  let currentSection = '';

  for (const line of lines) {
    // Parse title
    if (line.toLowerCase().includes('recipe name:')) {
      title = line.split(':')[1]?.trim() || 'Custom Recipe';
      continue;
    }

    // Parse cooking time
    if (line.toLowerCase().includes('cooking time:')) {
      cookingTime = line.split(':')[1]?.trim() || '25 minutes';
      continue;
    }

    // Parse difficulty
    if (line.toLowerCase().includes('difficulty:')) {
      difficulty = line.split(':')[1]?.trim() || 'Medium';
      continue;
    }

    // Identify sections
    if (
      line.toLowerCase() === 'ingredients:' ||
      line.toLowerCase().includes('ingredients list:')
    ) {
      currentSection = 'ingredients';
      continue;
    }

    if (
      line.toLowerCase() === 'instructions:' ||
      line.toLowerCase().includes('steps:')
    ) {
      currentSection = 'instructions';
      continue;
    }

    // Parse ingredients
    if (currentSection === 'ingredients' && line.startsWith('-')) {
      const ingredient = line.substring(1).trim();
      if (ingredient) {
        ingredients.push(ingredient);
      }
      continue;
    }

    // Parse instructions
    if (currentSection === 'instructions' && /^\d+\./.test(line)) {
      const instruction = line.replace(/^\d+\.\s*/, '').trim();
      if (instruction) {
        instructions.push(instruction);
      }
    }
  }

  // Ensure we have at least empty arrays
  ingredients = ingredients.length > 0 ? ingredients : [];
  instructions = instructions.length > 0 ? instructions : [];

  // Validate that we have meaningful content
  const hasValidContent = ingredients.length > 0 && instructions.length > 0;

  if (!hasValidContent) {
    // Provide informative defaults if we're missing data
    if (ingredients.length === 0) {
      ingredients = [
        'Could not identify ingredients. Please try with different ingredients.',
      ];
    }

    if (instructions.length === 0) {
      instructions = [
        'Could not generate cooking instructions. Please try with different ingredients.',
      ];
    }
  }

  return {
    title: title || 'Custom Recipe',
    ingredients,
    instructions,
    cookingTime,
    difficulty,
  };
};

const createStructuredRecipe = async (
  ingredients: string[]
): Promise<Recipe> => {
  if (ingredients.length === 0) {
    throw new Error('Please add at least one ingredient');
  }

  try {
    const recipeText = await aiRecipeService.fetchRecipeFromAI(ingredients);
    return parseRecipeText(recipeText);
  } catch (error) {
    console.error('Failed to generate recipe:', error);
    throw new Error(
      'Failed to generate a complete recipe. Please try again with different ingredients.'
    );
  }
};

export default createStructuredRecipe;
