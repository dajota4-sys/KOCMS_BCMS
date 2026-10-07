// Word 해설서 생성: data/*.json + outputs/BCMS_온톨로지맵_V2.png -> outputs/BCMS_연계성_해설서.docx
const fs=require('fs'),path=require('path');
const {Document,Packer,Paragraph,TextRun,HeadingLevel,Table,TableRow,TableCell,WidthType,ShadingType,BorderStyle,AlignmentType,ImageRun,Footer,PageNumber,LevelFormat,PageBreak}=require('docx');
const ROOT=path.resolve(__dirname,'..');
const J=n=>JSON.parse(fs.readFileSync(path.join(ROOT,'data',n),'utf8'));
const Q=Object.fromEntries(J('quotes.json').map(q=>[q.id,q])), LK=J('links.json'), LKM=Object.fromEntries(LK.map(l=>[l.id,l]));
const IT=J('items.json'), item=id=>IT.find(i=>i.id===id).text, OB=J('objects.json'), RT=J('relation_types.json'), DF=Object.fromEntries(J('definitions.json').map(d=>[d.id,d]));
const NAME=Object.fromEntries(OB.map(o=>[o.id,o.name])); NAME.CORE='핵심 BCMS 프로세스 전반(집단)';
const OUT=path.join(ROOT,'outputs','BCMS_연계성_해설서.docx');
const FONT={ascii:'맑은 고딕',eastAsia:'맑은 고딕',hAnsi:'맑은 고딕',cs:'맑은 고딕'};
const NAVY='14213D',BLUE='1F6F8B',ORANGE='F26B38',RED='D64545',GREEN='2E9E6B',AMBER='E8A317',GREY='6B7A90';
const CW=9638;
const r=(t,o={})=>new TextRun({text:t,font:FONT,size:o.size||21,bold:o.bold,italics:o.italics,color:o.color});
const P=(c,o={})=>new Paragraph({children:(Array.isArray(c)?c:[r(c,o)]),spacing:{after:o.after??120,line:o.line||340},alignment:o.align,keepNext:o.keepNext,indent:o.indent});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const H3=t=>new Paragraph({heading:HeadingLevel.HEADING_3,children:[new TextRun({text:t,font:FONT})],keepNext:true});
const B=(c,lvl=0)=>new Paragraph({numbering:{reference:'bul',level:lvl},children:Array.isArray(c)?c:[r(c)],spacing:{after:80,line:330}});
const N=(c,ref='num')=>new Paragraph({numbering:{reference:ref,level:0},children:Array.isArray(c)?c:[r(c)],spacing:{after:80,line:330}});
const bd={style:BorderStyle.SINGLE,size:4,color:'D0D5DD'}; const borders={top:bd,bottom:bd,left:bd,right:bd};
function cell(c,w,o={}){const paras=(Array.isArray(c)&&c[0] instanceof Paragraph)?c:[new Paragraph({children:Array.isArray(c)?c:[r(String(c),{size:o.size||19,bold:o.bold,color:o.color})],alignment:o.align,spacing:{after:40,line:300}})];
  return new TableCell({children:paras,width:{size:w,type:WidthType.DXA},borders,shading:o.fill?{fill:o.fill,type:ShadingType.CLEAR,color:'auto'}:undefined,margins:{top:70,bottom:70,left:110,right:110},verticalAlign:o.valign});}
function table(head,rows,widths,o={}){const tw=widths.reduce((a,b)=>a+b,0);
  const hr=new TableRow({tableHeader:true,children:head.map((h,i)=>cell(h,widths[i],{fill:'1D4E89',bold:true,color:'FFFFFF',align:AlignmentType.CENTER,size:19}))});
  const body=rows.map(rw=>new TableRow({cantSplit:true,children:rw.map((c,i)=>{const co=(c&&c.__cell)?c:{v:c};return cell(co.v,widths[i],{size:o.size||19,fill:co.fill,bold:co.bold,color:co.color,align:co.align});})}));
  return new Table({width:{size:tw,type:WidthType.DXA},columnWidths:widths,rows:[hr,...body]});}
const C=(v,o={})=>Object.assign({__cell:true,v},o);
function box(label,labelColor,fill,paras){const inner=[new Paragraph({children:[r(label,{bold:true,color:labelColor,size:19})],spacing:{after:80}}),...paras];
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],rows:[new TableRow({cantSplit:true,children:[new TableCell({children:inner,width:{size:CW,type:WidthType.DXA},borders:{top:{style:BorderStyle.SINGLE,size:6,color:labelColor},bottom:{style:BorderStyle.SINGLE,size:6,color:labelColor},left:{style:BorderStyle.SINGLE,size:6,color:labelColor},right:{style:BorderStyle.SINGLE,size:6,color:labelColor}},shading:{fill,type:ShadingType.CLEAR,color:'auto'},margins:{top:140,bottom:140,left:200,right:200}})]})]});}
const quoteBox=(id,src)=>box('인용 · '+Q[id].source+' p.'+Q[id].pages+' ('+id+')',BLUE,'EAF3FB',[new Paragraph({children:[r('"'+Q[id].text+'"',{italics:true,size:20})],spacing:{after:80,line:320}}),new Paragraph({children:[r(Q[id].ko,{size:19,color:GREY})],spacing:{after:0,line:310}})]);
const opBox=(t)=>box('연구자 의견',RED,'FDECEA',(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[r(x,{size:20})],spacing:{after:60,line:320}})));
const tipBox=(label,t)=>box(label,GREEN,'EAF7F0',(Array.isArray(t)?t:[t]).map(x=>new Paragraph({children:[r(x,{size:20})],spacing:{after:60,line:320}})));
const gap=()=>new Paragraph({children:[],spacing:{after:100}});
const rel=(l)=>NAME[l.source]+' → '+NAME[l.target];
const evc=e=>e==='E1'?GREEN:e==='E2'?AMBER:RED;

