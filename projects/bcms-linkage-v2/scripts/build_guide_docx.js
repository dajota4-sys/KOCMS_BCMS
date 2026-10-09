// Word 해설서(V3): data/*.json + outputs/BCMS_온톨로지맵_V3.png -> outputs/BCMS_연계성_해설서_V3.docx
const fs=require('fs'),path=require('path');
const {Document,Packer,Paragraph,TextRun,HeadingLevel,Table,TableRow,TableCell,WidthType,ShadingType,BorderStyle,AlignmentType,ImageRun,Footer,PageNumber,LevelFormat,PageBreak}=require('docx');
const ROOT=path.resolve(__dirname,'..');
const J=n=>JSON.parse(fs.readFileSync(path.join(ROOT,'data',n),'utf8'));
const Q=Object.fromEntries(J('quotes.json').map(q=>[q.id,q])), LK=J('links.json'), LKM=Object.fromEntries(LK.map(l=>[l.id,l]));
const IT=J('items.json'), item=id=>IT.find(i=>i.id===id).text, OB=J('objects.json'), VB=J('relation_verbs.json'), VBD=Object.fromEntries(VB.map(v=>[v.id,v]));
const DM=J('dimensions.json'), DMD=Object.fromEntries(DM.map(d=>[d.id,d])), SRC=J('sources.json'), SRD=Object.fromEntries(SRC.map(s=>[s.id,s]));
const NAME=Object.fromEntries(OB.map(o=>[o.id,o.name])); NAME.CORE='핵심 BCMS 프로세스 전반(집단)';
const OUT=path.join(ROOT,'outputs','BCMS_연계성_해설서_V3.docx');
const FONT={ascii:'맑은 고딕',eastAsia:'맑은 고딕',hAnsi:'맑은 고딕',cs:'맑은 고딕'};
const NAVY='14213D',BLUE='1F6F8B',ORANGE='F26B38',RED='D64545',GREEN='2E9E6B',AMBER='B54708',GREY='6B7A90';
const CW=9638;
const r=(t,o={})=>new TextRun({text:t,font:FONT,size:o.size||21,bold:o.bold,italics:o.italics,color:o.color});
const P=(c,o={})=>new Paragraph({children:(Array.isArray(c)?c:[r(c,o)]),spacing:{after:o.after??120,line:o.line||340},alignment:o.align,keepNext:o.keepNext,indent:o.indent});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const H3=t=>new Paragraph({heading:HeadingLevel.HEADING_3,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const B=(c)=>new Paragraph({numbering:{reference:'bul',level:0},children:Array.isArray(c)?c:[r(c)],spacing:{after:80,line:330}});
const N=(c,ref='num')=>new Paragraph({numbering:{reference:ref,level:0},children:Array.isArray(c)?c:[r(c)],spacing:{after:80,line:330}});
const bd={style:BorderStyle.SINGLE,size:4,color:'D0D5DD'}; const borders={top:bd,bottom:bd,left:bd,right:bd};
function cell(c,w,o={}){const paras=(Array.isArray(c)&&c[0] instanceof Paragraph)?c:[new Paragraph({children:Array.isArray(c)?c:[r(String(c),{size:o.size||19,bold:o.bold,color:o.color})],alignment:o.align,spacing:{after:40,line:300}})];
  return new TableCell({children:paras,width:{size:w,type:WidthType.DXA},borders,shading:o.fill?{fill:o.fill,type:ShadingType.CLEAR,color:'auto'}:undefined,margins:{top:70,bottom:70,left:110,right:110},verticalAlign:o.valign});}
function table(head,rows,widths,o={}){const tw=widths.reduce((a,b)=>a+b,0);
  const hr=new TableRow({tableHeader:true,children:head.map((h,i)=>cell(h,widths[i],{fill:'1D4E89',bold:true,color:'FFFFFF',align:AlignmentType.CENTER,size:19}))});
  const body=rows.map(rw=>new TableRow({cantSplit:true,children:rw.map((c,i)=>{const co=(c&&c.__cell)?c:{v:c};return cell(co.v,widths[i],{size:o.size||19,fill:co.fill,bold:co.bold,color:co.color,align:co.align});})}));
  return new Table({width:{size:tw,type:WidthType.DXA},columnWidths:widths,rows:[hr,...body]});}
const C=(v,o={})=>Object.assign({__cell:true,v},o);
function box(label,labelColor,fill,paras){const inner=[new Paragraph({children:[r(label,{bold:true,color:labelColor,size:19})],spacing:{after:80}}),...paras];const bb={style:BorderStyle.SINGLE,size:6,color:labelColor};
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],rows:[new TableRow({cantSplit:true,children:[new TableCell({children:inner,width:{size:CW,type:WidthType.DXA},borders:{top:bb,bottom:bb,left:bb,right:bb},shading:{fill,type:ShadingType.CLEAR,color:'auto'},margins:{top:140,bottom:140,left:200,right:200}})]})]});}
const quoteBox=(id)=>box('인용 · '+Q[id].source+' p.'+Q[id].pages+' ('+id+')',BLUE,'EAF3FB',[new Paragraph({children:[r('"'+Q[id].text+'"',{italics:true,size:20})],spacing:{after:80,line:320}}),new Paragraph({children:[r(Q[id].ko,{size:19,color:GREY})],spacing:{after:0,line:310}})]);
const opBox=(t)=>box('연구자 의견',RED,'FDECEA',(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[r(x,{size:20})],spacing:{after:60,line:320}})));
const tipBox=(label,t)=>box(label,GREEN,'EAF7F0',(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[r(x,{size:20})],spacing:{after:60,line:320}})));
const warnBox=(label,t)=>box(label,AMBER,'FFF4E5',(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[r(x,{size:20})],spacing:{after:60,line:320}})));
const gap=()=>new Paragraph({children:[],spacing:{after:100}});
const PB=()=>new Paragraph({children:[new PageBreak()]});
const rel=(l)=>NAME[l.source]+' → '+NAME[l.target];
const evc=e=>e==='E1'?GREEN:e==='E2'?AMBER:RED;
const sc=s=>s==='강'?GREEN:s==='중'?AMBER:RED;
const cite=s=>s.citation;

