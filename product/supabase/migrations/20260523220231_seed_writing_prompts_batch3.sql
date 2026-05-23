-- Migration: seed_writing_prompts_batch3
-- Created: 2026-05-23T22:02:31.210751+00:00

INSERT INTO public.writing_prompts (id, task_number, level, title, instruction, context, prompt, sample_answer, scoring_criteria, tags) VALUES
('w21', 53, 5, 'Graph Description - Electric Vehicle Sales', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Global Electric Vehicle (EV) Sales]
- 2015: 500k units
- 2018: 2M units
- 2022: 10M units
- Reason: Government subsidies and improvement in battery technology.', 'Describe the trend and the reason for the increase.', '전 세계 전기차 판매량은 2015년 50만 대에서 2018년 200만 대로 증가하였으며, 2022년에는 1,000만 대를 기록하며 폭발적인 성장세를 보였습니다. 이러한 성장은 각국 정부의 구매 보조금 지원과 배터리 효율 및 성능의 비약적인 발전이 주요 원인인 것으로 분석됩니다.', 'Accurate data representation and use of \"폭발적인 성장세\".', ARRAY['Data Analysis', 'Technology', 'Graph Description']),
('w22', 54, 6, 'Argumentative Essay - Universal Basic Income', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The feasibility and necessity of Universal Basic Income (UBI).
1. Why is UBI being discussed now?
2. What are the arguments for and against UBI?
3. What is your perspective on the most reasonable implementation method?', 'Write a structured essay addressing all three points.', '자동화와 인공지능의 발전으로 인한 일자리 감소 위협 속에서 기본 소득 제도는 새로운 사회 안전망으로 주목받고 있습니다. 기본 소득은 모든 시민에게 조건 없이 일정 금액을 지급함으로써 최소한의 인간다운 삶을 보장하고 소비를 진작시키는 효과가 있습니다. 반면, 막대한 재원 마련을 위한 세금 인상과 근로 의욕 저하라는 비판도 존재합니다. 따라서 전면적인 도입보다는 특정 연령대나 소득 계층부터 단계적으로 도입하는 점진적 방식으로 사회적 합의를 도출하는 것이 가장 합리적인 방향이라고 생각합니다.', 'Sophisticated argumentation, clear structure, and realistic policy suggestions.', ARRAY['Essay', 'Economy', 'Argumentation']),
('w23', 51, 3, 'Short Answer Completion - Cooking', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 요리하는 것을 좋아합니다. 요리를 하면 ( ＿ ) 기분이 듭니다. 특히 ( ＿ ) 요리를 만드는 것을 가장 좋아합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 마음이 편안해지는 / ( ＿ ) 한국', 'Natural and simple sentence completion.', ARRAY['Grammar', 'Hobbies']),
('w24', 52, 4, 'Short Answer Completion - Space Exploration', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '우주 탐사는 인류의 지적 호기심을 충족시키고 새로운 자원을 발견하는 데 큰 의미가 있습니다. 특히 화성 탐사는 인류가 ( ＿ ) 가능성을 열어주었습니다. 앞으로 ( ＿ ) 기술이 더욱 발전한다면 외계 생명체의 존재를 확인하는 것도 가능할지 모릅니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 다른 행성에서 거주할 / ( ＿ ) 우주 항해', 'Formal tone and appropriate academic terms.', ARRAY['Academic', 'Science', 'Formal']),
('w25', 53, 5, 'Graph Description - 1-Person Households', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Proportion of 1-Person Households in Korea]
- 2000: 15%
- 2010: 23%
- 2020: 31%
- Reason: Change in marriage values and aging population.', 'Describe the trend and the reason for the increase.', '한국의 1인 가구 비율은 2000년 15%에서 2010년 23%로 증가하였으며, 2020년에는 31%에 도달하며 지속적인 상승 곡선을 그렸습니다. 이러한 증가의 원인은 결혼에 대한 가치관의 변화와 고령 사회 진입으로 인한 독거 노인 가구의 증가가 복합적으로 작용한 결과인 것으로 분석됩니다.', 'Use of \"지속적인 상승 곡선을 그렸다\" and accurate analysis of causes.', ARRAY['Data Analysis', 'Society', 'Graph Description']),
('w26', 54, 6, 'Argumentative Essay - Genetic Engineering', 'Write an essay of 600-700 characters on the following topic.', 'Topic: The ethics of genetic engineering in humans.
1. What are the potential benefits of genetic engineering?
2. What are the ethical concerns (e.g., designer babies)?
3. Where should the line be drawn between treatment and enhancement?', 'Write a structured essay addressing all three points.', '유전자 편집 기술의 발전은 유전성 질환을 근본적으로 치료할 수 있는 획기적인 가능성을 제시합니다. 하지만 이를 통한 \"맞춤형 아기\"의 탄생은 인간의 존엄성을 훼손하고 사회적 불평등을 심화시킬 수 있다는 윤리적 문제를 야기합니다. 따라서 유전자 편집의 활용 범위는 생명에 치명적인 질병의 치료와 예방에만 엄격히 한정되어야 하며, 외모나 지능 같은 성능 향상을 위한 사용은 엄격히 금지되어야 합니다. 결국 기술의 발전보다 중요한 것은 인간에 대한 윤리적 성찰과 합의입니다.', 'Deep ethical analysis, clear distinction between treatment and enhancement, and strong conclusion.', ARRAY['Essay', 'Ethics', 'Argumentation']),
('w27', 51, 3, 'Short Answer Completion - Reading Books', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '저는 책 읽는 것을 좋아합니다. 책을 읽으면 ( ＿ ) 수 있습니다. 특히 ( ＿ ) 책을 읽는 것을 가장 좋아합니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 새로운 지식을 얻을 / ( ＿ ) 소설', 'Simple and natural sentence completion.', ARRAY['Grammar', 'Hobbies']),
('w28', 52, 4, 'Short Answer Completion - Renewable Energy', 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.', '화석 연료의 사용으로 인한 환경 오염이 심각해지면서 대체 에너지에 대한 관심이 높아지고 있습니다. 태양광과 풍력 에너지는 ( ＿ ) 에너지원이라는 장점이 있습니다. 하지만 ( ＿ ) 문제가 여전히 해결해야 할 과제로 남아 있습니다.', 'Fill in ( ＿ ) and ( ＿ )', '( ＿ ) 무한하고 친환경적인 / ( ＿ ) 발전 효율', 'Formal tone and appropriate environmental terminology.', ARRAY['Academic', 'Environment', 'Formal']),
('w29', 53, 5, 'Graph Description - Tourism Recovery', 'Write a description of the provided data (approx. 200-300 characters).', 'Data: [Topic: Number of Foreign Tourists visiting Korea]
- 2019: 17.5M
- 2020: 2.5M
- 2022: 13M
- Reason: Pandemics followed by the gradual reopening of borders.', 'Describe the trend and the reason for the increase.', '한국을 방문하는 외국인 관광객 수는 2019년 1,750만 명에서 2020년 250만 명으로 급격히 감소하였습니다. 하지만 이후 국가 간 이동 제한이 점진적으로 해제됨에 따라 2022년에는 1,300만 명으로 회복세를 보였습니다. 이러한 V자형 회복 곡선은 억눌렸던 여행 수요가 한꺼번에 폭발하는 \"보복 여행\" 현상이 반영된 결과인 것으로 분석됩니다.', 'Accurate representation of the drop and subsequent recovery.', ARRAY['Data Analysis', 'Tourism', 'Graph Description']),
('w30', 54, 6, 'Argumentative Essay - Urban Regeneration', 'Write an essay of 600-700 characters on the following topic.', 'Topic: Full redevelopment vs. Urban regeneration (preserving old neighborhoods).
1. What are the pros and cons of full redevelopment?
2. What are the benefits of urban regeneration?
3. Which approach is more sustainable for the future of cities?', 'Write a structured essay addressing all three points.', '도시의 노후화 문제를 해결하기 위해 전면 재개발과 도시 재생이라는 두 가지 접근 방식이 대립합니다. 전면 재개발은 효율적인 토지 이용과 현대적 인프라 구축이 가능하다는 장점이 있지만, 기존 공동체의 파괴와 젠트리피케이션이라는 부작용을 낳습니다. 반면 도시 재생은 지역의 역사성과 정체성을 보존하면서 점진적으로 주거 환경을 개선하는 방식입니다. 미래의 지속 가능한 도시를 위해서는 무분별한 파괴보다는 지역의 특성을 살린 도시 재생을 통해 도시의 매력을 유지하고 상생하는 방향으로 나아가야 합니다.', 'Balanced argument, use of term \"젠트리피케이션\", and a clear sustainable perspective.', ARRAY['Essay', 'Urban Planning', 'Argumentation'])
ON CONFLICT (id) DO NOTHING;
