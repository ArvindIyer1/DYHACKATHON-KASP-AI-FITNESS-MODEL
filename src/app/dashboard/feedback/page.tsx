
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquareQuote } from 'lucide-react';
import { submitFeedback } from '@/ai/flows/submit-feedback';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim().length < 10) {
      toast({
        title: 'Feedback too short',
        description: 'Please provide at least 10 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await submitFeedback({ feedbackText: feedback });
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for helping us improve!',
      });
      setFeedback('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: 'Submission Error',
        description: 'Could not submit your feedback. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <MessageSquareQuote className="w-8 h-8" />
          Submit Feedback
        </h1>
        <p className="text-muted-foreground">
          We value your opinion. Let us know how we can improve Synergy Life.
        </p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Your Feedback</CardTitle>
            <CardDescription>
              Have a suggestion, found a bug, or want to share a success story? We'd love to hear it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              minLength={10}
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Feedback
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
