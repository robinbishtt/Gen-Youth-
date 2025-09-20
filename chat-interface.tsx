"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, ThumbsUp, ThumbsDown, Heart, Shield, Send, Loader2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import AICoachOnboarding from "@/components/ai-coach-onboarding"
import CoachSelection from "@/components/coach-selection"

interface Message {
  role: "coach" | "user"
  content: string
  timestamp: string
  mood?: "supportive" | "encouraging" | "concerned"
  isLoading?: boolean
}

interface OnboardingData {
  coachPersona: string
  primaryGoals: string[]
  currentChallenges: string
  preferredStyle: string
}

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCoachSelection, setShowCoachSelection] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selectedCoachId, setSelectedCoachId] = useState<string>("")
  const [coachData, setCoachData] = useState<OnboardingData | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleCoachSelection = (coachId: string) => {
    setSelectedCoachId(coachId)
    setShowCoachSelection(false)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    setCoachData(data)
    setShowOnboarding(false)

    const coachNames = {
      "alex-student": "Alex",
      "sam-wellness": "Sam",
      "jordan-life": "Jordan",
      "casey-peer": "Casey",
    }

    const coachName = coachNames[selectedCoachId as keyof typeof coachNames] || "your coach"

    const welcomeMessage: Message = {
      role: "coach",
      content: `Hi! I'm ${coachName}, your AI wellness coach. I'm really glad you're taking this step toward better mental health and wellness.

Based on what you've shared, I can see you're focusing on ${data.primaryGoals.slice(0, 2).join(" and ")}${data.primaryGoals.length > 2 ? " among other goals" : ""}. That takes courage, and I want you to know I'm here to support you every step of the way.

This is your safe space - you can share anything that's on your mind without judgment. Whether you're having a tough day, celebrating a win, or just need someone to listen, I'm here.

How are you feeling right now? What's been on your mind lately?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mood: "supportive",
    }

    setMessages([welcomeMessage])
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const loadingMessage: Message = {
      role: "coach",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      const userContext = coachData
        ? {
            coachPersona: selectedCoachId,
            goals: coachData.primaryGoals.join(", "),
            challenges: coachData.currentChallenges,
            communicationStyle: coachData.preferredStyle,
            mood: "neutral",
          }
        : null

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userContext,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const coachMessage: Message = {
        role: "coach",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mood: "supportive",
      }

      setMessages((prev) => prev.slice(0, -1).concat(coachMessage))
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        role: "coach",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or use the SOS button if you need immediate support.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mood: "concerned",
      }
      setMessages((prev) => prev.slice(0, -1).concat(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSOS = () => {
    alert("Connecting you to crisis support resources...")
  }

  const resetChat = () => {
    setMessages([])
    setShowCoachSelection(true)
    setShowOnboarding(false)
    setSelectedCoachId("")
    setCoachData(null)
  }

  if (showCoachSelection) {
    return <CoachSelection onSelectCoach={handleCoachSelection} />
  }

  if (showOnboarding) {
    return <AICoachOnboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between p-4 border-b bg-card/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">AI Wellness Coach</h3>
            <p className="text-sm text-muted-foreground">Always here to support you</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetChat}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          <Button variant="destructive" size="sm" onClick={handleSOS} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            SOS
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex gap-3 max-w-[85%]", message.role === "user" && "ml-auto flex-row-reverse")}
            >
              {message.role === "coach" && (
                <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">
                    {message.role === "coach" ? "Wellness Coach" : "You"}
                  </span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  {message.mood && (
                    <Badge variant="secondary" className="text-xs">
                      {message.mood}
                    </Badge>
                  )}
                </div>
                <Card
                  className={cn(
                    "p-3",
                    message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-card",
                  )}
                >
                  {message.isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  )}
                </Card>
                {message.role === "coach" && !message.isLoading && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-card/50">
        <div className="flex gap-2">
          <Textarea
            placeholder="Share what's on your mind... I'm here to listen and support you."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[44px] max-h-32 resize-none"
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading} className="px-6 flex items-center gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Your conversations are private and secure. If you're in crisis, use the SOS button above.
        </p>
      </div>
    </div>
  )
}
