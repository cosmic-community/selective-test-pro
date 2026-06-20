'use client'

import { useState } from 'react'
import { Question } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface QuestionPlayerProps {
  questions: Question[]
}

function normalizeOptions(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === 'string') return item
      if (typeof item === 'object' && item !== null) {
        if ('value' in item) return String((item as { value: unknown }).value)
        if ('label' in item) return String((item as { label: unknown }).label)
      }
      return String(item)
    })
  }
  return []
}

export default function QuestionPlayer({ questions }: QuestionPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">No questions are available for this test yet.</p>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">Question not found.</p>
      </div>
    )
  }

  const questionText = getMetafieldValue(currentQuestion.metadata?.question_text)
  const options = normalizeOptions(currentQuestion.metadata?.options)
  const correctAnswer = getMetafieldValue(currentQuestion.metadata?.correct_answer)
  const explanation = getMetafieldValue(currentQuestion.metadata?.explanation)
  const points = currentQuestion.metadata?.points ?? 1

  const isCorrect = selected !== null && selected === correctAnswer

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    if (!answeredIds.includes(currentQuestion.id)) {
      if (selected === correctAnswer) {
        setScore((prev) => prev + (typeof points === 'number' ? points : 1))
      }
      setAnsweredIds((prev) => [...prev, currentQuestion.id])
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setCurrentIndex((prev) => prev + 1)
    setSelected(null)
    setSubmitted(false)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setAnsweredIds([])
    setFinished(false)
  }

  const totalPoints = questions.reduce((acc, q) => {
    const p = q.metadata?.points
    return acc + (typeof p === 'number' ? p : 1)
  }, 0)

  if (finished) {
    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900">Test Complete!</h3>
        <p className="mt-2 text-gray-500">You scored</p>
        <p className="mt-1 text-4xl font-extrabold text-brand-600">
          {score} / {totalPoints}
        </p>
        <p className="mt-1 text-lg font-semibold text-gray-700">{percentage}%</p>
        <button
          onClick={handleRestart}
          className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-semibold text-brand-600">Score: {score}</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className="bg-brand-600 h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-6">{questionText}</h3>

      <div className="space-y-3">
        {options.map((option, idx) => {
          let optionClasses =
            'w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-colors '
          if (submitted) {
            if (option === correctAnswer) {
              optionClasses += 'border-green-500 bg-green-50 text-green-800'
            } else if (option === selected) {
              optionClasses += 'border-red-500 bg-red-50 text-red-800'
            } else {
              optionClasses += 'border-gray-200 bg-white text-gray-500'
            }
          } else if (option === selected) {
            optionClasses += 'border-brand-600 bg-brand-50 text-brand-700'
          } else {
            optionClasses += 'border-gray-200 bg-white text-gray-700 hover:border-brand-400'
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => setSelected(option)}
              className={optionClasses}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {submitted && (
        <div
          className={`mt-6 rounded-xl p-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
          </p>
          {explanation && <p className="mt-2 text-sm text-gray-600">{explanation}</p>}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? 'Finish' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}