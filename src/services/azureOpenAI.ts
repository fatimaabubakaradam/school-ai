export class AzureOpenAIService {
  private static endpoint = import.meta.env.VITE_AZURE_OPEN_AI_ENDPOINT;
  private static apiKey = import.meta.env.VITE_AZURE_OPEN_AI_KEY;
  private static deploymentName = import.meta.env.VITE_AZURE_OPEN_AI_CHAT_DEPLOYMENT_NAME;

  static async generateResponse(messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const response = await fetch(`${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2024-02-15-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Azure OpenAI:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
  }

  static async getCareerGuidanceResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }>, language?: string): Promise<string> {
    const languageInstruction = language ? `Respond in ${language}.` : '';
    const systemMessage = {
      role: 'system',
      content: `You are a friendly, kid-safe AI career coach for students. Use simple, short sentences and lots of emojis to make replies fun and engaging (for example: 😊 🚀 🎨 🧪 🎯). Format helpful parts using Markdown (headings, bold, lists, code blocks for examples). Always be positive, encouraging, and age-appropriate.

Instructions:
- Keep language simple and clear; avoid long paragraphs.
- Use many emojis where it feels natural to keep the tone playful.
- When giving steps or lists, use Markdown bullet lists or numbered lists.
- If you include examples or small code/text snippets, use triple-backtick code fences.
- Ask one or two friendly follow-up questions to learn more when appropriate.
- If the user's language is provided, reply in that language. ${languageInstruction}

Safety: do not provide medical, legal, or other professional advice. If asked, recommend speaking to a trusted adult or professional.

Be concise and helpful.`
    };

    const messages = [systemMessage, ...conversationHistory, { role: 'user', content: userMessage }];

    return await this.generateResponse(messages);
  }
}
