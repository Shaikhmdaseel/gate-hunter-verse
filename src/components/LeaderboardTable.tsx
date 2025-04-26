
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Hunter {
  id: string;
  rank: number;
  name: string;
  hunterRank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Nation';
  level: number;
  gatesCleared: number;
  guild?: string;
  avatarUrl?: string;
}

interface LeaderboardTableProps {
  hunters: Hunter[];
  title?: string;
}

export default function LeaderboardTable({ hunters, title = "Hunter Rankings" }: LeaderboardTableProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Hunter</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead className="text-right">Gates</TableHead>
              <TableHead className="text-right">Guild</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hunters.map((hunter) => (
              <TableRow key={hunter.id} className="border-white/5 hover:bg-accent/5">
                <TableCell className="font-medium">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${hunter.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                      hunter.rank === 2 ? 'bg-slate-300/20 text-slate-300' : 
                      hunter.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-secondary/50'}
                  `}>
                    {hunter.rank}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={hunter.avatarUrl} />
                      <AvatarFallback className="bg-secondary/50 text-xs">
                        {hunter.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{hunter.name}</span>
                  </div>
                </TableCell>
                <TableCell>{hunter.level}</TableCell>
                <TableCell>
                  <span className={`rank rank-${hunter.hunterRank.toLowerCase()}`}>
                    {hunter.hunterRank}
                  </span>
                </TableCell>
                <TableCell className="text-right">{hunter.gatesCleared}</TableCell>
                <TableCell className="text-right">
                  {hunter.guild ? (
                    <span className="px-2 py-1 bg-black/30 rounded text-xs">
                      {hunter.guild}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">None</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
