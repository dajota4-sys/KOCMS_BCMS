// 이야기식 설명 PPT(V3): data/*.json + outputs/BCMS_온톨로지맵_V3.png -> outputs/BCMS_연계성_이야기로_이해하기_V3.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const React=require('react'),ReactDOMServer=require('react-dom/server'),sharp=require('sharp');
const fa=require('react-icons/fa');
const {applyTheme}=require(path.join(process.env.PPTX_SKILL_DIR,'scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=n=>JSON.parse(fs.readFileSync(path.join(ROOT,'data',n),'utf8'));
const Q=Object.fromEntries(J('quotes.json').map(q=>[q.id,q])), LK=Object.fromEntries(J('links.json').map(l=>[l.id,l]));
const IT=J('items.json'), item=id=>IT.find(i=>i.id===id).text; const DM=J('dimensions.json'), SRC=Object.fromEntries(J('sources.json').map(s=>[s.id,s])), VB=J('relation_verbs.json');
const OUT=path.join(ROOT,'outputs','BCMS_연계성_이야기로_이해하기_V3.pptx');
const THEME={name:'BCMS Relay',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'F26B38',accent2:'1F6F8B',accent3:'2E9E6B',accent4:'E8A317',accent5:'D64545',accent6:'6B7A90',hlink:'1F6F8B',folHlink:'6B7A90'}};
const HEX=THEME.colors;
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE'; pres.theme={headFontFace:THEME.headFontFace,bodyFontFace:THEME.bodyFontFace};
pres.title='BCMS 프로세스 연결 품질, 이야기로 이해하기 (V3)'; pres.author='박사논문 프로젝트';
const C=pres.SchemeColor, SH=pres.shapes; const W=13.33,H=7.5,M=0.6,CW=W-2*M;
pres.defineSlideMaster({title:'TITLE_DARK',background:{color:HEX.dk2},objects:[
 {placeholder:{options:{name:'title',type:'title',x:0.9,y:2.0,w:11.5,h:1.9,fontSize:44,bold:true,color:C.background1,valign:'middle',align:'left',margin:0},text:''}},
 {placeholder:{options:{name:'body',type:'body',x:0.9,y:4.1,w:11.5,h:1.3,fontSize:21,color:'CADCFC',valign:'top',margin:0},text:''}}]});
pres.defineSlideMaster({title:'CONTENT',background:{color:HEX.lt1},objects:[
 {placeholder:{options:{name:'title',type:'title',x:M,y:0.35,w:CW,h:0.95,fontSize:32,bold:true,color:C.text2,valign:'middle',align:'left',margin:0},text:''}},
 {text:{text:'BCMS 프로세스 연결 품질 · 이야기로 이해하기 (V3)',options:{x:M,y:7.0,w:8,h:0.3,fontSize:10,color:C.accent6,margin:0}}}],
 slideNumber:{x:W-1.2,y:7.0,w:0.6,h:0.3,fontSize:10,color:C.accent6,align:'right'}});
pres.defineSlideMaster({title:'CLOSING',background:{color:HEX.dk2},objects:[
 {placeholder:{options:{name:'title',type:'title',x:0.9,y:0.9,w:11.5,h:1.5,fontSize:38,bold:true,color:C.background1,valign:'middle',align:'left',margin:0},text:''}}]});
async function icon(Comp,color){const svg=ReactDOMServer.renderToStaticMarkup(React.createElement(Comp,{color:'#'+color,size:'256'}));const buf=await sharp(Buffer.from(svg)).png().toBuffer();return 'image/png;base64,'+buf.toString('base64');}
const shadow=()=>({type:'outer',color:'000000',opacity:0.12,blur:6,offset:2,angle:90});
function card(s,x,y,w,h,o={}){s.addShape(SH.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.12,fill:o.fill||{color:C.background2},line:o.line||{color:'E1E6EE',width:0.75},shadow:o.noShadow?undefined:shadow(),objectName:o.name||'card'});}
function txt(s,t,x,y,w,h,o={}){s.addText(t,Object.assign({x,y,w,h,fontSize:16,color:C.text1,valign:'top',margin:0,isTextBox:true,fit:'none'},o));}
function circ(s,n,x,y,d,color){s.addShape(SH.OVAL,{x,y,w:d,h:d,fill:{color:color||C.accent1},line:{color:color||C.accent1,width:0.5},objectName:'badge'});s.addText(String(n),{x,y,w:d,h:d,fontSize:Math.round(d*30),bold:true,color:C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});}
function chip(s,t,x,y,w,fill,fcolor){s.addShape(SH.ROUNDED_RECTANGLE,{x,y,w,h:0.34,rectRadius:0.17,fill:{color:fill},line:{color:fill,width:0.5},objectName:'chip'});s.addText(t,{x,y,w,h:0.34,fontSize:12,bold:true,color:fcolor||C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});}
function slide(title,section,notes){const s=pres.addSlide({masterName:'CONTENT',sectionTitle:section});s.addText(title,{placeholder:'title'});if(notes)s.addNotes(notes);return s;}
const bul=(arr,o={})=>arr.map((t,j)=>({text:t,options:{bullet:true,breakLine:j<arr.length-1,paraSpaceAfter:o.gap||10}}));
const short=id=>{const s=SRC[id];return s.authors.split(';')[0].split(',')[0]+(s.authors.includes(';')?' 외':'')+' ('+s.year+')';};
const DC={CO:C.accent2,TR:C.accent1,EV:C.accent3,AC:C.accent4,TM:C.accent6,FC:C.accent5};

