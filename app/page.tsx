"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CrystalBall } from "@/components/crystal-ball"
import EnergyFlowParticles from "@/components/energy-flow-particles"
import DataStreamFlow from "@/components/data-stream-flow"
import BioFeedbackRing from "@/components/bio-feedback-ring"
import {
  Sparkles,
  Heart,
  Zap,
  Wand2,
  Feather,
  Palette,
  Scroll,
  Lightbulb,
  Cloud,
  Leaf,
  Moon,
  Sun,
  Droplet,
  Mountain,
  MapIcon as City,
  Waves,
  Music,
  Bell,
  Wind,
  Book,
  Map,
  Eye,
  ScanEye,
  Code,
} from "lucide-react"

interface Question {
  id: number
  question: string
  options: {
    label: string
    value: string
    icon: React.ReactNode
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "How are you feeling right now?",
    options: [
      { label: "Peaceful and content", value: "peaceful", icon: <Heart className="w-6 h-6" /> },
      { label: "Happy and energetic", value: "energetic", icon: <Lightbulb className="w-6 h-6" /> },
      { label: "A little sad or thoughtful", value: "thoughtful", icon: <Cloud className="w-6 h-6" /> },
      { label: "Curious and adventurous", value: "adventurous", icon: <Map className="w-6 h-6" /> },
    ],
  },
  {
    id: 2,
    question: "Which landscape best reflects your current state of mind?",
    options: [
      { label: "A quiet, sunlit forest", value: "forest", icon: <Leaf className="w-6 h-6" /> },
      { label: "A bustling, vibrant city at night", value: "city", icon: <City className="w-6 h-6" /> },
      { label: "A calm, misty coastline", value: "coastline", icon: <Waves className="w-6 h-6" /> },
      { label: "A looming mountain scape", value: "mountains", icon: <Mountain className="w-6 h-6" /> },
    ],
  },
  {
    id: 3,
    question: "If your feelings were a sound, what would they be?",
    options: [
      { label: "The gentle rhythm of rain on a window", value: "rain", icon: <Droplet className="w-6 h-6" /> },
      { label: "A joyful, upbeat melody", value: "melody", icon: <Music className="w-6 h-6" /> },
      { label: "The quiet hum of a sleeping city", value: "hum", icon: <Bell className="w-6 h-6" /> },
      { label: "The sound of distant, rolling thunder", value: "thunder", icon: <Wind className="w-6 h-6" /> },
    ],
  },
  {
    id: 4,
    question: "Choose a color that best represents your mood today.",
    options: [
      { label: "Soft, warm yellows and golds", value: "yellow", icon: <Sun className="w-6 h-6" /> },
      { label: "Deep, contemplative blues and purples", value: "blue", icon: <Moon className="w-6 h-6" /> },
      { label: "Bright, energetic reds and oranges", value: "red", icon: <Zap className="w-6 h-6" /> },
      { label: "Muted, earthy greens and browns", value: "green", icon: <Palette className="w-6 h-6" /> },
    ],
  },
  {
    id: 5,
    question: "What kind of story would you like your poem to tell?",
    options: [
      { label: "A story of quiet reflection and memory", value: "reflection", icon: <Book className="w-6 h-6" /> },
      {
        label: "A celebration of a simple, beautiful moment",
        value: "celebration",
        icon: <Sparkles className="w-6 h-6" />,
      },
      {
        label: "An exploration of a deep and complex emotion",
        value: "exploration",
        icon: <Eye className="w-6 h-6" />,
      },
      { label: "A tale of adventure and the unknown", value: "adventure", icon: <Wand2 className="w-6 h-6" /> },
    ],
  },
]

type PageType = "welcome" | "countdown" | "questions" | "generating"

