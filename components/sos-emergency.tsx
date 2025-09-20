"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, MessageCircle, Heart, Shield, Clock, MapPin, User } from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  description: string
  availability: string
  type: "crisis" | "text" | "chat" | "local"
  country?: string
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "Free and confidential emotional support 24/7",
    availability: "24/7",
    type: "crisis",
    country: "US",
  },
  {
    id: "2",
    name: "Crisis Text Line",
    phone: "741741",
    description: "Text HOME to connect with a crisis counselor",
    availability: "24/7",
    type: "text",
    country: "US",
  },
  {
    id: "3",
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service",
    availability: "24/7",
    type: "crisis",
    country: "US",
  },
  {
    id: "4",
    name: "Teen Line",
    phone: "1-800-852-8336",
    description: "Teens helping teens through difficult times",
    availability: "6 PM - 10 PM PST",
    type: "crisis",
    country: "US",
  },
  {
    id: "5",
    name: "LGBT National Hotline",
    phone: "1-888-843-4564",
    description: "Support for LGBTQ+ youth and adults",
    availability: "1 PM - 9 PM PST",
    type: "crisis",
    country: "US",
  },
]

const safetyResources = [
  {
    title: "Safety Planning",
    description: "Create a personalized safety plan for crisis situations",
    icon: Shield,
    action: "Create Plan",
  },
  {
    title: "Trusted Contacts",
    description: "Add emergency contacts who can support you",
    icon: User,
    action: "Add Contacts",
  },
  {
    title: "Safe Spaces",
    description: "Find safe locations near you",
    icon: MapPin,
    action: "Find Locations",
  },
  {
    title: "Coping Strategies",
    description: "Quick access to your personalized coping tools",
    icon: Heart,
    action: "View Strategies",
  },
]

export default function SOSEmergency() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null)
  const [userLocation, setUserLocation] = useState<string>("")

  useEffect(() => {
    // Get user's approximate location for local resources
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get location name
          setUserLocation("Your Area")
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const handleEmergencyCall = (contact: EmergencyContact) => {
    if (contact.type === "text") {
      window.open(`sms:${contact.phone}`, "_blank")
    } else {
      window.open(`tel:${contact.phone}`, "_blank")
    }
  }

  const handleSOSActivation = () => {
    setIsEmergencyMode(true)
    // In a real app, this could also:
    // - Send location to trusted contacts
    // - Log the emergency event
    // - Provide immediate coping resources
  }

  return (
    <div className="space-y-6">
      {/* Emergency SOS Button */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="text-center">
          <CardTitle className="text-red-800 flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            Emergency Support
          </CardTitle>
          <CardDescription className="text-red-700">
            If you're in crisis or need immediate help, we're here for you
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleSOSActivation}
              >
                <Phone className="h-5 w-5 mr-2" />
                SOS - Get Help Now
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-red-800 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Emergency Support Resources
                </DialogTitle>
                <DialogDescription>Choose the type of support that feels right for you right now</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Immediate Crisis Support */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    Immediate Crisis Support
                  </h3>
                  <div className="grid gap-3">
                    {emergencyContacts
                      .filter((c) => c.type === "crisis")
                      .map((contact) => (
                        <Card key={contact.id} className="border-red-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-red-800">{contact.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <Badge variant="outline" className="text-green-700 border-green-300">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {contact.availability}
                                  </Badge>
                                  <span className="font-mono text-lg font-bold text-red-700">{contact.phone}</span>
                                </div>
                              </div>
                              <Button
                                onClick={() => handleEmergencyCall(contact)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                Call Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                <Separator />

                {/* Text & Chat Support */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Text & Chat Support
                  </h3>
                  <div className="grid gap-3">
                    {emergencyContacts
                      .filter((c) => c.type === "text")
                      .map((contact) => (
                        <Card key={contact.id} className="border-blue-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-blue-800">{contact.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <Badge variant="outline" className="text-green-700 border-green-300">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {contact.availability}
                                  </Badge>
                                  <span className="font-mono text-lg font-bold text-blue-700">
                                    Text {contact.phone}
                                  </span>
                                </div>
                              </div>
                              <Button
                                onClick={() => handleEmergencyCall(contact)}
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Text Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                <Separator />

                {/* Safety Resources */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-sage-600" />
                    Safety Resources
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {safetyResources.map((resource, index) => (
                      <Card key={index} className="border-sage-200 hover:bg-sage-50 cursor-pointer transition-colors">
                        <CardContent className="p-4 text-center">
                          <resource.icon className="h-8 w-8 text-sage-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                          <p className="text-xs text-gray-600 mb-3">{resource.description}</p>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            {resource.action}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Important Notice */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-amber-800 mb-1">Your Safety Matters</p>
                        <p className="text-amber-700">
                          If you're in immediate physical danger, please call 911 (US) or your local emergency services.
                          These resources are here to support you through difficult times.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Quick Access Safety Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-sage-600" />
            Quick Safety Tools
          </CardTitle>
          <CardDescription>Immediate access to coping strategies and safety resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Shield className="h-6 w-6 text-sage-600" />
              <span className="text-sm">Safety Plan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Heart className="h-6 w-6 text-sage-600" />
              <span className="text-sm">Breathing</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <User className="h-6 w-6 text-sage-600" />
              <span className="text-sm">Trusted Contact</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <MapPin className="h-6 w-6 text-sage-600" />
              <span className="text-sm">Safe Space</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
