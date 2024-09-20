'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Star, Award, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from an API
const userData = {
  username: "ElenaWordsmith",
  name: "Elena Rodriguez",
  bio: "Passionate sci-fi author exploring the boundaries of human imagination. 🚀✨",
  followers: 1243,
  following: 567,
  storiesPublished: 12,
  totalWords: 456789,
  achievements: [
    { id: 1, name: "Prolific Writer", description: "Published 10 stories" },
    { id: 2, name: "Rising Star", description: "Gained 1000 followers" },
    { id: 3, name: "Word Wizard", description: "Wrote 500,000 words" },
  ],
  recentStories: [
    { id: 1, title: "The Quantum Paradox", likes: 342, comments: 56 },
    { id: 2, title: "Echoes of Eternity", likes: 289, comments: 41 },
    { id: 3, title: "Nebula's Whisper", likes: 175, comments: 23 },
  ]
}

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const { toast } = useToast()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Followed",
      description: isFollowing ? "You have unfollowed Elena" : "You are now following Elena",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{userData.username}'s Profile</h1>
          <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userData.name} />
                <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
            </div>
            <p className="mt-4">{userData.bio}</p>
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <p className="font-bold">{userData.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.storiesPublished}</p>
                <p className="text-sm text-muted-foreground">Stories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stories" className="space-y-4">
          <TabsList>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle>Recent Stories</CardTitle>
                <CardDescription>The latest works from {userData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {userData.recentStories.map((story) => (
                    <div key={story.id} className="mb-4 p-4 border-b last:border-b-0">
                      <h3 className="font-semibold">{story.title}</h3>
                      <div className="flex space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Star className="mr-1 h-4 w-4" /> {story.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" /> {story.comments}
                        </span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Stories</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>{userData.name}'s writing milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="mb-4 p-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Writing Stats</CardTitle>
                <CardDescription>An overview of {userData.name}'s writing journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Total Words Written</span>
                    <span className="font-bold">{userData.totalWords.toLocaleString()}</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Stories Published</span>
                    <span className="font-bold">{userData.storiesPublished}</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Average Story Length</span>
                    <span className="font-bold">{Math.round(userData.totalWords / userData.storiesPublished).toLocaleString()} words</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}