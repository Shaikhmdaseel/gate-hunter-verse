
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import HunterProfile from '@/components/HunterProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Trophy, Star } from 'lucide-react';

const hunterData = {
  name: "Sung Jin-Woo",
  level: 8,
  rank: "E" as const,
  xp: 320,
  xpToNextLevel: 500,
  stats: {
    strength: 15,
    agility: 12,
    intelligence: 10,
    stamina: 20,
  },
  maxStats: {
    strength: 30,
    agility: 30,
    intelligence: 30,
    stamina: 30,
  },
};

const achievements = [
  {
    id: '1',
    title: 'First Blood',
    description: 'Defeat your first monster',
    completed: true,
    progress: 100,
    reward: 50,
  },
  {
    id: '2',
    title: 'Gate Conqueror',
    description: 'Clear 5 gates of any rank',
    completed: false,
    progress: 40,
    current: 2,
    target: 5,
    reward: 200,
  },
  {
    id: '3',
    title: 'Shadow Commander',
    description: 'Collect 10 shadow soldiers',
    completed: false,
    progress: 60,
    current: 6,
    target: 10,
    reward: 300,
  },
  {
    id: '4',
    title: 'Rank Up',
    description: 'Advance to D-Rank',
    completed: false,
    progress: 80,
    reward: 500,
  },
];

const abilities = [
  {
    id: '1',
    name: 'Stealth',
    description: 'Move quietly and remain undetected by enemies.',
    level: 2,
    maxLevel: 5,
  },
  {
    id: '2',
    name: 'Dagger Proficiency',
    description: 'Increased damage and accuracy with daggers.',
    level: 3,
    maxLevel: 5,
  },
  {
    id: '3',
    name: 'Shadow Extraction',
    description: 'Extract shadows from defeated enemies.',
    level: 1,
    maxLevel: 5,
  },
];

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-glow">Hunter Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <HunterProfile {...hunterData} />
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="achievements" className="data-[state=active]:bg-accent/20">Achievements</TabsTrigger>
                <TabsTrigger value="abilities" className="data-[state=active]:bg-accent/20">Abilities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="achievements" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-shadow">Hunter Achievements</CardTitle>
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardDescription>Complete achievements to earn rewards and recognition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-md font-medium">
                                  {achievement.title}
                                </h3>
                                {achievement.completed && (
                                  <Badge className="bg-green-500/20 text-green-500">Completed</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{achievement.reward} XP</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              {achievement.current && achievement.target ? (
                                <span>{achievement.current}/{achievement.target}</span>
                              ) : (
                                <span>{achievement.progress}%</span>
                              )}
                            </div>
                            <Progress value={achievement.progress} className="h-2 bg-secondary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="abilities" className="mt-0">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-shadow">Hunter Abilities</CardTitle>
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <CardDescription>Your currently acquired skills and abilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {abilities.map((ability) => (
                        <div key={ability.id} className="space-y-2">
                          <div>
                            <h3 className="text-md font-medium">{ability.name}</h3>
                            <p className="text-sm text-muted-foreground">{ability.description}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Level {ability.level}</span>
                              <span>{ability.level}/{ability.maxLevel}</span>
                            </div>
                            <div className="flex gap-1">
                              {Array.from({ length: ability.maxLevel }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-2 flex-1 rounded-sm ${
                                    i < ability.level ? 'bg-accent' : 'bg-secondary'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
