// 이야기식 설명 PPT 생성: data/*.json + outputs/BCMS_온톨로지맵_V2.png -> outputs/BCMS_연계성_이야기로_이해하기.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const React=require('react'),ReactDOMServer=require('react-dom/server'),sharp=require('sharp');
const fa=require('react-icons/fa');
const SKILL=process.env.PPTX_SKILL_DIR;
const {applyTheme}=require(path.join(SKILL,'scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=n=>JSON.parse(fs.readFileSync(path.join(ROOT,'data',n),'utf8'));
const Q=Object.fromEntries(J('quotes.json').map(q=>[q.id,q])), LK=Object.fromEntries(J('links.json').map(l=>[l.id,l]));
const IT=J('items.json'); const item=id=>IT.find(i=>i.id===id).text;
const OUT=path.join(ROOT,'outputs','BCMS_연계성_이야기로_이해하기.pptx');

const THEME={name:'BCMS Relay',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'F26B38',accent2:'1F6F8B',accent3:'2E9E6B',accent4:'E8A317',accent5:'D64545',accent6:'6B7A90',hlink:'1F6F8B',folHlink:'6B7A90'}};
const HEX=THEME.colors;
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE'; pres.theme={headFontFace:THEME.headFontFace,bodyFontFace:THEME.bodyFontFace};
pres.title='BCMS 프로세스 연계성, 이야기로 이해하기'; pres.author='박사논문 프로젝트'; 
const C=pres.SchemeColor; const SH=pres.shapes;
const W=13.33,H=7.5,M=0.6,CW=W-2*M;

pres.defineSlideMaster({title:'TITLE_DARK',background:{color:HEX.dk2},objects:[
 {placeholder:{options:{name:'title',type:'title',x:0.9,y:2.1,w:11.5,h:1.9,fontSize:46,bold:true,color:C.background1,valign:'middle',align:'left',margin:0},text:''}},
 {placeholder:{options:{name:'body',type:'body',x:0.9,y:4.2,w:11.5,h:1.2,fontSize:22,color:'CADCFC',valign:'top',margin:0},text:''}}]});
pres.defineSlideMaster({title:'CONTENT',background:{color:HEX.lt1},objects:[
 {placeholder:{options:{name:'title',type:'title',x:M,y:0.35,w:CW,h:0.95,fontSize:34,bold:true,color:C.text2,valign:'middle',align:'left',margin:0},text:''}},
 {text:{text:'BCMS 프로세스 연계성 · 이야기로 이해하기',options:{x:M,y:7.0,w:8,h:0.3,fontSize:10,color:C.accent6,margin:0}}}],
 slideNumber:{x:W-1.2,y:7.0,w:0.6,h:0.3,fontSize:10,color:C.accent6,align:'right'}});
pres.defineSlideMaster({title:'CLOSING',background:{color:HEX.dk2},objects:[
 {placeholder:{options:{name:'title',type:'title',x:0.9,y:0.9,w:11.5,h:1.5,fontSize:40,bold:true,color:C.background1,valign:'middle',align:'left',margin:0},text:''}}]});

async function icon(Comp,color){const svg=ReactDOMServer.renderToStaticMarkup(React.createElement(Comp,{color:'#'+color,size:'256'}));
  const buf=await sharp(Buffer.from(svg)).png().toBuffer(); return 'image/png;base64,'+buf.toString('base64');}
const shadow=()=>({type:'outer',color:'000000',opacity:0.12,blur:6,offset:2,angle:90});
function card(s,x,y,w,h,o={}){s.addShape(SH.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.12,fill:o.fill||{color:C.background2},line:o.line||{color:'E1E6EE',width:0.75},shadow:o.noShadow?undefined:shadow(),objectName:o.name||'card'});}
function txt(s,t,x,y,w,h,o={}){s.addText(t,Object.assign({x,y,w,h,fontSize:16,color:C.text1,valign:'top',margin:0,isTextBox:true,fit:'none'},o));}
function circ(s,n,x,y,d,color){s.addShape(SH.OVAL,{x,y,w:d,h:d,fill:{color:color||C.accent1},line:{color:color||C.accent1,width:0.5},objectName:'badge'});
  s.addText(String(n),{x,y,w:d,h:d,fontSize:Math.round(d*30),bold:true,color:C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});}
function chip(s,t,x,y,w,fill,fcolor){s.addShape(SH.ROUNDED_RECTANGLE,{x,y,w,h:0.34,rectRadius:0.17,fill:{color:fill},line:{color:fill,width:0.5},objectName:'chip'});
  s.addText(t,{x,y,w,h:0.34,fontSize:12,bold:true,color:fcolor||C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});}
