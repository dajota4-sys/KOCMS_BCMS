# BCMS 프로세스 연결 품질 — 근거·정의서 (V3)

> 박사논문 프로젝트 · 근거 문헌: Arias-Aranda et al.(2026) *Appl. Sci.* 16, 3219 / Białas(2010) *Ontological approach to the business continuity management system development*

> Arias·Białas의 영문 인용문은 PDF 원문과 자동 대조했다(72/72 일치, 검증일 2026-10-09). 외부 학술 문헌 12건은 서지만 웹 검색으로 확인했고 원문 문장은 확인하지 못했다(원문 대조 0건). 한국어 번역은 연구자 번역(참고용)이다.

## 0. 읽는 법

- **▶ 인용**: 논문 원문을 그대로 옮긴 부분(쪽 번호 포함, 원문 대조 완료).
- **▶ 연구자 의견**: 인용에 없는 해석·가정·분류·정의. 박사논문에서 연구자가 직접 확정해야 한다.
- **연결의 증거유형** E1=원문이 S→T 연결을 직접 서술 / E2=출발·도착 일부를 연구자가 보완 / E3=원문에 서술 없음(연구자 가정).
- **품질 차원의 근거 등급** T1=Arias·Białas 원문 인용 / T2=외부 문헌(서지만 확인) / T3=연구자 정의.

## 1. 3층 모형

| 층 | 질문 | 내용 | 근거 |
|---|---|---|---|
| 객체층 | 무엇과 무엇을 연결하는가 | 프로세스 22개와 그 산출물 | Arias Table 5 (인용) |
| 관계층 | 어떤 방식으로 연결되는가 | 관계동사 11개 (Arias 서술문에서 추출) | Arias §4.3 (인용) + 동사 분류(연구자) |
| 품질층 | 그 연결이 얼마나 잘 작동하는가 | 6개 차원 | 첨부 문서의 초기 가설(연구자) + T1/T2 근거 |

문항 = **객체쌍 + 관계동사 + 품질조건**. 예) "요구사항 목록이(객체 S) BIA의 우선순위·복구목표 설정에(객체 T) 입력될 때(관계동사: 입력된다), 두 내용이 서로 모순 없이 일치한다(품질조건: 정합성)."

## 2. 품질 6개 차원과 근거

### 1. 정합성 (Consistency)

- 첨부 문서의 정의(연구자 제시): 선행 산출물과 후행 의사결정이 모순 없이 일치하는가
- ▶ 연구자 의견(본 연구의 조작적 정의): 연결된 두 프로세스의 산출물과 결정(S의 산출물과 T의 내용)이 서로 모순 없이 일치하는 정도
- 문항 틀: `(연결 문장: S의 산출물이 T에 … 될 때), 두 내용이 서로 모순 없이 일치한다.`
- **T1 근거 강도: 중** — 두 논문에는 "일관성/모순"이라는 말을 직접 쓴 문장이 없다. 후행 결정이 선행 산출물에 "부합(matches)·근거(foundation)·도출(derived)"되어야 한다는 서술이 근거다(A33, A12, A14, A16).
  - ▶ 인용 [A33] (Arias p.14, §4.3): "The business continuity governance process, in particular, ensures that the BCMS matches the goals and requirements of the stakeholders responsible for oversight."
    - 번역: BC 거버넌스 프로세스는 특히 BCMS가 감독 책임이 있는 이해관계자의 목표와 요구사항에 부합하도록 보장한다.
  - ▶ 인용 [A14] (Arias p.15, §4.3): "After the completion of the business impact assessment and criticality analysis process, the approved business continuity requirements guide the determination and selection of suitable BC strategies and solutions"
    - 번역: BIA·중요도 분석 프로세스가 완료된 후, 승인된 업무연속성 요구사항이 적절한 BC 전략·솔루션의 결정과 선정을 안내한다.
  - ▶ 인용 [A16] (Arias p.15, §4.3): "Corresponding BC plans and procedures, derived from the identified BC strategies and solutions, are developed within the process of developing BC plans and procedures."
    - 번역: 식별된 BC 전략·솔루션에서 도출된 해당 BC 계획·절차는 BC 계획·절차 개발 프로세스 안에서 개발된다.
  - ▶ 인용 [A12] (Arias p.15, §4.3): "The risk assessment process, which focuses on identifying potential disruptions, relies on the outcomes of the business impact assessment and criticality analysis as its foundation."
    - 번역: 잠재적 중단을 식별하는 데 초점을 둔 리스크평가 프로세스는 BIA·중요도 분석의 결과를 기반으로 한다.
- T2 외부 문헌 후보: S03, S05, S06, S04 — 데이터 품질·요구사항 일관성 문헌에서 일관성은 확립된 개념이다. 다만 원문 정의 문장은 이 세션에서 확인하지 못했다.
- ▶ 연구자 의견(다른 차원과의 겹침): 증빙성·추적성과 함께 "기록·근거"를 다루므로 요인분석에서 구분되는지 확인 필요

### 2. 추적성 (Traceability)

- 첨부 문서의 정의(연구자 제시): 후행 결과에서 선행 근거를 역추적할 수 있는가
- ▶ 연구자 의견(본 연구의 조작적 정의): 후행 결과(T의 내용)에서 근거가 된 선행 산출물(S의 산출물)을 거슬러 찾아 확인할 수 있는 정도
- 문항 틀: `(T의 내용)에서 근거가 된 (S의 산출물)을 거슬러 찾아 확인할 수 있다.`
- **T1 근거 강도: 없음** — 두 논문에는 추적(traceability)을 직접 다룬 문장이 없다(원문 검색으로 확인). 약한 간접 근거로 BIA 결과가 "근거가 첨부된 문서화된 진술"이라는 서술(A13)과, 지식베이스에서 BIA 보고서를 관련 사안으로 질의·검색하는 Białas의 예(B11)가 있을 뿐이다.
  - ▶ 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
    - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
  - ▶ 인용 [B11] (Białas p.6, §2.8 (Fig.4 설명)): "looks for business impact analysis (BIA) reports related to the two following issues"
    - 번역: (업무연속성 관리자가) 다음 두 가지 사안과 관련된 BIA 보고서를 찾는다.
- T2 외부 문헌 후보: S01, S02 — 요구사항 추적성은 소프트웨어공학에서 잘 정립된 개념이다. 이 차원의 학술 근거는 두 논문이 아니라 외부 문헌에 의존한다.
- ▶ 연구자 의견(다른 차원과의 겹침): 증빙성(기록 존재)이 있어야 추적성이 가능하므로 두 차원의 상관이 높을 수 있음

### 3. 증빙성 (Evidence)

- 첨부 문서의 정의(연구자 제시): 연결을 입증하는 문서·기록·승인이 존재하는가
- ▶ 연구자 의견(본 연구의 조작적 정의): 연결이 실제로 이루어졌음을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있는 정도
- 문항 틀: `(연결 문장), 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.`
- **T1 근거 강도: 중** — Białas는 훈련의 결과와 기록이 BCMS 인증 때 "증거(evidences)"로 쓰인다고 쓴다(B17). Arias는 BIA 결과를 근거가 첨부된 문서화된 진술로, 경영진 승인을 확보하는 절차로 서술한다(A13, A37). 다만 "연결의 증빙"을 직접 말한 문장은 아니다.
  - ▶ 인용 [B17] (Białas p.5, §2.8 (Fig.3 설명)): "results and records (used as evidences during BCMS certification)"
    - 번역: 결과와 기록(BCMS 인증 과정에서 증거로 사용됨)
  - ▶ 인용 [A41] (Arias p.16, §4.3): "The process of controlling documented information involves identifying, creating, updating, and controlling information essential for the effectiveness of the BCMS."
    - 번역: 문서화된 정보 통제 프로세스는 BCMS의 효과성에 필수적인 정보를 식별·작성·갱신·통제하는 것을 포함한다.
  - ▶ 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
    - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
  - ▶ 인용 [A37] (Arias p.15, §4.3): "This procedure involves systematic prioritization of products, services, processes, and activities, followed by comprehensive analysis, consolidation, and securing of executive approval of the BIA findings."
    - 번역: 이 절차는 제품·서비스·프로세스·활동의 체계적 우선순위화, 이어지는 종합 분석·통합, 그리고 BIA 결과에 대한 경영진 승인 확보를 포함한다.
- T2 외부 문헌 후보: S11, S12 — 감사 증거(audit evidence)는 경영시스템 표준의 확립된 개념이다. 단 표준 원문은 이 세션에서 확인하지 못했고 정의 문장은 2차 사이트가 인용한 것만 보았다.
- ▶ 연구자 의견(다른 차원과의 겹침): 추적성·정합성과의 구분 확인 필요

### 4. 책임성 (Accountability)

- 첨부 문서의 정의(연구자 제시): 연결의 검토·승인·변경 책임이 명확한가
- ▶ 연구자 의견(본 연구의 조작적 정의): 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있는 정도
- 문항 틀: `(연결 문장), 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.`
- **T1 근거 강도: 중** — Arias는 BC 관리자가 프로세스 전체에 책임(accountable)을 지고 설계에 책임(responsible)을 진다고 쓴다(A49, A50, A10). 단 책임의 대상은 "프로세스"이지 "프로세스 간 연결"이 아니다. 연결 단위의 책임은 연구자의 확장이다.
  - ▶ 인용 [A49] (Arias p.9, §4.1): "This means that the business continuity manager is accountable for the whole process."
    - 번역: 이는 업무연속성 관리자가 프로세스 전체에 대해 책임(accountable)을 진다는 뜻이다.
  - ▶ 인용 [A50] (Arias p.9, §4.1): "The business continuity manager is also responsible for the process design"
    - 번역: 업무연속성 관리자는 프로세스 설계에 대한 책임(responsible)도 진다.
  - ▶ 인용 [A10] (Arias p.10, Figure 4): "Accountability/responsibility – business continuity manager is the process owner or process manager and the process is a core competency of the BCMS."
    - 번역: 책임성 – 업무연속성 관리자가 프로세스 소유자 또는 관리자이며 해당 프로세스는 BCMS의 핵심 역량이다.
- T2 외부 문헌 후보: S07, S12 — 책임성 개념은 행정·거버넌스 문헌에서 정립되어 있다(S07). 연결 단위로 적용하는 것은 연구자의 확장이다.
- ▶ 연구자 의견(다른 차원과의 겹침): 다른 5개 차원과 개념적으로 가장 독립적일 것으로 예상(연구자 가정)

### 5. 최신성 (Timeliness)

- 첨부 문서의 정의(연구자 제시): 변경된 정보가 관련 프로세스와 문서에 적시에 반영되는가
- ▶ 연구자 의견(본 연구의 조작적 정의): 선행 산출물이 바뀌었을 때 관련 프로세스와 문서에 정해진 기간 안에 반영되는 정도
- 문항 틀: `(S의 산출물)이 바뀌면, (T의 내용)에 정해진 기간 안에 반영된다.`
- **T1 근거 강도: 중** — Arias는 문서화된 정보 통제가 정보의 갱신(updating)을 포함하고(A41), 승인·범위 정의 같은 산출물이 적합성에 대한 정기적 점검을 필요로 하며(A51), 승인 갱신이 거버넌스에 통합되어 있고(A52), 변경관리가 문서 변경과 리스크평가 재개를 산출한다고(A28, A27) 서술한다. "적시(timely)"라는 말은 쓰지 않았다.
  - ▶ 인용 [A41] (Arias p.16, §4.3): "The process of controlling documented information involves identifying, creating, updating, and controlling information essential for the effectiveness of the BCMS."
    - 번역: 문서화된 정보 통제 프로세스는 BCMS의 효과성에 필수적인 정보를 식별·작성·갱신·통제하는 것을 포함한다.
  - ▶ 인용 [A51] (Arias p.16-17, §4.3): "Specific outputs, such as management approval and scope definition, necessitate regular scrutiny for relevance and appropriateness."
    - 번역: 경영진 승인과 범위 정의 같은 특정 산출물은 적합성과 적절성에 대한 정기적 점검을 필요로 한다.
  - ▶ 인용 [A52] (Arias p.17, §4.3): "Regular activities like renewing the management approval are also integrated into the business continuity governance processes."
    - 번역: 경영진 승인의 갱신 같은 정기 활동도 BC 거버넌스 프로세스에 통합되어 있다.
  - ▶ 인용 [A53] (Arias p.18, §5): "Regular reviews of BC plans and procedures and a process-oriented approach with continuous improvements are essential."
    - 번역: BC 계획·절차의 정기 검토와 지속적 개선을 동반한 프로세스 중심 접근이 필수적이다.
  - ▶ 인용 [A28] (Arias p.16, §4.3 (변경관리 산출물 1번째)): "Necessary changes (for the process of controlling documented information);"
    - 번역: 필요한 변경(문서화된 정보 통제 프로세스를 위한 것).
  - ▶ 인용 [A27] (Arias p.16, §4.3 (변경관리 산출물 3번째)): "Initiation of risk assessment in response to significant proposed or occurring changes; and"
    - 번역: 중대한 제안·발생 변경에 대응한 리스크평가의 개시.
