# BCMS 프로세스 간 연계성 — 근거·정의서 (V2)

> 박사논문 프로젝트 · 근거 문헌: Arias-Aranda et al.(2026) *Appl. Sci.* 16, 3219 / Białas(2010) *Ontological approach to the business continuity management system development*

> 모든 영문 인용문은 PDF 원문과 자동 대조했다(64/64 일치, 검증일 2026-10-06). 한국어 번역은 연구자 번역(참고용)이다.

## 0. 읽는 법

- **▶ 인용**: 논문 원문을 그대로 옮긴 부분(쪽 번호 포함).
- **▶ 연구자 의견**: 인용에 없는 해석·가정·분류·정의. 박사논문에서 연구자가 직접 확정해야 한다.
- **증거유형** E1=원문이 S→T 연결을 직접 서술 / E2=출발·도착 일부를 연구자가 특정·보완 / E3=원문에 서술 없음(연구자 가정 또는 유추).

- 집계: E1 26개 · E2 2개 · E3 3개 (총 31개 연결).

## 1. 정의서

| ID | 용어 | 유형 | 정의 | 근거 인용 | 근거·한계 |
|---|---|---|---|---|---|
| D01 | 프로세스(객체) | 인용 정의 + 연구자 범위 설정 | 입력을 출력으로 전환하는, 상호 관련되거나 상호작용하는 활동의 응집된 집합. 본 연구의 객체는 Arias Table 5의 22개 BCMS 프로세스이며, BCMS 계획은 프로젝트로 분류되어 제외한다. | A42, A01, A48 | 객체 22개 선정 = Arias Table 5(인용). 객체에서 BCMS 계획을 뺀 것도 Arias의 분류(A48)를 따른 것. |
| D02 | 산출물(artefact) | 인용 개념 + 연구자 정의 | [연구자 정의] 프로세스가 만들어 다른 프로세스가 사용하는 문서·기록·보고·결정. Białas는 slot이 채워진 개체가 핵심 BCM 산출물(주로 문서)을 나타낸다고 쓴다. | B07 | 용어는 Białas에서 차용, 정의 문장은 연구자가 작성. |
| D03 | 연결(link) | 연구자 정의 | 프로세스 S의 산출물·결과·자원이 프로세스 T의 입력·기준·실행·개정에 쓰이도록 Arias가 서술한 방향성 있는 프로세스 쌍(S→T) 1개. 한 연결은 정확히 하나의 출발(S)과 하나의 도착(T)을 가진다(집단 노드 CORE 제외). Białas의 object-type slot(domain→range)에 대응시킨다. | A02, A03, A04, B04, B05 | 연결이라는 단위의 정의는 연구자 정의. 입력·출력·상호작용·상호 연결이 중요하다는 점은 인용. |
| D04 | 연계성(linkage) | 연구자 정의(구성개념) | BCMS 프로세스 간 연결이 조직의 실제 운영에서 반영(R)되고, 그 반영이 확인(V)되며, 출발 또는 도착 프로세스가 바뀔 때 갱신(U)되는 정도. 한 연결의 점수는 R·V·U 문항 평균, 조직의 연계성 지수는 연결 점수의 평균이다. | A01, A02, A04, B01, A07, A05 | "연계성"이라는 용어와 R·V·U 구성은 두 논문에 없는 연구자 정의. 프로세스 간 상호 연결·상호작용이 BCMS의 핵심이라는 점(A01, A02, A04, B01, A07)과 체크리스트만으로는 지속 운영이 보장되지 않는다는 점(A05)이 정의의 이유. |
| D05 | 반영(R, reflected) | 연구자 정의 | T의 계획·기준·산출물·결정에 S의 산출물이 실제로 사용되었다는 증거(문서 인용, 항목 포함, 절차상 입력)가 있는 상태. | — | 두 논문에 해당 구분 없음. |
| D06 | 확인(V, verified) | 연구자 정의 | S→T 반영이 누락·불일치 없이 이루어졌는지를 점검·검토·승인·대조하는 절차를 수행하고 기록하는 상태. | A36, A23 | Arias는 이행관리가 전략을 "verifying"하고(A36), 연습이 계획의 유효성을 "validate"한다고(A23) 서술한다. 이는 확인 행위의 예시로 참고했을 뿐 R/V/U 3상태 구분은 연구자 정의. |
| D07 | 갱신(U, updated) | 연구자 정의 | S의 산출물 또는 T가 바뀔 때, 상대 프로세스를 재검토하고 필요하면 개정하는 절차가 수행되는 상태. 문항에서는 "다시 검토하고 고친다" 형태로 표현한다. | A41 | Arias의 문서화된 정보 통제가 정보의 "updating"을 포함한다(A41)는 점을 참고. 갱신의 정의는 연구자 정의. |
| D08 | 관계유형(relation type) | 연구자 정의 | 연결의 의미를 7가지로 분류한 것(informs, elaboratedInto, testedBy, updates, triggers, contains, supplies). 정의와 판정 질문은 [관계유형] 시트에 있다. | B04 | Białas의 관계 이름(hasBCplan 등)은 구성 관계 위주여서 쓰지 않았고, 7개 이름은 연구자가 붙임. |
| D09 | 증거유형 E1/E2/E3 | 연구자 정의 | E1=원문이 S→T 연결을 직접 서술(인용만으로 연결의 존재와 방향이 성립). E2=원문이 연결을 서술하나 출발 또는 도착 프로세스를 연구자가 특정·보완해야 함. E3=원문에 연결 서술이 없고 연구자 가정 또는 Białas의 유추에 의존. 각 연결에 인용문과 연구자 의견을 분리해 기록한다. | — | 등급 기준은 연구자 정의. |
| D10 | 연결 영역 ①~⑤ | 연구자 분류 | 연결의 도착 프로세스가 수행하는 업무 흐름에 따라 묶은 분류(① 요구·분석, ② 전략·계획·이행, ③ 대응·복구·훈련, ④ 평가·개선·변경, ⑤ 거버넌스·이해관계자). | — | Arias의 PDCA 열(Table 5)과는 별개의 연구자 분류. PDCA는 객체 시트에 별도 표기. |
| D11 | 집단 노드 CORE | 연구자 정의 | Arias가 "nearly all BCMS processes"처럼 프로세스를 열거하지 않고 가리킨 집단을 하나의 가상 노드로 표현한 것. 객체 22개에 포함되지 않는다. | A30, A18 | 노드 자체는 연구자가 만든 것. |
| D12 | competency question | 인용 정의 + 연구자 적용 | 온톨로지 관련 지식베이스가 답할 수 있는 온톨로지 영역의 질문. 그 답이 온톨로지의 범위를 정의한다. 본 연구에서는 연결마다 "이 연결이 조직에서 유지되는지 어떤 질문으로 확인하는가"를 문항 3개(R·V·U)로 구체화한다. | B02, B03 | 정의는 Białas 인용, 문항으로의 적용은 연구자 설계. |
| D13 | ProcessLink 객체화 | 연구자 설계 | 연결 자체를 하나의 개체로 보고 R·V·U를 그 개체의 속성(data slot)으로 두는 설계. Białas가 object slot을 관계로, data slot을 속성으로 구분한 방식을 응용했다. | B04, B06 | Białas는 이런 객체화를 하지 않았다. |
| D14 | 응답 9(해당 없음/모르겠음) | 연구자 정의 | 프로세스가 없거나 응답자가 알 수 없어 응답할 수 없는 경우. 점수 계산에서 결측으로 처리하며 "연결이 약함"과 구분한다. | — | — |
| D15 | 합의 판정(80%·20%) | 인용 + 연구자 적용 | 범주 1(80% 이상 채택), 범주 2(20~80% 토론), 범주 3(20% 미만 기각)의 3단계 판정. 본 연구는 전문가 맹검 재분류 일치율과 연결 타당도 판정에 같은 틀을 준용한다. | A43, A44, A45 | Arias는 프로세스의 핵심 여부에 적용했고, 문항·연결에 적용하는 것은 연구자의 준용. |
| D16 | I-CVI 기준(0.78) | 연구자 선택(관례) | 전문가 6~10인 패널에서 적합도 3~4점 비율이 0.78 이상이면 채택하는 관례 기준. | — | 두 논문에 근거 없음. 일반적 관례를 연구자가 선택. |
| D17 | Białas 차용 범위 | 연구자 정의 | 차용=방법(competency question, object slot의 domain/range, data slot, 개체=산출물, 검증 방식). 비차용=클래스 목록·관계 이름(BS 25999 기반). Białas는 BCMO가 프로토타입이며 실제 데이터 검증이 더 필요하다고 밝힌다. | B15, B14, B02, B04, B05, B06, B08 | — |