const ch=[];
ch.push(new Paragraph({children:[new TextRun({text:'BCMS 프로세스 연결 품질',font:FONT,size:52,bold:true,color:NAVY})],spacing:{before:600,after:80}}));
ch.push(new Paragraph({children:[new TextRun({text:'쉽게 읽는 해설서 (V3)',font:FONT,size:36,bold:true,color:ORANGE})],spacing:{after:200}}));
ch.push(P('객체층 · 관계층 · 품질층(6개 차원)으로 읽는 문항 개발과 엑셀 공부법 · 박사논문 프로젝트',{color:GREY,size:22,after:60}));
ch.push(P('근거 문헌: Arias-Aranda et al.(2026) Appl. Sci. 16, 3219 / Białas(2010) + 외부 학술 문헌 후보 12건(서지만 확인)',{color:GREY,size:19,after:300}));
ch.push(table(['장','내용'],[['1','이 연구는 무엇을 묻는가 — 릴레이 바통 이야기'],['2','3층 모형: 객체층 · 관계층 · 품질층'],['3','두 논문과 외부 문헌은 무엇을 해 주었나'],['4','이 말만 알면 됩니다 (핵심 용어)'],['5','4단계로 만든 과정'],['6','품질 6개 차원과 학술 근거'],['7','연결 하나를 끝까지 따라가 보기'],['8','엑셀 공부법'],['9','결과를 읽는 법'],['10','이 제안을 어떻게 볼까 · 연구자께서 정할 일 · 한계'],['부록','연결 31개 한눈에 보기 · 외부 문헌 서지 12건']].map(x=>[C(x[0],{align:AlignmentType.CENTER,bold:true}),x[1]]),[1200,8438]));
ch.push(gap()); ch.push(H2('이 문서를 읽는 법'));
ch.push(P('이 문서는 엑셀 문항은행과 PPT를 이해하기 위한 해설서입니다. 표와 숫자를 외울 필요는 없습니다. 이야기를 따라 읽다가, 확인하고 싶은 부분만 엑셀에서 찾아보시면 됩니다.'));
ch.push(B([r('파란 상자',{bold:true,color:BLUE}),r(' = 논문 원문 인용(영문 원문, 쪽 번호, 한국어 번역). Arias·Białas 인용은 PDF 원문과 프로그램으로 대조해 모두 일치했습니다(72/72).')]));
ch.push(B([r('붉은 상자',{bold:true,color:RED}),r(' = 연구자 의견(해석·보완·가정·분류). 논문에 없는 내용이며 박사논문에서 연구자께서 직접 확정하셔야 합니다.')]));
ch.push(B([r('주황 상자',{bold:true,color:AMBER}),r(' = 주의. 특히 외부 학술 문헌은 서지만 확인했고 원문 문장은 확인하지 못했다는 표시입니다.')]));
ch.push(B([r('초록 상자',{bold:true,color:GREEN}),r(' = 읽는 요령과 팁')]));
ch.push(B('한국어 번역은 참고용이며 원문 대조 대상이 아닙니다.'));
ch.push(warnBox('V2에서 바뀐 것',['V2의 "반영·확인·갱신"을 쓰지 않고, 연구자께서 제시하신 3층 모형(객체층·관계층·품질층)과 품질 6개 차원으로 바꿨습니다.','V2에는 연결의 "영역(①~⑤)" 분류가 일부 연결에서 잘못 들어가 있었습니다(L11, L16, L17, L22~L26). V3에서 바로잡았습니다.']));

ch.push(H1('1. 이 연구는 무엇을 묻는가'));
ch.push(H2('규정은 있는데, 부서들은 이어져 있을까?'));
ch.push(P('어느 회사의 업무연속성 규정이 아주 잘 정리되어 있다고 해 봅시다. 요구사항 담당, 업무영향분석(BIA) 담당, 리스크 담당, 훈련 담당이 모두 훌륭한 문서를 갖고 있습니다. 그런데 화재가 났을 때 BIA 결과가 계획서에 들어 있지 않거나, 훈련에서 발견한 문제가 계획서에 반영되지 않았다면 어떨까요? 규정은 "있지만" 부서들은 "이어져" 있지 않은 것입니다.'));
ch.push(P('Arias 논문도 같은 문제를 짚습니다. 요구사항을 체크리스트 방식으로 처리하면 지속 가능하게 운영되는 경영시스템으로 반드시 이어지지 않는다고 말합니다.'));
ch.push(quoteBox('A05')); ch.push(gap());
ch.push(P('그래서 이 연구가 재려는 것은 프로세스가 "있는가"가 아니라 연결이 "얼마나 잘 작동하는가"입니다.',{bold:true}));
ch.push(H2('릴레이 달리기로 생각해 봅시다'));
ch.push(table(['릴레이','BCMS','예'],[[C('주자',{bold:true}),'프로세스 (22개)','요구사항관리, BIA, 리스크평가, 계획 개발, 훈련·연습, 복구 …'],[C('바통',{bold:true}),'산출물','BIA 결과, 리스크 목록, BC 계획·절차, 연습 결과, 변경 기록'],[C('바통 전달',{bold:true}),'연결 (31개)','"요구사항관리가 BIA에 정보를 준다"처럼 누가 누구에게 무엇을 넘기는가']],[1700,2800,5138]));
ch.push(gap());
ch.push(P('좋은 릴레이 팀은 바통 전달이 여섯 가지 점에서 잘 작동합니다. 앞 주자의 의도와 어긋나지 않게 넘어가고(정합성), 받은 바통이 어디서 왔는지 거슬러 알 수 있고(추적성), 넘겼다는 증거가 남고(증빙성), 전달을 책임지는 사람이 정해져 있고(책임성), 바통이 바뀌면 바로 반영되고(최신성), 실수가 발견되면 끝까지 고쳐집니다(환류폐쇄성). 이 여섯 가지가 품질층의 6개 차원입니다.'));
ch.push(box('한 문장 정의 (연구자 정의)',RED,'FDECEA',[new Paragraph({children:[r('연결 품질 = 한 연결(S→T)이 조직의 실제 운영에서 얼마나 잘 작동하는가 (정합성·추적성·증빙성·책임성·최신성·환류폐쇄성으로 측정)',{bold:true,size:21})],spacing:{after:60}}),new Paragraph({children:[r('"연결 품질"이라는 용어와 6개 차원은 연구자께서 제시하신 초기 가설이며 두 논문에 없습니다. 프로세스 간 상호 연결이 BCMS의 핵심이라는 점만 논문에서 가져왔습니다.',{size:19})],spacing:{after:0}})]));
ch.push(gap()); ch.push(quoteBox('A02')); ch.push(gap()); ch.push(quoteBox('B01'));

