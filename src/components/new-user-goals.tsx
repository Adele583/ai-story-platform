'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Target, PenTool, Calendar, Zap } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function NewUserGoals() {
  const [wordCountGoal, setWordCountGoal] = useState(500)
  const [frequencyGoal, setFrequencyGoal] = useState("daily")
  const [genreGoal, setGenreGoal] = useState("")
  const [deadlineGoal, setDeadlineGoal] = useState("")
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const { toast } = useToast()

  const handleSaveGoals = () => {
    toast({
      title: "Goals Saved",
      description: "Your writing goals have been saved successfully.",
    })
    // Here you would typically save the goals to a backend or local storage
  }

  const handleQuickStart = () => {
    toast({
      title: "Quick Start Activated",
      description: "Let's begin your writing journey!",
    })
    // Here you would typically navigate to a writing interface or story creation page
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
          <h1 className="text-2xl font-bold">My Writing Goals</h1>
          <Button onClick={handleQuickStart}>
            <Zap className="mr-2 h-4 w-4" /> Quick Start
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Set Your Writing Goals</CardTitle>
            <CardDescription>Define your writing objectives to stay motivated and track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="word-count">Daily Word Count Goal</Label>
              <Slider
                id="word-count"
                min={100}
                max={2000}
                step={100}
                value={[wordCountGoal]}
                onValueChange={(value) => setWordCountGoal(value[0])}
              />
              <p className="text-sm text-muted-foreground">{wordCountGoal} words per day</p>
            </div>

            <div className="space-y-2">
              <Label>Writing Frequency</Label>
              <RadioGroup value={frequencyGoal} onValueChange={setFrequencyGoal}>
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
              <Label htmlFor="genre">Preferred Genre</Label>
              <Select value={genreGoal} onValueChange={setGenreGoal}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="scifi">Science Fiction</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">First Story Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadlineGoal}
                onChange={(e) => setDeadlineGoal(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="reminder"
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
              <Label htmlFor="reminder">Enable writing reminders</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGoals}>Save Goals</Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="suggested" className="space-y-4">
          <TabsList>
            <TabsTrigger value="suggested">Suggested Goals</TabsTrigger>
            <TabsTrigger value="milestones">Writing Milestones</TabsTrigger>
          </TabsList>
          <TabsContent value="suggested" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Beginner Writer</CardTitle>
                <CardDescription>Perfect for those just starting their writing journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Write 300 words daily</li>
                  <li>Complete a short story (1,000 - 5,000 words) in 30 days</li>
                  <li>Read one book in your preferred genre each month</li>
                  <li>Participate in one writing prompt challenge weekly</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => {
                  setWordCountGoal(300)
                  setFrequencyGoal("daily")
                  setDeadlineGoal(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                }}>
                  Apply Beginner Goals
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ambitious Writer</CardTitle>
                <CardDescription>For those ready to push their writing to the next level</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Write 1,000 words daily</li>
                  <li>Complete a novella (15,000 - 30,000 words) in 60 days</li>
                  <li>Read two books in your preferred genre each month</li>
                  <li>Attend one writing workshop or webinar monthly</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => {
                  setWordCountGoal(1000)
                  setFrequencyGoal("daily")
                  setDeadlineGoal(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                }}>
                  Apply Ambitious Goals
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="milestones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Writing Milestones</CardTitle>
                <CardDescription>Celebrate these achievements in your writing journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Write your first 1,000 words</li>
                  <li>Complete your first short story</li>
                  <li>Receive your first feedback from a peer</li>
                  <li>Submit a story to a writing contest</li>
                  <li>Reach 10,000 total words written</li>
                  <li>Complete your first novella</li>
                  <li>Start your first full-length novel</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}