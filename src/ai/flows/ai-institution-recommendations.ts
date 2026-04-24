'use server';

/**
 * @fileOverview Provides AI-powered institution recommendations based on user input.
 *
 * - getInstitutionRecommendations - A function that generates institution recommendations.
 * - InstitutionRecommendationsInput - The input type for the getInstitutionRecommendations function
 */

import {z} from 'zod';
import { institutions } from '@/lib/data';
import { ai } from '@/ai/genkit';
import { render } from 'mustache';

const InstitutionRecommendationsInputSchema = z.object({
  criteria: z.string().describe("The user's detailed criteria for their ideal institution, for example, 'affordable engineering colleges in Maharashtra with good placements and a strong focus on robotics'."),
});
export type InstitutionRecommendationsInput = z.infer<typeof InstitutionRecommendationsInputSchema>;

const RecommendationSchema = z.object({
  institutionId: z.string().describe('The unique ID of the recommended institution, which must match an ID from the provided database.'),
  institutionName: z.string().describe('The name of the recommended institution.'),
  reason: z.string().describe('A concise, compelling reason explaining why this specific institution is a good match for the user\'s criteria.'),
});

const InstitutionRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of up to 3 recommended institutions that best match the user\'s criteria based on the provided database.'),
});
export type InstitutionRecommendationsOutput = z.infer<typeof InstitutionRecommendationsOutputSchema>;

export async function getInstitutionRecommendations(input: InstitutionRecommendationsInput): Promise<InstitutionRecommendationsOutput> {
  return institutionRecommendationFlow(input);
}

const institutionContext = institutions.map(inst => ({
    id: inst.id,
    name: inst.name,
    type: inst.type,
    location: `${inst.location.city}, ${inst.location.state}`,
    description: inst.description,
    courses: inst.courses.map(c => c.name).join(', '),
    avgPackage: inst.placements?.averagePackage,
    nirfRank: inst.nirfRank,
})).slice(0, 20); // Limiting context size for performance


const institutionRecommendationPrompt = ai.definePrompt({
  name: 'institutionRecommendationPrompt',
  input: {schema: z.object({
    criteria: InstitutionRecommendationsInputSchema.shape.criteria,
    institutionContext: z.any(),
  })},
  output: {schema: InstitutionRecommendationsOutputSchema},
  prompt: `You are an expert education counselor AI for a platform called Campus Finder. Your task is to recommend up to 3 institutions from our database that best fit the user's criteria.

  Carefully analyze the user's criteria provided below. Then, review the list of available institutions from our database.
  
  User's Criteria:
  "{{{criteria}}}"

  Available Institutions Database:
  ---
  {{#institutionContext}}
  ID: {{id}}
  Name: {{name}}
  Type: {{type}}
  Location: {{location}}
  Description: {{description}}
  Courses: {{courses}}
  Average Package: {{avgPackage}}
  NIRF Rank: {{nirfRank}}
  ---
  {{/institutionContext}}
  
  Your Task:
  1.  Identify the top 1-3 institutions from the database that are the most relevant matches for the user's criteria.
  2.  For each recommendation, you MUST provide the correct 'institutionId' from the database.
  3.  For each recommendation, write a short, personalized 'reason' explaining *why* it's a great match based on the user's specific query and the institution's data. For example, if the user mentions "robotics," highlight a relevant program or the college's tech focus.
  4.  If no institutions in the database are a good match, return an empty list. Do not invent institutions.
  
  Provide the output in the specified JSON format.
  `,
});

const institutionRecommendationFlow = ai.defineFlow(
  {
    name: 'institutionRecommendationFlow',
    inputSchema: InstitutionRecommendationsInputSchema,
    outputSchema: InstitutionRecommendationsOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
        prompt: {
            ...institutionRecommendationPrompt,
            input: {...input, institutionContext},
        }
    });
    return response.output() || { recommendations: [] };
  }
);