(async()=>{
const ic={users:await icon(fa.FaUsers,HEX.accent2),file:await icon(fa.FaFileAlt,HEX.accent1),link:await icon(fa.FaLink,HEX.accent3),flag:await icon(fa.FaFlagCheckered,HEX.accent1),
 layer:await icon(fa.FaLayerGroup,HEX.accent2),proj:await icon(fa.FaProjectDiagram,HEX.accent1),gauge:await icon(fa.FaTachometerAlt,HEX.accent3)};

pres.addSection({title:'도입'});
let s=pres.addSlide({masterName:'TITLE_DARK',sectionTitle:'도입'});
s.addText('BCMS 프로세스 연결 품질,\n이야기로 이해하기',{placeholder:'title'});
s.addText('객체층 · 관계층 · 품질층(6개 차원)으로 읽는 문항 개발 (V3)\n박사논문 프로젝트 · 근거: Arias(2026), Białas(2010) + 외부 문헌 후보',{placeholder:'body'});
s.addNotes('이번 버전에서는 반영·확인·갱신을 없애고, 첨부 문서에서 제안하신 세 개의 층, 곧 객체층, 관계층, 품질층으로 연구를 다시 구성했습니다. 근거는 두 논문 원문에서 검증한 인용과, 아직 원문을 확인하지 못한 외부 문헌으로 나누어 표시합니다.');

s=slide('이 연구가 묻는 것','도입','규정과 절차를 다 갖춘 조직이 많습니다. 문제는 위기가 왔을 때 부서들이 실제로 이어져 움직이느냐입니다. Arias 논문도 체크리스트 방식이 지속 가능한 운영으로 이어지지 않는다고 지적합니다.');
card(s,M,1.6,6.0,4.7,{fill:{color:C.text2},name:'question'});
txt(s,'규정은 다 갖췄는데,\n위기 때 부서들은\n정말 이어질까?',M+0.5,2.1,5.0,2.4,{fontSize:32,bold:true,color:C.background1,valign:'middle'});
txt(s,'그래서 "있는가"가 아니라\n"얼마나 잘 이어져 작동하는가"를 잽니다.',M+0.5,4.7,5.0,1.2,{fontSize:18,color:'CADCFC'});
card(s,7.0,1.6,5.73,4.7,{name:'quote'}); chip(s,'인용 · Arias p.2',7.3,1.9,1.9,HEX.accent2);
txt(s,'"'+Q.A05.text+'"',7.3,2.45,5.15,2.3,{fontSize:18,italic:true});
txt(s,Q.A05.ko,7.3,4.75,5.15,1.4,{fontSize:15,color:C.accent6});

s=slide('릴레이 바통 이야기','도입','BCMS를 릴레이 달리기로 생각하세요. 주자가 프로세스, 바통이 산출물, 바통 전달이 연결입니다. V3에서 연결 품질은 바통 전달이 얼마나 잘 작동하는가입니다. 바통이 앞 주자의 의도와 어긋나지 않았는지, 거슬러 추적할 수 있는지, 전달했다는 증거가 남는지, 책임자가 있는지, 바뀌면 바로 반영되는지, 문제가 끝까지 고쳐지는지를 봅니다.');
[[ic.users,'주자 = 프로세스','22개','요구사항관리, BIA, 리스크평가, 복구…\n각자 맡은 구간이 있다'],[ic.file,'바통 = 산출물','문서·기록·결정','BIA 결과, 리스크 목록, 계획서처럼\n다음 주자에게 넘기는 것'],[ic.link,'전달 = 연결','31개','누가 누구에게 바통을 넘기는가\n(출발 → 도착 한 쌍)']].forEach((c,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,3.3,{name:'relay'+i});
 s.addImage({data:c[0],x:x+0.35,y:1.85,w:0.7,h:0.7,altText:c[1]}); txt(s,c[1],x+0.35,2.7,3.3,0.5,{fontSize:22,bold:true,color:C.text2}); txt(s,c[2],x+0.35,3.25,3.3,0.5,{fontSize:18,bold:true,color:C.accent1}); txt(s,c[3],x+0.35,3.8,3.3,1.0,{fontSize:16});});
s.addShape(SH.ROUNDED_RECTANGLE,{x:M,y:5.2,w:CW,h:1.5,rectRadius:0.12,fill:{color:C.accent1},line:{color:C.accent1,width:0.5},objectName:'banner'});
txt(s,'연결 품질 = 바통 전달이 얼마나 잘 작동하는가',M+0.4,5.3,CW-0.8,0.6,{fontSize:24,bold:true,color:C.background1,align:'center',valign:'middle'});
txt(s,'일치하는가 · 거슬러 찾을 수 있는가 · 증거가 남는가 · 책임자가 있는가 · 바로 반영되는가 · 끝까지 고쳐지는가',M+0.4,5.95,CW-0.8,0.6,{fontSize:16,color:C.background1,align:'center',valign:'middle'});

s=slide('3층 모형','도입','첨부 문서의 핵심 제안은 세 개의 층으로 나누는 것입니다. 객체층은 무엇과 무엇을 연결하는가, 관계층은 어떤 방식으로 연결되는가, 품질층은 그 연결이 얼마나 잘 작동하는가입니다. 문항은 객체쌍, 관계동사, 품질조건을 한 문장에 담습니다. 층을 나누면 논리와 측정이 분명해집니다.');
[[ic.users,'객체층','무엇과 무엇을 연결하는가','프로세스 22개와 산출물','근거: Arias Table 5 (인용)',C.accent2],[ic.proj,'관계층','어떤 방식으로 연결되는가','관계동사 11개: 입력된다, 근거가 된다, 검증된다, 환류된다…','근거: Arias 서술문의 동사 (인용 + 분류는 연구자)',C.accent1],[ic.gauge,'품질층','그 연결이 얼마나 잘 작동하는가','6개 차원: 정합성·추적성·증빙성·책임성·최신성·환류폐쇄성','근거: 첨부 문서의 초기 가설 + 인용·외부 문헌',C.accent3]].forEach((c,i)=>{const x=M+i*4.1;card(s,x,1.55,3.93,3.75,{name:'layer'+i});
 s.addImage({data:c[0],x:x+0.35,y:1.8,w:0.6,h:0.6,altText:c[1]}); txt(s,c[1],x+1.1,1.8,2.6,0.6,{fontSize:24,bold:true,color:C.text2,valign:'middle'}); txt(s,c[2],x+0.35,2.65,3.3,0.7,{fontSize:16,bold:true,color:c[5]}); txt(s,c[3],x+0.35,3.4,3.3,1.0,{fontSize:15}); txt(s,c[4],x+0.35,4.5,3.3,0.7,{fontSize:13,color:C.accent6});});
s.addShape(SH.ROUNDED_RECTANGLE,{x:M,y:5.55,w:CW,h:1.15,rectRadius:0.12,fill:{color:C.text2},line:{color:C.text2,width:0.5},objectName:'formula'});
txt(s,'문항 = 객체쌍 + 관계동사 + 품질조건',M+0.4,5.6,CW-0.8,0.55,{fontSize:22,bold:true,color:C.background1,align:'center',valign:'middle'});
txt(s,'예) 요구사항 목록이(S) BIA의 우선순위 설정에(T) 입력될 때(입력된다), 두 내용이 모순 없이 일치한다(정합성)',M+0.4,6.15,CW-0.8,0.5,{fontSize:14,color:'CADCFC',align:'center',valign:'middle'});

s=slide('이 말만 알면 됩니다','도입','여섯 가지 용어입니다. 파란 표시는 논문에서 가져온 개념, 주황 표시는 연구자 정의입니다. 연결 품질과 6개 차원은 연구자께서 제시하신 초기 가설이므로 박사논문에서 직접 확정하셔야 합니다.');
[['프로세스(객체)','Arias Table 5의 22개 BCMS 프로세스. 입력을 출력으로 바꾸는 활동의 묶음','인용 개념'],['연결','프로세스 S의 산출물이 T에 쓰이는 방향 있는 한 쌍 (S → T)','연구자 정의'],
['관계동사','연결의 의미를 나타내는 동사 11개. Arias 서술문에서 추출','연구자 정의'],['연결 품질','한 연결이 실제 운영에서 얼마나 잘 작동하는가. 6개 차원으로 측정','연구자 정의'],
['품질 차원','정합성·추적성·증빙성·책임성·최신성·환류폐쇄성','연구자 정의'],['증거유형 E1·E2·E3','연결을 논문이 얼마나 직접 말했나. 직접 / 일부 보완 / 가정','연구자 정의']].forEach((g,i)=>{const x=M+(i%3)*4.1,y=1.55+Math.floor(i/3)*2.55;card(s,x,y,3.93,2.35,{name:'gloss'+i});
 chip(s,g[2],x+3.93-1.5-0.2,y+0.18,1.5,g[2]==='인용 개념'?HEX.accent2:HEX.accent1); txt(s,g[0],x+0.3,y+0.65,3.4,0.5,{fontSize:19,bold:true,color:C.text2}); txt(s,g[1],x+0.3,y+1.2,3.35,1.05,{fontSize:14});});

s=slide('두 논문과 외부 문헌','도입','Arias는 프로세스와 연결의 단서를, Białas는 관계를 정의하는 방법을 줍니다. 품질 차원은 두 논문에 직접 근거가 부족한 부분이 있어서 외부 문헌 후보를 찾았습니다. 다만 이 환경에서는 외부 문헌 원문을 열람할 수 없어 서지만 확인했습니다.');
[['Arias (2026)','누가 뛰는가 · 바통이 어디로 가는가',['객체층: 22개 프로세스(Table 5)','관계층: 서술문 속 동사','한계: 연결은 검증하지 않음'],C.accent2],['Białas (2010)','바통 이동을 지도로 그리는 방법',['방법만 차용: 객체·관계 정의, competency question, 검증','한계: BS 25999 기반 프로토타입'],C.accent1],['외부 문헌 후보 12건','품질 차원의 학술 근거',['추적성·데이터 품질·책임성·환류학습 문헌','서지는 확인, 원문은 미확인','연구자가 원문 확인 후 확정'],C.accent3]].forEach((p,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,4.9,{name:'paper'+i});
 txt(s,p[0],x+0.35,1.85,3.3,0.5,{fontSize:22,bold:true,color:C.text2}); txt(s,p[1],x+0.35,2.45,3.3,0.8,{fontSize:15,bold:true,color:p[3]});
 s.addText(bul(p[2]),{x:x+0.35,y:3.4,w:3.3,h:2.9,fontSize:15,color:C.text1,valign:'top',margin:0,isTextBox:true});});

