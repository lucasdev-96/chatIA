
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
require('dotenv').config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY ?? '');

// ...

const generationConfig = {
    temperature: 0.5,
    candidateCount: 1,
  };

  const safetySettings = [
    {
      category: HarmCategory,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

// For text-only input, use the gemini-pro model
export const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", generationConfig});

// ...