import { NextResponse } from 'next/server';

interface WritingFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  correctedText: string;
}

export async function POST(req: Request) {
  try {
    const { answer, prompt, _context } = await req.json();

    if (!answer || !prompt) {
      return NextResponse.json({ error: 'Answer and prompt are required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const textLength = answer.length;
    let score = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    // --- 2026 REFORM: Formulaic Template Detection ---
    const formulaicPatterns = [
      '현대 사회에서', 
      '많은 사람들이', 
      '가장 중요한 것은', 
      '첫째로, 둘째로, 셋째로', 
      '결론적으로 말하면'
    ];
    
    let formulaicCount = 0;
    formulaicPatterns.forEach(pattern => {
      if (answer.includes(pattern)) formulaicCount++;
    });

    if (formulaicCount >= 3) {
      score -= 20;
      improvements.push('Your writing relies too heavily on memorized templates. Try to use more natural, spontaneous expressions.');
    } else if (formulaicCount >= 1) {
      improvements.push('Avoid over-using standard TOPIK essay formulas to make your writing feel more natural.');
    } else {
      strengths.push('Natural phrasing and original structure (not formulaic)');
      score += 10;
    }

    // Basic length-based scoring
    if (textLength > 150) {
      score += 40;
      strengths.push('Appropriate length and depth for the task');
    } else {
      improvements.push('The response is too short; try to expand your arguments with more detailed evidence');
    }

    // Check for formal style (essential for TOPIK II)
    if (answer.includes('습니다') || answer.includes('ㄴ다')) {
      score += 30;
      strengths.push('Consistent use of formal written style');
    } else {
      improvements.push('Use formal written style (-습니다/-ㄴ다) instead of colloquial language');
    }

    // Check for structural variety & logical connectors
    const advancedConnectors = ['그럼에도 불구하고', '반면', '결과적으로', '따라서'];
    const hasVariety = advancedConnectors.some(conn => answer.includes(conn));
    
    if (hasVariety) {
      score += 20;
      strengths.push('Good structural variety and use of advanced logical connectors');
    } else {
      improvements.push('Try to incorporate a wider variety of connectors (e.g., 그럼에도 불구하고, 반면) to improve flow');
    }

    // Cap score between 0 and 100
    const finalScore = Math.max(0, Math.min(score + Math.floor(Math.random() * 10), 100));

    const feedback: WritingFeedback = {
      score: finalScore,
      strengths: strengths.length > 0 ? strengths : ['Basic attempt at the prompt'],
      improvements: improvements.length > 0 ? improvements : ['Continue practicing advanced vocabulary'],
      correctedText: `[AI Corrected Version - 2026 Focus: Natural Expression]\\n\\n${answer}\\n\\n(The AI would now provide a version that removes formulaic clichés and replaces them with natural, high-level academic Korean phrasing).`,
    };

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating writing feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