- T2 외부 문헌 후보: S03, S04, S05 — 데이터 품질 문헌의 최신성·적시성(timeliness/currency)이 근거 후보다. 원문 정의는 이 세션에서 확인하지 못했다.
- ▶ 연구자 의견(다른 차원과의 겹침): V2의 "갱신" 개념과 가장 가깝다

### 6. 환류폐쇄성 (Closed-loop completion)

- 첨부 문서의 정의(연구자 제시): 훈련·평가·사고 결과가 개선과 재수정까지 완료되는가
- ▶ 연구자 의견(본 연구의 조작적 정의): 훈련·평가·사고의 결과가 개선·재수정 조치로 이어지고 완료까지 확인되는 정도 (환류 연결 8개에만 적용)
- 문항 틀: `(결과가 나오는 사건), (개선·재수정 범위)까지 조치가 이어져 완료가 확인된다. — 환류 연결 8개에만 적용`
- **T1 근거 강도: 강** — 연습은 필요한 조정·개선을 촉구하고(A23), 평가·감사·공급망 결과는 개선에 쓰이며 지속적 개선 프로세스에서 실현되고(A25, A46), 변경의 결과는 변경을 개시한 프로세스로 돌아간다(A29). 점검 결과를 개선으로 잇는 구조는 Białas의 PDCA slot에도 있다(B18). "완료까지 확인"이라는 표현은 연구자의 것이다.
  - ▶ 인용 [A23] (Arias p.15, §4.3): "The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."
    - 번역: BC 계획·절차 훈련·연습 프로세스는 BC 전략·솔루션과 이에 대응하는 BC 계획·절차(경보·커뮤니케이션 절차 포함)가 정기적으로 시험되어 그 유효성을 검증하고 필요한 조정·개선을 촉구하도록 보장한다.
  - ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
    - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
  - ▶ 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
    - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
  - ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
    - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
  - ▶ 인용 [A53] (Arias p.18, §5): "Regular reviews of BC plans and procedures and a process-oriented approach with continuous improvements are essential."
    - 번역: BC 계획·절차의 정기 검토와 지속적 개선을 동반한 프로세스 중심 접근이 필수적이다.
  - ▶ 인용 [A54] (Arias p.18, §5): "The core processes of the BCMS are regularly evaluated and adjusted to ensure the effectiveness and efficiency of the system."
    - 번역: BCMS의 핵심 프로세스는 시스템의 효과성과 효율성을 보장하기 위해 정기적으로 평가·조정된다.
  - ▶ 인용 [B18] (Białas p.4, §2.8 (Fig.1 설명)): "the monitorReview_C slot filled with BCMS_3Check_4 individual, and the maintImprove_A slot filled with BCMS_4Act_1 individual"
    - 번역: monitorReview_C slot은 BCMS_3Check_4 개체로, maintImprove_A slot은 BCMS_4Act_1 개체로 채워진다.
- T2 외부 문헌 후보: S08 — 오류를 탐지·수정하는 조직학습(single/double loop)이 이론적 배경 후보다. 원문은 이 세션에서 열람하지 못했다.
- ▶ 연구자 의견(다른 차원과의 겹침): 책임성·최신성과 일부 겹칠 수 있음. 환류 연결 8개에만 적용되므로 비교 시 주의

## 3. 외부 학술 근거 후보 (서지 확인, 원문 미확인)

네트워크 정책으로 원문을 열람하지 못했다. 아래 "요지"는 검색 결과 요약이며 인용이 아니다. 연구자가 원문에서 정의·문장을 확인한 뒤 근거로 확정해야 한다.

- **S01** [학술논문(학회)] Gotel, O. C. Z., & Finkelstein, A. C. W. (1994). An analysis of the requirements traceability problem. In Proc. 1st Int. Conf. on Requirements Engineering (ICRE), pp. 94–101. IEEE Computer Society Press. doi:10.1109/ICRE.1994.292398
  - 관련 차원: 추적성
  - 요지(인용 아님): 요구사항 추적성 문제의 성격을 분석하고 pre-RS/post-RS 추적성으로 구분한다(검색 결과 요약 기준).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S02** [학술논문(학회)] Cleland-Huang, J., Gotel, O. C. Z., Huffman Hayes, J., Mäder, P., & Zisman, A. (2014). Software traceability: Trends and future directions. In Proc. Future of Software Engineering (FOSE 2014), pp. 55–69. ACM. doi:10.1145/2593882.2593891
  - 관련 차원: 추적성
  - 요지(인용 아님): 소프트웨어 추적성의 연구 현황과 향후 과제를 개관한다(검색 결과 요약 기준).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S03** [학술논문] Wang, R. Y., & Strong, D. M. (1996). Beyond accuracy: What data quality means to data consumers. Journal of Management Information Systems, 12(4), 5–33.
  - 관련 차원: 정합성, 최신성
  - 요지(인용 아님): 데이터 소비자 관점의 데이터 품질 차원을 2단계 설문과 분류 연구로 도출한 위계적 틀을 제시한다(검색 결과 요약 기준). 시의성·표현 일관성 등 차원 정의는 원문에서 확인해야 한다.
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S04** [학술논문] Pipino, L. L., Lee, Y. W., & Wang, R. Y. (2002). Data quality assessment. Communications of the ACM, 45(4), 211–218. doi:10.1145/505248.506010
  - 관련 차원: 정합성, 최신성
  - 요지(인용 아님): 데이터 품질 평가(측정)를 다룬다. 초록·본문은 이 세션에서 확인하지 못했다(서지만 확인).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S05** [학술논문(서베이)] Batini, C., Cappiello, C., Francalanci, C., & Maurino, A. (2009). Methodologies for data quality assessment and improvement. ACM Computing Surveys, 41(3), 1–52.
  - 관련 차원: 정합성, 최신성
  - 요지(인용 아님): 데이터 품질 평가·개선 방법론을 단계·기법·차원별로 비교한다(검색 결과 요약 기준). 일관성·최신성 정의는 2차 문헌이 인용하나 2009 원문 문장은 확인하지 못했다.
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S06** [학술논문] Zowghi, D., & Gervasi, V. (2003). On the interplay between consistency, completeness, and correctness in requirements evolution. Information and Software Technology, 45(14), 993–1009.
  - 관련 차원: 정합성
  - 요지(인용 아님): 요구사항 진화에서 일관성·완전성·정확성의 관계와 검증 점검을 다룬다(검색 결과 요약 기준). 2004년 정오표(erratum)가 있다.
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S07** [학술논문] Bovens, M. (2007). Analysing and assessing accountability: A conceptual framework. European Law Journal, 13(4), 447–468. doi:10.1111/j.1468-0386.2007.00378.x
  - 관련 차원: 책임성
  - 요지(인용 아님): 책임성을 행위자와 포럼 사이의 관계(설명 의무, 질문·판단, 결과 부담)로 좁게 개념화하고 분석·평가 틀을 제시한다(검색 결과 요약 기준).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S08** [학술·실무 논문] Argyris, C. (1977). Double loop learning in organizations. Harvard Business Review, 55(5), 115–125.
  - 관련 차원: 환류폐쇄성
  - 요지(인용 아님): 조직학습을 오류의 탐지와 수정으로 보고 single-loop와 double-loop를 구분한다(2차 요약 기준; 원문 미열람).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S09** [학술논문(방법)] Diamantopoulos, A., & Winklhofer, H. M. (2001). Index construction with formative indicators: An alternative to scale development. Journal of Marketing Research, 38(2), 269–277. doi:10.1509/jmkr.38.2.269.18845
  - 관련 차원: 방법(구성·검증)
  - 요지(인용 아님): 형성적 지표로 지수를 구성하는 방법을 다룬다. 연결 품질을 6개 차원의 합으로 구성할 때의 방법 근거 후보(검색 결과 요약 기준).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S10** [학술논문(방법)] MacKenzie, S. B., Podsakoff, P. M., & Podsakoff, N. P. (2011). Construct measurement and validation procedures in MIS and behavioral research: Integrating new and existing techniques. MIS Quarterly, 35(2), 293–334.
  - 관련 차원: 방법(구성·검증)
  - 요지(인용 아님): 개념 정의, 측정모형 명시, 타당화 기법을 형성적·반영적 지표 구분과 함께 정리한다(검색 결과 요약 기준). 문항 개발·검증 절차의 근거 후보.
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S11** [표준] ISO 19011:2018. Guidelines for auditing management systems. International Organization for Standardization.
  - 관련 차원: 증빙성
  - 요지(인용 아님): "audit evidence"를 감사 기준과 관련되고 검증 가능한 기록·사실 진술·기타 정보로 정의한다고 2차 사이트가 인용한다(표준 원문 미확인).
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음
- **S12** [표준] ISO 22301:2019. Security and resilience — Business continuity management systems — Requirements. International Organization for Standardization.
  - 관련 차원: 증빙성, 책임성
  - 요지(인용 아님): Arias가 인용한 조항(4.1, 4.2.2, 4.4, 7.4, 8.2–8.4)만 Arias 본문으로 확인했다. 역할·책임, 문서화된 정보, 시정조치·개선 조항의 내용은 표준 원문에서 확인해야 한다.
  - 상태: 서지 확인됨(웹 검색, 2026-10-09) / 원문 미열람 — 이 세션의 네트워크 정책으로 접근 차단. 인용 문장은 확인되지 않음

## 4. 방법 근거 (Białas 인용)

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

## 5. 정의서