## 2. 방법 근거 (Białas 인용)

- **B02** (Białas p.2, §2.1) ▶ 인용: "The ontology domain questions that the ontology related knowledge base is able to answer are called competency questions"
  - 번역: 온톨로지 관련 지식베이스가 답할 수 있는 온톨로지 영역의 질문을 competency question이라 한다.
  - 사용: competency question 정의(연결 시트 CQ 열)
- **B03** (Białas p.2, §2.1) ▶ 인용: "The answers define the scope of the ontology."
  - 번역: 그 답이 온톨로지의 범위를 정의한다.
  - 사용: CQ로 측정 범위를 정하는 방식
- **B04** (Białas p.3, §2.5) ▶ 인용: "i.e. relationships between an individual member of the given class (the object) and other individuals"
  - 번역: 즉, 해당 클래스의 개체(객체)와 다른 개체들 사이의 관계.
  - 사용: object-type slot 정의(연결 = 관계)
- **B05** (Białas p.3, §2.5) ▶ 인용: "An instance-type slot is attached to the classes which are called a domain. The classes indicated by this slot are called a range."
  - 번역: instance-type slot이 부착되는 클래스를 domain이라 하고, 이 slot이 가리키는 클래스를 range라 한다.
  - 사용: 연결의 출발(domain)과 도착(range) 정의
- **B06** (Białas p.3, §2.5) ▶ 인용: "i.e. intrinsic or extrinsic properties of the individuals of the most elementary classes"
  - 번역: 즉, 가장 기초적인 클래스의 개체가 지니는 내재적·외재적 속성.
  - 사용: data-type slot 정의(반영·확인·갱신을 연결의 속성으로 두는 근거)
- **B07** (Białas p.3, §2.6) ▶ 인용: "The individuals with filled-in slots represent the key BCM artefacts, mostly documents, of the BCMO related knowledge base."
  - 번역: slot이 채워진 개체는 BCMO 지식베이스의 핵심 BCM 산출물(주로 문서)을 나타낸다.
  - 사용: 산출물(artefact) 개념
- **B08** (Białas p.3, §2.7) ▶ 인용: "During the validation process the user checks if the right structures of individuals are composed, if they have assumed properties, if the needed information can be retrieved properly by queries from the knowledge database, and if the forms are properly defined."
  - 번역: 검증 과정에서 사용자는 개체의 올바른 구조가 구성되었는지, 가정된 속성을 갖는지, 필요한 정보가 질의로 올바르게 검색되는지, 입력 양식이 적절히 정의되었는지를 확인한다.
  - 사용: 검증 계획 6.1·6.5 방법의 근거
- **B14** (Białas p.6, §3) ▶ 인용: "it is still a prototype which requires: knowledge base extension, further development, introducing more sophisticated competency questions, and more validation on real data"
  - 번역: (BCMO는) 여전히 프로토타입이며 지식베이스 확장, 추가 개발, 더 정교한 competency question 도입, 실제 데이터에 대한 추가 검증이 필요하다.
  - 사용: Białas의 한계(본 연구가 방법만 차용하는 이유)
- **B15** (Białas p.1, 초록) ▶ 인용: "compliant with the BS 25999 standard"
  - 번역: BS 25999 표준에 부합하는
  - 사용: Białas가 BS 25999 기반임

## 3. 관계유형 7개 (연구자 정의)

| 관계유형 | 정의(S→T) | 판정 질문 | 해당 연결 |
|---|---|---|---|
| informs | S의 산출물이 T의 입력·기준·근거가 된다. | T를 수행할 때 S의 산출물이 필요한가? | L01~L06, L09, L11, L17, L18~L20, L27, L28 |
| elaboratedInto | S의 내용이 T로 구체화·도출·실행된다. | T의 내용은 S에서 도출되는가(S가 바뀌면 T를 다시 써야 하는가)? | L07, L08, L12, L29 |
| testedBy | S가 T에 의해 시험·검증된다. | T가 S의 유효성을 평가하는가? | L15 |
| updates | S의 결과·승인된 변경이 T의 내용을 개정·갱신한다. | S의 결과가 T의 문서·절차를 바꾸는가? | L16, L22, L25, L26 |
| triggers | S의 사건·결과가 T의 수행을 개시한다. | S가 일어나면 T가 시작되는가? | L21, L23, L24 |
| contains | T는 S의 하위 프로세스이다. | T가 S의 일부로서 S 안에서 수행되는가? | L13, L14 |
| supplies | S가 T에 자원 또는 자원 관련 보고를 제공한다. | T가 S로부터 자원 또는 자원 사용 보고를 받는가? | L10, L30, L31 |

## 4. 연결 31개 — 인용과 연구자 의견

### L01 · REQ 요구사항관리 → BIA BIA·중요도 분석

- 영역: ① 요구·분석 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리가 식별한 법규·규제·계약 요구사항이 BIA·중요도 분석 프로세스에 "정보를 제공(inform)"한다.
- ▶ 연구자 의견(해석·보완·가정): "inform"을 "S의 산출물이 T의 입력·기준이 된다(informs)"로 해석. A11은 4개 프로세스를 한 문장으로 열거하므로 L01·L02·L04·L05는 이 문장에서 연구자가 분리한 연결.
- ▶ 연구자 의견(측정 지표화): 반영=BIA의 우선순위·복구목표 설정에 요구사항이 사용된 증거 / 확인=BIA 결과의 요구사항 누락 점검 / 갱신=요구사항 변경 시 BIA 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가(요구사항이 BIA에 실제로 입력되는가)

  - L01-R (반영): 요구사항관리에서 정리한 법규·규제·계약상 요구사항이 BIA의 우선순위와 복구목표 설정에 실제로 사용된다.
  - L01-V (확인): BIA 결과가 요구사항을 빠짐없이 반영했는지 검토 또는 점검 기록으로 확인한다.
  - L01-U (갱신): 요구사항이 바뀌면 BIA 결과를 다시 검토하고 필요하면 고친다.

### L02 · REQ 요구사항관리 → RA 리스크평가

- 영역: ① 요구·분석 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 리스크평가 프로세스에 정보를 제공한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일.
- ▶ 연구자 의견(측정 지표화): 반영=리스크평가의 범위·기준에 요구사항 사용 / 확인=요구사항 고려 여부 점검 / 갱신=요구사항 변경 시 리스크평가 기준·결과 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L02-R (반영): 요구사항이 리스크평가의 범위와 평가 기준에 실제로 사용된다.
  - L02-V (확인): 리스크평가가 관련 요구사항을 고려했는지 확인하는 절차가 있다.
  - L02-U (갱신): 요구사항이 바뀌면 리스크평가 기준이나 결과를 다시 검토하고 고친다.

### L03 · BIA BIA·중요도 분석 → RA 리스크평가

- 영역: ① 요구·분석 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A12] (Arias p.15, §4.3): "The risk assessment process, which focuses on identifying potential disruptions, relies on the outcomes of the business impact assessment and criticality analysis as its foundation."
  - 번역: 잠재적 중단을 식별하는 데 초점을 둔 리스크평가 프로세스는 BIA·중요도 분석의 결과를 기반으로 한다.
- ▷ 보조 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
  - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
- 인용이 확립하는 사실: 리스크평가는 BIA·중요도 분석의 결과를 기반(foundation)으로 삼는다. BIA의 최종 결과는 근거가 첨부된 문서화된 진술(업무연속성 요구사항)이다.
- ▶ 연구자 의견(해석·보완·가정): "relies on ... as its foundation"을 informs(입력·기준)로 해석.
- ▶ 연구자 의견(측정 지표화): 반영=리스크평가가 BIA의 핵심 활동 우선순위에서 출발 / 확인=평가 대상과 BIA 결과의 대조 / 갱신=BIA 결과 변경 시 리스크 목록 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L03-R (반영): 리스크평가는 BIA에서 정한 핵심 제품·서비스·활동의 우선순위를 출발점으로 한다.
  - L03-V (확인): 리스크평가 대상이 BIA 결과와 일치하는지 대조하여 확인한다.
  - L03-U (갱신): BIA 결과가 바뀌면 리스크평가 결과(리스크 목록)를 다시 검토하고 고친다.

