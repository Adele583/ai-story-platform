'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Moon, Sun, Check, X } from "lucide-react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function UpgradePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [annually, setAnnually] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleUpgrade = (plan: string) => {
    toast({
      title: "Upgrade Initiated",
      description: `You've selected the ${plan} plan. Redirecting to payment...`,
    })
    // Here you would typically redirect to a payment processor
  }

  const plans = [
    {
      name: "Basic",
      price: annually ? 99 : 9.99,
      features: [
        "Unlimited story writing",
        "Basic AI writing assistant",
        "Access to community forums",
        "1GB cloud storage",
      ],
      limitations: [
        "Limited character development tools",
        "No advanced plot generators",
        "Standard support",
      ],
    },
    {
      name: "Pro",
      price: annually ? 199 : 19.99,
      features: [
        "All Basic features",
        "Advanced AI writing assistant",
        "Unlimited cloud storage",
        "Priority support",
        "Advanced character development tools",
        "Plot hole detection",
      ],
      limitations: [
        "No real-time collaboration",
        "Limited publishing tools",
      ],
    },
    {
      name: "Ultimate",
      price: annually ? 299 : 29.99,
      features: [
        "All Pro features",
        "Real-time collaboration",
        "Advanced publishing tools",
        "Personalized writing coach",
        "Early access to new features",
        "Exclusive workshops and webinars",
      ],
      limitations: [],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <Edit className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">StoryAI</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <Link href="/dashboard" passHref legacyBehavior>
                  <NavigationMenuLink className="px-4 py-2 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400">
                    Dashboard
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
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Upgrade Your StoryAI Experience</h1>
        
        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className="text-lg font-medium">Monthly</span>
          <Switch
            id="billing-toggle"
            checked={annually}
            onCheckedChange={setAnnually}
          />
          <Label htmlFor="billing-toggle" className="text-lg font-medium">
            Annually <span className="text-green-600 dark:text-green-400">(Save 20%)</span>
          </Label>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {annually ? '/year' : '/month'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-center text-gray-500 dark:text-gray-400">
                      <X className="h-5 w-5 mr-2" />
                      {limitation}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleUpgrade(plan.name)}
                  variant={plan.name === "Pro" ? "default" : "outline"}
                >
                  {plan.name === "Basic" ? "Upgrade to Basic" : `Get ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
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
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 StoryAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}