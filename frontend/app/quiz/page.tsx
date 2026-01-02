"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getToken, getUser } from "@/lib/auth"
import { getRandomQuestions, submitQuiz, type Question } from "@/lib/api"
import { Progress } from "@/components/ui/progress"

export default function QuizPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.push("/login")
      return
    }

    const loadQuestions = async () => {
      const token = getToken()
      if (!token) return

      try {
        const data = await getRandomQuestions(token, 10)
        setQuestions(data)
      } catch (error) {
        console.error("Failed to load questions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [router])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    const token = getToken()
    if (!token) return

    setSubmitting(true)
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        question_id: Number.parseInt(questionId),
        selected_answer: answer,
      }))

      const score = await submitQuiz(token, formattedAnswers)
      router.push(`/results?score=${score.score}&total=${score.total_questions}&percentage=${score.percentage}`)
    } catch (error) {
      console.error("Failed to submit quiz:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg">Loading quiz...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>There are no questions in the database yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {currentQuestion.category}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary">{currentQuestion.difficulty}</span>
            </div>
            <CardTitle className="text-xl text-balance">{currentQuestion.question_text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-3">
              {["A", "B", "C", "D"].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value={option} id={`option-${option}`} />
                  <Label htmlFor={`option-${option}`} className="flex-1 cursor-pointer">
                    {currentQuestion[`option_${option.toLowerCase()}` as keyof Question]}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6 gap-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
                Previous
              </Button>
              {currentIndex === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length || submitting}>
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
