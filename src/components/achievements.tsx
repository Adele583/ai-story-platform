'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Trophy, Star, Target, Zap, BookOpen, PenTool } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const achievements = [
  { id: 1, title: "First Story", description: "Completed your first story", completed: true, date: "2023-05-15" },
  { id: 2, title: "Prolific Writer", description: "Wrote 5,000 words in a single day", completed: true, date: "2023-06-02" },
  { id: 3, title: "Genre Explorer", description: "Wrote stories in 3 different genres", completed: false, progress: 2 },
  { id: 4, title: "Feedback Seeker", description: "Received feedback on 5 stories", completed: false, progress: 3 },
  { id: 5, title: "Consistent Creator", description: "Wrote every day for a month", completed: true, date: "2023-07-10" },
]

const badges = [
  { id: 1, title: "Novice Writer", icon: <PenTool className="h-8 w-8 text-blue-500" />, description: "Completed your first story" },
  { id: 2, title: "Word Wizard", icon: <Zap className="h-8 w-8 text-yellow-500" />, description: "Reached 10,000 total words written" },
  { id: 3, title: "Feedback Champion", icon: <Star className="h-8 w-8 text-purple-500" />, description: "Received 10 pieces of feedback" },
]

const challenges = [
  { id: 1, title: "Write a Mystery", description: "Complete a 5,000-word mystery story", reward: "Mystery Master Badge" },
  { id: 2, title: "30-Day Sprint", description: "Write 1,000 words every day for 30 days", reward: "Consistency King Badge" },
  { id: 3, title: "Collaborative Tale", description: "Co-write a story with another user", reward: "Team Player Badge" },
]

export function Achievements() {
  const [activeTab, setActiveTab] = useState("achievements")
  const { toast } = useToast()

  const handleAcceptChallenge = (challengeTitle: string) => {
    toast({
      title: "Challenge Accepted",
      description: `You've started the "${challengeTitle}" challenge. Good luck!`,
    })
    // Here you would typically update the user's active challenges in your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Achievements</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/goals">Set New Goals</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Writing Progress Overview</CardTitle>
            <CardDescription>Your journey as a writer so far</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Words Written</span>
              <span className="font-bold">25,463</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Stories Completed</span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Achievements Unlocked</span>
              <span className="font-bold">7 / 15</span>
            </div>
            <Progress value={47} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              You've unlocked 47% of all achievements
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          <TabsContent value="achievements">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className={`mr-2 h-5 w-5 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
                        {achievement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{achievement.description}</p>
                      {achievement.completed ? (
                        <Badge variant="secondary" className="mt-2">Completed on {achievement.date}</Badge>
                      ) : (
                        <div className="mt-2">
                          <Progress value={(achievement.progress / 5) * 100} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-1">
                            Progress: {achievement.progress} / 5
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="badges">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {badges.map((badge) => (
                <Card key={badge.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      {badge.icon}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <h3 className="font-semibold mb-2">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="challenges">
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{challenge.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Reward: {challenge.reward}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleAcceptChallenge(challenge.title)}>
                      Accept Challenge
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}