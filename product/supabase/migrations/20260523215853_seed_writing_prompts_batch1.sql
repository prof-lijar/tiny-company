-- Migration: seed_writing_prompts_batch1
-- Created: 2026-05-23T21:58:53.122883+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w1', 51, 3, 'Short Answer Completion - Daily Life', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 어제 친구와 함께 공원을 방문했습니다. 산책을 하며 ( ＿ ) 좋았습니다. 산책 후에는 ( ＿ ) 마셨습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 기분이 매우 / ( ＿ ) 시원한 커피를', 'Correct grammar, appropriate vocabulary for the context, and natural flow.', ARRAY['Grammar', 'Daily Life']),
('w2', 52, 4, 'Short Answer Completion - Formal/Academic', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '현대 사회에서 인공지능 기술의 발전은 매우 빠르게 이루어지고 있습니다. 인공지능은 이제 인간의 업무를 ( ＿ ) 수준에 이르렀습니다. 하지만 이에 따른 ( ＿ ) 문제에 대한 논의가 필요합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 상당 부분 대체할 수 있는 / ( ＿ ) 윤리적', 'Use of formal written style(-ㄴ/는다는), academic vocabulary, and logical coherence.', ARRAY['Academic', 'Ethics', 'Formal']),
('w3', 53, 5, 'Graph Description - Environmental Trends', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Plastic Waste Production in Korea]
- 2010: 10 million tons
- 2015: 15 million tons
- 2020: 22 million tons
- Reason: Increase in delivery services and disposable packaging.', 'Describe the trend and the reason for the increase.', '한국의 플라스틱 쓰레기 배출량은 2010년 1,000만 톤에서 2015년 1,500만 톤으로 증가하였으며, 2020년에는 2,200만 톤에 이르렀습니다. 이러한 증가의 원인은 배달 서비스의 확대와 일회용 포장재 사용의 증가인 것으로 분석됩니다.', 'Accurate data representation, use of descriptive graph language (증가하였다, 분석된다), and appropriate length.', ARRAY['Data Analysis', 'Environment', 'Graph Description']),
('w4', 54, 6, 'Argumentative Essay - Education', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The necessity of lifelong learning in the modern era.
1. Why is lifelong learning necessary today?
2. What are the challenges of lifelong learning?
3. How can we overcome these challenges?', 'Write a structured essay addressing all three points.', '현대 사회는 기술의 급격한 발전으로 인해 지식의 유효 기간이 짧아지고 있습니다. 따라서 평생 학습은 단순한 자기계발을 넘어 생존을 위한 필수적인 선택이 되었습니다. 하지만 직장 생활과 학습을 병행해야 하는 시간적 제약과 경제적 부담은 큰 걸림돌이 됩니다. 이를 극복하기 위해서는 온라인 교육 플랫폼의 활성화와 기업 차원의 학습 지원으로 학습으로 접근성을 높여야 합니다. 결국 개인의 의지와 사회적 시스템이 조화를 이룰 때 진정한 평생 학습 사회가 구현될 수 있습니다.', 'Structure (Intro-Body-Conclusion), logical argumentation, sophisticated vocabulary, and adherence to length requirements.', ARRAY['Essay', 'Education', 'Argumentation']),
('w5', 51, 3, 'Short Answer Completion - Travel', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '이번 여름 휴가는 제주도에 가기로 했습니다. 제주도는 ( ＿ ) 풍경이 아름답기로 유명합니다. 그리고서 ( ＿ ) 시간을 보내고 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 자연 ', 'Appropriate use of causal connectors and vocabulary related to travel.', ARRAY['Grammar', 'Travel']),
('w6', 52, 4, 'Short Answer Completion - Health', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '건강을 유지하기 위해서는 규칙적인 운동과 균형 잡힌 식단이 필수적입니다. 운동은 신체적 건강뿐만 아니라 ( ＿ ) 건강에도 긍정적인 영향을 미칩니다. 따라서 ( ＿ ) 운동 습관을 기르는 것이 중요합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 정신적 / ( ＿ ) 꾸준한', 'Formal style, logical connection between physical and mental health.', ARRAY['Academic', 'Health', 'Formal']),
('w7', 53, 5, 'Graph Description - Youth Unemployment', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Youth Unemployment Rate in Korea]
- 2015: 8.2%
- 2018: 9.5%
- 2021: 11.2%
- Reason: Mismatch between university majors and industry needs.', 'Describe the trend and the reason for the increase.', '한국의 청년 실업률은 2015년 8.2%에서 2018년 9.5%로 상승하였으며, 2021년에는 11.2%까지 증가하는 추세를 보였습니다. 이러한 실업률 상승의 주요 원인은 대학 전공과 산업 현장에서 요구하는 직무 역량 간의 불일치로 인한 미스매치 현상인 것으로 분석됩니다.', 'Accurate data representation, professional tone, correct usage of \"상승하였다\" and \"분석된다\".', ARRAY['Data Analysis', 'Economy', 'Graph Description']),
('w8', 54, 6, 'Argumentative Essay - Environment', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The responsibility of corporations vs. individuals in solving climate change.
1. To what extent are individuals responsible?
2. To what extent are corporations responsible?
3. What is the most effective way for them to collaborate?', 'Write a structured essay addressing all three points.', '기후 위기는 인류가 직면한 가장 시급한 과제 중 하나입니다. 개인은 일회용품 사용 지양과 에너지 절약 등 작은 실천을 통해 탄소 배출을 줄이는 노력을 해야 합니다. 하지만 더 근본적인 해결을 위해서는 기업의 탄소 배출 저감과 친환경 공법 도입이 필수적입니다. 기업은 환경 보호를 단순한 사회공헌이 아니라 경영의 핵심 가치로 삼아야 합니다. 결국 정부의 제도적 뒷받침과 개인의 인식 변화, 기업의 실천이 삼박자를 이룰 때 비로소 기후 위기를 극복할 수 있습니다.', 'Complex sentence structures, clear thesis, balanced argument, and high-level vocabulary.', ARRAY['Essay', 'Environment', 'Argumentation']),
('w9', 51, 3, 'Short Answer Completion - Shopping', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '요즘은 온라인 쇼핑을 하는 사람들이 많습니다. 온라인 쇼핑은 ( ＿ ) 편리합니다. 하지만 직접 물건을 ( ＿ ) 수 없다는 단점이 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 매우 / ( ＿ ) 확인해 볼', 'Appropriate use of contrast (convenience vs. disadvantage).', ARRAY['Grammar', 'Shopping']),
('w10', 52, 4, 'Short Answer Completion - Culture', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '전통 문화는 한 민족의 정체성을 보여주는 중요한 자산입니다. 따라서 전통 문화를 ( ＿ ) 하는 노력이 필요합니다. 이를 통해 우리는 ( ＿ ) 가치를 배울 수 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 보존하고 계승 / ( ＿ ) 조상들의 지혜와', 'Use of formal style and vocabulary related to cultural heritage.', ARRAY['Academic', 'Culture', 'Formal'])
ON CONFLICT (id) DO NOTHING;