export default function PoetryGenerator() {
  const [currentPage, setCurrentPage] = useState<PageType>("welcome")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [countdown, setCountdown] = useState(3)
  const [generatedPoem, setGeneratedPoem] = useState("")
  const [collectedIcons, setCollectedIcons] = useState<React.ReactNode[]>([])
  const [showPrintedPoem, setShowPrintedPoem] = useState(false)
  const [glowingButtonId, setGlowingButtonId] = useState<string | null>(null)
  const [crystalBallGlowTrigger, setCrystalBallGlowTrigger] = useState(false)
  const [poemPrinted, setPoemPrinted] = useState(false)

  const crystalBallRef = useRef<HTMLDivElement>(null)
  const [crystalBallCenter, setCrystalBallCenter] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const updateCrystalBallPosition = () => {
      if (crystalBallRef.current) {
        const rect = crystalBallRef.current.getBoundingClientRect()
        setCrystalBallCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
    }

    updateCrystalBallPosition()
    window.addEventListener("resize", updateCrystalBallPosition)
    return () => window.removeEventListener("resize", updateCrystalBallPosition)
  }, [currentPage])

  const getIconForValue = useCallback((value: string) => {
    for (const q of questions) {
      const foundOption = q.options.find((opt) => opt.value === value)
      if (foundOption) {
        return foundOption.icon
      }
    }
    return null
  }, [])

  useEffect(() => {
    if (currentPage === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (currentPage === "countdown" && countdown === 0) {
      setCurrentPage("questions")
    }
  }, [currentPage, countdown])

  useEffect(() => {
    if (currentPage === "generating" && !poemPrinted) {
      const generationTimer = setTimeout(() => {
        setGeneratedPoem(`In the quiet currents of your ${answers[0]} mind,
Where ${answers[1]} landscapes softly gleam,
A ${answers[2]} frequency, precisely aligned,
Woven in ${answers[3]} hues, a vibrant dream.

This ${answers[4]} data, a whispered, ancient art,
Unfurls its essence, pure and serene.
A signal shared, a brand new start,
In verses born, a soul's unseen sheen.`)
        setTimeout(() => {
          setShowPrintedPoem(true)
        }, 1000)

        setTimeout(() => {
          setPoemPrinted(true)
        }, 1000 + 2000) // 1s delay + 2s animation duration
      }, 4000) // Time for "poetic algorithm compiling"

      return () => clearTimeout(generationTimer)
    }
  }, [currentPage, answers, poemPrinted])

  useEffect(() => {
    if (crystalBallGlowTrigger) {
      const timer = setTimeout(() => setCrystalBallGlowTrigger(false), 500)
      return () => clearTimeout(timer)
    }
  }, [crystalBallGlowTrigger])

  const handleStart = async () => {
    try {
      await fetch("http://10.129.126.43:5000/start", {
        method: "POST",
      })
      setCurrentPage("countdown")
      setCountdown(3)
    } catch (error) {
      console.error("Failed to start session:", error)
    }
  }
  
  const handleAnswer = async (optionValue: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const iconToAdd = getIconForValue(optionValue)
    const uniqueButtonId = `${currentQuestion}-${optionValue}`
  
    setGlowingButtonId(uniqueButtonId)
    setTimeout(() => setGlowingButtonId(null), 500)
    setCrystalBallGlowTrigger(true)
  
    if (iconToAdd) {
      setCollectedIcons((prev) => [...prev, iconToAdd])
    }
  
    const newAnswers = [...answers, optionValue]
    setAnswers(newAnswers)
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentPage("generating")
  
      try {
        const response = await fetch("http://10.129.126.43:5000/submit_answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: newAnswers }),
        })
        const data = await response.json()
        if (data && data.poem) {
          setGeneratedPoem(data.poem)
          setTimeout(() => {
            setShowPrintedPoem(true)
          }, 1000)
          setTimeout(() => {
            setPoemPrinted(true)
          }, 3000)
        }
      } catch (error) {
        console.error("Failed to submit answers:", error)
      }
    }
  }

  const handleRestart = () => {
    setCurrentPage("welcome")
    setCurrentQuestion(0)
    setAnswers([])
    setCollectedIcons([])
    setCountdown(3)
    setGeneratedPoem("")
    setShowPrintedPoem(false)
    setGlowingButtonId(null)
    setCrystalBallGlowTrigger(false)
    setPoemPrinted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <EnergyFlowParticles />
      <DataStreamFlow />

      {/* Background grid/energy field (mint green) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.1),transparent_70%)]"></div>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundSize: "20px 20px",
          backgroundImage:
            "radial-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), radial-gradient(rgba(52,211,153,0.3) 1px, transparent 1px)",
        }}
      ></div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Welcome Page */}
        {currentPage === "welcome" && (
          <Card className="p-16 text-center bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border border-emerald-700/30 shadow-2xl rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/5 to-teal-800/5 animate-pulse"></div>
            <div className="absolute inset-0 border border-emerald-400/10 rounded-3xl animate-pulse"></div>

            <div className="relative z-10">
              <div className="mb-12">
                <div className="relative mb-8">
                  <ScanEye className="w-20 h-20 mx-auto text-emerald-400 mb-6 animate-pulse" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-teal-400 animate-spin" />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Code className="w-8 h-8 text-green-400 animate-pulse" />
                  </div>
                </div>

                <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-6 animate-pulse font-sans">
                  Poetic Mind
                </h1>
                <p className="text-2xl text-emerald-300 mb-4 font-light">Unlocking the frequencies of your mood</p>
                <p className="text-lg text-gray-300 italic">Where every pulse creates a verse</p>
              </div>

              <div className="mb-12">
                <p className="text-2xl text-emerald-200 mb-8 font-medium">Place your left hand upon the sensors</p>
                <BioFeedbackRing size="w-40 h-40" />
                <p className="text-emerald-400 mt-4 text-lg italic">Initiating bio-feedback scan...</p>
              </div>

              <Button
                onClick={handleStart}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:via-teal-500 hover:to-green-500 text-white px-16 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold tracking-wide border border-emerald-400/30"
              >
                ⚡ BEGIN RESONANCE ⚡
              </Button>
            </div>
          </Card>
        )}

        {/* Countdown Page */}
        {currentPage === "countdown" && (
          <Card className="p-16 text-center bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border border-emerald-700/30 shadow-2xl rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 animate-pulse"></div>
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <ScanEye className="w-16 h-16 mx-auto text-emerald-400 mb-8 animate-pulse" />
              <h2 className="text-3xl font-semibold text-emerald-200 mb-12">Calibrating bio-sensors...</h2>
              <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-8 animate-bounce font-mono">
                {countdown}
              </div>
              <p className="text-gray-300 text-xl italic">Preparing for data input...</p>
            </div>
          </Card>
        )}

        {/* Questions Page */}
        {currentPage === "questions" && (
          <div className="flex flex-col items-center gap-8">
            <Card className="p-10 bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border border-emerald-700/30 shadow-2xl rounded-3xl relative overflow-hidden w-full">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-3xl">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out rounded-t-3xl"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="mb-8 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-emerald-400 font-medium font-mono">
                    DATA POINT {currentQuestion + 1} / {questions.length}
                  </span>
                  <div className="flex space-x-2">
                    {[...Array(questions.length)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i <= currentQuestion ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h2 className="font-semibold text-emerald-100 leading-relaxed font-sans mb-8 text-2xl">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid gap-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={(e) => handleAnswer(option.value, e)}
                    variant="outline"
                    className={`p-8 h-auto text-left justify-start hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-teal-900/30 hover:border-emerald-400/50 border-2 border-gray-700 bg-gray-900/50 transition-all duration-300 group rounded-2xl transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/20 px-7 py-5 ${glowingButtonId === `${currentQuestion}-${option.value}` ? "animate-button-glow" : ""}`}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="text-emerald-400 group-hover:text-emerald-300 transform group-hover:scale-110 transition-all duration-200">
                        {option.icon}
                      </div>
                      <span className="text-xl text-gray-200 group-hover:text-emerald-100 font-sans">
                        {option.label}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>

            <div className="relative w-64 h-64 mt-8" ref={crystalBallRef}>
              <CrystalBall collectedIcons={collectedIcons} isGenerating={false} triggerGlow={crystalBallGlowTrigger} />
            </div>
          </div>
        )}

        {/* Generating Page (now also displays the poem) */}
        {currentPage === "generating" && (
          <Card className="p-16 text-center bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-xl border border-emerald-700/30 shadow-2xl rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-emerald-400/40" />
                </div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Title/Description for Result State (always visible if poemPrinted) */}
              {poemPrinted && (
                <div className="text-center mb-10">
                  <div className="relative mb-6">
                    <Scroll className="w-16 h-16 mx-auto text-emerald-400" />
                    <Sparkles className="w-8 h-8 absolute -top-2 -right-2 text-teal-400 animate-pulse" />
                  </div>
                  <h2 className="text-4xl font-semibold text-emerald-200 mb-4 font-sans">Your Poetic Resonance</h2>
                  <p className="text-gray-300 text-lg italic font-mono">A frequency decoded into verse</p>
                </div>
              )}

              {/* Compiling UI (only if not poemPrinted) */}
              {!poemPrinted && (
                <div className="mb-12">
                  <div className="relative">
                    <Code className="w-24 h-24 mx-auto mb-8 text-emerald-400 animate-spin" />
                    <div className="absolute inset-0 animate-ping">
                      <Code className="w-24 h-24 mx-auto text-emerald-400/30" />
                    </div>
                  </div>

                  <h2 className="text-4xl font-semibold text-emerald-200 mb-6 font-sans">
                    Poetic algorithm compiling...
                  </h2>
                  <p className="text-gray-300 text-xl mb-8 italic font-mono">Synthesizing emotional data...</p>

                  <div className="flex justify-center space-x-3 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crystal Ball */}
              <div
                className={`relative w-80 h-80 animate-scale-up ${poemPrinted ? "mt-0" : "mb-12"}`}
                ref={crystalBallRef}
              >
                <CrystalBall
                  collectedIcons={collectedIcons}
                  isGenerating={!poemPrinted}
                  triggerGlow={crystalBallGlowTrigger}
                />
              </div>

              {/* The "Paper" element, rendered separately below the crystal ball */}
              {showPrintedPoem && (
                <div className="relative w-3/4 max-w-md mx-auto mt-[-20px] z-0">
                  <div className="animate-paper-print">
                    <pre className="whitespace-pre-wrap text-center font-sans text-base leading-relaxed">
                      {generatedPoem}
                    </pre>
                  </div>
                </div>
              )}

              {/* Restart button and text (only if poemPrinted) */}
              {poemPrinted && (
                <div className="text-center space-y-6 mt-12">
                  <div className="flex items-center justify-center space-x-4 text-emerald-400 mb-4">
                    <Feather className="w-6 h-6" />
                    <span className="text-lg font-mono">Printing your unique frequency...</span>
                    <Feather className="w-6 h-6" />
                  </div>

                  <Button
                    onClick={handleRestart}
                    className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:via-teal-500 hover:to-green-500 text-white px-12 py-4 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border border-emerald-400/30"
                  >
                    ⚡ RECALIBRATE SYSTEM ⚡
                  </Button>
                  
                </div>
              )}

              {/* Thermal output text (only if not poemPrinted) */}
              {!poemPrinted && <p className="text-emerald-400 text-lg font-mono">Thermal output initiated...</p>}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
