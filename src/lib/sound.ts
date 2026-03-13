// Very simple web audio API sound effects so we don't depend on external files

let audioCtx: AudioContext | null = null

function getContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AudioCtx()
  }
  return audioCtx
}

export function playKeySound() {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'sine'
  osc.frequency.setValueAtTime(400, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05)
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.05)
}

export function playErrorSound() {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.1)
  
  gain.gain.setValueAtTime(0.15, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.1)
}

export function playSuccessSound() {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, ctx.currentTime)
  osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1)
  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2)
  
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05)
  gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.2)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.4)
}
