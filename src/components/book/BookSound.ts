// Silky tactile multi-phase paper flutter sound using Web Audio API (synchronized to 0.68s flip)
export const playPageTurnSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Phase 1: Subtle initial paper leaf lift (0.0s - 0.14s)
    const liftBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.14), ctx.sampleRate);
    const liftData = liftBuffer.getChannelData(0);
    for (let i = 0; i < liftData.length; i++) {
      const p = i / liftData.length;
      liftData[i] = (Math.random() * 2 - 1) * Math.sin(p * Math.PI) * 0.35;
    }
    const liftSource = ctx.createBufferSource();
    liftSource.buffer = liftBuffer;

    const liftFilter = ctx.createBiquadFilter();
    liftFilter.type = 'bandpass';
    liftFilter.frequency.setValueAtTime(750, now);
    liftFilter.frequency.linearRampToValueAtTime(1300, now + 0.14);
    liftFilter.Q.value = 2.0;

    const liftGain = ctx.createGain();
    liftGain.gain.setValueAtTime(0.035, now);
    liftGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    liftSource.connect(liftFilter);
    liftFilter.connect(liftGain);
    liftGain.connect(ctx.destination);
    liftSource.start(now);

    // Phase 2: Smooth air glide arc (0.06s - 0.46s)
    const flightDuration = 0.40;
    const flightBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * flightDuration), ctx.sampleRate);
    const flightData = flightBuffer.getChannelData(0);
    for (let i = 0; i < flightData.length; i++) {
      const p = i / flightData.length;
      const flutter = 1 + 0.15 * Math.sin(p * 20 * Math.PI);
      flightData[i] = (Math.random() * 2 - 1) * Math.sin(p * Math.PI) * 0.45 * flutter;
    }
    const flightSource = ctx.createBufferSource();
    flightSource.buffer = flightBuffer;

    const flightFilter = ctx.createBiquadFilter();
    flightFilter.type = 'lowpass';
    flightFilter.frequency.setValueAtTime(1600, now + 0.06);
    flightFilter.frequency.exponentialRampToValueAtTime(300, now + 0.06 + flightDuration);

    const flightGain = ctx.createGain();
    flightGain.gain.setValueAtTime(0.05, now + 0.06);
    flightGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06 + flightDuration);

    flightSource.connect(flightFilter);
    flightFilter.connect(flightGain);
    flightGain.connect(ctx.destination);
    flightSource.start(now + 0.06);

    // Phase 3: Soft paper settle tap onto stack (0.38s - 0.60s)
    const settleDuration = 0.22;
    const settleBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * settleDuration), ctx.sampleRate);
    const settleData = settleBuffer.getChannelData(0);
    for (let i = 0; i < settleData.length; i++) {
      const p = i / settleData.length;
      settleData[i] = (Math.random() * 2 - 1) * Math.exp(-p * 14);
    }
    const settleSource = ctx.createBufferSource();
    settleSource.buffer = settleBuffer;

    const settleFilter = ctx.createBiquadFilter();
    settleFilter.type = 'lowpass';
    settleFilter.frequency.setValueAtTime(550, now + 0.38);
    settleFilter.frequency.exponentialRampToValueAtTime(140, now + 0.38 + settleDuration);

    const settleGain = ctx.createGain();
    settleGain.gain.setValueAtTime(0.045, now + 0.38);
    settleGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.38 + settleDuration);

    settleSource.connect(settleFilter);
    settleFilter.connect(settleGain);
    settleGain.connect(ctx.destination);
    settleSource.start(now + 0.38);

  } catch {
    // Audio policy fallback
  }
};
