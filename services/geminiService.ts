
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

// Fix: Strictly following initialization guidelines using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[], prompt: string) => {
  try {
    // Fix: Using gemini-3-flash-preview for the basic text task of providing financial advice
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        // Fix: Utilizing systemInstruction for the model's persona and context as per guidelines
        systemInstruction: `
          You are a Capitec Financial Advisor. 
          The user's recent transactions are: ${JSON.stringify(transactions)}.
          Provide helpful, encouraging, and concise financial advice based on these transactions. 
          Focus on saving, budgeting, and the "Global One" lifestyle.
        `,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    // Fix: Correctly accessing .text property (not a method) on the response object
    return response.text || "I'm sorry, I couldn't analyze your data right now. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with our AI advisor. We're working on it!";
  }
};