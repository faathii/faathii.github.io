// Realistic tactile multi-phase paper flutter sound using Web Audio API
export const playPageTurnSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Phase 1: Initial paper leaf lift & gentle rustle (0.0s - 0.18s)
    const liftBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
    const liftData = liftBuffer.getChannelData(0);
    for (let i = 0; i < liftData.length; i++) {
      const p = i / liftData.length;
      liftData[i] = (Math.random() * 2 - 1) * Math.sin(p * Math.PI) * 0.4;
    }
    const liftSource = ctx.createBufferSource();
    liftSource.buffer = liftBuffer;

    const liftFilter = ctx.createBiquadFilter();
    liftFilter.type = 'bandpass';
    liftFilter.frequency.setValueAtTime(800, now);
    liftFilter.frequency.linearRampToValueAtTime(1400, now + 0.18);
    liftFilter.Q.value = 2.5;

    const liftGain = ctx.createGain();
    liftGain.gain.setValueAtTime(0.04, now);
    liftGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    liftSource.connect(liftFilter);
    liftFilter.connect(liftGain);
    liftGain.connect(ctx.destination);
    liftSource.start(now);

    // Phase 2: Air rush & smooth paper flight arc (0.08s - 0.55s)
    const flightDuration = 0.45;
    const flightBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * flightDuration), ctx.sampleRate);
    const flightData = flightBuffer.getChannelData(0);
    for (let i = 0; i < flightData.length; i++) {
      const p = i / flightData.length;
      // Parabolic envelope with soft flutter modulation
      const flutter = 1 + 0.2 * Math.sin(p * 24 * Math.PI);
      flightData[i] = (Math.random() * 2 - 1) * Math.sin(p * Math.PI) * 0.5 * flutter;
    }
    const flightSource = ctx.createBufferSource();
    flightSource.buffer = flightBuffer;

    const flightFilter = ctx.createBiquadFilter();
    flightFilter.type = 'lowpass';
    flightFilter.frequency.setValueAtTime(1800, now + 0.08);
    flightFilter.frequency.exponentialRampToValueAtTime(320, now + 0.08 + flightDuration);

    const flightGain = ctx.createGain();
    flightGain.gain.setValueAtTime(0.06, now + 0.08);
    flightGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08 + flightDuration);

    flightSource.connect(flightFilter);
    flightFilter.connect(flightGain);
    flightGain.connect(ctx.destination);
    flightSource.start(now + 0.08);

    // Phase 3: Paper landing onto the opposite stack (soft settle tap) (0.48s - 0.72s)
    const settleDuration = 0.24;
    const settleBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * settleDuration), ctx.sampleRate);
    const settleData = settleBuffer.getChannelData(0);
    for (let i = 0; i < settleData.length; i++) {
      const p = i / settleData.length;
      settleData[i] = (Math.random() * 2 - 1) * Math.exp(-p * 12);
    }
    const settleSource = ctx.createBufferSource();
    settleSource.buffer = settleBuffer;

    const settleFilter = ctx.createBiquadFilter();
    settleFilter.type = 'lowpass';
    settleFilter.frequency.setValueAtTime(600, now + 0.48);
    settleFilter.frequency.exponentialRampToValueAtTime(150, now + 0.48 + settleDuration);

    const settleGain = ctx.createGain();
    settleGain.gain.setValueAtTime(0.05, now + 0.48);
    settleGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.48 + settleDuration);

    settleSource.connect(settleFilter);
    settleFilter.connect(settleGain);
    settleGain.connect(ctx.destination);
    settleSource.start(now + 0.48);

  } catch {
    // Ignore if audio is restricted by autoplay policies
  }
};
