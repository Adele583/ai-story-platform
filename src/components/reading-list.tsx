'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookOpen, Plus, MoreVertical, ArrowLeft, Trash2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function ReadingList() {
  const [readingList, setReadingList] = useState([
    { id: 1, title: "The Quantum Paradox", author: "J. Smith", progress: 45 },
    { id: 2, title: "Echoes of Eternity", author: "A. Johnson", progress: 20 },
    { id: 3, title: "Whispers in the Wind", author: "E. Brown", progress: 100 },
  ])
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")
  const { toast } = useToast()

  const handleAddBook = () => {
    if (newBookTitle && newBookAuthor) {
      setReadingList([
        ...readingList,
        {
          id: readingList.length + 1,
          title: newBookTitle,
          author: newBookAuthor,
          progress: 0,
        },
      ])
      setNewBookTitle("")
      setNewBookAuthor("")
      toast({
        title: "Book Added",
        description: `${newBookTitle} has been added to your reading list.`,
      })
    }
  }

  const handleRemoveBook = (id: number) => {
    setReadingList(readingList.filter(book => book.id !== id))
    toast({
      title: "Book Removed",
      description: "The book has been removed from your reading list.",
    })
  }

  const handleContinueReading = (title: string) => {
    toast({
      title: "Continuing Reading",
      description: `Opening ${title}. Enjoy your reading!`,
    })
    // Here you would typically navigate to a reading interface or open the book
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
          <h1 className="text-2xl font-bold">My Reading List</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Enter the details of the book you want to add to your reading list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBook}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Reading Progress</CardTitle>
            <CardDescription>Track your reading journey and discover new stories</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {readingList.map((book) => (
                <li key={book.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {book.progress < 100 && (
                          <DropdownMenuItem onClick={() => handleContinueReading(book.title)}>
                            <BookOpen className="mr-2 h-4 w-4" /> Continue Reading
                          </DropdownMenuItem>
                        )}
                        {book.progress === 100 && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Completed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRemoveBook(book.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove from List
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Progress value={book.progress} className="h-2" />
                  <p className="text-xs text-right mt-1 text-muted-foreground">
                    {book.progress === 100 ? 'Completed' : `${book.progress}% complete`}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Total books: {readingList.length} | Completed: {readingList.filter(book => book.progress === 100).length}
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Reads</CardTitle>
            <CardDescription>Based on your reading history and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                { title: "The Celestial Cipher", author: "L. Cosmos" },
                { title: "Echoes of the Forgotten", author: "M. Whisper" },
                { title: "Neon Dreams", author: "C. Spark" },
              ].map((book, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <Button size="sm" onClick={() => {
                    setNewBookTitle(book.title)
                    setNewBookAuthor(book.author)
                    toast({
                      title: "Book Added",
                      description: `${book.title} has been added to your reading list.`,
                    })
                  }}>
                    Add to List
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}