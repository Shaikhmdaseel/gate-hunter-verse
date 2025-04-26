
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Star } from "lucide-react";

interface QuestProps {
  title: string;
  description: string;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  reward: number;
  timeLimit?: number; // in minutes
  type: 'daily' | 'emergency' | 'story';
  progress?: number;
  onAccept?: () => void;
  onComplete?: () => void;
}

export default function QuestCard({
  title,
  description,
  difficulty,
  reward,
  timeLimit,
  type,
  progress = 0,
  onAccept,
  onComplete,
}: QuestProps) {
  const [accepted, setAccepted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : 0);
  const [completed, setCompleted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    if (onAccept) onAccept();
  };

  const handleComplete = () => {
    setCompleted(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (!accepted || !timeLimit || completed) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [accepted, timeLimit, completed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getBadgeForType = () => {
    switch (type) {
      case 'daily':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Daily</Badge>;
      case 'emergency':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500">Emergency</Badge>;
      case 'story':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Story</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`glass-card overflow-hidden transition-all duration-300 ${accepted ? 'border-accent/40' : 'hover:border-accent/30'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {getBadgeForType()}
            <Badge className={`rank rank-${difficulty.toLowerCase()}`}>{difficulty}-Rank</Badge>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accepted && !completed && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-secondary" />
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{reward} XP</span>
            </div>
            {timeLimit && accepted && !completed && (
              <div className="flex items-center space-x-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!accepted && (
          <Button onClick={handleAccept} className="w-full portal-hover bg-accent/80 hover:bg-accent">
            Accept Quest
          </Button>
        )}
        {accepted && !completed && progress >= 100 && (
          <Button onClick={handleComplete} className="w-full portal-hover bg-green-600/80 hover:bg-green-600">
            Complete Quest
          </Button>
        )}
        {completed && (
          <Button disabled className="w-full bg-secondary/50 text-muted-foreground">
            Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