### L04 · REQ 요구사항관리 → AUD 내부감사

- 영역: ① 요구·분석 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 내부감사 프로세스에 정보를 제공한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일. 내부감사 기준에 요구사항이 포함된다는 구체적 형태는 연구자의 지표화.
- ▶ 연구자 의견(측정 지표화): 반영=감사 기준·점검표에 요구사항 포함 / 확인=항목별 충족 확인 기록 / 갱신=요구사항 변경 시 감사 기준 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L04-R (반영): 내부감사의 점검 기준에 BC 관련 요구사항이 포함된다.
  - L04-V (확인): 감사에서 요구사항 충족 여부를 항목별로 확인하고 기록한다.
  - L04-U (갱신): 요구사항이 바뀌면 감사 기준과 점검표를 다시 검토하고 고친다.

### L05 · REQ 요구사항관리 → SUP 공급망관리

- 영역: ① 요구·분석 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- ▷ 보조 인용 [A39] (Arias p.16, §4.3): "outsourced services must be assessed, analyzed, and controlled regarding business continuity considerations"
  - 번역: 외주 서비스는 업무연속성 관점에서 평가·분석·통제되어야 한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 공급망관리 프로세스에 정보를 제공한다. 외주 서비스는 업무연속성 관점에서 평가·분석·통제되어야 한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일. "공급업체 선정·계약 조건에 BC 요구사항 포함"은 A39(외주 서비스 통제)를 바탕으로 한 연구자의 지표화.
- ▶ 연구자 의견(측정 지표화): 반영=공급업체 선정·계약 조건에 BC 요구사항 포함 / 확인=공급업체의 요구사항 충족 평가 / 갱신=요구사항 변경 시 요건·평가 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L05-R (반영): 외주·공급업체의 선정과 계약 조건에 우리 조직의 BC 요구사항이 포함된다.
  - L05-V (확인): 공급업체가 BC 요구사항을 충족하는지 평가나 점검으로 확인한다.
  - L05-U (갱신): 요구사항이 바뀌면 공급업체 요건과 평가 결과를 다시 검토하고 고친다.

### L06 · BIA BIA·중요도 분석 → STR BC 전략·솔루션 결정·선정

- 영역: ② 전략·계획·이행 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A14] (Arias p.15, §4.3): "After the completion of the business impact assessment and criticality analysis process, the approved business continuity requirements guide the determination and selection of suitable BC strategies and solutions"
  - 번역: BIA·중요도 분석 프로세스가 완료된 후, 승인된 업무연속성 요구사항이 적절한 BC 전략·솔루션의 결정과 선정을 안내한다.
- ▷ 보조 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
  - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
- ▷ 보조 인용 [A37] (Arias p.15, §4.3): "This procedure involves systematic prioritization of products, services, processes, and activities, followed by comprehensive analysis, consolidation, and securing of executive approval of the BIA findings."
  - 번역: 이 절차는 제품·서비스·프로세스·활동의 체계적 우선순위화, 이어지는 종합 분석·통합, 그리고 BIA 결과에 대한 경영진 승인 확보를 포함한다.
- 인용이 확립하는 사실: BIA·중요도 분석이 완료된 후, 승인된 업무연속성 요구사항이 BC 전략·솔루션의 결정·선정을 안내(guide)한다. BIA 결과는 경영진 승인을 거친다.
- ▶ 연구자 의견(해석·보완·가정): "guide"를 informs(입력·기준)로 해석.
- ▶ 연구자 의견(측정 지표화): 반영=전략·솔루션 선정 근거로 BIA 결과 사용 / 확인=선택안이 복구목표를 충족하는지 검증 / 갱신=BIA 결과 변경 시 전략·솔루션 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L06-R (반영): BC 전략·솔루션은 승인된 BIA 결과(복구 우선순위·목표)를 근거로 정한다.
  - L06-V (확인): 선택한 전략·솔루션이 BIA의 복구목표를 충족하는지 검증한다.
  - L06-U (갱신): BIA 결과가 바뀌면 전략·솔루션 선택을 다시 검토하고 필요하면 고친다.

### L07 · STR BC 전략·솔루션 결정·선정 → IMP 솔루션 이행관리

- 영역: ② 전략·계획·이행 · 관계유형: `elaboratedInto` · **증거유형 E1**
- ▶ 인용 [A15] (Arias p.15, §4.3): "This process ensures that the BC strategies, solutions, and necessary changes are executed as planned."
  - 번역: 이 프로세스는 BC 전략, 솔루션 및 필요한 변경이 계획대로 실행되도록 보장한다.
- ▷ 보조 인용 [A36] (Arias p.15, §4.3): "The solution implementation management process involves initiating and verifying BC strategies, solutions, and changes that may result thereof."
  - 번역: 솔루션 이행관리 프로세스는 BC 전략·솔루션 및 그로부터 발생할 수 있는 변경을 개시하고 검증하는 것을 포함한다.
- 인용이 확립하는 사실: 솔루션 이행관리 프로세스는 BC 전략·솔루션과 필요한 변경이 계획대로 실행되도록 보장하며, 이를 개시하고 검증한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문의 주어는 이행관리이고 대상은 전략·솔루션이므로 "STR이 IMP에서 구체화·실행된다"(STR→IMP)로 방향을 해석. A36의 "verifying"은 확인(V) 상태를 고안할 때 참고했으나 V의 정의는 연구자 정의.
- ▶ 연구자 의견(측정 지표화): 반영=전략·솔루션이 담당·일정·예산이 있는 이행 활동으로 구체화 / 확인=구현 점검 / 갱신=전략·솔루션 수정 시 이행 계획 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L07-R (반영): 선정된 전략·솔루션이 담당자·일정·예산이 있는 이행 활동으로 구체화되어 실행된다.
  - L07-V (확인): 솔루션이 계획대로 구현되었는지 점검한다.
  - L07-U (갱신): 전략·솔루션이 수정되면 이행 계획과 구현 상태를 다시 검토하고 고친다.

### L08 · STR BC 전략·솔루션 결정·선정 → PLAN BC 계획·절차 개발

- 영역: ② 전략·계획·이행 · 관계유형: `elaboratedInto` · **증거유형 E1**
- ▶ 인용 [A16] (Arias p.15, §4.3): "Corresponding BC plans and procedures, derived from the identified BC strategies and solutions, are developed within the process of developing BC plans and procedures."
  - 번역: 식별된 BC 전략·솔루션에서 도출된 해당 BC 계획·절차는 BC 계획·절차 개발 프로세스 안에서 개발된다.
- 인용이 확립하는 사실: BC 계획·절차는 식별된 BC 전략·솔루션에서 도출(derived)되어 개발된다.
- ▶ 연구자 의견(해석·보완·가정): "derived from"을 elaboratedInto(S의 내용이 T로 구체화됨)로 해석.
- ▶ 연구자 의견(측정 지표화): 반영=계획·절차에 전략·솔루션의 가동 방법 포함 / 확인=승인 전 일치성 검토 / 갱신=전략·솔루션 변경 시 계획·절차 개정
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L08-R (반영): BC 계획·절차에 선정된 전략·솔루션을 가동하는 방법이 포함된다.
  - L08-V (확인): 계획·절차가 전략·솔루션과 일치하는지 승인 전에 검토한다.
  - L08-U (갱신): 전략·솔루션이 바뀌면 BC 계획·절차를 함께 개정한다.

### L09 · RA 리스크평가 → PLAN BC 계획·절차 개발

- 영역: ② 전략·계획·이행 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A17] (Arias p.15, §4.3): "Furthermore, it includes risks associated with proposed changes, providing essential input for both communication activities and the development of business continuity plans and procedures."
  - 번역: 또한 (리스크평가는) 제안된 변경과 관련된 리스크를 포함하며, 커뮤니케이션 활동과 업무연속성 계획·절차 개발 모두에 필수적인 입력을 제공한다.
