"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  activity: z.string().min(2, { message: "Activity name is required." }),
  date: z.date({ required_error: "A date is required." }),
  duration: z.coerce.number().min(1, { message: "Duration must be at least 1 minute." }),
  intensity: z.enum(["Low", "Medium", "High"]),
  notes: z.string().optional(),
});

export function ActivityLogForm() {
    const { currentUser, updateCurrentUser } = useUser();
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activity: "",
            date: new Date(),
            duration: 30,
            intensity: "Medium",
            notes: "",
        },
    });
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!currentUser) return;
        
        const newLog = {
            id: `log-${Date.now()}`,
            date: format(values.date, "yyyy-MM-dd"),
            activity: values.activity,
            duration: values.duration,
            intensity: values.intensity,
            notes: values.notes || "",
        };

        const updatedActivityLog = [newLog, ...currentUser.activityLog];
        
        updateCurrentUser({ 
            activityLog: updatedActivityLog,
            points: currentUser.points + 10, // Gamification
        });
        
        toast({
            title: "Activity Logged!",
            description: `Great job on the ${values.activity}!`,
        });
        form.reset();
    }
    
    return (
        <Card className="max-w-2xl">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle>New Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Activity Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Morning Run, Weightlifting" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="intensity"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Intensity</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select intensity" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="How did it feel? Any personal records?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit">Log Activity</Button>
            </CardFooter>
            </form>
        </Form>
        </Card>
    );
}
