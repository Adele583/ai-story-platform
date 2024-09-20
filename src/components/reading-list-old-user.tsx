'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, BookOpen, MoreVertical, Trash2, Star } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const initialReadingList = [
  { id: 1, title: "The Quantum Paradox", author: "J. Smith", progress: 45, totalPages: 320, category: "Sci-Fi", rating: 4.5 },
  { id: 2, title: "Echoes of Eternity", author: "A. Johnson", progress: 20, totalPages: 480, category: "Fantasy", rating: 4.8 },
  { id: 3, title: "Whispers in the Wind", author: "E. Brown", progress: 100, totalPages: 280, category: "Mystery", rating: 4.2 },
  { id: 4, title: "Starlight Serenade", author: "M. Davis", progress: 75, totalPages: 360, category: "Romance", rating: 4.6 },
]

export default function ReadingListPage() {
  const [readingList, setReadingList] = useState(initialReadingList)
  const { toast } = useToast()

  const handleContinueReading = (id: number) => {
    const book = readingList.find(book => book.id === id)
    if (book) {
      toast({
        title: "Continuing Reading",
        description: `Opening "${book.title}". Enjoy your reading!`,
      })
      // Here you would typically navigate to the reading interface
      // For example: router.push(`/read/${id}`)
    }
  }

  const handleRemoveBook = (id: number) => {
    setReadingList(readingList.filter(book => book.id !== id))
    toast({
      title: "Book Removed",
      description: "The book has been removed from your reading list.",
    })
  }

  const calculateOverallProgress = () => {
    const totalPages = readingList.reduce((sum, book) => sum + book.totalPages, 0)
    const readPages = readingList.reduce((sum, book) => sum + (book.totalPages * book.progress / 100), 0)
    return (readPages / totalPages) * 100
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
          <h1 className="text-2xl font-bold">My Reading List</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/explore">Explore More Books</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Reading Progress</CardTitle>
            <CardDescription>Keep track of your reading journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={calculateOverallProgress()} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              You've read {calculateOverallProgress().toFixed(1)}% of your current reading list.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="in-progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {readingList.filter(book => book.progress < 100).map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                          {Math.round(book.totalPages * book.progress / 100)} of {book.totalPages} pages
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{book.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button size="sm" onClick={() => handleContinueReading(book.id)}>
                        <BookOpen className="mr-2 h-4 w-4" /> Continue Reading
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleContinueReading(book.id)}>
                            Continue Reading
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRemoveBook(book.id)} className="text-red-600">
                            Remove from List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="completed">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {readingList.filter(book => book.progress === 100).map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Completed: {book.totalPages} pages
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{book.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleContinueReading(book.id)}>
                            Read Again
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRemoveBook(book.id)} className="text-red-600">
                            Remove from List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}