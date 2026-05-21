import { NextResponse } from 'next/server';

interface WritingFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  correctedText: string;
}

export async function POST(req: Request) {
  try {
    const { answer, prompt, context } = await req.json();

    if (!answer || !prompt) {
      return NextResponse.json({ error: 'Answer and prompt are required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real production environment, this would call an LLM API (like OpenAI or Anthropic)
    // For this implementation, we create a "dynamic" mock that analyzes the input
    // to avoid the "generic" feel of the previous simulation.

    const textLength = answer.length;
    let score = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Basic length-based scoring (simplified)
    if (textLength > 100) {
      score += 40;
      strengths.push('Appropriate length for the task');
    } else {
      improvements.push('The response is too short; try to expand your arguments');
    }

    // Check for formal style (common in TOPIK II)
    if (answer.includes('습니다') || answer.includes('ㄴ다')) {
      score += 30;
      strengths.push('Consistent use of formal written style');
    } else {
      improvements.push('Use formal written style (-ㅂ니다/는다) instead of colloquial language');
    }

    // Check for basic structure
    if (textLength > 200 && (answer.includes('또한') || answer.includes('하지만') || answer.includes('따라서'))) {
      score += 20;
      strengths.push('Good use of logical connectors to link ideas');
    } else {
      improvements.push('Incorporate more connectors (e.g., 또한, 하지만, 따라서) to improve flow');
    }

    // Cap score at 100
    const finalScore = Math.min(score + Math.floor(Math.random() * 10), 100);

    const feedback: WritingFeedback = {
      score: finalScore,
      strengths: strengths.length > 0 ? strengths : ['Basic attempt at the prompt'],
      improvements: improvements.length > 0 ? improvements : ['Continue practicing advanced vocabulary'],
      correctedText: `[AI Corrected Version]\\n\\n${answer}\\n\\n(In a production environment, the AI would provide a fully rewritten version here with natural phrasing and advanced grammar).`,
    };

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating writing feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
