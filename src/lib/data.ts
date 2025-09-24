
import type { User } from './types';

export const users: User[] = [
    {
        id: 'alex@example.com',
        name: 'Alex Ray',
        email: 'alex@example.com',
        password: 'password123', // Insecure, for prototype only
        avatarId: 'user-alex',
        points: 1250,
        streak: 12,
        achievements: ['First 5k', '30-Day Challenge', 'Morning Lark'],
        activityLog: [
            { id: 'log1', date: '2024-05-20', activity: 'Morning Run', duration: 30, intensity: 'Medium', notes: 'Felt great!' },
            { id: 'log2', date: '2024-05-19', activity: 'Weightlifting', duration: 60, intensity: 'High', notes: 'New PR on squats' },
            { id: 'log3', date: '2024-05-18', activity: 'Yoga', duration: 45, intensity: 'Low', notes: 'Focused on flexibility' },
            { id: 'log4', date: '2024-05-17', activity: 'HIIT', duration: 20, intensity: 'High' },
            { id: 'log5', date: '2024-05-16', activity: 'Cycling', duration: 55, intensity: 'Medium' },
            { id: 'log6', date: '2024-05-15', activity: 'Rest Day', duration: 0, intensity: 'Low' },
            { id: 'log7', date: '2024-05-14', activity: 'Swimming', duration: 40, intensity: 'Medium' },
        ],
        fitnessGoals: 'Build muscle and improve cardio endurance.',
        experienceLevel: 'Intermediate',
        workoutPlan: {
            week: 2,
            weeklyGoal: 'Focus on progressive overload and increase cardio duration.',
            schedule: [
                 {
                    day: 'Monday',
                    title: 'Upper Body Strength',
                    focus: 'Chest, Shoulders, Triceps',
                    exercises: [
                        { name: 'Bench Press', sets: '4', reps: '6-8', rest: '90s' },
                        { name: 'Overhead Press', sets: '3', reps: '8-10', rest: '60s' },
                        { name: 'Tricep Dips', sets: '3', reps: '10-12', rest: '60s' },
                    ],
                },
                {
                    day: 'Wednesday',
                    title: 'Lower Body Power',
                    focus: 'Quads, Hamstrings, Glutes',
                    exercises: [
                        { name: 'Squats', sets: '4', reps: '6-8', rest: '90s' },
                        { name: 'Deadlifts', sets: '3', reps: '5-6', rest: '120s' },
                        { name: 'Leg Press', sets: '3', reps: '10-12', rest: '60s' },
                    ],
                },
                {
                    day: 'Friday',
                    title: 'Full Body Circuit',
                    focus: 'Cardio & Conditioning',
                    exercises: [
                        { name: 'Kettlebell Swings', sets: '3', reps: '15', rest: '45s' },
                        { name: 'Burpees', sets: '3', reps: '12', rest: '60s' },
                        { name: 'Rowing Machine', sets: '1', reps: '10 min', rest: 'N/A' },
                    ],
                },
            ],
            wellnessSuggestions: [
                'Try a 10-minute meditation session after each workout.',
                'Aim for 8 hours of sleep per night.',
                'Ensure you are drinking at least 3 liters of water daily.',
            ],
        },
    },
    {
        id: 'jordan@example.com',
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        password: 'password123', // Insecure, for prototype only
        avatarId: 'user-jordan',
        points: 800,
        streak: 5,
        achievements: ['First Week', 'Perfect Start'],
         activityLog: [
            { id: 'log1', date: '2024-05-20', activity: 'Yoga Flow', duration: 60, intensity: 'Medium' },
            { id: 'log2', date: '2024-05-19', activity: 'Light Jog', duration: 25, intensity: 'Low' },
         ],
        fitnessGoals: 'Improve flexibility and reduce stress.',
        experienceLevel: 'Beginner',
        workoutPlan: {
             week: 1,
             weeklyGoal: "Establish a consistent routine.",
             schedule: [
                {
                    day: 'Monday',
                    title: 'Full Body Yoga',
                    focus: 'Flexibility & Balance',
                    exercises: [
                        { name: 'Sun Salutation', sets: '5', reps: 'rounds', rest: '30s' },
                        { name: 'Warrior II', sets: '3', reps: '30s hold', rest: '30s' },
                        { name: 'Triangle Pose', sets: '3', reps: '30s hold', rest: '30s' },
                    ],
                },
                 {
                    day: 'Wednesday',
                    title: 'Core & Cardio',
                    focus: 'Abs & Heart Rate',
                    exercises: [
                        { name: 'Jumping Jacks', sets: '3', reps: '60s', rest: '30s' },
                        { name: 'Plank', sets: '3', reps: '45s hold', rest: '45s' },
                        { name: 'Bicycle Crunches', sets: '3', reps: '20', rest: '30s' },
                    ],
                },
                {
                    day: 'Friday',
                    title: 'Restorative Yoga',
                    focus: 'Relaxation',
                    exercises: [
                        { name: 'Child\'s Pose', sets: '1', reps: '3 min', rest: 'N/A' },
                        { name: 'Pigeon Pose', sets: '2', reps: '60s per side', rest: '30s' },
                        { name: 'Savasana', sets: '1', reps: '10 min', rest: 'N/A' },
                    ],
                },
             ],
            wellnessSuggestions: [
                'Practice deep breathing for 5 minutes each morning.',
                'Keep a gratitude journal.',
                'Go for a 20-minute walk in nature.',
            ],
        }
    },
     {
        id: 'casey@example.com',
        name: 'Casey Pat',
        email: 'casey@example.com',
        password: 'password123', // Insecure, for prototype only
        avatarId: 'user-casey',
        points: 2500,
        streak: 32,
        achievements: ['Marathon Ready', 'Strength Master', 'Zen Mode'],
        activityLog: [],
        fitnessGoals: 'Run a marathon and increase overall strength.',
        experienceLevel: 'Advanced',
        workoutPlan: {
            week: 8,
            weeklyGoal: 'Taper week before the marathon.',
            schedule: [],
            wellnessSuggestions: [
                'Focus on carb-loading and hydration.',
                'Get plenty of rest, at least 8-9 hours per night.',
                'Visualize a successful race day.',
            ],
        },
    },
];