- 인용이 확립하는 사실: 리스크평가는 업무연속성 계획·절차 개발에 필수적인 입력(essential input)을 제공한다.
- ▶ 연구자 의견(해석·보완·가정): A17의 주어 "it"이 리스크평가 프로세스임은 앞 문장의 주어에서 연구자가 확인한 지시 관계.
- ▶ 연구자 의견(측정 지표화): 반영=계획·절차에 식별된 위협 시나리오 반영 / 확인=리스크 목록과 대조 / 갱신=리스크 변경 시 계획·절차 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L09-R (반영): BC 계획·절차에 리스크평가에서 식별된 주요 위협 시나리오가 반영된다.
  - L09-V (확인): 계획·절차가 주요 리스크를 다루는지 리스크 목록과 대조하여 확인한다.
  - L09-U (갱신): 새 리스크가 식별되거나 리스크 수준이 바뀌면 BC 계획·절차를 다시 검토하고 고친다.

### L10 · RES 자원관리 → IMP 솔루션 이행관리

- 영역: ② 전략·계획·이행 · 관계유형: `supplies` · **증거유형 E2**
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- ▷ 보조 인용 [B16] (Białas p.4, §2.8 (Fig.1 설명)): "supportedByResource slot contains three individuals of resources used to manage and maintain BCMS within this organization"
  - 번역: supportedByResource slot은 이 조직 안에서 BCMS를 관리·유지하는 데 쓰이는 세 개의 자원 개체를 담는다.
- 인용이 확립하는 사실: 자원관리의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원이 포함된다. 전략 실행에 필요한 자원은 자원관리에서 식별·배정·모니터링된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 보완] 인용문은 "selected strategies의 implementing and running"을 위한 자원이라고만 쓰며 도착 프로세스를 특정하지 않는다. 이를 솔루션 이행관리(IMP)로 특정한 것은 연구자 해석(운영(running)은 IMP 외 프로세스일 수도 있음).
- ▶ 연구자 의견(측정 지표화): 반영=솔루션 구현·운영에 필요한 자원이 문서로 확보·배정 / 확인=자원 충분성 확인 / 갱신=솔루션 변경 시 자원 배정 재검토
- Białas 대응: Białas는 supportedByResource slot으로 BCMS를 지원하는 자원 개체를 둔다(B16). 프로세스 간 연결은 아님.
- 검증 필요: 전문가 패널에서 도착 프로세스(IMP)가 적절한지 평가. 부적절하면 도착을 "핵심 프로세스 전반"으로 변경

  - L10-R (반영): 솔루션을 구현하고 운영하는 데 필요한 자원(인력·설비·정보 등)이 자원관리를 통해 문서로 확보·배정된다.
  - L10-V (확인): 확보된 자원이 솔루션 구현·운영에 충분한지 확인한다.
  - L10-U (갱신): 솔루션이 바뀌면 자원 배정을 다시 검토하고 고친다.

### L11 · BIA BIA·중요도 분석 → RES 자원관리

- 영역: ③ 대응·복구·훈련 · 관계유형: `informs` · **증거유형 E3**
- ▶ 인용: 원문에 S→T 연결 서술 없음
- ▷ 보조 인용 [B10] (Białas p.6, §2.8 (Fig.4 설명)): "resources required for these services resumption"
  - 번역: 이들 서비스 재개에 필요한 자원
- ▷ 보조 인용 [B11] (Białas p.6, §2.8 (Fig.4 설명)): "looks for business impact analysis (BIA) reports related to the two following issues"
  - 번역: (업무연속성 관리자가) 다음 두 가지 사안과 관련된 BIA 보고서를 찾는다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- 인용이 확립하는 사실: Białas는 BIA 보고서를 "서비스 재개에 필요한 자원"으로 질의하는 예를 보여 준다. Arias는 자원관리가 전략·BCMS 프로세스 실행에 필요한 자원을 식별한다고만 서술한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 가정] BIA가 파악한 복구 필요 자원이 자원관리 계획에 투입된다는 연결은 Arias에 서술이 없다. Białas의 예는 프로세스 간 연결이 아니라 BIA 보고서 내부 속성(자원 항목)을 질의하는 수준이므로 유추 근거에 그친다.
- ▶ 연구자 의견(측정 지표화): 반영=BIA의 복구 필요 자원이 자원 계획에 포함 / 확인=자원이 복구목표 달성에 충분한지 확인 / 갱신=BIA·복구목표 변경 시 자원 배정 재검토
- Białas 대응: Białas §2.8 Fig.4 설명(B10, B11): BIAreport의 resour4Resumption 속성
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제(Arias A44 판정 틀 준용)

  - L11-R (반영): BIA에서 파악한 복구 필요 자원이 자원관리 계획에 포함된다.
  - L11-V (확인): 확보된 자원이 BIA의 복구목표를 달성하기에 충분한지 확인한다.
  - L11-U (갱신): BIA나 복구목표가 바뀌면 자원 배정을 다시 검토하고 고친다.

### L12 · PLAN BC 계획·절차 개발 → INC 사고·비상 대응

- 영역: ③ 대응·복구·훈련 · 관계유형: `elaboratedInto` · **증거유형 E2**
- ▶ 인용 [A19] (Arias p.15, §4.3): "The activation of certain BC strategies and solutions is triggered when required, typically in response to a disruptive event, through the execution of BC plans and procedures."
  - 번역: 특정 BC 전략·솔루션의 가동은 필요 시, 통상 중단 사건에 대응하여, BC 계획·절차의 실행을 통해 개시된다.
- ▷ 보조 인용 [A20] (Arias p.15, §4.3): "facilitating appropriate alerting of potentially affected parties and coordinating responses within the organization's BC plans and procedures"
  - 번역: (경보·커뮤니케이션은) 영향을 받을 수 있는 당사자에 대한 적절한 경보를 촉진하고 조직의 BC 계획·절차 안에서 대응을 조정한다.
- 인용이 확립하는 사실: BC 전략·솔루션의 가동은 중단 사건에 대응하여 BC 계획·절차의 실행을 통해 개시된다. 경보·커뮤니케이션은 조직의 BC 계획·절차 안에서 대응을 조정한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 보완] 인용문은 "BC 계획·절차가 중단 사건 대응 시 실행된다"고 쓰지만 도착 프로세스를 "사고·비상 대응"으로 명시하지 않는다. 사고·비상 대응이 "중단 사건 관리의 포괄적 접근"을 정의한다는 같은 쪽 서술과 결합해 PLAN→INC로 해석.
- ▶ 연구자 의견(측정 지표화): 반영=사고 대응 체계(역할·가동 기준)가 계획에 따라 정해짐 / 확인=실제·모의 사고에서 계획대로 대응했는지 확인 / 갱신=계획 변경 시 사고대응 체계 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L12-R (반영): 사고·비상이 발생하면 BC 계획·절차에 따라 대응하도록 역할과 가동 기준이 정해져 있다.
  - L12-V (확인): 실제 사고나 모의 상황에서 계획대로 대응했는지 확인하고 기록한다.
  - L12-U (갱신): BC 계획·절차가 바뀌면 사고 대응 체계(역할·가동 기준)를 다시 검토하고 고친다.

### L13 · INC 사고·비상 대응 → WARN 경보·커뮤니케이션

- 영역: ③ 대응·복구·훈련 · 관계유형: `contains` · **증거유형 E1**
- ▶ 인용 [A21] (Arias p.15, §4.3): "It includes two primary subprocesses: the warning and communication process and the recovery process."
  - 번역: (사고·비상 대응 프로세스는) 경보·커뮤니케이션 프로세스와 복구 프로세스라는 두 가지 주요 하위 프로세스를 포함한다.
- ▷ 보조 인용 [A20] (Arias p.15, §4.3): "facilitating appropriate alerting of potentially affected parties and coordinating responses within the organization's BC plans and procedures"
  - 번역: (경보·커뮤니케이션은) 영향을 받을 수 있는 당사자에 대한 적절한 경보를 촉진하고 조직의 BC 계획·절차 안에서 대응을 조정한다.
