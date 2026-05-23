import { NextResponse } from 'next/server';
import { modelEssays } from '@/lib/data/model-essays';

interface VocabularyUpgrade {
  from: string;
  to: string;
  reason: string;
}

interface MissedOpportunity {
  suggestion: string;
  reason: string;
  original: string;
  replacement: string;
}

export async function POST(req: Request) {
  try {
    const { userEssay, promptId } = await req.json();

    if (!userEssay || !promptId) {
      return NextResponse.json({ error: 'User essay and prompt ID are required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const modelEssay = modelEssays.find(m => m.promptId === promptId);

    if (!modelEssay) {
      return NextResponse.json({ error: 'Model essay not found for this prompt' }, { status: 404 });
    }

    // --- Comparative Analysis Logic ---
    // In a real production app, this would be a prompt to an LLM:
    // \"Compare the userEssay with the modelEssay. Identify vocabulary upgrades and missed opportunities.\"
    
    const vocabularyUpgrades: VocabularyUpgrade[] = [];
    const missedOpportunities: MissedOpportunity[] = [];

    // We can derive \"real\" insights by analyzing the expertTips and analysis provided in the model data
    // This makes the simulation feel grounded in the actual content of the model essays
    
    // 1. Vocabulary Upgrades: Search for simple words that the model essay suggests replacing
    // This is a simplified version of what an LLM would do
    const upgradeMap: Record<string, VocabularyUpgrade> = {
      '많이': { from: '많이', to: '비약적으로', reason: 'In Level 6 writing, \"비약적으로\" (exponentially) is more precise than \"많이\" (a lot) for describing trends.' },
      '좋다': { from: '좋다', to: '바람직하다', reason: ' \"바람직하다\" (desirable) is a more academic way to express a positive or correct state.' },
      '생각한다': { from: '생각한다', to: '판단된다', reason: 'Using \"판단된다\" (it is judged/considered) creates a more objective, academic tone.' },
      '문제': { from: '문제', to: '쟁점', reason: ' \"쟁점\" (issue/point of contention) is more specific than the general \"문제\" (problem) in argumentative essays.' },
    };

    Object.entries(upgradeMap).forEach(([simple, upgrade]) => {
      if (userEssay.includes(simple)) {
        vocabularyUpgrades.push(upgrade);
      }
    });

    // 2. Missed Opportunities: Based on the model essay's specific structure and tips
    // We check if the user essay lacks key conceptual markers present in the model essay
    const keyConcepts = [
      { 
        term: 'ESG 경영', 
        suggestion: 'Incorporate ESG (Environmental, Social, and Governance) frameworks', 
        reason: 'The model essay uses this to show a modern, professional understanding of corporate responsibility.' 
      },
      { 
        term: '디지털 리터러시', 
        suggestion: 'Discuss \"Digital Literacy\"', 
        reason: 'Mentioning digital literacy shows a deeper understanding of the systemic solutions needed for AI integration.' 
      },
      { 
        term: '제3의 공간', 
        suggestion: 'Introduce the concept of \"The Third Place\"', 
        reason: 'The model essay uses this sociological term to propose a spatial solution for urban loneliness.' 
      },
      { 
        term: '하이브리드 교육', 
        suggestion: 'Propose a \"Hybrid Education\" model', 
        reason: 'Combining AI efficiency with human empathy is a high-scoring conclusion for the education prompt.' 
      }
    ];

    keyConcepts.forEach(concept => {
      if (!userEssay.includes(concept.term) && modelEssay.text.includes(concept.term)) {
        missedOpportunities.push({
          suggestion: concept.suggestion,
          reason: concept.reason,
          original: 'General discussion',
          replacement: `Mention ${concept.term} to elevate the academic depth of the argument.`
        });
      }
    });

    // If no specific upgrades found, provide some general academic ones
    if (vocabularyUpgrades.length === 0) {
      vocabularyUpgrades.push({
        from: '사용하다',
        to: '활용하다',
        reason: ' \"활용하다\" (utilize) is often preferred over \"사용하다\" (use) when referring to resources or tools in an academic context.'
      });
    }

    return NextResponse.json({
      modelEssay: modelEssay.text,
      insights: {
        vocabularyUpgrades,
        missedOpportunities: missedOpportunities.slice(0, 3), // Limit to top 3
      }
    });
  } catch (error) {
    console.error('Error in comparative analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
