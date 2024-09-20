'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Edit, Lightbulb, ChevronRight, Moon, Sun, Send } from "lucide-react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function HomepageComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </Link>

          <div className="flex-1 flex justify-center">
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

          <UserButton className="ml-auto" />
        </div>
      </header>


      <main>
        <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-extrabold mb-4 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Unleash Your Creativity with AI
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Experience the future of storytelling with our AI-powered platform. Write, read, and learn like never before.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform hover:scale-105"
                onClick={() => isSignedIn ? router.push('/dashboard') : router.push('/sign-up')}
              >
                {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        <FeatureSection
          title="Writing Has Never Been Easier"
          subtitle="Let AI be your creative companion"
          imageSrc="/placeholder.svg?height=400&width=600"
          imageAlt="AI Writing Assistant"
          features={[
            "Real-time plot and character development suggestions",
            "Advanced grammar and style corrections",
            "Customizable AI assistance levels"
          ]}
          buttonText="Start Writing"
          buttonIcon={<Edit className="ml-2 h-4 w-4" />}
        />

        <FeatureSection
          title="Dive into a World of Stories"
          subtitle="Discover tales tailored just for you"
          imageSrc="/placeholder.svg?height=400&width=600"
          imageAlt="Story Explorer"
          features={[
            "Personalized story recommendations",
            "Interactive reading experiences",
            "Community-driven story ratings and reviews"
          ]}
          buttonText="Explore Stories"
          buttonIcon={<BookOpen className="ml-2 h-4 w-4" />}
          reversed
        />

        <FeatureSection
          title="Craft Your Skills"
          subtitle="Learn from the best, guided by AI"
          imageSrc="/placeholder.svg?height=400&width=600"
          imageAlt="Writing Tutorials"
          features={[
            "Tailored learning paths",
            "AI-driven skill assessments and feedback",
            "Access to a community of writers and experts"
          ]}
          buttonText="Start Learning"
          buttonIcon={<Lightbulb className="ml-2 h-4 w-4" />}
        />

        <section className="py-20 dark:gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with StoryAI</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for the latest AI writing tips, story recommendations, and platform updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto bg-white dark:bg-gray-800"
                required
              />
              <Button type="submit" className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
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

function FeatureSection({ title, subtitle, imageSrc, imageAlt, features, buttonText, buttonIcon, reversed = false }) {
  return (
    <section className={cn("py-20", reversed ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800")}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
        <div className={cn("flex flex-col md:flex-row items-center justify-between gap-12", reversed && "md:flex-row-reverse")}>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-lg shadow-lg object-cover w-full h-auto transition-transform hover:scale-105"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 space-y-4"
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-4 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform hover:scale-105">
              {buttonText}
              {buttonIcon}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}