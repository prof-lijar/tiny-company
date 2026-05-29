import { NextResponse } from 'next/server';
import { createServerContentService } from '@/lib/services/content-service';

export async function GET() {
  try {
    const contentService = await createServerContentService();
    const mockTests = await contentService.getMockTests();
    
    // The mock test page expects tests to have sections and those sections to have questions.
    // ContentService.getMockTests() only returns the basic MockTest info.
    // We need to fetch full details for each test.
    
    const testsWithFullDetails = await Promise.all(
      mockTests.map(async (test) => {
        const fullTest = await contentService.getMockTestFull(test.id);
        return {
          ...fullTest.test,
          sections: fullTest.sections.map(section => ({
            ...section,
            questions: fullTest.questions.filter(q => q.section_id === section.id)
          }))
        };
      })
    );

    return NextResponse.json(testsWithFullDetails);
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    return NextResponse.json({ error: 'Failed to fetch mock tests' }, { status: 500 });
  }
}
