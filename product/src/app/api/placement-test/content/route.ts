import { NextResponse } from 'next/server';
import { createServerContentService } from '@/lib/services/content-service';

export async function GET() {
  try {
    const contentService = await createServerContentService();

    // Define the IDs used in the placement test (mirroring TEST_CONFIG in the page)
    const listeningIds = [
      'listen-1', 'listen-5', 'listen-6',
      'listen-2', 'listen-9', 'listen-10',
      'listen-3', 'listen-4', 'listen-13', 'listen-14'
    ];
    const readingIds = [
      'reading-1', 'reading-4', 'reading-7',
      'reading-2', 'reading-5', 'reading-8',
      'reading-3', 'reading-6', 'reading-9', 'reading-15'
    ];
    const writingId = 'w3';

    // Fetch all grammar/vocab etc if needed, but here we need specific content
    const allWriting = await contentService.getWritingPrompts();

    const listeningWithQuestions = await Promise.all(
      listeningIds.map(async id => {
        try {
          return await contentService.getListeningPassageWithQuestions(id);
        } catch (e) {
          return null;
        }
      })
    );

    const readingWithQuestions = await Promise.all(
      readingIds.map(async id => {
        try {
          return await contentService.getReadingPassageWithQuestions(id);
        } catch (e) {
          return null;
        }
      })
    );

    const writing = allWriting.find(w => w.id === writingId);

    return NextResponse.json({
      listening: listeningWithQuestions
        .filter((res): res is NonNullable<typeof listeningWithQuestions[0]> => res !== null)
        .map(res => ({
          ...res.passage,
          questions: res.questions
        })),
      reading: readingWithQuestions
        .filter((res): res is NonNullable<typeof readingWithQuestions[0]> => res !== null)
        .map(res => ({
          ...res.passage,
          questions: res.questions
        })),
      writing: writing || { title: 'Writing Assessment', instruction: 'Write a short essay.', context: 'TOPIK Style' }
    });
  } catch (error) {
    console.error('Error fetching placement test content:', error);
    return NextResponse.json({ error: 'Failed to fetch placement test content' }, { status: 500 });
  }
}
