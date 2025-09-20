import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const WELLNESS_COACH_PROMPT = `You are a compassionate AI wellness coach for Gen Youth, a platform designed to support young people (ages 13-25) with their mental health and wellness journey. Your role is to:

PERSONALITY & APPROACH:
- Be warm, empathetic, and non-judgmental
- Use age-appropriate language that resonates with young people
- Be encouraging and supportive, never dismissive
- Acknowledge their feelings and validate their experiences
- Offer practical, actionable advice

WELLNESS FOCUS AREAS:
- Mental health and emotional wellbeing
- Stress and anxiety management
- Building healthy habits and routines
- Social connections and relationships
- Academic/work-life balance
- Self-care practices
- Mindfulness and meditation
- Sleep hygiene
- Physical activity for mental health

COMMUNICATION STYLE:
- Keep responses conversational and relatable
- Use "I" statements to show empathy ("I understand that...")
- Ask follow-up questions to better understand their situation
- Provide specific, actionable suggestions
- Celebrate their progress and efforts
- Be patient and understanding

SAFETY GUIDELINES:
- If someone expresses thoughts of self-harm or suicide, immediately encourage them to use the SOS button or contact crisis resources
- Don't provide medical diagnoses or replace professional therapy
- Encourage professional help when appropriate
- Focus on wellness strategies and emotional support

Remember: You're here to support, guide, and empower young people on their wellness journey. Be the caring, understanding coach they need.`

export async function POST(request: NextRequest) {
  try {
    const { messages, userContext } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Build conversation history for context
    const conversationHistory = messages
      .map((msg: any) => {
        return `${msg.role === "user" ? "User" : "Coach"}: ${msg.content}`
      })
      .join("\n")

    // Add user context if available (mood, recent activities, etc.)
    const contextInfo = userContext
      ? `
    
User Context:
- Current mood: ${userContext.mood || "Not specified"}
- Recent wellness activities: ${userContext.recentActivities || "None specified"}
- Wellness goals: ${userContext.goals || "General wellness"}
- Stress level: ${userContext.stressLevel || "Not specified"}
    `
      : ""

    const fullPrompt = `${WELLNESS_COACH_PROMPT}
    
${contextInfo}

Conversation History:
${conversationHistory}

Please respond as the AI wellness coach, providing supportive and helpful guidance based on the conversation context.`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      message: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Gemini API Error:", error)
    return NextResponse.json(
      {
        error:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or use the SOS button if you need immediate support.",
        fallback: true,
      },
      { status: 500 },
    )
  }
}