pres.addSection({title:'만든 과정'});
s=slide('4단계로 만들었습니다','만든 과정','네 걸음입니다. 첫째 Arias 문장에서 연결 근거를 찾고, 둘째 객체와 관계를 정의하고, 셋째 연결의 품질을 6개 차원의 문항으로 만들고, 넷째 검증합니다.');
[['연결 근거 찾기','Arias 문장에서 "무엇이 무엇에 쓰이는지" 찾기','엑셀: 인용근거 · 연결'],['객체·관계 정의','22개 객체, 31개 연결, 11개 관계동사','엑셀: 객체 · 관계동사'],['품질 문항화','연결마다 5~6개 차원 문항 163개','엑셀: 품질차원 · 문항'],['검증','근거 확인, 전문가, 변별타당도','엑셀: 학술근거 · 검증']].forEach((t,i)=>{const x=M+i*3.1;card(s,x,1.7,2.88,3.7,{name:'step'+i}); circ(s,i+1,x+0.3,1.95,0.7);
 txt(s,t[0],x+0.3,2.85,2.4,0.5,{fontSize:19,bold:true,color:C.text2}); txt(s,t[1],x+0.3,3.4,2.35,1.2,{fontSize:14}); txt(s,t[2],x+0.3,4.75,2.4,0.5,{fontSize:13,bold:true,color:C.accent2});
 if(i<3) s.addText('▶',{x:x+2.88-0.05,y:3.3,w:0.3,h:0.4,fontSize:16,color:C.accent1,align:'center',margin:0,isTextBox:true});});