ch.push(H1('2. 3층 모형: 객체층 · 관계층 · 품질층'));
ch.push(P('첨부 문서는 개념을 세 층으로 나누면 논리와 측정이 명확해진다고 제안합니다. 이 연구는 그 제안을 그대로 따랐습니다.'));
ch.push(table(['층','질문','내용','근거'],[
 [C('A. 객체층',{bold:true}),'무엇과 무엇을 연결하는가','프로세스 22개와 그 산출물','Arias Table 5 (인용)'],
 [C('B. 관계층',{bold:true}),'어떤 방식으로 연결되는가','관계동사 11개 (입력된다, 근거가 된다, 도출·이행된다, 시험·검증된다, 수행을 촉발한다, 개정·갱신한다, 환류된다, 포함한다, 제공한다, 승인한다, 전달된다)','Arias 서술문에서 동사 추출(인용) + 분류(연구자)'],
 [C('C. 품질층',{bold:true}),'그 연결이 얼마나 잘 작동하는가','6개 차원: 정합성 · 추적성 · 증빙성 · 책임성 · 최신성 · 환류폐쇄성','첨부 문서의 초기 가설(연구자) + 두 논문 인용 + 외부 문헌 후보']],[1500,2400,3438,2300]));
ch.push(gap());
ch.push(box('문항 = 객체쌍 + 관계동사 + 품질조건',ORANGE,'FFF1EA',[
 new Paragraph({children:[r('예) 요구사항 목록이(객체 S) BIA의 우선순위·복구목표 설정에(객체 T) 입력될 때(관계동사: 입력된다), 두 내용이 서로 모순 없이 일치한다(품질조건: 정합성).',{size:20})],spacing:{after:60,line:320}})]));
ch.push(gap());
ch.push(P('Białas가 온톨로지에서 관계(object slot)와 속성(data slot)을 구분한 방식이 이 층 구분의 구조적 근거입니다.'));
ch.push(quoteBox('B04')); ch.push(gap()); ch.push(quoteBox('B06')); ch.push(gap());
ch.push(H3('관계층에서 옮긴 동사'));
ch.push(P('첨부 문서의 관계동사 목록에는 "일치한다 / 추적된다 / 기록·증빙된다"가 있었습니다. 그런데 이 셋은 품질층의 정합성·추적성·증빙성과 같은 것을 가리킵니다. 같은 개념을 관계층과 품질층에서 두 번 재면 점수가 이중으로 잡히므로, 이 세 동사는 품질층으로 옮겼습니다. 대신 Arias 서술문에서 "도출·이행된다 / 포함한다 / 제공한다 / 전달된다" 네 동사를 추가했습니다.'));

ch.push(H1('3. 두 논문과 외부 문헌은 무엇을 해 주었나'));
ch.push(table(['','Arias (2026)','Białas (2010)','외부 문헌 후보 (12건)'],[
 [C('한 일',{bold:true}),'BCMS 프로세스 22개를 ISO 표준 분석과 독일 BC 전문가 39명 설문으로 정리','BCMS를 온톨로지로 만드는 방법을 제시(BS 25999 기반, Protégé OWL-DL 프로토타입)','추적성, 데이터 품질, 책임성, 환류학습 등 품질 차원의 학술적 배경'],
 [C('가져온 것',{bold:true}),'객체층(22개 프로세스), 관계층(서술문의 동사), 품질층의 일부 근거','방법: 객체·관계 정의, competency question, 검증 방식','품질 6개 차원의 개념적 근거 후보'],
 [C('상태',{bold:true}),'PDF 원문과 자동 대조 완료','PDF 원문과 자동 대조 완료','서지만 웹 검색으로 확인. 원문 문장은 확인 못함'],
 [C('한계',{bold:true}),'프로세스는 검증했으나 연결은 검증하지 않음','프로토타입, 클래스 목록은 쓰지 않음','연구자가 원문 확인 후 확정해야 함']],[1500,2700,2700,2738]));
ch.push(gap());
ch.push(warnBox('외부 문헌에 대해 꼭 알아두실 점',['이 작업 환경은 외부 사이트 접속이 차단되어 학술 논문 원문을 열람할 수 없었습니다. 웹 검색으로 서지(저자·연도·제목·학술지·권호·쪽·DOI)만 확인했고, 정의나 인용 문장은 확인하지 못했습니다.','그래서 외부 문헌은 "근거 후보"로만 표시했고, 원문 문장 칸은 비워 두었습니다. 연구자께서 원문에서 해당 정의를 확인해 엑셀 학술근거 시트의 노란 칸에 기입하셔야 근거로 확정됩니다.']));

ch.push(H1('4. 이 말만 알면 됩니다'));
ch.push(table(['용어','쉬운 설명','유형'],[
 [C('프로세스(객체)',{bold:true}),'입력을 출력으로 바꾸는, 서로 관련된 활동의 묶음. 이 연구에서는 Arias Table 5의 22개 (BCMS 계획은 프로젝트로 분류되어 제외)',C('인용 개념',{color:BLUE,bold:true})],
 [C('산출물',{bold:true}),'프로세스가 만들어 다른 프로세스가 쓰는 문서·기록·보고·결정',C('인용 개념 + 연구자 정의',{color:BLUE,bold:true})],
 [C('연결',{bold:true}),'프로세스 S의 산출물이 T에 쓰이는 방향 있는 한 쌍(S → T)',C('연구자 정의',{color:RED,bold:true})],
 [C('관계동사',{bold:true}),'연결의 의미를 나타내는 동사 11개. Arias 서술문에서 추출',C('연구자 정의',{color:RED,bold:true})],
 [C('연결 품질',{bold:true}),'한 연결이 실제 운영에서 얼마나 잘 작동하는가. 6개 차원으로 측정',C('연구자 정의',{color:RED,bold:true})],
 [C('연계성(연결성)',{bold:true}),'조직의 연결 31개 품질을 종합한 지수. 용어 통일은 연구자가 결정',C('연구자 정의',{color:RED,bold:true})],
 [C('증거유형 E1·E2·E3',{bold:true}),'논문이 그 연결을 얼마나 직접 말했나. E1 직접 / E2 일부 보완 / E3 논문에 없음(가정)',C('연구자 정의',{color:RED,bold:true})],
 [C('근거 등급 T1·T2·T3',{bold:true}),'품질 차원의 근거. T1 = Arias·Białas 원문 인용 / T2 = 외부 문헌(서지만 확인) / T3 = 연구자 정의',C('연구자 정의',{color:RED,bold:true})]],[2100,5538,2000]));

