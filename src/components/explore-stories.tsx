'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, BookOpen, Bookmark, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const categories = ["All", "Fantasy", "Sci-Fi", "Mystery", "Romance", "Thriller"]

const stories = [
  { id: 1, title: "The Quantum Paradox", author: "J. Smith", category: "Sci-Fi", rating: 4.5, description: "A mind-bending journey through parallel universes.", pages: 320, saved: false },
  { id: 2, title: "Echoes of Eternity", author: "A. Johnson", category: "Fantasy", rating: 4.8, description: "An epic tale of magic, destiny, and ancient prophecies.", pages: 480, saved: true },
  { id: 3, title: "Whispers in the Wind", author: "E. Brown", category: "Mystery", rating: 4.2, description: "A small town's secrets unravel in this gripping mystery.", pages: 280, saved: false },
  { id: 4, title: "Starlight Serenade", author: "M. Davis", category: "Romance", rating: 4.6, description: "A heartwarming love story set against a backdrop of interstellar travel.", pages: 360, saved: true },
  { id: 5, title: "The Forgotten Realm", author: "L. Wilson", category: "Fantasy", rating: 4.7, description: "Discover a hidden world of mythical creatures and ancient magic.", pages: 420, saved: false },
  { id: 6, title: "Neon Nights", author: "R. Chen", category: "Thriller", rating: 4.4, description: "A cyberpunk thriller that will keep you on the edge of your seat.", pages: 300, saved: false },
]

export function ExploreStories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredStories, setFilteredStories] = useState(stories)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const filterStories = () => {
      setIsLoading(true)
      setTimeout(() => {
        const filtered = stories.filter(story => 
          (activeCategory === "All" || story.category === activeCategory) &&
          (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           story.author.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredStories(filtered)
        setIsLoading(false)
      }, 500)
    }

    filterStories()
  }, [searchTerm, activeCategory])

  const handleStartReading = (id: number) => {
    toast({
      title: "Starting Story",
      description: "Opening the story. Enjoy your reading!",
    })
    // Here you would typically navigate to the reading interface
    // For example: router.push(`/read/${id}`)
  }

  const handleSaveForLater = (id: number) => {
    setFilteredStories(stories => 
      stories.map(story => 
        story.id === id ? { ...story, saved: !story.saved } : story
      )
    )
    const story = filteredStories.find(s => s.id === id)
    toast({
      title: story?.saved ? "Removed from Reading List" : "Saved for Later",
      description: story?.saved 
        ? `"${story.title}" has been removed from your reading list.`
        : `"${story.title}" has been added to your reading list.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Link href="/dashboard" passHref>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Explore Stories</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search stories or authors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Tabs defaultValue="All" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <TabsList className="w-full justify-start">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="flex-shrink-0"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <TabsContent value={activeCategory} className="mt-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredStories.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStories.map((story) => (
                  <Card key={story.id}>
                    <CardHeader>
                      <CardTitle>{story.title}</CardTitle>
                      <CardDescription>{story.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{story.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">{story.rating.toFixed(1)}</span>
                        </div>
                        <Badge variant="secondary">{story.pages} pages</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button size="sm" onClick={() => handleStartReading(story.id)}>
                        <BookOpen className="mr-2 h-4 w-4" /> Start Reading
                      </Button>
                      <Button 
                        size="sm" 
                        variant={story.saved ? "default" : "outline"} 
                        onClick={() => handleSaveForLater(story.id)}
                      >
                        <Bookmark className="mr-2 h-4 w-4" /> 
                        {story.saved ? "Saved" : "Save for Later"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No stories found</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any stories matching your search. Try adjusting your search terms or explore other categories.
                </p>
                <Button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}