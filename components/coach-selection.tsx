"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Heart, Target, Users, Star, MessageCircle } from "lucide-react"

interface CoachProfile {
  id: string
  name: string
  role: string
  avatar: string
  description: string
  personality: string[]
  specialties: string[]
  experience: string
  rating: number
  icon: React.ReactNode
}

interface CoachSelectionProps {
  onSelectCoach: (coachId: string) => void
}

export default function CoachSelection({ onSelectCoach }: CoachSelectionProps) {
  const [selectedCoach, setSelectedCoach] = useState<string>("")

  const coaches: CoachProfile[] = [
    {
      id: "alex-student",
      name: "Alex Chen",
      role: "Student Mentor & Peer Coach",
      avatar: "/young-person-smiling.png",
      description:
        "Recent psychology graduate who understands the unique pressures of student life. Specializes in academic stress, time management, and building healthy study habits.",
      personality: ["Relatable", "Understanding", "Encouraging", "Down-to-earth"],
      specialties: ["Academic Pressure", "Time Management", "Study-Life Balance", "Peer Relationships"],
      experience: "3 years supporting students through academic challenges",
      rating: 4.9,
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "sam-wellness",
      name: "Sam Rodriguez",
      role: "Certified Wellness Coach",
      avatar: "/young-woman-meditation.jpg",
      description:
        "Licensed mental health counselor with expertise in mindfulness, anxiety management, and holistic wellness approaches for young adults.",
      personality: ["Compassionate", "Patient", "Knowledgeable", "Calming"],
      specialties: ["Anxiety & Stress", "Mindfulness", "Self-Care", "Emotional Regulation"],
      experience: "5 years in youth mental health and wellness coaching",
      rating: 4.8,
      icon: <Heart className="h-6 w-6" />,
    },
    {
      id: "jordan-life",
      name: "Jordan Taylor",
      role: "Life Transition Coach",
      avatar: "/young-man-peaceful.jpg",
      description:
        "Motivational coach specializing in helping young people navigate life transitions, set meaningful goals, and build confidence.",
      personality: ["Motivational", "Goal-oriented", "Supportive", "Energetic"],
      specialties: ["Goal Setting", "Life Transitions", "Confidence Building", "Career Guidance"],
      experience: "4 years coaching young adults through major life changes",
      rating: 4.7,
      icon: <Target className="h-6 w-6" />,
    },
    {
      id: "casey-peer",
      name: "Casey Morgan",
      role: "Peer Support Specialist",
      avatar: "/placeholder-fsox5.png",
      description:
        "Someone who's walked the path of mental health recovery and now helps others. Authentic, non-judgmental support for anxiety, depression, and social challenges.",
      personality: ["Empathetic", "Authentic", "Non-judgmental", "Inspiring"],
      specialties: ["Anxiety Support", "Depression", "Social Connections", "Recovery Journey"],
      experience: "Personal recovery journey + 2 years peer support training",
      rating: 4.9,
      icon: <Users className="h-6 w-6" />,
    },
  ]

  const handleSelectCoach = (coachId: string) => {
    setSelectedCoach(coachId)
  }

  const handleStartCoaching = () => {
    if (selectedCoach) {
      onSelectCoach(selectedCoach)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your AI Wellness Coach</CardTitle>
          <CardDescription>
            Each coach has a unique personality and specialization. Select the one that feels right for your journey.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coaches.map((coach) => (
          <Card
            key={coach.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCoach === coach.id ? "border-primary bg-primary/5 shadow-lg" : "hover:border-primary/50"
            }`}
            onClick={() => handleSelectCoach(coach.id)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                  <AvatarFallback className="text-lg">
                    {coach.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {coach.icon}
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                  </div>
                  <CardDescription className="font-medium">{coach.role}</CardDescription>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{coach.rating}</span>
                    <span className="text-sm text-muted-foreground">• {coach.experience}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{coach.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Personality</h4>
                  <div className="flex flex-wrap gap-1">
                    {coach.personality.map((trait) => (
                      <Badge key={trait} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Specializes in</h4>
                  <div className="flex flex-wrap gap-1">
                    {coach.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedCoach === coach.id && (
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-primary">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Selected as your coach</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCoach && (
        <div className="text-center">
          <Button size="lg" onClick={handleStartCoaching} className="px-8">
            Start Coaching with {coaches.find((c) => c.id === selectedCoach)?.name}
          </Button>
        </div>
      )}
    </div>
  )
}
