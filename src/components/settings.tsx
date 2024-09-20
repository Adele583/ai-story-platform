'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, User, Bell, Shield, Palette, Moon, Sun, Zap, BookOpen, PenTool, Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function Settings() {
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState(true)
  const [emailFrequency, setEmailFrequency] = useState("weekly")
  const [aiAssistance, setAiAssistance] = useState(true)
  const [aiCreativity, setAiCreativity] = useState(50)
  const [writingGoal, setWritingGoal] = useState(500)
  const [preferredGenre, setPreferredGenre] = useState("fantasy")
  const [writingStyle, setWritingStyle] = useState("descriptive")
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
    // Here you would typically save the settings to a backend or local storage
  }

  const handleAIPersonalityTest = () => {
    toast({
      title: "AI Personality Test Complete",
      description: "Your AI assistant has been personalized based on your responses.",
    })
    // Here you would typically run an AI personality test and adjust settings
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
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details and writing profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Your username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself and your writing aspirations" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-genre">Preferred Genre</Label>
                  <Select value={preferredGenre} onValueChange={setPreferredGenre}>
                    <SelectTrigger id="preferred-genre">
                      <SelectValue placeholder="Select your preferred genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="writing-style">Writing Style</Label>
                  <Select value={writingStyle} onValueChange={setWritingStyle}>
                    <SelectTrigger id="writing-style">
                      <SelectValue placeholder="Select your writing style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="descriptive">Descriptive</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="dialogue-heavy">Dialogue-heavy</SelectItem>
                      <SelectItem value="poetic">Poetic</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your writing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup value={theme} onValueChange={setTheme}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Daily Writing Goal (words)</Label>
                  <Slider
                    value={[writingGoal]}
                    onValueChange={(value) => setWritingGoal(value[0])}
                    max={2000}
                    step={100}
                  />
                  <p className="text-sm text-muted-foreground">{writingGoal} words per day</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="writing-prompts"
                    checked={true}
                  />
                  <Label htmlFor="writing-prompts">Receive daily writing prompts</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assistant">
            <Card>
              <CardHeader>
                <CardTitle>AI Writing Assistant</CardTitle>
                <CardDescription>Customize your AI-powered writing companion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ai-assistance"
                    checked={aiAssistance}
                    onCheckedChange={setAiAssistance}
                  />
                  <Label htmlFor="ai-assistance">Enable AI writing assistance</Label>
                </div>
                <div className="space-y-2">
                  <Label>AI Creativity Level</Label>
                  <Slider
                    value={[aiCreativity]}
                    onValueChange={(value) => setAiCreativity(value[0])}
                    max={100}
                    step={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    {aiCreativity < 30 ? "Conservative" : aiCreativity < 70 ? "Balanced" : "Highly Creative"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>AI Assistant Personality</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI personality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encouraging">Encouraging Mentor</SelectItem>
                      <SelectItem value="critical">Critical Editor</SelectItem>
                      <SelectItem value="creative">Creative Muse</SelectItem>
                      <SelectItem value="analytical">Analytical Strategist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Brain className="mr-2 h-4 w-4" />
                      Take AI Personality Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>AI Personality Test</DialogTitle>
                      <DialogDescription>
                        Answer a few questions to personalize your AI assistant to your writing style and preferences.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Questions would go here in a real implementation.</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAIPersonalityTest}>Complete Test</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="space-y-2">
                  <Label>AI-Powered Features</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Plot Suggestions
                    </Badge>
                    <Badge variant="secondary">
                      <User className="mr-1 h-3 w-3" />
                      Character Development
                    </Badge>
                    <Badge variant="secondary">
                      <PenTool className="mr-1 h-3 w-3" />
                      Style Analysis
                    </Badge>
                    <Badge variant="secondary">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Research Assistant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive updates and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
                <div className="space-y-2">
                  <Label>Email Digest Frequency</Label>
                  <RadioGroup value={emailFrequency} onValueChange={setEmailFrequency}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="writing-reminders" defaultChecked />
                      <Label htmlFor="writing-reminders">Writing goal reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="feedback-notifications" defaultChecked />
                      <Label htmlFor="feedback-notifications">Feedback on your stories</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="challenge-updates" defaultChecked />
                      <Label htmlFor="challenge-updates">Writing challenge updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ai-suggestions" defaultChecked />
                      <Label htmlFor="ai-suggestions">AI writing suggestions</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account's privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input id="password" type="password" placeholder="New password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                </div>
                <div className="space-y-2">
                  <Label>Data Sharing</Label>
                  <RadioGroup defaultValue="minimal">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minimal" id="minimal" />
                      <Label htmlFor="minimal">Minimal (Required Only)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate (Improve Services)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full">Full (Personalized Experience)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Story Privacy</Label>
                  <Select defaultValue="private">
                    <SelectTrigger>
                      <SelectValue placeholder="Select privacy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private (Only you)</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="anonymous-feedback" defaultChecked />
                  <Label htmlFor="anonymous-feedback">Allow anonymous feedback on public stories</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive">Delete Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}