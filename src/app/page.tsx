"use client";

import {useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {generatePauseMessage} from "@/ai/flows/generate-pause-message";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const youtubeURL = "www.youtube.com";

export default function Home() {
  const [category, setCategory] = useState<string>('Environment');
  const [message, setMessage] = useState<string>('Choose a category to generate a message.');
  const [isYouTubeDetected, setYouTubeDetected] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    const currentURL = window.location.hostname;
    if (currentURL.includes(youtubeURL)) {
      setYouTubeDetected(true);
      setIsCountdownActive(true);
    }

    // Prevent YouTube from loading initially
    if (isYouTubeDetected) {
      window.stop(); // This may not fully prevent loading in modern browsers
    }

    let intervalId: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
      setYouTubeDetected(false); // Allow YouTube to load
    }

    return () => clearInterval(intervalId);
  }, [countdown, isCountdownActive, isYouTubeDetected]);

  const handleGenerateMessage = async () => {
    const result = await generatePauseMessage({category: category});
    setMessage(result.message);
  };

  if (!isYouTubeDetected) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-xl rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Pause for a Cause</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Take a moment to reflect.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium leading-none">
              Category
            </label>
            <Select onValueChange={setCategory} defaultValue={category}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Social Justice">Social Justice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleGenerateMessage}>Generate Message</Button>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-secondary">{message}</p>
          </div>
          <div className="text-center">
            <p className={cn("text-4xl font-bold text-accent", countdown === 0 && "text-green-500")}>
              {countdown > 0 ? `Unblocking in: ${countdown}` : 'YouTube Unblocked!'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
