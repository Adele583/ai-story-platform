'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Moon, Sun, Send } from "lucide-react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import UserButtonClient from "@/components/UserButtonClient"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Submitted:', { name, email, message })
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <Link href="/about" passHref legacyBehavior>
                  <NavigationMenuLink className="px-4 py-2 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <NavigationMenuLink className="px-4 py-2 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" onClick={toggleDarkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <UserButtonClient />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-extrabold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <Input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <Input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <Textarea 
              id="message"
              placeholder="Type your message here."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </motion.form>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-semibold text-green-600 dark:text-green-400">StoryAI</span>
          </div>
          <nav className="flex flex-wrap justify-center space-x-4 mb-4">
            {['Home', 'About', 'Privacy', 'Terms', 'Contact'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors">
                {item}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 StoryAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}