const ch=[];
// 표지부
ch.push(new Paragraph({children:[new TextRun({text:'BCMS 프로세스 연계성',font:FONT,size:52,bold:true,color:NAVY})],spacing:{before:600,after:80}}));
ch.push(new Paragraph({children:[new TextRun({text:'쉽게 읽는 해설서 (V2)',font:FONT,size:36,bold:true,color:ORANGE})],spacing:{after:200}}));
ch.push(P('릴레이 바통 이야기로 읽는 문항 개발 과정과 엑셀 공부법 · 박사논문 프로젝트',{color:GREY,size:22,after:60}));
ch.push(P('근거 문헌: Arias-Aranda et al.(2026) Appl. Sci. 16, 3219 / Białas(2010) Ontological approach to the BCMS development',{color:GREY,size:19,after:300}));
ch.push(table(['장','내용'],[['1','이 연구는 무엇을 묻는가 — 릴레이 바통 이야기'],['2','두 논문은 무엇을 해 주었나'],['3','이 말만 알면 됩니다 (핵심 용어)'],['4','4단계로 만든 과정'],['5','연결 하나를 끝까지 따라가 보기'],['6','엑셀 공부법'],['7','결과를 읽는 법'],['8','연구자께서 정할 일 · 한계'],['부록','연결 31개 한눈에 보기']].map(x=>[C(x[0],{align:AlignmentType.CENTER,bold:true}),x[1]]),[1200,8438]));
ch.push(gap());
ch.push(H2('이 문서를 읽는 법'));
ch.push(P('이 문서는 엑셀 문항은행과 PPT를 이해하기 위한 해설서입니다. 숫자와 표를 외울 필요는 없습니다. 이야기를 따라가며 읽다가, 확인하고 싶은 부분만 엑셀에서 찾아보시면 됩니다.'));
ch.push(B([r('파란 상자',{bold:true,color:BLUE}),r(' = 논문 원문 인용(영문 원문, 쪽 번호, 한국어 번역). 영문 원문은 PDF와 프로그램으로 대조해 모두 일치했습니다(64/64).')]));
ch.push(B([r('붉은 상자',{bold:true,color:RED}),r(' = 연구자 의견(해석·보완·가정·분류). 논문에 없는 내용이며 박사논문에서 연구자께서 직접 확정하셔야 합니다.')]));
ch.push(B([r('초록 상자',{bold:true,color:GREEN}),r(' = 읽는 요령과 팁')]));
ch.push(B('한국어 번역은 참고용이며 원문 대조 대상이 아닙니다.'));

// 1
ch.push(new Paragraph({children:[new PageBreak()]}));
ch.push(H1('1. 이 연구는 무엇을 묻는가'));
ch.push(H2('규정은 있는데, 부서들은 이어져 있을까?'));
ch.push(P('어느 회사의 업무연속성 규정이 아주 잘 정리되어 있다고 해 봅시다. 요구사항을 정리하는 담당, 업무영향분석(BIA) 담당, 리스크 담당, 훈련 담당이 모두 훌륭한 문서를 갖고 있습니다. 그런데 화재가 났을 때 BIA 결과가 계획서에 들어 있지 않거나, 훈련에서 발견한 문제가 계획서에 반영되지 않았다면 어떨까요? 규정은 "있지만" 부서들은 "이어져" 있지 않은 것입니다.'));
ch.push(P('Arias 논문도 같은 문제를 짚습니다. 요구사항을 체크리스트 방식으로 처리하면 지속 가능하게 운영되는 경영시스템으로 반드시 이어지지 않는다고 말합니다.'));
ch.push(quoteBox('A05'));
ch.push(gap());
ch.push(P('그래서 이 연구가 재려는 것은 프로세스가 "있는가"가 아니라 "이어져 유지되는가"입니다.',{bold:true}));
ch.push(H2('릴레이 달리기로 생각해 봅시다'));
ch.push(P('BCMS를 릴레이 달리기라고 생각하면 쉽습니다.'));
ch.push(table(['릴레이','BCMS','예'],[[C('주자',{bold:true}),'프로세스 (22개)','요구사항관리, BIA, 리스크평가, 계획 개발, 훈련·연습, 복구 …'],[C('바통',{bold:true}),'산출물','BIA 결과, 리스크 목록, BC 계획·절차, 연습 결과, 변경 기록'],[C('바통 전달',{bold:true}),'연결 (31개)','"요구사항관리가 BIA에 정보를 준다"처럼 누가 누구에게 무엇을 넘기는가']],[1700,2800,5138]));
ch.push(gap());
ch.push(P('좋은 릴레이 팀은 세 가지를 잘합니다. 첫째, 바통이 실제로 다음 주자 손에 쥐어집니다. 둘째, 제대로 받았는지 확인합니다. 셋째, 주자가 바뀌거나 바통의 모양이 바뀌면 다시 맞춰 봅니다. 이것이 이 연구가 연결을 측정하는 세 가지 기준, 곧 반영·확인·갱신입니다.'));
ch.push(box('한 문장 정의 (연구자 정의)',RED,'FDECEA',[new Paragraph({children:[r('연계성 = BCMS 프로세스 간 연결이 조직의 실제 운영에서 반영되고, 확인되고, 바뀔 때 갱신되는 정도',{bold:true,size:21})],spacing:{after:60}}),new Paragraph({children:[r('"연계성"이라는 용어와 반영·확인·갱신 구성은 두 논문에 없는 연구자 정의입니다. 프로세스 간 상호 연결·상호작용이 BCMS의 핵심이라는 점만 논문에서 가져왔습니다(아래 인용).',{size:19})],spacing:{after:0}})]));
ch.push(gap());
ch.push(quoteBox('A02')); ch.push(gap()); ch.push(quoteBox('B01'));

