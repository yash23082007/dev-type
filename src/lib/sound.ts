// Simple Web Audio API sound synthesis with volume levels and mechanical click/typewriter sound type options.

let audioCtx: AudioContext | null = null

function getContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AudioCtx()
  }
  return audioCtx
}

export function playKeySound(volumePercent = 50, soundType: 'standard' | 'mechanical' | 'typewriter' | 'beep' = 'standard') {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const vol = (volumePercent / 100) * 0.12 // Normalize volume
  
  if (soundType === 'beep') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  } else if (soundType === 'mechanical') {
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(5000, ctx.currentTime + 0.008)
    gain.gain.setValueAtTime(vol * 1.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012)
    
    // Add micro bounce click back
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(150, ctx.currentTime + 0.004)
    gain2.gain.setValueAtTime(vol * 0.5, ctx.currentTime + 0.004)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start()
    osc2.stop(ctx.currentTime + 0.018)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.012)
  } else if (soundType === 'typewriter') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.06)
    
    const noise = ctx.createOscillator()
    const noiseGain = ctx.createGain()
    noise.type = 'sawtooth'
    noise.frequency.setValueAtTime(1800, ctx.currentTime)
    noiseGain.gain.setValueAtTime(vol * 0.4, ctx.currentTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012)
    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start()
    noise.stop(ctx.currentTime + 0.012)

    gain.gain.setValueAtTime(vol * 1.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  } else {
    // standard click
    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04)
    
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  }
}

export function playErrorSound(volumePercent = 50, soundType = 'standard') {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const vol = (volumePercent / 100) * 0.15
  
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.12)
  
  gain.gain.setValueAtTime(vol * 1.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.12)
}

export function playSuccessSound(volumePercent = 50) {
  const ctx = getContext()
  if (!ctx) return
  
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const vol = (volumePercent / 100) * 0.08
  
  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, ctx.currentTime)
  osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.08)
  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.16)
  
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.04)
  gain.gain.setValueAtTime(vol, ctx.currentTime + 0.16)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.start()
  osc.stop(ctx.currentTime + 0.35)
}
