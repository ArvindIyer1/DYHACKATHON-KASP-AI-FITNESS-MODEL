
"use client";

import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState }
from 'react';
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { format } from 'date-fns';


export default function SchedulePage() {
    const { currentUser } = useUser();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    if (!currentUser || !currentUser.workoutPlan) {
        return (
            <div className="text-center">
                <p>No workout plan found. Go to your profile to generate one!</p>
            </div>
        );
    }
    const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00"];

    const { schedule, weeklyGoal } = currentUser.workoutPlan;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Weekly Schedule</h1>
                <p className="text-muted-foreground">{weeklyGoal}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedule.map((day, index) => (
                    <Card key={index} className="bg-card/80 backdrop-blur-sm border-white/10 flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{day.day}</span>
                                <span className="text-sm font-normal text-muted-foreground">{day.focus}</span>
                            </CardTitle>
                            <CardDescription>{day.title}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {day.exercises.map((ex, i) => (
                                    <li key={i} className="flex justify-between">
                                        <span>{ex.name}</span>
                                        <span>{ex.sets}x{ex.reps}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                         <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" className="w-full">
                                        Reschedule
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                     <DialogHeader>
                                        <DialogTitle>Reschedule: {day.title}</DialogTitle>
                                        <DialogDescription>
                                            Pick a new date and time for your workout session.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Select Date</label>
                                            <CalendarPicker
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                className="rounded-md border"
                                            />
                                        </div>
                                         <div className="space-y-2">
                                            <label className="text-sm font-medium">Select Time</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {timeSlots.map(time => (
                                                    <Button 
                                                        key={time}
                                                        variant={selectedTime === time ? "default" : "outline"}
                                                        onClick={() => setSelectedTime(time)}
                                                    >
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={!selectedDate || !selectedTime}>
                                            Confirm
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
