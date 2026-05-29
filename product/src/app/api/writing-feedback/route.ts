import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { logger } from '@/lib/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert TOPIK II examiner specializing in the 2026 Reform standards. Your task is to evaluate a user's essay (Task 51, 52, 53, or 54) and provide a detailed report.

### 2026 Grading Rubric:
1. **Anti-Template Penalty**: Heavily penalize the use of memorized \"skeleton\" templates (e.g., overly rigid introductory phrases that don't fit the nuance of the prompt). If a template is detected, explicitly flag it as \"Formulaic/Memorized\".
2. **Task Completion**: Did the user address all three points required in the prompt?
3. **Language Use**: Evaluate the use of academic vocabulary (Hanja-eo) and advanced connectors.
4. **Cohesion**: Check for logical flow between paragraphs.

### Feedback Format (JSON):
{
  \"score\": 0-100,
  \"predictedLevel\": 3-6,
  \"strengths\": [\"List of key strengths\"],
  \"improvements\": [\"List of key areas for improvement\"],
  \"templateUsage\": {
    \"detected\": boolean,
    \"detectedTemplates\": [\"List of detected template phrases\"],
    \"structuralVarietyScore\": 1-5,
    \"naturalAlternatives\": [
      { \"template\": \"the detected phrase\", \"alternative\": \"a more natural way to say it\" }
    ]
  },
  \"rubricBreakdown\": {
    \"content\": { \"score\": 1-5, \"feedback\": \"...\" },
    \"vocabulary\": { \"score\": 1-5, \"feedback\": \"...\" },
    \"grammar\": { \"score\": 1-5, \"feedback\": \"...\" },
    \"structure\": { \"score\": 1-5, \"feedback\": \"...\" }
  },
  \"correctedText\": \"The fully corrected version of the essay\",
  \"overallAdvice\": \"Comprehensive final advice\"
}`;

export async function POST(req: Request) {
  try {
    const { answer, prompt, context } = await req.json();

    if (!answer || !prompt) {
      return NextResponse.json({ error: 'Answer and prompt are required' }, { status: 400 });
    }

    const userContent = `Prompt: ${prompt}\nContext: ${context || 'N/A'}\n\nUser Essay:\n${answer}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const feedback = JSON.parse(response.choices[0].message.content || '{}');

    return NextResponse.json(feedback);
  } catch (error: unknown) {
    logger.error('Error generating AI writing feedback', error, { route: 'POST /api/writing-feedback' });
    
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json({ error: 'AI Service configuration error (API Key missing)' }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