function slide(title,section,notes){const s=pres.addSlide({masterName:'CONTENT',sectionTitle:section});s.addText(title,{placeholder:'title'});if(notes)s.addNotes(notes);return s;}

(async()=>{
const ic={users:await icon(fa.FaUsers,HEX.accent2),file:await icon(fa.FaFileAlt,HEX.accent1),link:await icon(fa.FaLink,HEX.accent3),
 check:await icon(fa.FaCheckCircle,HEX.accent3),sync:await icon(fa.FaSyncAlt,HEX.accent2),hand:await icon(fa.FaHandHolding,HEX.accent1),
 book:await icon(fa.FaBookOpen,HEX.accent2),search:await icon(fa.FaSearch,HEX.accent1),flag:await icon(fa.FaFlagCheckered,HEX.accent1)};

pres.addSection({title:'도입'});
// 1 title
let s=pres.addSlide({masterName:'TITLE_DARK',sectionTitle:'도입'});
s.addText('BCMS 프로세스 연계성,\n이야기로 이해하기',{placeholder:'title'});
s.addText('릴레이 바통 이야기로 읽는 문항 개발 과정 (V2)\n박사논문 프로젝트 · 근거: Arias(2026), Białas(2010)',{placeholder:'body'});
s.addNotes('오늘은 엑셀 시트 16개를 하나씩 보지 않고, 릴레이 달리기 이야기로 연구 전체를 한 번에 이해해 봅니다. 마지막에 엑셀을 어떤 순서로 공부하면 되는지 알려 드립니다.');

// 2 question
s=slide('이 연구가 묻는 것','도입','규정과 절차를 다 갖춘 조직이 많습니다. 문제는 위기가 왔을 때 부서들이 실제로 이어져 움직이느냐입니다. Arias 논문도 체크리스트 방식이 지속 가능한 운영으로 이어지지 않는다고 지적합니다. 그래서 이 연구는 프로세스가 있는지가 아니라, 프로세스끼리 이어져 유지되는지를 잽니다.');
card(s,M,1.6,6.0,4.7,{fill:{color:C.text2},name:'question'});
txt(s,'규정은 다 갖췄는데,\n위기 때 부서들은\n정말 이어질까?',M+0.5,2.1,5.0,2.4,{fontSize:32,bold:true,color:C.background1,valign:'middle'});
txt(s,'그래서 "있는가"가 아니라\n"이어져 유지되는가"를 잽니다.',M+0.5,4.7,5.0,1.2,{fontSize:18,color:'CADCFC'});
card(s,7.0,1.6,5.73,4.7,{name:'quote'});
chip(s,'인용 · Arias p.2',7.3,1.9,1.9,HEX.accent2);
txt(s,'"'+Q.A05.text+'"',7.3,2.45,5.15,2.3,{fontSize:18,italic:true,color:C.text1});
txt(s,Q.A05.ko,7.3,4.75,5.15,1.4,{fontSize:15,color:C.accent6});

// 3 relay
s=slide('릴레이 바통 이야기','도입','BCMS를 릴레이 달리기로 생각해 보세요. 요구사항관리, BIA, 리스크평가 같은 프로세스가 각자 구간을 맡은 주자입니다. 주자가 다음 주자에게 넘기는 것이 바통, 곧 BIA 결과나 리스크 목록 같은 산출물입니다. 누가 누구에게 바통을 넘기는지가 연결입니다. 연계성은 이 바통이 실제로 잘 넘어가는 정도입니다.');
const cols=[[ic.users,'주자 = 프로세스','22개','요구사항관리, BIA, 리스크평가, 복구…\n각자 맡은 구간이 있다'],[ic.file,'바통 = 산출물','문서·기록·결정','BIA 결과, 리스크 목록, 계획서처럼\n다음 주자에게 넘기는 것'],[ic.link,'전달 = 연결','31개','누가 누구에게 바통을 넘기는가\n(출발 → 도착 한 쌍)']];
cols.forEach((c,i)=>{const x=M+i*4.1; card(s,x,1.6,3.93,3.5,{name:'relay'+i});
 s.addImage({data:c[0],x:x+0.35,y:1.9,w:0.7,h:0.7,altText:c[1]});
 txt(s,c[1],x+0.35,2.8,3.3,0.5,{fontSize:22,bold:true,color:C.text2});
 txt(s,c[2],x+0.35,3.35,3.3,0.5,{fontSize:18,bold:true,color:C.accent1});
 txt(s,c[3],x+0.35,3.95,3.3,1.0,{fontSize:16});});
s.addShape(SH.ROUNDED_RECTANGLE,{x:M,y:5.45,w:CW,h:1.2,rectRadius:0.12,fill:{color:C.accent1},line:{color:C.accent1,width:0.5},objectName:'banner'});
txt(s,'연계성 = 바통이 실제로 넘어가고, 확인되고, 주자가 바뀌어도 이어지는 정도',M+0.4,5.45,CW-0.8,1.2,{fontSize:22,bold:true,color:C.background1,valign:'middle',align:'center'});

// 4 glossary
s=slide('이 말만 알면 됩니다','도입','여섯 가지 용어만 기억하면 됩니다. 오른쪽 위에 붙은 표시를 보세요. 파란 표시는 논문에서 가져온 개념이고, 주황 표시는 제가 정의한 연구자 정의입니다. 박사논문에서는 주황 표시 항목을 연구자께서 직접 확정하셔야 합니다.');
const gl=[['프로세스(객체)','22개 BCMS 프로세스. 입력을 출력으로 바꾸는, 서로 관련된 활동의 묶음','인용 개념'],['산출물','프로세스가 만들어 다음 프로세스가 쓰는 문서·기록·보고·결정','인용 개념'],
['연결','프로세스 S의 산출물이 T에 쓰이는 방향 있는 한 쌍 (S → T)','연구자 정의'],['연계성','연결이 반영·확인·갱신되는 정도 (이 연구가 재는 것)','연구자 정의'],
['반영·확인·갱신','반영=받아 썼다 · 확인=맞게 받았는지 점검 · 갱신=바뀌면 다시 맞춘다','연구자 정의'],['증거유형 E1/E2/E3','논문이 연결을 직접 말했나? 직접(E1) · 일부 보완(E2) · 가정(E3)','연구자 정의']];
gl.forEach((g,i)=>{const x=M+(i%3)*4.1,y=1.55+Math.floor(i/3)*2.55; card(s,x,y,3.93,2.35,{name:'gloss'+i});
 chip(s,g[2],x+3.93-1.5-0.2,y+0.18,1.5,g[2]==='인용 개념'?HEX.accent2:HEX.accent1);
 txt(s,g[0],x+0.3,y+0.65,3.4,0.5,{fontSize:19,bold:true,color:C.text2}); txt(s,g[1],x+0.3,y+1.2,3.35,1.05,{fontSize:14});});

// 5 two papers
s=slide('두 논문의 역할','도입','두 논문은 역할이 다릅니다. Arias는 어떤 프로세스가 있고 서로 어떻게 이어지는지에 대한 단서를 줍니다. Białas는 그 연결을 지도로 그리는 방법, 즉 온톨로지 방법을 줍니다. 그래서 연결 자체는 Arias에서, 정의하고 검증하는 방식은 Białas에서 가져왔습니다. 다만 둘 다 한계가 분명해서 다음 슬라이드에서 솔직하게 표시합니다.');
const pp=[['Arias (2026)','누가 뛰는가 · 바통이 어디로 가는가',['한 일: BCMS 22개 프로세스를 정리하고 전문가 39명이 검증','가져온 것: 22개 프로세스 + 프로세스 설명 속 "무엇이 무엇에 쓰이는가" 문장','한계: 프로세스는 검증했지만 연결은 검증하지 않음']],
['Białas (2010)','바통 이동을 지도로 그리는 방법',['한 일: BCMS를 온톨로지(개념 지도)로 만드는 방법을 제시','가져온 것: 방법만 — 객체·관계 정의, competency question, 검증 방식','한계: BS 25999 기반 프로토타입이라 클래스 목록은 쓰지 않음']]];
pp.forEach((p,i)=>{const x=M+i*6.17; card(s,x,1.6,5.96,4.9,{name:'paper'+i});
 txt(s,p[0],x+0.4,1.85,5.2,0.5,{fontSize:24,bold:true,color:C.text2}); txt(s,p[1],x+0.4,2.4,5.2,0.5,{fontSize:16,bold:true,color:C.accent1});
 s.addText(p[2].map((t,j)=>({text:t,options:{bullet:true,breakLine:j<2,paraSpaceAfter:10}})),{x:x+0.4,y:3.15,w:5.2,h:3.2,fontSize:18,color:C.text1,valign:'top',margin:0,isTextBox:true});});

pres.addSection({title:'만든 과정'});
// 6 four steps
s=slide('4단계로 만들었습니다','만든 과정','연구는 네 걸음입니다. 첫째 Arias 문장에서 연결 근거를 찾고, 둘째 Białas 방식으로 객체와 관계를 정의하고, 셋째 연결이 반영·확인·갱신되는 상태를 문항으로 만들고, 넷째 그 문항이 정말 연계성을 재는지 검증합니다. 각 단계에 해당하는 엑셀 시트도 적어 두었습니다.');
const st=[['연결 근거 찾기','Arias 문장에서 "무엇이 무엇에 쓰이는지" 찾기','엑셀: 인용근거 · 연결'],['객체·관계 정의','Białas 방식으로 22개 객체, 31개 연결, 7개 관계유형','엑셀: 객체 · 관계유형 · 트리플'],['문항으로 표현','연결마다 반영·확인·갱신 3문항','엑셀: 문항'],['검증','문항이 연계성을 재는지 확인','엑셀: 검증']];
st.forEach((t,i)=>{const x=M+i*3.1; card(s,x,1.7,2.88,3.7,{name:'step'+i}); circ(s,i+1,x+0.3,1.95,0.7);
 txt(s,t[0],x+0.3,2.85,2.4,0.5,{fontSize:19,bold:true,color:C.text2}); txt(s,t[1],x+0.3,3.4,2.35,1.2,{fontSize:14}); txt(s,t[2],x+0.3,4.75,2.4,0.5,{fontSize:13,bold:true,color:C.accent2});
 if(i<3) s.addText('▶',{x:x+2.88-0.05,y:3.3,w:0.3,h:0.4,fontSize:16,color:C.accent1,align:'center',margin:0,isTextBox:true});});
s.addShape(SH.ROUNDED_RECTANGLE,{x:M,y:5.7,w:CW,h:0.95,rectRadius:0.12,fill:{color:C.text2},line:{color:C.text2,width:0.5},objectName:'tagline'});
txt(s,'온톨로지는 "무엇과 무엇의 연결을 재는가"를 정하고, 설문은 "그 연결이 얼마나 유지되는가"를 잰다',M+0.4,5.7,CW-0.8,0.95,{fontSize:17,bold:true,color:C.background1,valign:'middle',align:'center'});

// 7 step1 example L01
s=slide('1단계: 문장에서 바통 찾기','만든 과정','예를 하나 보겠습니다. Arias 15쪽에 요구사항이 BIA, 리스크평가, 내부감사, 공급망관리에 정보를 제공한다는 문장이 있습니다. 왼쪽은 논문 원문 그대로이고, 오른쪽은 제가 거기에 얹은 해석입니다. 한 문장에 네 개의 바통이 들어 있어서 네 개의 연결로 쪼갰습니다.');
card(s,M,1.5,5.95,3.7,{name:'quoteL01'}); chip(s,'인용 · Arias p.15',M+0.3,1.75,1.9,HEX.accent2);
txt(s,'"'+Q.A11.text+'"',M+0.3,2.25,5.4,1.7,{fontSize:15,italic:true}); txt(s,Q.A11.ko,M+0.3,4.05,5.4,1.1,{fontSize:13,color:C.accent6});
card(s,6.78,1.5,5.95,3.7,{name:'opinionL01'}); chip(s,'연구자 의견',7.08,1.75,1.5,HEX.accent1);
s.addText([{text:'"inform"을 "요구사항 결과가 BIA의 입력·기준이 된다"로 해석했습니다.',options:{bullet:true,breakLine:true,paraSpaceAfter:10}},{text:'한 문장에 4개가 있어 4개 연결(L01·L02·L04·L05)로 쪼갰습니다.',options:{bullet:true,breakLine:true,paraSpaceAfter:10}},{text:'전문가 패널에게 "정말 입력되는가"를 물어 확인할 예정입니다.',options:{bullet:true}}],{x:7.08,y:2.3,w:5.4,h:2.7,fontSize:15,color:C.text1,valign:'top',margin:0,isTextBox:true});
[['REQ','요구사항관리',M+1.2],['BIA','BIA·중요도 분석',M+7.3]].forEach(b=>{s.addShape(SH.ROUNDED_RECTANGLE,{x:b[2],y:5.55,w:3.4,h:1.1,rectRadius:0.12,fill:{color:C.accent2},line:{color:C.accent2,width:0.5},objectName:'node'});
 s.addText([{text:b[0],options:{bold:true,fontSize:20,breakLine:true}},{text:b[1],options:{fontSize:15}}],{x:b[2],y:5.55,w:3.4,h:1.1,color:C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});});
s.addShape(SH.RIGHT_ARROW,{x:M+4.8,y:5.8,w:2.3,h:0.6,fill:{color:C.accent1},line:{color:C.accent1,width:0.5},objectName:'baton'});
txt(s,'바통',M+4.8,5.8,1.9,0.6,{fontSize:14,bold:true,color:C.background1,valign:'middle',align:'center'});

// 8 map
s=slide('2단계: 바통 지도','만든 과정','이것이 온톨로지 맵입니다. 22개 주자가 다섯 구역에 놓여 있고 31개 바통 전달이 선으로 그려져 있습니다. 실선은 논문이 직접 말한 연결, 파선은 일부를 제가 보완한 연결, 빨간 점선은 논문에 없는 가설입니다. 지하철 노선도처럼 어디가 단단하고 어디가 가설인지 한눈에 볼 수 있습니다.');
s.addImage({path:path.join(ROOT,'outputs','BCMS_온톨로지맵_V2.png'),x:M,y:1.45,w:7.2,h:5.4,altText:'BCMS 프로세스 연계성 온톨로지 맵'});
[['22','주자(프로세스)',C.accent2],['31','바통 전달(연결)',C.accent1],['7','연결의 종류(관계유형)',C.accent3]].forEach((t,i)=>{const y=1.6+i*1.45;card(s,8.2,y,4.53,1.25,{name:'stat'+i});
 txt(s,t[0],8.45,y,1.3,1.25,{fontSize:40,bold:true,color:t[2],valign:'middle'}); txt(s,t[1],9.75,y,2.9,1.25,{fontSize:16,valign:'middle'});});
txt(s,'선 모양: 실선 = 논문이 직접 서술 · 파선 = 일부 보완 · 빨간 점선 = 가설',8.2,6.0,4.53,0.8,{fontSize:13,color:C.accent6});

// 9 evidence
s=slide('인용과 의견을 구분했습니다','만든 과정','가장 중요한 약속입니다. 31개 연결 중 26개는 논문이 직접 말한 연결, 2개는 출발이나 도착을 제가 보완한 연결, 3개는 논문에 없어서 제가 가정한 연결입니다. 엑셀에서는 파란 열이 논문 인용, 빨간 열이 연구자 의견입니다. 인용문 64개는 PDF 원문과 프로그램으로 대조해 모두 일치했습니다.');
[['26','E1 직접','논문이 연결을 직접 서술',C.accent3],['2','E2 일부 보완','출발·도착 일부를 연구자가 특정',C.accent4],['3','E3 가정','논문에 없음, 연구자 가정',C.accent5]].forEach((t,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,2.9,{name:'ev'+i});
 txt(s,t[0],x+0.35,1.8,3.2,1.2,{fontSize:66,bold:true,color:t[3],valign:'middle'}); txt(s,t[1],x+0.35,3.05,3.3,0.5,{fontSize:20,bold:true,color:C.text2}); txt(s,t[2],x+0.35,3.6,3.3,0.7,{fontSize:15});});
card(s,M,4.8,CW,1.85,{name:'rule'});
s.addShape(SH.RECTANGLE,{x:M+0.35,y:5.15,w:0.45,h:0.45,fill:{color:C.accent2,transparency:70},line:{color:C.accent2,width:1},objectName:'legendQ'});
txt(s,'파란 열 = 논문 인용 (영문 원문 + 쪽 번호, 64개 중 64개 원문 일치)',M+1.0,5.15,10.8,0.45,{fontSize:16,valign:'middle'});
s.addShape(SH.RECTANGLE,{x:M+0.35,y:5.85,w:0.45,h:0.45,fill:{color:C.accent5,transparency:70},line:{color:C.accent5,width:1},objectName:'legendO'});
txt(s,'빨간 열 = 연구자 의견 (해석·보완·가정·분류는 정의서에서 정의)',M+1.0,5.85,10.8,0.45,{fontSize:16,valign:'middle'});

// 10 three states
s=slide('3단계: 반영·확인·갱신','만든 과정','바통이 잘 넘어갔는지는 세 가지로 봅니다. 반영은 바통을 받아서 실제로 썼는가, 확인은 제대로 받았는지 점검했는가, 갱신은 주자나 바통이 바뀌면 다시 맞춰 보는가입니다. 연결 하나마다 이 세 가지를 묻는 문항을 하나씩 만들었습니다. 예시는 요구사항관리에서 BIA로 가는 연결입니다.');
const sts=[[ic.hand,'반영','바통을 받아서 실제로 썼는가','L01-R'],[ic.check,'확인','제대로 받았는지 점검했는가','L01-V'],[ic.sync,'갱신','바뀌면 다시 맞춰 보는가','L01-U']];
sts.forEach((t,i)=>{const x=M+i*4.1;card(s,x,1.55,3.93,4.5,{name:'state'+i});
 s.addImage({data:t[0],x:x+0.35,y:1.8,w:0.65,h:0.65,altText:t[1]}); txt(s,t[1],x+1.2,1.8,2.5,0.65,{fontSize:26,bold:true,color:C.text2,valign:'middle'});
 txt(s,t[2],x+0.35,2.7,3.3,0.7,{fontSize:16,bold:true,color:C.accent1});
 s.addShape(SH.ROUNDED_RECTANGLE,{x:x+0.3,y:3.5,w:3.33,h:2.35,rectRadius:0.1,fill:{color:C.background1},line:{color:'E1E6EE',width:0.75},objectName:'sample'});
 txt(s,'예시 문항 '+t[3],x+0.5,3.6,3.0,0.3,{fontSize:11,bold:true,color:C.accent6}); txt(s,'우리 조직에서는 '+item(t[3]),x+0.5,3.95,2.95,1.85,{fontSize:14});});
txt(s,'각 연결마다 이 3문항을 묻고, 평균을 그 연결의 점수로 삼습니다. "1~5점 + 9(해당 없음)"로 응답합니다.',M,6.3,CW,0.5,{fontSize:15,color:C.accent6});

// 11 anatomy L16
const l16=LK.L16;
s=slide('연결 하나를 끝까지 보면','만든 과정','연습 결과가 계획 수정으로 이어지는 연결 하나를 끝까지 따라가 보겠습니다. 논문 인용에서 시작해서, 인용이 확실히 말하는 것, 제가 덧붙인 해석, 그리고 최종 문항 세 개로 이어집니다. 어디까지가 논문이고 어디부터가 제 의견인지가 눈에 보입니다.');
const an=[['① 인용 (Arias p.15)',C.accent2,'"'+Q.A23.text.replace('The process of exercising BC plans and procedures ensures that BC strategies and solutions and their corresponding BC plans and procedures, including warning and communication procedures, are tested regularly to validate their effectiveness and ','…')+'"'],
['② 인용이 확립하는 사실',C.accent2,'연습은 필요한 조정·개선을 촉구한다.'],['③ 연구자 의견',C.accent5,'조정 대상은 전략·솔루션·계획·절차 모두이나, 본 연결은 BC 계획·절차로 한정했습니다. 방향 해석(연습 결과가 계획을 고친다)도 연구자 해석입니다.'],['④ 문항 3개',C.accent1,'반영: '+item('L16-R')+'\n확인: '+item('L16-V')+'\n갱신: '+item('L16-U')]];
const ay=[1.5,3.0,3.95,5.15], ah=[1.35,0.8,1.1,1.7];
an.forEach((a,i)=>{card(s,M,ay[i],CW,ah[i],{name:'anat'+i});
 txt(s,a[0],M+0.3,ay[i]+0.1,3.0,ah[i]-0.2,{fontSize:15,bold:true,color:a[1],valign:'middle'}); txt(s,a[2],M+3.5,ay[i]+0.08,CW-3.8,ah[i]-0.16,{fontSize:i===3?13:i===0?13:15,valign:'middle',italic:i===0});});

// 12 hypotheses
s=slide('가설인 연결 5개','만든 과정','솔직하게 말씀드려야 할 부분입니다. 31개 중 5개는 논문만으로는 근거가 부족합니다. 두 개는 제가 출발이나 도착을 보완했고, 세 개는 논문에 서술이 없습니다. 이 다섯 개는 전문가 검증에서 가장 먼저 심사하고, 합의가 80퍼센트 미만이면 삭제합니다.');
const hy=[['L10','자원관리 → 솔루션 이행','E2','원문은 "전략 이행·운영용 자원"만 말함. 도착을 이행관리로 특정한 것은 연구자'],['L12','BC 계획·절차 → 사고·비상 대응','E2','계획 실행은 서술, "사고 대응" 프로세스와의 결합은 연구자'],['L11','BIA → 자원관리','E3','Białas의 BIA 보고서 속성에서 유추. Arias에는 없음'],['L17','BC 계획·절차 → 인식·교육','E3','교육 프로그램은 있으나 계획과의 연결 서술 없음'],['L29','거버넌스 → 정책관리','E3','각각만 서술. Białas는 정책과 목표를 병렬 항목으로 둠']];
const hdrO={bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:14,fontFace:'맑은 고딕',valign:'middle'};
const rows=[[{text:'ID',options:hdrO},{text:'연결',options:hdrO},{text:'등급',options:hdrO},{text:'왜 가설인가',options:hdrO}]];
hy.forEach(h=>rows.push([{text:h[0],options:{bold:true,fontSize:14,fontFace:'맑은 고딕',valign:'middle'}},{text:h[1],options:{fontSize:14,fontFace:'맑은 고딕',valign:'middle'}},{text:h[2],options:{bold:true,fontSize:14,fontFace:'맑은 고딕',align:'center',valign:'middle',color:'FFFFFF',fill:{color:h[2]==='E2'?HEX.accent4:HEX.accent5}}},{text:h[3],options:{fontSize:14,fontFace:'맑은 고딕',valign:'middle'}}]));
s.addTable(rows,{x:M,y:1.6,w:CW,colW:[0.9,3.6,0.9,6.73],rowH:[0.5,0.8,0.8,0.8,0.8,0.8],border:{type:'solid',pt:0.75,color:'D0D5DD'},autoPage:false});

pres.addSection({title:'검증과 활용'});
// 13 validation
s=slide('4단계: 맞게 쟀는지 확인','검증과 활용','마지막 단계는 이 문항이 정말 연계성을 재는지 확인하는 것입니다. 먼저 전문가 6~10명이 문항과 연결을 평가합니다. Arias가 프로세스를 검증할 때 쓴 80퍼센트 합의 기준을 그대로 빌립니다. 다음으로 5~8명에게 문항을 읽게 해서 이해를 확인하고, 마지막으로 150명 이상의 예비조사로 통계를 봅니다. 결과는 반영이 높은데 갱신이 낮은 연결을 찾는 데 씁니다.');
const vs=[['전문가 평가','6~10명','80% 이상 채택 · 20~80% 토론 · 20% 미만 삭제 (Arias 방식)'],['인지면담','5~8명','문항을 자기 말로 바꿔 설명하게 해 오해 찾기'],['예비조사','150명 이상','신뢰도, R·V·U 구분, 역문항 일관성, 준거 상관']];
vs.forEach((v,i)=>{const y=1.55+i*1.75;card(s,M,y,6.9,1.55,{name:'val'+i}); circ(s,i+1,M+0.3,y+0.4,0.75); txt(s,v[0]+'  ·  '+v[1],M+1.35,y+0.2,5.4,0.5,{fontSize:19,bold:true,color:C.text2}); txt(s,v[2],M+1.35,y+0.75,5.4,0.75,{fontSize:14});});
card(s,7.8,1.55,4.93,5.05,{fill:{color:C.text2},name:'reading'});
txt(s,'결과는 이렇게 읽습니다',8.1,1.8,4.4,0.5,{fontSize:20,bold:true,color:C.background1});
txt(s,'반영 높고 갱신 낮음\n→ 한 번 만들고 방치된 연결\n\n반영 낮음\n→ 연결 자체가 약함\n\n확인 낮음\n→ 받았지만 점검 안 함',8.1,2.5,4.4,3.8,{fontSize:18,color:'CADCFC'});

// 14 sheet map
s=slide('엑셀 16개 시트 지도','검증과 활용','엑셀은 16개 시트지만 세 묶음으로 나누면 간단합니다. 읽는 시트는 근거와 정의가 들어 있어서 공부용입니다. 쓰는 시트는 전문가 평가와 설문 응답을 직접 입력합니다. 계산 시트는 자동으로 점수와 점검 결과를 보여 주므로 손대지 않습니다.');
const sg=[['읽는 시트','공부용 · 10개',C.accent2,'안내 · 정의서 · 인용근거\n연결 · 관계유형 · 보류연결\n객체 · 트리플 · 관계매트릭스\n온톨로지맵'],['쓰는 시트','내가 입력 · 3개',C.accent1,'문항 (전문가 평가 입력)\n보유·응답자정보\n응답입력 (노란 칸에 입력)'],['계산 시트','자동 계산 · 3개',C.accent3,'연결점수\n점수요약\n검증 (구조 점검 · 일관성 · 가설 확인)']];
sg.forEach((g,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,4.7,{name:'sheetgrp'+i}); s.addShape(SH.OVAL,{x:x+0.35,y:1.9,w:0.55,h:0.55,fill:{color:g[2]},line:{color:g[2],width:0.5},objectName:'dot'});
 txt(s,g[0],x+1.1,1.85,2.7,0.4,{fontSize:22,bold:true,color:C.text2}); txt(s,g[1],x+1.1,2.25,2.7,0.35,{fontSize:13,color:C.accent6});
 txt(s,g[3],x+0.35,3.0,3.3,3.1,{fontSize:17});});

