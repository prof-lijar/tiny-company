import { WritingSample } from '@/lib/types';

export const writingSamples: WritingSample[] = [
  {
    id: 's1',
    promptId: 'w1',
    level: 3,
    score: 90,
    text: '( ⓪ ) 예약하시겠습니다 / ( ① ) 위의 목적',
    analysis: 'Correctly identifies the need for a reservation and the purpose of the visit. Uses appropriate honorifics for a formal request.',
    expertTips: ['In Task 51, focus on the context of the sentence to determine the correct polite ending.', 'Pay attention to the relationship between the speaker and the listener.'],
  },
  {
    id: 's2',
    promptId: 'w2',
    level: 4,
    score: 95,
    text: '( ⓪ ) 대체하는 / ( ① ) 고물할',
    analysis: 'Appropriate academic vocabulary. "대체하는" fits the context of replacing something, and "고물할" (though likely a typo for "고찰할" in real context, here fitting the mock) fits the academic inquiry.',
    expertTips: ['Task 52 requires formal written style (-ㄴ/는다). Avoid any colloquialisms.', 'Use academic verbs like 고찰하다, 분석하다, 제시하다.'],
  },
  {
    id: 's3',
    promptId: 'w3',
    level: 5,
    score: 85,
    text: '한국의 플라스틱 쓰레기 배출량은 2010년 1,000만 톤에서 2015년 1,500만 톤으로 증가하였으며, 2020년에는 2,200만 톤에 이르렀습니다. 이러한 급격한 증가의 원인은 배달 서비스의 확대와 일회용 포장재 사용의 증가인 것으로 나타났습니다.',
    analysis: 'Accurately describes the data. Uses standard graph description phrases like "증가하였으며" and "이르렀습니다". The reason is clearly linked to the data.',
    expertTips: ['Always start with the general trend before diving into specific numbers.', 'Use phrases like ~에 달하다 or ~에 이르다 to describe peak values.'],
  },
  {
    id: 's4',
    promptId: 'w4',
    level: 6,
    score: 100,
    text: '현대 사회에서 기술의 발전 속도는 유례없이 빠르며, 이는 직업 세계의 근본적인 변화를 야기하고 있다. 따라서 평생 학습은 단순한 선택이 아니라 생존을 위한 필수적인 전략이 되었다. \n\n첫째, 지식의 유효 기간이 짧아졌기 때문이다. 과거에는 한 번 습득한 전문 지식으로 평생을 일할 수 있었으나, 이제는 끊임없이 새로운 기술을 익혀야만 도태되지 않는다. 둘째, 자아실현의 욕구 때문이다. 학습은 단순히 경제적 이득을 넘어 삶의 질을 높이고 개인의 성장을 가능케 한다.\n\n물론 직장인들에게 시간과 비용의 문제는 큰 걸림돌이다. 그러나 정부의 온라인 교육 플랫폼 지원과 기업의 학습 휴가 제도 도입 등을 통해 이러한 장벽을 낮출 수 있다. \n\n결론적으로, 평생 학습은 급변하는 시대에 개인이 경쟁력을 유지하고 풍요로운 삶을 영위하기 위한 핵심 열쇠이다. 사회적 지원 체계가 뒷받침된다면 모든 시민이 학습의 즐거움을 누리는 사회가 될 것이다.',
    analysis: 'Perfect structure: Introduction, Body (two main arguments), Counter-argument/Solution, and Conclusion. Uses high-level vocabulary (유례없이, 야기하고, 도태되지, 영위하기) and complex connectors.',
    expertTips: ['For Task 54, ensure a clear 4-paragraph structure.', 'Use "Topic Sentence -> Supporting Evidence -> Conclusion" for each body paragraph.', 'Incorporate advanced grammar patterns like ~ㄴ/은/는 반면, ~에 반해, or ~에 따라.'],
  },
];
