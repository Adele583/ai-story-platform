'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NewStoryFormComponent() {
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && genre) {
      // In a real application, you'd probably want to create the story in your backend here
      // For now, we'll just pass the data as query parameters
      router.push(`/write?title=${encodeURIComponent(title)}&genre=${encodeURIComponent(genre)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </div>
          <CardTitle className="text-2xl">Start a New Story</CardTitle>
          <CardDescription>Enter your story details to begin your writing journey</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Story Title
              </label>
              <Input
                id="title"
                placeholder="Enter your story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="genre" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Genre
              </label>
              <Select value={genre} onValueChange={setGenre} required>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="scifi">Science Fiction</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                  <SelectItem value="historical">Historical Fiction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard" passHref>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={!title || !genre}>
              Start Writing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}