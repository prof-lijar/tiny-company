import { NextResponse } from 'next/server';
import { WeaknessReport, UserMistake } from '@/lib/types';
import { grammarData } from '@/lib/data/grammar';

/**
 * Mock data for user mistakes.
 * In a real application, this would be fetched from a database.
 */
const MOCK_USER_MISTAKES: UserMistake[] = [
  { questionId: 'r1', category: 'reading', tags: ['Grammar: -기 때문에'], timestamp: Date.now() - 86400000 },
  { questionId: 'r2', category: 'reading', tags: ['Grammar: -기 때문에'], timestamp: Date.now() - 86400000 * 2 },
  { questionId: 'r3', category: 'reading', tags: ['Vocab: Environment'], timestamp: Date.now() - 86400000 * 3 },
  { questionId: 'l1', category: 'listening', tags: ['Grammar: -기 때문에'], timestamp: Date.now() - 86400000 * 4 },
  { questionId: 'v1', category: 'vocabulary', tags: ['Academic'], timestamp: Date.now() - 86400000 * 5 },
  { questionId: 'v2', category: 'vocabulary', tags: ['Academic'], timestamp: Date.now() - 86400000 * 6 },
  { questionId: 'v3', category: 'vocabulary', tags: ['Academic'], timestamp: Date.now() - 86400000 * 7 },
  { questionId: 'r4', category: 'reading', tags: ['Vocab: Environment'], timestamp: Date.now() - 86400000 * 8 },
  { questionId: 'r5', category: 'reading', tags: ['Grammar: -ㄴ/은/는 반면'], timestamp: Date.now() - 86400000 * 9 },
];

export async function GET() {
  try {
    // 1. Aggregate mistakes by tag
    const tagCounts: Record<string, number> = {};
    MOCK_USER_MISTAKES.forEach(mistake => {
      mistake.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // 2. Sort tags by frequency
    const sortedTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    // 3. Generate analysis for each top weakness
    const topWeaknesses = sortedTags.map(([tag, count]) => {
      let impact: 'high' | 'medium' | 'low' = 'medium';
      let recommendation = '';
      let targetUrl = '/dashboard';

      if (tag.startsWith('Grammar:')) {
        const patternName = tag.split(': ')[1];
        const grammarItem = grammarData.find(g => g.title === patternName || g.pattern === patternName);
        
        impact = count > 2 ? 'high' : 'medium';
        recommendation = `Review the grammar lesson for ${patternName} in the Grammar Library. Focus on its usage in complex sentences.`;
        targetUrl = grammarItem ? `/grammar/${grammarItem.id}` : '/grammar';
      } else if (tag.startsWith('Vocab:')) {
        impact = 'medium';
        recommendation = `Practice vocabulary related to ${tag.split(': ')[1]} using the Vocabulary Builder.`;
        targetUrl = '/vocabulary';
      } else {
        impact = 'low';
        recommendation = `Expand your ${tag} vocabulary through reading more academic articles.`;
        targetUrl = '/reading';
      }

      return {
        tag,
        errorCount: count,
        impact,
        recommendation,
        targetUrl,
      };
    });

    const report: WeaknessReport = {
      topWeaknesses,
      overallAnalysis: "Your errors are primarily concentrated in advanced grammar patterns (specifically '-기 때문에') and academic vocabulary. While your reading speed is good, these structural gaps are affecting your accuracy in TOPIK II Level 5-6 questions. Focusing on these specific areas will likely yield the biggest score increase.",
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error analyzing weaknesses:', error);
    return NextResponse.json({ error: 'Failed to analyze weaknesses' }, { status: 500 });
  }
}
