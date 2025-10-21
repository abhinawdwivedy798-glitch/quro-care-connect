import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyCKX2vZTXcMT5gMmMyjZc1UJWV6Dd023YU";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function analyzeClinicalNotes(notes: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert medical AI assistant. Analyze the following clinical notes and provide:
1. Identified symptoms (as an array)
2. Possible diagnosis (2-3 options)
3. Confidence level (0-100)
4. Suggested medications with dosage and reason
5. Recommended tests
6. Follow-up timeline

Clinical Notes: ${notes}

Respond in JSON format:
{
  "symptoms": ["symptom1", "symptom2"],
  "possibleDiagnosis": ["diagnosis1", "diagnosis2"],
  "confidence": 85,
  "suggestedMedications": [
    {"name": "medication", "dosage": "dosage", "reason": "reason"}
  ],
  "recommendedTests": ["test1", "test2"],
  "redFlags": ["flag1"] or [],
  "followUp": "timeline"
}`,
    });
    
    const text = response.text;
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not parse AI response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateSmartTriage(patientData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this patient data and assign priority (High/Medium/Low) with reasoning:
Patient: ${JSON.stringify(patientData)}

Respond in JSON:
{
  "priority": "High",
  "reason": "brief reason",
  "estimatedWaitTime": "minutes"
}`,
    });
    
    const text = response.text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not parse AI response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