// 15 study route
s=slide('엑셀 30분 공부법','검증과 활용','엑셀은 처음부터 끝까지 읽지 마세요. 30분 코스를 추천합니다. 안내 시트로 약속을 확인하고, 정의서에서 연구자 정의만 읽고, 지도를 보고, 연결 하나를 끝까지 따라가고, 마지막으로 그 연결의 문항을 읽어 보는 순서입니다. 연결 하나를 이해하면 나머지 30개는 같은 구조입니다.');
const rt=[['안내','3분','"파랑=인용, 빨강=연구자 의견" 규칙만 확인'],['정의서','7분','유형이 "연구자 정의"인 행만 읽기'],['온톨로지맵','5분','실선·파선·점선을 구분하며 훑기'],['연결 (L01 한 행)','8분','인용 → 확립하는 사실 → 연구자 의견 순서로 끝까지'],['문항 + 점수요약','7분','L01-R/V/U를 읽고 점수요약에서 같은 행 찾기']];
rt.forEach((r,i)=>{const y=1.5+i*1.03;card(s,M,y,CW,0.9,{name:'route'+i,noShadow:true}); circ(s,i+1,M+0.25,y+0.15,0.6);
 txt(s,r[0],M+1.2,y,3.0,0.9,{fontSize:18,bold:true,color:C.text2,valign:'middle'}); chip(s,r[1],M+4.2,y+0.28,0.9,HEX.accent1); txt(s,r[2],M+5.4,y,6.5,0.9,{fontSize:15,valign:'middle'});});