ch.push(H1('5. 4단계로 만든 과정'));
ch.push(table(['단계','하는 일','쉽게 말하면','엑셀 시트'],[
 [C('① 연결 근거 찾기',{bold:true}),'Arias의 프로세스 설명에서 연결의 근거 문장을 찾음','"무엇이 무엇에 쓰이는가" 문장 찾기','인용근거 · 연결'],
 [C('② 객체·관계 정의',{bold:true}),'객체 22개, 연결 31개, 관계동사 11개를 정의','바통 지도 그리기','객체 · 관계동사 · 트리플 · 관계매트릭스 · 온톨로지맵'],
 [C('③ 품질 문항화',{bold:true}),'연결마다 품질 차원 5~6개를 문항으로 표현','바통 전달이 얼마나 잘 작동하는지 묻는 질문 만들기','품질차원 · 적용매트릭스 · 문항'],
 [C('④ 검증',{bold:true}),'근거 확인, 전문가 평가, 변별타당도','질문이 제대로 된 질문인지 시험하기','학술근거 · 검증']],[1800,3300,2400,2138]));
ch.push(gap());
ch.push(P('온톨로지는 "무엇과 무엇의 연결을 측정하는가"를 정하고, 설문은 "그 연결이 조직에서 얼마나 잘 작동하는가"를 측정합니다.',{bold:true}));

ch.push(H2('5-1. 1단계: 문장에서 바통 찾기'));
ch.push(P('Arias §4.3에는 프로세스마다 역할을 설명한 문장이 있습니다. 그 중 "A의 결과가 B에 쓰인다"는 뜻의 문장이 연결의 근거입니다. 요구사항관리를 설명하는 이 문장을 보겠습니다.'));
ch.push(quoteBox('A11')); ch.push(gap());
ch.push(opBox([LKM.L01.researcher,'관계동사: "inform"을 "입력된다·활용된다"(V01)로 분류했습니다. 한 문장에서 연결 4개(요구사항 → BIA, 리스크평가, 내부감사, 공급망관리)가 나옵니다. 논문이 직접 서술한 연결이므로 E1로 분류했습니다.']));

ch.push(H2('5-2. 2단계: 객체와 관계 정의 — 바통 지도'));
ch.push(P('Białas는 관계가 시작하는 클래스를 domain, 가리키는 클래스를 range라 부릅니다. 이 연구에서 domain이 출발 프로세스(S), range가 도착 프로세스(T)입니다.'));
ch.push(quoteBox('B05')); ch.push(gap());
ch.push(H3('객체: 22개 프로세스'));
ch.push(table(['ID','프로세스','범주','PDCA','재난관리주기','전문가 지명률'],OB.map(o=>[o.id,o.name,o.category,o.pdca,o.lifecycle,o.expert_pct+'%']),[900,3300,1000,1100,1700,1638],{size:18}));
ch.push(P('범주·PDCA·재난관리주기·지명률은 Arias Table 2–5의 값을 그대로 옮긴 것이며, 지명률은 전문가 39명 중 해당 프로세스를 BCMS 핵심 프로세스로 지명한 비율입니다.',{size:19,color:GREY,after:100}));
ch.push(H3('관계동사 11개 (연구자 정의, Arias 서술문의 동사)'));
ch.push(table(['관계동사','S → T의 뜻','Arias 원문 동사','사용 연결'],VB.map(v=>[C(v.verb,{bold:true}),v.definition,v.arias_verbs,v.links.length?v.links.join(', '):'미사용']),[1700,2800,3000,2138],{size:17}));
ch.push(gap());
ch.push(H3('지도 읽는 법'));
ch.push(new Paragraph({children:[new ImageRun({type:'png',data:fs.readFileSync(path.join(ROOT,'outputs','BCMS_온톨로지맵_V3.png')),transformation:{width:620,height:465},altText:{title:'온톨로지 맵',description:'BCMS 프로세스 22개와 연결 31개를 그린 지도',name:'map'}})],spacing:{after:80}}));
ch.push(B('다섯 개의 세로 구역(① 요구·분석 ~ ⑤ 거버넌스·이해관계자)은 도착 프로세스가 하는 일에 따라 연구자가 묶은 분류입니다. Arias의 PDCA 분류와는 별개입니다.'));
ch.push(B('선 모양이 증거의 강도를 나타냅니다. 실선 = E1(논문이 직접 서술), 파선 = E2(일부 보완), 빨간 점선 = E3(논문에 없는 가설).'));
ch.push(B('원 안의 L01~L31은 연결 번호이고, 엑셀 연결 시트의 같은 ID 행에서 인용과 연구자 의견을 볼 수 있습니다.'));
ch.push(B('맨 아래 "CORE" 상자는 Arias가 "거의 모든 BCMS 프로세스"처럼 프로세스를 열거하지 않고 가리킨 경우를 위해 연구자가 만든 집단 노드입니다(L27, L30).'));

ch.push(H2('5-3. 인용과 의견을 가르는 신호등 (연결의 증거유형)'));
const cnt=e=>LK.filter(l=>l.evidence===e).length;
ch.push(table(['등급','뜻','연결 수','예'],[
 [C('E1 직접',{bold:true,color:GREEN}),'원문이 S→T 연결을 직접 서술. 인용만으로 연결의 존재와 방향이 성립',cnt('E1')+'개','L01 요구사항 → BIA'],
 [C('E2 일부 보완',{bold:true,color:AMBER}),'원문이 연결을 서술하나 출발 또는 도착을 연구자가 특정·보완',cnt('E2')+'개','L10 자원관리 → 솔루션 이행'],
 [C('E3 가정',{bold:true,color:RED}),'원문에 연결 서술이 없음. 연구자 가정 또는 Białas 유추',cnt('E3')+'개','L29 거버넌스 → 정책관리']],[1900,4338,1100,2300]));
