import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeWellnessData } from '@/ai/flows/summarize-wellness-data';
import { Bot } from 'lucide-react';

// This is a placeholder for getting user data on the server.
// In a real app, this would come from a database via a session.
import { users } from '@/lib/data';

async function getSummary() {
  // We'll just use the first user for this server component example.
  const user = users[0];
  if (!user || user.activityLog.length === 0) {
    return "Log some activities to get your first AI-powered summary!";
  }
  
  const wellnessDataString = user.activityLog
    .map(log => `On ${log.date}, activity: ${log.activity}, duration: ${log.duration} mins, intensity: ${log.intensity}.`)
    .join('\n');
    
  try {
    const result = await summarizeWellnessData({ wellnessData: wellnessDataString });
    return result.summary;
  } catch (error) {
    console.error("Error fetching AI summary:", error);
    return "Could not generate summary at this time. Please try again later.";
  }
}

export async function ProgressSummary() {
  const summary = await getSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            AI Progress Summary
        </CardTitle>
        <CardDescription>An AI-generated look at your recent progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}
