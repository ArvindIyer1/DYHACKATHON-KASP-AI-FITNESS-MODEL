"use client";

import { useUser } from '@/context/user-context';
import { useEffect, useState } from 'react';

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Believe you can and you're halfway there.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The journey of a thousand miles begins with a single step."
];

export function WelcomeHeader() {
  const { currentUser } = useUser();
  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Welcome back, {currentUser.name}!
      </h1>
      <p className="text-muted-foreground mt-1">
        {dailyQuote}
      </p>
    </div>
  );
}
