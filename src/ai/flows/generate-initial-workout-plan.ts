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

const WorkoutDaySchema = z.object({
  day: z.string().describe('Day of the week, e.g., Monday'),
  title: z.string().describe('Title of the workout, e.g., Upper Body Strength'),
  focus: z.string().describe('Main focus of the workout, e.g., Chest, Shoulders, Triceps'),
  exercises: z.array(z.object({
    name: z.string().describe('Name of the exercise'),
    sets: z.string().describe('Number of sets'),
    reps: z.string().describe('Number of repetitions or duration'),
    rest: z.string().describe('Rest time between sets'),
  })),
});

const GenerateInitialWorkoutPlanOutputSchema = z.object({
  workoutPlan: z.array(WorkoutDaySchema).describe('A detailed 3-day workout plan based on user input.'),
  wellnessSuggestions: z.array(z.string()).describe('Three wellness suggestions to complement the workout plan.'),
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
  prompt: `You are an AI wellness assistant that generates personalized 3-day workout and wellness plans for new users. The plan should be structured for Monday, Wednesday, and Friday.

  Based on the user's input, create a workout plan and wellness suggestions.

  User Fitness Goals: {{{fitnessGoals}}}
  Experience Level: {{{experienceLevel}}}
  Available Time: {{{availableTime}}}
  Preferred Activities: {{{preferredActivities}}}
  Wellness Preferences: {{{wellnessPreferences}}}

  Generate a 3-day workout plan (Monday, Wednesday, Friday) and 3 wellness suggestions.
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