| ID | 용어 | 유형 | 정의 | 근거 인용 | 근거·한계 |
|---|---|---|---|---|---|
| D01 | 프로세스(객체) | 인용 정의 + 연구자 범위 설정 | 입력을 출력으로 전환하는, 상호 관련되거나 상호작용하는 활동의 응집된 집합. 본 연구의 객체는 Arias Table 5의 22개 BCMS 프로세스이며, BCMS 계획은 프로젝트로 분류되어 제외한다. | A42, A01, A48 | 객체 22개 선정 = Arias Table 5(인용). BCMS 계획을 제외한 것도 Arias의 분류(A48)를 따른 것. |
| D02 | 산출물(artefact) | 인용 개념 + 연구자 정의 | [연구자 정의] 프로세스가 만들어 다른 프로세스가 사용하는 문서·기록·보고·결정. Białas는 slot이 채워진 개체가 핵심 BCM 산출물(주로 문서)을 나타낸다고 쓴다. | B07 | 용어는 Białas에서 차용, 정의 문장은 연구자가 작성. |
| D03 | 연결(link) | 연구자 정의 | 프로세스 S의 산출물·결과·자원이 프로세스 T의 입력·기준·실행·개정에 쓰이도록 Arias가 서술한 방향성 있는 프로세스 쌍(S→T) 1개. 한 연결은 하나의 출발(S)과 하나의 도착(T)을 가진다(집단 노드 CORE 제외). 연결의 의미는 관계동사로 표현한다. | A02, A03, A04, B04, B05 | 연결이라는 단위의 정의는 연구자 정의. 입력·출력·상호작용·상호 연결이 중요하다는 점은 인용. |
| D04 | 연결 품질(linkage quality) | 연구자 정의(구성개념) | 한 연결(S→T)이 조직의 실제 운영에서 얼마나 잘 작동하는가. 정합성·추적성·증빙성·책임성·최신성·환류폐쇄성 6개 차원으로 측정한다. 환류폐쇄성은 환류 연결 8개에만 적용한다. 연결의 점수는 적용되는 차원 문항의 평균이다. | A01, A02, A04, B01, A07, A05 | 용어와 6개 차원 구성은 연구자가 제시한 초기 가설(첨부 문서)이며 두 논문에 없다. 프로세스 간 상호 연결·상호작용이 BCMS의 핵심이라는 점(A01, A02, A04, B01, A07)과 체크리스트만으로는 지속 운영이 보장되지 않는다는 점(A05)을 정의의 이유로 인용했다. |
| D05 | 연계성(조직 수준) | 연구자 정의 | 조직의 연결 31개의 품질을 종합한 지수(연결 점수의 평균). 첨부 문서가 "연결성"이라 부른 개념과 같은 것으로 보며, 용어("연계성"/"연결성") 통일은 연구자가 정한다. | — | 용어 선택은 연구자 결정 사항. |
| D06 | 3층 모형(객체층·관계층·품질층) | 연구자 설계(첨부 문서) | 객체층 = 무엇과 무엇을 연결하는가(프로세스 22개와 그 산출물). 관계층 = 어떤 방식으로 연결되는가(관계동사 11개). 품질층 = 그 연결이 얼마나 잘 작동하는가(6개 차원). 문항은 "객체쌍 + 관계동사 + 품질조건" 구조로 쓴다. | B04, B05, B06 | 3층 구분은 첨부 문서의 제안이다. Białas가 object slot(관계)과 data slot(속성)을 구분한 방식이 구조적 근거다. |
| D07 | 관계동사 | 연구자 정의 | 연결의 의미를 나타내는 동사(입력된다·근거가 된다·도출·이행된다·시험·검증된다·수행을 촉발한다·개정·갱신한다·환류된다·포함한다·제공한다·승인한다·전달된다). Arias의 서술문에서 동사를 추출했다. 첨부 문서의 동사 중 "일치한다·추적된다·기록·증빙된다"는 품질층 차원(정합성·추적성·증빙성)과 겹쳐 품질층으로 옮겼다. | A11, A12, A14, A16, A23, A25, A29, A30 | 동사 분류와 이름은 연구자 정의. 원문 동사는 관계동사 시트에 영문 표현으로 병기. |
| D08 | 정합성 | 연구자 정의 (첨부 문서) | 선행 산출물과 후행 의사결정이 모순 없이 일치하는 정도. | A33, A14, A16, A12 | 두 논문에 "일관성"을 직접 다룬 문장은 없고 "부합·근거·도출" 서술이 간접 근거. 외부 후보: S03, S05, S06 (원문 미확인). |
| D09 | 추적성 | 연구자 정의 (첨부 문서) | 후행 결과에서 선행 근거를 역추적할 수 있는 정도. | — | 두 논문에 직접 근거 없음(원문 검색 확인). 외부 후보: S01, S02 (원문 미확인). |
| D10 | 증빙성 | 연구자 정의 (첨부 문서) | 연결을 입증하는 문서·기록·승인이 존재하는 정도. | B17, A41, A13, A37 | Białas가 기록을 "증거"로 쓴다고 서술(B17). 외부 후보: S11, S12 (표준, 원문 미확인). |
| D11 | 책임성 | 연구자 정의 (첨부 문서) | 연결의 검토·승인·변경 책임이 명확한 정도. | A49, A50, A10 | Arias의 책임은 프로세스 단위. 연결 단위 책임은 연구자의 확장. 외부 후보: S07. |
| D12 | 최신성 | 연구자 정의 (첨부 문서) | 변경된 정보가 관련 프로세스와 문서에 적시에 반영되는 정도. | A41, A51, A52, A53, A28, A27 | "적시"라는 표현은 논문에 없음. 외부 후보: S03, S04, S05 (원문 미확인). |
| D13 | 환류폐쇄성 | 연구자 정의 (첨부 문서) | 훈련·평가·사고 결과가 개선과 재수정까지 완료되는 정도. 환류 연결 8개(L16, L18, L19, L20, L23, L24, L25, L26)에만 적용. | A23, A25, A46, A29, A53, A54, B18 | 환류 연결의 선정 기준(훈련·평가·사고·변경 결과가 되돌아가는 연결)은 연구자 분류. 외부 후보: S08. |
| D14 | 증거유형 E1/E2/E3 | 연구자 정의 | E1=원문이 S→T 연결을 직접 서술(인용만으로 연결의 존재와 방향이 성립). E2=원문이 연결을 서술하나 출발 또는 도착을 연구자가 특정·보완. E3=원문에 연결 서술이 없고 연구자 가정 또는 Białas 유추에 의존. 각 연결에 인용문과 연구자 의견을 분리해 기록한다. | — | 연결의 증거유형. 품질 차원의 근거 등급(T1/T2/T3)과 다르다. |
| D15 | 품질 차원 근거 등급 T1/T2/T3 | 연구자 정의 | T1=Arias·Białas 원문에서 문장 단위로 검증한 인용. T2=외부 학술 문헌(서지만 확인, 원문 문장은 연구자가 확인해야 함). T3=연구자 정의. | — | 외부 문헌은 이 세션에서 열람하지 못했다. |
| D16 | 연결 영역 ①~⑤ | 연구자 분류 | 연결의 도착 프로세스가 수행하는 업무 흐름에 따라 묶은 분류(① 요구·분석, ② 전략·계획·이행, ③ 대응·복구·훈련, ④ 평가·개선·변경, ⑤ 거버넌스·이해관계자). | — | Arias의 PDCA 열(Table 5)과는 별개. PDCA는 객체 시트에 별도 표기. |
| D17 | 집단 노드 CORE | 연구자 정의 | Arias가 "nearly all BCMS processes"처럼 프로세스를 열거하지 않고 가리킨 집단을 하나의 가상 노드로 표현한 것. 객체 22개에 포함되지 않는다. | A30, A18 | 노드 자체는 연구자가 만든 것. |
| D18 | competency question | 인용 정의 + 연구자 적용 | 온톨로지 관련 지식베이스가 답할 수 있는 온톨로지 영역의 질문. 그 답이 온톨로지의 범위를 정의한다. 본 연구에서는 연결마다 품질 차원별 문항(5~6개)이 이 질문에 답한다. | B02, B03 | 정의는 Białas 인용, 문항으로의 적용은 연구자 설계. |
| D19 | ProcessLink 객체화 | 연구자 설계 | 연결 자체를 하나의 개체로 보고 6개 품질 점수를 그 개체의 속성(data slot)으로 두는 설계. Białas가 object slot을 관계로, data slot을 속성으로 구분한 방식을 응용했다. | B04, B06 | Białas는 이런 객체화를 하지 않았다. |
| D20 | 형성적 지수 | 연구자 설계 | 연결 품질을 6개 차원의 조합으로 보는 구성. 각 차원은 문항 여러 개(반영적 지표)로 재고, 차원들을 합쳐 연결 품질을 만든다. 초기 가중치는 동일하게 두고 예비조사 후 조정한다. | — | 방법 근거 후보: S09, S10 (서지만 확인, 원문 미확인). |
| D21 | 응답 9(해당 없음/모르겠음) | 연구자 정의 | 프로세스가 없거나 응답자가 알 수 없어 응답할 수 없는 경우. 점수 계산에서 결측으로 처리하며 "연결이 약함"과 구분한다. | — | — |
| D22 | 합의 판정(80%·20%) | 인용 + 연구자 적용 | 범주 1(80% 이상 채택), 범주 2(20~80% 토론), 범주 3(20% 미만 기각)의 3단계 판정. 본 연구는 전문가 맹검 재분류 일치율과 연결 타당도 판정에 같은 틀을 준용한다. | A43, A44, A45 | Arias는 프로세스의 핵심 여부에 적용했고, 문항·연결에 적용하는 것은 연구자의 준용. |
| D23 | I-CVI 기준(0.78) | 연구자 선택(관례) | 전문가 6~10인 패널에서 적합도 3~4점 비율이 0.78 이상이면 채택하는 관례 기준. | — | 두 논문에 근거 없음. 일반적 관례를 연구자가 선택. |
| D24 | Białas 차용 범위 | 연구자 정의 | 차용=방법(competency question, object slot의 domain/range, data slot, 개체=산출물, 검증 방식). 비차용=클래스 목록·관계 이름(BS 25999 기반). Białas는 BCMO가 프로토타입이며 실제 데이터 검증이 더 필요하다고 밝힌다. | B15, B14, B02, B04, B05, B06, B08 | — |

## 6. 관계동사 11개

| ID | 관계동사 | 의미(S→T) | Arias 원문 동사 | 근거 인용 | 첨부 문서와의 대응 | 사용 연결 |
|---|---|---|---|---|---|---|
| V01 | 입력된다·활용된다 | S의 산출물이 T의 입력·기준으로 쓰인다 | inform / essential input / serve as inputs | A11, A17, A31 | 첨부 문서의 "입력된다/활용된다" | L01, L02, L04, L05, L09, L11, L17, L28 |
| V02 | 근거가 된다 | S의 결과가 T의 결정·선정의 근거(기준)가 된다 | relies on … as its foundation / guide the determination and selection | A12, A14 | 첨부 문서의 "근거가 된다"(일부 "제약한다") | L03, L06 |
| V03 | 도출·이행된다 | S의 내용이 T로 구체화·도출되거나 T에서 실행된다 | derived from / executed as planned / through the execution of | A16, A15, A19 | (Arias에서 추가한 동사) | L07, L08, L12, L29 |
| V04 | 시험·검증된다 | S가 T에서 시험·검증된다 | tested regularly to validate their effectiveness | A23 | 첨부 문서의 "검증한다" | L15 |
| V05 | 수행을 촉발한다 | S의 사건·결과가 T의 수행을 개시시킨다 | initiation of / as those processes initiated them | A27, A29 | 첨부 문서의 "변경을 촉발한다" | L21, L23, L24 |
| V06 | 개정·갱신한다 | S의 결과·승인된 변경이 T의 내용을 개정·갱신한다 | prompt any necessary adjustments / necessary changes (for DOC) / updating | A23, A28, A41 | 첨부 문서의 "개정·갱신한다" | L16, L22 |
| V07 | 환류된다 | S의 결과가 T(개선·재수정)로 되돌아간다 | are used to improve / results of changes … as those processes initiated them | A25, A46, A29 | 첨부 문서의 "환류된다" | L18, L19, L20, L25, L26 |
| V08 | 포함한다 | T는 S의 하위 프로세스로서 S 안에서 수행된다 | includes two primary subprocesses | A21 | (Arias에서 추가한 동사) | L13, L14 |
| V09 | 제공한다 | S가 T에 자원 또는 자원 관련 보고를 제공한다 | outputs … include documented resources / reports on resource utilization | A18 | (Arias에서 추가한 동사) | L10, L30, L31 |
| V10 | 승인한다 | S가 T의 결과를 승인한다 | securing of executive approval of the BIA findings | A37 | 첨부 문서의 "승인한다" — 이번 연결 31개에는 사용하지 않음 | 미사용 |
| V11 | 전달된다 | S의 결과가 T로 전달·보고된다 | are communicated centrally to stakeholders | A30 | (Arias에서 추가한 동사) | L27 |

## 7. 연결 31개 — 인용과 연구자 의견

### L01 · REQ 요구사항관리 → BIA BIA·중요도 분석

