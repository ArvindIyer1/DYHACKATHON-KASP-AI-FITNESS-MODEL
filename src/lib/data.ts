
import type { User } from './types';

export const users: User[] = [
    // === SAMPLE LOGIN ACCOUNTS FOR TESTING ===
    // Email: demo@example.com | Password: demo123
    {
        id: 'demo@example.com',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        avatarId: 'user-demo',
        points: 500,
        streak: 5,
        achievements: ['First Workout', '5-Day Streak'],
        activityLog: [
            { id: 'demo1', date: '2024-05-20', activity: 'Morning Walk', duration: 30, intensity: 'Low', notes: 'Great start to the day!' },
            { id: 'demo2', date: '2024-05-19', activity: 'Yoga', duration: 45, intensity: 'Medium', notes: 'Feeling more flexible' },
        ],
        fitnessGoals: 'Stay active and improve flexibility.',
        experienceLevel: 'Beginner',
        workoutPlan: {
            week: 1,
            weeklyGoal: 'Get into a consistent routine!',
            schedule: [
                {
                    day: 'Monday',
                    title: 'Gentle Start',
                    focus: 'Basic Movement',
                    exercises: [
                        { name: 'Walking', sets: '1', reps: '20 min', rest: 'N/A' },
                        { name: 'Stretching', sets: '1', reps: '10 min', rest: 'N/A' },
                    ],
                },
            ],
            wellnessSuggestions: ['Take deep breaths', 'Stay hydrated', 'Get enough sleep'],
        }
    },
    // Email: test@test.com | Password: test123
    {
        id: 'test@test.com',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test123',
        avatarId: 'user-test',
        points: 1000,
        streak: 10,
        achievements: ['Consistent Performer', '10-Day Streak'],
        activityLog: [
            { id: 'test1', date: '2024-05-20', activity: 'Running', duration: 25, intensity: 'Medium', notes: 'Good pace today' },
        ],
        fitnessGoals: 'Build endurance and strength.',
        experienceLevel: 'Intermediate',
        workoutPlan: {
            week: 2,
            weeklyGoal: 'Increase intensity this week!',
            schedule: [
                {
                    day: 'Monday',
                    title: 'Cardio Focus',
                    focus: 'Endurance',
                    exercises: [
                        { name: 'Running', sets: '1', reps: '30 min', rest: 'N/A' },
                        { name: 'Burpees', sets: '3', reps: '10', rest: '60s' },
                    ],
                },
            ],
            wellnessSuggestions: ['Track your progress', 'Eat protein after workouts', 'Listen to your body'],
        }
    },
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
    {
        id: 'Random@gmail.com',
        name: 'Random User',
        email: 'Random@gmail.com',
        password: '12345678', // Insecure, for prototype only
        avatarId: 'new-user-male',
        points: 0,
        streak: 0,
        achievements: [],
        activityLog: [],
        fitnessGoals: 'Get started with a new fitness plan.',
        experienceLevel: 'Beginner',
        workoutPlan: {
            week: 1,
            weeklyGoal: 'First week of your new personalized plan!',
            schedule: [
                 {
                    day: 'Monday',
                    title: 'Full Body Introduction',
                    focus: 'Basic Movements',
                    exercises: [
                        { name: 'Bodyweight Squats', sets: '3', reps: '15', rest: '60s' },
                        { name: 'Push-ups (on knees)', sets: '3', reps: '10', rest: '60s' },
                        { name: 'Plank', sets: '3', reps: '30s', rest: '60s' },
                    ],
                },
                {
                    day: 'Wednesday',
                    title: 'Light Cardio',
                    focus: 'Heart Health',
                    exercises: [
                        { name: 'Brisk Walking', sets: '1', reps: '20 min', rest: 'N/A' },
                        { name: 'Jumping Jacks', sets: '3', reps: '30s', rest: '60s' },
                        { name: 'High Knees', sets: '3', reps: '30s', rest: '60s' },
                    ],
                },
                {
                    day: 'Friday',
                    title: 'Flexibility and Core',
                    focus: 'Stretching & Abs',
                    exercises: [
                        { name: 'Cat-Cow Stretch', sets: '2', reps: '10', rest: '30s' },
                        { name: 'Bird-Dog', sets: '3', reps: '10 per side', rest: '45s' },
                        { name: 'Glute Bridges', sets: '3', reps: '15', rest: '60s' },
                    ],
                },
            ],
            wellnessSuggestions: [
                'Drink a glass of water first thing in the morning.',
                'Try to stand up and stretch for 5 minutes every hour.',
                'Read a book for 15 minutes before bed.',
            ],
        },
    },
    // Email: john@example.com | Password: password123
    {
        id: 'john@example.com',
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password123',
        avatarId: 'user-john',
        points: 750,
        streak: 8,
        achievements: ['First Workout', 'Week Warrior', 'Consistency King'],
        activityLog: [
            { id: 'john1', date: '2024-12-23', activity: 'Morning Jog', duration: 25, intensity: 'Medium', notes: 'Great weather today!' },
            { id: 'john2', date: '2024-12-22', activity: 'Strength Training', duration: 45, intensity: 'High', notes: 'Focused on upper body' },
            { id: 'john3', date: '2024-12-21', activity: 'Yoga', duration: 30, intensity: 'Low', notes: 'Relaxing end to the week' },
        ],
        fitnessGoals: 'Build lean muscle and improve cardiovascular health.',
        experienceLevel: 'Intermediate',
        workoutPlan: {
            week: 3,
            weeklyGoal: 'Push your limits while maintaining proper form and recovery.',
            schedule: [
                {
                    day: 'Monday',
                    title: 'Upper Body Strength',
                    focus: 'Chest, Arms & Shoulders',
                    exercises: [
                        { name: 'Push-ups', sets: '4', reps: '12-15', rest: '60s' },
                        { name: 'Dumbbell Bench Press', sets: '4', reps: '8-10', rest: '90s' },
                        { name: 'Overhead Press', sets: '3', reps: '10-12', rest: '60s' },
                        { name: 'Bicep Curls', sets: '3', reps: '12-15', rest: '45s' },
                        { name: 'Tricep Extensions', sets: '3', reps: '12-15', rest: '45s' },
                    ],
                },
                {
                    day: 'Tuesday',
                    title: 'Cardio & Core',
                    focus: 'Heart Rate & Abs',
                    exercises: [
                        { name: 'Running/Jogging', sets: '1', reps: '25 min', rest: 'N/A' },
                        { name: 'Plank', sets: '4', reps: '60s hold', rest: '30s' },
                        { name: 'Russian Twists', sets: '3', reps: '20', rest: '30s' },
                        { name: 'Mountain Climbers', sets: '3', reps: '30s', rest: '30s' },
                        { name: 'Dead Bug', sets: '3', reps: '10 per side', rest: '45s' },
                    ],
                },
                {
                    day: 'Wednesday',
                    title: 'Lower Body Power',
                    focus: 'Legs & Glutes',
                    exercises: [
                        { name: 'Squats', sets: '4', reps: '12-15', rest: '90s' },
                        { name: 'Lunges', sets: '3', reps: '12 per leg', rest: '60s' },
                        { name: 'Deadlifts', sets: '4', reps: '8-10', rest: '90s' },
                        { name: 'Calf Raises', sets: '3', reps: '15-20', rest: '45s' },
                        { name: 'Glute Bridges', sets: '3', reps: '15', rest: '45s' },
                    ],
                },
                {
                    day: 'Thursday',
                    title: 'Active Recovery',
                    focus: 'Mobility & Flexibility',
                    exercises: [
                        { name: 'Light Walking', sets: '1', reps: '20 min', rest: 'N/A' },
                        { name: 'Dynamic Stretching', sets: '1', reps: '15 min', rest: 'N/A' },
                        { name: 'Foam Rolling', sets: '1', reps: '10 min', rest: 'N/A' },
                        { name: 'Cat-Cow Stretch', sets: '2', reps: '10', rest: '30s' },
                    ],
                },
                {
                    day: 'Friday',
                    title: 'Full Body HIIT',
                    focus: 'High Intensity Circuit',
                    exercises: [
                        { name: 'Burpees', sets: '4', reps: '10', rest: '60s' },
                        { name: 'Kettlebell Swings', sets: '4', reps: '15', rest: '45s' },
                        { name: 'Jump Squats', sets: '3', reps: '12', rest: '45s' },
                        { name: 'Push-up to T', sets: '3', reps: '8', rest: '60s' },
                        { name: 'High Knees', sets: '3', reps: '30s', rest: '30s' },
                    ],
                },
                {
                    day: 'Saturday',
                    title: 'Long Cardio',
                    focus: 'Endurance Training',
                    exercises: [
                        { name: 'Cycling/Running', sets: '1', reps: '35-45 min', rest: 'N/A' },
                        { name: 'Cool Down Walk', sets: '1', reps: '10 min', rest: 'N/A' },
                        { name: 'Full Body Stretch', sets: '1', reps: '15 min', rest: 'N/A' },
                    ],
                },
                {
                    day: 'Sunday',
                    title: 'Rest & Recover',
                    focus: 'Mental Health & Recovery',
                    exercises: [
                        { name: 'Meditation', sets: '1', reps: '15 min', rest: 'N/A' },
                        { name: 'Gentle Yoga', sets: '1', reps: '30 min', rest: 'N/A' },
                        { name: 'Meal Prep', sets: '1', reps: '60 min', rest: 'N/A' },
                    ],
                },
            ],
            wellnessSuggestions: [
                'Aim for 7-9 hours of quality sleep each night.',
                'Eat a balanced meal with protein within 2 hours post-workout.',
                'Stay hydrated - drink water before, during, and after exercise.',
                'Listen to your body and rest when needed.',
                'Track your progress and celebrate small wins.',
            ],
        },
    },
    // Email: Random@gmail.com | Password: random123
    {
        id: 'Random@gmail.com',
        name: 'Random User',
        email: 'Random@gmail.com',
        password: 'random123',
        avatarId: 'user-random',
        points: 320,
        streak: 3,
        achievements: ['Getting Started', 'First Steps'],
        activityLog: [
            { id: 'random1', date: '2024-12-24', activity: 'Morning Walk', duration: 15, intensity: 'Low', notes: 'Nice and easy' },
            { id: 'random2', date: '2024-12-23', activity: 'Stretching', duration: 10, intensity: 'Low', notes: 'Felt good' },
        ],
        fitnessGoals: 'Stay active and build healthy habits.',
        experienceLevel: 'Beginner',
        workoutPlan: {
            week: 1,
            weeklyGoal: 'Get started with basic fitness routine and build consistency.',
            schedule: [
                {
                    day: 'Monday',
                    title: 'Morning Energizer',
                    focus: 'Wake Up & Move',
                    exercises: [
                        { name: 'Light Stretching', sets: '1', reps: '10 min', rest: 'N/A' },
                        { name: 'Walking', sets: '1', reps: '15 min', rest: 'N/A' },
                        { name: 'Deep Breathing', sets: '3', reps: '5 breaths', rest: '30s' },
                    ],
                },
                {
                    day: 'Tuesday',
                    title: 'Fun Cardio',
                    focus: 'Heart Health',
                    exercises: [
                        { name: 'Dancing', sets: '1', reps: '20 min', rest: 'N/A' },
                        { name: 'Jumping Jacks', sets: '2', reps: '30s', rest: '60s' },
                        { name: 'Marching in Place', sets: '3', reps: '1 min', rest: '30s' },
                    ],
                },
                {
                    day: 'Wednesday',
                    title: 'Gentle Strength',
                    focus: 'Building Foundation',
                    exercises: [
                        { name: 'Wall Push-ups', sets: '2', reps: '8', rest: '45s' },
                        { name: 'Chair Squats', sets: '2', reps: '10', rest: '60s' },
                        { name: 'Arm Circles', sets: '2', reps: '15 each way', rest: '30s' },
                    ],
                },
                {
                    day: 'Thursday',
                    title: 'Flexibility Flow',
                    focus: 'Mobility & Balance',
                    exercises: [
                        { name: 'Neck Rolls', sets: '1', reps: '5 each way', rest: '30s' },
                        { name: 'Shoulder Shrugs', sets: '2', reps: '10', rest: '30s' },
                        { name: 'Ankle Circles', sets: '1', reps: '10 each way', rest: '30s' },
                    ],
                },
                {
                    day: 'Friday',
                    title: 'Active Fun',
                    focus: 'Enjoyable Movement',
                    exercises: [
                        { name: 'Favorite Music Dance', sets: '1', reps: '15 min', rest: 'N/A' },
                        { name: 'Step-ups (using stairs)', sets: '2', reps: '10', rest: '60s' },
                        { name: 'Tai Chi Movements', sets: '1', reps: '10 min', rest: 'N/A' },
                    ],
                },
                {
                    day: 'Saturday',
                    title: 'Outdoor Adventure',
                    focus: 'Nature & Fresh Air',
                    exercises: [
                        { name: 'Nature Walk', sets: '1', reps: '30 min', rest: 'N/A' },
                        { name: 'Park Bench Step-ups', sets: '2', reps: '8', rest: '60s' },
                        { name: 'Mindful Breathing', sets: '1', reps: '5 min', rest: 'N/A' },
                    ],
                },
                {
                    day: 'Sunday',
                    title: 'Rest & Reflect',
                    focus: 'Recovery & Planning',
                    exercises: [
                        { name: 'Gentle Yoga', sets: '1', reps: '20 min', rest: 'N/A' },
                        { name: 'Meditation', sets: '1', reps: '10 min', rest: 'N/A' },
                        { name: 'Plan Next Week', sets: '1', reps: '15 min', rest: 'N/A' },
                    ],
                },
            ],
            wellnessSuggestions: [
                'Start with just 10 minutes of movement daily.',
                'Drink a glass of water when you wake up.',
                'Take the stairs instead of the elevator when possible.',
                'Set a daily reminder to move every hour.',
                'Celebrate small wins and progress.',
            ],
        },
    }
];
