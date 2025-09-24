'use server';
/**
 * @fileOverview Generates an initial workout and wellness plan for a new user based on their provided data and preferences.
 *
 * - generateInitialWorkoutPlan - A function that generates the initial workout plan.
 * - GenerateInitialWorkoutPlanInput - The input type for the generateInitialWorkoutPlan function.
 * - GenerateInitialWorkoutPlanOutput - The return type for the generateInitialWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialWorkoutPlanInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe("The user's fitness goals, e.g., 'lose weight', 'build muscle', 'improve endurance'."),
  experienceLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The user\'s experience level with working out.'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available for workouts per week, e.g., \'3-5 hours\'.'),
  preferredActivities: z
    .string()
    .describe('The user\'s preferred activities, e.g., \'running, swimming, yoga\'.'),
  wellnessPreferences: z
    .string()
    .describe('The user\'s wellness preferences, e.g., \'meditation, healthy eating, mindfulness\'.'),
});

export type GenerateInitialWorkoutPlanInput = z.infer<
  typeof GenerateInitialWorkoutPlanInputSchema
>;

const GenerateInitialWorkoutPlanOutputSchema = z.object({
  workoutPlan: z.string().describe('A detailed workout plan based on user input.'),
  wellnessSuggestions: z
    .string()
    .describe('Wellness suggestions to complement the workout plan.'),
});

export type GenerateInitialWorkoutPlanOutput = z.infer<
  typeof GenerateInitialWorkoutPlanOutputSchema
>;

export async function generateInitialWorkoutPlan(
  input: GenerateInitialWorkoutPlanInput
): Promise<GenerateInitialWorkoutPlanOutput> {
  return generateInitialWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialWorkoutPlanPrompt',
  input: {schema: GenerateInitialWorkoutPlanInputSchema},
  output: {schema: GenerateInitialWorkoutPlanOutputSchema},
  prompt: `You are an AI wellness assistant that generates personalized workout and wellness plans for new users.

  Based on the user's input, create a workout plan and wellness suggestions.

  User Fitness Goals: {{{fitnessGoals}}}
  Experience Level: {{{experienceLevel}}}
  Available Time: {{{availableTime}}}
  Preferred Activities: {{{preferredActivities}}}
  Wellness Preferences: {{{wellnessPreferences}}}

  Workout Plan:
  Wellness Suggestions:
  `,
});

const generateInitialWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generateInitialWorkoutPlanFlow',
    inputSchema: GenerateInitialWorkoutPlanInputSchema,
    outputSchema: GenerateInitialWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
