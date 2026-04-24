
/**
 * @fileOverview This file contains the Zod schemas and TypeScript types for AI-related data structures.
 * Separating these from the 'use server' files where they are used prevents build errors.
 */

import { z } from 'zod';
import type { Institution } from './types';

// Schemas and types for the AI Comparison feature

const SimpleInstitutionSchema = z.object({
  name: z.string(),
  type: z.string(),
  rating: z.number(),
  nirfRank: z.string().optional(),
  placements: z.object({
    averagePackage: z.string(),
    highestPackage: z.string(),
  }).nullable(),
  infrastructure: z.object({
    library: z.boolean(),
    hostel: z.boolean(),
    labs: z.boolean(),
    sportsComplex: z.boolean(),
    cafeteria: z.boolean(),
    wifi: z.boolean(),
  }),
});

export const CompareInstitutionsInputSchema = z.object({
  institution1: SimpleInstitutionSchema,
  institution2: SimpleInstitutionSchema,
});
export type CompareInstitutionsInput = z.infer<typeof CompareInstitutionsInputSchema>;

export const ComparisonResultSchema = z.object({
  featureComparison: z.array(z.object({
    feature: z.string().describe("The feature being compared, e.g., 'Placements', 'Infrastructure', 'Rating'."),
    institution1Value: z.string().describe("The value of the feature for institution 1."),
    institution2Value: z.string().describe("The value of the feature for institution 2."),
    winner: z.enum(['institution1', 'institution2', 'tie']).describe("Which institution is better for this feature."),
  })),
  institution1Score: z.number().describe("An overall score for institution 1 on a scale of 1 to 10."),
  institution2Score: z.number().describe("An overall score for institution 2 on a scale of 1 to 10."),
  recommendedInstitution: z.string().describe("The name of the institution that is recommended overall."),
  recommendationReason: z.string().describe("A detailed reason for the recommendation, summarizing the key strengths of the chosen institution."),
});
export type ComparisonResult = z.infer<typeof ComparisonResultSchema>;
