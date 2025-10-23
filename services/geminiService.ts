
import { GoogleGenAI } from "@google/genai";
import type { Location, Result, GroundingChunk } from '../types';

export async function getMurrelFishInfo(prompt: string, location: Location | null): Promise<Result> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (location) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: config,
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Filter only for chunks that have map data
    const mapSources = sources.filter((chunk: any) => chunk.maps && chunk.maps.uri);

    return { text, sources: mapSources as GroundingChunk[] };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get information from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
}