txt(s,'팁: 연결 시트에서 "증거유형" 열을 필터로 E1만 보면 확실한 연결부터 익힐 수 있습니다.',M,6.65,CW,0.35,{fontSize:13,color:C.accent6});

// 16 decisions
s=slide('연구자께서 정할 일','검증과 활용','마지막으로 박사 연구자께서 직접 결정하셔야 할 일들입니다. 제가 초안을 만들었지만 가설과 정의는 연구자의 판단입니다. 이 다섯 가지를 정하시면 전문가 검증 단계로 넘어갈 수 있습니다.');
const dc=[['가설 연결 5개를 유지할지 (L10, L11, L12, L17, L29)','E2 2개, E3 3개'],['포함 관계 2개를 연결로 볼지 (L13, L14)','"하위 프로세스"는 흐름이 아니라 포함 관계'],['집단 노드 CORE를 쓸지 (L27, L30)','Arias는 "거의 모든 프로세스"라고만 서술'],['보류 연결 6개의 포함 여부','보류연결 시트의 "연구자 결정" 칸에 기록'],['연구자 정의 확정 (정의서의 주황 표시 항목)','연계성, 연결, 반영·확인·갱신 등']];
dc.forEach((d,i)=>{const y=1.5+i*1.05;card(s,M,y,CW,0.92,{name:'dec'+i,noShadow:true}); s.addShape(SH.RECTANGLE,{x:M+0.3,y:y+0.27,w:0.38,h:0.38,fill:{color:C.background1},line:{color:C.accent1,width:2},objectName:'checkbox'});
 txt(s,d[0],M+1.0,y+0.08,CW-1.3,0.45,{fontSize:17,bold:true,color:C.text2,valign:'middle'}); txt(s,d[1],M+1.0,y+0.5,CW-1.3,0.35,{fontSize:13,color:C.accent6});});

