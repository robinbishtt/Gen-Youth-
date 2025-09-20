import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-sage-200 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-sage-500 to-forest-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-semibold text-forest-900">Check your email</CardTitle>
            <CardDescription className="text-sage-600">We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-sm text-sage-700">
                We've sent a verification link to your email address. Please check your inbox and click the link to
                activate your account.
              </p>
              <p className="text-xs text-sage-500">
                Don't forget to check your spam folder if you don't see the email.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/login">Back to sign in</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