- 인용이 확립하는 사실: 사고·비상 대응 프로세스는 두 개의 주요 하위 프로세스(경보·커뮤니케이션, 복구)를 포함한다. 경보·커뮤니케이션은 BC 계획·절차 안에서 대응을 조정한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] "subprocess"는 정보 흐름이 아니라 포함 관계(contains)이다. 연계성 측정에서는 "하위 프로세스가 상위 대응 절차 안에 통합되어 실제 운영되는가"를 지표화했다. Arias는 Table 5에서 경보·커뮤니케이션을 별도 프로세스로도 목록화(p.14)하므로 포함 관계를 연결로 측정할지는 연구자 결정 사항.
- ▶ 연구자 의견(측정 지표화): 반영=사고 대응 절차에 경보·전파 포함 / 확인=경보 적시 도달 확인 / 갱신=대응 체계 변경 시 연락망·경보 절차 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 "포함 관계를 연계성으로 볼 것인가" 별도 평가

  - L13-R (반영): 사고 대응 절차 안에 내·외부 경보와 상황 전파(누구에게·언제·어떻게)가 포함되어 실행된다.
  - L13-V (확인): 경보가 대상자에게 적시에 도달했는지 확인한다.
  - L13-U (갱신): 대응 체계나 담당자가 바뀌면 경보·연락 절차(연락망)를 다시 검토하고 고친다.

### L14 · INC 사고·비상 대응 → REC 복구

- 영역: ③ 대응·복구·훈련 · 관계유형: `contains` · **증거유형 E1**
- ▶ 인용 [A21] (Arias p.15, §4.3): "It includes two primary subprocesses: the warning and communication process and the recovery process."
  - 번역: (사고·비상 대응 프로세스는) 경보·커뮤니케이션 프로세스와 복구 프로세스라는 두 가지 주요 하위 프로세스를 포함한다.
- ▷ 보조 인용 [A22] (Arias p.15, §4.3): "The recovery process, on the other hand, involves restoring and resuming regular business activities from the state of temporary measures that have been adopted to support normal operations during and after a disruption."
  - 번역: 복구 프로세스는 중단 중·후 정상 운영을 지원하기 위해 채택한 임시 조치 상태에서 일상 업무 활동을 회복·재개하는 것을 포함한다.
- 인용이 확립하는 사실: 사고·비상 대응 프로세스는 복구 프로세스를 하위 프로세스로 포함한다. 복구는 임시 조치 상태에서 일상 업무를 회복·재개하는 것이다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] L13과 같은 이유로 포함 관계를 지표화. "대응 결과가 복구로 끊김 없이 이어진다"는 R 문항의 표현은 연구자의 지표화이며 인용문이 직접 말하는 내용이 아니다.
- ▶ 연구자 의견(측정 지표화): 반영=대응 상황 판단·결과가 복구 활동으로 이어짐 / 확인=복구 완료를 복구목표(RTO 등)로 확인 / 갱신=대응 절차 변경 시 복구 절차 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 포함 관계 지표화 적절성 평가

  - L14-R (반영): 사고 대응의 상황 판단과 결과가 복구 활동으로 끊김 없이 이어진다.
  - L14-V (확인): 복구가 끝났는지를 복구목표(예: RTO) 기준으로 확인한다.
  - L14-U (갱신): 사고 대응 절차가 바뀌면 복구 절차를 다시 검토하고 고친다.

### L15 · PLAN BC 계획·절차 개발 → EXE BC 계획·절차 훈련·연습

- 영역: ③ 대응·복구·훈련 · 관계유형: `testedBy` · **증거유형 E1**
- ▶ 인용 [A23] (Arias p.15, §4.3): "The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."
  - 번역: BC 계획·절차 훈련·연습 프로세스는 BC 전략·솔루션과 이에 대응하는 BC 계획·절차(경보·커뮤니케이션 절차 포함)가 정기적으로 시험되어 그 유효성을 검증하고 필요한 조정·개선을 촉구하도록 보장한다.
- 인용이 확립하는 사실: BC 전략·솔루션과 BC 계획·절차(경보·커뮤니케이션 절차 포함)는 정기적으로 시험되어 유효성이 검증된다.
- ▶ 연구자 의견(해석·보완·가정): "tested regularly to validate their effectiveness"를 testedBy(S가 T에 의해 시험됨)로 해석. 훈련·연습 시나리오 설계 방식은 연구자의 지표화.
- ▶ 연구자 의견(측정 지표화): 반영=연습 시나리오가 계획·절차를 실제 적용하도록 설계 / 확인=연습 결과를 유효성 기준으로 평가·기록 / 갱신=계획 변경 시 시나리오 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L15-R (반영): 훈련·연습 시나리오가 BC 계획·절차를 실제로 적용해 보도록 설계된다.
  - L15-V (확인): 연습 결과를 계획·절차가 유효했는지 판단하는 기준에 비추어 평가하고 기록한다.
  - L15-U (갱신): 계획·절차가 바뀌면 연습 시나리오를 다시 검토하고 고친다.

### L16 · EXE BC 계획·절차 훈련·연습 → PLAN BC 계획·절차 개발

- 영역: ④ 평가·개선·변경 · 관계유형: `updates` · **증거유형 E1**
- ▶ 인용 [A23] (Arias p.15, §4.3): "The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."
  - 번역: BC 계획·절차 훈련·연습 프로세스는 BC 전략·솔루션과 이에 대응하는 BC 계획·절차(경보·커뮤니케이션 절차 포함)가 정기적으로 시험되어 그 유효성을 검증하고 필요한 조정·개선을 촉구하도록 보장한다.
- 인용이 확립하는 사실: 연습은 필요한 조정·개선(adjustments or enhancements)을 촉구(prompt)한다.
- ▶ 연구자 의견(해석·보완·가정): 조정 대상은 인용문상 "전략·솔루션·계획·절차" 모두이나 본 연결은 BC 계획·절차로 한정(연구자 한정). 방향 해석(EXE의 결과가 PLAN을 개정)은 연구자 해석.
- ▶ 연구자 의견(측정 지표화): 반영=연습의 문제점·개선사항이 계획 수정에 반영 / 확인=요청한 수정의 반영 확인 / 갱신=연습 결과가 새로 나올 때마다 계획 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L16-R (반영): 연습에서 나온 문제점과 개선 사항이 BC 계획·절차 수정에 반영된다.
  - L16-V (확인): 연습 결과로 요청한 수정이 계획·절차에 반영되었는지 확인한다.
  - L16-U (갱신): 연습 결과가 새로 나올 때마다 BC 계획·절차를 다시 검토하고 필요하면 고친다.

### L17 · PLAN BC 계획·절차 개발 → AWR 인식·역량·교육

- 영역: ④ 평가·개선·변경 · 관계유형: `informs` · **증거유형 E3**
- ▶ 인용: 원문에 S→T 연결 서술 없음
- ▷ 보조 인용 [A24] (Arias p.15, §4.3): "a business continuity awareness, training, and education program is developed and implemented to foster necessary awareness and competence among personnel"
  - 번역: 업무연속성 인식·훈련·교육 프로그램이 개발·이행되어 인력의 필요한 인식과 역량을 키운다.
- ▷ 보조 인용 [B12] (Białas p.5, §2.8 (Fig.3 설명)): "Please note the person responsible for trainings, expressed by a certain role, engaged resources for trainings, needs, programs, detailed activities, results and records"
  - 번역: 훈련 책임자(역할로 표현), 훈련에 투입된 자원, 필요, 프로그램, 세부 활동, 결과, 기록에 유의하라.
- 인용이 확립하는 사실: Arias는 인식·훈련·교육 프로그램이 인력의 인식과 역량을 키운다고만 서술하며 계획·절차와의 연결은 서술하지 않는다. Białas는 훈련 활동에 "필요(needs)"를 별도 항목으로 둔다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 가정] 교육 내용이 BC 계획·절차(역할 포함)에서 도출·반영된다는 연결은 두 논문에 직접 근거가 없다. 인력이 계획과 자기 역할을 알아야 계획이 실행된다는 연구자 판단에 기초한다.
- ▶ 연구자 의견(측정 지표화): 반영=교육 내용에 계획·절차와 역할 포함 / 확인=구성원의 이해 확인 / 갱신=계획 변경 시 교육 내용·대상 재검토
- Białas 대응: Białas §2.8 Fig.3 설명(B12): 훈련의 needs, programs, results, records
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제

  - L17-R (반영): 인식·교육 프로그램의 내용에 BC 계획·절차와 각자의 역할이 포함된다.
  - L17-V (확인): 교육 후 구성원이 계획과 자기 역할을 이해했는지 확인한다.
  - L17-U (갱신): 계획·절차가 바뀌면 교육 내용과 대상자를 다시 검토하고 고친다.

