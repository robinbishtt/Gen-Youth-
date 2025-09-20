"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Star,
  Target,
  Flame,
  Award,
  Crown,
  Zap,
  Heart,
  Users,
  Calendar,
  TrendingUp,
  Gift,
  Medal,
  Sparkles,
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "wellness" | "social" | "consistency" | "milestone"
  points: number
  unlocked: boolean
  unlockedDate?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Challenge {
  id: string
  title: string
  description: string
  category: "daily" | "weekly" | "monthly"
  progress: number
  target: number
  points: number
  deadline: string
  completed: boolean
}

interface Milestone {
  id: string
  title: string
  description: string
  requiredPoints: number
  currentPoints: number
  rewards: string[]
  unlocked: boolean
}

export default function GamificationSystem() {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    totalPoints: 1247,
    currentStreak: 7,
    longestStreak: 12,
    level: 8,
    nextLevelPoints: 1500,
    achievementsUnlocked: 15,
    challengesCompleted: 23,
  }

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first wellness check-in",
      icon: "👶",
      category: "milestone",
      points: 50,
      unlocked: true,
      unlockedDate: "2024-01-15",
      rarity: "common",
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "Maintain a 7-day wellness streak",
      icon: "🔥",
      category: "consistency",
      points: 200,
      unlocked: true,
      unlockedDate: "2024-01-22",
      rarity: "rare",
    },
    {
      id: "3",
      title: "Mindful Master",
      description: "Complete 50 mindfulness sessions",
      icon: "🧘",
      category: "wellness",
      points: 300,
      unlocked: true,
      unlockedDate: "2024-01-28",
      rarity: "epic",
    },
    {
      id: "4",
      title: "Social Butterfly",
      description: "Connect with 10 wellness friends",
      icon: "🦋",
      category: "social",
      points: 150,
      unlocked: true,
      unlockedDate: "2024-01-25",
      rarity: "rare",
    },
    {
      id: "5",
      title: "Wellness Legend",
      description: "Reach 1000 wellness points",
      icon: "👑",
      category: "milestone",
      points: 500,
      unlocked: true,
      unlockedDate: "2024-02-01",
      rarity: "legendary",
    },
    {
      id: "6",
      title: "Perfect Month",
      description: "Complete all daily goals for 30 days",
      icon: "💎",
      category: "consistency",
      points: 1000,
      unlocked: false,
      rarity: "legendary",
    },
  ]

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Daily Mindfulness",
      description: "Practice mindfulness for 10 minutes",
      category: "daily",
      progress: 10,
      target: 10,
      points: 25,
      deadline: "Today",
      completed: true,
    },
    {
      id: "2",
      title: "Hydration Hero",
      description: "Drink 8 glasses of water",
      category: "daily",
      progress: 5,
      target: 8,
      points: 20,
      deadline: "Today",
      completed: false,
    },
    {
      id: "3",
      title: "Social Connection",
      description: "Have 3 meaningful conversations",
      category: "daily",
      progress: 2,
      target: 3,
      points: 30,
      deadline: "Today",
      completed: false,
    },
    {
      id: "4",
      title: "Wellness Week",
      description: "Complete all daily goals for 7 days",
      category: "weekly",
      progress: 5,
      target: 7,
      points: 150,
      deadline: "3 days left",
      completed: false,
    },
    {
      id: "5",
      title: "Gratitude Journey",
      description: "Write 20 gratitude journal entries",
      category: "monthly",
      progress: 12,
      target: 20,
      points: 300,
      deadline: "15 days left",
      completed: false,
    },
  ]

  const milestones: Milestone[] = [
    {
      id: "1",
      title: "Wellness Novice",
      description: "Your first milestone on the wellness journey",
      requiredPoints: 100,
      currentPoints: 1247,
      rewards: ["Custom avatar frame", "Wellness badge"],
      unlocked: true,
    },
    {
      id: "2",
      title: "Mindful Explorer",
      description: "Developing consistent wellness habits",
      requiredPoints: 500,
      currentPoints: 1247,
      rewards: ["Exclusive themes", "Priority support"],
      unlocked: true,
    },
    {
      id: "3",
      title: "Wellness Champion",
      description: "A true advocate for mental health",
      requiredPoints: 1000,
      currentPoints: 1247,
      rewards: ["Champion badge", "Mentor access", "Special challenges"],
      unlocked: true,
    },
    {
      id: "4",
      title: "Zen Master",
      description: "Achieved exceptional wellness consistency",
      requiredPoints: 1500,
      currentPoints: 1247,
      rewards: ["Master title", "Custom wellness plan", "VIP community access"],
      unlocked: false,
    },
    {
      id: "5",
      title: "Wellness Legend",
      description: "The ultimate wellness achievement",
      requiredPoints: 2500,
      currentPoints: 1247,
      rewards: ["Legend status", "Lifetime premium", "Personal coach session"],
      unlocked: false,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "wellness":
        return <Heart className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "consistency":
        return <Flame className="h-4 w-4" />
      case "milestone":
        return <Trophy className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                    <Crown className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">Level {userStats.level}</h3>
                    <p className="text-muted-foreground">Wellness Champion</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{userStats.totalPoints}</div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>
                    {userStats.totalPoints}/{userStats.nextLevelPoints}
                  </span>
                </div>
                <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userStats.nextLevelPoints - userStats.totalPoints} points to next level
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{userStats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">{userStats.achievementsUnlocked}</div>
                <p className="text-xs text-muted-foreground">unlocked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Challenges</CardTitle>
                <Target className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{userStats.challengesCompleted}</div>
                <p className="text-xs text-muted-foreground">completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">{userStats.longestStreak}</div>
                <p className="text-xs text-muted-foreground">days record</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements
                  .filter((a) => a.unlocked)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>+{achievement.points}</Badge>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges
                  .filter((c) => !c.completed)
                  .slice(0, 3)
                  .map((challenge) => (
                    <div key={challenge.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {challenge.deadline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                          <span>+{challenge.points} points</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Daily Challenges
                </CardTitle>
                <CardDescription>Reset every day at midnight</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges
                  .filter((c) => c.category === "daily")
                  .map((challenge) => (
                    <div key={challenge.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        {challenge.completed && <Badge className="text-xs bg-green-100 text-green-800">Complete</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                          <span>+{challenge.points} points</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Challenges
                </CardTitle>
                <CardDescription>Reset every Monday</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges
                  .filter((c) => c.category === "weekly")
                  .map((challenge) => (
                    <div key={challenge.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {challenge.deadline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                          <span>+{challenge.points} points</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Challenges
                </CardTitle>
                <CardDescription>Reset every month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges
                  .filter((c) => c.category === "monthly")
                  .map((challenge) => (
                    <div key={challenge.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {challenge.deadline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                          <span>+{challenge.points} points</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
                    : "opacity-60"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-base">{achievement.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getCategoryIcon(achievement.category)}
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {achievement.unlocked && <Trophy className="h-5 w-5 text-yellow-500" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">+{achievement.points} points</span>
                    {achievement.unlocked && achievement.unlockedDate && (
                      <span className="text-xs text-muted-foreground">
                        Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <Card
                key={milestone.id}
                className={`${
                  milestone.unlocked
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20"
                    : milestone.currentPoints >= milestone.requiredPoints * 0.8
                      ? "border-primary/40"
                      : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          milestone.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {milestone.unlocked ? (
                          <Medal className="h-6 w-6" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        <CardDescription>{milestone.description}</CardDescription>
                      </div>
                    </div>
                    {milestone.unlocked && <Badge className="bg-green-100 text-green-800">Unlocked</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {Math.min(milestone.currentPoints, milestone.requiredPoints)}/{milestone.requiredPoints}{" "}
                          points
                        </span>
                      </div>
                      <Progress
                        value={
                          (Math.min(milestone.currentPoints, milestone.requiredPoints) / milestone.requiredPoints) * 100
                        }
                        className="h-3"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        Rewards
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone.rewards.map((reward, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