ch.push(gap());
ch.push(P('E1이라고 해서 "맞는 연결"이 확정된 것은 아닙니다. 논문이 그렇게 서술했다는 뜻이며, 실제 BCMS에서 성립하는지는 전문가 검증이 필요합니다. 아래 다섯 개는 전문가 검증에서 가장 먼저 심사할 연결입니다.'));
const hreason={L10:'원문은 "전략 이행·운영용 자원"만 말함. 도착을 이행관리로 특정한 것은 연구자',L12:'계획 실행은 서술하나 "사고·비상 대응" 프로세스와의 결합은 연구자',L11:'Białas의 BIA 보고서 속성에서 유추. Arias에는 없음',L17:'교육 프로그램은 있으나 계획과의 연결 서술 없음',L29:'각각만 서술. Białas는 정책과 목표를 병렬 항목으로 둠'};
ch.push(table(['ID','연결','등급','왜 가설인가'],['L10','L12','L11','L17','L29'].map(id=>[id,rel(LKM[id]),C(LKM[id].evidence,{bold:true,color:evc(LKM[id].evidence),align:AlignmentType.CENTER}),hreason[id]]),[800,3300,800,4738],{size:18}));
ch.push(gap());
ch.push(P('이 밖에 "포함한다" 동사를 쓴 L13, L14(사고·비상 대응이 경보·커뮤니케이션과 복구를 하위 프로세스로 포함)는 흐름이 아니라 소속 관계이므로 연구자 판단이 필요합니다. 채택하지 않고 보류한 후보 연결 6개는 엑셀 보류연결 시트에 이유와 함께 있습니다.'));

ch.push(H1('6. 품질 6개 차원과 학술 근거'));
ch.push(P('품질층의 6개 차원은 연구자께서 첨부 문서에서 "초기 가설"로 제시하신 것입니다. 각 차원에 대해 (T1) 두 논문 안에서 찾을 수 있는 근거와 (T2) 외부 문헌 후보를 정리했습니다. 먼저 한눈에 보겠습니다.'));
ch.push(table(['차원','첨부 문서의 정의','두 논문 안의 근거(T1)','외부 문헌 후보(T2, 원문 미확인)'],DM.map(d=>[C(d.name,{bold:true}),d.attachment_def,C(d.t1_strength+(d.t1.length?' ('+d.t1.slice(0,3).join(', ')+')':' (직접 서술 없음)'),{bold:true,color:sc(d.t1_strength)}),d.ext.map(id=>SRD[id].authors.split(';')[0].split(',')[0]+(SRD[id].authors.includes(';')?' 외':'')+' ('+SRD[id].year+')').join(' · ')]),[1300,3000,2400,2938],{size:18}));
ch.push(gap());
ch.push(P('강 = 논문이 직접 서술, 중 = 간접 서술(핵심 개념은 있으나 말이 다름), 없음 = 서술 없음. 이 강도는 "두 논문 안에서의 직접성"을 뜻하며, 차원 자체의 학문적 타당성과는 다른 이야기입니다.',{size:19,color:GREY}));
DM.forEach(d=>{
 ch.push(H2(`6-${d.order}. ${d.name} (${d.en})`));
 ch.push(P([r('첨부 문서의 정의: ',{bold:true}),r(d.attachment_def)]));
 ch.push(opBox('본 연구의 조작적 정의: '+d.researcher_def));
 ch.push(gap());
 ch.push(P([r('두 논문 안의 근거(T1) — 강도: ',{bold:true}),r(d.t1_strength,{bold:true,color:sc(d.t1_strength)}),r('. '+d.t1_note)]));
 const show=(d.t1.length?d.t1:d.t1_weak||[]).slice(0,3);
 show.forEach(k=>{ch.push(quoteBox(k)); ch.push(gap());});
 ch.push(P([r('외부 문헌 후보(T2): ',{bold:true}),r(d.ext_note)]));
 d.ext.forEach(id=>ch.push(B([r(SRD[id].id+' ',{bold:true}),r(cite(SRD[id])+(SRD[id].doi?' doi:'+SRD[id].doi:''),{size:19})])));
 ch.push(P([r('다른 차원과의 겹침(연구자 우려): ',{bold:true}),r(d.overlap)],{after:160}));
});
ch.push(warnBox('다시 한 번: 외부 문헌은 원문 확인 전입니다',['위 외부 문헌은 서지만 확인했습니다. 특히 추적성은 두 논문 안에 근거가 없어 전적으로 외부 문헌(S01, S02)에 의존합니다. 연구자께서 원문에서 정의 문장과 쪽 번호를 확인해 엑셀 학술근거 시트에 기입하시기 전에는 "인용 근거"로 쓰지 마십시오.']));

ch.push(H2('6-7. 문항은 이렇게 만들었습니다'));
ch.push(P('문항은 "객체쌍 + 관계동사 + 품질조건" 구조입니다. 연결마다 5개 차원(정합성·추적성·증빙성·책임성·최신성)의 문항이 있고, 환류 연결 8개(L16, L18, L19, L20, L23, L24, L25, L26)에는 환류폐쇄성 문항이 하나 더 있습니다. 모든 문항은 "연구자 문항화"이며, 연결의 근거는 연결 시트의 인용을 따릅니다.'));
ch.push(table(['차원','문항의 꼴'],DM.map(d=>[C(d.name,{bold:true}),d.item_form]),[1600,8038],{size:18}));
ch.push(gap());
ch.push(P('예를 들어 요구사항관리 → BIA 연결(L01)의 문항 다섯 개입니다.'));
ch.push(table(['ID','차원','문항'],['L01-CO','L01-TR','L01-EV','L01-AC','L01-TM'].map(id=>[id,IT.find(i=>i.id===id).state,item(id)]),[1200,1000,7438],{size:18}));
ch.push(gap());
ch.push(tipBox('응답 방식과 점수',['5점 척도: 1 전혀 그렇지 않다 ~ 5 매우 그렇다. 9 = 해당 없음/모르겠음(점수에서 제외).','연결 점수 = 그 연결에 적용되는 차원 문항(5~6개)의 평균(9 제외, 최소 3문항 응답 시 산출).','차원 점수 = 31개 연결의 같은 차원 문항 평균. 연결 품질 지수 = 6개 차원 평균(초기에는 동일 가중치).','연결 문항은 출발·도착 프로세스가 모두 운영 중일 때만 제시합니다.','문항은 연결 163개 문항 + 종합 7 + 검증 9 = 179개입니다. 응답자 1인이 모두 답하기는 어려우므로 영역별 분할 배포를 권장합니다.']));
ch.push(gap());
ch.push(P('문항을 쓸 때 지킨 원칙은 다음과 같습니다.'));
['한 문항에는 한 가지 품질 차원만 묻는다 (이중 질문 금지)','문장 안에 출발·도착 프로세스(또는 그 산출물)와 관계동사가 모두 나타난다','"잘 연결되어 있다" 같은 평가어 대신 기록·검토·개정처럼 관찰 가능한 행위로 쓴다','의견이 아니라 최근 12개월의 실제 운영을 묻는다','프로세스 이름은 Arias Table 5와 같은 말을 쓴다'].forEach(t=>ch.push(N(t)));