// 17 closing
s=pres.addSlide({masterName:'CLOSING',sectionTitle:'검증과 활용'});
s.addText('프로세스가 "있는가"가 아니라\n"이어져 유지되는가"를 잽니다',{placeholder:'title'});
s.addImage({data:ic.flag,x:0.9,y:2.9,w:0.6,h:0.6,altText:'결승선'});
txt(s,'다음 단계',1.7,2.95,4,0.5,{fontSize:22,bold:true,color:C.background1});
s.addText(['연구자 정의·가설 연결 확정','전문가 6~10명 내용타당도 평가','인지면담 → 예비조사','확정 문항을 BCMS 앱 설문으로 이관'].map((t,i)=>({text:t,options:{bullet:{type:'number'},breakLine:i<3,paraSpaceAfter:8}})),{x:1.7,y:3.55,w:10,h:2.5,fontSize:20,color:'CADCFC',valign:'top',margin:0,isTextBox:true});
s.addNotes('정리하면, 이 연구는 프로세스가 있는지가 아니라 프로세스가 서로 이어져 유지되는지를 잽니다. 다음 단계는 연구자 정의와 가설 연결을 확정하고, 전문가 평가를 거쳐 문항을 확정한 뒤 BCMS 앱 설문으로 옮기는 것입니다.');

await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
})();
