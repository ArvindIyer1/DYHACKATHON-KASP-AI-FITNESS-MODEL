// Gamification utilities and constants

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired?: number;
  streakRequired?: number;
  activityCountRequired?: number;
  category: 'points' | 'streak' | 'activity' | 'special';
}

export const ACHIEVEMENTS: Achievement[] = [
  // Points-based achievements
  {
    id: 'first_points',
    name: 'Getting Started',
    description: 'Earn your first 50 points',
    icon: '🌟',
    pointsRequired: 50,
    category: 'points'
  },
  {
    id: 'points_master',
    name: 'Points Master',
    description: 'Earn 1000+ points',
    icon: '🏆',
    pointsRequired: 1000,
    category: 'points'
  },
  {
    id: 'points_legend',
    name: 'Fitness Legend',
    description: 'Earn 5000+ points',
    icon: '👑',
    pointsRequired: 5000,
    category: 'points'
  },

  // Streak-based achievements
  {
    id: 'first_streak',
    name: 'Consistency Starter',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    streakRequired: 3,
    category: 'streak'
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    streakRequired: 7,
    category: 'streak'
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '🎯',
    streakRequired: 30,
    category: 'streak'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Maintain a 100-day streak',
    icon: '🚀',
    streakRequired: 100,
    category: 'streak'
  },

  // Activity-based achievements
  {
    id: 'first_workout',
    name: 'First Workout',
    description: 'Log your first workout',
    icon: '💪',
    activityCountRequired: 1,
    category: 'activity'
  },
  {
    id: 'active_achiever',
    name: 'Active Achiever',
    description: 'Log 50 workouts',
    icon: '🏃‍♀️',
    activityCountRequired: 50,
    category: 'activity'
  },
  {
    id: 'fitness_fanatic',
    name: 'Fitness Fanatic',
    description: 'Log 200 workouts',
    icon: '🏋️‍♂️',
    activityCountRequired: 200,
    category: 'activity'
  },

  // Special achievements
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete morning workouts',
    icon: '🌅',
    category: 'special'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete evening workouts',
    icon: '🌙',
    category: 'special'
  },
  {
    id: 'challenge_master',
    name: 'Challenge Master',
    description: 'Complete 10 challenges',
    icon: '🎖️',
    category: 'special'
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Interact with AI coach 50 times',
    icon: '🦋',
    category: 'special'
  }
];

export interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  badge: string;
}

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Fitness Newbie',
    minPoints: 0,
    maxPoints: 99,
    benefits: ['Basic workout plans', 'AI coach access'],
    badge: '🌱'
  },
  {
    level: 2,
    name: 'Motivated Mover',
    minPoints: 100,
    maxPoints: 249,
    benefits: ['Custom challenges', 'Progress tracking'],
    badge: '🚶‍♀️'
  },
  {
    level: 3,
    name: 'Active Athlete',
    minPoints: 250,
    maxPoints: 499,
    benefits: ['Advanced workouts', 'Nutrition tips'],
    badge: '🏃‍♂️'
  },
  {
    level: 4,
    name: 'Fitness Enthusiast',
    minPoints: 500,
    maxPoints: 999,
    benefits: ['Personal trainer access', 'Group challenges'],
    badge: '💪'
  },
  {
    level: 5,
    name: 'Wellness Warrior',
    minPoints: 1000,
    maxPoints: 1999,
    benefits: ['Advanced analytics', 'Priority support'],
    badge: '⚔️'
  },
  {
    level: 6,
    name: 'Health Hero',
    minPoints: 2000,
    maxPoints: 4999,
    benefits: ['Expert consultations', 'Premium content'],
    badge: '🦸‍♀️'
  },
  {
    level: 7,
    name: 'Fitness Legend',
    minPoints: 5000,
    maxPoints: 9999,
    benefits: ['VIP status', 'Exclusive events'],
    badge: '👑'
  },
  {
    level: 8,
    name: 'Ultimate Champion',
    minPoints: 10000,
    maxPoints: Infinity,
    benefits: ['All perks unlocked', 'Hall of fame'],
    badge: '🏆'
  }
];

export const POINT_VALUES = {
  LOG_WORKOUT: 25,
  COMPLETE_CHALLENGE: 50,
  DAILY_LOGIN: 10,
  FIRST_WORKOUT_OF_DAY: 15,
  STREAK_BONUS: 5, // per day in streak
  PERFECT_WEEK: 100,
  AI_INTERACTION: 5,
  TRAINER_REQUEST: 50,
  PROFILE_UPDATE: 20,
  SHARE_ACHIEVEMENT: 30
};

// Utility functions
export function getUserLevel(points: number): Level {
  return LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
}

export function getNextLevel(points: number): Level | null {
  const currentLevel = getUserLevel(points);
  const nextLevelIndex = LEVELS.findIndex(level => level.level === currentLevel.level) + 1;
  return nextLevelIndex < LEVELS.length ? LEVELS[nextLevelIndex] : null;
}

export function getProgressToNextLevel(points: number): number {
  const nextLevel = getNextLevel(points);
  if (!nextLevel) return 100; // Max level reached
  
  const currentLevel = getUserLevel(points);
  const progressPoints = points - currentLevel.minPoints;
  const totalPointsNeeded = nextLevel.minPoints - currentLevel.minPoints;
  
  return Math.round((progressPoints / totalPointsNeeded) * 100);
}

export function checkForNewAchievements(
  user: { points: number; streak: number; activityLog: any[]; achievements: string[] },
  newActivity?: any
): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  for (const achievement of ACHIEVEMENTS) {
    // Skip if already earned
    if (user.achievements.includes(achievement.id)) continue;
    
    let earned = false;
    
    switch (achievement.category) {
      case 'points':
        earned = achievement.pointsRequired ? user.points >= achievement.pointsRequired : false;
        break;
      case 'streak':
        earned = achievement.streakRequired ? user.streak >= achievement.streakRequired : false;
        break;
      case 'activity':
        earned = achievement.activityCountRequired ? user.activityLog.length >= achievement.activityCountRequired : false;
        break;
      case 'special':
        // Custom logic for special achievements
        if (achievement.id === 'early_bird' && newActivity) {
          const hour = new Date().getHours();
          earned = hour >= 5 && hour <= 10;
        } else if (achievement.id === 'night_owl' && newActivity) {
          const hour = new Date().getHours();
          earned = hour >= 20 || hour <= 4;
        }
        break;
    }
    
    if (earned) {
      newAchievements.push(achievement);
    }
  }
  
  return newAchievements;
}

export function calculateStreakBonus(streak: number): number {
  return Math.floor(streak / 7) * 25; // Bonus every 7 days
}

export function getMotivationalMessage(points: number, streak: number): string {
  const messages = [
    `Amazing! You're at ${points} points and a ${streak}-day streak! 🔥`,
    `Keep it up! You're ${getUserLevel(points).name} level! 💪`,
    `Your consistency is inspiring! ${streak} days strong! ⭐`,
    `You're crushing your fitness goals! ${points} points earned! 🚀`,
    `What an achievement! Level ${getUserLevel(points).level} warrior! 🏆`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

export default {
  ACHIEVEMENTS,
  LEVELS,
  POINT_VALUES,
  getUserLevel,
  getNextLevel,
  getProgressToNextLevel,
  checkForNewAchievements,
  calculateStreakBonus,
  getMotivationalMessage
};