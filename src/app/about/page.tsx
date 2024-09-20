'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { BookOpen, Edit, Lightbulb, ChevronRight, Moon, Sun, Users, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useUser, UserButton } from "@clerk/nextjs"

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const { isLoaded, isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </Link>

          {/* Center: Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-4">
                <NavigationMenuItem>
                  <Link href="/" passHref legacyBehavior>
                    <NavigationMenuLink className="px-4 py-2 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" passHref legacyBehavior>
                    <NavigationMenuLink className="px-4 py-2 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400">
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" onClick={toggleDarkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Login/User Button */}
          <div>
            {isLoaded && isSignedIn ? (
              <UserButton />
            ) : (
              <Link href="/sign-in" passHref legacyBehavior>
                <Button variant="outline" className="px-4 py-2">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-extrabold mb-4 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About StoryAI
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Revolutionizing storytelling through the power of artificial intelligence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI-powered storytelling"
                width={600}
                height={400}
                className="rounded-lg shadow-lg mx-auto"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-lg mb-12 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At StoryAI, we're on a mission to empower writers, readers, and learners by harnessing the potential of artificial intelligence. We believe that everyone has a story to tell, and our platform is designed to help you bring those stories to life.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Edit className="h-12 w-12 mb-4 text-green-600 dark:text-green-400" />, title: "Innovative Writing Tools", description: "AI-powered assistance for plot development, character creation, and style enhancement." },
                { icon: <BookOpen className="h-12 w-12 mb-4 text-green-600 dark:text-green-400" />, title: "Personalized Reading Experience", description: "Tailored story recommendations and interactive reading features." },
                { icon: <Lightbulb className="h-12 w-12 mb-4 text-green-600 dark:text-green-400" />, title: "Continuous Learning", description: "Adaptive tutorials and exercises to improve your writing skills." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Meet the Creator
            </motion.h2>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://abdulsalam-portfolio-gray.vercel.app/assets/images/about-banner.jpg"
                alt="StoryAI Creator"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">Lukmon Abdulsalam</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Founder & Developer</p>
              <p className="max-w-2xl mx-auto mb-6">
                StoryAI is a solo project, crafted with passion and dedication to revolutionize the world of storytelling through AI.
              </p>
              <Link
                href="https://abdulsalam-portfolio-gray.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                View Portfolio
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Join Us in Shaping the Future of Storytelling
            </motion.h2>
            <motion.p
              className="text-lg mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Whether you're a seasoned author, an aspiring writer, or simply someone who loves a good story, StoryAI is here to enhance your creative journey. Join our community today and experience the future of storytelling.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform hover:scale-105">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="transition-colors hover:bg-green-100 dark:hover:bg-green-900">
                Contact Us
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
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