# BCMS 프로세스 간 연계성 측정 문항 개발 (V2)

박사논문 프로젝트. 업무연속성경영시스템(BCMS)의 프로세스 간 **연계성**을 측정하는 설문 문항을 개발한다.

> 온톨로지는 "무엇과 무엇의 연결을 측정하는가"를 정하고, 설문은 "그 연결이 조직에서 어느 정도 유지되는가"를 측정한다.

## 근거 문헌

- **Arias** — Arias-Aranda, D.; Haufe, K.; Dzombeta, S.; Stantchev, V. (2026) *Business Continuity Management—Identifying Relevant Processes for a Reference Model.* Applied Sciences 16(7), 3219. https://doi.org/10.3390/app16073219
- **Białas** — Białas, A. (2010) *Ontological approach to the business continuity management system development.* (Institute of Innovative Technologies EMAG, Katowice)

## 이 프로젝트의 원칙

1. **인용과 연구자 의견을 분리한다.** 근거는 PDF 원문과 자동 대조한 영문 인용문(쪽 번호 포함)으로만 제시하고, 해석·가정·분류는 "연구자 의견"으로 따로 적는다.
2. **연구자 의견에 해당하는 용어는 정의한다.** (`data/definitions.json`, 엑셀 `정의서` 시트)
3. **증거유형을 표시한다.** E1 = 원문이 연결을 직접 서술, E2 = 출발·도착 일부를 연구자가 보완, E3 = 원문에 서술 없음(연구자 가정).
4. **Białas에서는 방법만 차용한다.** 클래스·관계 이름은 BS 25999 기반이라 쓰지 않는다.

## 폴더 구성

| 경로 | 내용 |
|---|---|
| `data/` | **원천 데이터(JSON)**: 인용문 64개, 연결 31개, 문항 108개, 정의 17개, 관계유형 7개, 보류연결, 객체 22개 |
| `scripts/verify_quotes.py` | 인용문·Table 2–5 수치를 PDF 원문과 대조(+ 데이터 정합성 검사) |
| `scripts/mkmap.py` | 온톨로지 맵 PNG 생성 |
| `scripts/build_all.py` | 엑셀·근거정의서(md)·설문 이관용 파일 생성 |
| `scripts/build_guide_docx.js` | Word 해설서 생성(Node, docx 필요) |
| `scripts/build_story_deck.js` | 이야기식 PPT 생성(Node, pptxgenjs·react-icons·sharp 필요) |
| `outputs/BCMS_연계성_V2.xlsx` | **문항은행 + 온톨로지 맵 + 응답 입력·점수·검증 시트(16개 시트)** |
| `outputs/BCMS_온톨로지맵_V2.png` | 온톨로지 맵 그림 |
| `outputs/BCMS_연계성_이야기로_이해하기.pptx` | **이야기식 설명 PPT(17장, 발표자 노트 포함)** — 릴레이 바통 비유로 연구 흐름과 엑셀 공부 순서를 설명 |
| `outputs/BCMS_연계성_해설서.docx` | **쉽게 읽는 Word 해설서(17쪽)** — 이야기로 읽는 연구 흐름, 엑셀 시트 설명, 30분 공부 코스, FAQ |
| `outputs/BCMS_연계성_V2_근거정의서.md` | 연결별 인용·연구자 의견·문항 전체 (논문 부록 초안으로 사용 가능) |
| `outputs/quote_verification_report.md` | 인용문 원문 대조 보고서(PDF 해시 포함) |
| `survey/` | 설문 이관용 `survey_items_v2.json/csv`와 `SURVEY_SPEC.md` |
| `CHANGELOG.md` | V1 → V2 변경 내역과 V1의 오류 정정 |

## 다시 만들기

데이터(`data/*.json`)를 고친 뒤:

```bash
# 1) 인용문 검증 (PDF 두 편 경로 필요. 저작권 때문에 PDF는 저장소에 넣지 않음)
python3 -I scripts/verify_quotes.py --arias <Arias.pdf> --bialas <Bialas.pdf>
# 2) 지도와 산출물 생성 (Pillow, openpyxl 필요 / 지도 한글 글꼴: 환경변수 KFONT로 지정)
python3 -I scripts/mkmap.py
python3 -I scripts/build_all.py
# 3) 엑셀 수식 재계산: LibreOffice로 열어 저장하거나 recalc 스크립트 사용
```

`pdftotext`(poppler-utils)가 필요하다.

## 현재 상태와 다음 단계

| 단계 | 상태 |
|---|---|
| 인용문 원문 대조 | 완료 (64/64, 객체 22/22) |
| 연결 31개 연구자 검토 | **연구자 확인 필요** — 특히 E2 2개(L10, L12), E3 3개(L11, L17, L29), 포함 관계(L13, L14), 집단 노드(L27, L30), 보류연결 6개 |
| 연구자 정의 확정 | **연구자 확인 필요** — `정의서` 시트에서 유형이 "연구자 정의"인 항목 |
| 전문가 내용타당도(6~10인) | 미실시 |
| 인지면담(5~8인) | 미실시 |
| 예비조사·통계 검증 | 미실시 |
| BCMS 앱 설문 이관 | 문항 확정 후 진행 (`survey/SURVEY_SPEC.md`) |

## 한계

- 연결 31개는 전문가 검증 전 **가설**이다. Arias는 프로세스가 핵심인지를 검증했을 뿐 프로세스 간 연결은 검증하지 않았고, 프로세스 흐름도는 생략했다(인용 A06).
- 반영·확인·갱신(R·V·U) 3상태, 관계유형 이름, 연결 영역 분류, 집단 노드 CORE는 두 논문에 없는 연구자 설계다.
- 한국어 번역은 참고용이며 원문 대조 대상이 아니다.
- 통계 기준(I-CVI 0.78, α 0.70 등)은 관례이며 논문 근거가 없다.
