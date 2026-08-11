/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer and Beat Engine for DJ Studio & Background Music Overlays

class DJAudioEngine {
  private ctx: AudioContext | null = null;
  private isBeatLoopRunning = false;
  private currentBpm = 125;
  private beatVolume = 0.6;
  private activeBeatPreset: 'mass' | 'edm' | 'pop' | 'hiphop' | 'rock' | 'lofi' = 'mass';
  private timerId: number | null = null;
  private step = 0;
  private masterGain: GainNode | null = null;
  private bassFilter: BiquadFilterNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAudioContext(): AudioContext {
    this.initCtx();
    return this.ctx!;
  }

  // --- SOUND EFFECTS PADS ---

  public playKick(time?: number) {
    this.initCtx();
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.35);

    gain.gain.setValueAtTime(this.beatVolume * 1.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.36);
  }

  public playSnare(time?: number) {
    this.initCtx();
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.beatVolume * 0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + 0.21);
  }

  public playHiHat(time?: number, open = false) {
    this.initCtx();
    if (!this.ctx) return;
    const t = time || this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * (open ? 0.25 : 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.beatVolume * 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.24 : 0.07));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + (open ? 0.25 : 0.08));
  }

  public playAirHorn() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const freqs = [350, 440, 520];
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 1.1, now + 0.05);
      osc.frequency.setValueAtTime(freq, now + 0.1);
      osc.frequency.linearRampToValueAtTime(freq * 1.15, now + 0.25);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.setValueAtTime(0.4, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  public playLaser() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  public playBoing() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.4);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  }

  public playScratch() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.08);
    osc.frequency.linearRampToValueAtTime(150, now + 0.18);
    osc.frequency.linearRampToValueAtTime(650, now + 0.28);

    filter.type = 'bandpass';
    filter.frequency.value = 1200;

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.33);
  }

  public playTrumpet() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const freqs = [261.63, 329.63, 392.00, 523.25]; // C major chord
    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.51);
    });
  }

  public playAlarm() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    for (let i = 0; i < 4; i++) {
      osc.frequency.setValueAtTime(800, now + i * 0.15);
      osc.frequency.setValueAtTime(1200, now + i * 0.15 + 0.075);
    }

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.61);
  }

  public playGunshot() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  public playComeOn() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
    osc.frequency.linearRampToValueAtTime(500, now + 0.3);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  public playOhYeah() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.linearRampToValueAtTime(330, now + 0.2);
    osc1.frequency.exponentialRampToValueAtTime(440, now + 0.4);

    osc2.frequency.setValueAtTime(110, now);
    osc2.frequency.linearRampToValueAtTime(165, now + 0.2);
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.4);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.46);
    osc2.stop(now + 0.46);
  }

  // --- BACKGROUND BEAT LOOP RHYTHMIC SEQUENCER ---

  public startBeatLoop(preset: 'mass' | 'edm' | 'pop' | 'hiphop' | 'rock' | 'lofi' = 'mass', bpm = 125) {
    this.initCtx();
    if (!this.ctx) return;

    this.activeBeatPreset = preset;
    this.currentBpm = bpm;
    this.isBeatLoopRunning = true;
    this.step = 0;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    const intervalMs = (60 / this.currentBpm / 4) * 1000; // 16th notes
    this.timerId = window.setInterval(() => {
      this.tick();
    }, intervalMs);
  }

  public stopBeatLoop() {
    this.isBeatLoopRunning = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public isLoopActive() {
    return this.isBeatLoopRunning;
  }

  public setBpm(newBpm: number) {
    this.currentBpm = Math.max(60, Math.min(180, newBpm));
    if (this.isBeatLoopRunning) {
      this.startBeatLoop(this.activeBeatPreset, this.currentBpm);
    }
  }

  public setBeatVolume(vol: number) {
    this.beatVolume = Math.max(0, Math.min(1, vol));
  }

  public getBeatVolume() {
    return this.beatVolume;
  }

  public getBpm() {
    return this.currentBpm;
  }

  public getPreset() {
    return this.activeBeatPreset;
  }

  private tick() {
    if (!this.ctx || !this.isBeatLoopRunning) return;

    const s = this.step % 16;

    switch (this.activeBeatPreset) {
      case 'mass':
        // South Indian Mass / Kuthu 4/4 Beat
        if (s === 0 || s === 6 || s === 10 || s === 12) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        if (s % 2 === 0) this.playHiHat(undefined, s % 4 === 2);
        if (s === 14) this.playBoing();
        break;

      case 'edm':
        // Four on the floor EDM Bounce
        if (s % 4 === 0) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        if (s % 2 === 1) this.playHiHat(undefined, true);
        break;

      case 'hiphop':
        // Boom Bap Trap 808
        if (s === 0 || s === 10) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        this.playHiHat(undefined, s % 2 === 1);
        break;

      case 'pop':
        if (s === 0 || s === 8 || s === 10) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        if (s % 2 === 0) this.playHiHat(undefined, false);
        break;

      case 'rock':
        if (s === 0 || s === 8) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        if (s % 2 === 0) this.playHiHat(undefined, s === 14);
        break;

      case 'lofi':
        if (s === 0 || s === 7) this.playKick();
        if (s === 4 || s === 12) this.playSnare();
        if (s % 4 === 2) this.playHiHat(undefined, false);
        break;
    }

    this.step++;
  }
}

export const djAudioEngine = new DJAudioEngine();