// 2
ch.push(H1('2. 두 논문은 무엇을 해 주었나'));
ch.push(P('두 논문은 역할이 다릅니다. 한 논문은 "누가 뛰고 바통이 어디로 가는지"의 단서를 주었고, 다른 논문은 "바통의 이동을 지도로 그리는 방법"을 주었습니다.'));
ch.push(table(['','Arias (2026)','Białas (2010)'],[
 [C('한 일',{bold:true}),'BCMS 프로세스 22개를 ISO 표준 분석과 전문가 설문으로 정리하고 핵심·관리·지원 프로세스로 분류했습니다. 설문에는 독일의 BC 전문가 39명이 응답했습니다.','BCMS를 온톨로지(개념 지도)로 만드는 방법을 제시했습니다. BS 25999를 바탕으로 Protégé 도구에서 OWL-DL로 만든 프로토타입(BCMO)입니다.'],
 [C('우리가 가져온 것',{bold:true}),'22개 프로세스(Table 5) + 프로세스 설명(§4.3) 안의 "무엇이 무엇에 쓰이는가"를 말하는 문장들','방법만: 객체와 관계의 정의, competency question(온톨로지가 답해야 할 질문), 개체=산출물 개념, 검증 방식'],
 [C('가져오지 않은 것',{bold:true}),'프로세스 흐름도(논문에서 생략됨)','BS 25999 기반 클래스 목록과 관계 이름'],
 [C('한계',{bold:true}),'프로세스가 핵심인지는 검증했지만 프로세스 간 연결은 검증하지 않았습니다.','저자도 프로토타입이며 실제 데이터 검증이 더 필요하다고 밝혔습니다.']],[1700,3969,3969]));
ch.push(gap());
ch.push(P('방법과 한계에 대한 Białas의 서술은 다음과 같습니다.'));
ch.push(quoteBox('B02')); ch.push(gap()); ch.push(quoteBox('B14')); ch.push(gap());
ch.push(tipBox('읽는 요령',['Arias에서는 "연결의 단서"를, Białas에서는 "방법"을 가져왔다고 기억하시면 됩니다. 연결 자체를 정의한 사람은 연구자 본인입니다.']));

// 3
ch.push(H1('3. 이 말만 알면 됩니다'));
ch.push(P('정의서 시트에는 용어가 17개 있지만, 아래 일곱 가지만 알면 나머지는 따라옵니다. "유형" 열에서 "인용 개념"은 논문에서 가져온 개념이고, "연구자 정의"는 연구자께서 확정하셔야 하는 정의입니다.'));
ch.push(table(['용어','쉬운 설명','유형'],[
 [C('프로세스(객체)',{bold:true}),'입력을 출력으로 바꾸는, 서로 관련된 활동의 묶음. 이 연구에서는 Arias Table 5의 22개 (BCMS 계획은 프로젝트로 분류되어 제외)',C('인용 개념',{color:BLUE,bold:true})],
 [C('산출물',{bold:true}),'프로세스가 만들어 다른 프로세스가 쓰는 문서·기록·보고·결정',C('인용 개념 + 연구자 정의',{color:BLUE,bold:true})],
 [C('연결',{bold:true}),'프로세스 S의 산출물이 T에 쓰이는 방향 있는 한 쌍(S → T). 반드시 출발 하나, 도착 하나',C('연구자 정의',{color:RED,bold:true})],
 [C('연계성',{bold:true}),'연결이 반영·확인·갱신되는 정도. 이 연구가 재는 것',C('연구자 정의',{color:RED,bold:true})],
 [C('반영·확인·갱신',{bold:true}),'반영 = 바통을 받아 실제로 썼다 / 확인 = 제대로 받았는지 점검했다 / 갱신 = 바뀌면 다시 맞춰 본다 (문항은 "다시 검토하고 고친다" 형태)',C('연구자 정의',{color:RED,bold:true})],
 [C('증거유형 E1·E2·E3',{bold:true}),'논문이 그 연결을 얼마나 직접 말했나. E1 직접 / E2 일부를 연구자가 보완 / E3 논문에 없음(가정)',C('연구자 정의',{color:RED,bold:true})],
 [C('competency question',{bold:true}),'온톨로지(지식베이스)가 답할 수 있어야 하는 질문. 연결마다 "이 연결이 유지되는지 무엇으로 확인하는가"를 문항 3개로 구체화',C('인용 정의 + 연구자 적용',{color:BLUE,bold:true})]],[2100,5538,2000]));
