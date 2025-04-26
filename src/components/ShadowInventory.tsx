
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface ShadowSoldierProps {
  name: string;
  level: number;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  type: string;
  imageUrl?: string;
  selected?: boolean;
  onClick?: () => void;
}

function ShadowSoldier({ name, level, rank, type, imageUrl, selected, onClick }: ShadowSoldierProps) {
  return (
    <div
      className={cn(
        "relative flex items-center space-x-4 rounded-md p-2 cursor-pointer transition-all",
        selected
          ? "bg-accent/30 border border-accent/50"
          : "hover:bg-accent/10 border border-transparent"
      )}
      onClick={onClick}
    >
      <Avatar className={cn(
        "w-12 h-12 border-2",
        selected ? "border-accent animate-pulse-shadow" : "border-white/10"
      )}>
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="bg-secondary/50 shadow-soldier">{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="font-medium text-sm">{name}</div>
          <Badge className={`rank rank-${rank.toLowerCase()}`}>{rank}</Badge>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between mt-1">
          <span>{type}</span>
          <span>Lv.{level}</span>
        </div>
      </div>
    </div>
  );
}

interface ShadowInventoryProps {
  shadows: Array<{
    id: string;
    name: string;
    level: number;
    rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
    type: string;
    imageUrl?: string;
  }>;
  capacity: number;
  selectedShadowId?: string;
  onSelectShadow: (id: string) => void;
}

export default function ShadowInventory({ shadows, capacity, selectedShadowId, onSelectShadow }: ShadowInventoryProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-shadow">Shadow Storage</CardTitle>
          <Badge variant="outline" className="bg-black/30">
            {shadows.length}/{capacity}
          </Badge>
        </div>
        <CardDescription>Select a shadow soldier to deploy</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-2">
            {shadows.map((shadow) => (
              <ShadowSoldier
                key={shadow.id}
                name={shadow.name}
                level={shadow.level}
                rank={shadow.rank}
                type={shadow.type}
                imageUrl={shadow.imageUrl}
                selected={shadow.id === selectedShadowId}
                onClick={() => onSelectShadow(shadow.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
