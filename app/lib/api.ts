const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

interface LoginData {
  username: string
  password: string
}

interface SignupData extends LoginData {
  email: string
}

export interface User {
  id: number
  username: string
  email: string
  is_admin: number
  created_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface Question {
  id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  difficulty: string
  category: string
}

export interface Score {
  id: number
  user_id: number
  score: number
  total_questions: number
  percentage: number
  completed_at: string
}

// Auth API
export async function signup(data: SignupData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Signup failed")
  }
  return res.json()
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Login failed")
  }
  return res.json()
}

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to get user")
  return res.json()
}

// Questions API
export async function getRandomQuestions(token: string, count = 10): Promise<Question[]> {
  const res = await fetch(`${API_URL}/questions/random?count=${count}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to get questions")
  return res.json()
}

export async function addQuestion(token: string, question: Omit<Question, "id" | "created_at">): Promise<Question> {
  const res = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(question),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to add question")
  }
  return res.json()
}

// Quiz API
export async function submitQuiz(
  token: string,
  answers: { question_id: number; selected_answer: string }[],
): Promise<Score> {
  const res = await fetch(`${API_URL}/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error("Failed to submit quiz")
  return res.json()
}

// Scores API
export async function getMyScores(token: string): Promise<Score[]> {
  const res = await fetch(`${API_URL}/scores/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to get scores")
  return res.json()
}

export async function getLeaderboard(token: string): Promise<Score[]> {
  const res = await fetch(`${API_URL}/scores/all?limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to get leaderboard")
  return res.json()
}
