
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-workout-plan.ts';
import '@/ai/flows/summarize-wellness-data.ts';
import '@/ai/flows/adapt-workout-plan.ts';
import '@/ai/flows/submit-feedback.ts';