ch.push(gap());
ch.push(P('같은 문서 안에서 "인용"과 "연구자 정의"를 구분한 이유는 박사논문에서 연구자의 기여와 선행 연구의 내용을 분명히 나누어 쓰기 위해서입니다.'));

// 4
ch.push(H1('4. 4단계로 만든 과정'));
ch.push(table(['단계','하는 일','쉽게 말하면','엑셀 시트'],[
 [C('① 연결 근거 찾기',{bold:true}),'Arias의 프로세스 설명에서 연결의 근거 문장을 찾음','"무엇이 무엇에 쓰이는가" 문장 찾기','인용근거 · 연결'],
 [C('② 객체·관계 정의',{bold:true}),'Białas 방식으로 객체 22개, 연결 31개, 관계유형 7개를 정의','바통 지도 그리기','객체 · 관계유형 · 트리플 · 관계매트릭스 · 온톨로지맵'],
 [C('③ 문항으로 표현',{bold:true}),'연결이 반영·확인·갱신되는 상태를 문항 3개로 표현','바통이 잘 넘어갔는지 묻는 질문 만들기','문항'],
 [C('④ 검증',{bold:true}),'문항이 연계성을 재는지 확인','질문이 제대로 된 질문인지 시험하기','검증']],[1800,3300,2400,2138]));
ch.push(gap());
ch.push(P('온톨로지는 "무엇과 무엇의 연결을 측정하는가"를 정하고, 설문은 "그 연결이 조직에서 어느 정도 유지되는가"를 측정합니다.',{bold:true}));

ch.push(H2('4-1. 1단계: 문장에서 바통 찾기'));
ch.push(P('Arias §4.3에는 프로세스마다 그 역할을 설명한 문장이 있습니다. 그 중 "A의 결과가 B에 쓰인다"는 뜻의 문장이 연결의 근거입니다. 예를 들어 요구사항관리를 설명하는 이 문장을 보겠습니다.'));
ch.push(quoteBox('A11')); ch.push(gap());
ch.push(opBox([LKM.L01.researcher,'즉, 한 문장에서 연결 4개(요구사항 → BIA, 리스크평가, 내부감사, 공급망관리)가 나옵니다. 논문이 직접 서술한 연결이므로 E1로 분류했습니다.']));

ch.push(H2('4-2. 2단계: 객체와 관계 정의 — 바통 지도'));
ch.push(P('Białas는 온톨로지에서 클래스(객체)와, 객체 사이의 관계(object slot)를 구분합니다. 관계가 시작하는 클래스를 domain, 가리키는 클래스를 range라 부릅니다. 이 연구에서는 domain이 출발 프로세스(S), range가 도착 프로세스(T)입니다.'));
ch.push(quoteBox('B05')); ch.push(gap());
ch.push(H3('객체: 22개 프로세스'));
ch.push(table(['ID','프로세스','범주','PDCA','재난관리주기','전문가 지명률'],OB.map(o=>[o.id,o.name,o.category,o.pdca,o.lifecycle,o.expert_pct+'%']),[900,3300,1000,1100,1700,1638],{size:18}));
ch.push(P('범주·PDCA·재난관리주기·지명률은 Arias Table 2–5에서 그대로 옮긴 값입니다. 지명률은 전문가 39명 중 해당 프로세스를 BCMS 핵심 프로세스로 지명한 비율입니다. CRM의 3%처럼 낮은 값도 있지만 Arias는 CRM을 참조모델에 포함해야 한다고 판단했습니다.',{size:19,color:GREY,after:100}));
ch.push(H3('관계유형 7개 (연구자 정의)'));
ch.push(P('연결의 "의미"를 구분하기 위해 7가지로 나누었습니다. Białas의 관계 이름은 구성 관계 위주여서 쓰지 않고 연구자가 이름을 붙였습니다.'));
ch.push(table(['관계유형','S → T의 뜻','판정 질문','해당 연결'],RT.map(x=>[C(x.name,{bold:true}),x.definition,x.test,x.links]),[1500,2800,3000,2338],{size:18}));
ch.push(gap());
ch.push(H3('지도 읽는 법'));
ch.push(new Paragraph({children:[new ImageRun({type:'png',data:fs.readFileSync(path.join(ROOT,'outputs','BCMS_온톨로지맵_V2.png')),transformation:{width:620,height:465},altText:{title:'온톨로지 맵',description:'BCMS 프로세스 22개와 연결 31개를 그린 지도',name:'map'}})],spacing:{after:80}}));
ch.push(B('다섯 개의 세로 구역(① 요구·분석 ~ ⑤ 거버넌스·이해관계자)은 도착 프로세스가 하는 일에 따라 연구자가 묶은 분류입니다. Arias의 PDCA 분류와는 별개입니다.'));
ch.push(B('선 모양이 증거의 강도를 나타냅니다. 실선 = E1(논문이 직접 서술), 파선 = E2(일부 보완), 빨간 점선 = E3(논문에 없는 가설).'));
ch.push(B('원 안의 L01~L31은 연결 번호이고, 엑셀 연결 시트의 같은 ID 행에서 인용과 연구자 의견을 볼 수 있습니다.'));
ch.push(B('맨 아래 "CORE" 상자는 Arias가 "거의 모든 BCMS 프로세스"처럼 프로세스를 열거하지 않고 가리킨 경우를 위해 연구자가 만든 집단 노드입니다(L27, L30).'));

