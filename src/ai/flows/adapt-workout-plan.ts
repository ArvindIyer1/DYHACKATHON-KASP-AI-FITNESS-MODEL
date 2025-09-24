'use server';

/**
 * @fileOverview This file defines a Genkit flow for adapting workout plans based on user activity data and progress.
 *
 * The flow takes user activity data and progress as input and uses an AI prompt to generate an adapted workout plan.
 * - adaptWorkoutPlan - A function that adapts the workout plan.
 * - AdaptWorkoutPlanInput - The input type for the adaptWorkoutPlan function.
 * - AdaptWorkoutPlanOutput - The output type for the adaptWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptWorkoutPlanInputSchema = z.object({
  userData: z
    .string()
    .describe("The user's historical workout data, including exercises, sets, reps, and dates."),
  userPreferences: z.string().describe('The users workout preferences'),
  userProgress: z
    .string()
    .describe("The user's progress and performance metrics, such as weight lifted, time taken, and perceived exertion."),
  currentPlan: z.string().describe('The current workout plan of the user.'),
});
export type AdaptWorkoutPlanInput = z.infer<typeof AdaptWorkoutPlanInputSchema>;

const AdaptWorkoutPlanOutputSchema = z.object({
  adaptedPlan: z.string().describe('The adapted workout plan based on user data and progress.'),
});
export type AdaptWorkoutPlanOutput = z.infer<typeof AdaptWorkoutPlanOutputSchema>;

export async function adaptWorkoutPlan(input: AdaptWorkoutPlanInput): Promise<AdaptWorkoutPlanOutput> {
  return adaptWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptWorkoutPlanPrompt',
  input: {schema: AdaptWorkoutPlanInputSchema},
  output: {schema: AdaptWorkoutPlanOutputSchema},
  prompt: `You are an expert personal trainer. Your job is to adapt workout plans based on user data and progress.

  Here is the user's current workout plan:
  {{currentPlan}}

  Here is the user's workout history and preferences:
  History: {{userData}}
  Preferences: {{userPreferences}}

  Here is the user's progress and performance metrics:
  {{userProgress}}

  Based on this information, adapt the workout plan to make it more effective and challenging for the user. The adapted plan should include specific exercises, sets, reps, and rest periods.
  Return the adapted plan in a markdown format.
  `,
});

const adaptWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'adaptWorkoutPlanFlow',
    inputSchema: AdaptWorkoutPlanInputSchema,
    outputSchema: AdaptWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
