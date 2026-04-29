import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const geminiService = {
  async getPersonalizedRecommendations(userPreferences: string, currentCart: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given these user preferences: "${userPreferences}" and current items in cart: "${currentCart.join(", ")}", recommend 3 categories of products they might be interested in. Return as a short JSON array of category names.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  async generateProductDescription(productName: string, features: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a professional, persuasive eCommerce product description for "${productName}" with these features: ${features.join(", ")}. Keep it under 150 words and use markdown for formatting.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  }
};