ch.push(H2('6-8. 4단계: 문항이 연결 품질을 재는지 확인'));
ch.push(table(['순서','무엇을','기준'],[
 [C('인용 검증',{bold:true}),'Arias·Białas 인용을 PDF 원문과 프로그램으로 대조','72/72 일치(완료)'],
 [C('외부 문헌 원문 확인',{bold:true}),'연구자가 외부 문헌 원문에서 정의·문장을 확인해 학술근거 시트에 기입','12건 중 0건 확인(미완료)'],
 [C('구조 점검',{bold:true}),'모든 문항이 연결 1개 × 차원 1개에 대응하는지, 적용매트릭스와 문항 수가 일치하는지','엑셀 검증 시트에서 자동 점검'],
 [C('전문가 평가',{bold:true}),'전문가 6~10명이 연결과 문항의 적합도를 평가','Arias 방식: 80% 이상 채택, 20~80% 토론, 20% 미만 삭제'],
 [C('인지면담',{bold:true}),'5~8명이 문항을 자기 말로 설명','오해되는 문항 수정'],
 [C('예비조사',{bold:true}),'150명 이상 응답으로 통계 확인','차원별 신뢰도, 차원 간 상관 < 0.85(변별타당도), 종합 문항과의 수렴, 역문항 일관성']],[1900,4638,3100]));
ch.push(gap()); ch.push(quoteBox('A44')); ch.push(gap());
ch.push(opBox('Arias는 이 3단계 판정(80%/20%)을 프로세스의 핵심 여부에 적용했습니다. 문항과 연결에 적용하는 것은 연구자의 준용이고, I-CVI 0.78·α 0.70 같은 통계 기준은 일반적 관례일 뿐 두 논문에 근거가 없습니다.'));

ch.push(H1('7. 연결 하나를 끝까지 따라가 보기'));
ch.push(P('연결 하나가 "인용 → 사실 → 의견 → 문항"으로 어떻게 이어지는지 두 가지 예로 보겠습니다. 엑셀 연결 시트의 한 행이 바로 이 구조입니다.'));
ch.push(H2('예 1. 연습 결과가 계획을 고친다 (L16, E1, 환류 연결)'));
ch.push(P('관계동사는 "개정·갱신한다"(V06)입니다. 환류 연결이므로 6개 차원 문항이 모두 있습니다.'));
ch.push(quoteBox('A23')); ch.push(gap());
ch.push(P([r('인용이 확립하는 사실: ',{bold:true}),r(LKM.L16.established)]));
ch.push(opBox(LKM.L16.researcher)); ch.push(gap());
ch.push(table(['ID','차원','문항'],LKM.L16.dims.map(d=>[`L16-${d}`,DMD[d].name,item(`L16-${d}`)]),[1200,1200,7238],{size:18}));
ch.push(H2('예 2. 정책은 거버넌스에서 나온다? (L29, E3)'));
ch.push(P('"BC 거버넌스"가 "BC 정책관리"로 이어지는 연결입니다. 상식적으로는 그럴듯하지만 논문에서는 이 연결을 확인할 수 없습니다.'));
ch.push(quoteBox('A33')); ch.push(gap()); ch.push(quoteBox('B13')); ch.push(gap());
ch.push(P([r('인용이 확립하는 사실: ',{bold:true}),r(LKM.L29.established)]));
ch.push(opBox(LKM.L29.researcher)); ch.push(gap());
ch.push(tipBox('이 예에서 배울 점',['논문이 말하지 않은 연결은 "그럴듯하다"는 이유만으로 사실처럼 쓰지 않고 E3 가설로 표시했습니다. 전문가 합의가 80%에 못 미치면 삭제합니다.']));

ch.push(H1('8. 엑셀 공부법'));
ch.push(H2('20개 시트를 세 묶음으로'));
ch.push(table(['묶음','시트','무엇이 들어 있나'],[
 [C('읽는 시트 (12)',{bold:true,color:BLUE}),'안내','약속과 사용 순서'],['','정의서','용어 24개의 정의. 유형(인용 정의 / 연구자 정의)을 구분'],
 ['','품질차원','6개 차원의 정의, T1 근거 강도, 외부 문헌 후보, 겹침 우려'],['','인용근거','인용문 72개: 영문 원문, 쪽, 한국어 번역, 원문 대조 결과'],
 ['','연결','연결 31개. 파란 열(인용), 빨간 열(연구자 의견), 관계동사, 문항 수 점검'],['','적용매트릭스','연결 × 품질 차원 적용표 (문항 수를 결정)'],
 ['','관계동사','11개 동사의 정의, Arias 원문 동사, 첨부 문서와의 대응'],['','객체','프로세스 22개와 Arias Table의 값'],
 ['','트리플 · 관계매트릭스','같은 연결을 "주어-관계-목적어" 목록과 23×23 표로 표현'],['','온톨로지맵','바통 지도 그림'],['','보류연결','채택하지 않은 후보 6개와 이유 (연구자 결정 칸)'],
 [C('쓰는 시트 (4)',{bold:true,color:ORANGE}),'학술근거','외부 문헌 12건. 원문 쪽 번호·문장·확인 완료 칸에 직접 기입'],['','문항','문항 179개. 전문가 6명의 적합도(1~4)를 입력하면 I-CVI·판정 자동 계산'],
 ['','보유·응답자정보','응답자 정보 10개와 프로세스 보유 확인 22개'],['','응답입력','설문 응답을 7행부터 입력 (6행은 예시, 집계 제외)'],
 [C('계산 시트 (4)',{bold:true,color:GREEN}),'연결점수 · 차원점수','응답자별 연결 점수와 차원 점수 (자동)'],['','점수요약','연결·차원·영역·증거유형·관계동사별 평균, "가장 낮은 차원" 표시 (자동)'],['','검증','구조 점검, 변별·수렴·역문항 점검, 검증 계획 (자동)']],[2200,2400,5038],{size:18}));