s.addShape(SH.ROUNDED_RECTANGLE,{x:M,y:5.7,w:CW,h:0.95,rectRadius:0.12,fill:{color:C.text2},line:{color:C.text2,width:0.5},objectName:'tagline'});
txt(s,'온톨로지는 "무엇과 무엇의 연결을 재는가"를 정하고, 설문은 "그 연결이 얼마나 잘 작동하는가"를 잰다',M+0.4,5.7,CW-0.8,0.95,{fontSize:15,bold:true,color:C.background1,valign:'middle',align:'center'});

s=slide('1단계: 문장에서 바통 찾기','만든 과정','Arias 15쪽에 요구사항이 BIA, 리스크평가, 내부감사, 공급망관리에 정보를 제공한다는 문장이 있습니다. 왼쪽은 논문 원문이고 오른쪽은 제가 얹은 해석입니다. 이 문장에서 연결 네 개가 나옵니다. 관계동사는 inform, 곧 입력된다입니다.');
card(s,M,1.5,5.95,3.7,{name:'quoteL01'}); chip(s,'인용 · Arias p.15',M+0.3,1.75,1.9,HEX.accent2);
txt(s,'"'+Q.A11.text+'"',M+0.3,2.25,5.4,1.7,{fontSize:15,italic:true}); txt(s,Q.A11.ko,M+0.3,4.05,5.4,1.1,{fontSize:13,color:C.accent6});
card(s,6.78,1.5,5.95,3.7,{name:'opinionL01'}); chip(s,'연구자 의견',7.08,1.75,1.5,HEX.accent1);
s.addText(bul(['관계동사: "inform"을 "입력된다·활용된다"로 분류했습니다.','한 문장에 4개가 있어 4개 연결(L01·L02·L04·L05)로 쪼갰습니다.','전문가 패널에게 "정말 입력되는가"를 물어 확인할 예정입니다.']),{x:7.08,y:2.3,w:5.4,h:2.7,fontSize:15,color:C.text1,valign:'top',margin:0,isTextBox:true});
[['REQ','요구사항관리',M+1.2],['BIA','BIA·중요도 분석',M+7.3]].forEach(b=>{s.addShape(SH.ROUNDED_RECTANGLE,{x:b[2],y:5.55,w:3.4,h:1.1,rectRadius:0.12,fill:{color:C.accent2},line:{color:C.accent2,width:0.5},objectName:'node'});
 s.addText([{text:b[0],options:{bold:true,fontSize:20,breakLine:true}},{text:b[1],options:{fontSize:15}}],{x:b[2],y:5.55,w:3.4,h:1.1,color:C.background1,align:'center',valign:'middle',margin:0,isTextBox:true});});
s.addShape(SH.RIGHT_ARROW,{x:M+4.8,y:5.8,w:2.3,h:0.6,fill:{color:C.accent1},line:{color:C.accent1,width:0.5},objectName:'baton'}); txt(s,'입력된다',M+4.8,5.8,1.9,0.6,{fontSize:14,bold:true,color:C.background1,valign:'middle',align:'center'});

s=slide('2단계: 바통 지도','만든 과정','온톨로지 맵입니다. 22개 주자가 다섯 구역에 있고 31개 연결이 선으로 그려져 있습니다. 실선은 논문이 직접 말한 연결, 파선은 일부를 보완한 연결, 빨간 점선은 논문에 없는 가설입니다.');
s.addImage({path:path.join(ROOT,'outputs','BCMS_온톨로지맵_V3.png'),x:M,y:1.45,w:7.2,h:5.4,altText:'BCMS 프로세스 연결 온톨로지 맵'});
[['22','주자(프로세스)',C.accent2],['31','연결 (바통 전달)',C.accent1],['11','관계동사',C.accent3]].forEach((t,i)=>{const y=1.6+i*1.45;card(s,8.2,y,4.53,1.25,{name:'stat'+i}); txt(s,t[0],8.45,y,1.3,1.25,{fontSize:40,bold:true,color:t[2],valign:'middle'}); txt(s,t[1],9.75,y,2.9,1.25,{fontSize:16,valign:'middle'});});
txt(s,'선 모양: 실선 = 논문이 직접 서술 · 파선 = 일부 보완 · 빨간 점선 = 가설',8.2,6.0,4.53,0.8,{fontSize:13,color:C.accent6});

