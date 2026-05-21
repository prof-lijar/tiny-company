import { NextResponse } from 'next/server';
import { EssayOutline } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a production app, this would call a real LLM (e.g., GPT-4)
    // Here we provide a high-quality structured response based on Task 54 requirements
    const mockOutline: EssayOutline = {
      structure: [
        {
          title: 'Introduction (서론)',
          points: [
            'Introduce the general topic and current trends',
            'State the main thesis/argument clearly',
            'Briefly mention the points to be discussed in the body',
          ],
        },
        {
          title: 'Body Paragraph 1 (본론 1)',
          points: [
            'First main argument: The core necessity of the topic',
            'Provide a logical reason or theoretical background',
            'Include a concrete example or a real-world scenario',
          ],
        },
        {
          title: 'Body Paragraph 2 (본론 2)',
          points: [
            'Second main argument: Challenges or counter-arguments',
            'Discuss how to overcome these challenges',
            'Explain the positive outcome of resolving these issues',
          ],
        },
        {
          title: 'Conclusion (결론)',
          points: [
            'Summarize the main arguments discussed',
            'Reiterate the final conclusion/thesis',
            'Provide a closing thought or a suggestion for the future',
          ],
        },
      ],
      vocabularySuggestions: [
        { word: '필수불가결하다', meaning: 'indispensable / essential', level: 6 },
        { word: '고취시키다', meaning: 'to inspire / encourage', level: 6 },
        { word: '상충되다', meaning: 'to conflict / contradict', level: 5 },
        { word: '함양하다', meaning: 'to cultivate / foster', level: 6 },
        { word: '지양하다', meaning: 'to avoid / refrain from', level: 6 },
        { word: '초래하다', meaning: 'to cause / bring about', level: 5 },
        { word: '부합하다', meaning: 'to coincide / correspond with', level: 5 },
      ],
      grammarConnectors: [
        { connector: '뿐만 아니라', usage: 'Not only... but also' },
        { connector: '반면에', usage: 'On the other hand' },
        { connector: '그럼에도 불구하고', usage: 'Nevertheless / Despite this' },
      ],
    };

    return NextResponse.json(mockOutline);
  } catch (error) {
    console.error('Error generating essay outline:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