ch.push(H2('4-3. 인용과 의견을 가르는 신호등'));
ch.push(P('연결마다 논문이 얼마나 직접 말했는지에 따라 세 등급으로 나누었습니다.'));
const cnt=e=>LK.filter(l=>l.evidence===e).length;
ch.push(table(['등급','뜻','연결 수','예'],[
 [C('E1 직접',{bold:true,color:GREEN}),'원문이 S→T 연결을 직접 서술. 인용만으로 연결의 존재와 방향이 성립',cnt('E1')+'개','L01 요구사항 → BIA'],
 [C('E2 일부 보완',{bold:true,color:AMBER}),'원문이 연결을 서술하나 출발 또는 도착을 연구자가 특정·보완',cnt('E2')+'개','L10 자원관리 → 솔루션 이행'],
 [C('E3 가정',{bold:true,color:RED}),'원문에 연결 서술이 없음. 연구자 가정 또는 Białas 유추',cnt('E3')+'개','L29 거버넌스 → 정책관리']],[1900,4338,1100,2300]));
ch.push(gap());
ch.push(P('E1이라고 해서 "맞는 연결"이 확정된 것은 아닙니다. 논문이 그렇게 서술했다는 뜻이고, 실제 BCMS에서 성립하는지는 전문가 검증을 거쳐야 합니다. 특히 아래 다섯 개는 전문가 검증에서 가장 먼저 심사할 연결입니다.'));
const hy=[['L10','E2'],['L12','E2'],['L11','E3'],['L17','E3'],['L29','E3']];
const hreason={L10:'원문은 "전략 이행·운영용 자원"만 말함. 도착을 이행관리로 특정한 것은 연구자',L12:'계획 실행은 서술하나 "사고·비상 대응" 프로세스와의 결합은 연구자',L11:'Białas의 BIA 보고서 속성에서 유추. Arias에는 없음',L17:'교육 프로그램은 있으나 계획과의 연결 서술 없음',L29:'각각만 서술. Białas는 정책과 목표를 병렬 항목으로 둠'};
ch.push(table(['ID','연결','등급','왜 가설인가'],hy.map(h=>[h[0],rel(LKM[h[0]]),C(h[1],{bold:true,color:evc(h[1]),align:AlignmentType.CENTER}),hreason[h[0]]]),[800,3300,800,4738],{size:18}));
ch.push(gap());
ch.push(P('이 밖에 포함 관계인 L13, L14(사고·비상 대응이 경보·커뮤니케이션과 복구를 하위 프로세스로 포함)도 연구자 판단이 필요합니다. 포함은 정보의 흐름이 아니라 소속 관계이기 때문입니다. 채택하지 않고 보류한 후보 연결 6개는 엑셀의 보류연결 시트에 이유와 함께 있습니다.'));

ch.push(H2('4-4. 3단계: 반영·확인·갱신을 문항으로'));
ch.push(P('연결 하나마다 문항 3개를 만들었습니다. 같은 연결의 세 문항은 모두 같은 방향(S→T)을 묻습니다.'));
ch.push(table(['상태','뜻 (연구자 정의)','문항의 꼴'],[[C('반영(R)',{bold:true}),'T의 계획·기준·산출물·결정에 S의 산출물이 실제로 사용된 증거가 있다','"~가 ~에 실제로 사용된다 / 포함된다 / 반영된다"'],[C('확인(V)',{bold:true}),'그 반영이 누락·불일치 없이 이루어졌는지 점검·검토·승인·대조하고 기록한다','"~했는지 점검(확인)한다"'],[C('갱신(U)',{bold:true}),'S 또는 T가 바뀔 때 상대를 재검토하고 필요하면 고치는 절차가 있다','"바뀌면 다시 검토하고 고친다"']],[1500,5000,3138]));
ch.push(gap());
ch.push(P('예를 들어 요구사항관리 → BIA 연결(L01)의 문항 세 개입니다.'));
ch.push(table(['ID','상태','문항 (모두 "우리 조직에서는"으로 시작)'],['L01-R','L01-V','L01-U'].map((id,i)=>[id,['반영','확인','갱신'][i],item(id)]),[1200,900,7538]));
ch.push(gap());
ch.push(tipBox('응답 방식과 점수',['5점 척도: 1 전혀 그렇지 않다 ~ 5 매우 그렇다. 9 = 해당 없음/모르겠음(점수에서 제외).','연결 점수 = 반영·확인·갱신 3문항의 평균(9 제외, 최소 2문항 응답 시 산출).','연결 문항은 출발·도착 프로세스가 모두 운영 중일 때만 제시합니다. 프로세스가 없어서 연결이 없는 것과, 있는데 연결이 약한 것을 구분하기 위해서입니다.']));
ch.push(gap());
ch.push(P('문항을 쓸 때 지킨 원칙은 다음과 같습니다.'));
['한 문항에는 반영·확인·갱신 중 하나만 묻는다 (이중 질문 금지)','문장 안에 출발·도착 프로세스(또는 그 산출물)가 모두 나타난다','"잘 연결되어 있다" 같은 평가어 대신 기록·검토·개정처럼 관찰 가능한 행위로 쓴다','의견이 아니라 최근 12개월의 실제 운영을 묻는다','프로세스 이름은 Arias Table 5와 같은 말을 쓴다'].forEach(t=>ch.push(N(t)));
ch.push(P('연결 문항 93개 외에 종합 연계성 6문항, 역문항 4·주의확인 1·준거 4문항을 더해 총 108문항입니다.',{after:80}));