- 영역: ① 요구·분석 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리가 식별한 법규·규제·계약 요구사항이 BIA·중요도 분석 프로세스에 "정보를 제공(inform)"한다.
- ▶ 연구자 의견(해석·보완·가정): "inform"을 "S의 산출물이 T의 입력·기준이 된다(informs)"로 해석. A11은 4개 프로세스를 한 문장으로 열거하므로 L01·L02·L04·L05는 이 문장에서 연구자가 분리한 연결.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가(요구사항이 BIA에 실제로 입력되는가)

  - L01-CO (정합성): 우리 조직에서는 요구사항 목록이 BIA의 우선순위·복구목표 설정에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L01-TR (추적성): 우리 조직에서는 BIA의 우선순위·복구목표 설정에서 근거가 된 요구사항 목록을 거슬러 찾아 확인할 수 있다.
  - L01-EV (증빙성): 우리 조직에서는 요구사항 목록이 BIA의 우선순위·복구목표 설정에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L01-AC (책임성): 우리 조직에서는 요구사항 목록이 BIA의 우선순위·복구목표 설정에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L01-TM (최신성): 우리 조직에서는 요구사항 목록이 바뀌면, BIA의 우선순위·복구목표 설정에 정해진 기간 안에 반영된다.

### L02 · REQ 요구사항관리 → RA 리스크평가

- 영역: ① 요구·분석 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 리스크평가 프로세스에 정보를 제공한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L02-CO (정합성): 우리 조직에서는 요구사항 목록이 리스크평가의 범위·기준에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L02-TR (추적성): 우리 조직에서는 리스크평가의 범위·기준에서 근거가 된 요구사항 목록을 거슬러 찾아 확인할 수 있다.
  - L02-EV (증빙성): 우리 조직에서는 요구사항 목록이 리스크평가의 범위·기준에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L02-AC (책임성): 우리 조직에서는 요구사항 목록이 리스크평가의 범위·기준에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L02-TM (최신성): 우리 조직에서는 요구사항 목록이 바뀌면, 리스크평가의 범위·기준에 정해진 기간 안에 반영된다.

### L03 · BIA BIA·중요도 분석 → RA 리스크평가

- 영역: ① 요구·분석 · 관계동사: **근거가 된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A12] (Arias p.15, §4.3): "The risk assessment process, which focuses on identifying potential disruptions, relies on the outcomes of the business impact assessment and criticality analysis as its foundation."
  - 번역: 잠재적 중단을 식별하는 데 초점을 둔 리스크평가 프로세스는 BIA·중요도 분석의 결과를 기반으로 한다.
- ▷ 보조 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
  - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
- 인용이 확립하는 사실: 리스크평가는 BIA·중요도 분석의 결과를 기반(foundation)으로 삼는다. BIA의 최종 결과는 근거가 첨부된 문서화된 진술(업무연속성 요구사항)이다.
- ▶ 연구자 의견(해석·보완·가정): "relies on ... as its foundation"을 informs(입력·기준)로 해석.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L03-CO (정합성): 우리 조직에서는 BIA 결과가 리스크평가 대상 선정의 근거가 될 때, 두 내용이 서로 모순 없이 일치한다.
  - L03-TR (추적성): 우리 조직에서는 리스크평가 대상에서 근거가 된 BIA 결과를 거슬러 찾아 확인할 수 있다.
  - L03-EV (증빙성): 우리 조직에서는 BIA 결과가 리스크평가 대상 선정의 근거가 될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L03-AC (책임성): 우리 조직에서는 BIA 결과가 리스크평가 대상 선정의 근거가 될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L03-TM (최신성): 우리 조직에서는 BIA 결과가 바뀌면, 리스크평가 대상에 정해진 기간 안에 반영된다.

### L04 · REQ 요구사항관리 → AUD 내부감사

- 영역: ① 요구·분석 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 내부감사 프로세스에 정보를 제공한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일. 내부감사 기준에 요구사항이 포함된다는 구체적 형태는 연구자의 지표화.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L04-CO (정합성): 우리 조직에서는 요구사항 목록이 내부감사 점검 기준에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L04-TR (추적성): 우리 조직에서는 내부감사 점검 기준에서 근거가 된 요구사항 목록을 거슬러 찾아 확인할 수 있다.
  - L04-EV (증빙성): 우리 조직에서는 요구사항 목록이 내부감사 점검 기준에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L04-AC (책임성): 우리 조직에서는 요구사항 목록이 내부감사 점검 기준에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L04-TM (최신성): 우리 조직에서는 요구사항 목록이 바뀌면, 내부감사 점검 기준에 정해진 기간 안에 반영된다.

### L05 · REQ 요구사항관리 → SUP 공급망관리

- 영역: ① 요구·분석 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A11] (Arias p.15, §4.3): "These requirements inform processes such as business impact assessment and criticality analysis, risk assessment, internal audits, and supply chain management."
  - 번역: 이 요구사항들은 BIA·중요도 분석, 리스크평가, 내부감사, 공급망관리와 같은 프로세스에 정보를 제공한다.
- ▷ 보조 인용 [A39] (Arias p.16, §4.3): "outsourced services must be assessed, analyzed, and controlled regarding business continuity considerations"
  - 번역: 외주 서비스는 업무연속성 관점에서 평가·분석·통제되어야 한다.
- 인용이 확립하는 사실: 요구사항관리의 결과가 공급망관리 프로세스에 정보를 제공한다. 외주 서비스는 업무연속성 관점에서 평가·분석·통제되어야 한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문 분리 사유는 L01과 동일. "공급업체 선정·계약 조건에 BC 요구사항 포함"은 A39(외주 서비스 통제)를 바탕으로 한 연구자의 지표화.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L05-CO (정합성): 우리 조직에서는 BC 요구사항이 공급업체 선정·계약 조건에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L05-TR (추적성): 우리 조직에서는 공급업체 선정·계약 조건에서 근거가 된 BC 요구사항을 거슬러 찾아 확인할 수 있다.
  - L05-EV (증빙성): 우리 조직에서는 BC 요구사항이 공급업체 선정·계약 조건에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L05-AC (책임성): 우리 조직에서는 BC 요구사항이 공급업체 선정·계약 조건에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L05-TM (최신성): 우리 조직에서는 BC 요구사항이 바뀌면, 공급업체 선정·계약 조건에 정해진 기간 안에 반영된다.

### L06 · BIA BIA·중요도 분석 → STR BC 전략·솔루션 결정·선정

- 영역: ② 전략·계획·이행 · 관계동사: **근거가 된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A14] (Arias p.15, §4.3): "After the completion of the business impact assessment and criticality analysis process, the approved business continuity requirements guide the determination and selection of suitable BC strategies and solutions"
  - 번역: BIA·중요도 분석 프로세스가 완료된 후, 승인된 업무연속성 요구사항이 적절한 BC 전략·솔루션의 결정과 선정을 안내한다.
- ▷ 보조 인용 [A13] (Arias p.15, §4.3): "The final result is a documented statement accompanied by a rationale outlining the organization's business continuity requirements."
  - 번역: 최종 결과는 조직의 업무연속성 요구사항을 개괄하는, 근거가 첨부된 문서화된 진술이다.
- ▷ 보조 인용 [A37] (Arias p.15, §4.3): "This procedure involves systematic prioritization of products, services, processes, and activities, followed by comprehensive analysis, consolidation, and securing of executive approval of the BIA findings."
  - 번역: 이 절차는 제품·서비스·프로세스·활동의 체계적 우선순위화, 이어지는 종합 분석·통합, 그리고 BIA 결과에 대한 경영진 승인 확보를 포함한다.
- 인용이 확립하는 사실: BIA·중요도 분석이 완료된 후, 승인된 업무연속성 요구사항이 BC 전략·솔루션의 결정·선정을 안내(guide)한다. BIA 결과는 경영진 승인을 거친다.
- ▶ 연구자 의견(해석·보완·가정): "guide"를 informs(입력·기준)로 해석.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L06-CO (정합성): 우리 조직에서는 승인된 BIA 결과가 전략·솔루션 선정의 근거가 될 때, 두 내용이 서로 모순 없이 일치한다.
  - L06-TR (추적성): 우리 조직에서는 전략·솔루션 선정 결과에서 근거가 된 승인된 BIA 결과를 거슬러 찾아 확인할 수 있다.
  - L06-EV (증빙성): 우리 조직에서는 승인된 BIA 결과가 전략·솔루션 선정의 근거가 될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L06-AC (책임성): 우리 조직에서는 승인된 BIA 결과가 전략·솔루션 선정의 근거가 될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L06-TM (최신성): 우리 조직에서는 승인된 BIA 결과가 바뀌면, 전략·솔루션 선정 결과에 정해진 기간 안에 반영된다.

### L07 · STR BC 전략·솔루션 결정·선정 → IMP 솔루션 이행관리

- 영역: ② 전략·계획·이행 · 관계동사: **도출·이행된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A15] (Arias p.15, §4.3): "This process ensures that the BC strategies, solutions, and necessary changes are executed as planned."
  - 번역: 이 프로세스는 BC 전략, 솔루션 및 필요한 변경이 계획대로 실행되도록 보장한다.
- ▷ 보조 인용 [A36] (Arias p.15, §4.3): "The solution implementation management process involves initiating and verifying BC strategies, solutions, and changes that may result thereof."
  - 번역: 솔루션 이행관리 프로세스는 BC 전략·솔루션 및 그로부터 발생할 수 있는 변경을 개시하고 검증하는 것을 포함한다.
- 인용이 확립하는 사실: 솔루션 이행관리 프로세스는 BC 전략·솔루션과 필요한 변경이 계획대로 실행되도록 보장하며, 이를 개시하고 검증한다.
- ▶ 연구자 의견(해석·보완·가정): 인용문의 주어는 이행관리이고 대상은 전략·솔루션이므로 "STR이 IMP에서 구체화·실행된다"(STR→IMP)로 방향을 해석. A36은 이행관리가 전략·솔루션을 "verifying"한다고 서술하며, 이는 정합성·증빙성 문항에서 "확인하는 행위"를 구체화할 때 참고했다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L07-CO (정합성): 우리 조직에서는 선정된 전략·솔루션이 솔루션 이행 계획으로 구체화되어 실행될 때, 두 내용이 서로 모순 없이 일치한다.
  - L07-TR (추적성): 우리 조직에서는 솔루션 이행 계획에서 근거가 된 선정된 전략·솔루션을 거슬러 찾아 확인할 수 있다.
  - L07-EV (증빙성): 우리 조직에서는 선정된 전략·솔루션이 솔루션 이행 계획으로 구체화되어 실행될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L07-AC (책임성): 우리 조직에서는 선정된 전략·솔루션이 솔루션 이행 계획으로 구체화되어 실행될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L07-TM (최신성): 우리 조직에서는 선정된 전략·솔루션이 바뀌면, 솔루션 이행 계획에 정해진 기간 안에 반영된다.

### L08 · STR BC 전략·솔루션 결정·선정 → PLAN BC 계획·절차 개발

- 영역: ② 전략·계획·이행 · 관계동사: **도출·이행된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A16] (Arias p.15, §4.3): "Corresponding BC plans and procedures, derived from the identified BC strategies and solutions, are developed within the process of developing BC plans and procedures."
  - 번역: 식별된 BC 전략·솔루션에서 도출된 해당 BC 계획·절차는 BC 계획·절차 개발 프로세스 안에서 개발된다.
- 인용이 확립하는 사실: BC 계획·절차는 식별된 BC 전략·솔루션에서 도출(derived)되어 개발된다.
- ▶ 연구자 의견(해석·보완·가정): "derived from"을 elaboratedInto(S의 내용이 T로 구체화됨)로 해석.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L08-CO (정합성): 우리 조직에서는 선정된 전략·솔루션에서 BC 계획·절차가 도출될 때, 두 내용이 서로 모순 없이 일치한다.
  - L08-TR (추적성): 우리 조직에서는 BC 계획·절차에서 근거가 된 선정된 전략·솔루션을 거슬러 찾아 확인할 수 있다.
  - L08-EV (증빙성): 우리 조직에서는 선정된 전략·솔루션에서 BC 계획·절차가 도출될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L08-AC (책임성): 우리 조직에서는 선정된 전략·솔루션에서 BC 계획·절차가 도출될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L08-TM (최신성): 우리 조직에서는 선정된 전략·솔루션이 바뀌면, BC 계획·절차에 정해진 기간 안에 반영된다.

