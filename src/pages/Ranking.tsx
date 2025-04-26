
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for hunter rankings
const hunterRankings = [
  {
    id: '1',
    rank: 1,
    name: 'Choi Jong-In',
    hunterRank: 'S' as const,
    level: 45,
    gatesCleared: 53,
    guild: 'White Tiger',
  },
  {
    id: '2',
    rank: 2,
    name: 'Baek Yoonho',
    hunterRank: 'S' as const,
    level: 42,
    gatesCleared: 48,
    guild: 'White Tiger',
  },
  {
    id: '3',
    rank: 3,
    name: 'Cha Hae-In',
    hunterRank: 'S' as const,
    level: 40,
    gatesCleared: 45,
    guild: "Hunter's Guild",
  },
  {
    id: '4',
    rank: 4,
    name: 'Woo Jinchul',
    hunterRank: 'S' as const,
    level: 38,
    gatesCleared: 42,
    guild: 'Knight Guild',
  },
  {
    id: '5',
    rank: 5,
    name: 'Min Byung-Gu',
    hunterRank: 'A' as const,
    level: 35,
    gatesCleared: 37,
    guild: "Hunter's Guild",
  },
  {
    id: '6',
    rank: 6,
    name: 'Hwang Dongsoo',
    hunterRank: 'A' as const,
    level: 33,
    gatesCleared: 35,
    guild: 'Scavenger Guild',
  },
  {
    id: '7',
    rank: 7,
    name: 'Lim Tae-Gyu',
    hunterRank: 'B' as const,
    level: 28,
    gatesCleared: 30,
    guild: null,
  },
  {
    id: '8',
    rank: 8,
    name: 'Go Gunhee',
    hunterRank: 'A' as const,
    level: 27,
    gatesCleared: 28,
    guild: 'Hunter Association',
  },
  {
    id: '9',
    rank: 9,
    name: 'Yoo Jinho',
    hunterRank: 'C' as const,
    level: 20,
    gatesCleared: 15,
    guild: null,
  },
  {
    id: '10',
    rank: 10,
    name: 'Sung Jin-Woo',
    hunterRank: 'E' as const,
    level: 8,
    gatesCleared: 2,
    guild: null,
  },
];

// Mock data for guild rankings
const guildRankings = [
  {
    id: '1',
    name: 'White Tiger',
    rank: 1,
    members: 32,
    avgRank: 'S',
    totalGatesCleared: 582,
    topHunter: 'Choi Jong-In',
  },
  {
    id: '2',
    name: "Hunter's Guild",
    rank: 2,
    members: 45,
    avgRank: 'A',
    totalGatesCleared: 521,
    topHunter: 'Cha Hae-In',
  },
  {
    id: '3',
    name: 'Knight Guild',
    rank: 3,
    members: 29,
    avgRank: 'A',
    totalGatesCleared: 483,
    topHunter: 'Woo Jinchul',
  },
  {
    id: '4',
    name: 'Scavenger Guild',
    rank: 4,
    members: 38,
    avgRank: 'B',
    totalGatesCleared: 415,
    topHunter: 'Hwang Dongsoo',
  },
  {
    id: '5',
    name: 'Hunter Association',
    rank: 5,
    members: 56,
    avgRank: 'B',
    totalGatesCleared: 387,
    topHunter: 'Go Gunhee',
  },
];

const RankingPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-glow">Rankings</h1>
        
        <Card className="glass-card bg-gradient-to-r from-black/40 to-accent/10 border-accent/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-1">Your Current Rank</h2>
                <p className="text-muted-foreground">You are currently ranked #10 among all hunters</p>
              </div>
              <div className="text-7xl font-bold text-glow">#10</div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="hunters" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="hunters" className="data-[state=active]:bg-accent/20">Hunters</TabsTrigger>
            <TabsTrigger value="guilds" className="data-[state=active]:bg-accent/20">Guilds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hunters" className="mt-0">
            <LeaderboardTable hunters={hunterRankings} title="Top Hunters" />
          </TabsContent>
          
          <TabsContent value="guilds" className="mt-0">
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Top Guilds</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Guild</th>
                      <th className="text-left py-3 px-4">Members</th>
                      <th className="text-left py-3 px-4">Avg. Rank</th>
                      <th className="text-right py-3 px-4">Gates Cleared</th>
                      <th className="text-right py-3 px-4">Top Hunter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guildRankings.map((guild) => (
                      <tr key={guild.id} className="border-b border-white/5 hover:bg-accent/5">
                        <td className="py-3 px-4">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            ${guild.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                              guild.rank === 2 ? 'bg-slate-300/20 text-slate-300' : 
                              guild.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-secondary/50'}
                          `}>
                            {guild.rank}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{guild.name}</td>
                        <td className="py-3 px-4">{guild.members}</td>
                        <td className="py-3 px-4">
                          <span className={`rank rank-${guild.avgRank.toLowerCase()}`}>
                            {guild.avgRank}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">{guild.totalGatesCleared}</td>
                        <td className="py-3 px-4 text-right">{guild.topHunter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RankingPage;