s=slide('관계층: 관계동사 11개','만든 과정','관계층은 연결의 의미, 곧 동사입니다. Arias 서술문에서 동사를 뽑았습니다. 첨부 문서의 동사 중 일치한다, 추적된다, 기록·증빙된다는 품질층의 정합성·추적성·증빙성과 겹쳐서 품질층으로 옮겼습니다. 같은 개념을 두 번 재면 점수가 이중으로 잡히기 때문입니다.');
const vr=[[{text:'관계동사',options:{bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:13,fontFace:'맑은 고딕'}},{text:'Arias 원문 동사',options:{bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:13,fontFace:'맑은 고딕'}},{text:'연결',options:{bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:13,fontFace:'맑은 고딕'}}]];
VB.forEach(v=>vr.push([{text:v.verb,options:{bold:true,fontSize:13,fontFace:'맑은 고딕',valign:'middle'}},{text:v.arias_verbs,options:{fontSize:12,fontFace:'맑은 고딕',valign:'middle'}},{text:v.links.length?v.links.length+'개':'미사용',options:{fontSize:13,fontFace:'맑은 고딕',align:'center',valign:'middle'}}]));
s.addTable(vr,{x:M,y:1.45,w:8.4,colW:[2.3,5.1,1.0],rowH:0.42,border:{type:'solid',pt:0.75,color:'D0D5DD'},autoPage:false});
card(s,9.3,1.45,3.43,5.1,{fill:{color:C.text2},name:'moveCard'}); txt(s,'품질층으로 옮긴 동사',9.55,1.65,3.0,0.5,{fontSize:17,bold:true,color:C.background1});
txt(s,'일치한다 → 정합성\n추적된다 → 추적성\n기록·증빙된다 → 증빙성\n\n같은 것을 관계와 품질에서 두 번 재면 이중 계산이 됩니다.',9.55,2.3,3.0,3.9,{fontSize:15,color:'CADCFC'});

s=slide('품질층: 6개 차원','만든 과정','첨부 문서가 제안한 여섯 차원입니다. 각 차원은 한 문장 질문으로 정리됩니다. 환류폐쇄성은 훈련·평가·사고 결과가 되돌아가는 연결 8개에만 적용합니다.');
DM.forEach((d,i)=>{const x=M+(i%3)*4.1,y=1.55+Math.floor(i/3)*2.6;card(s,x,y,3.93,2.4,{name:'dim'+i}); circ(s,d.order,x+0.3,y+0.25,0.55,DC[d.id]);
 txt(s,d.name,x+1.0,y+0.25,2.8,0.55,{fontSize:22,bold:true,color:C.text2,valign:'middle'}); txt(s,d.attachment_def.replace('?','')+'?',x+0.3,y+1.0,3.35,1.3,{fontSize:14});});
txt(s,'환류폐쇄성은 환류 연결 8개(L16, L18~L20, L23~L26)에만 적용 · 나머지 5개 차원은 31개 연결 모두에 적용',M,6.75,CW,0.3,{fontSize:12,color:C.accent6});

s=slide('차원별 학술 근거는 얼마나 있나','만든 과정','솔직한 점검 결과입니다. 두 논문 안의 근거를 보면 환류폐쇄성은 비교적 직접적이고, 정합성·증빙성·책임성·최신성은 간접적이며, 추적성은 두 논문에 아예 없습니다. 외부 문헌 후보는 모든 차원에 있지만, 원문을 열람하지 못해 서지만 확인했습니다. 연구자께서 원문에서 정의를 확인하셔야 근거로 확정됩니다.');
const hd={bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:13,fontFace:'맑은 고딕',valign:'middle'};
const rows=[[{text:'차원',options:hd},{text:'두 논문 안의 근거',options:hd},{text:'외부 문헌 후보 (원문 미확인)',options:hd}]];
const sc={'강':HEX.accent3,'중':HEX.accent4,'없음':HEX.accent5};
DM.forEach(d=>rows.push([{text:d.name,options:{bold:true,fontSize:14,fontFace:'맑은 고딕',valign:'middle'}},{text:d.t1_strength+(d.t1.length?'  ('+d.t1.slice(0,3).join(', ')+')':'  (직접 서술 없음)'),options:{bold:true,fontSize:14,fontFace:'맑은 고딕',valign:'middle',color:'FFFFFF',fill:{color:sc[d.t1_strength]}}},{text:d.ext.slice(0,3).map(short).join(' · '),options:{fontSize:13,fontFace:'맑은 고딕',valign:'middle'}}]));
s.addTable(rows,{x:M,y:1.5,w:CW,colW:[1.8,3.6,6.73],rowH:[0.5,0.72,0.72,0.72,0.72,0.72,0.72],border:{type:'solid',pt:0.75,color:'D0D5DD'},autoPage:false});
txt(s,'강 = 논문이 직접 서술 · 중 = 간접 서술(핵심 개념은 있으나 말이 다름) · 없음 = 서술 없음',M,6.45,CW,0.35,{fontSize:13,color:C.accent6});

s=slide('인용과 의견을 구분했습니다','만든 과정','연결의 증거유형입니다. 31개 중 26개는 논문이 직접 말한 연결, 2개는 출발이나 도착을 보완한 연결, 3개는 논문에 없는 가정입니다. 엑셀에서 파란 열은 논문 인용, 빨간 열은 연구자 의견입니다. Arias와 Białas 인용문 72개는 PDF 원문과 프로그램으로 대조해 모두 일치했습니다.');
[['26','E1 직접','논문이 연결을 직접 서술',C.accent3],['2','E2 일부 보완','출발·도착 일부를 연구자가 특정',C.accent4],['3','E3 가정','논문에 없음, 연구자 가정',C.accent5]].forEach((t,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,2.9,{name:'ev'+i});
 txt(s,t[0],x+0.35,1.8,3.2,1.2,{fontSize:66,bold:true,color:t[3],valign:'middle'}); txt(s,t[1],x+0.35,3.05,3.3,0.5,{fontSize:20,bold:true,color:C.text2}); txt(s,t[2],x+0.35,3.6,3.3,0.7,{fontSize:15});});