### L09 · RA 리스크평가 → PLAN BC 계획·절차 개발

- 영역: ② 전략·계획·이행 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A17] (Arias p.15, §4.3): "Furthermore, it includes risks associated with proposed changes, providing essential input for both communication activities and the development of business continuity plans and procedures."
  - 번역: 또한 (리스크평가는) 제안된 변경과 관련된 리스크를 포함하며, 커뮤니케이션 활동과 업무연속성 계획·절차 개발 모두에 필수적인 입력을 제공한다.
- 인용이 확립하는 사실: 리스크평가는 업무연속성 계획·절차 개발에 필수적인 입력(essential input)을 제공한다.
- ▶ 연구자 의견(해석·보완·가정): A17의 주어 "it"이 리스크평가 프로세스임은 앞 문장의 주어에서 연구자가 확인한 지시 관계.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L09-CO (정합성): 우리 조직에서는 리스크평가 결과(위협 시나리오)가 BC 계획·절차 개발에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L09-TR (추적성): 우리 조직에서는 BC 계획·절차에서 근거가 된 리스크평가 결과를 거슬러 찾아 확인할 수 있다.
  - L09-EV (증빙성): 우리 조직에서는 리스크평가 결과(위협 시나리오)가 BC 계획·절차 개발에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L09-AC (책임성): 우리 조직에서는 리스크평가 결과(위협 시나리오)가 BC 계획·절차 개발에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L09-TM (최신성): 우리 조직에서는 리스크평가 결과가 바뀌면, BC 계획·절차에 정해진 기간 안에 반영된다.

### L10 · RES 자원관리 → IMP 솔루션 이행관리

- 영역: ② 전략·계획·이행 · 관계동사: **제공한다** · **증거유형 E2** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- ▷ 보조 인용 [B16] (Białas p.4, §2.8 (Fig.1 설명)): "supportedByResource slot contains three individuals of resources used to manage and maintain BCMS within this organization"
  - 번역: supportedByResource slot은 이 조직 안에서 BCMS를 관리·유지하는 데 쓰이는 세 개의 자원 개체를 담는다.
- 인용이 확립하는 사실: 자원관리의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원이 포함된다. 전략 실행에 필요한 자원은 자원관리에서 식별·배정·모니터링된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 보완] 인용문은 "selected strategies의 implementing and running"을 위한 자원이라고만 쓰며 도착 프로세스를 특정하지 않는다. 이를 솔루션 이행관리(IMP)로 특정한 것은 연구자 해석(운영(running)은 IMP 외 프로세스일 수도 있음).
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: Białas는 supportedByResource slot으로 BCMS를 지원하는 자원 개체를 둔다(B16). 프로세스 간 연결은 아님.
- 검증 필요: 전문가 패널에서 도착 프로세스(IMP)가 적절한지 평가. 부적절하면 도착을 "핵심 프로세스 전반"으로 변경

  - L10-CO (정합성): 우리 조직에서는 솔루션 구현·운영에 필요한 자원이 자원관리에서 제공될 때, 두 내용이 서로 모순 없이 일치한다.
  - L10-TR (추적성): 우리 조직에서는 자원 배정 계획에서 근거가 된 솔루션의 필요 자원 요건을 거슬러 찾아 확인할 수 있다.
  - L10-EV (증빙성): 우리 조직에서는 솔루션 구현·운영에 필요한 자원이 자원관리에서 제공될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L10-AC (책임성): 우리 조직에서는 솔루션 구현·운영에 필요한 자원이 자원관리에서 제공될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L10-TM (최신성): 우리 조직에서는 솔루션의 필요 자원 요건이 바뀌면, 자원 배정 계획에 정해진 기간 안에 반영된다.

### L11 · BIA BIA·중요도 분석 → RES 자원관리

- 영역: ② 전략·계획·이행 · 관계동사: **입력된다·활용된다** · **증거유형 E3** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용: 원문에 S→T 연결 서술 없음
- ▷ 보조 인용 [B10] (Białas p.6, §2.8 (Fig.4 설명)): "resources required for these services resumption"
  - 번역: 이들 서비스 재개에 필요한 자원
- ▷ 보조 인용 [B11] (Białas p.6, §2.8 (Fig.4 설명)): "looks for business impact analysis (BIA) reports related to the two following issues"
  - 번역: (업무연속성 관리자가) 다음 두 가지 사안과 관련된 BIA 보고서를 찾는다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- 인용이 확립하는 사실: Białas는 BIA 보고서를 "서비스 재개에 필요한 자원"으로 질의하는 예를 보여 준다. Arias는 자원관리가 전략·BCMS 프로세스 실행에 필요한 자원을 식별한다고만 서술한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 가정] BIA가 파악한 복구 필요 자원이 자원관리 계획에 투입된다는 연결은 Arias에 서술이 없다. Białas의 예는 프로세스 간 연결이 아니라 BIA 보고서 내부 속성(자원 항목)을 질의하는 수준이므로 유추 근거에 그친다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: Białas §2.8 Fig.4 설명(B10, B11): BIAreport의 resour4Resumption 속성
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제(Arias A44 판정 틀 준용)

  - L11-CO (정합성): 우리 조직에서는 BIA에서 파악한 복구 필요 자원이 자원 계획에 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L11-TR (추적성): 우리 조직에서는 자원 계획에서 근거가 된 BIA의 복구 필요 자원을 거슬러 찾아 확인할 수 있다.
  - L11-EV (증빙성): 우리 조직에서는 BIA에서 파악한 복구 필요 자원이 자원 계획에 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L11-AC (책임성): 우리 조직에서는 BIA에서 파악한 복구 필요 자원이 자원 계획에 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L11-TM (최신성): 우리 조직에서는 BIA의 복구 필요 자원이 바뀌면, 자원 계획에 정해진 기간 안에 반영된다.

### L12 · PLAN BC 계획·절차 개발 → INC 사고·비상 대응

- 영역: ③ 대응·복구·훈련 · 관계동사: **도출·이행된다** · **증거유형 E2** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A19] (Arias p.15, §4.3): "The activation of certain BC strategies and solutions is triggered when required, typically in response to a disruptive event, through the execution of BC plans and procedures."
  - 번역: 특정 BC 전략·솔루션의 가동은 필요 시, 통상 중단 사건에 대응하여, BC 계획·절차의 실행을 통해 개시된다.
- ▷ 보조 인용 [A20] (Arias p.15, §4.3): "facilitating appropriate alerting of potentially affected parties and coordinating responses within the organization's BC plans and procedures"
  - 번역: (경보·커뮤니케이션은) 영향을 받을 수 있는 당사자에 대한 적절한 경보를 촉진하고 조직의 BC 계획·절차 안에서 대응을 조정한다.
- 인용이 확립하는 사실: BC 전략·솔루션의 가동은 중단 사건에 대응하여 BC 계획·절차의 실행을 통해 개시된다. 경보·커뮤니케이션은 조직의 BC 계획·절차 안에서 대응을 조정한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 보완] 인용문은 "BC 계획·절차가 중단 사건 대응 시 실행된다"고 쓰지만 도착 프로세스를 "사고·비상 대응"으로 명시하지 않는다. 사고·비상 대응이 "중단 사건 관리의 포괄적 접근"을 정의한다는 같은 쪽 서술과 결합해 PLAN→INC로 해석.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L12-CO (정합성): 우리 조직에서는 BC 계획·절차에 따라 사고 대응 체계가 가동될 때, 두 내용이 서로 모순 없이 일치한다.
  - L12-TR (추적성): 우리 조직에서는 사고 대응 체계(역할·가동 기준)에서 근거가 된 BC 계획·절차를 거슬러 찾아 확인할 수 있다.
  - L12-EV (증빙성): 우리 조직에서는 BC 계획·절차에 따라 사고 대응 체계가 가동될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L12-AC (책임성): 우리 조직에서는 BC 계획·절차에 따라 사고 대응 체계가 가동될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L12-TM (최신성): 우리 조직에서는 BC 계획·절차가 바뀌면, 사고 대응 체계(역할·가동 기준)에 정해진 기간 안에 반영된다.

### L13 · INC 사고·비상 대응 → WARN 경보·커뮤니케이션

- 영역: ③ 대응·복구·훈련 · 관계동사: **포함한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A21] (Arias p.15, §4.3): "It includes two primary subprocesses: the warning and communication process and the recovery process."
  - 번역: (사고·비상 대응 프로세스는) 경보·커뮤니케이션 프로세스와 복구 프로세스라는 두 가지 주요 하위 프로세스를 포함한다.
- ▷ 보조 인용 [A20] (Arias p.15, §4.3): "facilitating appropriate alerting of potentially affected parties and coordinating responses within the organization's BC plans and procedures"
  - 번역: (경보·커뮤니케이션은) 영향을 받을 수 있는 당사자에 대한 적절한 경보를 촉진하고 조직의 BC 계획·절차 안에서 대응을 조정한다.
- 인용이 확립하는 사실: 사고·비상 대응 프로세스는 두 개의 주요 하위 프로세스(경보·커뮤니케이션, 복구)를 포함한다. 경보·커뮤니케이션은 BC 계획·절차 안에서 대응을 조정한다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] "subprocess"는 정보 흐름이 아니라 포함 관계(contains)이다. 연계성 측정에서는 "하위 프로세스가 상위 대응 절차 안에 통합되어 실제 운영되는가"를 지표화했다. Arias는 Table 5에서 경보·커뮤니케이션을 별도 프로세스로도 목록화(p.14)하므로 포함 관계를 연결로 측정할지는 연구자 결정 사항.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 "포함 관계를 연계성으로 볼 것인가" 별도 평가

  - L13-CO (정합성): 우리 조직에서는 경보·상황 전파가 사고 대응 절차의 하위 절차로 수행될 때, 두 내용이 서로 모순 없이 일치한다.
  - L13-TR (추적성): 우리 조직에서는 경보·연락 절차(연락망)에서 근거가 된 사고 대응 절차를 거슬러 찾아 확인할 수 있다.
  - L13-EV (증빙성): 우리 조직에서는 경보·상황 전파가 사고 대응 절차의 하위 절차로 수행될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L13-AC (책임성): 우리 조직에서는 경보·상황 전파가 사고 대응 절차의 하위 절차로 수행될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L13-TM (최신성): 우리 조직에서는 사고 대응 절차가 바뀌면, 경보·연락 절차(연락망)에 정해진 기간 안에 반영된다.

### L14 · INC 사고·비상 대응 → REC 복구

- 영역: ③ 대응·복구·훈련 · 관계동사: **포함한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A21] (Arias p.15, §4.3): "It includes two primary subprocesses: the warning and communication process and the recovery process."
  - 번역: (사고·비상 대응 프로세스는) 경보·커뮤니케이션 프로세스와 복구 프로세스라는 두 가지 주요 하위 프로세스를 포함한다.
- ▷ 보조 인용 [A22] (Arias p.15, §4.3): "The recovery process, on the other hand, involves restoring and resuming regular business activities from the state of temporary measures that have been adopted to support normal operations during and after a disruption."
  - 번역: 복구 프로세스는 중단 중·후 정상 운영을 지원하기 위해 채택한 임시 조치 상태에서 일상 업무 활동을 회복·재개하는 것을 포함한다.
