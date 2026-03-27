'use server';

/**
 * @fileOverview Provides an AI-powered comparison of two educational institutions.
 *
 * - compareInstitutions - A function that generates a detailed comparison.
 */

import type { Institution } from '@/lib/types';
import { CompareInstitutionsInputSchema, ComparisonResultSchema, type CompareInstitutionsInput, type ComparisonResult } from '@/lib/ai-types';
import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';


// This is the exported function that will be called from the frontend.
// It simplifies the institution object before calling the flow.
export async function compareInstitutions(input: { institution1: Institution; institution2: Institution }): Promise<ComparisonResult> {
  const simplify = (inst: Institution) => ({
    name: inst.name,
    type: inst.type,
    rating: inst.rating,
    nirfRank: inst.nirfRank,
    placements: inst.placements,
    infrastructure: inst.infrastructure,
  });

  const flowInput: CompareInstitutionsInput = {
    institution1: simplify(input.institution1),
    institution2: simplify(input.institution2),
  };
  
  return compareInstitutionsFlow(flowInput);
}

const compareInstitutionsPrompt = ai.definePrompt({
  name: 'compareInstitutionsPrompt',
  input: {schema: CompareInstitutionsInputSchema},
  output: {schema: ComparisonResultSchema},
  prompt: `You are an expert education counselor. Your task is to compare two institutions based on the provided data and give a clear recommendation.

      Here is the data for the two institutions:
      
      Institution 1:
      Name: {{institution1.name}}
      Type: {{institution1.type}}
      Rating: {{institution1.rating}}/5
      NIRF Rank: {{institution1.nirfRank}}
      Average Package: {{institution1.placements.averagePackage}}
      Highest Package: {{institution1.placements.highestPackage}}
      Infrastructure: {{#institution1.infrastructure}}{{.}}, {{/institution1.infrastructure}}

      Institution 2:
      Name: {{institution2.name}}
      Type: {{institution2.type}}
      Rating: {{institution2.rating}}/5
      NIRF Rank: {{institution2.nirfRank}}
      Average Package: {{institution2.placements.averagePackage}}
      Highest Package: {{institution2.placements.highestPackage}}
      Infrastructure: {{#institution2.infrastructure}}{{.}}, {{/institution2.infrastructure}}

      Your task is to:
      1.  **Compare Key Features**: Compare the institutions based on placements (average/highest package), rating, and NIRF rank. For each feature, declare a clear winner or a tie.
      2.  **Score Each Institution**: Based on your comparison, provide an overall score for each institution on a scale of 1 to 10. The score should reflect their standing in this specific comparison. A higher NIRF rank (lower number) is better. Better placements and ratings should result in a higher score.
      3.  **Make a Recommendation**: Based on the scores and feature comparison, recommend one institution.
      4.  **Provide a Reason**: Write a concise, helpful reason for your recommendation, highlighting why the chosen institution is the better choice for a prospective student.
      
      Provide the output in the specified JSON format.
      `,
});

const compareInstitutionsFlow = ai.defineFlow(
  {
    name: 'compareInstitutionsFlow',
    inputSchema: CompareInstitutionsInputSchema,
    outputSchema: ComparisonResultSchema,
  },
  async (input) => {
    // A little hack to make mustache.js render the infrastructure keys.
    const view = {
      ...input,
      institution1: {
        ...input.institution1,
        infrastructure: Object.keys(input.institution1.infrastructure).filter(k => (input.institution1.infrastructure as any)[k])
      },
      institution2: {
        ...input.institution2,
        infrastructure: Object.keys(input.institution2.infrastructure).filter(k => (input.institution2.infrastructure as any)[k])
      }
    };
    
    const response = await ai.generate({
      prompt: {
        ...compareInstitutionsPrompt,
        input: view
      }
    });

    const output = response.output();
    if (!output) {
      throw new Error("AI failed to generate a comparison.");
    }
    return output;
  }
);
