import { useRef, useState } from 'react'
import './App.css'

type Practice = {
  root: string
  quality: string
  augment: string
  position: number
  voice: number
  technique: string
  tempo: number
}

const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
const qualities = ['Major', 'Minor', 'Augmented', 'Diminished'] as const
const augments = ['None', '2', '4', '7'] as const
const techniques = ['Strum', 'Pluck', 'Arpeggiate', 'Tap'] as const
const positions = Array.from({ length: 15 }, (_, i) => i)
const voices = [1, 2, 3]

const frequencies: Record<(typeof roots)[number], number> = {
  C: 261.63,
  'C#': 277.18,
  D: 293.66,
  'D#': 311.13,
  E: 329.63,
  F: 349.23,
  'F#': 369.99,
  G: 392,
  'G#': 415.3,
  A: 440,
  'A#': 466.16,
  B: 493.88,
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generatePractice(): Practice {
  return {
    root: randomItem(roots),
    quality: randomItem(qualities),
    augment: randomItem(augments),
    position: randomItem(positions),
    voice: randomItem(voices),
    technique: randomItem(techniques),
    tempo: Math.floor(Math.random() * 80) + 60,
  }
}

function App() {
  const [practice, setPractice] = useState<Practice | null>(null)
  const audioCtx = useRef<AudioContext | null>(null)

  const playRoot = (root: string, tempo: number) => {
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext()
    }
    const ctx = audioCtx.current
    if (!ctx) return
    const freq = frequencies[root as keyof typeof frequencies]
    const interval = 60000 / tempo
    let count = 0

    const play = () => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    }

    play()
    const handle = setInterval(() => {
      count += 1
      if (count >= 4) {
        clearInterval(handle)
        return
      }
      play()
    }, interval)
  }

  const handleGenerate = () => {
    const p = generatePractice()
    setPractice(p)
    playRoot(p.root, p.tempo)
  }

  return (
    <div>
      <h1>Guitar Practicer</h1>
      <button onClick={handleGenerate}>Generate Practice</button>
      {practice && (
        <div className="card">
          <h2>Practice Drill</h2>
          <ul>
            <li>Root: {practice.root}</li>
            <li>Quality: {practice.quality}</li>
            <li>Augment: {practice.augment}</li>
            <li>Position: {practice.position}</li>
            <li>Voice: {practice.voice}</li>
            <li>Technique: {practice.technique}</li>
            <li>Tempo: {practice.tempo} BPM</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
