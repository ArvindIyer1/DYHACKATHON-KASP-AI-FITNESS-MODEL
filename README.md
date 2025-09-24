# 🏋️‍♂️ KASP AI FITNESS MODEL - DY HACKATHON

**A Complete AI-Powered Fitness Application with Gamification & Smart Coaching**

## 🚀 Features

### ✨ **Core Functionality**
- 🤖 **AI Fitness Chatbot** - Intelligent personal trainer with external API integration
- 🎮 **Gamification System** - Points, levels, achievements, and progress tracking
- 📅 **Smart Calendar** - Interactive schedule with workout planning and events
- 🏆 **Achievement System** - Unlock badges and milestones
- 📊 **Progress Dashboard** - Comprehensive fitness analytics

### 🔐 **Modern Authentication**
- 🌐 **Google OAuth** - One-click sign in with Google accounts
- 🔑 **Email/Password** - Traditional authentication system
- 👤 **User Profiles** - Personalized fitness journeys

### 💪 **Workout Management**
- 📋 **Custom Workout Plans** - Personalized exercise routines
- ⏰ **Schedule Management** - Plan and track workout sessions
- 📈 **Activity Logging** - Record and monitor fitness activities
- 🎯 **Goal Setting** - Set and achieve fitness objectives

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.3, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui Components
- **Authentication**: NextAuth.js with Google OAuth
- **State Management**: React Context API
- **AI Integration**: External webhook API with fallback system
- **Development**: Turbopack, ESLint, TypeScript

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArvindIyer1/DYHACKATHON-KASP-AI-FITNESS-MODEL.git
   cd DYHACKATHON-KASP-AI-FITNESS-MODEL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:9002
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_EXTERNAL_CHATBOT_URL=your-chatbot-api-url
   NEXT_PUBLIC_ENABLE_EXTERNAL_CHATBOT=true
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:9002`

## 🧪 Test Accounts

| Email | Password | Features |
|-------|----------|----------|
| `john@example.com` | `password123` | Complete workout plan, advanced features |
| `Random@gmail.com` | `random123` | Beginner plan, calendar events |
| `demo@example.com` | `demo123` | Basic demo account |
| Google OAuth | - | Sign in with your Google account |

## 📱 App Structure

```
src/
├── app/
│   ├── dashboard/           # Main dashboard pages
│   │   ├── schedule/        # Calendar & workout scheduling
│   │   ├── ai-coach/        # AI chatbot interface
│   │   ├── achievements/    # Gamification achievements
│   │   └── ...
│   ├── login/               # Authentication pages
│   └── api/auth/            # NextAuth API routes
├── components/
│   ├── fitness-chatbot.tsx  # AI coach component
│   ├── ui/                  # Reusable UI components
│   └── ...
├── context/
│   └── user-context.tsx    # User state management
├── lib/
│   ├── data.ts             # Sample data & test accounts
│   ├── gamification.ts     # Gamification logic
│   └── types.ts            # TypeScript definitions
└── ...
```

## 🎮 Gamification Features

- **🌟 XP Points System** - Earn points for activities and achievements
- **📈 Level Progression** - Advance through fitness levels
- **🏅 Achievement Badges** - Unlock special accomplishments
- **🔥 Streak Tracking** - Maintain daily workout streaks
- **🏆 Leaderboards** - Compete with other users
- **🎯 Challenges** - Complete daily and weekly challenges

## 🤖 AI Chatbot Features

- **💬 Natural Conversations** - Chat naturally about fitness goals
- **📋 Workout Logging** - Voice/text workout recording
- **🎯 Challenge Suggestions** - AI-powered daily challenges
- **💪 Motivation & Tips** - Personalized encouragement
- **🌐 External API Integration** - Connect to advanced AI services
- **🔄 Fallback System** - Local responses when external API unavailable

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:9002/api/auth/callback/google`

### External Chatbot Integration
- Set `NEXT_PUBLIC_EXTERNAL_CHATBOT_URL` to your chatbot API endpoint
- Enable with `NEXT_PUBLIC_ENABLE_EXTERNAL_CHATBOT=true`
- The app gracefully falls back to local responses if external API fails

## 🚀 Deployment

The app is ready for deployment on platforms like:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Docker containers**

Make sure to update environment variables for production!

## 🤝 Contributing

This is a hackathon project! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🏆 Hackathon Info

**Event**: DY Hackathon  
**Team**: KASP AI Fitness Model  
**Category**: AI/ML & Health Tech  

---

Built with ❤️ for fitness enthusiasts and AI innovation!