- 인용이 확립하는 사실: 사고·비상 대응 프로세스는 복구 프로세스를 하위 프로세스로 포함한다. 복구는 임시 조치 상태에서 일상 업무를 회복·재개하는 것이다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] L13과 같은 이유로 포함 관계를 지표화. "대응 결과를 복구가 이어받는다"는 문항의 표현은 연구자의 지표화이며 인용문이 직접 말하는 내용이 아니다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 포함 관계 지표화 적절성 평가

  - L14-CO (정합성): 우리 조직에서는 복구가 사고 대응의 하위 절차로 수행되어 대응 결과를 이어받을 때, 두 내용이 서로 모순 없이 일치한다.
  - L14-TR (추적성): 우리 조직에서는 복구 절차에서 근거가 된 사고 대응 절차를 거슬러 찾아 확인할 수 있다.
  - L14-EV (증빙성): 우리 조직에서는 복구가 사고 대응의 하위 절차로 수행되어 대응 결과를 이어받을 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L14-AC (책임성): 우리 조직에서는 복구가 사고 대응의 하위 절차로 수행되어 대응 결과를 이어받을 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L14-TM (최신성): 우리 조직에서는 사고 대응 절차가 바뀌면, 복구 절차에 정해진 기간 안에 반영된다.

### L15 · PLAN BC 계획·절차 개발 → EXE BC 계획·절차 훈련·연습

- 영역: ③ 대응·복구·훈련 · 관계동사: **시험·검증된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A23] (Arias p.15, §4.3): "The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."
  - 번역: BC 계획·절차 훈련·연습 프로세스는 BC 전략·솔루션과 이에 대응하는 BC 계획·절차(경보·커뮤니케이션 절차 포함)가 정기적으로 시험되어 그 유효성을 검증하고 필요한 조정·개선을 촉구하도록 보장한다.
- 인용이 확립하는 사실: BC 전략·솔루션과 BC 계획·절차(경보·커뮤니케이션 절차 포함)는 정기적으로 시험되어 유효성이 검증된다.
- ▶ 연구자 의견(해석·보완·가정): "tested regularly to validate their effectiveness"를 testedBy(S가 T에 의해 시험됨)로 해석. 훈련·연습 시나리오 설계 방식은 연구자의 지표화.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L15-CO (정합성): 우리 조직에서는 BC 계획·절차가 훈련·연습으로 시험될 때, 두 내용이 서로 모순 없이 일치한다.
  - L15-TR (추적성): 우리 조직에서는 훈련·연습 시나리오에서 근거가 된 BC 계획·절차를 거슬러 찾아 확인할 수 있다.
  - L15-EV (증빙성): 우리 조직에서는 BC 계획·절차가 훈련·연습으로 시험될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L15-AC (책임성): 우리 조직에서는 BC 계획·절차가 훈련·연습으로 시험될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L15-TM (최신성): 우리 조직에서는 BC 계획·절차가 바뀌면, 훈련·연습 시나리오에 정해진 기간 안에 반영된다.

### L16 · EXE BC 계획·절차 훈련·연습 → PLAN BC 계획·절차 개발

- 영역: ③ 대응·복구·훈련 · 관계동사: **개정·갱신한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A23] (Arias p.15, §4.3): "The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."
  - 번역: BC 계획·절차 훈련·연습 프로세스는 BC 전략·솔루션과 이에 대응하는 BC 계획·절차(경보·커뮤니케이션 절차 포함)가 정기적으로 시험되어 그 유효성을 검증하고 필요한 조정·개선을 촉구하도록 보장한다.
- 인용이 확립하는 사실: 연습은 필요한 조정·개선(adjustments or enhancements)을 촉구(prompt)한다.
- ▶ 연구자 의견(해석·보완·가정): 조정 대상은 인용문상 "전략·솔루션·계획·절차" 모두이나 본 연결은 BC 계획·절차로 한정(연구자 한정). 방향 해석(EXE의 결과가 PLAN을 개정)은 연구자 해석.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L16-CO (정합성): 우리 조직에서는 연습 결과(문제점·개선 사항)가 BC 계획·절차의 개정으로 이어질 때, 두 내용이 서로 모순 없이 일치한다.
  - L16-TR (추적성): 우리 조직에서는 BC 계획·절차에서 근거가 된 연습 결과를 거슬러 찾아 확인할 수 있다.
  - L16-EV (증빙성): 우리 조직에서는 연습 결과(문제점·개선 사항)가 BC 계획·절차의 개정으로 이어질 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L16-AC (책임성): 우리 조직에서는 연습 결과(문제점·개선 사항)가 BC 계획·절차의 개정으로 이어질 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L16-TM (최신성): 우리 조직에서는 새 연습 결과가 나오면, BC 계획·절차에 정해진 기간 안에 반영된다.
  - L16-FC (환류폐쇄성): 우리 조직에서는 연습에서 문제점·개선 사항이 나오면, BC 계획·절차의 재수정까지 조치가 이어져 완료가 확인된다.

### L17 · PLAN BC 계획·절차 개발 → AWR 인식·역량·교육

- 영역: ③ 대응·복구·훈련 · 관계동사: **입력된다·활용된다** · **증거유형 E3** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용: 원문에 S→T 연결 서술 없음
- ▷ 보조 인용 [A24] (Arias p.15, §4.3): "a business continuity awareness, training, and education program is developed and implemented to foster necessary awareness and competence among personnel"
  - 번역: 업무연속성 인식·훈련·교육 프로그램이 개발·이행되어 인력의 필요한 인식과 역량을 키운다.
- ▷ 보조 인용 [B12] (Białas p.5, §2.8 (Fig.3 설명)): "Please note the person responsible for trainings, expressed by a certain role, engaged resources for trainings, needs, programs, detailed activities, results and records"
  - 번역: 훈련 책임자(역할로 표현), 훈련에 투입된 자원, 필요, 프로그램, 세부 활동, 결과, 기록에 유의하라.
- 인용이 확립하는 사실: Arias는 인식·훈련·교육 프로그램이 인력의 인식과 역량을 키운다고만 서술하며 계획·절차와의 연결은 서술하지 않는다. Białas는 훈련 활동에 "필요(needs)"를 별도 항목으로 둔다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 가정] 교육 내용이 BC 계획·절차(역할 포함)에서 도출·반영된다는 연결은 두 논문에 직접 근거가 없다. 인력이 계획과 자기 역할을 알아야 계획이 실행된다는 연구자 판단에 기초한다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: Białas §2.8 Fig.3 설명(B12): 훈련의 needs, programs, results, records
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제

  - L17-CO (정합성): 우리 조직에서는 BC 계획·절차와 역할이 인식·교육 프로그램의 내용으로 입력될 때, 두 내용이 서로 모순 없이 일치한다.
  - L17-TR (추적성): 우리 조직에서는 교육 프로그램 내용에서 근거가 된 BC 계획·절차를 거슬러 찾아 확인할 수 있다.
  - L17-EV (증빙성): 우리 조직에서는 BC 계획·절차와 역할이 인식·교육 프로그램의 내용으로 입력될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L17-AC (책임성): 우리 조직에서는 BC 계획·절차와 역할이 인식·교육 프로그램의 내용으로 입력될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L17-TM (최신성): 우리 조직에서는 BC 계획·절차가 바뀌면, 교육 프로그램 내용에 정해진 기간 안에 반영된다.

### L18 · PERF 성과평가 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계동사: **환류된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 성과평가의 결과는 BCMS 및 전략·솔루션·계획·절차의 효과성·효율성·적합성·충분성을 개선하는 데 사용되며, 이는 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): A25는 3개 출처를 한 문장에 열거하므로 L18·L19·L20은 연구자가 분리한 연결.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L18-CO (정합성): 우리 조직에서는 성과평가 결과가 개선 과제로 환류될 때, 두 내용이 서로 모순 없이 일치한다.
  - L18-TR (추적성): 우리 조직에서는 개선 과제 목록에서 근거가 된 성과평가 결과를 거슬러 찾아 확인할 수 있다.
  - L18-EV (증빙성): 우리 조직에서는 성과평가 결과가 개선 과제로 환류될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L18-AC (책임성): 우리 조직에서는 성과평가 결과가 개선 과제로 환류될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L18-TM (최신성): 우리 조직에서는 새 성과평가 결과가 나오면, 개선 과제 목록에 정해진 기간 안에 반영된다.
  - L18-FC (환류폐쇄성): 우리 조직에서는 성과평가에서 개선이 필요한 결과가 나오면, 개선 과제의 수립·이행과 효과 확인까지 조치가 이어져 완료가 확인된다.

### L19 · AUD 내부감사 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계동사: **환류된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 내부감사의 결과는 BCMS 개선에 사용되며, 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L18과 동일.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L19-CO (정합성): 우리 조직에서는 내부감사 지적사항이 개선 과제로 환류될 때, 두 내용이 서로 모순 없이 일치한다.
  - L19-TR (추적성): 우리 조직에서는 개선 과제 목록에서 근거가 된 내부감사 결과를 거슬러 찾아 확인할 수 있다.
  - L19-EV (증빙성): 우리 조직에서는 내부감사 지적사항이 개선 과제로 환류될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L19-AC (책임성): 우리 조직에서는 내부감사 지적사항이 개선 과제로 환류될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L19-TM (최신성): 우리 조직에서는 새 내부감사 결과가 나오면, 개선 과제 목록에 정해진 기간 안에 반영된다.
  - L19-FC (환류폐쇄성): 우리 조직에서는 내부감사에서 지적사항이 나오면, 시정조치의 이행과 후속 확인까지 조치가 이어져 완료가 확인된다.

### L20 · SUP 공급망관리 → CI 지속적 개선

- 영역: ④ 평가·개선·변경 · 관계동사: **환류된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A25] (Arias p.16, §4.3): "Results from the performance evaluation process, the internal audit process, and the supply chain management process are used to improve the effectiveness, efficiency, suitability, and adequacy of the BCMS and the strategies, solutions, plans, and procedures."
  - 번역: 성과평가, 내부감사, 공급망관리 프로세스의 결과는 BCMS와 전략·솔루션·계획·절차의 효과성, 효율성, 적합성, 충분성을 개선하는 데 사용된다.
- ▷ 보조 인용 [A46] (Arias p.16, §4.3): "This is realized within the continual improvement process."
  - 번역: 이는 지속적 개선 프로세스 안에서 실현된다.
- 인용이 확립하는 사실: 공급망관리의 결과는 BCMS 개선에 사용되며, 지속적 개선 프로세스에서 실현된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L18과 동일.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L20-CO (정합성): 우리 조직에서는 공급업체 평가 결과가 개선 과제로 환류될 때, 두 내용이 서로 모순 없이 일치한다.
  - L20-TR (추적성): 우리 조직에서는 개선 과제 목록에서 근거가 된 공급업체 평가 결과를 거슬러 찾아 확인할 수 있다.
  - L20-EV (증빙성): 우리 조직에서는 공급업체 평가 결과가 개선 과제로 환류될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L20-AC (책임성): 우리 조직에서는 공급업체 평가 결과가 개선 과제로 환류될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L20-TM (최신성): 우리 조직에서는 새 공급업체 평가 결과가 나오면, 개선 과제 목록에 정해진 기간 안에 반영된다.
  - L20-FC (환류폐쇄성): 우리 조직에서는 공급업체 평가에서 개선이 필요한 결과가 나오면, 개선 과제의 수립·이행과 효과 확인까지 조치가 이어져 완료가 확인된다.

### L21 · CHG BC 변경관리 → RA 리스크평가

- 영역: ④ 평가·개선·변경 · 관계동사: **수행을 촉발한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A27] (Arias p.16, §4.3 (변경관리 산출물 3번째)): "Initiation of risk assessment in response to significant proposed or occurring changes; and"
  - 번역: 중대한 제안·발생 변경에 대응한 리스크평가의 개시.
- ▷ 보조 인용 [A26] (Arias p.16, §4.3 (변경관리 산출물 2번째)): "Proposed and necessary changes, as well as results of changes (for and from the risk assessment process);"
  - 번역: 제안된 변경과 필요한 변경, 그리고 변경의 결과(리스크평가 프로세스로 가는 것과 그로부터 오는 것).
