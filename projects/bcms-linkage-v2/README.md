# BCMS 프로세스 연결 품질 측정 문항 개발 (V3)

박사논문 프로젝트. 업무연속성경영시스템(BCMS) 프로세스 간 **연결의 품질**(정합성·추적성·증빙성·책임성·최신성·환류폐쇄성)을 측정하는 설문 문항을 개발한다.

> 온톨로지는 "무엇과 무엇의 연결을 측정하는가"를 정하고, 설문은 "그 연결이 얼마나 잘 작동하는가"를 측정한다.

## 근거 문헌

- **Arias** — Arias-Aranda, D.; Haufe, K.; Dzombeta, S.; Stantchev, V. (2026) *Business Continuity Management—Identifying Relevant Processes for a Reference Model.* Applied Sciences 16(7), 3219. https://doi.org/10.3390/app16073219
- **Białas** — Białas, A. (2010) *Ontological approach to the business continuity management system development.* (Institute of Innovative Technologies EMAG, Katowice)
- **외부 문헌 후보 12건** — `data/sources.json` (서지만 확인, 원문 미확인)

## 3층 모형 (V3)

| 층 | 질문 | 내용 |
|---|---|---|
| 객체층 | 무엇과 무엇을 연결하는가 | 프로세스 22개 (Arias Table 5) |
| 관계층 | 어떤 방식으로 연결되는가 | 관계동사 11개 (Arias 서술문에서 추출) |
| 품질층 | 그 연결이 얼마나 잘 작동하는가 | 6개 차원 (첨부 문서의 초기 가설) |

문항 = **객체쌍 + 관계동사 + 품질조건**. 연결 31개 × 5개 차원 + 환류 연결 8개 × 환류폐쇄성 = 연결 문항 163개, 종합 7 + 검증 9 = **179문항**.

## 원칙

1. **인용과 연구자 의견을 분리한다.** Arias·Białas 근거는 PDF 원문과 자동 대조한 영문 인용문(쪽 번호 포함, 72개)으로만 제시하고, 해석·가정·분류는 "연구자 의견"으로 따로 적는다.
2. **외부 문헌은 원문을 확인하기 전에는 근거로 확정하지 않는다.** 서지만 확인한 후보로 표시하고, 원문 쪽·문장을 기입하는 칸을 비워 둔다(`학술근거` 시트).
3. **연구자 의견에 해당하는 용어는 정의한다.** (`data/definitions.json`, 엑셀 `정의서` 시트)
4. **증거유형 E1/E2/E3** (연결), **근거 등급 T1/T2/T3** (품질 차원)을 구분해 표시한다.
5. **Białas에서는 방법만 차용한다.** 클래스·관계 이름은 BS 25999 기반이라 쓰지 않는다.

## 폴더 구성

| 경로 | 내용 |
|---|---|
| `data/` | **원천 데이터(JSON)**: 인용문 72, 연결 31, 문항 179, 정의 24, 관계동사 11, 품질 차원 6, 외부 문헌 12, 보류연결, 객체 22 |
| `scripts/verify_quotes.py` | 인용문·Table 2–5 수치를 PDF 원문과 대조 + 데이터 정합성 검사 |
| `scripts/mkmap.py` | 온톨로지 맵 PNG 생성 |
| `scripts/build_all.py` | 엑셀·근거정의서(md)·설문 이관용 파일 생성 |
| `scripts/build_story_deck.js`, `build_guide_docx.js` | PPT·Word 해설서 생성(Node: pptxgenjs, docx, react-icons, sharp) |
| `outputs/BCMS_연계성_V3.xlsx` | **문항은행 + 온톨로지 맵 + 응답 입력·점수·검증 시트 (20개 시트)** |
| `outputs/BCMS_연계성_이야기로_이해하기_V3.pptx` | 이야기식 설명 PPT (22장, 발표자 노트 포함) |
| `outputs/BCMS_연계성_해설서_V3.docx` | 쉽게 읽는 Word 해설서 |
| `outputs/BCMS_연계성_V3_근거정의서.md` | 차원·연결별 인용·연구자 의견·문항 전체 (논문 부록 초안용) |
| `outputs/BCMS_온톨로지맵_V3.png` | 온톨로지 맵 그림 |
| `outputs/quote_verification_report.md` | 인용문 원문 대조 보고서(PDF 해시 포함) |
| `outputs/archive_v2/`, `data/archive_v2/`, `survey/archive_v2/` | V2(반영·확인·갱신 방식) 보관본 |
| `survey/` | 설문 이관용 `survey_items_v3.json/csv`와 `SURVEY_SPEC.md` |
| `CHANGELOG.md` | 버전별 변경 내역 |

## 다시 만들기

```bash
# 1) 인용문 검증 (PDF 두 편 경로 필요. 저작권 때문에 PDF는 저장소에 넣지 않음)
python3 -I scripts/verify_quotes.py --arias <Arias.pdf> --bialas <Bialas.pdf>
# 2) 지도와 산출물 생성 (Pillow, openpyxl 필요 / 지도 한글 글꼴: 환경변수 KFONT)
python3 -I scripts/mkmap.py && python3 -I scripts/build_all.py
# 3) 엑셀 수식 재계산: LibreOffice로 열어 저장하거나 recalc 스크립트 사용
# 4) PPT·Word: NODE_PATH에 pptxgenjs, docx 등을 두고 node scripts/build_*.js
```

`pdftotext`(poppler-utils)가 필요하다.

## 현재 상태와 다음 단계

| 단계 | 상태 |
|---|---|
| Arias·Białas 인용문 원문 대조 | 완료 (72/72, 객체 22/22) |
| 외부 문헌 12건 원문 확인 | **미완료 — 연구자 확인 필요** (특히 추적성 S01·S02). 이 환경은 외부 사이트 접속이 차단되어 서지만 확인함 |
| 6개 차원 확정, 용어("연결 품질"/"연계성") 통일 | **연구자 결정 필요** |
| 연결 31개 검토 | **연구자 확인 필요** — E2 2개(L10, L12), E3 3개(L11, L17, L29), 포함 관계(L13, L14), 집단 노드(L27, L30), 보류연결 6개 |
| 전문가 내용타당도(6~10인) / 인지면담 / 예비조사 | 미실시 |
| BCMS 앱 설문 이관 | 문항 확정 후 진행 (`survey/SURVEY_SPEC.md`) |

## 한계

- 연결 31개는 전문가 검증 전 **가설**이다. Arias는 프로세스가 핵심인지를 검증했을 뿐 프로세스 간 연결은 검증하지 않았고, 프로세스 흐름도는 생략했다(인용 A06).
- 6개 차원과 "연결 품질" 용어는 연구자가 제시한 초기 가설이다. 두 논문 안에서 추적성은 근거가 없고, 정합성·증빙성·책임성·최신성은 간접 근거, 환류폐쇄성은 비교적 직접 근거다.
- 6개 차원은 서로 겹칠 수 있어 예비조사에서 변별타당도(차원 간 상관 < 0.85)를 확인해야 한다.
- 한국어 번역은 참고용이며 원문 대조 대상이 아니다. 통계 기준(I-CVI 0.78, α 0.70 등)은 관례이며 논문 근거가 없다.

## V5 (현행 산출물)
`outputs/BCMS_연계성_V5.xlsx` · `BCMS_연계성_해설서_V5.docx` · `BCMS_연계성_이야기하기_V5.pptx` · `BCMS_관계MAP_22x22_V5.png`. 기준 데이터: `data/v5/` (V4 워크북 원본·baseline JSON·story.json). V3 파일은 `outputs/archive_v3/`.
