
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Video, Upload, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TrackPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: 'File too large',
          description: 'Please upload a video smaller than 50MB.',
          variant: 'destructive',
        });
        setVideoFile(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        return;
      }
      setVideoFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) {
      toast({
        title: 'No video selected',
        description: 'Please select a video file to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // In a real app, you would call your AI flow here
    // const formData = new FormData();
    // formData.append('video', videoFile);
    // const result = await analyzeWorkoutVideo(formData);
    
    const mockResult = "Analysis Complete: Great squat depth, but be mindful of keeping your chest up on ascent. Your right knee shows slight valgus collapse on the last two reps. Consider lowering the weight to focus on form.";

    setAnalysisResult(mockResult);
    setIsLoading(false);
    toast({
      title: 'Analysis Complete',
      description: 'Your workout form has been analyzed.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Video className="w-8 h-8" />
          Track Your Form
        </h1>
        <p className="text-muted-foreground">
          Upload a video of your exercise to get AI-powered feedback on your technique.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Upload Workout Video</CardTitle>
          <CardDescription>
            For best results, record from the side and ensure your full body is visible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-upload">Video File</Label>
            <Input 
                id="video-upload" 
                type="file" 
                accept="video/mp4,video/quicktime,video/x-msvideo"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file:text-foreground"
            />
          </div>
          {videoFile && (
            <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                    Selected file: <strong>{videoFile.name}</strong> ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button onClick={handleAnalyze} disabled={isLoading || !videoFile}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Form
          </Button>
          {analysisResult && (
            <Card className="w-full bg-secondary">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        AI Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{analysisResult}</p>
                </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
