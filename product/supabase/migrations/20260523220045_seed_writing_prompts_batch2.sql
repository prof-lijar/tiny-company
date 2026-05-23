-- Migration: seed_writing_prompts_batch2
-- Created: 2026-05-23T22:00:45.959705+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w11', 51, 3, 'Short Answer Completion - Hobbies', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 취미로 등산을 합니다. 등산을 하면 ( ＿ ) 좋았습니다. 그리고 ( ＿ ) 풍경을 볼 수 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 건강이 / ( ＿ ) 아름다운', 'Natural flow and appropriate hobby-related vocabulary.', ARRAY['Grammar', 'Hobbies']),
('w12', 52, 4, 'Short Answer Completion - Technology', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '스마트폰의 보급으로 인해 정보 접근성이 획기적으로 향상되었습니다. 사람들은 이제 언제 어디서나 ( ＿ ) 수 있게 되었습니다. 하지만 과도한 스마트폰 사용은 ( ＿ ) 문제를 야기할 수 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 필요한 정보를 얻을 / ( ＿ ) 거북목 증후군이나 집중력 저하와 같은 정신과 신체적', 'Formal tone and logical contrast between benefit and drawback.', ARRAY['Academic', 'Technology', 'Formal']),
('w13', 53, 5, 'Graph Description - Coffee Consumption', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Per Capita Coffee Consumption in Korea]
- 2010: 25kg
- 2015: 40kg
- 2020: 65kg
- Reason: Expansion of franchise cafes and preference for iced americano.', 'Describe the trend and the reason for the increase.', '한국인의 1인당 커피 소비량은 2010년 25kg에서 2015년 40kg으로 증가하였으며, 2020년에는 65kg에 도달하며 가파른 상승세를 보였습니다. 이러한 현상은 프랜차이즈 카페의 확산과 아이스 아메리카노에 대한 선호도 증가가 주요 원인인 것으로 분석됩니다.', 'Accurate data representation and use of phrases like \"가파른 상승세를 보였다\".', ARRAY['Data Analysis', 'Consumption', 'Graph Description']),
('w14', 54, 6, 'Argumentative Essay - Social Media', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The impact of social media on human relationships.
1. How has social media changed the way we communicate?
2. What are the positive and negative effects of these changes?
3. How can we maintain healthy relationships in the digital age?', 'Write a structured essay addressing all three points.', '소셜 미디어의 등장은 인간의 소통 방식을 획기적으로 변화시켰습니다. 시간과 장소의 제약 없이 전 세계 사람들과 연결될 수 있다는 점은 긍정적입니다. 하지만 직접적인 소통이 줄어들면서 타인과 깊은 정서적 교감을 나누는 데 어려움을 겪는 Urban Paradox 현상이 나타나고 있습니다. 따라서 디지털 기기를 통한 소통과 더불어, 오프라인에서 직접 얼굴을 마주하는 진정성 있는 관계를 유지하려는 노력이 병행되어야 합니다. 결국 기술은 수단일 뿐, 관계의 본질은 서로에 대한 관심과 배려에 있기 때문입니다.', 'Logical structure, balanced perspective, and high-level vocabulary.', ARRAY['Essay', 'Society', 'Argumentation']),
('w15', 51, 3, 'Short Answer Completion - Weather', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '오늘은 날씨가 매우 ( ＿ ). 그래서 저는 친구와 함께 ( ＿ ) 공원에 가기로 했습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 맑습니다 / ( ＿ ) 가까운', 'Simple and natural sentence completion.', ARRAY['Grammar', 'Weather']),
('w16', 52, 4, 'Short Answer Completion - Urbanization', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '도시화가 급속히 진행되면서 사람들은 ( ＿ ) 관계를 맺는 경향이 있습니다. 이는 과거의 공동체 중심 문화에서 ( ＿ ) 문화로의 변화를 의미합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 익명적이고 파편적인 / ( ＿ ) 개인 중심의', 'Use of contrast markers and formal academic style.', ARRAY['Academic', 'Society', 'Formal']),
('w17', 53, 5, 'Graph Description - Online Education', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Proportion of Online Learning in Universities]
- 2018: 12%
- 2019: 15%
- 2020: 78%
- Reason: COVID-19 pandemic and digitalization of education.', 'Describe the trend and the reason for the increase.', '대학 내 온라인 학습 비중은 2018년 12%에서 2019년 15%로 완만하게 상승하다가, 2020년에는 78%로 급격히 증가했습니다. 이러한 급격한 증가는 코로나19 팬데믹으로 인한 비대면 수업의 강제적 도입과 교육의 디지털 전환 가속화가 결정적인 원인이 된 것으로 분석됩니다.', 'Contrast between \"완만하게 상승\" and \"급격히 증가\", and accurate causal analysis.', ARRAY['Data Analysis', 'Education', 'Graph Description']),
('w18', 54, 6, 'Argumentative Essay - Work-Life Balance', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The importance of work-life balance (Worabel) in modern society.
1. Why has work-life balance become a key value?
2. What are the consequences of a lack of balance?
3. What systemic changes are needed to achieve it?', 'Write a structured essay addressing all three points.', '현대 사회에서 일과 삶의 균형, 즉 워라밸은 단순한 유행을 넘어 삶의 질을 결정하는 핵심 가치가 되었습니다. 무분별한 경쟁과 과도한 노동은 개인의 번아웃을 초래하고, 이는 곧 국가적 차원의 생산성 저하와 저출산 문제로 이어집니다. 이를 해결하기 위해서는 개인의 노력뿐만 아니라 기업 문화의 근본적인 변화가 필요합니다. 정시 퇴근을 당연시하는 분위기와 유연 근무제의 도입을 통해 개인이 자신의 삶을 주도적으로 설계할 수 있는 환경을 구축해야 합니다. 결국 행복한 개인이 모여 건강한 사회를 만들 수 있기 때문입니다.', 'Logical flow, use of terms like \"번아웃\", \"유연 근무제\", and strong conclusion.', ARRAY['Essay', 'Work', 'Argumentation']),
('w19', 51, 3, 'Short Answer Completion - Pets', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 강아지를 키우고 있습니다. 강아지와 함께 ( ＿ ) 시간이 정말 행복합니다. 특히 ( ＿ ) 산책하는 것을 좋아합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 보내는 / ( ＿ ) 저녁에', 'Natural expression of emotion and activity.', ARRAY['Grammar', 'Pets']),
('w20', 52, 4, 'Short Answer Completion - Artificial Intelligence', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '인공지능의 발전은 많은 분야에서 혁신을 일으키고 있습니다. 특히 의료 분야에서는 ( ＿ ) 가능성을 높여 많은 생명을 구할 수 있게 되었습니다. 하지만 AI의 ( ＿ ) 문제에 대한 사회적 합의가 필요합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 질병의 조기 진단 / ( ＿ ) 윤리적', 'Academic vocabulary and professional tone.', ARRAY['Academic', 'AI', 'Formal'])
ON CONFLICT (id) DO NOTHING;