- 인용이 확립하는 사실: BC 변경관리의 산출물에는 중대한 제안·발생 변경에 대응한 리스크평가의 개시, 그리고 리스크평가와 오가는 제안·필요 변경 및 변경 결과가 포함된다.
- ▶ 연구자 의견(해석·보완·가정): A26의 "for and from"은 양방향 흐름을 시사하나 본 연결은 CHG→RA 방향만 채택하고 반대 방향은 보류연결 H02에 기록(연구자 판단).
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L21-CO (정합성): 우리 조직에서는 중대한 변경이 발생해 리스크평가가 촉발될 때, 두 내용이 서로 모순 없이 일치한다.
  - L21-TR (추적성): 우리 조직에서는 리스크평가 대상과 결과에서 근거가 된 BCMS 변경 사항을 거슬러 찾아 확인할 수 있다.
  - L21-EV (증빙성): 우리 조직에서는 중대한 변경이 발생해 리스크평가가 촉발될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L21-AC (책임성): 우리 조직에서는 중대한 변경이 발생해 리스크평가가 촉발될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L21-TM (최신성): 우리 조직에서는 BCMS에 중대한 변경이 생기면, 리스크평가 대상과 결과에 정해진 기간 안에 반영된다.

### L22 · CHG BC 변경관리 → DOC 문서화된 정보 통제

- 영역: ④ 평가·개선·변경 · 관계동사: **개정·갱신한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A28] (Arias p.16, §4.3 (변경관리 산출물 1번째)): "Necessary changes (for the process of controlling documented information);"
  - 번역: 필요한 변경(문서화된 정보 통제 프로세스를 위한 것).
- ▷ 보조 인용 [A41] (Arias p.16, §4.3): "The process of controlling documented information involves identifying, creating, updating, and controlling information essential for the effectiveness of the BCMS."
  - 번역: 문서화된 정보 통제 프로세스는 BCMS의 효과성에 필수적인 정보를 식별·작성·갱신·통제하는 것을 포함한다.
- 인용이 확립하는 사실: BC 변경관리의 산출물에는 문서화된 정보 통제 프로세스를 위한 필요한 변경이 포함된다. 문서화된 정보 통제는 정보의 식별·작성·갱신·통제를 포함한다.
- ▶ 연구자 의견(해석·보완·가정): A41의 "updating"은 최신성 차원의 정의를 고안할 때 참고했으며, 최신성의 정의 자체는 연구자 정의.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L22-CO (정합성): 우리 조직에서는 승인된 변경이 관련 문서의 개정으로 이어질 때, 두 내용이 서로 모순 없이 일치한다.
  - L22-TR (추적성): 우리 조직에서는 관련 문서(계획·절차·연락망 등)에서 근거가 된 승인된 변경을 거슬러 찾아 확인할 수 있다.
  - L22-EV (증빙성): 우리 조직에서는 승인된 변경이 관련 문서의 개정으로 이어질 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L22-AC (책임성): 우리 조직에서는 승인된 변경이 관련 문서의 개정으로 이어질 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L22-TM (최신성): 우리 조직에서는 변경이 승인되면, 관련 문서(계획·절차·연락망 등)에 정해진 기간 안에 반영된다.

### L23 · INC 사고·비상 대응 → CHG BC 변경관리

- 영역: ④ 평가·개선·변경 · 관계동사: **수행을 촉발한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 사고·비상 대응이 개시한 변경의 결과가 변경관리의 산출물에 포함된다("as those processes initiated them").
- ▶ 연구자 의견(해석·보완·가정): "initiated"를 triggers(S의 사건·결과가 T의 수행을 개시)로 해석. A29는 INC·EXE와 변경 결과 방향을 한 문장에 담으므로 L23~L26은 연구자가 분리한 4개 연결.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L23-CO (정합성): 우리 조직에서는 사고 대응에서 나온 변경 필요사항이 변경관리를 촉발할 때, 두 내용이 서로 모순 없이 일치한다.
  - L23-TR (추적성): 우리 조직에서는 변경관리 요청 목록에서 근거가 된 사고 대응 결과를 거슬러 찾아 확인할 수 있다.
  - L23-EV (증빙성): 우리 조직에서는 사고 대응에서 나온 변경 필요사항이 변경관리를 촉발할 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L23-AC (책임성): 우리 조직에서는 사고 대응에서 나온 변경 필요사항이 변경관리를 촉발할 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L23-TM (최신성): 우리 조직에서는 새 사고 대응 결과가 나오면, 변경관리 요청 목록에 정해진 기간 안에 반영된다.
  - L23-FC (환류폐쇄성): 우리 조직에서는 사고 대응에서 변경 필요사항이 나오면, 변경 요청의 처리와 관련 문서의 재수정까지 조치가 이어져 완료가 확인된다.

### L24 · EXE BC 계획·절차 훈련·연습 → CHG BC 변경관리

- 영역: ④ 평가·개선·변경 · 관계동사: **수행을 촉발한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 훈련·연습이 개시한 변경의 결과가 변경관리의 산출물에 포함된다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L24-CO (정합성): 우리 조직에서는 연습에서 나온 변경 필요사항이 변경관리를 촉발할 때, 두 내용이 서로 모순 없이 일치한다.
  - L24-TR (추적성): 우리 조직에서는 변경관리 요청 목록에서 근거가 된 연습 결과를 거슬러 찾아 확인할 수 있다.
  - L24-EV (증빙성): 우리 조직에서는 연습에서 나온 변경 필요사항이 변경관리를 촉발할 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L24-AC (책임성): 우리 조직에서는 연습에서 나온 변경 필요사항이 변경관리를 촉발할 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L24-TM (최신성): 우리 조직에서는 새 연습 결과가 나오면, 변경관리 요청 목록에 정해진 기간 안에 반영된다.
  - L24-FC (환류폐쇄성): 우리 조직에서는 연습에서 변경 필요사항이 나오면, 변경 요청의 처리와 관련 문서의 재수정까지 조치가 이어져 완료가 확인된다.

### L25 · CHG BC 변경관리 → INC 사고·비상 대응

- 영역: ④ 평가·개선·변경 · 관계동사: **환류된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 변경의 결과가 사고·비상 대응 프로세스로 돌아간다("The results of changes to the incident and emergency handling process").
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일. "results of changes to"를 updates(변경이 T의 내용을 개정)로 해석.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L25-CO (정합성): 우리 조직에서는 승인된 변경의 결과가 사고 대응 절차로 환류될 때, 두 내용이 서로 모순 없이 일치한다.
  - L25-TR (추적성): 우리 조직에서는 사고 대응 절차에서 근거가 된 승인된 변경을 거슬러 찾아 확인할 수 있다.
  - L25-EV (증빙성): 우리 조직에서는 승인된 변경의 결과가 사고 대응 절차로 환류될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L25-AC (책임성): 우리 조직에서는 승인된 변경의 결과가 사고 대응 절차로 환류될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L25-TM (최신성): 우리 조직에서는 승인된 변경이 새로 나오면, 사고 대응 절차에 정해진 기간 안에 반영된다.
  - L25-FC (환류폐쇄성): 우리 조직에서는 변경이 승인되면, 사고 대응 절차의 재수정까지 조치가 이어져 완료가 확인된다.

### L26 · CHG BC 변경관리 → EXE BC 계획·절차 훈련·연습

- 영역: ④ 평가·개선·변경 · 관계동사: **환류된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성, 환류폐쇄성
- ▶ 인용 [A29] (Arias p.16, §4.3 (변경관리 산출물 4번째)): "The results of changes to the incident and emergency handling process or the process of exercising BC plans and procedures—as those processes initiated them."
  - 번역: 사고·비상 대응 프로세스 또는 BC 계획·절차 훈련·연습 프로세스에 대한 변경의 결과 — 해당 프로세스들이 변경을 개시한 경우.
- 인용이 확립하는 사실: 변경의 결과가 BC 계획·절차 훈련·연습 프로세스로 돌아간다.
- ▶ 연구자 의견(해석·보완·가정): 분리 사유는 L23과 동일.
- ▶ 연구자 의견(차원 적용): 환류 연결: 6개 차원 모두 적용(환류폐쇄성 포함)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L26-CO (정합성): 우리 조직에서는 승인된 변경의 결과가 훈련·연습 절차로 환류될 때, 두 내용이 서로 모순 없이 일치한다.
  - L26-TR (추적성): 우리 조직에서는 훈련·연습 절차와 시나리오에서 근거가 된 승인된 변경을 거슬러 찾아 확인할 수 있다.
  - L26-EV (증빙성): 우리 조직에서는 승인된 변경의 결과가 훈련·연습 절차로 환류될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L26-AC (책임성): 우리 조직에서는 승인된 변경의 결과가 훈련·연습 절차로 환류될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L26-TM (최신성): 우리 조직에서는 승인된 변경이 새로 나오면, 훈련·연습 절차와 시나리오에 정해진 기간 안에 반영된다.
  - L26-FC (환류폐쇄성): 우리 조직에서는 변경이 승인되면, 훈련·연습 절차의 재수정까지 조치가 이어져 완료가 확인된다.

### L27 · 핵심 BCMS 프로세스 전반(집단) → COM 협의·커뮤니케이션

- 영역: ⑤ 거버넌스·이해관계자 · 관계동사: **전달된다** · **증거유형 E1** · 집단 노드 포함 · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A30] (Arias p.16, §4.3): "The outcomes of nearly all BCMS processes are communicated centrally to stakeholders external to the BCMS as part of the consultation and communication process."
  - 번역: 거의 모든 BCMS 프로세스의 결과는 협의·커뮤니케이션 프로세스의 일부로서 BCMS 외부의 이해관계자에게 중앙에서 전달된다.
- ▷ 보조 인용 [A40] (Arias p.16, §4.3): "the consultation and communication process represents the general mode of communication even in the absence of such an event"
  - 번역: 협의·커뮤니케이션 프로세스는 그러한 사건이 없을 때에도 일반적인 커뮤니케이션 방식을 나타낸다.
- 인용이 확립하는 사실: 거의 모든 BCMS 프로세스의 결과가 협의·커뮤니케이션 프로세스를 통해 BCMS 외부 이해관계자에게 중앙에서 전달된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] "nearly all BCMS processes"는 프로세스를 열거하지 않으므로 출발점을 집단 노드 CORE("핵심 BCMS 프로세스 전반")로 처리했다. CORE는 Arias의 객체가 아니라 연구자가 만든 가상 노드이다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 집단 출발점 처리의 적절성 평가

  - L27-CO (정합성): 우리 조직에서는 BCMS 프로세스의 주요 결과가 이해관계자에게 전달될 때, 두 내용이 서로 모순 없이 일치한다.
  - L27-TR (추적성): 우리 조직에서는 이해관계자 보고 내용에서 근거가 된 BCMS 프로세스의 주요 결과를 거슬러 찾아 확인할 수 있다.
  - L27-EV (증빙성): 우리 조직에서는 BCMS 프로세스의 주요 결과가 이해관계자에게 전달될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L27-AC (책임성): 우리 조직에서는 BCMS 프로세스의 주요 결과가 이해관계자에게 전달될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L27-TM (최신성): 우리 조직에서는 BCMS 프로세스의 주요 결과가 크게 바뀌면, 이해관계자 보고 내용에 정해진 기간 안에 반영된다.

### L28 · COM 협의·커뮤니케이션 → GOV BC 거버넌스

- 영역: ⑤ 거버넌스·이해관계자 · 관계동사: **입력된다·활용된다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A31] (Arias p.16, §4.3): "These reports and identified requirements serve as inputs for the BC governance process."
  - 번역: 이 보고와 식별된 요구사항은 BC 거버넌스 프로세스의 입력으로 쓰인다.
- ▷ 보조 인용 [A47] (Arias p.16, §4.3): "It encompasses the communication of risks and reports concerning BC management."
  - 번역: (협의·커뮤니케이션 프로세스는) 리스크와 BC 관리에 관한 보고의 커뮤니케이션을 포함한다.
