"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Target, Shield, Music, User, Settings, Bell, Trophy } from "lucide-react"
import ChatInterface from "../chat-interface"
import UserProfile from "@/components/user-profile"
import WellnessDashboard from "@/components/wellness-dashboard"
import GamificationSystem from "@/components/gamification-system"
import MusicTherapy from "@/components/music-therapy"
import SOSEmergency from "@/components/sos-emergency"

export default function GenYouthPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-card-foreground">Gen Youth</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="coach">AI Coach</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="gamification">Rewards</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="sos">SOS</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-card-foreground">Welcome back, Alex!</h2>
              <p className="text-muted-foreground">Your wellness journey continues today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wellness Streak</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">7 days</div>
                  <p className="text-xs text-muted-foreground">Keep it up!</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wellness Points</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <p className="text-xs text-muted-foreground">+23 today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">8.2/10</div>
                  <p className="text-xs text-muted-foreground">Feeling great!</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Today's Wellness Goals</CardTitle>
                <CardDescription>Track your daily wellness activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mindfulness Practice</span>
                    <span>15/20 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Physical Activity</span>
                    <span>30/30 min</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Social Connection</span>
                    <span>2/3 interactions</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Chat with AI</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Music className="h-6 w-6" />
                <span className="text-sm">Music Therapy</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Trophy className="h-6 w-6" />
                <span className="text-sm">View Rewards</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
              >
                <Shield className="h-6 w-6 text-destructive" />
                <span className="text-sm text-destructive">SOS Help</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="coach" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Your AI Wellness Coach</h2>
              <p className="text-muted-foreground">Get personalized support and guidance</p>
            </div>
            <ChatInterface />
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Wellness Tracking</h2>
              <p className="text-muted-foreground">Monitor your mental and physical well-being</p>
            </div>
            <WellnessDashboard />
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Music Therapy</h2>
              <p className="text-muted-foreground">Mood-based music to support your wellness journey</p>
            </div>
            <MusicTherapy />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Rewards & Achievements</h2>
              <p className="text-muted-foreground">Track your progress and unlock rewards</p>
            </div>
            <GamificationSystem />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Your Profile</h2>
              <p className="text-muted-foreground">Manage your wellness journey and connect with friends</p>
            </div>
            <UserProfile />
          </TabsContent>

          <TabsContent value="sos" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Emergency Support</h2>
              <p className="text-muted-foreground">Immediate help and crisis resources</p>
            </div>
            <SOSEmergency />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Community Support</h2>
              <p className="text-muted-foreground">Connect with others on similar journeys</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Groups</CardTitle>
                  <CardDescription>Join conversations that matter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Anxiety Support Circle</h4>
                    <p className="text-sm text-muted-foreground">127 members • Active now</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Mindfulness Beginners</h4>
                    <p className="text-sm text-muted-foreground">89 members • 3 new posts</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Student Wellness</h4>
                    <p className="text-sm text-muted-foreground">234 members • Very active</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Celebrate your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">7-Day Streak</h4>
                      <p className="text-sm text-muted-foreground">Completed daily check-ins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Wellness Warrior</h4>
                      <p className="text-sm text-muted-foreground">1000+ wellness points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
