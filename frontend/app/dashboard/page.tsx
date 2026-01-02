"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser, getToken, clearAuth, isAdmin } from "@/lib/auth"
import { getMyScores, type Score } from "@/lib/api"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const loadScores = async () => {
      const token = getToken()
      if (!token) return

      try {
        const data = await getMyScores(token)
        setScores(data)
      } catch (error) {
        console.error("Failed to load scores:", error)
      } finally {
        setLoading(false)
      }
    }

    loadScores()
  }, [user, router])

  const handleLogout = () => {
    clearAuth()
    router.push("/")
  }

  if (!user) return null

  const bestScore = scores.length > 0 ? Math.max(...scores.map((s) => s.percentage)) : 0
  const avgScore = scores.length > 0 ? scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-500">QuizMaster</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
            {isAdmin() && (
              <Link href="/admin/add-question">
                <Button variant="outline" size="sm">
                  Add Question
                </Button>
              </Link>
            )}
            <Button className="text-white bg-red-500 hover:bg-red-600" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{scores.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Best Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{bestScore.toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{avgScore.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Start a New Quiz</CardTitle>
              <CardDescription>Test your knowledge with 10 random questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/quiz">
                <Button className="w-full" size="lg">
                  Start Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scores</CardTitle>
              <CardDescription>Your latest quiz attempts</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : scores.length === 0 ? (
                <p className="text-muted-foreground">No quizzes taken yet</p>
              ) : (
                <div className="space-y-2">
                  {scores.slice(0, 5).map((score) => (
                    <div key={score.id} className="flex justify-between items-center p-2 rounded-md bg-muted">
                      <span className="text-sm">
                        {score.score}/{score.total_questions} correct
                      </span>
                      <span className="font-semibold">{score.percentage.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
