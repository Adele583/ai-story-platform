'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, BookOpen, Lightbulb, Moon, Sun, PenTool, BookMarked, Trophy, Settings, LogOut, Plus, Star, Rocket, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function NewUserDashboardComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleStartWriting = () => {
    toast({
      title: "Let's start writing!",
      description: "You're about to begin your first story. Exciting times ahead!",
    })
    // Here you would typically redirect to a new story creation page
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
          <div className="flex items-center space-x-2 mb-6">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </div>
          <nav className="space-y-2 flex-grow">
            <Button variant="ghost" className="w-full justify-start">
              <PenTool className="mr-2 h-4 w-4" /> Start Writing
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookMarked className="mr-2 h-4 w-4" /> Explore Stories
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Lightbulb className="mr-2 h-4 w-4" /> Writing Tutorials
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" /> Goals
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </nav>
          <div className="mt-auto space-y-2">
            <Link href="/upgrade" passHref>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                <Star className="mr-2 h-4 w-4" /> Upgrade
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-bold">Welcome to StoryAI!</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={toggleDarkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">New User</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Begin Your Writing Journey</CardTitle>
                <CardDescription className="text-gray-100">Let's create your first masterpiece!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleStartWriting} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Rocket className="mr-2 h-5 w-5" /> Start Your First Story
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="get-started" className="space-y-4">
              <TabsList>
                <TabsTrigger value="get-started">Get Started</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
                <TabsTrigger value="learn">Learn</TabsTrigger>
              </TabsList>

              <TabsContent value="get-started" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start Guide</CardTitle>
                    <CardDescription>Follow these steps to begin your writing adventure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Click on "Start Your First Story" to open the story editor</li>
                      <li>Choose a genre or writing prompt to inspire you</li>
                      <li>Set a writing goal (e.g., 500 words per day)</li>
                      <li>Start writing and let your creativity flow!</li>
                      <li>Use AI assistance if you need help with ideas or phrasing</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Writing Goals</CardTitle>
                    <CardDescription>Set achievable targets to stay motivated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start">
                      <Trophy className="mr-2 h-4 w-4" /> Write for 30 minutes daily
                    </Button>
                    <Button className="w-full justify-start">
                      <Trophy className="mr-2 h-4 w-4" /> Complete a short story in 7 days
                    </Button>
                    <Button className="w-full justify-start">
                      <Trophy className="mr-2 h-4 w-4" /> Reach 10,000 words in 30 days
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="explore" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Discover Inspiring Stories</CardTitle>
                    <CardDescription>Read works from other authors to get inspired</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "The Quantum Paradox by J. Smith",
                        "Echoes of Eternity by A. Johnson",
                        "Whispers in the Wind by E. Brown",
                      ].map((story, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{story}</span>
                          <Button size="sm">Read</Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Writing Prompts</CardTitle>
                    <CardDescription>Get inspired with AI-generated writing prompts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "In a world where silence is currency...",
                        "The first human-AI co-written bestseller...",
                        "A door appears in your bedroom leading to...",
                      ].map((prompt, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <p className="italic">"{prompt}"</p>
                          <Button size="sm">Use Prompt</Button>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4">Generate New Prompts</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="learn" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Tutorials</CardTitle>
                    <CardDescription>Enhance your writing skills with our AI-powered tutorials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Crafting Compelling Characters",
                        "Mastering Story Structure",
                        "Dialogue That Sizzles",
                        "World-Building 101",
                      ].map((tutorial, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{tutorial}</span>
                          <Button size="sm">Start</Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Writing Assistant</CardTitle>
                    <CardDescription>Get help with your writing process</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start">
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Plot Ideas
                    </Button>
                    <Button className="w-full justify-start">
                      <Sparkles className="mr-2 h-4 w-4" /> Develop Characters
                    </Button>
                    <Button className="w-full justify-start">
                      <Sparkles className="mr-2 h-4 w-4" /> Overcome Writer's Block
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}