ch.push(H2('4-5. 4단계: 문항이 연계성을 재는지 확인'));
ch.push(P('문항을 다 만들었다고 끝이 아닙니다. 이 문항이 정말 연계성을 재는지 단계적으로 확인합니다. Białas가 온톨로지를 "테스트"하고 "검증"한 방식, 그리고 Arias가 프로세스를 걸러낸 80% 합의 기준을 빌렸습니다.'));
ch.push(table(['순서','무엇을','기준'],[
 [C('인용 검증',{bold:true}),'모든 영문 인용이 PDF 원문에 있는지 프로그램으로 대조','64/64 일치(완료)'],
 [C('구조 점검',{bold:true}),'모든 문항이 연결 1개 × 상태 1개에 대응하는지, 문장에 양쪽 프로세스가 있는지','엑셀 검증 시트에서 자동 점검'],
 [C('전문가 평가',{bold:true}),'전문가 6~10명이 연결과 문항의 적합도를 평가','Arias 방식: 80% 이상 채택, 20~80% 토론, 20% 미만 삭제'],
 [C('인지면담',{bold:true}),'5~8명이 문항을 자기 말로 설명','오해되는 문항 수정'],
 [C('예비조사',{bold:true}),'150명 이상 응답으로 통계 확인','연결별 신뢰도, 반영·확인·갱신 구분, 역문항 일관성, 준거 상관'],
 [C('활용 검증',{bold:true}),'점수로 "어느 연결이 약한가" 같은 질문에 답이 나오는지','Białas의 질의 검증 방식']],[1700,4838,3100]));
ch.push(gap());
ch.push(quoteBox('A44'));
ch.push(gap());
ch.push(opBox('Arias는 이 3단계 판정(80%/20%)을 프로세스의 핵심 여부에 적용했습니다. 문항과 연결에 적용하는 것은 연구자의 준용이고, I-CVI 0.78·α 0.70 같은 통계 기준은 일반적 관례일 뿐 두 논문에 근거가 없습니다.'));

// 5
ch.push(H1('5. 연결 하나를 끝까지 따라가 보기'));
ch.push(P('연결 하나가 "인용 → 사실 → 의견 → 문항"으로 어떻게 이어지는지 두 가지 예로 보겠습니다. 엑셀 연결 시트의 한 행이 바로 이 구조입니다.'));
ch.push(H2('예 1. 연습 결과가 계획을 고친다 (L16, E1)'));
ch.push(P('"훈련·연습"이 "BC 계획·절차"를 수정하게 만드는 연결입니다.'));
ch.push(quoteBox('A23')); ch.push(gap());
ch.push(P([r('인용이 확립하는 사실: ',{bold:true}),r(LKM.L16.established)])); 
ch.push(opBox(LKM.L16.researcher));
ch.push(gap());
ch.push(table(['ID','문항'],['L16-R','L16-V','L16-U'].map(id=>[id,item(id)]),[1200,8438]));
ch.push(H2('예 2. 정책은 거버넌스에서 나온다? (L29, E3)'));
ch.push(P('"BC 거버넌스"가 "BC 정책관리"로 이어지는 연결입니다. 상식적으로는 그럴듯하지만, 논문에서는 이 연결을 확인할 수 없습니다.'));
ch.push(quoteBox('A33')); ch.push(gap()); ch.push(quoteBox('B13')); ch.push(gap());
ch.push(P([r('인용이 확립하는 사실: ',{bold:true}),r(LKM.L29.established)]));
ch.push(opBox(LKM.L29.researcher));
ch.push(gap());
ch.push(tipBox('이 예에서 배울 점',['논문이 말하지 않은 연결은 "그럴듯하다"는 이유만으로 사실처럼 쓰지 않고 E3 가설로 표시했습니다. 전문가 합의가 80%에 못 미치면 삭제합니다(검증 필요: "'+LKM.L29.validation+'").']));

// 6
ch.push(H1('6. 엑셀 공부법'));
ch.push(H2('16개 시트를 세 묶음으로'));
ch.push(P('엑셀은 시트가 16개지만 하는 일에 따라 세 묶음으로 나누면 간단합니다.'));
ch.push(table(['묶음','시트','무엇이 들어 있나'],[
 [C('읽는 시트 (10)',{bold:true,color:BLUE}),'안내','약속과 사용 순서'],
 ['','정의서','용어 17개의 정의. 유형(인용 정의 / 연구자 정의)을 구분'],
 ['','인용근거','인용문 64개: 영문 원문, 쪽, 한국어 번역, 원문 대조 결과'],
 ['','연결','연결 31개. 파란 열(인용), 빨간 열(연구자 의견·지표화), 검증 필요사항'],
 ['','관계유형','관계유형 7개의 정의와 판정 질문'],
 ['','보류연결','채택하지 않은 후보 6개와 이유 (연구자 결정 칸이 있음)'],
 ['','객체','프로세스 22개와 Arias Table의 값'],
 ['','트리플 · 관계매트릭스','같은 연결을 "주어-관계-목적어" 목록과 22×22 표로 표현'],
 ['','온톨로지맵','바통 지도 그림'],
 [C('쓰는 시트 (3)',{bold:true,color:ORANGE}),'문항','문항 108개. 전문가 6명의 적합도(1~4)를 입력하면 I-CVI·판정이 자동 계산됨'],
 ['','보유·응답자정보','응답자 정보 10개와 프로세스 보유 확인 22개'],
 ['','응답입력','설문 응답을 7행부터 입력 (6행은 예시, 집계 제외)'],
 [C('계산 시트 (3)',{bold:true,color:GREEN}),'연결점수','응답자별 연결 점수 (자동)'],
 ['','점수요약','연결·영역·증거유형·상태별 평균, "방치 의심" 표시 (자동)'],
 ['','검증','구조 점검, 역문항 일관성, 단계 가설 확인, 검증 계획 (자동)']],[2200,2400,5038],{size:18}));
