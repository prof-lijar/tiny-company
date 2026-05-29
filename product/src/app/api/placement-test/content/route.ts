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
    // Since ContentService doesn't have getByIds, we fetch all and filter or implement it.
    // For simplicity in the placement test, we can fetch all and filter.
    
    const allListening = await contentService.getListeningPassages();
    const allReading = await contentService.getReadingPassages();
    const allWriting = await contentService.getWritingPrompts();

    const listening = allListening
      .filter(l => listeningIds.includes(l.id))
      .map(l => {
        // We need the questions too. ContentService.getListeningPassageWithQuestions is for one.
        // For the test, we might need to adjust ContentService or just mock the questions if they are in the object.
        // Actually, getListeningPassages just returns the passages. 
        // This is a problem. I should check ContentService again.
        return l;
      });

    // Wait, the placement test needs questions. 
    // I will implement a helper in this route to fetch questions for each passage.
    
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
      listening: listeningWithQuestions.filter(Boolean).map(res => ({
        ...res.passage,
        questions: res.questions
      })),
      reading: readingWithQuestions.filter(Boolean).map(res => ({
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
