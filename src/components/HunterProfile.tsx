
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface StatProps {
  label: string;
  value: number;
  maxValue: number;
}

const StatBar = ({ label, value, maxValue }: StatProps) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span>{value}/{maxValue}</span>
    </div>
    <Progress value={(value / maxValue) * 100} className="h-2 bg-secondary" />
  </div>
);

interface HunterProfileProps {
  name: string;
  level: number;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation';
  xp: number;
  xpToNextLevel: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    stamina: number;
  };
  maxStats: {
    strength: number;
    agility: number;
    intelligence: number;
    stamina: number;
  };
  avatarUrl?: string;
}

export default function HunterProfile({
  name,
  level,
  rank,
  xp,
  xpToNextLevel,
  stats,
  maxStats,
  avatarUrl,
}: HunterProfileProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="relative pb-0">
        <div className="absolute top-2 right-2">
          <div className={`rank rank-${rank.toLowerCase()}`}>{rank}-Rank</div>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-accent animate-pulse-shadow mb-4">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-secondary text-3xl font-bold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl mb-1 text-glow">{name}</CardTitle>
          <div className="text-sm text-muted-foreground">Level {level} Hunter</div>
        </div>
      </CardHeader>
      <CardContent className="mt-6 space-y-6">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Experience</span>
            <span>{xp}/{xpToNextLevel}</span>
          </div>
          <Progress
            value={(xp / xpToNextLevel) * 100}
            className="h-3 bg-secondary"
          />
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Hunter Stats</h3>
          <StatBar label="Strength" value={stats.strength} maxValue={maxStats.strength} />
          <StatBar label="Agility" value={stats.agility} maxValue={maxStats.agility} />
          <StatBar label="Intelligence" value={stats.intelligence} maxValue={maxStats.intelligence} />
          <StatBar label="Stamina" value={stats.stamina} maxValue={maxStats.stamina} />
        </div>
      </CardContent>
      <CardFooter className="bg-black/20 flex justify-between text-sm">
        <div>Quests Completed: 5</div>
        <div>Gates Cleared: 2</div>
      </CardFooter>
    </Card>
  );
}
