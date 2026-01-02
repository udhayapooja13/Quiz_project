"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getToken, isAdmin } from "@/lib/auth"
import { addQuestion } from "@/lib/api"
import Link from "next/link"

export default function AddQuestionPage() {
  const router = useRouter()
  const [questionText, setQuestionText] = useState("")
  const [optionA, setOptionA] = useState("")
  const [optionB, setOptionB] = useState("")
  const [optionC, setOptionC] = useState("")
  const [optionD, setOptionD] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [category, setCategory] = useState("general")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    const token = getToken()
    if (!token) {
      setError("Not authenticated")
      setLoading(false)
      return
    }

    try {
      await addQuestion(token, {
        question_text: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: correctAnswer,
        difficulty,
        category,
      })

      setSuccess("Question added successfully!")
      // Reset form
      setQuestionText("")
      setOptionA("")
      setOptionB("")
      setOptionC("")
      setOptionD("")
      setCorrectAnswer("")
      setDifficulty("medium")
      setCategory("general")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add question")
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin()) return null

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">QuizMaster Admin</h1>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Question</CardTitle>
            <CardDescription>Create a new quiz question for users to answer</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">{error}</div>}
              {success && (
                <div className="p-3 text-sm bg-green-500/10 text-green-600 dark:text-green-400 rounded-md">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter your question here..."
                  required
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="optionA">Option A *</Label>
                  <Input
                    id="optionA"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="First option"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="optionB">Option B *</Label>
                  <Input
                    id="optionB"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="Second option"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="optionC">Option C *</Label>
                  <Input
                    id="optionC"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    placeholder="Third option"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="optionD">Option D *</Label>
                  <Input
                    id="optionD"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    placeholder="Fourth option"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="correct">Correct Answer *</Label>
                  <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                    <SelectTrigger id="correct">
                      <SelectValue placeholder="Select answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Option A</SelectItem>
                      <SelectItem value="B">Option B</SelectItem>
                      <SelectItem value="C">Option C</SelectItem>
                      <SelectItem value="D">Option D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Science, History"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Adding Question..." : "Add Question"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </main>
    </div>
  )
}
