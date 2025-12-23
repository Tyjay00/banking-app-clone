
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

// Safety check for static hosting environments
const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';

// We only initialize if the API key is present to avoid runtime errors
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getFinancialAdvice = async (transactions: Transaction[], prompt: string) => {
  if (!ai) {
    console.warn("Gemini AI not initialized: Missing API Key.");
    return "The AI Advisor is currently unavailable. Please ensure your API key is configured correctly.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
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

    return response.text || "I'm sorry, I couldn't analyze your data right now. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with our AI advisor. We're working on it!";
  }
};
