"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useUser } from "@/context/user-context";
import { useMemo } from "react";
import { Activity } from "lucide-react";

const chartConfig = {
  duration: {
    label: "Minutes",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ActivityChart() {
  const { currentUser } = useUser();

  const chartData = useMemo(() => {
    if (!currentUser || !currentUser.activityLog) return [];
    
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayLogs = currentUser.activityLog.filter(log => log.date === date);
      const totalDuration = dayLogs.reduce((sum, log) => sum + log.duration, 0);
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        duration: totalDuration,
      };
    });
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Weekly Activity
        </CardTitle>
        <CardDescription>Your workout duration over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              dataKey="duration"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              unit="m"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="duration" fill="var(--color-duration)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
