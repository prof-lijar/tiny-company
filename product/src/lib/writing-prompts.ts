import { WritingPrompt } from './types';

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'p1',
    level: 3,
    taskNumber: 51,
    title: 'Daily Life & Hobbies',
    instruction: 'Describe your favorite hobby and explain why you enjoy it. How has this hobby influenced your life?',
    context: 'Write a short essay introducing your hobby and its impact on your daily routine.',
    prompt: 'Describe your favorite hobby and explain why you enjoy it. How has this hobby influenced your life?',
    sampleAnswer: 'My favorite hobby is reading. I enjoy it because it allows me to experience different worlds...',
    scoringCriteria: 'Clarity of expression, relevance to the topic, and use of Level 3 grammar.',
    tags: ['hobby', 'daily-life'],
  },
  {
    id: 'p2',
    level: 4,
    taskNumber: 53,
    title: 'Social Issues: Environment',
    instruction: 'Many people believe that individual efforts are not enough to solve environmental problems and that government regulation is necessary. Do you agree or disagree?',
    context: 'Discuss the role of government vs. individuals in environmental protection.',
    prompt: 'Many people believe that individual efforts are not enough to solve environmental problems and that government regulation is necessary. Do you agree or disagree?',
    sampleAnswer: 'I agree that government regulation is necessary because systemic changes are required...',
    scoringCriteria: 'Logical structure, supporting arguments, and formal academic tone.',
    tags: ['environment', 'society'],
  },
  {
    id: 'p3',
    level: 5,
    taskNumber: 54,
    title: 'Technology & Ethics: AI',
    instruction: 'With the rapid development of AI, there are concerns about the displacement of human labor. Discuss the potential risks and benefits of AI in the workplace and suggest a way to coexist.',
    context: 'Analyze the impact of AI on the professional landscape and propose a coexistence strategy.',
    prompt: 'With the rapid development of AI, there are concerns about the displacement of human labor. Discuss the potential risks and benefits of AI in the workplace and suggest a way to coexist.',
    sampleAnswer: 'The advent of AI brings both efficiency and displacement. To coexist, humans must focus on...',
    scoringCriteria: 'Depth of analysis, advanced vocabulary, and complex sentence structures.',
    tags: ['technology', 'ethics', 'AI'],
  }
];
