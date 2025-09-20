import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-sage-200 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-semibold text-forest-900">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              {params?.error ? (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">Error: {params.error}</p>
              ) : (
                <p className="text-sm text-sage-700">An authentication error occurred. Please try again.</p>
              )}
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
                <Link href="/auth/login">Try signing in again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/signup">Create new account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
