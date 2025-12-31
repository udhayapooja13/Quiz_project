"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isAuthenticated } from "@/lib/auth"
import Link from "next/link"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-balance">Welcome to QuizMaster</CardTitle>
          <CardDescription className="text-lg">Test your knowledge with our interactive quizzes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/login">
            <Button className="w-full" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full bg-transparent" variant="outline" size="lg">
              Sign Up
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
