"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Brain,
  Zap,
  Moon,
  Sun,
  Cloud,
  Waves,
  Music,
  Headphones,
  Timer,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  category: "anxiety" | "depression" | "focus" | "sleep" | "energy" | "meditation"
  mood: string[]
  description: string
  audioUrl?: string
}

interface Playlist {
  id: string
  name: string
  description: string
  icon: any
  color: string
  tracks: Track[]
}

const musicLibrary: Playlist[] = [
  {
    id: "anxiety-relief",
    name: "Anxiety Relief",
    description: "Calming sounds to ease anxiety and promote relaxation",
    icon: Cloud,
    color: "bg-blue-100 text-blue-700",
    tracks: [
      {
        id: "1",
        title: "Gentle Rain",
        artist: "Nature Sounds",
        duration: 600,
        category: "anxiety",
        mood: ["anxious", "stressed", "overwhelmed"],
        description: "Soft rainfall sounds to calm racing thoughts",
      },
      {
        id: "2",
        title: "Deep Breathing Guide",
        artist: "Wellness Coach",
        duration: 480,
        category: "anxiety",
        mood: ["anxious", "panicked"],
        description: "Guided breathing exercise for immediate relief",
      },
      {
        id: "3",
        title: "Forest Ambience",
        artist: "Nature Sounds",
        duration: 720,
        category: "anxiety",
        mood: ["stressed", "tense"],
        description: "Peaceful forest sounds with gentle bird songs",
      },
    ],
  },
  {
    id: "mood-boost",
    name: "Mood Boost",
    description: "Uplifting music to brighten your day",
    icon: Sun,
    color: "bg-yellow-100 text-yellow-700",
    tracks: [
      {
        id: "4",
        title: "Morning Motivation",
        artist: "Positive Vibes",
        duration: 240,
        category: "energy",
        mood: ["sad", "low", "unmotivated"],
        description: "Energizing track to start your day right",
      },
      {
        id: "5",
        title: "Confidence Builder",
        artist: "Empowerment Music",
        duration: 300,
        category: "energy",
        mood: ["insecure", "doubtful"],
        description: "Boost your self-confidence with uplifting melodies",
      },
    ],
  },
  {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Concentration music for study and work",
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
    tracks: [
      {
        id: "6",
        title: "Study Beats",
        artist: "Focus Music",
        duration: 1800,
        category: "focus",
        mood: ["distracted", "unfocused"],
        description: "Lo-fi beats perfect for concentration",
      },
      {
        id: "7",
        title: "White Noise",
        artist: "Ambient Sounds",
        duration: 3600,
        category: "focus",
        mood: ["distracted", "restless"],
        description: "Pure white noise to block distractions",
      },
    ],
  },
  {
    id: "sleep-sounds",
    name: "Sleep Sounds",
    description: "Peaceful audio to help you rest",
    icon: Moon,
    color: "bg-indigo-100 text-indigo-700",
    tracks: [
      {
        id: "8",
        title: "Ocean Waves",
        artist: "Nature Sounds",
        duration: 2400,
        category: "sleep",
        mood: ["restless", "tired", "anxious"],
        description: "Gentle ocean waves for peaceful sleep",
      },
      {
        id: "9",
        title: "Sleep Meditation",
        artist: "Mindfulness Guide",
        duration: 1200,
        category: "sleep",
        mood: ["restless", "worried"],
        description: "Guided meditation for better sleep",
      },
    ],
  },
]

export default function MusicTherapy() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([75])
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const moods = [
    { name: "anxious", icon: Cloud, color: "bg-blue-100 text-blue-700" },
    { name: "sad", icon: Cloud, color: "bg-gray-100 text-gray-700" },
    { name: "stressed", icon: Zap, color: "bg-red-100 text-red-700" },
    { name: "tired", icon: Moon, color: "bg-indigo-100 text-indigo-700" },
    { name: "unfocused", icon: Brain, color: "bg-purple-100 text-purple-700" },
    { name: "low", icon: Heart, color: "bg-pink-100 text-pink-700" },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control actual audio playback
  }

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const getRecommendedTracks = (mood: string) => {
    const allTracks = musicLibrary.flatMap((playlist) => playlist.tracks)
    return allTracks.filter((track) => track.mood.includes(mood))
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    const recommended = getRecommendedTracks(mood)
    if (recommended.length > 0) {
      setCurrentTrack(recommended[0])
    }
  }

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  return (
    <div className="space-y-6">
      {/* Mood-Based Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-sage-600" />
            How are you feeling right now?
          </CardTitle>
          <CardDescription>Select your current mood to get personalized music recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedMood === mood.name ? "default" : "outline"}
                className={`h-16 flex flex-col gap-1 ${selectedMood === mood.name ? "bg-sage-600 text-white" : ""}`}
                onClick={() => handleMoodSelect(mood.name)}
              >
                <mood.icon className="h-5 w-5" />
                <span className="text-sm capitalize">{mood.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Player */}
      {currentTrack && (
        <Card className="bg-gradient-to-r from-sage-50 to-forest-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-lg bg-sage-200 flex items-center justify-center">
                <Music className="h-8 w-8 text-sage-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
                <p className="text-muted-foreground">{currentTrack.artist}</p>
                <p className="text-sm text-sage-600 mt-1">{currentTrack.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
                <Progress value={(currentTime / currentTrack.duration) * 100} className="flex-1" />
                <span className="text-sm text-muted-foreground">{formatTime(currentTrack.duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-12 w-12 bg-sage-600 hover:bg-sage-700" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Music Library */}
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="recommended">For You</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {musicLibrary.map((playlist) => (
              <Card key={playlist.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-lg ${playlist.color} flex items-center justify-center`}>
                      <playlist.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{playlist.name}</CardTitle>
                      <CardDescription>{playlist.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playlist.tracks.slice(0, 3).map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                        onClick={() => handleTrackSelect(track)}
                      >
                        <div>
                          <p className="font-medium text-sm">{track.title}</p>
                          <p className="text-xs text-muted-foreground">{track.artist}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{formatTime(track.duration)}</span>
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                    View All {playlist.tracks.length} Tracks
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {selectedMood ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended for when you're feeling {selectedMood}</h3>
              <div className="grid gap-3">
                {getRecommendedTracks(selectedMood).map((track) => (
                  <Card key={track.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-sage-100 flex items-center justify-center">
                            <Music className="h-5 w-5 text-sage-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{track.title}</h4>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {track.category}
                          </Badge>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleTrackSelect(track)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select your mood above</h3>
              <p className="text-muted-foreground">We'll recommend the perfect music to support how you're feeling</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Guided Sessions
                </CardTitle>
                <CardDescription>Structured music therapy sessions with guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">5-Minute Anxiety Relief</h4>
                  <p className="text-sm text-muted-foreground">Quick session for immediate calm</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">20-Minute Deep Relaxation</h4>
                  <p className="text-sm text-muted-foreground">Extended session for stress relief</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Focus Boost - 45 Minutes</h4>
                  <p className="text-sm text-muted-foreground">Enhanced concentration session</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Soundscapes
                </CardTitle>
                <CardDescription>Immersive environmental sounds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Tropical Beach</h4>
                  <p className="text-sm text-muted-foreground">Waves, seagulls, gentle breeze</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Mountain Forest</h4>
                  <p className="text-sm text-muted-foreground">Birds, rustling leaves, stream</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Cozy Fireplace</h4>
                  <p className="text-sm text-muted-foreground">Crackling fire, warm ambience</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
