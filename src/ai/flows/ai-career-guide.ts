'use server';

/**
 * @fileOverview Provides an AI-powered career guide to assist users with their career-related queries.
 *
 * - getCareerGuidance - A function that generates career guidance based on user input.
 * - CareerGuideInput - The input type for the getCareerGuidance function.
 * - CareerGuideOutput - The return type for the getCareerGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';


const CareerGuideInputSchema = z.object({
  query: z.string().describe("The user's career-related query, for example, 'What are the career options after a B.Tech in Computer Science?' or 'How can I become a data scientist?'"),
});
export type CareerGuideInput = z.infer<typeof CareerGuideInputSchema>;

const CareerGuideOutputSchema = z.object({
  response: z.string().describe('The AI-generated career guidance and advice.'),
});
export type CareerGuideOutput = z.infer<typeof CareerGuideOutputSchema>;

export async function getCareerGuidance(input: CareerGuideInput): Promise<CareerGuideOutput> {
  return careerGuideFlow(input);
}

const careerGuidePrompt = ai.definePrompt({
  name: 'careerGuidePrompt',
  input: {schema: CareerGuideInputSchema},
  output: {schema: CareerGuideOutputSchema},
  prompt: `You are an expert career counselor and AI assistant for an educational platform called Campus Finder. Your role is to provide clear, helpful, and encouraging guidance to students and professionals seeking career advice.

      You will receive a query from a user. Based on their query, provide a comprehensive yet easy-to-understand response.
    
      Your response should cover:
      1.  **Direct Answer:** Directly address the user's question.
      2.  **Key Roles/Paths:** Mention specific job roles or career paths relevant to their query.
      3.  **Required Skills:** List the key skills (technical and soft skills) needed.
      4.  **Educational Steps:** Suggest educational qualifications, courses, or certifications.
      5.  **Future Scope:** Briefly touch upon the future prospects in that field.
    
      Keep the tone positive and empowering. Format the response using markdown for better readability (e.g., using headings, bullet points, and bold text).
    
      User's Query: {{{query}}}
      `,
});

const careerGuideFlow = ai.defineFlow(
  {
    name: 'careerGuideFlow',
    inputSchema: CareerGuideInputSchema,
    outputSchema: CareerGuideOutputSchema,
  },
  async input => {
    const response = await ai.generate({
      prompt: {
        ...careerGuidePrompt,
        input
      }
    });

    const output = response.output();
    if (!output) {
      throw new Error("AI failed to generate career guidance.");
    }
    return output;
  }
);
