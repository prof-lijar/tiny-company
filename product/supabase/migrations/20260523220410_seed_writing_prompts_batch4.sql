-- Migration: seed_writing_prompts_batch4
-- Created: 2026-05-23T22:04:10.443871+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w31', 51, 3, 'Short Answer Completion - Job Application', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '안녕하세요. 저는 이번 채용 공고를 보고 지원하게 된 김철수입니다. 저는 관련 분야에서 ( ＿ ) 경험이 있습니다. 이번 기회를 통해 회사에서 ( ＿ ) 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 실무를 수행한 / ( ＿ ) 역량을 발휘하고', 'Appropriate use of job-application vocabulary and formal style.', ARRAY['Grammar', 'Work', 'Formal']),
('w32', 52, 4, 'Short Answer Completion - Psychology', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '인간의 심리는 외부 자극에 의해 ( ＿ ) 영향을 받습니다. 특히 정서적 상태는 특정 행동을 ( ＿ ) 하는 효과가 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 결정적인 / ( ＿ ) 유도시키는', 'Academic vocabulary related to psychology and formal written style.', ARRAY['Academic', 'Psychology', 'Formal']),
('w33', 53, 5, 'Graph Description - Digital Payment Usage', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Digital Payment Usage in Korea] 
- 2015: 20% 
- 2018: 45% 
- 2022: 82% 
- Reason: Expansion of mobile payment systems and contactless technology.', 'Describe the trend and the reason for the increase.', '한국의 디지털 결제 이용률은 2015년 20%에서 2018년 45%로 증가하였으며, 2022년에는 82%에 도달하며 급격한 성장세를 보였습니다. 이러한 성장은 모바일 결제 시스템의 확산과 비접촉식 결제 기술의 도입으로 인한 편의성 증대가 결정적인 원인이 된 것으로 분석됩니다.', 'Accurate data representation and use of graph description phrases.', ARRAY['Data Analysis', 'Technology', 'Graph Description']),
('w34', 54, 6, 'Argumentative Essay - AI in Arts', 'Write an essay of 600-700 characters on the following topic.', 'Topic: Can AI-generated art be considered \"true\" art? 
1. What are the characteristics of AI-generated art? 
2. What is the essential element of human art that AI lacks? 
3. How should we define the concept of \"artist\" in the AI era?', 'Write a structured essay addressing all three points.', '최근 인공지능(AI)이 생성한 그림과 음악이 예술로 인정받으며 많은 주목을 받고 있습니다. AI 예술은 방대한 데이터를 학습하여 최적의 결과물을 도출내는 계산적 특성을 지닙니다. 하지만 예술의 본질은 단순한 결과물이 아니라 창작 과정에서 느껴지는 인간의 고뇌와 철학적 성찰에 있습니다. AI는 데이터를 조합할 뿐, 주관적인 감정을 담아낼 수 없기 때문입니다. 따라서 AI 시대의 예술가는 AI를 도구로 활용하여 새로운 예술적 가능성을 확장하는 기획자이자 감독으로 재정의되어야 합니다.', 'Logical structure, sophisticated vocabulary, and clear thesis.', ARRAY['Essay', 'AI', 'Philosophy']),
('w35', 51, 3, 'Short Answer Completion - Hospital', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '어제부터 아니 감기 증상이 심해서 병원에 왔습니다. ( ＿ ) 검사를 받고 싶습니다. 그리고 ( ＿ ) 약을 처방받고 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 정밀 / ( ＿ ) 적절한', 'Natural flow and appropriate medical-related vocabulary.', ARRAY['Grammar', 'Health']),
('w36', 52, 4, 'Short Answer Completion - Sociology', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '도시화가 급속히 진행되면서 사람들은 ( ＿ ) 관계를 맺는 경향이 있습니다. 이는 과거의 공동체 중심 문화에서 ( ＿ ) 문화로의 변화를 의미합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 익명적이고 파편적인 / ( ＿ ) 개인 중심의', 'Formal style and use of sociological terms.', ARRAY['Academic', 'Sociology', 'Formal']),
('w37', 53, 5, 'Graph Description - Average Sleep Hours', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Average Sleep Hours of Korean Adults] 
- 20-30s: 6.2 hours 
- 40-50: 6.8 hours 
- 60s+: 7.5 hours 
- Reason: Work pressure and digital device usage among youth.', 'Describe the trend and the reason for the difference.', '한국 성인의 평균 수면 시간은 연령대가 높아질수록 증가하는 경향을 보입니다. 20~30대는 6.2시간으로 가장 짧으며, 40~50대는 6.8H, 60대 이상은 7.5시간으로 나타났습니다. 특히 청년층의 수면 시간이 짧은 이유는 과도한 업무 압박과 취침 전 디지털 기기 사용이 주요 원인인 것으로 분석됩니다.', 'Accurate comparison of data and causal analysis.', ARRAY['Data Analysis', 'Health', 'Graph Description']),
('w38', 54, 6, 'Argumentative Essay - Mental Health', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The importance of mental health care in modern society. 
1. Why is mental health as important as physical health? 
2. What are the social barriers to seeking mental health care? 
3. How can society create a support system for mental wellness?', 'Write a structured essay addressing all three points.', '현대 사회에서 정신 건강은 신체 건강만큼이나 중요한 삶의 질 요소입니다. 신체적 질병이 삶의 기능을 저하시키듯, 우울증이나 불안과 같은 정신적 질환은 개인의 일상과 사회적 관계를 무너뜨릴 수 있기 때문입니다. 하지만 여전히 우리 사회에는 정신과 진료에 대한 편견과 사회적 시선이라는 높은 장벽이 존재합니다. 이를 해결하기 위해서는 정신 건강 관리를 부끄러운 일이 아니라 당연한 권리로 인식하는 문화적 변화와 더불어, 누구나 쉽게 접근할 수 있는 지역사회 중심의 상담 시스템 구축이 필요합니다.', 'Logical flow, empathetic yet professional tone, and clear solutions.', ARRAY['Essay', 'Health', 'Society']),
('w39', 51, 3, 'Short Answer Completion - Education', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 이번 학기에 한국어 수업을 ( ＿ ). 한국어 능력을 높여서 나중에 한국 대학에서 ( ＿ ) 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 듣고 있습니다 / ( ＿ ) 공부하고', 'Correct grammar and natural expressions for education.', ARRAY['Grammar', 'Education']),
('w40', 52, 4, 'Short Answer Completion - Science', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '기후 변화로 인한 지구 온난화는 생태계에 ( ＿ ) 영향을 미칩니다. 특히 해수면 상승은 저지대 국가들의 ( ＿ ) 문제를 야기합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 치명적인 / ( ＿ ) 생존', 'Academic tone and use of environmental terminology.', ARRAY['Grammar', 'Science', 'Formal'])
ON CONFLICT (id) DO NOTHING;
