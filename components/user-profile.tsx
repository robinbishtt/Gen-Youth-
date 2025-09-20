"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Edit3, Save, Search, UserPlus, Heart, Target, Activity } from "lucide-react"

interface UserProfile {
  username: string
  displayName: string
  bio: string
  age: number
  gender: string
  height: string
  weight: string
  fitnessLevel: string
  goals: string[]
  interests: string[]
  avatar: string
}

interface Friend {
  id: string
  username: string
  displayName: string
  avatar: string
  status: "online" | "offline"
  mutualGoals: number
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [profile, setProfile] = useState<UserProfile>({
    username: "alex_wellness",
    displayName: "Alex Johnson",
    bio: "Student focusing on mental wellness and mindful living. Love connecting with others on similar journeys!",
    age: 19,
    gender: "non-binary",
    height: "5'7\"", // Fixed escaped quote in height string
    weight: "140 lbs",
    fitnessLevel: "moderate",
    goals: ["Reduce Anxiety", "Better Sleep", "Mindfulness", "Social Connection"],
    interests: ["Meditation", "Journaling", "Music", "Nature"],
    avatar: "/young-person-smiling.png",
  })

  const [friends] = useState<Friend[]>([
    {
      id: "1",
      username: "mindful_maya",
      displayName: "Maya Chen",
      avatar: "/young-woman-meditation.jpg",
      status: "online",
      mutualGoals: 3,
    },
    {
      id: "2",
      username: "zen_zach",
      displayName: "Zach Williams",
      avatar: "/young-man-peaceful.jpg",
      status: "offline",
      mutualGoals: 2,
    },
    {
      id: "3",
      username: "calm_casey",
      displayName: "Casey Rodriguez",
      avatar: "/placeholder-fsox5.png",
      status: "online",
      mutualGoals: 4,
    },
  ])

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would save to backend/database
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="health">Health Data</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.displayName} />
                  <AvatarFallback className="text-lg">
                    {profile.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={profile.displayName}
                          onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{profile.displayName}</h3>
                      <p className="text-muted-foreground">@{profile.username}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell others about your wellness journey..."
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.age} years old</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  {isEditing ? (
                    <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{profile.gender}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label>Wellness Goals</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.goals.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Health & Fitness Data
              </CardTitle>
              <CardDescription>
                Track your physical health metrics to get personalized exercise suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                    placeholder="5'7&quot;" // Fixed placeholder with HTML entity for quote
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                    placeholder="140 lbs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fitnessLevel">Current Fitness Level</Label>
                <Select
                  value={profile.fitnessLevel}
                  onValueChange={(value) => setProfile({ ...profile, fitnessLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                    <SelectItem value="moderate">Moderate - Some regular activity</SelectItem>
                    <SelectItem value="active">Active - Regular exercise routine</SelectItem>
                    <SelectItem value="athlete">Athlete - High performance training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Personalized Exercise Suggestions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card className="p-3">
                    <h5 className="font-medium text-sm">Morning Yoga Flow</h5>
                    <p className="text-xs text-muted-foreground">15 min • Based on your stress levels</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Recommended
                    </Badge>
                  </Card>
                  <Card className="p-3">
                    <h5 className="font-medium text-sm">Mindful Walking</h5>
                    <p className="text-xs text-muted-foreground">20 min • Perfect for your fitness level</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Recommended
                    </Badge>
                  </Card>
                  <Card className="p-3">
                    <h5 className="font-medium text-sm">Breathing Exercises</h5>
                    <p className="text-xs text-muted-foreground">10 min • Great for anxiety management</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Recommended
                    </Badge>
                  </Card>
                  <Card className="p-3">
                    <h5 className="font-medium text-sm">Light Strength Training</h5>
                    <p className="text-xs text-muted-foreground">25 min • Matches your goals</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      Try This
                    </Badge>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Find Friends
              </CardTitle>
              <CardDescription>Connect with others who share your wellness goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by username or interests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Wellness Circle</CardTitle>
              <CardDescription>Friends who support your journey ({friends.length} connections)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.displayName} />
                          <AvatarFallback>
                            {friend.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                            friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{friend.displayName}</h4>
                        <p className="text-xs text-muted-foreground">@{friend.username}</p>
                        <p className="text-xs text-muted-foreground">{friend.mutualGoals} shared wellness goals</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={friend.status === "online" ? "default" : "secondary"} className="text-xs">
                        {friend.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