### L18 · PERF 성과평가 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 성과평가의 결과는 BCMS 및 전략·솔루션·계획·절차의 효과성·효율성·적합성·충분성을 개선하는 데 사용되며, 이는 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): A25는 3개 출처를 한 문장에 열거하므로 L18·L19·L20은 연구자가 분리한 연결.
- ▶ 연구자 의견(측정 지표화): 반영=성과평가 결과가 개선 과제로 연결 / 확인=조치 완료·효과 확인 / 갱신=새 평가 결과마다 개선 과제 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L18-R (반영): 성과평가 결과가 구체적인 개선 과제(조치 계획)로 이어진다.
  - L18-V (확인): 개선 조치가 완료되었는지와 효과가 있었는지 확인한다.
  - L18-U (갱신): 성과평가 결과가 새로 나올 때마다 개선 과제 목록을 다시 검토하고 고친다.

### L19 · AUD 내부감사 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 내부감사의 결과는 BCMS 개선에 사용되며, 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L18과 동일.
- ▶ 연구자 의견(측정 지표화): 반영=감사 지적사항이 개선 조치 계획에 포함 / 확인=조치 후속 확인 / 갱신=새 감사 결과마다 개선 과제 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L19-R (반영): 내부감사 지적사항이 개선 조치 계획에 포함된다.
  - L19-V (확인): 지적사항에 대한 조치가 끝났는지 후속 확인을 한다.
  - L19-U (갱신): 새 감사 결과가 나올 때마다 개선 과제 목록을 다시 검토하고 고친다.

### L20 · SUP 공급망관리 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 공급망관리의 결과는 BCMS 개선에 사용되며, 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L18과 동일.
- ▶ 연구자 의견(측정 지표화): 반영=공급업체 평가 결과가 개선 과제에 포함 / 확인=조치 이행 확인 / 갱신=새 평가 결과마다 개선 과제 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L20-R (반영): 공급업체 평가 결과가 BCMS 개선 과제에 포함된다.
  - L20-V (확인): 공급업체 관련 개선 조치가 이행되었는지 확인한다.
  - L20-U (갱신): 새 공급업체 평가 결과가 나올 때마다 개선 과제 목록을 다시 검토하고 고친다.

### L21 · CHG BC 변경관리 → RA 리스크평가

- 영역: ④ 평가·개선·변경 · 관계유형: `triggers` · **증거유형 E1**
- ▶ 인용 [A27] (Arias p.16, §4.3 (변경관리 산출물 3번째)): "Initiation of risk assessment in response to significant proposed or occurring changes; and"
  - 번역: 중대한 제안·발생 변경에 대응한 리스크평가의 개시.
- ▷ 보조 인용 [A26] (Arias p.16, §4.3 (변경관리 산출물 2번째)): "Proposed and necessary changes, as well as results of changes (for and from the risk assessment process);"
  - 번역: 제안된 변경과 필요한 변경, 그리고 변경의 결과(리스크평가 프로세스로 가는 것과 그로부터 오는 것).
- 인용이 확립하는 사실: BC 변경관리의 산출물에는 중대한 제안·발생 변경에 대응한 리스크평가의 개시, 그리고 리스크평가와 오가는 제안·필요 변경 및 변경 결과가 포함된다.
- ▶ 연구자 의견(해석·보완·가정): A26의 "for and from"은 양방향 흐름을 시사하나 본 연결은 CHG→RA 방향만 채택하고 반대 방향은 보류연결 H02에 기록(연구자 판단).
- ▶ 연구자 의견(측정 지표화): 반영=BCMS에 영향 주는 변경이 리스크평가 대상에 포함 / 확인=변경 승인 전 리스크평가 거침 확인 / 갱신=중대한 변경 시 리스크평가 재수행
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L21-R (반영): BCMS에 영향을 주는 변경(제안)이 리스크평가 대상에 포함된다.
  - L21-V (확인): 변경을 승인하기 전에 해당 변경이 리스크평가를 거쳤는지 확인한다.
  - L21-U (갱신): 중대한 변경이 발생하면 리스크평가를 다시 수행한다.

### L22 · CHG BC 변경관리 → DOC 문서화된 정보 통제

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `updates` · **증거유형 E1**
- ▶ 인용 [A28] (Arias p.16, §4.3 (변경관리 산출물 1번째)): "Necessary changes (for the process of controlling documented information);"
  - 번역: 필요한 변경(문서화된 정보 통제 프로세스를 위한 것).
- ▷ 보조 인용 [A41] (Arias p.16, §4.3): "The process of controlling documented information involves identifying, creating, updating, and controlling information essential for the effectiveness of the BCMS."
  - 번역: 문서화된 정보 통제 프로세스는 BCMS의 효과성에 필수적인 정보를 식별·작성·갱신·통제하는 것을 포함한다.
- 인용이 확립하는 사실: BC 변경관리의 산출물에는 문서화된 정보 통제 프로세스를 위한 필요한 변경이 포함된다. 문서화된 정보 통제는 정보의 식별·작성·갱신·통제를 포함한다.
- ▶ 연구자 의견(해석·보완·가정): "갱신" 상태의 정의를 고안할 때 A41의 "updating"을 참고. 갱신의 정의 자체는 연구자 정의.
- ▶ 연구자 의견(측정 지표화): 반영=승인된 변경이 관련 문서에 반영 / 확인=버전·승인 기록으로 최신 반영 확인 / 갱신=변경마다 문서·배포 대상 갱신
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L22-R (반영): 승인된 변경 내용이 관련 문서(계획·절차·연락망 등)에 반영된다.
  - L22-V (확인): 문서가 최신 변경을 반영하고 있는지 버전이나 승인 기록으로 확인한다.
  - L22-U (갱신): 변경이 있을 때마다 관련 문서와 그 배포 대상을 함께 갱신한다.

### L23 · INC 사고·비상 대응 → CHG BC 변경관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `triggers` · **증거유형 E1**
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 사고·비상 대응이 개시한 변경의 결과가 변경관리의 산출물에 포함된다("as those processes initiated them").
- ▶ 연구자 의견(해석·보완·가정): "initiated"를 triggers(S의 사건·결과가 T의 수행을 개시)로 해석. A29는 INC·EXE와 변경 결과 방향을 한 문장에 담으므로 L23~L26은 연구자가 분리한 4개 연결.
- ▶ 연구자 의견(측정 지표화): 반영=사고 대응에서 나온 변경 필요사항이 변경관리로 접수 / 확인=처리 결과 확인 / 갱신=새 대응 결과마다 변경 필요 여부 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L23-R (반영): 사고 대응에서 나온 변경 필요사항이 변경관리 절차로 접수된다.
  - L23-V (확인): 접수된 변경 요청의 처리 결과를 확인한다.
  - L23-U (갱신): 새 사고 대응 결과가 나올 때마다 변경이 필요한지 다시 검토한다.

### L24 · EXE BC 계획·절차 훈련·연습 → CHG BC 변경관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `triggers` · **증거유형 E1**
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 훈련·연습이 개시한 변경의 결과가 변경관리의 산출물에 포함된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일.
- ▶ 연구자 의견(측정 지표화): 반영=연습에서 나온 변경 필요사항이 변경관리로 접수 / 확인=처리 결과 확인 / 갱신=새 연습 결과마다 변경 필요 여부 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L24-R (반영): 연습에서 나온 변경 필요사항이 변경관리 절차로 접수된다.
  - L24-V (확인): 접수된 변경 요청의 처리 결과를 확인한다.
  - L24-U (갱신): 새 연습 결과가 나올 때마다 변경이 필요한지 다시 검토한다.

