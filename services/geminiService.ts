
import { GoogleGenAI } from "@google/genai";
import type { DrugInfo, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const PROMPT_TEMPLATE = `
Analyze the provided information for a pharmaceutical drug. Your primary source of information should be reliable medical and pharmaceutical websites like drugs.com, rxlist.com, and drugsdata.org. Provide the information in the following format, using these exact headings:

**Name:**
[Identified drug name]

**Classification:**
[Drug classification]

**Common Uses:**
[List of common uses]

**Potential Side Effects:**
[List of potential side effects]

Do not include any other text, introductions, or disclaimers. Only provide the structured information requested.
`;

function parseResponse(responseText: string, groundingChunks: any[]): DrugInfo {
    const nameMatch = responseText.match(/\*\*Name:\*\*\n(.*?)\n\n/s);
    const classificationMatch = responseText.match(/\*\*Classification:\*\*\n(.*?)\n\n/s);
    const usesMatch = responseText.match(/\*\*Common Uses:\*\*\n(.*?)\n\n/s);
    const sideEffectsMatch = responseText.match(/\*\*Potential Side Effects:\*\*\n(.*?)$/s);

    if (!nameMatch || !classificationMatch || !usesMatch || !sideEffectsMatch) {
        throw new Error("Failed to parse the analysis response. The format was unexpected.");
    }
    
    const sources: GroundingSource[] = groundingChunks
        .map(chunk => chunk.web)
        .filter(web => web && web.uri && web.title)
        .reduce((acc, current) => {
            if (!acc.find((item: GroundingSource) => item.uri === current.uri)) {
                acc.push(current);
            }
            return acc;
        }, []);


    return {
        name: nameMatch[1].trim(),
        classification: classificationMatch[1].trim(),
        uses: usesMatch[1].trim(),
        sideEffects: sideEffectsMatch[1].trim(),
        sources: sources,
    };
}


export const analyzeDrugByName = async (drugName: string): Promise<DrugInfo> => {
    try {
        const fullPrompt = `Drug name: "${drugName}". ${PROMPT_TEMPLATE}`;
        const response = await ai.models.generateContent({
            model,
            contents: fullPrompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return parseResponse(response.text, groundingChunks);
    } catch (error) {
        console.error("Error analyzing drug by name:", error);
        throw new Error("Could not retrieve information for the specified drug.");
    }
};

export const analyzeDrugByImage = async (base64Image: string, mimeType: string): Promise<DrugInfo> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: `This is an image of a pill/drug. ${PROMPT_TEMPLATE}`
        };

        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, textPart] },
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return parseResponse(response.text, groundingChunks);
    } catch (error) {
        console.error("Error analyzing drug by image:", error);
        throw new Error("Could not identify or analyze the drug from the image.");
    }
};