ch.push(gap());
ch.push(H2('30분 공부 코스'));
ch.push(P('처음부터 끝까지 읽지 마세요. 연결 하나만 끝까지 이해하면 나머지 30개도 같은 구조입니다.'));
ch.push(table(['순서','시트','시간','할 일'],[
 [C('1',{align:AlignmentType.CENTER}),'안내','3분','"파랑 = 인용, 빨강 = 연구자 의견" 규칙만 확인'],
 [C('2',{align:AlignmentType.CENTER}),'정의서','7분','유형이 "연구자 정의"인 행만 읽기 (연계성, 연결, 반영·확인·갱신 등)'],
 [C('3',{align:AlignmentType.CENTER}),'온톨로지맵','5분','실선·파선·점선을 구분하며 훑어보기'],
 [C('4',{align:AlignmentType.CENTER}),'연결 (L01 한 행)','8분','주 인용 → 인용이 확립하는 사실 → 연구자 의견 → 측정 지표화 순서로 끝까지'],
 [C('5',{align:AlignmentType.CENTER}),'문항 + 점수요약','7분','L01-R/V/U 문항을 읽고 점수요약에서 같은 연결 행을 찾기']],[800,2200,900,5738]));
ch.push(gap());
ch.push(tipBox('엑셀 팁',['연결 시트에서 "증거유형" 열을 필터로 E1만 보면 확실한 연결부터 익힐 수 있습니다.','문항 시트의 "연결(S→T)" 열은 연결 시트와 자동 연동됩니다. 연결 ID(L01 등)로 두 시트를 오가며 보세요.','노란 칸이 입력 칸입니다. 그 밖의 칸은 수식이니 고치지 마세요.']));
ch.push(H2('자주 하는 질문'));
const faq=[
 ['연결이 왜 25개에서 31개가 됐나요?','V1에서는 한 연결에 출발이나 도착이 여러 개인 경우가 있었습니다. V2는 연결을 "출발 하나 → 도착 하나"로 정의하고, 한 문장에 여러 연결이 있으면 쪼갰습니다. 예: 변경관리 산출물 한 문장이 L23~L26 네 개가 됐습니다.'],
 ['E1이면 맞는 연결이라는 뜻인가요?','아닙니다. 논문이 그렇게 서술했다는 뜻입니다. 실제 BCMS에서 성립하는지는 전문가 검증이 필요합니다. 또한 문항 문구는 모두 연구자의 문항화입니다.'],
 ['왜 반영·확인·갱신 3개인가요?','연결이 "있다 → 믿을 수 있다 → 살아 있다"로 성숙한다고 보았기 때문입니다. 이 구분은 두 논문에 없는 연구자 정의입니다. 반영 ≥ 확인 ≥ 갱신 순으로 점수가 낮아질 것이라는 가설도 예비조사에서 확인합니다.'],
 ['CORE 노드는 왜 있나요?','Arias가 "거의 모든 BCMS 프로세스의 결과"처럼 프로세스를 열거하지 않고 말한 곳(L27, L30)을 표현하려고 연구자가 만든 가상 노드입니다. 전문가에게 적절한지 물을 예정입니다.'],
 ['영역 ①~⑤는 논문의 분류인가요?','아닙니다. 도착 프로세스가 하는 일에 따라 연구자가 묶은 분류입니다. 논문의 PDCA 분류는 객체 시트에 따로 있습니다.'],
 ['Białas 논문은 BS 25999 기반인데 왜 쓰나요?','클래스 목록이 아니라 방법(객체·관계 정의, competency question, 검증 방식)만 가져왔습니다. 방법은 표준이 바뀌어도 쓸 수 있습니다.'],
 ['응답 9번은 무엇인가요?','해당 없음/모르겠음입니다. 점수 계산에서 결측으로 처리해 "연결이 약함"과 구분합니다.'],
 ['역문항은 무엇인가요?','같은 내용을 반대로 묻는 문항(RV1~4, CR4)입니다. 응답을 성실하게 했는지 확인하려고 넣었고, 분석할 때는 6에서 뺀 값으로 뒤집어 씁니다.']];
faq.forEach((f,i)=>{ch.push(P([r('Q'+(i+1)+'. '+f[0],{bold:true,color:NAVY})],{after:40,keepNext:true})); ch.push(P(f[1],{indent:{left:300},after:140}));});