### L25 · CHG BC 변경관리 → INC 사고·비상 대응

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `updates` · **증거유형 E1**
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 변경의 결과가 사고·비상 대응 프로세스로 돌아간다("The results of changes to the incident and emergency handling process").
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일. "results of changes to"를 updates(변경이 T의 내용을 개정)로 해석.
- ▶ 연구자 의견(측정 지표화): 반영=승인된 변경이 사고 대응 절차에 반영 / 확인=반영 확인 / 갱신=변경 승인마다 사고 대응 절차 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L25-R (반영): 승인된 변경이 사고 대응 절차에 반영된다.
  - L25-V (확인): 변경이 사고 대응 절차에 반영되었는지 확인한다.
  - L25-U (갱신): 변경이 승인될 때마다 사고 대응 절차를 다시 검토하고 필요하면 고친다.

### L26 · CHG BC 변경관리 → EXE BC 계획·절차 훈련·연습

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `updates` · **증거유형 E1**
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 변경의 결과가 BC 계획·절차 훈련·연습 프로세스로 돌아간다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일.
- ▶ 연구자 의견(측정 지표화): 반영=승인된 변경이 연습 절차·시나리오에 반영 / 확인=반영 확인 / 갱신=변경 승인마다 연습 절차 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L26-R (반영): 승인된 변경이 훈련·연습 절차와 시나리오에 반영된다.
  - L26-V (확인): 변경이 훈련·연습 절차와 시나리오에 반영되었는지 확인한다.
  - L26-U (갱신): 변경이 승인될 때마다 훈련·연습 절차를 다시 검토하고 필요하면 고친다.

### L27 · 핵심 BCMS 프로세스 전반(집단) → COM 협의·커뮤니케이션

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `informs` · **증거유형 E1** · 집단 노드 포함
- ▶ 인용 [A30] (Arias p.16, §4.3): "The outcomes of nearly all BCMS processes are communicated centrally to stakeholders external to the BCMS as part of the consultation and communication process."
  - 번역: 거의 모든 BCMS 프로세스의 결과는 협의·커뮤니케이션 프로세스의 일부로서 BCMS 외부의 이해관계자에게 중앙에서 전달된다.
- ▷ 보조 인용 [A40] (Arias p.16, §4.3): "the consultation and communication process represents the general mode of communication even in the absence of such an event"
  - 번역: 협의·커뮤니케이션 프로세스는 그러한 사건이 없을 때에도 일반적인 커뮤니케이션 방식을 나타낸다.
- 인용이 확립하는 사실: 거의 모든 BCMS 프로세스의 결과가 협의·커뮤니케이션 프로세스를 통해 BCMS 외부 이해관계자에게 중앙에서 전달된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] "nearly all BCMS processes"는 프로세스를 열거하지 않으므로 출발점을 집단 노드 CORE("핵심 BCMS 프로세스 전반")로 처리했다. CORE는 Arias의 객체가 아니라 연구자가 만든 가상 노드이다.
- ▶ 연구자 의견(측정 지표화): 반영=BCMS 주요 결과가 이해관계자 협의 채널로 전달 / 확인=이해·의견 접수 확인 / 갱신=결과가 크게 바뀌면 전달 내용 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 집단 출발점 처리의 적절성 평가

  - L27-R (반영): BCMS 프로세스의 주요 결과(리스크, 운영 현황 등)가 이해관계자와의 협의·커뮤니케이션 채널로 전달된다.
  - L27-V (확인): 전달한 내용이 이해되었는지, 이해관계자 의견이 접수되었는지 확인한다.
  - L27-U (갱신): BCMS 프로세스의 결과가 크게 바뀌면 이해관계자에게 전달하는 내용을 다시 검토하고 고친다.

### L28 · COM 협의·커뮤니케이션 → GOV BC 거버넌스

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `informs` · **증거유형 E1**
- ▶ 인용 [A31] (Arias p.16, §4.3): "These reports and identified requirements serve as inputs for the BC governance process."
  - 번역: 이 보고와 식별된 요구사항은 BC 거버넌스 프로세스의 입력으로 쓰인다.
- ▷ 보조 인용 [A47] (Arias p.16, §4.3): "It encompasses the communication of risks and reports concerning BC management."
  - 번역: (협의·커뮤니케이션 프로세스는) 리스크와 BC 관리에 관한 보고의 커뮤니케이션을 포함한다.
- 인용이 확립하는 사실: 협의·커뮤니케이션의 보고와 식별된 요구사항은 BC 거버넌스 프로세스의 입력으로 쓰인다.
- ▶ 연구자 의견(해석·보완·가정): "These reports"는 앞 문장(리스크와 BC 관리 보고의 커뮤니케이션)을 가리킨다고 연구자가 확인(A47).
- ▶ 연구자 의견(측정 지표화): 반영=보고·요구사항이 경영진 검토·의사결정의 입력 / 확인=경영진 검토·결정 기록 / 갱신=새 보고·요구사항 접수 시 검토 안건 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L28-R (반영): 커뮤니케이션을 통해 모인 보고와 요구사항이 경영진 검토·의사결정의 입력으로 쓰인다.
  - L28-V (확인): 경영진이 해당 보고를 검토하고 결정 사항을 기록으로 남긴다.
  - L28-U (갱신): 새 보고나 요구사항이 접수되면 경영진 검토 안건을 다시 검토하고 고친다.

### L29 · GOV BC 거버넌스 → POL BC 정책관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `elaboratedInto` · **증거유형 E3**
- ▶ 인용: 원문에 S→T 연결 서술 없음
- ▷ 보조 인용 [A33] (Arias p.14, §4.3): "The business continuity governance process, in particular, ensures that the BCMS matches the goals and requirements of the stakeholders responsible for oversight."
  - 번역: BC 거버넌스 프로세스는 특히 BCMS가 감독 책임이 있는 이해관계자의 목표와 요구사항에 부합하도록 보장한다.
- ▷ 보조 인용 [A34] (Arias p.14, §4.3): "The business continuity policy management process facilitates the systematic development, maintenance, and preservation of business continuity policies"
  - 번역: BC 정책관리 프로세스는 업무연속성 정책의 체계적인 개발·유지·보존을 촉진한다.
- ▷ 보조 인용 [A35] (Arias p.15, §4.3): "This process also ensures that BC policies are accessible to, and clearly understood by, the intended audience."
  - 번역: 이 프로세스는 또한 BC 정책이 대상자에게 접근 가능하고 명확히 이해되도록 보장한다.
- ▷ 보조 인용 [B13] (Białas p.4-5, §2.8 (Fig.2 설명)): "Individuals included in slots represent particular issues from the phase “Plan” specified by standard: general requirements, business continuity scope, objectives, policy and plan, suppliers and outsourced activities, provision of resources, training, awareness, embedding BCM in the organization’s culture, documentation and records."
  - 번역: slot에 포함된 개체는 표준이 규정한 "Plan" 단계의 개별 사안(일반 요구사항, 범위, 목표, 정책과 계획, 공급자·외주, 자원 제공, 교육, 인식, 조직문화 내재화, 문서·기록)을 나타낸다.
- 인용이 확립하는 사실: Arias는 거버넌스(BCMS가 이해관계자의 목표·요구에 부합하도록 보장)와 정책관리(정책의 개발·유지·보존, 접근·이해 보장)를 각각 서술할 뿐 두 프로세스의 관계는 서술하지 않는다. Białas는 목표(objectives)와 정책(policy)을 "Plan" 단계의 병렬 항목으로 나열한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 가정] 정책이 경영진이 정한 BC 목표·방향에서 도출된다는 연결은 두 논문에 근거가 없다(이를 뒷받침하는 인용이 두 논문에 없음). 또한 Białas에서는 정책과 목표가 형제 항목이므로 Białas는 이 연결을 지지하지 않는다.
- ▶ 연구자 의견(측정 지표화): 반영=BC 정책이 경영진의 BC 목표·방향 반영 / 확인=승인 절차로 일치 확인 / 갱신=목표·방향 변경 시 정책 개정·공지
- Białas 대응: Białas §2.8 Fig.2 설명(B13): 목표와 정책이 같은 Plan 단계의 병렬 항목
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제

  - L29-R (반영): BC 정책이 경영진이 정한 BC 목표와 방향을 반영하고 있다.
  - L29-V (확인): BC 정책이 경영진 승인 절차를 통해 목표·방향과 일치하는지 확인한다.
  - L29-U (갱신): 목표나 방향이 바뀌면 BC 정책을 고치고 구성원에게 알린다.

