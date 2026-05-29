export interface WritingPrompt {
  id: string;
  level: number;
  title: string;
  prompt: string;
  guidelines: string[];
  expectedLength: string;
}

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'p1',
    level: 3,
    title: 'Daily Life & Hobbies',
    prompt: 'Describe your favorite hobby and explain why you enjoy it. How has this hobby influenced your life?',
    guidelines: [
      'Introduce the hobby clearly',
      'Provide specific examples of activities',
      'Explain the personal impact/benefit',
      'Use appropriate Level 3 grammar'
    ],
    expectedLength: '200-300 characters'
  },
  {
    id: 'p2',
    level: 4,
    title: 'Social Issues: Environment',
    prompt: 'Many people believe that individual efforts are not enough to solve environmental problems and that government regulation is necessary. Do you agree or disagree?',
    guidelines: [
      'State your position clearly',
      'Provide at least two supporting arguments',
      'Address the opposing view',
      'Use formal academic tone'
    ],
    expectedLength: '400-600 characters'
  },
  {
    id: 'p3',
    level: 5,
    title: 'Technology & Ethics: AI',
    prompt: 'With the rapid development of AI, there are concerns about the displacement of human labor. Discuss the potential risks and benefits of AI in the workplace and suggest a way to coexist.',
    guidelines: [
      'Analyze both risks and benefits',
      'Propose a concrete solution for coexistence',
      'Use advanced vocabulary and complex sentence structures',
      'Maintain a logical argumentative flow'
    ],
    expectedLength: '600-800 characters'
  }
];
