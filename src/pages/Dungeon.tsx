
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ThreeDungeon from '@/components/ThreeDungeon';
import ShadowInventory from '@/components/ShadowInventory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Clock, User } from 'lucide-react';

// Mock data for shadows
const shadowsData = [
  { id: '1', name: 'Iron', level: 12, rank: 'C' as const, type: 'Knight', },
  { id: '2', name: 'Tank', level: 10, rank: 'D' as const, type: 'Soldier', },
  { id: '3', name: 'Igris', level: 20, rank: 'B' as const, type: 'Knight', },
  { id: '4', name: 'Beru', level: 30, rank: 'A' as const, type: 'Ant', },
  { id: '5', name: 'Tusk', level: 15, rank: 'C' as const, type: 'Beast', },
  { id: '6', name: 'Greed', level: 14, rank: 'C' as const, type: 'Demon', },
];

// Available dungeons
const availableDungeons = [
  {
    id: '1',
    name: 'Abandoned Mine',
    description: 'A dark mine filled with low-level monsters.',
    rank: 'D' as const,
    minLevel: 5,
    recommendedLevel: 8,
    timeLimit: 60, // minutes
    rewards: {
      xp: 300,
      items: ['Basic Health Potion', 'Copper Ore'],
    }
  },
  {
    id: '2',
    name: 'Haunted Forest',
    description: 'A forest haunted by restless spirits.',
    rank: 'C' as const,
    minLevel: 10,
    recommendedLevel: 15,
    timeLimit: 120, // minutes
    rewards: {
      xp: 500,
      items: ['Magic Crystal', 'Enchanted Wood'],
    }
  },
  {
    id: '3',
    name: 'Demon\'s Lair',
    description: 'Home to a powerful demon and its minions.',
    rank: 'B' as const,
    minLevel: 20,
    recommendedLevel: 25,
    timeLimit: 180, // minutes
    rewards: {
      xp: 1000,
      items: ['Demon Core', 'Corrupted Essence'],
    }
  },
];

// Active dungeon progress state
interface ActiveDungeonState {
  dungeonId: string;
  progress: number;
  timeRemaining: number;
  selectedShadows: string[];
}

