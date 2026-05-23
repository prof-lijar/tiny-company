-- Migration: seed_writing_prompts_batch5_fixed
-- Created: 2026-05-23T22:08:16.537363+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w41', 53, 5, 'Graph Description - Online Shopping Growth', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Online Shopping Transaction Volume] 
- 2017: 100 trillion KRW 
- 2019: 150 trillion KRW 
- 2021: 220 trillion KRW 
- Reason: Improvement in logistics and growth of e-commerce platforms.', 'Describe the trend and the reason for the increase.', '온라인 쇼핑 거래액은 2017년 100조 원에서 2019년 150조 원으로 증가하였고, 2021년에는 220조 원에 이르며 가파른 성장세를 기록했습니다. 이러한 성장은 물류 시스템의 혁신과 이커머스 플랫폼의 다변화로 인한 소비자 편의성 증대가 결정적인 원인이 된 것으로 분석됩니다.', 'Accurate data representation and professional tone.', ARRAY['Data Analysis', 'Economy', 'Graph Description']),
('w42', 54, 6, 'Argumentative Essay - Government Role in Economy', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The ideal role of the government in the economy. 
1. Should the government intervene in the market? 
2. What are the risks of excessive government intervention? 
3. What is the most balanced approach for economic stability?', 'Write a structured essay addressing all three points.', '시장의 효율성을 극대화하기 위해 정부의 개입은 최소화되어야 한다는 주장이 지배적입니다. 기본적으로 시장은 자율적인 가격 기제를 통해 자원을 효율적으로 배분하는 능력이 있기 때문입니다. 하지만 과도한 개입은 기업의 창의성을 저해하고 시장 왜곡을 불러와 경제적 비효율을 초래할 수 있습니다. 따라서 정부는 직접적인 시장 통제보다는 공정한 경쟁 환경을 조성하고 사회적 안전망을 구축하는 조력자의 역할에 집중하는 것이 가장 균형 잡힌 접근 방식이라고 생각합니다.', 'Complex argumentation, professional vocabulary, and logical structure.', ARRAY['Essay', 'Economy', 'Politics']),
('w43', 51, 3, 'Short Answer Completion - Airport', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '비행기 표를 예약하고 공항에 왔습니다. ( ＿ )을/를 하고 곧은 면세를 부치고 싶습니다. 그리고 ( ＿ ) 면세점에서 쇼핑을 하고 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 체크인 / ( ＿ ) 공항', 'Appropriate travel vocabulary and natural flow.', ARRAY['Grammar', 'Travel']),
('w44', 52, 4, 'Short Answer Completion - Ethics', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '윤리적 소비란 단순히 제품의 품질이나 가격뿐만 아니라 생산 과정의 ( ＿ ) 함께 고려하여 구매하는 소비 행위입니다. 이는 소비자가 사회적 ( ＿ )을/를 실천하는 방법입니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 윤리성과 공정성을 / ( ＿ ) 책임감', 'Academic style and correct use of ethical terms.', ARRAY['Academic', 'Ethics', 'Formal']),
('w45', 53, 5, 'Graph Description - Youth Population Decline', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Youth Population (ages 15-29) in Korea] 
- 2010: 10.5 million 
- 2015: 9.8 million 
- 2020: 8.5 million 
- Reason: Low birth rate and increasing preference for late marriage.', 'Describe the trend and the reason for the decrease.', '한국의 15~29세 청년 인구는 2010년 1,050만 명에서 2015년 980만 명으로 감소하였으며, 2020년에는 850만 명으로 떨어지며 지속적인 하락세를 보였습니다. 이러한 인구 감소의 주요 원인은 저출산 현상의 심화와 더불어 결혼 연령이 늦어지는 사회적 추세가 반영된 결과인 것으로 분석됩니다.', 'Accurate data representation and correct causal phrases.', ARRAY['Data Analysis', 'Society', 'Graph Description']),
('w46', 54, 6, 'Argumentative Essay - Digital Nomadism', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The rise of digital nomadism and its impact on the traditional concept of work. 
1. What is digital nomadism? 
2. What are the advantages and disadvantages of this work style? 
3. How will this change the future of urban development and company culture?', 'Write a structured essay addressing all three points.', '디지털 노마드라는 용어는 기술의 발달로 장소에 구애받지 않고 일하는 사람들을 의미합니다. 이러한 업무 형태는 시간과 공간의 자유를 누릴 수 있다는 점이 가장 큰 장점이지만, 사회적 고립감과 일과 삶의 경계가 모호해진다는 단점도 존재합니다. 앞으로 디지털 노마드의 확산은 기업 문화의 유연화를 촉진하고, 특정 중심지에 집중되었던 도시 개발을 분산시키는 결과로 이어질 것입니다. 결국 미래의 노동은 ''어디서'' 일하느냐보다 ''어떻게'' 성과를 내느냐가 더 중요한 가치가 될 것입니다.', 'Sophisticated vocabulary, logical flow, and forward-looking perspective.', ARRAY['Essay', 'Work', 'Technology']),
('w47', 51, 3, 'Short Answer Completion - Shopping', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '옷을 샀는데 사이즈가 너무 커서 ( ＿ ) 싶습니다. 혹시 ( ＿ )이/가 가능한가요?', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 교환하고 / ( ＿ ) 환불', 'Correct use of shopping-related terms (exchange/refund).', ARRAY['Grammar', 'Shopping']),
('w48', 52, 4, 'Short Answer Completion - Economics', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '인플레이션은 물가가 지속적으로 상승하여 화폐의 ( ＿ ) 가치가 하락하는 현상입니다. 이는 실질 소득의 ( ＿ ) 결과를 초래하여 소비 위축을 가져옵니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 구매 / ( ＿ ) 감소', 'Academic tone and correct economic terms.', ARRAY['Academic', 'Economy', 'Formal']),
('w49', 53, 5, 'Graph Description - Renewable Energy Adoption', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Share of Renewable Energy in Total Energy Consumption] 
- 2010: 5% 
- 2015: 12% 
- 2020: 25% 
- Reason: Global climate crisis and technological advancement in solar/wind power.', 'Describe the trend and the reason for the increase.', '전체 에너지 소비 중 재생 에너지의 비중은 2010년 5%에서 2015년 12%로 증가하였으며, 2020년에는 25%까지 상승하며 가파른 성장세를 나타냈습니다. 이는 전 지구적인 기후 위기에 대응하려는 노력과 더불어 태양광 및 풍력 발전 기술의 효율성이 크게 향상된 것이 주요 원인인 것으로 분석됩니다.', 'Accurate data representation and professional phrasing.', ARRAY['Data Analysis', 'Environment', 'Graph Description']),
('w50', 54, 6, 'Argumentative Essay - Future of Education', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The role of teachers in the age of AI-driven personalized learning. 
1. How is AI changing the way students learn? 
2. Will AI replace human teachers? Why or why not? 
3. What new competencies should future teachers possess?', 'Write a structured essay addressing all three points.', 'AI 기반의 맞춤형 학습은 학습자 개개인의 수준과 속도에 맞는 최적의 커리큘럼을 제공함으로써 학습 효율성을 획기적으로 높이고 있습니다. 하지만 AI가 지식 전달의 효율성은 높일 수 있어도, 인간 교사가 제공하는 정서적 교감과 사회적 가치 함양은 대체할 수 없습니다. 따라서 미래의 교사는 단순한 지식 전달자에서 벗어나, AI가 제공하는 데이터를 분석해 학습 방향을 제시하고 학습자의 성장을 돕는 학습 촉진자(Facilitator)로서의 역할을 수행해야 합니다.', 'Clear thesis, logical argumentation, and sophisticated vocabulary.', ARRAY['Essay', 'Education', 'AI'])
ON CONFLICT (id) DO NOTHING;
