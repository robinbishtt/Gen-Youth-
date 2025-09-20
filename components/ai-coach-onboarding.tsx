"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, GraduationCap, Users, Target, ArrowRight } from "lucide-react"

interface CoachPersona {
  id: string
  name: string
  role: string
  description: string
  icon: React.ReactNode
  personality: string[]
  specialties: string[]
}

interface OnboardingData {
  coachPersona: string
  primaryGoals: string[]
  currentChallenges: string
  preferredStyle: string
}

interface AICoachOnboardingProps {
  onComplete: (data: OnboardingData) => void
}

export default function AICoachOnboarding({ onComplete }: AICoachOnboardingProps) {
  const [step, setStep] = useState(1)
  const [selectedCoach, setSelectedCoach] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [challenges, setChallenges] = useState("")
  const [communicationStyle, setCommunicationStyle] = useState("")

  const coachPersonas: CoachPersona[] = [
    {
      id: "student-mentor",
      name: "Alex",
      role: "Student Mentor",
      description: "A recent graduate who understands academic pressure and student life",
      icon: <GraduationCap className="h-6 w-6" />,
      personality: ["Relatable", "Understanding", "Encouraging"],
      specialties: ["Academic stress", "Time management", "Peer relationships"],
    },
    {
      id: "wellness-coach",
      name: "Sam",
      role: "Wellness Coach",
      description: "A certified wellness professional focused on holistic health",
      icon: <Heart className="h-6 w-6" />,
      personality: ["Compassionate", "Knowledgeable", "Patient"],
      specialties: ["Mental health", "Mindfulness", "Self-care routines"],
    },
    {
      id: "life-coach",
      name: "Jordan",
      role: "Life Coach",
      description: "A motivational coach helping with life transitions and goals",
      icon: <Target className="h-6 w-6" />,
      personality: ["Motivational", "Goal-oriented", "Supportive"],
      specialties: ["Goal setting", "Life transitions", "Personal growth"],
    },
    {
      id: "peer-supporter",
      name: "Casey",
      role: "Peer Supporter",
      description: "Someone who's been through similar challenges and can relate",
      icon: <Users className="h-6 w-6" />,
      personality: ["Empathetic", "Authentic", "Non-judgmental"],
      specialties: ["Anxiety", "Depression", "Social connections"],
    },
  ]

  const wellnessGoals = [
    "Reduce anxiety and stress",
    "Improve sleep quality",
    "Build better habits",
    "Increase self-confidence",
    "Manage academic pressure",
    "Improve social connections",
    "Practice mindfulness",
    "Better work-life balance",
    "Emotional regulation",
    "Physical wellness",
  ]

  const communicationStyles = [
    { id: "gentle", label: "Gentle & Nurturing", description: "Soft, caring approach with lots of encouragement" },
    { id: "direct", label: "Direct & Practical", description: "Straightforward advice with actionable steps" },
    {
      id: "motivational",
      label: "Motivational & Energetic",
      description: "Upbeat and inspiring with positive reinforcement",
    },
    {
      id: "analytical",
      label: "Thoughtful & Analytical",
      description: "Deep, reflective conversations with detailed insights",
    },
  ]

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const handleComplete = () => {
    const onboardingData: OnboardingData = {
      coachPersona: selectedCoach,
      primaryGoals: selectedGoals,
      currentChallenges: challenges,
      preferredStyle: communicationStyle,
    }
    onComplete(onboardingData)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedCoach !== ""
      case 2:
        return selectedGoals.length > 0
      case 3:
        return challenges.trim() !== ""
      case 4:
        return communicationStyle !== ""
      default:
        return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Meet Your AI Wellness Coach</CardTitle>
          <CardDescription>
            Let's personalize your coaching experience to best support your wellness journey
          </CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Choose Your Coach Persona</h3>
                <p className="text-muted-foreground">Select the type of coach you'd feel most comfortable talking to</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coachPersonas.map((coach) => (
                  <Card
                    key={coach.id}
                    className={`cursor-pointer transition-all ${
                      selectedCoach === coach.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCoach(coach.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {coach.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{coach.name}</CardTitle>
                          <CardDescription className="text-sm">{coach.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{coach.description}</p>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {coach.personality.map((trait) => (
                            <Badge key={trait} variant="secondary" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Specializes in: {coach.specialties.join(", ")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">What are your wellness goals?</h3>
                <p className="text-muted-foreground">Select all that apply - this helps me provide better support</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {wellnessGoals.map((goal) => (
                  <Button
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    size="sm"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Selected {selectedGoals.length} goal{selectedGoals.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">What challenges are you facing?</h3>
                <p className="text-muted-foreground">
                  Share what's been on your mind lately - this is completely private
                </p>
              </div>
              <Textarea
                placeholder="For example: I've been feeling overwhelmed with school, having trouble sleeping, or struggling with anxiety..."
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This information helps me understand how to best support you. You can always change or update this
                later.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">How would you like me to communicate?</h3>
                <p className="text-muted-foreground">Choose the style that feels most comfortable for you</p>
              </div>
              <RadioGroup value={communicationStyle} onValueChange={setCommunicationStyle}>
                <div className="space-y-3">
                  {communicationStyles.map((style) => (
                    <div key={style.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={style.id} className="font-medium cursor-pointer">
                          {style.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
              Back
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={!canProceed()} className="flex items-center gap-2">
                Start Coaching
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