### L30 · RES 자원관리 → 핵심 BCMS 프로세스 전반(집단)

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `supplies` · **증거유형 E1** · 집단 노드 포함
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- 인용이 확립하는 사실: 자원관리의 산출물에는 핵심 BCMS 프로세스 운영을 위한 자원과 BCMS 핵심 프로세스에 대한 자원 사용 보고가 포함된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] 도착이 "핵심 BCMS 프로세스(복수)"이므로 집단 노드 CORE를 사용(L27과 동일 사유).
- ▶ 연구자 의견(측정 지표화): 반영=핵심 프로세스에 자원 제공·사용 보고 / 확인=보고서로 사용 확인 / 갱신=사용 보고 결과에 따라 자원 배분 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 집단 도착점 처리의 적절성 평가

  - L30-R (반영): 자원관리가 핵심 BC 프로세스 운영에 필요한 자원을 제공하고 자원 사용 현황을 보고한다.
  - L30-V (확인): 자원이 계획대로 쓰이고 있는지 보고서로 확인한다.
  - L30-U (갱신): 자원 사용 보고 결과에 따라 자원 배분을 다시 검토하고 고친다.

### L31 · RES 자원관리 → CRM 고객관계관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계유형: `supplies` · **증거유형 E1**
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A32] (Arias p.16, §4.3): "operational management of customer satisfaction levels and continuous demonstration of the added value of investments in business continuity need to be realized"
  - 번역: 고객 만족 수준의 운영적 관리와 업무연속성 투자의 부가가치에 대한 지속적 입증이 실현되어야 한다(고객관계관리 프로세스에서 수행).
- 인용이 확립하는 사실: 자원관리의 산출물에는 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다. 고객관계관리는 고객 만족의 운영적 관리와 BC 투자 가치의 지속적 입증을 수행한다.
- ▶ 연구자 의견(해석·보완·가정): R 문항의 "BC 투자 가치 입증"은 CRM의 기능을 서술한 A32를 문항 문구에 반영한 연구자의 지표화이며, 인용문이 "자원 보고가 가치 입증에 쓰인다"고 직접 말하는 것은 아니다.
- ▶ 연구자 의견(측정 지표화): 반영=자원 사용 보고가 고객관계관리에 제공·활용 / 확인=보고의 충분성 확인 / 갱신=사용 현황 변경 시 보고 재검토
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L31-R (반영): 자원 사용 현황 보고가 고객관계관리(고객 만족 관리, BC 투자 가치 입증)에 제공되어 활용된다.
  - L31-V (확인): 제공된 보고가 고객 만족 관리와 BC 투자 가치 입증에 충분한지 확인한다.
  - L31-U (갱신): 자원 사용 현황이 바뀌면 고객관계관리에 제공하는 보고를 다시 검토하고 고친다.

## 5. 보류·제외한 후보 연결

| ID | 출발→도착 | 후보 | 채택하지 않은 이유 | 권고 |
|---|---|---|---|---|
| H01 | INC→PLAN | 사고 대응 경험을 BC 계획·절차 개정에 반영 | Arias에는 연습(EXE)→계획(L16)만 서술되고 사고 대응→계획 환류는 서술이 없음. 사고 결과는 변경관리(L23)를 거쳐 반영되는 경로만 근거가 있음. | 연구자 결정 필요 |
| H02 | RA→CHG | 리스크평가 결과를 변경 판단에 사용 | A26의 "for and from the risk assessment process"는 양방향을 시사하나 방향이 문장에서 분리되지 않음. 현재는 CHG→RA(L21)만 채택. | 연구자 결정 필요 |
| H03 | EXE→AWR | 연습 결과를 교육 내용에 반영 | 두 논문에 서술 없음. L17(PLAN→AWR)과 중복 가능성. | 제외 권고 |
| H04 | GOV→CRM | 거버넌스와 고객관계관리의 관계 | A32는 두 프로세스를 "In addition to"로 병렬 서술할 뿐 연결을 서술하지 않음. | 제외 권고 |
| H05 | CI→PERF | 개선 결과를 성과평가 지표에 반영 | A25는 성과평가→개선 방향만 서술. 개선 후 지표 갱신은 서술 없음. | 제외 권고 |
| H06 | DOC→전 프로세스 | 문서화된 정보 통제가 모든 프로세스를 지원 | A41은 정보 통제의 내용만 서술하고 프로세스별 연결은 CHG→DOC(L22)만 서술. | 제외 권고 |

## 6. 종합·검증 문항

- G01 (종합): 우리 조직의 BC 프로세스들은 서로의 산출물을 입력으로 사용하며 연결되어 있다.  
  근거: 인용 근거 + 연구자 문항화 · 인용 A01, B01
- G02 (종합): 한 BC 프로세스를 바꾸면 영향을 받는 다른 프로세스가 무엇인지 알 수 있다.  
  근거: 연구자 의견(문항) / ISO 22301 4.4의 상호작용 고려를 참고 · 인용 A04
- G03 (종합): 프로세스 간에 "누가 누구에게 무엇을 전달하는지"가 문서로 정리되어 있다.  
  근거: 인용 근거 + 연구자 문항화 · 인용 A03, A02
- G04 (종합): BC 관리자(또는 그에 준하는 담당자)가 프로세스 간 연결 상태를 총괄하여 점검한다.  
  근거: 인용 근거 + 연구자 문항화 · 인용 A10
- G05 (종합): 프로세스 간 연결이 끊어졌거나 약한 지점을 파악하여 조치한다.  
  근거: 연구자 의견(근거 인용 없음)
- G06 (종합): 프로세스 간 연결은 일회성 프로젝트가 아니라 정기적으로 반복되는 운영 활동으로 유지된다.  
  근거: 인용 근거 + 연구자 문항화 · 인용 A09
- RV1 (역문항(G01 대응), 역문항): 우리 조직의 BC 프로세스는 대부분 다른 프로세스와 별개로 독립적으로 수행된다.  
  근거: 연구자 의견(검증용 문항)
- RV2 (역문항(L01~L03 대응), 역문항): 한 프로세스의 결과물이 만들어진 뒤 다른 프로세스에서 참조되지 않는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- RV3 (역문항(L22 대응), 역문항): 문서가 개정되어도 관련 프로세스 담당자에게는 따로 알리지 않는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- RV4 (역문항(L16 대응), 역문항): 연습 결과가 BC 계획·절차 개정으로 이어지지 않는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- AC1 (주의확인): 이 문항에서는 응답 4번을 선택해 주십시오.  
  근거: 연구자 의견(검증용 문항)
- CR1 (준거): 중단 사건이 발생해도 우리 조직의 BCMS가 효과적으로 대응할 수 있다고 확신한다.  
  근거: 연구자 의견(검증용 문항)
- CR2 (준거): 최근 사고 또는 연습에서 복구목표를 달성했다.  
  근거: 연구자 의견(검증용 문항)
- CR3 (준거): BC 투자의 가치를 경영진·이해관계자에게 설명할 수 있다.  
  근거: 연구자 의견(검증용 문항) · 인용 A32
- CR4 (준거(역), 역문항): 감사나 경영진 검토에서 같은 BCMS 지적사항이 반복된다.  
  근거: 연구자 의견(검증용 문항)

## 7. 한계

1. 연결 31개는 전문가 검증 전 가설이다. Arias는 프로세스가 핵심인지를 검증했을 뿐 연결을 검증하지 않았다(인용 A06: 프로세스 흐름도는 생략됨).
2. E2·E3 연결(5개)과 포함 관계(L13·L14)·집단 노드(L27·L30)는 전문가 검증에서 우선 심사한다.
3. R·V·U 구분, 관계유형 이름, 영역 분류, CORE 노드는 두 논문에 없는 연구자 설계다.
4. Białas(2010)는 BS 25999 기반 프로토타입이며(B14, B15) 본 연구는 방법만 차용했다.
5. 통계 기준(I-CVI 0.78, α 0.70 등)은 관례이며 논문 근거가 없다.
