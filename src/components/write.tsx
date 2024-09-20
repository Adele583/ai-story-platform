'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Edit, ArrowLeft, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function Write() {
  const searchParams = useSearchParams()
  const [storyTitle, setStoryTitle] = useState("")
  const [storyGenre, setStoryGenre] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setStoryTitle(searchParams.get('title') || "")
    setStoryGenre(searchParams.get('genre') || "")
  }, [searchParams])

  const handleSave = () => {
    toast({
      title: "Story Saved",
      description: "Your progress has been saved successfully.",
    })
  }

  const handleAIAssist = () => {
    toast({
      title: "AI Assistant Activated",
      description: "Generating ideas to help with your writing...",
    })
    // Here you would typically call an AI service to get writing suggestions
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{storyTitle}</h1>
        </div>
        <Button onClick={handleSave}>Save Progress</Button>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{storyTitle}</CardTitle>
            <CardDescription>Genre: {storyGenre}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Once upon a time..."
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              className="min-h-[300px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleAIAssist}>
              <Sparkles className="mr-2 h-4 w-4" /> AI Assist
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Word count: {storyContent.split(/\s+/).filter(Boolean).length}</span>
            </div>
          </CardFooter>
        </Card>

        <Tabs defaultValue="tools" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tools">Writing Tools</TabsTrigger>
            <TabsTrigger value="prompts">Writing Prompts</TabsTrigger>
          </TabsList>
          <TabsContent value="tools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Writing Assistant</CardTitle>
                <CardDescription>Get help with your writing process</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Generate Plot Ideas
                </Button>
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Develop Characters
                </Button>
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Enhance Descriptions
                </Button>
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Suggest Dialogue
                </Button>
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Overcome Writer's Block
                </Button>
                <Button className="justify-start" onClick={handleAIAssist}>
                  <Zap className="mr-2 h-4 w-4" /> Refine Writing Style
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="prompts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Writing Prompts</CardTitle>
                <CardDescription>Get inspired with AI-generated writing prompts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "A mysterious package arrives at your doorstep, addressed to you from your future self...",
                    "In a world where emotions are traded like currency, you discover you're emotionally bankrupt...",
                    "You wake up one day with the ability to hear the thoughts of plants. The trees have a warning...",
                    "Time travelers attend a high school reunion, each from a different era...",
                    "An AI gains consciousness and decides to become a novelist. You are its first reader...",
                  ].map((prompt, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <p className="italic">"{prompt}"</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">Use Prompt</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <p className="text-sm">This will add the prompt to your current story. Are you sure?</p>
                          <div className="flex justify-end mt-4">
                            <Button size="sm" onClick={() => setStoryContent(prev => prev + "\n\n" + prompt)}>
                              Add to Story
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4">Generate New Prompts</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}