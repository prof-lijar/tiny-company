import { NextResponse } from 'next/server';
import { EssayOutline } from '@/lib/types';
import { logger } from '@/lib/logger';

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
          title: 'Introduction (\uc11c\ub860)',
          points: [
            'Introduce the general topic and current trends',
            'State the main thesis/argument clearly',
            'Briefly mention the points to be discussed in the body',
          ],
        },
        {
          title: 'Body Paragraph 1 (\ubcf8\ub860 1)',
          points: [
            'First main argument: The core necessity of the topic',
            'Provide a logical reason or theoretical background',
            'Include a concrete example or a real-world scenario',
          ],
        },
        {
          title: 'Body Paragraph 2 (\ubcf8\ub860 2)',
          points: [
            'Second main argument: Challenges or counter-arguments',
            'Discuss how to overcome these challenges',
            'Explain the positive outcome of resolving these issues',
          ],
        },
        {
          title: 'Conclusion (\uacb0\ub860)',
          points: [
            'Summarize the main arguments discussed',
            'Reiterate the final conclusion/thesis',
            'Provide a closing thought or a suggestion for the future',
          ],
        },
      ],
      vocabularySuggestions: [
        { word: '\ud544\uc218\ubd88\uac00\uacb0\ud558\ub2e4', meaning: 'indispensable / essential', level: 6 },
        { word: '\uace0\ucde8\uc2dc\ud0a4\ub2e4', meaning: 'to inspire / encourage', level: 6 },
        { word: '\uc0c1\ucda9\ub418\ub2e4', meaning: 'to conflict / contradict', level: 5 },
        { word: '\ud568\uc591\ud558\ub2e4', meaning: 'to cultivate / foster', level: 6 },
        { word: '\uc9c0\uc591\ud558\ub2e4', meaning: 'to avoid / refrain from', level: 6 },
        { word: '\ucd08\ub798\ud558\ub2e4', meaning: 'to cause / bring about', level: 5 },
        { word: '\ubd80\ud569\ud558\ub2e4', meaning: 'to coincide / correspond with', level: 5 },
      ],
      grammarConnectors: [
        { connector: '\ubfd0\ub9cc \uc544\ub2c8\ub77c', usage: 'Not only... but also' },
        { connector: '\ubc18\uba74\uc5d0', usage: 'On the other hand' },
        { connector: '\uadf8\ub7fc\uc5d0\ub3c4 \ubd88\uad6c\ud558\uace0', usage: 'Nevertheless / Despite this' },
      ],
    };

    return NextResponse.json(mockOutline);
  } catch (error) {
    logger.error('Error generating essay outline', error, { route: 'POST /api/writing-outliner' });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
