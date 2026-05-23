-- Migration: seed_writing_prompts_batch6
-- Created: 2026-05-23T22:11:40.086921+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w51', 51, 3, 'Short Answer Completion - Music', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 음악 듣는 것을 아주 좋아합니다. 특히 ( ＿ ) 음악을 가장 좋아합니다. 나중에는 ( ＿ ) 악기를 배워보고 싶습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 클래식 / ( ＿ ) 피아노', 'Natural flow and appropriate hobby-related vocabulary.', ARRAY['Grammar', 'Hobbies']),
('w52', 52, 4, 'Short Answer Completion - Law', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '법은 사회 구성원 간의 갈등을 ( ＿ ) 하고 사회 질서를 유지하기 위해 존재합니다. 특히 기본권 보호는 국가 권력의 ( ＿ ) 을/를 방지하는 핵심적인 역할을 합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 조정 / ( ＿ ) 남용', 'Formal style and correct legal terminology.', ARRAY['Academic', 'Law', 'Formal']),
('w53', 53, 5, 'Graph Description - Pet Ownership Trends', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Number of Households with Pets in Korea]
- 2010: 10 million 
- 2015: 13 million 
- 2020: 16 million 
- Reason: Increase in single-person households and changes in perception of pets as family.', 'Describe the trend and the reason for the increase.', '한국의 반려동물 양육 가구 수는 2010년 1,000만 가구에서 2015년 1,300만 가구로 늘어났으며, 2020년에는 1,600만 가구에 도달하며 꾸준한 증가세를 보였습니다. 이러한 증가의 원인은 1인 가구의 급증과 더불어 반려동물을 단순한 동물이 아니라 가족의 일원으로 여기는 인식의 변화가 반영된 결과인 것으로 분석됩니다.', 'Accurate data representation and a natural causal link.', ARRAY['Data Analysis', 'Society', 'Graph Description']),
('w54', 54, 6, 'Argumentative Essay - Privacy vs Security', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The conflict between individual privacy and national security.
1. Why is the tension between privacy and security increasing?
2. What are the risks of prioritizing security over privacy?
3. How can we achieve a balance between the two?', 'Write a structured essay addressing all three points.', '디지털 기술의 발전으로 국가의 감시 능력이 비약적으로 향상됨에 따라 개인의 프라이버시 보호와 국가 안보라는 두 가치가 충돌하는 양상이 나타나고 있습니다. 특히 테러 방지나 범죄 예방이라는 명목으로 개인의 정보를 무분별하게 수집하는 것은 기본권을 심각하게 침해하고 국가의 권력 남용으로 이어질 위험이 있습니다. 따라서 법적 절차에 따른 엄격한 통제와 투명한 운영을 통해 개인의 권리를 보호하면서도 필요한 보안을 유지하는 균형 잡힌 시스템을 구축하는 것이 중요합니다.', 'Logical structure, balanced perspective, and high-level vocabulary.', ARRAY['Essay', 'Politics', 'Ethics']),
('w55', 51, 3, 'Short Answer Completion - Appointment', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '친구와 약속을 잡으려고 합니다. ( ＿ )에 만나는 것이 어때요? 시간이 안 되면 ( ＿ ) 시간으로 변경해도 괜찮습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 이번 주 토요일 / ( ＿ ) 다음 주', 'Natural and simple sentence completion.', ARRAY['Grammar', 'Daily Life']),
('w56', 52, 4, 'Short Answer Completion - Globalization', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '세계화의 진전으로 국가 간의 ( ＿ ) 교류가 활발해졌습니다. 이는 경제적 이득뿐만 아니라 서로 다른 문화에 대한 ( ＿ ) 을/를 넓히는 계기가 되었습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 인적, 물적 / ( ＿ ) 이해', 'Formal style and appropriate terms for globalization.', ARRAY['Academic', 'Culture', 'Formal']),
('w57', 53, 5, 'Graph Description - Coffee Consumption by Age', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Monthly Coffee Consumption by Age Group]
- 20s: 15 cups 
- 30s: 12 cups 
- 40s: 8 cups 
- 50s+: 5 cups 
- Reason: Coffee culture as a social tool and preference for caffeine among youth.', 'Describe the trend and the reason for the difference.', '연령대별 월평균 커피 소비량은 연령대가 낮을수록 많은 경향을 보입니다. 20대가 15잔으로 가장 많으며, 30대 12잔, 40대 8잔, 50대 이상은 5잔 순으로 감소하는 경향을 보였습니다. 이러한 차이는 커피를 통한 사회적 교류를 선호하는 청년층의 문화와 카페인 섭취에 대한 선호도가 높기 때문인 것으로 분석됩니다.', 'Accurate data representation and correct phrasing.', ARRAY['Data Analysis', 'Consumption', 'Graph Description']),
('w58', 54, 6, 'Argumentative Essay - Tradition vs Modernity', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The value of preserving traditions in a rapidly changing modern society.
1. Why do some people view traditions as obsolete?
2. What is the spiritual or social value of tradition?
3. How can tradition be creatively adapted to fit modern life?', 'Write a structured essay addressing all three points.', '급격한 현대화 과정에서 전통은 효율성과 실용성이라는 잣대 아래 구시대적 유물로 치부되곤 합니다. 하지만 전통은 단순한 과거의 재현이 아니라 한 공동체가 오랜 시간 쌓아온 정체성과 정신적 가치를 담고 있는 소중한 자산입니다. 전통을 무조건 보존하기보다 현대적인 감각으로 재해석하고 창의적으로 변형함으로써 현대인의 삶에 자연스럽게 녹아들게 하는 노력이 필요합니다. 결국 전통과 현대의 조화로운 공존이 우리 사회의 문화적 풍요로움을 더해줄 것입니다.', 'Logical flow, sophisticated vocabulary, and clear conclusion.', ARRAY['Essay', 'Culture', 'Philosophy']),
('w59', 51, 3, 'Short Answer Completion - Formal Request', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '선생님, 제가 개인적인 사정으로 오늘 수업에 ( ＿ ). 혹시 ( ＿ ) 방법이 있을까요?', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 참석하기 어려울 것 같습니다 / ( ＿ ) 보강할', 'Appropriate honorifics and formal request style.', ARRAY['Grammar', 'Formal']),
('w60', 52, 4, 'Short Answer Completion - Research Ethics', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '학술 연구에서 연구자의 ( ＿ ) 는/은 매우 중요합니다. 데이터를 조작하거나 표절하는 행위는 학문의 ( ＿ ) 을/를 심각하게 훼손하는 일입니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 연구 윤리 / ( ＿ ) 신뢰성', 'Academic tone and correct research-related terminology.', ARRAY['Academic', 'Ethics', 'Formal'])
ON CONFLICT (id) DO NOTHING;