ch.push(gap());
ch.push(H2('30분 공부 코스'));
ch.push(P('처음부터 끝까지 읽지 마세요. 연결 하나만 끝까지 이해하면 나머지 30개도 같은 구조입니다.'));
ch.push(table(['순서','시트','시간','할 일'],[
 [C('1',{align:AlignmentType.CENTER}),'안내','3분','"파랑 = 인용, 빨강 = 연구자 의견" 규칙만 확인'],
 [C('2',{align:AlignmentType.CENTER}),'품질차원','8분','6개 차원의 T1 근거 강도와 겹침 우려 읽기'],
 [C('3',{align:AlignmentType.CENTER}),'학술근거','5분','12건 중 원문 확인이 필요한 항목 파악'],
 [C('4',{align:AlignmentType.CENTER}),'연결 (L01 한 행)','8분','주 인용 → 확립하는 사실 → 연구자 의견 → 품질 차원 적용 순서로 끝까지'],
 [C('5',{align:AlignmentType.CENTER}),'문항 + 점수요약','6분','L01 문항 5개를 읽고 점수요약에서 같은 연결 행을 찾기']],[800,2200,900,5738]));
ch.push(gap());
ch.push(tipBox('엑셀 팁',['연결 시트에서 "증거유형" 열을 필터로 E1만 보면 확실한 연결부터 익힐 수 있습니다.','문항 시트의 "연결(S→T)"과 "관계동사" 열은 연결 시트와 자동 연동됩니다. 연결 ID(L01 등)로 두 시트를 오가며 보세요.','노란 칸이 입력 칸입니다. 그 밖의 칸은 수식이니 고치지 마세요. 응답입력 3·4행의 태그는 집계용이므로 수정하지 마세요.']));
ch.push(H2('자주 하는 질문'));
const faq=[
 ['반영·확인·갱신은 어디로 갔나요?','V3에서 쓰지 않습니다. 반영·확인·갱신은 "단계와 활동이 섞여 있다"는 한계가 있어, 서로 성질이 다른 6개 품질 차원으로 대체했습니다. 이전 V2 파일은 outputs/archive_v2 폴더에 보관했습니다.'],
 ['6개 차원은 논문에서 나온 건가요?','아닙니다. 연구자께서 첨부 문서에서 제시하신 초기 가설입니다. 두 논문에서 직접 근거를 찾으면 환류폐쇄성은 비교적 분명하고, 정합성·증빙성·책임성·최신성은 간접적이며, 추적성은 없습니다. 외부 문헌 후보는 있으나 원문 확인이 필요합니다.'],
 ['왜 환류폐쇄성은 8개 연결에만 있나요?','첨부 문서가 정의한 환류폐쇄성은 "훈련·평가·사고 결과가 개선과 재수정까지 완료되는가"입니다. 이 정의에 맞는 연결(결과가 개선·재수정으로 되돌아가는 연결)만 골랐고, 선정 기준은 연구자 분류입니다.'],
 ['관계동사와 품질 차원은 어떻게 다른가요?','관계동사는 연결이 "무엇인가"(입력된다, 근거가 된다 등)이고, 품질 차원은 그 연결이 "얼마나 잘 작동하는가"입니다. 그래서 일치·추적·증빙은 품질 차원이므로 관계동사에서 뺐습니다.'],
 ['E1이면 맞는 연결이라는 뜻인가요?','아닙니다. 논문이 그렇게 서술했다는 뜻입니다. 실제 BCMS에서 성립하는지는 전문가 검증이 필요합니다.'],
 ['CORE 노드는 왜 있나요?','Arias가 "거의 모든 BCMS 프로세스의 결과"처럼 프로세스를 열거하지 않고 말한 곳(L27, L30)을 표현하려고 연구자가 만든 가상 노드입니다.'],
 ['Białas 논문은 BS 25999 기반인데 왜 쓰나요?','클래스 목록이 아니라 방법(객체·관계 정의, competency question, 검증 방식)만 가져왔습니다.'],
 ['응답 9번은 무엇인가요?','해당 없음/모르겠음입니다. 점수 계산에서 결측으로 처리해 "연결이 약함"과 구분합니다.']];
faq.forEach((f,i)=>{ch.push(P([r('Q'+(i+1)+'. '+f[0],{bold:true,color:NAVY})],{after:40,keepNext:true})); ch.push(P(f[1],{indent:{left:300},after:140}));});

ch.push(H1('9. 결과를 읽는 법'));
ch.push(P('설문 응답을 입력하면 점수요약 시트에서 연결마다 차원별 평균이 나오고, "가장 낮은 차원"이 표시됩니다. 이 점수의 모양으로 연결의 약한 고리를 읽습니다.'));
ch.push(table(['점수 모양','읽는 법'],[[C('정합성 낮음',{bold:true}),'앞 주자의 결과와 뒤 주자의 결정이 어긋납니다. 같은 전제·수치를 쓰는지 점검합니다.'],[C('추적성 낮음',{bold:true}),'결과의 근거를 거슬러 찾지 못합니다. 문서 간 참조·ID 체계를 점검합니다.'],[C('증빙성 낮음',{bold:true}),'했지만 증거가 남지 않는 연결입니다. 검토·승인 기록을 점검합니다.'],[C('책임성 낮음',{bold:true}),'연결을 검토·승인·변경할 책임자가 불분명합니다.'],[C('최신성 낮음',{bold:true}),'변경이 관련 프로세스와 문서에 늦게 반영됩니다.'],[C('환류폐쇄성 낮음',{bold:true}),'문제는 나오는데 끝까지 고쳐지지 않습니다. (환류 연결 8개)']],[2700,6938]));
ch.push(gap());
ch.push(P('영역별(①~⑤)·증거유형별(E1/E2/E3)·관계동사별 평균도 나옵니다. E3 가설 연결의 점수가 E1과 크게 다르다면 그 연결을 문항에서 유지할지 다시 검토할 근거가 됩니다. 검증 시트의 "차원 간 상관 행렬"에서 최대 상관이 0.85를 넘으면 차원들이 서로 구분되지 않는다는 신호이므로 차원 통합을 검토합니다.'));