// 7
ch.push(H1('7. 결과를 읽는 법'));
ch.push(P('설문 응답을 입력하면 점수요약 시트에서 연결마다 반영·확인·갱신 평균이 나옵니다. 이 세 점수의 모양으로 연결의 상태를 읽을 수 있습니다.'));
ch.push(table(['점수 모양','읽는 법'],[[C('반영 높음, 갱신 낮음',{bold:true}),'한 번 만들어 놓고 방치된 연결입니다. 점수요약 시트에서 R−U 격차가 1점 이상이면 "방치 의심"으로 표시됩니다.'],[C('반영 낮음',{bold:true}),'연결 자체가 약합니다. 출발 프로세스의 결과가 도착 프로세스에 거의 쓰이지 않습니다.'],[C('확인 낮음',{bold:true}),'넘기고 받기는 하지만 제대로 받았는지 점검하지 않습니다.'],[C('모두 높음',{bold:true}),'바통이 잘 넘어가고, 점검되고, 바뀌어도 이어지는 연결입니다.']],[2700,6938]));
ch.push(gap());
ch.push(P('영역별(①~⑤) 평균과 증거유형별(E1/E2/E3) 평균도 나옵니다. 만약 E3 가설 연결의 점수가 E1과 크게 다르다면 그 연결을 문항에서 유지할지 다시 검토할 근거가 됩니다. 조직의 종합 연계성 지수는 31개 연결 점수의 평균입니다.'));

// 8
ch.push(H1('8. 연구자께서 정할 일 · 한계'));
ch.push(H2('연구자께서 정할 일'));
[['가설 연결 5개를 유지할지','L10, L11, L12, L17, L29 (E2 2개, E3 3개)'],['포함 관계 2개를 연결로 볼지','L13, L14 — "하위 프로세스"는 흐름이 아니라 포함 관계'],['집단 노드 CORE를 쓸지','L27, L30 — Arias는 "거의 모든 프로세스"라고만 서술'],['보류 연결 6개의 포함 여부','보류연결 시트의 "연구자 결정" 칸에 기록'],['연구자 정의 확정','정의서에서 유형이 "연구자 정의"인 항목 (연계성, 연결, 반영·확인·갱신, 관계유형, 영역 분류 등)']].forEach(x=>ch.push(N([r(x[0],{bold:true}),r(' — '+x[1])],'num2')));
ch.push(H2('한계'));
['연결 31개는 전문가 검증 전 가설입니다. Arias는 프로세스가 핵심인지를 검증했을 뿐 연결을 검증하지 않았고, 프로세스 흐름도는 논문에서 생략했습니다(인용 A06).','반영·확인·갱신 구분, 관계유형 이름, 영역 분류, 집단 노드는 두 논문에 없는 연구자 설계입니다.','Białas(2010)는 BS 25999 기반 프로토타입이며, 본 연구는 방법만 차용했습니다.','Arias의 전문가는 독일의 BC 전문가라서 한국 조직에 적용하려면 현지 전문가 검증이 필요합니다.','통계 기준(I-CVI 0.78, α 0.70 등)은 일반적 관례이며 논문 근거가 없습니다.'].forEach(t=>ch.push(B(t)));
ch.push(gap()); ch.push(quoteBox('A06'));

// 부록
ch.push(new Paragraph({children:[new PageBreak()]}));
ch.push(H1('부록. 연결 31개 한눈에 보기'));
ch.push(P('주 인용 ID는 엑셀 인용근거 시트와 근거정의서에서 영문 원문을 찾을 수 있는 번호입니다. 인용이 없는 E3 연결은 보조 인용(유추 근거)만 표시했습니다.',{size:19,color:GREY}));
ch.push(table(['ID','연결 (S → T)','관계유형','증거','인용 ID'],LK.map(l=>[l.id,rel(l),l.relation,C(l.evidence,{bold:true,color:evc(l.evidence),align:AlignmentType.CENTER}),(l.quotes_primary.length?l.quotes_primary.join(', '):'없음 (보조: '+l.quotes_support.join(', ')+')')]),[700,3800,1700,700,2738],{size:17}));

const doc=new Document({creator:'박사논문 프로젝트',title:'BCMS 프로세스 연계성 쉽게 읽는 해설서 (V2)',
 styles:{default:{document:{run:{font:FONT,size:21}}},paragraphStyles:[
  {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:34,bold:true,color:NAVY,font:FONT},paragraph:{spacing:{before:320,after:160},outlineLevel:0}},
  {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:27,bold:true,color:BLUE,font:FONT},paragraph:{spacing:{before:260,after:120},outlineLevel:1}},
  {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{size:23,bold:true,color:NAVY,font:FONT},paragraph:{spacing:{before:200,after:100},outlineLevel:2}}]},
 numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:270}}}},{level:1,format:LevelFormat.BULLET,text:'–',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:1000,hanging:270}}}}]},
  {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:360}}}}]},
  {reference:'num2',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:540,hanging:360}}}}]}]},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1134,bottom:1134,left:1134,right:1134}}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'BCMS 프로세스 연계성 해설서 (V2) · ',font:FONT,size:17,color:GREY}),new TextRun({children:[PageNumber.CURRENT],font:FONT,size:17,color:GREY})]})]})},
  children:ch}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync(OUT,b);console.log('saved',OUT);});
