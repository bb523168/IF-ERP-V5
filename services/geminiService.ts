
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLegalDraft = async (scenario: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為一名法律助手，請根據以下情境撰寫正式的建築合約條款或法律建議（繁體中文）：${scenario}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "無法生成條款";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 服務目前無法使用";
  }
};

export const getAccountingSuggestion = async (entry: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為會計助手，請針對以下支出或收入項目，建議其對應的會計科目與稅務分類（依據執行業務所得稅法）：${entry}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            account: { type: Type.STRING },
            category: { type: Type.STRING },
            note: { type: Type.STRING }
          },
          required: ["account", "category"]
        }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return JSON.stringify({ account: "待分類", category: "未知", note: "錯誤" });
  }
};

export const translateDocument = async (text: string, targetLang: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following text into ${targetLang}: ${text}`,
    });
    return response.text || "";
  } catch (error) {
    return "翻譯失敗";
  }
};
