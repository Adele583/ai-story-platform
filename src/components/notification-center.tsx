'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, BookOpen, Star, Users, MessageSquare, Award, Zap } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from an API
const notifications = [
  { id: 1, type: 'story_update', message: 'ElenaWordsmith published a new chapter in "The Quantum Paradox"', timestamp: '2023-07-15T10:30:00Z' },
  { id: 2, type: 'follower', message: 'SciFiLover42 is now following you', timestamp: '2023-07-14T15:45:00Z' },
  { id: 3, type: 'comment', message: 'New comment on your story "Echoes of Eternity"', timestamp: '2023-07-13T09:20:00Z' },
  { id: 4, type: 'achievement', message: 'You\'ve earned the "Prolific Writer" badge!', timestamp: '2023-07-12T18:00:00Z' },
  { id: 5, type: 'contest', message: 'New writing contest: "Future Visions 2050" - Enter now!', timestamp: '2023-07-11T11:10:00Z' },
  { id: 6, type: 'ai_suggestion', message: 'AI Assistant has suggestions for your latest chapter', timestamp: '2023-07-10T14:30:00Z' },
]

export function NotificationCenter() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    storyUpdates: true,
    newFollowers: true,
    comments: true,
    achievements: true,
    contests: true,
    aiSuggestions: true,
  })
  const { toast } = useToast()

  const handleSettingChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
    toast({
      title: "Settings Updated",
      description: `${setting} notifications ${notificationSettings[setting as keyof typeof notificationSettings] ? 'disabled' : 'enabled'}.`,
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'story_update': return <BookOpen className="h-4 w-4" />
      case 'follower': return <Users className="h-4 w-4" />
      case 'comment': return <MessageSquare className="h-4 w-4" />
      case 'achievement': return <Award className="h-4 w-4" />
      case 'contest': return <Star className="h-4 w-4" />
      case 'ai_suggestion': return <Zap className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
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
          <h1 className="text-2xl font-bold">Notification Center</h1>
          <Button variant="outline" size="sm">Mark All as Read</Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Stay updated with your writing community</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="mb-4 p-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-2">
                        {getNotificationIcon(notification.type)}
                        <p>{notification.message}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Load More</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="mb-4 p-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-2">
                        {getNotificationIcon(notification.type)}
                        <p>{notification.message}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Customize how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Methods</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={() => handleSettingChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.push}
                      onCheckedChange={() => handleSettingChange('push')}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Types</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="story-updates">Story Updates</Label>
                    <Switch
                      id="story-updates"
                      checked={notificationSettings.storyUpdates}
                      onCheckedChange={() => handleSettingChange('storyUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-followers">New Followers</Label>
                    <Switch
                      id="new-followers"
                      checked={notificationSettings.newFollowers}
                      onCheckedChange={() => handleSettingChange('newFollowers')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments">Comments</Label>
                    <Switch
                      id="comments"
                      checked={notificationSettings.comments}
                      onCheckedChange={() => handleSettingChange('comments')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="achievements">Achievements</Label>
                    <Switch
                      id="achievements"
                      checked={notificationSettings.achievements}
                      onCheckedChange={() => handleSettingChange('achievements')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contests">Writing Contests</Label>
                    <Switch
                      id="contests"
                      checked={notificationSettings.contests}
                      onCheckedChange={() => handleSettingChange('contests')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-suggestions">AI Suggestions</Label>
                    <Switch
                      id="ai-suggestions"
                      checked={notificationSettings.aiSuggestions}
                      onCheckedChange={() => handleSettingChange('aiSuggestions')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}