card(s,M,4.8,CW,1.85,{name:'rule'});
s.addShape(SH.RECTANGLE,{x:M+0.35,y:5.15,w:0.45,h:0.45,fill:{color:C.accent2,transparency:70},line:{color:C.accent2,width:1},objectName:'legendQ'});
txt(s,'파란 열 = 논문 인용 (Arias·Białas 인용 72개 중 72개 원문 일치)',M+1.0,5.15,10.8,0.45,{fontSize:16,valign:'middle'});
s.addShape(SH.RECTANGLE,{x:M+0.35,y:5.85,w:0.45,h:0.45,fill:{color:C.accent5,transparency:70},line:{color:C.accent5,width:1},objectName:'legendO'});
txt(s,'빨간 열 = 연구자 의견 · 외부 문헌은 서지만 확인(원문 대조 0건)',M+1.0,5.85,10.8,0.45,{fontSize:16,valign:'middle'});

s=slide('3단계: 객체쌍 + 관계동사 + 품질조건','만든 과정','문항은 세 재료를 합쳐 만듭니다. 요구사항에서 BIA로 가는 연결을 보면, 객체쌍과 관계동사가 앞부분 문장이 되고, 품질조건이 뒷부분이 됩니다. 이 연결은 5개 차원 문항 5개가 나옵니다.');
const L1=['L01-CO','L01-TR','L01-EV','L01-AC','L01-TM']; const dn={CO:'정합성',TR:'추적성',EV:'증빙성',AC:'책임성',TM:'최신성'};
L1.forEach((id,i)=>{const y=1.5+i*0.98; card(s,M,y,CW,0.88,{name:'it'+i,noShadow:true}); chip(s,dn[id.split('-')[1]],M+0.25,y+0.27,1.3,DC[id.split('-')[1]]); txt(s,item(id),M+1.8,y+0.04,CW-2.1,0.8,{fontSize:13,valign:'middle'});});
txt(s,'객체쌍: 요구사항관리 → BIA · 관계동사: 입력된다 · 품질조건: 차원마다 다름 · 환류폐쇄성은 환류 연결에만 적용되어 이 연결은 5개',M,6.45,CW,0.4,{fontSize:13,color:C.accent6});

const l16=LK.L16;
s=slide('연결 하나를 끝까지 보면','만든 과정','연습 결과가 계획 수정으로 이어지는 연결을 끝까지 따라갑니다. 인용에서 시작해 인용이 확립하는 사실, 제 해석, 최종 문항으로 이어집니다. 이 연결은 환류 연결이라 환류폐쇄성 문항까지 6개가 나옵니다.');
const an=[['① 인용 (Arias p.15)',C.accent2,'"…tested regularly to validate their effectiveness and prompt any necessary adjustments or enhancements."'],['② 인용이 확립하는 사실',C.accent2,'연습은 필요한 조정·개선을 촉구한다. (관계동사: 개정·갱신한다)'],['③ 연구자 의견',C.accent5,'조정 대상은 전략·솔루션·계획·절차 모두이나, 본 연결은 BC 계획·절차로 한정했습니다. 방향 해석도 연구자 해석입니다.'],['④ 문항 (6개 중 3개)',C.accent1,'정합성: '+item('L16-CO')+'\n최신성: '+item('L16-TM')+'\n환류폐쇄성: '+item('L16-FC')]];
const ay=[1.5,2.95,3.9,5.1], ah=[1.3,0.8,1.1,1.75];
an.forEach((a,i)=>{card(s,M,ay[i],CW,ah[i],{name:'anat'+i}); txt(s,a[0],M+0.3,ay[i]+0.1,3.0,ah[i]-0.2,{fontSize:15,bold:true,color:a[1],valign:'middle'}); txt(s,a[2],M+3.5,ay[i]+0.08,CW-3.8,ah[i]-0.16,{fontSize:i===3?12:i===0?13:15,valign:'middle',italic:i===0});});

s=slide('가설인 연결 5개','만든 과정','31개 중 5개는 논문만으로는 근거가 부족합니다. 두 개는 출발이나 도착을 보완했고, 세 개는 논문에 서술이 없습니다. 전문가 검증에서 가장 먼저 심사하고, 합의가 80퍼센트 미만이면 삭제합니다.');
const hy=[['L10','자원관리 → 솔루션 이행','E2','원문은 "전략 이행·운영용 자원"만 말함. 도착을 이행관리로 특정한 것은 연구자'],['L12','BC 계획·절차 → 사고·비상 대응','E2','계획 실행은 서술, "사고 대응" 프로세스와의 결합은 연구자'],['L11','BIA → 자원관리','E3','Białas의 BIA 보고서 속성에서 유추. Arias에는 없음'],['L17','BC 계획·절차 → 인식·교육','E3','교육 프로그램은 있으나 계획과의 연결 서술 없음'],['L29','거버넌스 → 정책관리','E3','각각만 서술. Białas는 정책과 목표를 병렬 항목으로 둠']];
const hdO={bold:true,color:'FFFFFF',fill:{color:HEX.dk2},fontSize:14,fontFace:'맑은 고딕',valign:'middle'};
const rows2=[[{text:'ID',options:hdO},{text:'연결',options:hdO},{text:'등급',options:hdO},{text:'왜 가설인가',options:hdO}]];
hy.forEach(h=>rows2.push([{text:h[0],options:{bold:true,fontSize:14,fontFace:'맑은 고딕',valign:'middle'}},{text:h[1],options:{fontSize:14,fontFace:'맑은 고딕',valign:'middle'}},{text:h[2],options:{bold:true,fontSize:14,fontFace:'맑은 고딕',align:'center',valign:'middle',color:'FFFFFF',fill:{color:h[2]==='E2'?HEX.accent4:HEX.accent5}}},{text:h[3],options:{fontSize:14,fontFace:'맑은 고딕',valign:'middle'}}]));
s.addTable(rows2,{x:M,y:1.6,w:CW,colW:[0.9,3.6,0.9,6.73],rowH:[0.5,0.8,0.8,0.8,0.8,0.8],border:{type:'solid',pt:0.75,color:'D0D5DD'},autoPage:false});

