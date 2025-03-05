import { HfInference } from "@huggingface/inference";

class AIRecipeService {
  private hf: HfInference;

  constructor() {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

    if (!apiKey) {
      console.error(
        "API Key is missing. Check your .env file at the project root."
      );
      throw new Error("Hugging Face API key is missing");
    }

    this.hf = new HfInference(apiKey as string);
  }

  async generateRecipe(
    ingredients: string[],
    cuisine?: string
  ): Promise<string> {
    try {
      const prompt = this.constructPrompt(ingredients, cuisine);

      const response = await this.hf.textGeneration({
        model: import.meta.env.VITE_AI_MODEL || "tiiuae/falcon-7b-instruct",
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      });

      if (!response.generated_text) {
        throw new Error("No recipe was generated");
      }

      return response.generated_text;
    } catch (error) {
      console.error("Recipe generation error:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate recipe: ${error.message}`);
      }
      throw new Error("Failed to generate recipe");
    }
  }

  private constructPrompt(ingredients: string[], cuisine?: string): string {
    return `Create a recipe using exactly these ingredients: ${ingredients.join(
      ", "
    )}. 
    ${cuisine ? `Make it in the style of ${cuisine} cuisine.` : ""}
    
    Format the response exactly like this:
    Recipe Name: [Name of the recipe]
    Cooking Time: [Total time needed]
    Difficulty: [Easy/Medium/Hard]
    
    Ingredients:
    - [ingredient 1 with quantity]
    - [ingredient 2 with quantity]
    (list all ingredients)
    
    Instructions:
    1. [First step]
    2. [Second step]
    (list all steps)`;
  }
}

export default new AIRecipeService();