- 인용이 확립하는 사실: 협의·커뮤니케이션의 보고와 식별된 요구사항은 BC 거버넌스 프로세스의 입력으로 쓰인다.
- ▶ 연구자 의견(해석·보완·가정): "These reports"는 앞 문장(리스크와 BC 관리 보고의 커뮤니케이션)을 가리킨다고 연구자가 확인(A47).
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L28-CO (정합성): 우리 조직에서는 커뮤니케이션 보고와 요구사항이 경영진 검토의 입력이 될 때, 두 내용이 서로 모순 없이 일치한다.
  - L28-TR (추적성): 우리 조직에서는 경영진 검토 안건에서 근거가 된 이해관계자 보고와 요구사항을 거슬러 찾아 확인할 수 있다.
  - L28-EV (증빙성): 우리 조직에서는 커뮤니케이션 보고와 요구사항이 경영진 검토의 입력이 될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L28-AC (책임성): 우리 조직에서는 커뮤니케이션 보고와 요구사항이 경영진 검토의 입력이 될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L28-TM (최신성): 우리 조직에서는 새 보고나 요구사항이 접수되면, 경영진 검토 안건에 정해진 기간 안에 반영된다.

### L29 · GOV BC 거버넌스 → POL BC 정책관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계동사: **도출·이행된다** · **증거유형 E3** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
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
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: Białas §2.8 Fig.2 설명(B13): 목표와 정책이 같은 Plan 단계의 병렬 항목
- 검증 필요: 전문가 합의 필수. 합의 80% 미만이면 삭제

  - L29-CO (정합성): 우리 조직에서는 경영진이 정한 BC 목표·방향에서 BC 정책이 도출될 때, 두 내용이 서로 모순 없이 일치한다.
  - L29-TR (추적성): 우리 조직에서는 BC 정책에서 근거가 된 경영진의 BC 목표·방향을 거슬러 찾아 확인할 수 있다.
  - L29-EV (증빙성): 우리 조직에서는 경영진이 정한 BC 목표·방향에서 BC 정책이 도출될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L29-AC (책임성): 우리 조직에서는 경영진이 정한 BC 목표·방향에서 BC 정책이 도출될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L29-TM (최신성): 우리 조직에서는 경영진의 BC 목표·방향이 바뀌면, BC 정책에 정해진 기간 안에 반영된다.

### L30 · RES 자원관리 → 핵심 BCMS 프로세스 전반(집단)

- 영역: ⑤ 거버넌스·이해관계자 · 관계동사: **제공한다** · **증거유형 E1** · 집단 노드 포함 · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A38] (Arias p.16, §4.3): "Resources necessary for executing strategies and BCMS processes are identified, allocated, and monitored within the resource management process."
  - 번역: 전략과 BCMS 프로세스를 실행하는 데 필요한 자원은 자원관리 프로세스 안에서 식별·배정·모니터링된다.
- 인용이 확립하는 사실: 자원관리의 산출물에는 핵심 BCMS 프로세스 운영을 위한 자원과 BCMS 핵심 프로세스에 대한 자원 사용 보고가 포함된다.
- ▶ 연구자 의견(해석·보완·가정): [연구자 판단] 도착이 "핵심 BCMS 프로세스(복수)"이므로 집단 노드 CORE를 사용(L27과 동일 사유).
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널에서 집단 도착점 처리의 적절성 평가

  - L30-CO (정합성): 우리 조직에서는 자원관리가 핵심 프로세스에 자원과 사용 현황 보고를 제공할 때, 두 내용이 서로 모순 없이 일치한다.
  - L30-TR (추적성): 우리 조직에서는 핵심 프로세스의 자원 배분에서 근거가 된 자원 사용 현황을 거슬러 찾아 확인할 수 있다.
  - L30-EV (증빙성): 우리 조직에서는 자원관리가 핵심 프로세스에 자원과 사용 현황 보고를 제공할 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L30-AC (책임성): 우리 조직에서는 자원관리가 핵심 프로세스에 자원과 사용 현황 보고를 제공할 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L30-TM (최신성): 우리 조직에서는 자원 사용 현황이 바뀌면, 핵심 프로세스의 자원 배분에 정해진 기간 안에 반영된다.

### L31 · RES 자원관리 → CRM 고객관계관리

- 영역: ⑤ 거버넌스·이해관계자 · 관계동사: **제공한다** · **증거유형 E1** · 적용 차원: 정합성, 추적성, 증빙성, 책임성, 최신성
- ▶ 인용 [A18] (Arias p.16, §4.3): "Outputs from this process include documented resources for implementing and running selected strategies, as well as resources for operating core BCMS processes, along with reports on resource utilization for BCMS core processes and the customer relationship management process"
  - 번역: 이 프로세스(자원관리)의 산출물에는 선정된 전략의 이행·운영을 위한 문서화된 자원, 핵심 BCMS 프로세스 운영을 위한 자원, 그리고 BCMS 핵심 프로세스와 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다.
- ▷ 보조 인용 [A32] (Arias p.16, §4.3): "operational management of customer satisfaction levels and continuous demonstration of the added value of investments in business continuity need to be realized"
  - 번역: 고객 만족 수준의 운영적 관리와 업무연속성 투자의 부가가치에 대한 지속적 입증이 실현되어야 한다(고객관계관리 프로세스에서 수행).
- 인용이 확립하는 사실: 자원관리의 산출물에는 고객관계관리 프로세스에 대한 자원 사용 보고가 포함된다. 고객관계관리는 고객 만족의 운영적 관리와 BC 투자 가치의 지속적 입증을 수행한다.
- ▶ 연구자 의견(해석·보완·가정): 고객관계관리를 "고객 만족·BC 투자 가치 입증"으로 부르는 것은 CRM의 기능을 서술한 A32를 바탕으로 한 연구자의 지표화이며, 인용문이 "자원 보고가 가치 입증에 쓰인다"고 직접 말하는 것은 아니다.
- ▶ 연구자 의견(차원 적용): 5개 차원 적용(환류폐쇄성은 환류 연결에만 적용)
- Białas 대응: 해당 없음
- 검증 필요: 전문가 패널 연결 타당도 평가

  - L31-CO (정합성): 우리 조직에서는 자원 사용 현황 보고가 고객관계관리에 제공될 때, 두 내용이 서로 모순 없이 일치한다.
  - L31-TR (추적성): 우리 조직에서는 고객관계관리 보고에서 근거가 된 자원 사용 현황을 거슬러 찾아 확인할 수 있다.
  - L31-EV (증빙성): 우리 조직에서는 자원 사용 현황 보고가 고객관계관리에 제공될 때, 그 사실을 입증하는 문서·기록·승인(검토 기록, 회의록, 버전 이력 등)이 남아 있다.
  - L31-AC (책임성): 우리 조직에서는 자원 사용 현황 보고가 고객관계관리에 제공될 때, 그 연결의 검토·승인·변경에 대한 책임자(또는 부서)가 정해져 있다.
  - L31-TM (최신성): 우리 조직에서는 자원 사용 현황이 바뀌면, 고객관계관리 보고에 정해진 기간 안에 반영된다.

## 8. 보류·제외한 후보 연결

| ID | 출발→도착 | 후보 | 채택하지 않은 이유 | 권고 |
|---|---|---|---|---|
| H01 | INC→PLAN | 사고 대응 경험을 BC 계획·절차 개정에 반영 | Arias에는 연습(EXE)→계획(L16)만 서술되고 사고 대응→계획 환류는 서술이 없음. 사고 결과는 변경관리(L23)를 거쳐 반영되는 경로만 근거가 있음. | 연구자 결정 필요 |
| H02 | RA→CHG | 리스크평가 결과를 변경 판단에 사용 | A26의 "for and from the risk assessment process"는 양방향을 시사하나 방향이 문장에서 분리되지 않음. 현재는 CHG→RA(L21)만 채택. | 연구자 결정 필요 |
| H03 | EXE→AWR | 연습 결과를 교육 내용에 반영 | 두 논문에 서술 없음. L17(PLAN→AWR)과 중복 가능성. | 제외 권고 |
| H04 | GOV→CRM | 거버넌스와 고객관계관리의 관계 | A32는 두 프로세스를 "In addition to"로 병렬 서술할 뿐 연결을 서술하지 않음. | 제외 권고 |
| H05 | CI→PERF | 개선 결과를 성과평가 지표에 반영 | A25는 성과평가→개선 방향만 서술. 개선 후 지표 갱신은 서술 없음. | 제외 권고 |
| H06 | DOC→전 프로세스 | 문서화된 정보 통제가 모든 프로세스를 지원 | A41은 정보 통제의 내용만 서술하고 프로세스별 연결은 CHG→DOC(L22)만 서술. | 제외 권고 |

## 9. 종합·검증 문항

- DQ01 (정합성(종합)): 우리 조직의 BC 프로세스 간 연결에서 선행 산출물과 후행 의사결정은 모순 없이 일치한다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화 · 인용 A33, A14, A16
- DQ02 (추적성(종합)): 우리 조직에서는 BC 프로세스의 후행 결과에서 근거가 된 선행 산출물을 거슬러 찾아 확인할 수 있다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화
- DQ03 (증빙성(종합)): 우리 조직에서는 BC 프로세스 간 연결을 입증하는 문서·기록·승인이 남아 있다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화 · 인용 B17, A41, A13
- DQ04 (책임성(종합)): 우리 조직에서는 BC 프로세스 간 연결의 검토·승인·변경 책임이 명확하다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화 · 인용 A49, A50, A10
- DQ05 (최신성(종합)): 우리 조직에서는 변경된 정보가 관련 프로세스와 문서에 적시에 반영된다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화 · 인용 A41, A51, A52
- DQ06 (환류폐쇄성(종합)): 우리 조직에서는 훈련·평가·사고 결과가 개선과 재수정까지 완료된다.  
  근거: 첨부 문서의 차원 정의 + 연구자 문항화 · 인용 A23, A25, A46
- DQ07 (연결 품질(전반)): 전반적으로 우리 조직의 BC 프로세스들은 서로 잘 이어져 작동한다.  
  근거: 연구자 의견(수렴 검증용 종합 문항) · 인용 A07
- RV1 (역문항(정합성 대응), 역문항): 우리 조직에서는 프로세스마다 서로 다른 전제나 수치를 써서 결과가 서로 어긋나는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- RV2 (역문항(추적성 대응), 역문항): 우리 조직에서는 후행 결과의 근거가 된 선행 산출물을 찾지 못하는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- RV3 (역문항(최신성 대응), 역문항): 우리 조직에서는 문서가 개정되어도 관련 프로세스의 문서에는 한참 뒤에야 반영되는 경우가 많다.  
  근거: 연구자 의견(검증용 문항)
- RV4 (역문항(환류폐쇄성 대응), 역문항): 우리 조직에서는 연습·감사에서 나온 개선 사항이 완료 확인 없이 방치되는 경우가 많다.  
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

## 10. 한계

1. 연결 31개는 전문가 검증 전 가설이다. Arias는 프로세스가 핵심인지를 검증했을 뿐 연결을 검증하지 않았다(인용 A06).
2. 6개 차원과 "연결 품질" 용어는 연구자가 제시한 초기 가설이다. 두 논문 안에서 추적성은 근거가 없고, 정합성·증빙성·책임성·최신성은 간접 근거, 환류폐쇄성은 비교적 직접 근거다.
3. 외부 학술 문헌 12건은 서지만 확인했고 원문은 열람하지 못했다. 원문 확인 전에는 인용 근거로 확정할 수 없다.
4. 6개 차원은 서로 겹칠 수 있어(특히 정합성·추적성·증빙성) 변별타당도 검증이 필요하다. 환류폐쇄성은 환류 연결 8개에만 적용되어 다른 차원과 문항 수가 다르다.
5. Białas(2010)는 BS 25999 기반 프로토타입이며(B14, B15) 본 연구는 방법만 차용했다.
6. 통계 기준(I-CVI 0.78, α 0.70 등)은 관례이며 논문 근거가 없다.