s=slide('이 제안을 어떻게 볼까','만든 과정','연구자 의견을 구하셨기에 제 판단을 말씀드립니다. 3층 모형은 V2의 반영·확인·갱신보다 논리가 분명합니다. 반영·확인·갱신은 단계와 활동이 섞여 있었지만 6개 차원은 서로 다른 성질을 묻습니다. 다만 조심할 점이 네 가지 있습니다. 문항 수, 차원 간 겹침, 추적성의 근거 부족, 환류폐쇄성의 제한적 적용입니다.');
card(s,M,1.5,5.95,5.1,{name:'pros'}); chip(s,'좋은 점',M+0.3,1.75,1.3,HEX.accent3);
s.addText(bul(['무엇을(객체) · 어떻게(관계) · 얼마나 잘(품질)으로 층이 나뉘어 논리와 측정이 분명하다','6개 차원이 추적성, 일관성, 적시성, 책임성, 환류 같은 기존 개념에 대응한다','V2의 반영·확인·갱신보다 단계와 활동이 섞이지 않는다'],{gap:12}),{x:M+0.3,y:2.35,w:5.4,h:4.1,fontSize:15,color:C.text1,valign:'top',margin:0,isTextBox:true});
card(s,6.78,1.5,5.95,5.1,{name:'cons'}); chip(s,'조심할 점',7.08,1.75,1.5,HEX.accent5);
s.addText(bul(['문항이 163개로 많다 → 영역별 분할 배포 필요','정합성·추적성·증빙성이 겹칠 수 있다 → 변별타당도 검증','추적성은 두 논문에 근거가 없다 → 외부 문헌 원문 확인 필수','환류폐쇄성은 연결 8개에만 적용된다','6차원 합산은 가중치 근거가 필요하다 → 형성적 지수로 보고 검증'],{gap:10}),{x:7.08,y:2.35,w:5.4,h:4.1,fontSize:15,color:C.text1,valign:'top',margin:0,isTextBox:true});

pres.addSection({title:'검증과 활용'});
s=slide('4단계: 맞게 쟀는지 확인','검증과 활용','이제 검증 순서가 한 단계 늘었습니다. 먼저 외부 문헌 원문을 연구자께서 확인하셔야 합니다. 그 다음 전문가 평가, 인지면담, 예비조사 순입니다. 예비조사에서는 특히 차원들이 서로 구분되는지, 곧 차원 간 상관이 0.85를 넘지 않는지 봅니다.');
const vs=[['외부 문헌 원문 확인','연구자','학술근거 시트에 쪽 번호와 원문 문장을 기입 (미확인 12건)'],['전문가 평가','6~10명','80% 이상 채택 · 20~80% 토론 · 20% 미만 삭제 (Arias 방식)'],['인지면담','5~8명','문항을 자기 말로 바꿔 설명하게 해 오해 찾기'],['예비조사','150명 이상','차원별 신뢰도, 차원 간 상관 < 0.85, 종합 문항과의 수렴']];
vs.forEach((v,i)=>{const y=1.5+i*1.3;card(s,M,y,7.4,1.15,{name:'val'+i}); circ(s,i+1,M+0.25,y+0.25,0.65); txt(s,v[0]+'  ·  '+v[1],M+1.15,y+0.1,6.1,0.45,{fontSize:18,bold:true,color:C.text2}); txt(s,v[2],M+1.15,y+0.55,6.1,0.55,{fontSize:13});});
card(s,8.3,1.5,4.43,5.1,{fill:{color:C.text2},name:'reading'}); txt(s,'결과는 이렇게 읽습니다',8.6,1.75,3.9,0.5,{fontSize:19,bold:true,color:C.background1});
txt(s,'가장 낮은 차원\n→ 그 연결의 약한 고리\n\n증빙성 낮음\n→ 했지만 증거가 안 남는 연결\n\n환류폐쇄성 낮음\n→ 문제는 나오나 끝까지 안 고침',8.6,2.45,3.9,3.9,{fontSize:16,color:'CADCFC'});

