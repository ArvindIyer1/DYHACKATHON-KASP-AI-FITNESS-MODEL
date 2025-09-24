// src/ai/flows/summarize-wellness-data.ts
'use server';
/**
 * @fileOverview Summarizes logged wellness data to provide users with key trends and insights.
 *
 * - summarizeWellnessData - A function that summarizes the wellness data.
 * - SummarizeWellnessDataInput - The input type for the summarizeWellnessData function.
 * - SummarizeWellnessDataOutput - The return type for the summarizeWellnessData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWellnessDataInputSchema = z.object({
  wellnessData: z.string().describe('The user logged wellness data.'),
});
export type SummarizeWellnessDataInput = z.infer<typeof SummarizeWellnessDataInputSchema>;

const SummarizeWellnessDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the user logged wellness data.'),
});
export type SummarizeWellnessDataOutput = z.infer<typeof SummarizeWellnessDataOutputSchema>;

export async function summarizeWellnessData(input: SummarizeWellnessDataInput): Promise<SummarizeWellnessDataOutput> {
  return summarizeWellnessDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWellnessDataPrompt',
  input: {schema: SummarizeWellnessDataInputSchema},
  output: {schema: SummarizeWellnessDataOutputSchema},
  prompt: `You are a wellness expert. Please summarize the following wellness data, highlighting key trends and insights, so the user can quickly understand their progress and identify areas for improvement.\n\nWellness Data: {{{wellnessData}}}`,
});

const summarizeWellnessDataFlow = ai.defineFlow(
  {
    name: 'summarizeWellnessDataFlow',
    inputSchema: SummarizeWellnessDataInputSchema,
    outputSchema: SummarizeWellnessDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