const DungeonPage = () => {
  const [selectedTab, setSelectedTab] = useState('available');
  const [selectedShadowId, setSelectedShadowId] = useState<string>();
  const [selectedShadows, setSelectedShadows] = useState<string[]>([]);
  const [activeDungeon, setActiveDungeon] = useState<ActiveDungeonState | null>(null);
  
  // Handle shadow selection
  const handleSelectShadow = (id: string) => {
    if (selectedShadows.includes(id)) {
      setSelectedShadows(prev => prev.filter(shadowId => shadowId !== id));
    } else if (selectedShadows.length < 3) {
      setSelectedShadows(prev => [...prev, id]);
    } else {
      toast({
        title: "Shadow Limit Reached",
        description: "You can only select up to 3 shadow soldiers.",
        variant: "destructive",
      });
    }
    setSelectedShadowId(id);
  };
  
  // Start dungeon raid
  const handleStartDungeon = (dungeonId: string) => {
    const dungeon = availableDungeons.find(d => d.id === dungeonId);
    
    if (!dungeon) return;
    
    if (selectedShadows.length === 0) {
      toast({
        title: "No Shadows Selected",
        description: "You must select at least one shadow soldier.",
        variant: "destructive",
      });
      return;
    }
    
    setActiveDungeon({
      dungeonId,
      progress: 0,
      timeRemaining: dungeon.timeLimit * 60, // convert to seconds
      selectedShadows,
    });
    
    setSelectedTab('active');
    
    toast({
      title: "Dungeon Raid Started",
      description: `You have entered ${dungeon.name}. Good luck!`,
    });
    
    // Simulate dungeon progress
    const progressInterval = setInterval(() => {
      setActiveDungeon(prev => {
        if (!prev) return null;
        
        const newProgress = prev.progress + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          clearInterval(timeInterval);
          
          toast({
            title: "Dungeon Cleared!",
            description: `You have successfully cleared ${dungeon.name} and earned ${dungeon.rewards.xp} XP!`,
          });
          
          return null;
        }
        
        return {
          ...prev,
          progress: newProgress,
        };
      });
    }, 3000);
    
    // Simulate time countdown
    const timeInterval = setInterval(() => {
      setActiveDungeon(prev => {
        if (!prev) return null;
        
        const newTimeRemaining = prev.timeRemaining - 1;
        if (newTimeRemaining <= 0) {
          clearInterval(timeInterval);
          clearInterval(progressInterval);
          
          toast({
            title: "Dungeon Failed",
            description: "You ran out of time. The gate has closed.",
            variant: "destructive",
          });
          
          return null;
        }
        
        return {
          ...prev,
          timeRemaining: newTimeRemaining,
        };
      });
    }, 1000);
  };
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getActiveDungeon = () => {
    if (!activeDungeon) return null;
    return availableDungeons.find(d => d.id === activeDungeon.dungeonId);
  };
  
  const activeDungeonData = getActiveDungeon();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-glow">Dungeon Gates</h1>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="available" className="data-[state=active]:bg-accent/20">Available Gates</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-accent/20">Active Raid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shadow Selection */}
              <div className="col-span-1">
                <Card className="glass-card h-full">
                  <CardHeader>
                    <CardTitle>Shadow Army</CardTitle>
                    <CardDescription>
                      Select up to 3 shadows to accompany you
                      {selectedShadows.length > 0 && ` (${selectedShadows.length}/3)`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ShadowInventory
                      shadows={shadowsData}
                      capacity={10}
                      selectedShadowId={selectedShadowId}
                      onSelectShadow={handleSelectShadow}
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Available Dungeons */}
              <div className="col-span-1 lg:col-span-2">
                <div className="space-y-4">
                  {availableDungeons.map((dungeon) => (
                    <Card key={dungeon.id} className="glass-card overflow-hidden">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{dungeon.name}</CardTitle>
                          <Badge className={`rank rank-${dungeon.rank.toLowerCase()}`}>{dungeon.rank}-Rank</Badge>
                        </div>
                        <CardDescription>{dungeon.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Level Requirement</div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              <span>{dungeon.minLevel}+</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Time Limit</div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{dungeon.timeLimit} minutes</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Rewards</div>
                            <div>
                              <div className="text-accent">{dungeon.rewards.xp} XP</div>
                              <div className="text-xs text-muted-foreground">
                                + {dungeon.rewards.items.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6">
                        <Button 
                          onClick={() => handleStartDungeon(dungeon.id)} 
                          className="w-full portal-hover bg-accent/80 hover:bg-accent"
                          disabled={selectedShadows.length === 0}
                        >
                          Enter Gate
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            {activeDungeon && activeDungeonData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2">
                  <ThreeDungeon 
                    gateLevel={activeDungeonData.rank}
                    timeRemaining={activeDungeon.timeRemaining}
                  />
                  
                  <Card className="glass-card mt-4">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold mb-2">{activeDungeonData.name}</h3>
                          <p className="text-muted-foreground">{activeDungeonData.description}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Raid Progress</span>
                            <span>{activeDungeon.progress}%</span>
                          </div>
                          <Progress value={activeDungeon.progress} className="h-3 bg-secondary" />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Time Remaining: {formatTime(activeDungeon.timeRemaining)}</span>
                          </div>
                          <Badge className={`rank rank-${activeDungeonData.rank.toLowerCase()}`}>
                            {activeDungeonData.rank}-Rank
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="col-span-1">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Deployed Shadows</CardTitle>
                      <CardDescription>Your shadow army is fighting alongside you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activeDungeon.selectedShadows.map((shadowId) => {
                        const shadow = shadowsData.find(s => s.id === shadowId);
                        if (!shadow) return null;
                        
                        return (
                          <div 
                            key={shadow.id} 
                            className="flex items-center space-x-4 p-3 rounded-md bg-accent/10 border border-accent/20"
                          >
                            <div className="h-10 w-10 rounded-full bg-secondary/50 shadow-soldier flex items-center justify-center text-white font-bold">
                              {shadow.name.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium">{shadow.name}</div>
                              <div className="text-xs text-muted-foreground flex justify-between">
                                <span>{shadow.type}</span>
                                <span className="ml-4">Lv.{shadow.level}</span>
                              </div>
                            </div>
                            <Badge className={`ml-auto rank rank-${shadow.rank.toLowerCase()}`}>{shadow.rank}</Badge>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card mt-4">
                    <CardHeader>
                      <CardTitle>Expected Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 rounded-md bg-accent/10 border border-accent/20">
                          <div className="text-lg font-medium text-accent">{activeDungeonData.rewards.xp} XP</div>
                          <div className="text-sm text-muted-foreground">Experience Points</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-2">Possible Items:</div>
                          <div className="space-y-2">
                            {activeDungeonData.rewards.items.map((item, index) => (
                              <div key={index} className="p-2 rounded-md bg-black/20 text-sm">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-bold mb-2">No Active Dungeon</h3>
                  <p className="text-muted-foreground mb-6">You are not currently in any dungeon</p>
                  <Button onClick={() => setSelectedTab('available')} className="portal-hover bg-accent/80 hover:bg-accent">
                    View Available Gates
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DungeonPage;
