"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Suspense } from "react"

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "0")
  const percentage = Number.parseFloat(searchParams.get("percentage") || "0")

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excellent!", color: "text-green-600 dark:text-green-400" }
    if (percentage >= 70) return { message: "Good Job!", color: "text-blue-600 dark:text-blue-400" }
    if (percentage >= 50) return { message: "Not Bad!", color: "text-yellow-600 dark:text-yellow-400" }
    return { message: "Keep Practicing!", color: "text-orange-600 dark:text-orange-400" }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className={`text-5xl font-bold mb-2 ${performance.color}`}>{percentage.toFixed(1)}%</p>
            <p className="text-xl font-semibold mb-4">{performance.message}</p>
            <p className="text-muted-foreground">
              You answered <span className="font-bold">{score}</span> out of <span className="font-bold">{total}</span>{" "}
              questions correctly
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/quiz">
              <Button className="w-full" size="lg">
                Take Another Quiz
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <p>Loading results...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