s=slide('엑셀 20개 시트 지도','검증과 활용','엑셀은 20개 시트지만 세 묶음으로 나누면 간단합니다. 읽는 시트는 근거와 정의가 들어 있어 공부용입니다. 쓰는 시트는 외부 문헌 확인 결과, 전문가 평가, 설문 응답을 직접 입력합니다. 계산 시트는 자동입니다.');
[['읽는 시트','공부용 · 12개',C.accent2,'안내 · 정의서 · 품질차원\n인용근거 · 연결 · 적용매트릭스\n관계동사 · 객체 · 트리플\n관계매트릭스 · 온톨로지맵\n보류연결(결정 칸)'],['쓰는 시트','내가 입력 · 4개',C.accent1,'학술근거 (원문 확인 결과 기입)\n문항 (전문가 평가 입력)\n보유·응답자정보\n응답입력 (노란 칸에 입력)'],['계산 시트','자동 계산 · 4개',C.accent3,'연결점수\n차원점수\n점수요약\n검증 (구조·변별·수렴 점검)']].forEach((g,i)=>{const x=M+i*4.1;card(s,x,1.6,3.93,4.8,{name:'sheetgrp'+i}); s.addShape(SH.OVAL,{x:x+0.35,y:1.9,w:0.55,h:0.55,fill:{color:g[2]},line:{color:g[2],width:0.5},objectName:'dot'});
 txt(s,g[0],x+1.1,1.85,2.7,0.4,{fontSize:22,bold:true,color:C.text2}); txt(s,g[1],x+1.1,2.25,2.7,0.35,{fontSize:13,color:C.accent6}); txt(s,g[3],x+0.35,3.0,3.3,3.2,{fontSize:15});});

s=slide('엑셀 30분 공부법','검증과 활용','엑셀은 처음부터 읽지 마세요. 안내에서 규칙을 확인하고, 품질차원 시트에서 근거 강도를 보고, 학술근거 시트에서 확인할 일을 파악한 다음, 연결 하나를 끝까지 따라가고 문항을 읽는 순서입니다.');
[['안내','3분','"파랑 = 인용, 빨강 = 연구자 의견" 규칙만 확인'],['품질차원','8분','6개 차원의 T1 근거 강도와 겹침 우려 읽기'],['학술근거','5분','12건 중 원문 확인이 필요한 항목 파악'],['연결 (L01 한 행)','8분','주 인용 → 확립하는 사실 → 연구자 의견 순서'],['문항 + 점수요약','6분','L01 문항 5개를 읽고 점수요약의 같은 행 찾기']].forEach((r,i)=>{const y=1.5+i*1.03;card(s,M,y,CW,0.9,{name:'route'+i,noShadow:true}); circ(s,i+1,M+0.25,y+0.15,0.6);
 txt(s,r[0],M+1.2,y,3.0,0.9,{fontSize:18,bold:true,color:C.text2,valign:'middle'}); chip(s,r[1],M+4.2,y+0.28,0.9,HEX.accent1); txt(s,r[2],M+5.4,y,6.5,0.9,{fontSize:15,valign:'middle'});});
txt(s,'팁: 연결 시트에서 "증거유형" 열을 필터로 E1만 보면 확실한 연결부터 익힐 수 있습니다.',M,6.65,CW,0.35,{fontSize:13,color:C.accent6});

s=slide('연구자께서 정할 일','검증과 활용','마지막으로 연구자께서 직접 결정하실 일입니다. 특히 첫째, 외부 문헌 원문 확인은 저희가 대신할 수 없습니다. 이것이 끝나야 품질 차원의 학술 근거가 확정됩니다.');
[['외부 문헌 12건의 원문 확인 (특히 추적성: S01, S02)','학술근거 시트의 "원문 쪽 번호·문장·확인 완료" 칸에 기입'],['6개 차원을 그대로 쓸지, 겹치는 차원을 합칠지','정합성·추적성·증빙성의 겹침은 예비조사 후 결정'],['가설 연결 5개와 포함 관계 2개(L13, L14), 집단 노드(L27, L30)','E2·E3 연결의 유지 여부'],['용어: "연결 품질"과 "연계성(연결성)" 중 무엇으로 통일할지','정의서 D04, D05'],['연구자 정의 확정 (정의서의 주황 표시 항목)','보류 연결 6개의 포함 여부도 함께']].forEach((d,i)=>{const y=1.5+i*1.05;card(s,M,y,CW,0.92,{name:'dec'+i,noShadow:true}); s.addShape(SH.RECTANGLE,{x:M+0.3,y:y+0.27,w:0.38,h:0.38,fill:{color:C.background1},line:{color:C.accent1,width:2},objectName:'checkbox'});
 txt(s,d[0],M+1.0,y+0.08,CW-1.3,0.45,{fontSize:16,bold:true,color:C.text2,valign:'middle'}); txt(s,d[1],M+1.0,y+0.5,CW-1.3,0.35,{fontSize:13,color:C.accent6});});

s=pres.addSlide({masterName:'CLOSING',sectionTitle:'검증과 활용'});
s.addText('연결이 "있는가"가 아니라\n"얼마나 잘 작동하는가"를 잽니다',{placeholder:'title'});
s.addImage({data:ic.flag,x:0.9,y:2.9,w:0.6,h:0.6,altText:'결승선'}); txt(s,'다음 단계',1.7,2.95,4,0.5,{fontSize:22,bold:true,color:C.background1});
s.addText(['외부 문헌 원문 확인 · 연구자 정의 확정','전문가 6~10명 내용타당도 평가','인지면담 → 예비조사(변별타당도 확인)','확정 문항을 BCMS 앱 설문으로 이관'].map((t,i)=>({text:t,options:{bullet:{type:'number'},breakLine:i<3,paraSpaceAfter:8}})),{x:1.7,y:3.55,w:10,h:2.5,fontSize:20,color:'CADCFC',valign:'top',margin:0,isTextBox:true});
s.addNotes('정리하면, 연결 품질은 객체층, 관계층, 품질층의 세 층으로 구성되고 품질층은 여섯 차원입니다. 다음 단계는 외부 문헌 원문 확인과 연구자 정의 확정, 전문가 평가, 인지면담, 예비조사입니다.');
await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
})();
