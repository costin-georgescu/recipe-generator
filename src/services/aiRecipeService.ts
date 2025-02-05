import { HfInference } from "@huggingface/inference";

class AIRecipeService {
  private hf: HfInference;

  constructor() {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    console.log('Environment variables:', {
      VITE_HUGGINGFACE_API_KEY: import.meta.env.VITE_HUGGINGFACE_API_KEY ? 'present' : 'missing',
      VITE_AI_MODEL: import.meta.env.VITE_AI_MODEL
    });

    if (!apiKey) {
      throw new Error("Hugging Face API key is missing");
    }

    this.hf = new HfInference(apiKey);
  }

  async generateRecipe(
    ingredients: string[],
    cuisine?: string
  ): Promise<string> {
    try {
      const prompt = this.constructPrompt(ingredients, cuisine);

      const response = await this.hf.textGeneration({
        model: "tiiuae/falcon-7b-instruct",
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      });

      if (!response.generated_text) {
        throw new Error("No recipe was generated");
      }

      return this.parseRecipe(response.generated_text);
    } catch (error) {
      console.error("Recipe generation error:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate recipe: ${error.message}`);
      }
      throw new Error("Failed to generate recipe");
    }
  }

  private constructPrompt(ingredients: string[], cuisine?: string): string {
    return `Create a detailed recipe using these ingredients: ${ingredients.join(
      ", "
    )}. 
    ${cuisine ? `Prepare the recipe in the style of ${cuisine} cuisine.` : ""}
    Include:
    - Recipe name
    - Preparation time
    - Cooking time
    - Ingredients list
    - Step-by-step cooking instructions
    - Optional serving suggestions`;
  }

  private parseRecipe(rawText: string): string {
    // Basic parsing to clean up and structure the recipe
    return rawText
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .join("\n");
  }
}

export default new AIRecipeService();