ch.push(H1('10. 이 제안을 어떻게 볼까 · 연구자께서 정할 일 · 한계'));
ch.push(H2('이 제안(반영·확인·갱신 → 6개 품질 차원)에 대한 평가'));
ch.push(table(['좋은 점','조심할 점'],[[ '무엇을(객체) · 어떻게(관계) · 얼마나 잘(품질)으로 층이 나뉘어 논리와 측정이 분명하다','문항이 163개(연결 문항)로 많다 → 영역별 분할 배포가 필요하다'],['6개 차원이 추적성, 일관성, 적시성, 책임성, 환류처럼 이미 정립된 개념에 대응한다','정합성·추적성·증빙성이 겹칠 수 있다 → 예비조사에서 변별타당도를 반드시 확인한다'],['V2의 반영·확인·갱신처럼 단계와 활동이 섞이지 않는다','추적성은 두 논문 안에 근거가 없다 → 외부 문헌 원문 확인이 필수다'],['차원별 점수가 나와 "어디가 약한가"를 바로 진단할 수 있다','환류폐쇄성은 연결 8개에만 적용된다 → 다른 차원과 문항 수가 다르다 / 6차원 합산에는 가중치 근거가 필요하다(형성적 지수, 방법 후보 S09·S10)']],[4819,4819],{size:19}));
ch.push(gap());
ch.push(H2('연구자께서 정할 일'));
[['외부 문헌 12건의 원문 확인','특히 추적성의 S01, S02. 학술근거 시트의 노란 칸에 기입'],['6개 차원을 그대로 쓸지, 겹치는 차원을 합칠지','예비조사 후 결정'],['가설 연결 5개(L10, L11, L12, L17, L29), 포함 관계 2개(L13, L14), 집단 노드(L27, L30)의 유지 여부','E2·E3 연결'],['"연결 품질"과 "연계성(연결성)" 중 용어를 무엇으로 통일할지','정의서 D04, D05'],['연구자 정의 확정과 보류 연결 6개의 포함 여부','정의서의 "연구자 정의" 항목, 보류연결 시트']].forEach(x=>ch.push(N([r(x[0],{bold:true}),r(' — '+x[1])],'num2')));
ch.push(H2('한계'));
['연결 31개는 전문가 검증 전 가설입니다. Arias는 프로세스가 핵심인지를 검증했을 뿐 연결을 검증하지 않았고, 프로세스 흐름도는 논문에서 생략했습니다(인용 A06).','6개 차원과 "연결 품질" 용어는 연구자가 제시한 초기 가설이며 두 논문에 없습니다.','외부 학술 문헌 12건은 서지만 확인했고 원문은 열람하지 못했습니다. 원문 확인 전에는 인용 근거로 확정할 수 없습니다.','Białas(2010)는 BS 25999 기반 프로토타입이며, 본 연구는 방법만 차용했습니다.','통계 기준(I-CVI 0.78, α 0.70, 차원 간 상관 0.85 등)은 일반적 관례이며 논문 근거가 없습니다.'].forEach(t=>ch.push(B(t)));
ch.push(gap()); ch.push(quoteBox('A06'));

ch.push(PB()); ch.push(H1('부록 A. 연결 31개 한눈에 보기'));
ch.push(P('주 인용 ID는 엑셀 인용근거 시트와 근거정의서에서 영문 원문을 찾을 수 있는 번호입니다. 인용이 없는 E3 연결은 보조 인용(유추 근거)만 표시했습니다. 환류 연결(FC 적용)에는 ★ 표시.',{size:19,color:GREY}));
ch.push(table(['ID','연결 (S → T)','관계동사','증거','인용 ID'],LK.map(l=>[l.id+(l.dims.includes('FC')?' ★':''),rel(l),VBD[l.verb].verb,C(l.evidence,{bold:true,color:evc(l.evidence),align:AlignmentType.CENTER}),(l.quotes_primary.length?l.quotes_primary.join(', '):'없음 (보조: '+l.quotes_support.join(', ')+')')]),[800,3500,1600,700,3038],{size:17}));
ch.push(PB()); ch.push(H1('부록 B. 외부 학술 문헌 서지 12건 (서지만 확인, 원문 미확인)'));
ch.push(P('웹 검색으로 저자·연도·제목·학술지·권호·쪽을 확인했습니다. 원문을 열람하지 못했으므로 정의·문장은 확인되지 않았습니다. "관련 차원"은 연구자가 근거 후보로 제안하는 대응입니다.',{size:19,color:GREY}));
ch.push(table(['ID','서지','관련 차원'],SRC.map(s=>[s.id,s.citation+(s.doi?' doi:'+s.doi:''),s.dims.length?s.dims.map(d=>DMD[d].name).join(', '):'방법(구성·검증)']),[700,6738,2200],{size:17}));

const doc=new Document({creator:'박사논문 프로젝트',title:'BCMS 프로세스 연결 품질 쉽게 읽는 해설서 (V3)',
 styles:{default:{document:{run:{font:FONT,size:21}}},paragraphStyles:[
  {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:34,bold:true,color:NAVY,font:FONT},paragraph:{spacing:{before:320,after:160},outlineLevel:0}},
  {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:27,bold:true,color:BLUE,font:FONT},paragraph:{spacing:{before:260,after:120},outlineLevel:1}},
  {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:23,bold:true,color:NAVY,font:FONT},paragraph:{spacing:{before:200,after:100},outlineLevel:2}}]},
 numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:270}}}}]},
  {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:360}}}}]},
  {reference:'num2',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:360}}}}]}]},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1134,bottom:1134,left:1134,right:1134}}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'BCMS 프로세스 연결 품질 해설서 (V3) · ',font:FONT,size:17,color:GREY}),new TextRun({children:[PageNumber.CURRENT],font:FONT,size:17,color:GREY})]})]})},
  children:ch}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync(OUT,b);console.log('saved',OUT);});
