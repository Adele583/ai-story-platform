'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Edit, BookOpen, Lightbulb, Moon, Sun, PenTool, BookMarked, Trophy, Settings, LogOut, Plus, MoreVertical, Zap, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
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

  const handleNewStory = () => {
    toast({
      title: "Redirecting to writing page...",
      description: "Be ready to explore. Happy writing!",
    })
  }

  const handleUpgrade = () => {
    toast({
      title: "Upgrade",
      description: "Redirecting to upgrade options...",
    })
    // Here you would typically redirect to an upgrade page or open a modal
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
            <Link href="/my-stories" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <PenTool className="mr-2 h-4 w-4" /> My Stories
              </Button>
            </Link >
            <Button variant="ghost" className="w-full justify-start">
              <BookMarked className="mr-2 h-4 w-4" /> Reading List
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Lightbulb className="mr-2 h-4 w-4" /> Writing Tutorials
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trophy className="mr-2 h-4 w-4" /> Achievements
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
            <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-600">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-bold"><span className="">Welcome Back,</span> Facebook</h1>
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
                      <p className="text-sm font-medium leading-none">User Name</p>
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
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Words Written</CardTitle>
                  <PenTool className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24,560</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stories Read</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tutorials Completed</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
            </section>

            <Tabs defaultValue="writing" className="space-y-4">
              <TabsList>
                <TabsTrigger value="writing">Writing</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
              </TabsList>

              <TabsContent value="writing" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Current Projects</h2>
                  <Button onClick={handleNewStory}>
                    <Plus className="mr-2 h-4 w-4" /> New Story
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "The Quantum Paradox", excerpt: "In a world where reality bends..." },
                    { title: "Echoes of Eternity", excerpt: "The last survivor of a forgotten era..." },
                    { title: "Whispers in the Wind", excerpt: "She could hear the secrets of the forest..." },
                  ].map((story, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{story.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{story.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <Button size="sm">Continue</Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Writing Assistant</CardTitle>
                    <CardDescription>Get help with your current writing project.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Button className="justify-start">
                      <Zap className="mr-2 h-4 w-4" /> Generate Plot Ideas
                    </Button>
                    <Button className="justify-start">
                      <Zap className="mr-2 h-4 w-4" /> Develop Characters
                    </Button>
                    <Button className="justify-start">
                      <Zap className="mr-2 h-4 w-4" /> Enhance Descriptions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reading" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading List</CardTitle>
                    <CardDescription>Continue your reading journey.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { title: "The Enigma Code", author: "Jane Doe", progress: 45 },
                        { title: "Stellar Odyssey", author: "John Smith", progress: 20 },
                        { title: "The Forgotten Realm", author: "Alice Johnson", progress: 75 },
                      ].map((book, index) => (
                        <li key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <Button size="sm">Continue</Button>
                          </div>
                          <Progress value={book.progress} className="h-2" />
                          <p className="text-xs text-right text-muted-foreground">{book.progress}% complete</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended for You</CardTitle>
                    <CardDescription>Based on your reading history and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { title: "Quantum Dreams", author: "Emily Chen" },
                        { title: "The Last Algorithm", author: "Michael Brown" },
                        { title: "Echoes of Tomorrow", author: "Sarah Williams" },
                      ].map((book, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </div>
                          <Button size="sm">Add to List</Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="learning" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Tutorials</CardTitle>
                    <CardDescription>Enhance your writing skills with our AI-powered tutorials.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        { title: "Character Development Masterclass", progress: 60 },
                        { title: "Plot Structure 101", progress: 100 },
                        { title: "Mastering Dialogue", progress: 30 },
                      ].map((tutorial, index) => (
                        <li key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{tutorial.title}</h3>
                            <Button size="sm">
                              {tutorial.progress === 100 ? "Review" : "Continue"}
                            </Button>
                          </div>
                          <Progress value={tutorial.progress} className="h-2" />
                          <p className="text-xs text-right text-muted-foreground">{tutorial.progress}% complete</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Writing Prompts</CardTitle>
                    <CardDescription>Get inspired with AI-generated writing prompts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        "In a world where dreams are shared...",
                        "The last tree on Earth stands as a beacon...",
                        "Time travelers attend a high school reunion...",
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
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}