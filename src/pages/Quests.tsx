
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import QuestCard from '@/components/QuestCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const dailyQuests = [
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
  },
  {
    id: '3',
    title: 'Combat Practice',
    description: 'Practice your combat techniques against training dummies.',
    difficulty: 'D' as const,
    reward: 200,
    timeLimit: 90,
    type: 'daily' as const,
  }
];

const emergencyQuests = [
  {
    id: '4',
    title: 'Gate Outbreak',
    description: 'An unexpected gate has appeared! Clear it before monsters escape.',
    difficulty: 'D' as const,
    reward: 300,
    timeLimit: 120,
    type: 'emergency' as const,
  },
  {
    id: '5',
    title: 'Protect Civilians',
    description: 'Monsters have escaped! Protect the civilians from harm.',
    difficulty: 'C' as const,
    reward: 400,
    timeLimit: 60,
    type: 'emergency' as const,
  }
];

const storyQuests = [
  {
    id: '6',
    title: 'Mysterious Call',
    description: 'You received a mysterious call about a dangerous dungeon. Investigate it.',
    difficulty: 'D' as const,
    reward: 500,
    type: 'story' as const,
  },
  {
    id: '7',
    title: 'Hunter Association',
    description: 'Visit the Hunter Association to receive your first official mission.',
    difficulty: 'E' as const,
    reward: 200,
    type: 'story' as const,
  }
];

const QuestsPage = () => {
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
  
  // Check if a quest is completed
  const isQuestCompleted = (questId: string) => completedQuests.includes(questId);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-glow">Quest Board</h1>
        
        <Card className="glass-card bg-gradient-to-r from-black/40 to-accent/10 border-accent/30">
          <CardHeader>
            <CardTitle>Hunter Assignment System</CardTitle>
            <CardDescription>Complete quests to earn rewards and increase your hunter rank</CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="daily" className="data-[state=active]:bg-blue-500/20">Daily</TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-red-500/20">Emergency</TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-purple-500/20">Story</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dailyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  progress={isQuestCompleted(quest.id) ? 100 : (questProgress[quest.id] || 0)}
                  onAccept={() => handleAcceptQuest(quest.id)}
                  onComplete={() => handleCompleteQuest(quest.id, quest.reward)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  progress={isQuestCompleted(quest.id) ? 100 : (questProgress[quest.id] || 0)}
                  onAccept={() => handleAcceptQuest(quest.id)}
                  onComplete={() => handleCompleteQuest(quest.id, quest.reward)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="story" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  progress={isQuestCompleted(quest.id) ? 100 : (questProgress[quest.id] || 0)}
                  onAccept={() => handleAcceptQuest(quest.id)}
                  onComplete={() => handleCompleteQuest(quest.id, quest.reward)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QuestsPage;
