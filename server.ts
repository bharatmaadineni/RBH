/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: any = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI:', e);
      return null;
    }
  }
  return aiClient;
}

// 1. AI Music Recommendations
app.post('/api/ai/recommendations', async (req, res) => {
  const { mood, prompt } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // Elegant simulated response if API key is not present
    setTimeout(() => {
      let filteredGenres = ['Lo-fi Chill', 'Acoustic'];
      let reason = `Creating a playlist of relaxing acoustic and lo-fi tunes for a "${mood || 'chill'}" mood.`;
      
      if (mood === 'energetic' || mood === 'workout') {
        filteredGenres = ['Synthwave', 'House'];
        reason = `Selected high-tempo Synthwave and House tracks to boost your energy.`;
      } else if (mood === 'focus') {
        filteredGenres = ['Lo-fi Chill', 'Ambient'];
        reason = `Curated soft ambient and lo-fi beats to help you concentrate.`;
      } else if (mood === 'party') {
        filteredGenres = ['House', 'Electronic'];
        reason = `Curated dancefloor heaters and progressive house to pump up the party.`;
      }

      res.json({
        success: true,
        isSimulated: true,
        reason,
        recommendedGenres: filteredGenres,
        message: `Based on your request "${prompt || mood}", we curated a custom stream for you. Add a real GEMINI_API_KEY in the Secrets panel to activate full cognitive AI recommendation!`
      });
    }, 1000);
    return;
  }

  try {
    const systemPrompt = `You are the RBH AI Music Recommendation Engine. The user has requested music based on a mood: "${mood}" or a descriptive prompt: "${prompt}". 
Analyze this prompt and respond with a JSON object containing:
1. "reason": A short beautiful explanation of why these songs fit.
2. "recommendedGenres": An array of matching genres (choose from 'Synthwave', 'Lo-fi Chill', 'Acoustic', 'House', 'Electronic', 'Ambient').
3. "message": A personalized message to the user.
Do not return any markdown wraps (e.g. \`\`\`json), return raw JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
    });

    const text = response.text || '{}';
    // Clean up possible markdown wrappers if model ignores instructions
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error('Gemini recommendations failed:', error);
    res.status(500).json({ error: 'AI failed to process recommendation', details: error.message });
  }
});

// 2. AI Lyrics Generator & Synchronizer
app.post('/api/ai/lyrics', async (req, res) => {
  const { title, artist } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // Stable mocked lyrics with timings
    setTimeout(() => {
      res.json({
        success: true,
        isSimulated: true,
        lyrics: [
          { time: 0, text: `[Simulated Lyrics for ${title} by ${artist}]` },
          { time: 5, text: "The stars align, the music starts to flow" },
          { time: 12, text: "RBH surrounding us with a gentle neon glow" },
          { time: 20, text: "Every beat is a second we can never lose" },
          { time: 28, text: "This is the rhythm of the journey that we choose" },
          { time: 36, text: "[Chorus]" },
          { time: 37, text: "We are the dreamers, dancing in the light" },
          { time: 45, text: "Chasing the melodies that carry us through the night" },
          { time: 53, text: "With every wavelength, we begin to see" },
          { time: 61, text: "The endless colors of this visual symphony" },
          { time: 70, text: "[Guitar Bridge]" },
          { time: 80, text: "Add your Gemini API Key for real-time dynamic lyric generation!" }
        ]
      });
    }, 1200);
    return;
  }

  try {
    const systemPrompt = `Generate a synchronized lyric sequence for the song "${title}" by "${artist}".
Create 8 to 12 lyric lines, each paired with a logical starting timestamp in seconds.
Return a JSON object with a single "lyrics" array of items containing "time" (number, in seconds starting from 0) and "text" (string).
Example:
{
  "lyrics": [
    { "time": 0, "text": "[Intro]" },
    { "time": 10, "text": "First line of lyric" }
  ]
}
Return only raw valid JSON, no markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
    });

    const text = response.text || '{}';
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error('Gemini lyrics generation failed:', error);
    res.status(500).json({ error: 'AI failed to generate lyrics', details: error.message });
  }
});

// 3. AI Voice Search Analyst
app.post('/api/ai/voice', async (req, res) => {
  const { transcript } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    setTimeout(() => {
      // Basic fallback rule engine
      const query = (transcript || '').toLowerCase();
      let action = 'search';
      let param = query;

      if (query.includes('play') || query.includes('listen')) {
        action = 'play';
        param = query.replace('play', '').replace('listen to', '').trim();
      } else if (query.includes('lofi') || query.includes('lo-fi') || query.includes('chill')) {
        action = 'genre';
        param = 'Lo-fi Chill';
      } else if (query.includes('synth') || query.includes('cyber') || query.includes('retro')) {
        action = 'genre';
        param = 'Synthwave';
      } else if (query.includes('house') || query.includes('techno') || query.includes('dance')) {
        action = 'genre';
        param = 'House';
      } else if (query.includes('acoustic') || query.includes('guitar') || query.includes('folk')) {
        action = 'genre';
        param = 'Acoustic';
      } else if (query.includes('favorite') || query.includes('liked')) {
        action = 'navigate';
        param = 'library';
      } else if (query.includes('profile') || query.includes('account')) {
        action = 'navigate';
        param = 'profile';
      }

      res.json({
        success: true,
        isSimulated: true,
        action,
        param,
        transcript,
        message: `Parsed query: "${transcript}" into action: ${action} (${param})`
      });
    }, 800);
    return;
  }

  try {
    const systemPrompt = `You are the RBH Voice Assistant. Analyze this spoken voice transcript: "${transcript}".
Map this request to a structural application action.
Return a JSON object containing:
1. "action": One of 'play' (find and play specific track/artist), 'genre' (filter by genre), 'navigate' (switch tab to home, search, library, profile, admin, or landing), or 'search' (general search).
2. "param": The target string associated with the action (e.g. track name, genre name, view ID, or search query).
3. "message": A polite friendly response stating what action is being taken.
Example output:
{
  "action": "genre",
  "param": "Lo-fi Chill",
  "message": "Setting the vibe to Lo-fi Chill. Relax and enjoy!"
}
Return only raw valid JSON, no markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
    });

    const text = response.text || '{}';
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error('Gemini voice parsing failed:', error);
    res.status(500).json({ error: 'AI failed to analyze voice command', details: error.message });
  }
});

// 4. Stripe Subscription checkout simulation
app.post('/api/stripe/checkout', (req, res) => {
  const { plan } = req.body;
  
  // Simulate successful Stripe checkout session
  setTimeout(() => {
    res.json({
      success: true,
      sessionId: `cs_test_${Math.random().toString(36).substring(2, 15)}`,
      checkoutUrl: '#success', // Will trigger a frontend modal simulation
      message: `Successfully created RBH ${plan || 'Premium'} Subscription Checkout Session.`
    });
  }, 1000);
});

// Vite & Static file serving setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
});
