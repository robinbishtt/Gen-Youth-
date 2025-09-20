"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Heart,
  Brain,
  Activity,
  Moon,
  Utensils,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  Plus,
} from "lucide-react"

interface MoodEntry {
  date: string
  mood: number
  energy: number
  stress: number
  sleep: number
}

interface DailyActivity {
  id: string
  name: string
  category: "physical" | "mental" | "social" | "nutrition"
  completed: boolean
  target: number
  current: number
  unit: string
}

export default function WellnessDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const [todayMood, setTodayMood] = useState([7])
  const [todayEnergy, setTodayEnergy] = useState([6])
  const [todayStress, setTodayStress] = useState([4])
  const [journalEntry, setJournalEntry] = useState("")

  const moodData: MoodEntry[] = [
    { date: "Mon", mood: 7, energy: 6, stress: 4, sleep: 7 },
    { date: "Tue", mood: 8, energy: 7, stress: 3, sleep: 8 },
    { date: "Wed", mood: 6, energy: 5, stress: 6, sleep: 6 },
    { date: "Thu", mood: 9, energy: 8, stress: 2, sleep: 8 },
    { date: "Fri", mood: 8, energy: 7, stress: 3, sleep: 7 },
    { date: "Sat", mood: 9, energy: 9, stress: 1, sleep: 9 },
    { date: "Sun", mood: 8, energy: 8, stress: 2, sleep: 8 },
  ]

  const wellnessCategories = [
    { name: "Mental Health", value: 85, color: "#0E300F" },
    { name: "Physical Health", value: 78, color: "#D6D7D2" },
    { name: "Social Connection", value: 72, color: "#374151" },
    { name: "Sleep Quality", value: 88, color: "#f0fdf4" },
  ]

  const dailyActivities: DailyActivity[] = [
    {
      id: "1",
      name: "Mindfulness Practice",
      category: "mental",
      completed: true,
      target: 20,
      current: 15,
      unit: "min",
    },
    {
      id: "2",
      name: "Physical Exercise",
      category: "physical",
      completed: true,
      target: 30,
      current: 30,
      unit: "min",
    },
    {
      id: "3",
      name: "Social Interaction",
      category: "social",
      completed: false,
      target: 3,
      current: 2,
      unit: "interactions",
    },
    {
      id: "4",
      name: "Water Intake",
      category: "nutrition",
      completed: false,
      target: 8,
      current: 5,
      unit: "glasses",
    },
    {
      id: "5",
      name: "Gratitude Journal",
      category: "mental",
      completed: false,
      target: 1,
      current: 0,
      unit: "entry",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mental":
        return <Brain className="h-4 w-4" />
      case "physical":
        return <Activity className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "nutrition":
        return <Utensils className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mental":
        return "bg-blue-100 text-blue-800"
      case "physical":
        return "bg-green-100 text-green-800"
      case "social":
        return "bg-purple-100 text-purple-800"
      case "nutrition":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Wellness</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">81%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
            <Progress value={81} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Average</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7.9/10</div>
            <p className="text-xs text-muted-foreground">Feeling positive</p>
            <div className="flex mt-2 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-2 w-3 bg-primary rounded-sm" />
              ))}
              <div className="h-2 w-3 bg-muted rounded-sm" />
              <div className="h-2 w-3 bg-muted rounded-sm" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7.4h</div>
            <p className="text-xs text-muted-foreground">Average this week</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Good
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3.2/10</div>
            <p className="text-xs text-muted-foreground">Low stress week</p>
            <Progress value={32} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Wellness Trends</CardTitle>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Track your mood, energy, and stress levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#0E300F" strokeWidth={2} name="Mood" />
                <Line type="monotone" dataKey="energy" stroke="#D6D7D2" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="stress" stroke="#374151" strokeWidth={2} name="Stress" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Balance</CardTitle>
            <CardDescription>Your overall wellness across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wellnessCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wellnessCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {wellnessCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm font-medium ml-auto">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Life Tracker
          </CardTitle>
          <CardDescription>Track your daily wellness activities and build healthy habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyActivities.map((activity) => (
              <Card key={activity.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(activity.category)}
                    <h4 className="font-medium text-sm">{activity.name}</h4>
                  </div>
                  {activity.completed && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {activity.current}/{activity.target} {activity.unit}
                    </span>
                    <span>{Math.round((activity.current / activity.target) * 100)}%</span>
                  </div>
                  <Progress value={(activity.current / activity.target) * 100} className="h-2" />
                  <Badge variant="secondary" className={`text-xs ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </Badge>
                </div>
              </Card>
            ))}

            <Card className="p-4 border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors">
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Add Activity</span>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Today's Check-in
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Mood</label>
                <span className="text-sm text-muted-foreground">{todayMood[0]}/10</span>
              </div>
              <Slider value={todayMood} onValueChange={setTodayMood} max={10} min={1} step={1} className="w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Energy Level</label>
                <span className="text-sm text-muted-foreground">{todayEnergy[0]}/10</span>
              </div>
              <Slider value={todayEnergy} onValueChange={setTodayEnergy} max={10} min={1} step={1} className="w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Stress Level</label>
                <span className="text-sm text-muted-foreground">{todayStress[0]}/10</span>
              </div>
              <Slider value={todayStress} onValueChange={setTodayStress} max={10} min={1} step={1} className="w-full" />
            </div>

            <Button className="w-full">Save Today's Check-in</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Wellness Journal
            </CardTitle>
            <CardDescription>Reflect on your day and track your thoughts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="How was your day? What are you grateful for? Any challenges you faced?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{journalEntry.length}/500 characters</span>
              <Button size="sm">Save Entry</Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-medium">Recent Entries</h4>
              <div className="space-y-2">
                <div className="p-2 bg-muted/50 rounded text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Yesterday</span>
                    <Badge variant="secondary" className="text-xs">
                      8.5/10
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Had a great day with friends. Feeling grateful for the support system...
                  </p>
                </div>
                <div className="p-2 bg-muted/50 rounded text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">2 days ago</span>
                    <Badge variant="secondary" className="text-xs">
                      7.2/10
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Challenging day with exams, but managed stress well with breathing exercises...
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Insights & Recommendations
          </CardTitle>
          <CardDescription>AI-powered insights based on your wellness data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Great Progress!</h4>
              <p className="text-sm text-green-700">
                Your mood has been consistently above 7 this week. Keep up the great work with your mindfulness
                practice!
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Sleep Optimization</h4>
              <p className="text-sm text-blue-700">
                Consider going to bed 30 minutes earlier to reach your 8-hour sleep goal. Better sleep could boost your
                energy levels.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Social Connection</h4>
              <p className="text-sm text-purple-700">
                You've been doing well with social interactions. Try joining a study group or wellness community for
                added support.
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">Hydration Reminder</h4>
              <p className="text-sm text-orange-700">
                You're averaging 5 glasses of water daily. Aim for 8 glasses to improve energy and cognitive function.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
