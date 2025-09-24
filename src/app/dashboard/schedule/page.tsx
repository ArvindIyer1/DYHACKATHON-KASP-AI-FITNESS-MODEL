
"use client";

import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, CheckCircle, Target, Coffee, Dumbbell, Book, Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Calendar as CalendarPicker } from "@/components/ui/calendar";


// Random events/todos for the calendar
const generateRandomEvents = () => {
    const events = [
        { id: '1', title: 'Morning Jog', time: '7:00 AM', type: 'workout', icon: Dumbbell, color: 'bg-blue-500' },
        { id: '2', title: 'Team Meeting', time: '10:00 AM', type: 'work', icon: Coffee, color: 'bg-gray-500' },
        { id: '3', title: 'Lunch Break', time: '12:30 PM', type: 'meal', icon: Heart, color: 'bg-green-500' },
        { id: '4', title: 'Gym Session', time: '6:00 PM', type: 'workout', icon: Dumbbell, color: 'bg-red-500' },
        { id: '5', title: 'Read a Book', time: '8:00 PM', type: 'personal', icon: Book, color: 'bg-purple-500' },
        { id: '6', title: 'Meditation', time: '9:00 PM', type: 'wellness', icon: Heart, color: 'bg-pink-500' },
        { id: '7', title: 'Grocery Shopping', time: '2:00 PM', type: 'task', icon: CheckCircle, color: 'bg-yellow-500' },
        { id: '8', title: 'Yoga Class', time: '8:00 AM', type: 'workout', icon: Target, color: 'bg-indigo-500' },
        { id: '9', title: 'Call Mom', time: '3:00 PM', type: 'personal', icon: Heart, color: 'bg-rose-500' },
        { id: '10', title: 'Meal Prep', time: '5:00 PM', type: 'meal', icon: CheckCircle, color: 'bg-orange-500' },
    ];
    
    // Generate events for the current week
    const today = new Date();
    const weekEvents: { [key: string]: typeof events } = {};
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Randomly assign 2-4 events per day
        const dailyEvents = events
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 3) + 2);
        
        weekEvents[dateStr] = dailyEvents;
    }
    
    return weekEvents;
};

export default function SchedulePage() {
    const { currentUser } = useUser();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [events] = useState(generateRandomEvents());
    
    const timeSlots = ["07:00", "08:00", "09:00", "10:00", "12:00", "14:00", "17:00", "18:00", "20:00"];
    
    // Get today's date and the next 6 days
    const today = new Date();
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        weekDays.push(date);
    }
    
    const getEventsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return events[dateStr] || [];
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">📅 My Schedule & Calendar</h1>
                <p className="text-muted-foreground">Your weekly events, workouts, and todos all in one place</p>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar Widget */}
                <Card className="bg-card/80 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Calendar
                        </CardTitle>
                        <CardDescription>Click on a date to see events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CalendarPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border w-full"
                        />
                    </CardContent>
                </Card>

                {/* Selected Date Events */}
                <Card className="bg-card/80 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Events for {selectedDate?.toLocaleDateString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                            getEventsForDate(selectedDate).map((event, index) => {
                                const IconComponent = event.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <div className={`p-2 rounded-full ${event.color} text-white`}>
                                            <IconComponent className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{event.title}</p>
                                            <p className="text-sm text-muted-foreground">{event.time}</p>
                                        </div>
                                        <Badge variant="secondary" className="capitalize">
                                            {event.type}
                                        </Badge>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-muted-foreground text-center py-8">
                                No events scheduled for this date
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Weekly Overview */}
            <div>
                <h2 className="text-xl font-semibold mb-4">📊 Week Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {weekDays.map((day, index) => {
                        const dayEvents = getEventsForDate(day);
                        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayDate = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        
                        return (
                            <Card key={index} className="bg-card/60 backdrop-blur-sm border-white/10">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium">
                                        {dayName} {dayDate}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {dayEvents.length > 0 ? (
                                        dayEvents.slice(0, 3).map((event, eventIndex) => {
                                            const IconComponent = event.icon;
                                            return (
                                                <div key={eventIndex} className="flex items-center gap-2 text-sm">
                                                    <div className={`p-1 rounded-full ${event.color} text-white`}>
                                                        <IconComponent className="h-3 w-3" />
                                                    </div>
                                                    <span className="font-medium truncate">{event.title}</span>
                                                    <span className="text-xs text-muted-foreground ml-auto">
                                                        {event.time.split(' ')[0]}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-xs text-muted-foreground">Free day</p>
                                    )}
                                    {dayEvents.length > 3 && (
                                        <p className="text-xs text-muted-foreground">
                                            +{dayEvents.length - 3} more events
                                        </p>
                                    )}
                                </CardContent>
                                <CardFooter className="pt-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="w-full">
                                                Add Event
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Event for {dayName} {dayDate}</DialogTitle>
                                                <DialogDescription>
                                                    Schedule a new event, workout, or reminder.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Select Time</label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {timeSlots.map(time => (
                                                            <Button 
                                                                key={time}
                                                                variant={selectedTime === time ? "default" : "outline"}
                                                                onClick={() => setSelectedTime(time)}
                                                                size="sm"
                                                            >
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                {time}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" disabled={!selectedTime}>
                                                    Add Event
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-4 text-center">
                        <Dumbbell className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-2xl font-bold">
                            {Object.values(events).flat().filter(e => e.type === 'workout').length}
                        </p>
                        <p className="text-sm opacity-90">Workouts</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-4 text-center">
                        <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-2xl font-bold">
                            {Object.values(events).flat().filter(e => e.type === 'task').length}
                        </p>
                        <p className="text-sm opacity-90">Tasks</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-4 text-center">
                        <Heart className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-2xl font-bold">
                            {Object.values(events).flat().filter(e => e.type === 'wellness').length}
                        </p>
                        <p className="text-sm opacity-90">Wellness</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-4 text-center">
                        <Calendar className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-2xl font-bold">
                            {Object.values(events).flat().length}
                        </p>
                        <p className="text-sm opacity-90">Total Events</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
