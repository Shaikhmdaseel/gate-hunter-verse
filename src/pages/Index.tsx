
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import HunterProfile from '@/components/HunterProfile';
import ShadowInventory from '@/components/ShadowInventory';
import QuestCard from '@/components/QuestCard';
import ThreeDungeon from '@/components/ThreeDungeon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Mock data
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

const shadowsData = [
  { id: '1', name: 'Iron', level: 12, rank: 'C' as const, type: 'Knight', },
  { id: '2', name: 'Tank', level: 10, rank: 'D' as const, type: 'Soldier', },
  { id: '3', name: 'Igris', level: 20, rank: 'B' as const, type: 'Knight', },
  { id: '4', name: 'Beru', level: 30, rank: 'A' as const, type: 'Ant', },
  { id: '5', name: 'Tusk', level: 15, rank: 'C' as const, type: 'Beast', },
  { id: '6', name: 'Greed', level: 14, rank: 'C' as const, type: 'Demon', },
];

const dailyQuestsData = [
  {
    id: '1',
    title: 'Training Grounds',
    description: 'Complete a training session to improve your combat skills.',
    difficulty: 'E' as const,
    reward: 100,
    timeLimit: 60,
    type: 'daily' as const,
  },
  {
    id: '2',
    title: 'Physical Conditioning',
    description: 'Improve your physical attributes through rigorous exercise.',
    difficulty: 'E' as const,
    reward: 150,
    type: 'daily' as const,
  }
];

const emergencyQuestsData = [
  {
    id: '3',
    title: 'Gate Outbreak',
    description: 'An unexpected gate has appeared! Clear it before monsters escape.',
    difficulty: 'D' as const,
    reward: 300,
    timeLimit: 120,
    type: 'emergency' as const,
  }
];

const Index = () => {
  const [selectedShadowId, setSelectedShadowId] = useState<string>();
  const [questProgress, setQuestProgress] = useState<Record<string, number>>({});
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  
  // Handler for accepting a quest
  const handleAcceptQuest = (questId: string) => {
    setQuestProgress(prev => ({
      ...prev,
      [questId]: 0,
    }));
    
    // Simulate quest progress
    const interval = setInterval(() => {
      setQuestProgress(prev => {
        const currentProgress = prev[questId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        
        return {
          ...prev,
          [questId]: currentProgress + 20,
        };
      });
    }, 2000);
    
    toast({
      title: "Quest Accepted",
      description: "You have accepted a new quest. Complete it to earn rewards.",
    });
  };
  
  // Handler for completing a quest
  const handleCompleteQuest = (questId: string, reward: number) => {
    setCompletedQuests(prev => [...prev, questId]);
    
    toast({
      title: "Quest Completed",
      description: `You earned ${reward} XP!`,
    });
  };
  
  // Handler for selecting a shadow
  const handleSelectShadow = (id: string) => {
    setSelectedShadowId(id);
    const shadow = shadowsData.find(s => s.id === id);
    
    if (shadow) {
      toast({
        title: `${shadow.name} Selected`,
        description: `${shadow.type} shadow soldier is ready for deployment.`,
      });
    }
  };
  
  // Check if a quest is completed
  const isQuestCompleted = (questId: string) => completedQuests.includes(questId);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <Card className="glass-card bg-gradient-to-r from-black/40 to-accent/10 border-accent/30">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-2xl font-bold text-glow mb-2">Welcome, Hunter</h1>
              <p className="text-muted-foreground">The System has detected new quests and gates available for you.</p>
            </div>
            <Button className="portal-hover bg-accent/80 hover:bg-accent">View Assignments</Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hunter Profile */}
          <div className="col-span-1">
            <HunterProfile {...hunterData} />
          </div>
          
          {/* Active Gate/Dungeon */}
          <div className="col-span-1 md:col-span-2">
            <ThreeDungeon gateLevel="D" timeRemaining={3600} />
          </div>
        </div>
        
        {/* Quests Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-shadow">Available Quests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Daily Quests */}
            {dailyQuestsData.map((quest) => (
              <QuestCard
                key={quest.id}
                {...quest}
                progress={isQuestCompleted(quest.id) ? 100 : (questProgress[quest.id] || 0)}
                onAccept={() => handleAcceptQuest(quest.id)}
                onComplete={() => handleCompleteQuest(quest.id, quest.reward)}
              />
            ))}
            
            {/* Emergency Quests */}
            {emergencyQuestsData.map((quest) => (
              <QuestCard
                key={quest.id}
                {...quest}
                progress={isQuestCompleted(quest.id) ? 100 : (questProgress[quest.id] || 0)}
                onAccept={() => handleAcceptQuest(quest.id)}
                onComplete={() => handleCompleteQuest(quest.id, quest.reward)}
              />
            ))}
          </div>
        </div>
        
        {/* Shadow Inventory */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-shadow">Shadow Army</h2>
          <ShadowInventory
            shadows={shadowsData}
            capacity={10}
            selectedShadowId={selectedShadowId}
            onSelectShadow={handleSelectShadow}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
