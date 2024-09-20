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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ArrowLeft, User, Bell, Shield, Palette, Moon, Sun, Zap, BookOpen, PenTool, Brain, Sparkles, ChevronDown, Settings2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function SettingsExperiencedUser() {
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState(true)
  const [emailFrequency, setEmailFrequency] = useState("weekly")
  const [aiAssistance, setAiAssistance] = useState(true)
  const [aiCreativity, setAiCreativity] = useState(70)
  const [writingGoal, setWritingGoal] = useState(1000)
  const [preferredGenre, setPreferredGenre] = useState("fantasy")
  const [writingStyle, setWritingStyle] = useState("descriptive")
  const [autoSaveInterval, setAutoSaveInterval] = useState(5)
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
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
                  <Input id="username" placeholder="Your username" defaultValue="storyteller123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" defaultValue="writer@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself and your writing journey" defaultValue="Passionate writer exploring the realms of fantasy and science fiction. Always seeking new adventures through words." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                </div>
                <div className="space-y-2">
                  <Label>Social Media Links</Label>
                  <Input placeholder="Twitter" className="mb-2" />
                  <Input placeholder="Instagram" className="mb-2" />
                  <Input placeholder="Goodreads" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="writing">
            <Card>
              <CardHeader>
                <CardTitle>Writing Preferences</CardTitle>
                <CardDescription>Customize your writing experience and goals</CardDescription>
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
                      <SelectItem value="historical">Historical Fiction</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="literary">Literary Fiction</SelectItem>
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
                      <SelectItem value="experimental">Experimental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Daily Writing Goal (words)</Label>
                  <Slider
                    value={[writingGoal]}
                    onValueChange={(value) => setWritingGoal(value[0])}
                    max={5000}
                    step={100}
                  />
                  <p className="text-sm text-muted-foreground">{writingGoal} words per day</p>
                </div>
                <div className="space-y-2">
                  <Label>Writing Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred writing time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (5AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night Owl (10PM - 5AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="writing-prompts" defaultChecked />
                  <Label htmlFor="writing-prompts">Receive personalized writing prompts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="writing-stats" defaultChecked />
                  <Label htmlFor="writing-stats">Track detailed writing statistics</Label>
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
                  <Select defaultValue="creative">
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI personality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encouraging">Encouraging Mentor</SelectItem>
                      <SelectItem value="critical">Critical Editor</SelectItem>
                      <SelectItem value="creative">Creative Muse</SelectItem>
                      <SelectItem value="analytical">Analytical Strategist</SelectItem>
                      <SelectItem value="historical">Historical Consultant</SelectItem>
                      <SelectItem value="character">Character Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Brain className="mr-2 h-4 w-4" />
                      Retake AI Personality Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>AI Personality Test</DialogTitle>
                      <DialogDescription>
                        Refine your AI assistant's personality based on your current writing needs and style.
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
                    <Badge variant="secondary">
                      <Settings2 className="mr-1 h-3 w-3" />
                      World-building Tools
                    </Badge>
                  </div>
                </div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center justify-between w-full">
                      Advanced AI Settings
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="ai-auto-complete" />
                      <Label htmlFor="ai-auto-complete">Enable AI auto-completion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ai-style-matching" />
                      <Label htmlFor="ai-style-matching">AI style matching</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>AI Intervention Frequency</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
                    <div className="flex items-center space-x-2">
                      <Switch id="community-interactions" defaultChecked />
                      <Label htmlFor="community-interactions">Community interactions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="publishing-opportunities" defaultChecked />
                      <Label htmlFor="publishing-opportunities">Publishing opportunities</Label>
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
                  <Switch id="two-factor" defaultChecked />
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                </div>
                <div className="space-y-2">
                  <Label>Data Sharing</Label>
                  <RadioGroup defaultValue="moderate">
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
                  <Label>Default Story Privacy</Label>
                  <Select defaultValue="friends">
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
                <div className="flex items-center space-x-2">
                  <Switch id="story-analytics" defaultChecked />
                  <Label htmlFor="story-analytics">Enable story analytics</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Fine-tune your writing environment and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Auto-save Interval (minutes)</Label>
                  <Slider
                    value={[autoSaveInterval]}
                    onValueChange={(value) => setAutoSaveInterval(value[0])}
                    max={30}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground">Auto-save every {autoSaveInterval} minutes</p>
                </div>
                <div className="space-y-2">
                  <Label>Default Editor Mode</Label>
                  <Select defaultValue="rich-text">
                    <SelectTrigger>
                      <SelectValue placeholder="Select editor mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rich-text">Rich Text</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="plain-text">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Keyboard Shortcuts</Label>
                  <Button variant="outline">Customize Shortcuts</Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="spell-check" defaultChecked />
                  <Label htmlFor="spell-check">Enable spell check</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="grammar-check" defaultChecked />
                  <Label htmlFor="grammar-check">Enable grammar check</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="version-history" defaultChecked />
                  <Label htmlFor="version-history">Enable version history</Label>
                </div>
                <div className="space-y-2">
                  <Label>Export Options</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                      <SelectItem value="epub">EPUB</SelectItem>
                      <SelectItem value="txt">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data Management</Label>
                  <Button variant="outline">Export All Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}