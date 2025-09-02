
// This is a MOCKED service. It does not make real API calls.
// It simulates the streaming behavior of the Gemini API for frontend demonstration.
// In a real application, this file would use the @google/genai library.

// Example of how the real implementation would look:
/*
import { GoogleGenAI } from "@google/genai";

export async function* generateContentStream(prompt: string) {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}
*/

// Mock implementation for demonstration
const MOCK_RESPONSE = `
1.  **Coca-Cola (KO):** Coca-Cola's stock has steadily grown over the past 5 years, thanks to diversification into non-soda beverages. The pandemic caused a temporary dip in its stock, but it has since rebounded. Long-term investors.

2.  **PepsiCo (PEP):** PepsiCo's stock has shown stable growth, including food and beverages, which shields it from market volatility. The company's resilience during the pandemic led to a strong recovery, and steady dividends have attracted income-focused investors.

In conclusion, both companies have demonstrated resilience and steady growth over the past 5 years, appealing to growth and income-focused investors.
`;

function chunkString(str: string, size: number): string[] {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
    }
    return chunks;
}

export async function* generateContentStream(prompt: string): AsyncGenerator<string> {
    console.log("Mocking Gemini stream for prompt:", prompt);

    if (prompt.toLowerCase().includes("error")) {
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error("This is a simulated API error.");
    }
    
    const chunks = chunkString(MOCK_RESPONSE, 10);
    
    for (const chunk of chunks) {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
        yield chunk;
    }
}
