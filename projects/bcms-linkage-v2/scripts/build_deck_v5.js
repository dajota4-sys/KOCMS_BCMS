// V5 발표 PPT: data/v5/*.json + data/quotes.json -> outputs/BCMS_연계성_이야기하기_V5.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const {applyTheme}=require(path.join(process.env.PPTX_SKILL_DIR||'/mnt/skills/public/pptx','scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const B=J('data/v5/v4_baseline.json'), ST=J('data/v5/story.json');
const Q=Object.fromEntries(J('data/quotes.json').map(q=>[q.id,q]));
const OBJ=B['객체22'], LK=B['관계근거31'], IT=Object.fromEntries(B['예비문항179'].map(r=>[r['문항ID'],r])), CQ=Object.fromEntries(B['품질개념6'].map(r=>[r['코드'],r]));
const OUT=path.join(ROOT,'outputs','BCMS_연계성_이야기하기_V5.pptx');
const THEME={name:'BCMS Story',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'E8892B',accent2:'2F6DB5',accent3:'3E9B63',accent4:'D6A21A',accent5:'C0392B',accent6:'6B7A90',hlink:'2F6DB5',folHlink:'6B7A90'}};
const HX={navy:'14213D',blue:'2F6DB5',orange:'E8892B',green:'3E9B63',gold:'D6A21A',red:'C0392B',gray:'6B7A90',light:'F3F6FA',line:'D5DAE3',ink:'1F2937'};
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
pres.title='BCMS 연계성 이야기하기 (V5)'; pres.author='박사논문 프로젝트';
pres.theme={headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕'};
const W=13.33,H=7.5,M=0.6,CW=W-2*M, SH=pres.shapes;
const TITLE_FOOT='BCMS 연계성 이야기하기 · 박사논문 발표 V5';
pres.defineSlideMaster({title:'TITLE_DARK',background:{color:HX.navy},objects:[
 {rect:{x:0,y:0,w:0.28,h:H,fill:{color:HX.orange}}},
 {placeholder:{options:{name:'title',type:'title',x:1.0,y:1.9,w:11.3,h:1.9,fontSize:46,bold:true,color:'FFFFFF',valign:'middle',align:'left',margin:0},text:''}},
 {placeholder:{options:{name:'body',type:'body',x:1.0,y:4.0,w:11.3,h:1.6,fontSize:22,color:'CADCFC',valign:'top',margin:0},text:''}}]});
pres.defineSlideMaster({title:'CONTENT',background:{color:'FFFFFF'},objects:[
 {rect:{x:0,y:0,w:W,h:0.12,fill:{color:HX.navy}}},
 {placeholder:{options:{name:'title',type:'title',x:M,y:0.55,w:CW,h:0.95,fontSize:28,bold:true,color:HX.navy,valign:'middle',align:'left',margin:0},text:''}},
 {text:{text:TITLE_FOOT,options:{x:M,y:7.12,w:7,h:0.28,fontSize:10,color:HX.gray,margin:0}}}],
 slideNumber:{x:W-1.2,y:7.12,w:0.6,h:0.28,fontSize:10,color:HX.gray,align:'right'}});
pres.defineSlideMaster({title:'CLOSING',background:{color:HX.navy},objects:[
 {rect:{x:0,y:0,w:0.28,h:H,fill:{color:HX.orange}}},
 {placeholder:{options:{name:'title',type:'title',x:1.0,y:0.9,w:11.3,h:1.6,fontSize:36,bold:true,color:'FFFFFF',valign:'middle',align:'left',margin:0},text:''}}]});

const shadow=()=>({type:'outer',color:'000000',opacity:0.10,blur:5,offset:2,angle:90});
function txt(s,t,x,y,w,h,o={}){s.addText(t,Object.assign({x,y,w,h,fontSize:16,color:HX.ink,valign:'top',margin:0,fit:'none'},o));}
function card(s,x,y,w,h,o={}){s.addShape(SH.RECTANGLE,{x,y,w,h,fill:{color:o.fill||HX.light},line:{color:o.line||HX.line,width:0.75},shadow:o.shadow?shadow():undefined});if(o.bar)s.addShape(SH.RECTANGLE,{x,y,w:0.09,h,fill:{color:o.bar},line:{color:o.bar,width:0}});}
function chip(s,t,x,y,w,fill,o={}){s.addShape(SH.ROUNDED_RECTANGLE,{x,y,w,h:o.h||0.32,rectRadius:0.16,fill:{color:fill},line:{color:fill,width:0.5}});s.addText(t,{x,y,w,h:o.h||0.32,fontSize:o.fs||12,bold:true,color:o.color||'FFFFFF',align:'center',valign:'middle',margin:0,fit:'none'});}
function source(s,t){s.addText('출처  '+t,{x:M,y:6.62,w:CW,h:0.45,fontSize:11,color:HX.gray,valign:'top',margin:0,fit:'none'});}
function slide(title,chapter,notes){const s=pres.addSlide({masterName:'CONTENT'});s.addText(title,{placeholder:'title'});
 if(chapter)txt(s,chapter,M,0.22,8,0.26,{fontSize:12,bold:true,color:HX.orange});
 if(notes)s.addNotes(notes);return s;}
const bul=(arr,o={})=>arr.map((t,j)=>({text:t,options:{bullet:true,breakLine:j<arr.length-1,paraSpaceAfter:o.gap||8}}));
function table(s,rows,x,y,w,colW,o={}){
 const fs=o.fs||13;
 const data=rows.map((r,i)=>r.map(c=>{const cell=(typeof c==='object'&&c!==null&&c.text!==undefined)?c:{text:String(c)};
  const base=i===0?{bold:true,color:'FFFFFF',fill:{color:HX.navy},align:'center',valign:'middle'}:{color:HX.ink,fill:{color:i%2?'FFFFFF':HX.light},valign:'middle'};
  return {text:cell.text,options:Object.assign({fontSize:fs,margin:[0.04,0.08,0.04,0.08],border:{type:'solid',color:HX.line,pt:0.75}},base,cell.options||{})};}));
 s.addTable(data,{x,y,w,colW,rowH:o.rowH,autoPage:false});}
const ko=id=>Q[id].ko, en=id=>Q[id].text.replace(/\s+/g,' ');
function quoteCard(s,id,x,y,w,h,label){card(s,x,y,w,h,{bar:HX.blue,fill:'EEF4FB',line:'C9DAF0'});
 chip(s,label,x+0.25,y+0.16,w-0.5,HX.blue,{fs:11});
 txt(s,'“'+en(id)+'”',x+0.25,y+0.6,w-0.5,h*0.45,{fontSize:15,italic:true,color:HX.navy});
 txt(s,ko(id),x+0.25,y+0.6+h*0.45,w-0.5,h*0.3,{fontSize:14,color:HX.ink});}
function interpCard(s,t,x,y,w,h,label){card(s,x,y,w,h,{bar:HX.orange,fill:'FEF3E6',line:'F5D3A8'});chip(s,label||'연구자 해석',x+0.25,y+0.14,1.5,HX.orange,{fs:11});txt(s,t,x+0.25,y+0.56,w-0.5,h-0.65,{fontSize:15});}
function lvChip(s,t,x,y,w){const m={'본문':HX.green,'초록':HX.gold,'서지':HX.red,'PDF':HX.blue};let c=HX.gray;for(const k in m)if(t.includes(k)){c=m[k];break;}chip(s,t,x,y,w,c,{fs:11,h:0.28});}

(async()=>{
// ---------- 1 표지
let s=pres.addSlide({masterName:'TITLE_DARK'});
s.addText('BCMS 연계성 이야기하기',{placeholder:'title'});
s.addText([{text:'Arias의 22개 프로세스에서 연결품질 설문 문항까지',options:{breakLine:true}},{text:'박사논문 발표자료 V5 · 2026년 10월 9일 기준',options:{fontSize:16,color:'9FB3D9'}}],{placeholder:'body'});
s.addText('근거: Arias-Aranda 외(2026) Appl. Sci. 16, 3219 · Białas(2010, 서지 보강 필요) · 외부 학술 문헌 15건(참고문헌 슬라이드)',{x:1.0,y:6.5,w:11.3,h:0.4,fontSize:12,color:'9FB3D9',margin:0});
s.addNotes('안녕하십니까. 오늘은 BCMS 연계성, 즉 업무연속성경영시스템의 프로세스들이 서로 어떻게 연결되어 있는지를 묻는 설문을 어떤 근거로 만들었는지 이야기하겠습니다. 모든 슬라이드 아래에는 출처를 적었고, 인용(파란색)과 제 해석(주황색)을 색으로 구분합니다. 출처: Arias-Aranda et al. (2026), Applied Sciences 16, 3219, doi:10.3390/app16073219.');

// ---------- 2 이야기의 지도
s=slide('이야기는 여섯 걸음으로 이어집니다','이야기의 지도','줄거리를 한 문장으로 말씀드리겠습니다. Arias의 22개 프로세스를 객체로 삼고, 원문에서 연결을 찾아 31개 관계로 정리했으며, 그 연결이 조직에서 어떤 상태인지 묻는 후보 문항을 만들어 두었습니다. 아직 점수는 내지 않고, 전문가 심사와 인지면접으로 검증하는 단계가 남아 있습니다. 출처: Arias Table 5 p.14, §4.3 pp.14–16.');
const steps=[['1','왜 연결인가','프로세스는 상호 연결된 활동이다'],['2','22개 객체','Table 5의 프로세스 유형'],['3','연결 찾기','원문 인용에서 31개 관계로'],['4','무엇을 묻는가','연결품질 후보 4 + 관리조건 1 + 경로 1'],['5','문항과 응답','검토 은행 179, 점수는 보류'],['6','검증과 한계','Gate 1–8, 열린 과제']];
steps.forEach((t,i)=>{const col=i%3,row=Math.floor(i/3),x=M+col*4.12,y=1.85+row*2.25;card(s,x,y,3.9,1.95,{shadow:true,bar:i<5?HX.blue:HX.orange});
 s.addShape(SH.OVAL,{x:x+0.3,y:y+0.28,w:0.62,h:0.62,fill:{color:HX.navy},line:{color:HX.navy,width:0}});s.addText(t[0],{x:x+0.3,y:y+0.28,w:0.62,h:0.62,fontSize:22,bold:true,color:'FFFFFF',align:'center',valign:'middle',margin:0});
 txt(s,t[1],x+1.1,y+0.3,2.7,0.6,{fontSize:20,bold:true,color:HX.navy,valign:'middle'});txt(s,t[2],x+0.3,y+1.1,3.4,0.7,{fontSize:15});});
txt(s,'색 약속:  파랑 = 원문 인용   ·   주황 = 연구자 해석·정의   ·   회색 = 아직 확정하지 않은 후보',M,6.2,CW,0.35,{fontSize:14,bold:true,color:HX.navy});
source(s,'구성: 연구자(V4 수정 기준 2026-10-09). 객체 Arias-Aranda 외(2026) Table 5, PDF p.14. 관계 §4.3, pp.14–16.');

// ---------- 3 연결 인용
s=slide('프로세스는 서로 연결된 활동이므로 연결을 따로 묻습니다','1장 · 왜 연결인가','Arias는 자원을 사용하는 활동을 입력을 출력으로 바꾸는, 서로 연결되거나 상호작용하는 활동, 즉 프로세스로 관리해야 한다고 설명합니다. 또 프로세스 참조모델은 프로세스 사이의 상호 연결을 명시해야 한다고 ISO/IEC 33004 기준을 인용합니다. 이것은 연결의 중요성에 대한 근거이지, 연결 품질의 척도에 대한 근거는 아닙니다. 그 사이를 잇는 것이 제 해석입니다. 출처: A01 PDF p.4 §2.1, A02 PDF p.5 §2.1. 문자 대조 일치.');
quoteCard(s,'A01',M,1.65,6.0,2.75,'원문 A01 · Arias §2.1 · PDF p.4');
quoteCard(s,'A02',M+6.15,1.65,5.98,2.75,'원문 A02 · Arias §2.1 · PDF p.5 (ISO/IEC 33004)');
interpCard(s,'프로세스를 낱개로 평가하는 것과 별개로, 프로세스 사이를 오가는 산출물·기준이 후속 업무에 제대로 이어지는지를 묻는 질문이 필요하다. 이 두 원문은 “연결이 중요하다”는 근거이며, “연결품질의 차원”을 말하지는 않는다.',M,4.6,CW,1.85,'연구자 해석');
source(s,'Arias-Aranda 외(2026), Appl. Sci. 16, 3219, §2.1, PDF p.4–5 (원문 문자열 대조 일치 2026-10-09). 번역은 참고용 연구자 번역.');

// ---------- 4 묻는 것/묻지 않는 것
s=slide('이 연구가 묻는 것과 아직 말하지 않는 것','1장 · 왜 연결인가','연구 질문을 분명히 하겠습니다. 한 조직의 BCMS에서, 문헌이 서술한 22개 프로세스 유형 사이의 운영 연결이 어느 정도 유지되는지를 담당자 보고로 묻습니다. 반대로 연결품질이 네 개 요인이라고 확정하지 않고, 점수나 지수도 아직 만들지 않으며, 최종 문항 수도 정하지 않았습니다. 후보를 검증된 척도처럼 서술하지 않는다는 것이 V4 이후의 원칙입니다. 출처: 연구자 확정 2026-10-09; MacKenzie 외(2011) pp.302–303.');
card(s,M,1.7,5.9,4.7,{bar:HX.blue,shadow:true});txt(s,'묻는다',M+0.3,1.85,5,0.45,{fontSize:20,bold:true,color:HX.blue});
txt(s,bul(['한 조직의 BCMS를 단위로, 최근 12개월 후보 기간의 운영 연결 상태','Arias 22개 유형 사이에서 문헌이 서술한 연결 24개 운영 후보','연결된 산출물의 정합성·근거 추적·증빙·변경 전파 (후보 개념)','응답자는 해당 연결의 실무를 아는 담당자 (핵심정보제공자 보고)']),M+0.3,2.4,5.35,3.9,{fontSize:16});
card(s,M+6.23,1.7,5.9,4.7,{bar:HX.gray,shadow:true});txt(s,'아직 말하지 않는다',M+6.53,1.85,5,0.45,{fontSize:20,bold:true,color:HX.gray});
txt(s,bul(['연결품질이 확정된 4요인이라는 주장','차원 평균·동일가중 지수 등 자동 점수','연계성이 조직회복탄력성의 원인이라는 인과','최종 문항 수와 N≥150 같은 고정 기준','ORAS 척도의 원저·판본 (근거 미확정)']),M+6.53,2.4,5.35,3.9,{fontSize:16});
source(s,'연구자 확정 사항 V4 R01·R02·R12·R14(시트 수정이력). 측정모형: MacKenzie 외(2011), MIS Quarterly 35(2), pp.302–303.');

// ---------- 5 세 자료의 역할
s=slide('세 종류의 자료는 서로 다른 일을 합니다','1장 · 왜 연결인가','Arias는 무엇이 BCMS 프로세스인지, 그리고 그 사이의 서술된 연결을 줍니다. Białas는 객체와 관계를 어떻게 표현하는지, 즉 방법을 줍니다. 외부 학술 문헌은 추적성, 적시성, 측정모형 같은 개념의 근거를 줍니다. 세 자료 모두 연결품질 척도를 검증한 연구는 아닙니다. 출처: Arias 전체; Białas §2 pp.2–3; 외부 문헌은 참고문헌 슬라이드 참조.');
table(s,[['자료','연구에서의 역할','차용의 한계'],
['Arias-Aranda 외(2026)','22개 프로세스 유형(Table 5)과 서술된 연결(§4.3)','연결품질 척도를 검증한 연구가 아님'],
['Białas(2010)','객체·관계·속성·역량질의의 표현 방식(§2 pp.2–3). 방법만 차용','BS 25999 기반 프로토타입. 게재지·권호·DOI 서지 보강 필요'],
['외부 학술 문헌','추적성·데이터 품질·측정모형·척도개발의 개념 근거','BCMS 적용 정의와 문항은 연구자 확장']],M,1.7,CW,[2.8,5.2,4.13],{fs:15,rowH:0.75});
txt(s,'연결의 흐름:  출처의 개념  →  BCMS 적용 해석(연구자)  →  문항 후보  →  경험적 검증',M,5.0,CW,0.4,{fontSize:17,bold:true,color:HX.navy});
txt(s,'각 단계를 따로 기록하는 이유: 문자열이 일치해도 해석·번역·측정의 타당성은 자동으로 확보되지 않기 때문입니다.',M,5.55,CW,0.5,{fontSize:15,color:HX.gray});
source(s,'Arias-Aranda 외(2026) Table 5·§4.3; Białas(2010) §2 pp.2–3; Noy & McGuinness(2001) Ontology Development 101, Step 1, PDF pp.4–5.');

// ---------- 6 22개 객체
s=slide('Arias Table 5의 22개 프로세스 유형이 객체의 범위입니다','2장 · 22개 객체','객체의 범위는 Arias Table 5에 나온 22개 BCMS 프로세스 유형입니다. 거버넌스 1개, 핵심 프로세스 17개, 지원 프로세스 4개이고, 핵심은 PDCA 단계로 나뉩니다. 칩 아래 숫자는 Arias의 전문가 지명률이며 참고 정보입니다. 고객관계관리는 지명률이 3퍼센트로 원자료 분류상 기각이지만 22개 목록에 포함된 유형이므로 범위에 둡니다. 22개 유형은 프로세스 유형이며 조직 안에서 실제로 수행되는 프로세스 인스턴스와는 구별합니다. 출처: Arias Table 5 PDF p.14, 지명률 pp.11–13.');
const groups=[['관리',['GOV']],['Plan',['POL','REQ','BIA','RA','STR','PLAN']],['Do',['IMP','INC','EXE','AWR','SUP']],['Check',['AUD','PERF']],['Act',['CI','CHG','WARN','REC']],['지원',['DOC','RES','COM','CRM']]];
const O=Object.fromEntries(OBJ.map(o=>[o['ID'],o]));
const SHN={BIA:'BIA·중요도분석',STR:'BC전략·솔루션',PLAN:'BC계획·절차',INC:'사고·비상대응',EXE:'훈련·연습',AWR:'인식·역량·교육',WARN:'경보·소통',DOC:'문서화 정보',COM:'협의·소통',IMP:'솔루션 이행',GOV:'BC 거버넌스'};
groups.forEach((g,r)=>{const y=1.65+r*0.78;txt(s,g[0],M,y+0.1,1.1,0.5,{fontSize:15,bold:true,color:HX.navy,valign:'middle'});
 g[1].forEach((id,c)=>{const o=O[id],cat=o['원자료 분류'],fill=cat.includes('기각')?HX.gray:cat.includes('토론')?HX.gold:HX.blue;const x=M+1.15+c*1.83;
  s.addShape(SH.RECTANGLE,{x,y,w:1.75,h:0.68,fill:{color:fill},line:{color:fill,width:0}});
  s.addText([{text:id+'  '+o['전문가 지명률 %']+'%',options:{bold:true,fontSize:13,breakLine:true}},{text:SHN[id]||o['한국어'],options:{fontSize:11}}],{x,y,w:1.75,h:0.68,color:'FFFFFF',align:'center',valign:'middle',margin:0,fit:'none'});});});
chip(s,'범주 1 채택 (16)',M+1.15,6.3,1.9,HX.blue,{fs:11});chip(s,'범주 2 토론 (5)',M+3.2,6.3,1.9,HX.gold,{fs:11});chip(s,'범주 3 기각 (1) · 범위에는 포함',M+5.25,6.3,3.0,HX.gray,{fs:11});
source(s,'Arias-Aranda 외(2026) Table 5, PDF p.14 (이름·지명률 원문 대조 22/22 일치). 지명률·분류는 pp.11–13. 22개 전체 사용은 연구자 확정(V4).');

// ---------- 7 인용 → 관계 (L06)
s=slide('원문 한 문장이 관계 하나가 되는 과정: L06','3장 · 연결 찾기','관계가 어떻게 만들어졌는지 L06 하나로 보여드리겠습니다. 원문 A14는 BIA가 끝난 뒤 승인된 업무연속성 요구사항이 전략 선정을 안내한다고 말합니다. 여기서 guide라는 동사를 제가 입력이나 기준, 즉 informs로 해석해 BIA에서 전략·솔루션 선정으로 가는 관계 L06으로 기록했습니다. 주의할 점은 이 요구사항이 BIA의 산출물이며 요구사항관리 REQ의 법규·계약 요구사항과 다르다는 것입니다. 출처: A14 Arias PDF p.15 §4.3.');
quoteCard(s,'A14',M,1.65,5.2,3.6,'① 원문 A14 · Arias §4.3 · PDF p.15');
s.addText('→',{x:M+5.25,y:3.1,w:0.5,h:0.6,fontSize:30,bold:true,color:HX.gray,align:'center',margin:0});
interpCard(s,'“guide”를 “BIA의 산출물이 전략·솔루션 선정의 입력·기준이 된다(informs)”로 해석한다. 관계 의미: 근거가 된다.',M+5.8,1.65,3.1,3.6,'② 연구자 정규화');
s.addText('→',{x:M+8.95,y:3.1,w:0.5,h:0.6,fontSize:30,bold:true,color:HX.gray,align:'center',margin:0});
card(s,M+9.5,1.65,2.63,3.6,{bar:HX.navy,shadow:true});txt(s,'③ 관계 기록',M+9.75,1.8,2.3,0.35,{fontSize:13,bold:true,color:HX.navy});
txt(s,[{text:'L06',options:{bold:true,fontSize:24,color:HX.navy,breakLine:true}},{text:'BIA → STR',options:{fontSize:16,bold:true,breakLine:true}},{text:'근거가 된다',options:{fontSize:15,breakLine:true}},{text:'등급 E1 · 운영 후보',options:{fontSize:14,color:HX.blue,bold:true}}],M+9.75,2.25,2.3,2.2);
card(s,M,5.45,CW,1.0,{fill:'FFFFFF',line:HX.orange});txt(s,'주의  승인된 업무연속성 요구사항은 BIA 산출물이다. REQ의 법규·계약 요구사항과 구별한다. 관계 의미는 산출물과 사용 목적까지 구체화한 뒤 전문가에게 적절성을 평가받는다(Gate 2).',M+0.25,5.6,CW-0.5,0.8,{fontSize:15});
source(s,'Arias-Aranda 외(2026) §4.3, PDF p.15 (A14); 관계 L06은 시트 관계근거31. E1은 문헌 직접성이며 전문가 합의가 아님.');

// ---------- 8 31개 선별
s=slide('31개 관계 기록은 네 종류로 나뉩니다','3장 · 연결 찾기','처음에는 31개를 모두 같은 연결로 취급했지만, 검토하니 성격이 달랐습니다. 24개는 산출물이 오가는 운영 관계 후보, L13과 L14는 사고대응이 경보와 복구를 포함한다는 위계, L27과 L30은 핵심 프로세스 전체에 대한 집단 진술이며 CORE는 23번째 객체가 아닙니다. L11, L17, L29는 직접 근거가 부족해 보류했습니다. 출처: 시트 관계근거31, A18 A21 A30; 수정 이력 R09.');
const cnt={'운영 후보':0,'위계 표시':0,'집단 진술':0,'근거 보류':0};LK.forEach(l=>cnt[l['분류']]++);
const segs=[['운영 후보',HX.blue],['위계 표시',HX.green],['집단 진술',HX.gold],['근거 보류',HX.gray]];let bx=M;const bw=CW;
segs.forEach(([k,c])=>{const w=bw*cnt[k]/31;s.addShape(SH.RECTANGLE,{x:bx,y:1.7,w:w,h:0.7,fill:{color:c},line:{color:'FFFFFF',width:1.5}});s.addText(String(cnt[k]),{x:bx,y:1.7,w:w,h:0.7,fontSize:20,bold:true,color:'FFFFFF',align:'center',valign:'middle',margin:0});bx+=w;});
table(s,[['분류','기록 수','문항에서의 처리'],
['운영 관계 후보',cnt['운영 후보'],'산출물·사용 목적·품질 개념의 적합성 검토'],
['포함(위계) L13·L14',cnt['위계 표시'],'위계만 표시. 운영 전달 품질 문항에서 제외'],
['집단 진술 L27·L30',cnt['집단 진술'],'주석 보존. CORE는 23번째 프로세스가 아님'],
['직접 근거 부족 L11·L17·L29',cnt['근거 보류'],'추가 근거 전까지 문항 심사·설문 투입 보류']],M,2.65,CW,[3.6,1.3,7.23],{fs:15,rowH:0.62});
txt(s,'위계·집단·보류 7개 기록에 딸린 기존 35개 문항은 추적을 위해 남기고 현재 투입 대상에서 제외합니다.',M,5.95,CW,0.5,{fontSize:15,bold:true,color:HX.navy});
source(s,'시트 관계근거31(V4); Arias §4.3 A18·A21·A30, pp.14–16. 수정 이력 R09. 분류는 연구자 판단.');

// ---------- 9 MAP (native table)
s=slide('22×22 관계 MAP: 어디에 연결이 등록되어 있는가','3장 · 연결 찾기','행은 출발 유형, 열은 도착 유형이고 셀 안의 번호가 관계 ID입니다. 파랑은 원문이 직접 서술한 E1, 주황은 끝점이나 방향을 제가 정규화한 E2, 초록은 위계, 회색은 근거 보류입니다. 빈 셀은 아직 등록하지 않았다는 뜻이며 관계가 없다는 증거가 아닙니다. 집단 진술 L27과 L30은 CORE 노드가 없어 격자 밖 주석으로 둡니다. 출처: 객체 Arias Table 5 p.14, 관계 §4.3 pp.14–16.');
const ids=OBJ.map(o=>o['ID']),cellMap={};LK.forEach(l=>{if(ids.includes(l['출발'])&&ids.includes(l['도착']))cellMap[l['출발']+'>'+l['도착']]=l;});
const kc=l=>l['분류']==='위계 표시'?HX.green:l['분류']==='근거 보류'?'B9C0CA':l['V4 등급']==='E2'?HX.orange:HX.blue;
const mrows=[[{text:'출발＼도착',options:{fontSize:9,bold:true,color:'FFFFFF',fill:{color:HX.navy},align:'center'}}].concat(ids.map(i=>({text:i,options:{fontSize:9,bold:true,color:'FFFFFF',fill:{color:HX.navy},align:'center'}})))];
ids.forEach(r=>{mrows.push([{text:r,options:{fontSize:9,bold:true,color:'FFFFFF',fill:{color:HX.navy},align:'center'}}].concat(ids.map(c=>{const l=cellMap[r+'>'+c];if(r===c)return{text:'',options:{fill:{color:'D5DAE3'},fontSize:8}};if(l)return{text:l['관계ID']+(l['분류']==='근거 보류'?'?':''),options:{fill:{color:kc(l)},color:l['분류']==='근거 보류'?'333333':'FFFFFF',bold:true,fontSize:8,align:'center'}};return{text:'',options:{fill:{color:'FFFFFF'},fontSize:8}};})));});
s.addTable(mrows,{x:M,y:1.38,w:CW,colW:[0.78].concat(ids.map(()=>(CW-0.78)/22)),rowH:0.205,margin:0,border:{type:'solid',color:'E1E6EE',pt:0.5},autoPage:false,valign:'middle'});
chip(s,'E1 직접 서술 (파랑)',M,6.18,2.2,HX.blue,{fs:11,h:0.28});chip(s,'E2 정규화 (주황)',M+2.35,6.18,2.0,HX.orange,{fs:11,h:0.28});chip(s,'H 위계 (초록)',M+4.5,6.18,1.8,HX.green,{fs:11,h:0.28});chip(s,'? 근거 보류 (회색)',M+6.45,6.18,2.1,'8A93A0',{fs:11,h:0.28});
txt(s,'주석: L27·L30 집단 진술(CORE 노드 없음). 빈 셀 = 미등록.',M+8.7,6.12,3.45,0.45,{fontSize:10,color:HX.gray});
source(s,'객체 Arias-Aranda 외(2026) Table 5, PDF p.14. 관계 §4.3, pp.14–16에서 연구자가 추출한 현 등록 스냅샷(시트 관계MAP, 이미지 BCMS_관계MAP_22x22_V5.png).');

// ---------- 10 근거 등급
const g={E1:0,E2:0,E3:0};LK.forEach(l=>g[l['V4 등급']]++);
s=slide('근거 등급은 “문헌이 얼마나 직접 말하는가”입니다','3장 · 연결 찾기','등급은 문헌이 관계를 얼마나 직접 서술하는지를 뜻합니다. E1은 끝점과 의미가 원문에 직접 있고, E2는 끝점이나 방향, 대상을 제가 정규화했으며, E3는 직접 근거가 부족합니다. V3에서 E1이던 L16, L23에서 L27, L31은 정규화가 필요해 E2로 낮췄습니다. 이것은 전문가 합의가 아닙니다. 전문가 판단은 Gate 2에서 따로 받습니다. 출처: 시트 온톨로지규칙, 수정이력 R10; A23 A29 A30 A18.');
[['E1',g.E1,'끝점·의미를 원문이 직접 서술',HX.blue],['E2',g.E2,'끝점·방향·대상을 연구자가 정규화',HX.orange],['E3',g.E3,'직접 관계 근거 부족 (L11·L17·L29)',HX.gray]].forEach((c,i)=>{const x=M+i*4.12;card(s,x,1.7,3.9,2.6,{shadow:true,bar:c[3]});txt(s,c[0],x+0.3,1.85,1.5,0.5,{fontSize:22,bold:true,color:c[3]});txt(s,String(c[1]),x+2.0,1.8,1.7,0.9,{fontSize:46,bold:true,color:HX.navy,align:'right'});txt(s,c[2],x+0.3,3.0,3.4,1.1,{fontSize:15});});
table(s,[['V3 → V4 등급 조정','이유'],['L16, L23–L27, L31: E1 → E2','끝점·방향·집단의 정규화가 필요 (A23·A29·A30·A18)'],['E2 9개 = L10, L12, L16, L23–L27, L31','문헌 직접성 분류이며 전문가 합의가 아님']],M,4.6,CW,[5.3,6.83],{fs:14,rowH:0.55});
source(s,'시트 관계근거31·온톨로지규칙(V4); 수정 이력 R10. 근거 인용 Arias §4.3 pp.14–16 (A18·A23·A29·A30).');

// ---------- 11 공백
s=slide('MAP이 보여주는 빈 곳: 18개 유형만 운영 관계에 등장합니다','3장 · 연결 찾기','24개 운영 후보에 등장하는 유형은 22개 중 18개입니다. 정책관리, 인식 역량 교육, 경보 소통, 복구 네 유형은 운영 연결 공백으로 표시하고, 근거를 보강하거나 범위를 제한하겠습니다. 이 18분의 22는 객체가 등장한 범위일 뿐 BCMS 전체 활동을 몇 퍼센트 포괄한다는 뜻이 아닙니다. 그 퍼센트는 정답 목록이 없어 산출할 수 없습니다. 출처: 시트 보류및누락 M01–M05, H01–H04.');
const opsSet=new Set();LK.filter(l=>l['분류']==='운영 후보').forEach(l=>{opsSet.add(l['출발']);opsSet.add(l['도착']);});
ids.forEach((id,i)=>{const x=M+(i%11)*1.1,y=1.7+Math.floor(i/11)*0.62,on=opsSet.has(id);s.addShape(SH.RECTANGLE,{x,y,w:1.0,h:0.5,fill:{color:on?HX.blue:'FFFFFF'},line:{color:on?HX.blue:HX.red,width:1.5,dashType:on?'solid':'dash'}});s.addText(id,{x,y,w:1.0,h:0.5,fontSize:13,bold:true,color:on?'FFFFFF':HX.red,align:'center',valign:'middle',margin:0});});
txt(s,'파랑 = 운영 후보 관계에 등장 (18)   ·   빨강 점선 = 등장하지 않음 (POL · AWR · WARN · REC)',M,3.05,CW,0.35,{fontSize:14,bold:true,color:HX.navy});
table(s,[['추가 추출 검토','내용','처리'],['M01 STR→EXE','전략·솔루션의 시험 (A23 p.15)','문항 미생성'],['M02 WARN→EXE','경보·소통 절차의 시험 (A23 p.15)','문항 미생성'],['M03 CI→STR 또는 PLAN','개선 결과의 도착 대상 (A25 p.16)','문항 미생성'],['M04 RA→COM','위험 정보의 의사소통 (Arias p.15)','대상 특정 필요']],M,3.55,CW,[3.2,5.9,3.03],{fs:13,rowH:0.5});
source(s,'시트 보류및누락(M01–M05); Arias §4.3 A23 p.15, A25 p.16. 22개 중 18개는 운영 후보 끝점 집계이며 전체 BCMS 활동의 포괄률이 아님(R16).');

// ---------- 12 개념 후보 개요
s=slide('무엇을 묻는가: 연결품질 후보 4, 관리조건 1, 경로 1','4장 · 무엇을 묻는가','연결을 찾았으면 이제 연결의 무엇을 물을지 정해야 합니다. 이전에는 여섯 개 차원을 모두 연결품질로 묶었지만, 검토 결과 역할이 달랐습니다. 정합성, 근거 추적가능성, 증빙가능성, 변경전파 적시성은 연결품질 후보이고, 책임명확성은 연결이 잘 작동하도록 하는 관리조건 후보이며, 개선조치 완결성은 여러 연결을 잇는 경로의 상태라 개념을 보류했습니다. 요인 수는 확정하지 않았습니다. 출처: 시트 품질개념6, 수정이력 R02.');
const cc=[['CO','정합성','연결 품질 후보','대응해야 할 기준·수치·전제에 모순이 없는가',HX.blue],['TR','근거 추적가능성','연결 품질 후보','사용한 선행 근거의 위치를 찾을 수 있는가 (후방)',HX.blue],['EV','연결 증빙가능성','연결 품질 후보','실제 사용·평가 사실을 보여 주는 기록이 있는가',HX.blue],['TM','변경전파 적시성','연결 품질 후보','변경 정보가 필요한 시점 이전에 전달·처리되는가',HX.blue],['AC','연결 책임명확성','관리조건 후보','전달·조정 책임 역할이 명확한가',HX.gold],['FC','개선조치 완결성','경로 후보 · 개념 보류','시작 사건에서 종료 기준까지 조치가 종결되는가',HX.gray]];
cc.forEach((c,i)=>{const col=i%3,row=Math.floor(i/3),x=M+col*4.12,y=1.7+row*2.4;card(s,x,y,3.9,2.15,{shadow:true,bar:c[4]});txt(s,c[0],x+0.3,y+0.15,1.0,0.5,{fontSize:22,bold:true,color:c[4]});txt(s,c[1],x+1.25,y+0.2,2.6,0.45,{fontSize:18,bold:true,color:HX.navy,valign:'middle'});chip(s,c[2],x+0.3,y+0.8,c[2].length>12?2.6:1.9,c[4],{fs:11,h:0.28});txt(s,c[3],x+0.3,y+1.2,3.4,0.85,{fontSize:14});});
source(s,'시트 품질개념6(V4). 연결품질 4·관리조건 1·경로 1의 역할 구분은 연구자 검토안이며 확정된 요인 구조가 아님. MacKenzie 외(2011) pp.302–303.');

// ---------- concept helper
function concept(title,chapNotes,cols,srcLine,levels){const sl=slide(title,'4장 · 무엇을 묻는가',chapNotes);const n=cols.length,w=(CW-0.2*(n-1))/n;
 cols.forEach((c,i)=>{const x=M+i*(w+0.2);card(s2(sl),x,1.65,w,4.85,{shadow:true,bar:c.color});
  txt(sl,c.head,x+0.3,1.78,w-0.5,0.5,{fontSize:19,bold:true,color:c.color});
  txt(sl,c.body,x+0.3,2.35,w-0.5,3.0,{fontSize:c.fs||14});
  (c.chips||[]).forEach((t,j)=>lvChip(sl,t,x+0.3,5.55+j*0.34,w-0.6));});
 source(sl,srcLine);return sl;}
function s2(x){return x;}

// ---------- 13 CO
concept('정합성: 내용이 같다는 뜻이 아니라 모순이 없다는 뜻입니다','정합성은 연결된 두 산출물의 내용이 똑같아야 한다는 뜻이 아닙니다. 서로 대응해야 하는 기준, 수치, 전제가 모순되지 않는다는 뜻입니다. Wang과 Strong의 표현 일관성은 형식과 표현의 호환성이어서 의미적 정합성과 같은 개념이 아니고, Zowghi와 Gervasi는 요구사항 일관성을 다루지만 저는 저자기관 초록만 확인했습니다. 그래서 정의의 직접 근거로는 보강이 필요하다고 표시합니다. 출처: S03 Appendix D1; S06 초록; 시트 품질개념6.',
[{head:'문헌이 말하는 것',color:HX.blue,body:'• Wang & Strong(1996): 표현 일관성은 형식과 이전 데이터와의 표현 호환성 (Appendix D1)\n• Zowghi & Gervasi(2003): 요구사항의 일관성·완전성·정확성과 진화·검증 (저자기관 초록)\n• Arias §4.3 (A12·A14·A16): 연결 서술 — 관계의 근거이며 정의의 근거는 아님',chips:['S03 연구자 본문 확인','S06 초록만 확인 · 본문 보강 필요']},
 {head:'연구자 정의 (적용)',color:HX.orange,body:CQ['CO']['조작적 정의 후보']+'\n\n문항 예: “…두 내용 중 서로 대응해야 하는 기준·수치·전제에 모순이 없다.”'},
 {head:'말하지 않는 것',color:HX.gray,body:'• 표현 형식의 일관성을 의미적 정합성과 같다고 보지 않음\n• S06의 본문 정의는 아직 확인하지 못함\n• BCMS 산출물 간 적용은 연구자 확장\n• 확정된 요인이 아님'}],
'Wang & Strong(1996), JMIS 12(4), Appendix D1 · Zowghi & Gervasi(2003), IST 45(14), pp.993–1009(초록) · Arias §4.3 A12·A14·A16. 확인 수준은 칩 참조.');

// ---------- 14 TR + EV (2 sub cards per col)
const sl14=slide('추적가능성과 증빙가능성은 서로 다른 것을 묻습니다','4장 · 무엇을 묻는가','추적가능성은 Gotel과 Finkelstein이 요구사항의 생애를 전방과 후방으로 추적하는 개념으로 다룹니다. 제 문항은 그중 후방, 즉 후속 산출물에서 근거가 된 선행 산출물의 위치를 찾는 것만 묻습니다. 증빙가능성은 Białas가 훈련 결과와 기록이 인증 증거로 쓰인다고 쓴 대목에서 착안했지만, 연결 전체의 품질 차원으로 제시된 것은 아니어서 연구자 확장이고, TR과의 중복을 검토합니다. 출처: S01 §5.1 PDF p.4; B17 Białas PDF p.5 §2.8.');
[['TR','근거 추적가능성',HX.blue,'Gotel & Finkelstein(1994) §5.1, PDF p.4: 요구사항 생애의 전방·후방 추적.\n\n연구자 정의: '+CQ['TR']['조작적 정의 후보'],['S01 연구자 본문 확인'],'현 문항은 후방 근거 추적만. 전방 추적 포함은 Gate 2에서 판단.'],
 ['EV','연결 증빙가능성',HX.green,'Białas B17, PDF p.5 §2.8: “results and records (used as evidences during BCMS certification)”.\n\n연구자 정의: '+CQ['EV']['조작적 정의 후보'],['B17 제공 PDF 문자열 대조 일치'],'연결 전체의 차원은 Białas가 제시하지 않음. 문서 보유와 구별, TR과 중복 검토.']].forEach((c,i)=>{const w=(CW-0.2)/2,x=M+i*(w+0.2);card(sl14,x,1.65,w,4.85,{shadow:true,bar:c[2]});
 txt(sl14,c[0]+'  '+c[1],x+0.3,1.78,w-0.5,0.5,{fontSize:19,bold:true,color:c[2]});txt(sl14,c[3],x+0.3,2.35,w-0.5,2.6,{fontSize:14});
 c[4]&&lvChip(sl14,c[4][0],x+0.3,5.0,w-0.6);card(sl14,x+0.3,5.4,w-0.6,0.95,{fill:'FEF3E6',line:'F5D3A8'});txt(sl14,'한계  '+c[5],x+0.45,5.47,w-0.9,0.82,{fontSize:13});});
source(sl14,'Gotel & Finkelstein(1994), ICRE pp.94–101, §5.1 · Białas(2010) §2.8, PDF p.5 (B17; 서지 보강 필요). 소프트웨어 요구사항·훈련 기록에서 BCMS 연결로의 전이는 연구자 확장.');

// ---------- 15 TM
concept('변경전파 적시성: 필요한 때 전달되었는가','Pipino 등은 데이터 품질 평가에서 과업과 관련된 적시성과 데이터의 currency, 즉 얼마나 최신인가를 구분해서 논의합니다. 저는 이를 이어받되, 연결에 영향을 주는 선행 정보가 바뀌었을 때 후속 업무에 필요한 시점 이전에 전달되었는지를 변경전파 적시성으로 정의했습니다. 변경 전달 기한은 연구자 정의이고 보편적인 고정 기한은 가정하지 않으며, 변경이 없었던 경우는 별도 응답 코드 NC로 둡니다. 출처: S04 PDF pp.4–5, 저널 pp.214–215; Arias A27 A28 A41.',
[{head:'문헌이 말하는 것',color:HX.blue,body:'• Pipino 외(2002), pp.214–215: 과업 맥락의 적시성과 currency·volatility를 구분해 논의\n• Arias §4.3 (A27·A28·A41): 변경관리가 위험평가·문서 개정 등을 촉발한다는 서술 — 관계의 근거',chips:['S04 연구자 본문 확인']},
 {head:'연구자 정의 (적용)',color:HX.orange,body:CQ['TM']['조작적 정의 후보']+'\n\n응답 규칙: 변경이 없었던 경우는 NC(변경 없음)로 따로 기록'},
 {head:'말하지 않는 것',color:HX.gray,body:'• 변경 전달 기한 자체는 문헌이 아닌 BCMS 적용을 위한 연구자 정의\n• 단순한 정보의 오래됨(최신성)과 구별\n• 보편적인 고정 기한을 가정하지 않음'}],
'Pipino, Lee & Wang(2002), CACM 45(4), pp.211–218 (PDF pp.4–5, 저널 pp.214–215) · Arias §4.3 A27·A28·A41.');

// ---------- 16 AC / FC
const sl16=slide('책임명확성은 조건으로, 개선조치 완결성은 경로로 따로 봅니다','4장 · 무엇을 묻는가','책임성은 처음에 Bovens의 Accountability로 설명했지만, 그것은 설명과 정당화의 의무, 질문과 판단, 결과 부담까지 포함하는 개념입니다. 우리 문항은 담당 역할이 지정되어 있는지만 묻기 때문에 연결 책임명확성이라 부르고 관리조건 후보로 분리합니다. 환류폐쇄성은 개선 결과가 쓰인다는 서술을 닫힌 순환의 완료로 넓힌 것이어서 개선조치 완결성으로 바꾸고 개념을 보류합니다. Argyris의 double-loop는 직접 근거에서 뺐습니다. 출처: A49 A50 p.9; S07 초록; A23 A25 A29 pp.15–16; S08.');
[['AC','연결 책임명확성 — 관리조건 후보',HX.gold,'Arias §4.1 PDF p.9 (A49·A50): “the business continuity manager is accountable for the whole process” — 프로세스 전체 책임.\nBovens(2007) 출판사 초록: Accountability는 설명·정당화와 포럼의 질문·판단·결과를 포함.','담당 지정·조정 책임이 명확한가만 묻는다. Accountability의 번역 척도로 인용하지 않음.',['S07 초록만 확인']],
 ['FC','개선조치 완결성 — 경로 후보 (개념 보류)',HX.gray,'Arias §4.3 pp.15–16 (A23·A25·A29): 평가·감사·성과 결과를 개선에 사용한다는 서술. 조치 완료까지의 닫힌 순환은 실증하지 않음.\nArgyris(1977)의 double-loop는 직접 근거에서 제외.','시작 사건·관련 연결·종료 기준이 있는 경로 상태. 단일 연결에 붙인 자동 점수로 다루지 않음. 8개 문항은 직접 근거 보강 전까지 보류.',['S08 출판사 소개만 확인 · 근거 제외']]].forEach((c,i)=>{const w=(CW-0.2)/2,x=M+i*(w+0.2);card(sl16,x,1.65,w,4.85,{shadow:true,bar:c[2]});
 txt(sl16,c[0],x+0.3,1.78,1.0,0.5,{fontSize:22,bold:true,color:c[2]});txt(sl16,c[1],x+1.2,1.82,w-1.5,0.5,{fontSize:15,bold:true,color:HX.navy,valign:'middle'});
 txt(sl16,c[3],x+0.3,2.45,w-0.5,2.2,{fontSize:14});card(sl16,x+0.3,4.55,w-0.6,0.85,{fill:'FEF3E6',line:'F5D3A8'});txt(sl16,'연구자 정의  '+c[4],x+0.45,4.6,w-0.9,0.75,{fontSize:13});lvChip(sl16,c[5][0],x+0.3,5.6,w-0.6);});
source(sl16,'Arias-Aranda 외(2026) §4.1 p.9, §4.3 pp.15–16 · Bovens(2007), Eur. Law J. 13(4), 447–468(초록) · Argyris(1977), HBR 55(5). 역할 구분은 연구자 검토안(R06·R08).');

// ---------- 17 L06 네 문항
s=slide('같은 연결 L06에서 개념별 문항 후보가 나옵니다','5장 · 문항과 응답','L06, 즉 BIA의 승인된 요구사항이 전략 선정의 근거가 되는 연결을 예로 보겠습니다. 같은 연결에서 정합성, 근거 추적가능성, 증빙가능성, 변경전파 적시성의 문항 후보가 나옵니다. 책임명확성은 관리조건 후보로 따로 둡니다. 문항은 연구자가 작성한 후보이며, 연결의 내용과 품질 개념이 모두 적합해야 채택합니다. 모든 관계에 모든 개념을 기계적으로 배정하지 않습니다. 출처: 시트 예비문항179 L06-CO TR EV TM AC; A14 Arias p.15.');
table(s,[['개념','L06 문항 후보 (V4)'],[{text:'정합성 CO',options:{bold:true,color:HX.blue}},IT['L06-CO']['V4 문항 후보']],[{text:'근거 추적가능성 TR',options:{bold:true,color:HX.blue}},IT['L06-TR']['V4 문항 후보']],[{text:'연결 증빙가능성 EV',options:{bold:true,color:HX.blue}},IT['L06-EV']['V4 문항 후보']],[{text:'변경전파 적시성 TM',options:{bold:true,color:HX.blue}},IT['L06-TM']['V4 문항 후보']],[{text:'책임명확성 AC (관리조건)',options:{bold:true,color:HX.gold}},IT['L06-AC']['V4 문항 후보']]],M,1.65,CW,[2.9,9.23],{fs:12.5,rowH:0.72});
txt(s,'문항은 연구자 작성 후보입니다. 원문 A14는 연결의 근거이며 문항 문구의 근거가 아닙니다.',M,6.2,CW,0.35,{fontSize:14,bold:true,color:HX.navy});
source(s,'시트 예비문항179(V4 문항 후보, 상태: 미검토). 연결 근거 Arias §4.3 A14, PDF p.15. 개념 근거는 4장 슬라이드와 시트 인용지도.');

// ---------- 18 문항은행
const cntI={};B['예비문항179'].forEach(r=>cntI[r['역할·검토 상태']]=(cntI[r['역할·검토 상태']]||0)+1);
s=slide('179개는 최종 문항이 아니라 검토 은행입니다','5장 · 문항과 응답','V3에서 만든 179개 문항 기록을 역할별로 다시 나눴습니다. 연결품질 후보 96개, 관리조건 후보 24개, 경로 후보 8개, 구조나 근거가 부족한 관계에 딸린 35개, 종합과 응답 검토 및 외부준거 16개입니다. 24개 운영 후보 곱하기 5개념이라는 산식은 V3 기록의 수일 뿐 문항 생성의 학술 규칙이 아닙니다. 전문가 심사와 인지면접으로 줄입니다. 출처: 시트 예비문항179·검증계획 Gate 3–4; Boateng 외(2018) Table 1.');
table(s,[['검토 기록','수','다음 처리'],['연결품질 후보',cntI['연결 품질 후보'],'24개 운영 후보의 4개 개념 적합성·중복 검토'],['관리조건 후보',cntI['관리조건 후보'],'연결품질과의 역할 구분 후 포함 여부 판단'],['개선 경로 후보',8,'직접 근거·경로·종료 기준 보강 전 개념 보류'],['구조·근거 보류',cntI['구조·근거 보류'],'ID 보존. 현재 문항 심사·설문 투입에서 제외'],['종합 7 + 응답 검토·준거 9',16,'보조 용도. 독립 외부타당도의 근거로 자동 사용 금지']],M,1.65,CW,[3.6,1.1,7.43],{fs:15,rowH:0.62});
txt(s,'합계 179 = 96 + 24 + 8 + 35 + 16.  관계 × 개념의 일률 배정으로 최종 문항 수를 정하지 않습니다.',M,5.75,CW,0.4,{fontSize:15,bold:true,color:HX.navy});
source(s,'시트 예비문항179(V4). 합계 검산 96+24+8+35+16=179. Boateng 외(2018), Front. Public Health 6:149, Table 1. 경로 후보 8은 FC 문항 8개이며 DQ06(종합)은 종합 7에 포함.');

// ---------- 19 온톨로지 5층
s=slide('Białas의 방식을 빌려 객체·관계·관측을 층으로 나눕니다','5장 · 문항과 응답','Białas는 클래스와 인스턴스, 객체 슬롯과 데이터 슬롯, 그리고 역량질의로 온톨로지를 표현합니다. 저는 그 방식만 빌려 다섯 층의 개념 스키마를 만들었습니다. 프로세스 유형, 산출물, 관계, 관측, 개선 경로를 구분하면 BIA 프로세스와 BIA 보고서를 혼동하지 않고, 같은 연결도 조직과 시점에 따라 상태가 다름을 기록할 수 있습니다. 아직 OWL로 구현하거나 추론을 실행하지 않았고 개념 스키마 단계입니다. 출처: Białas §2 pp.2–3; Noy & McGuinness Step 1 PDF pp.4–5.');
table(s,[['층','정의','L06 예'],['ProcessType','프로세스 유형 (22)','BIA, STR'],['Artifact','전달 또는 평가하는 산출물','조직 A의 승인된 BIA 요구사항'],['ProcessLink','출발·도착·관계 의미·출처·문헌 직접성','BIA 요구사항이 전략 선정의 기준이 됨'],['LinkObservation','조직·기간·응답자·문항·응답 코드','조직 A, 최근 12개월, L06-TR 응답'],['ImprovementPathObservation','개선의 시작 사건·관련 연결·종료 기준','평가→조치→종결의 상태']],M,1.65,CW,[3.4,4.8,3.93],{fs:14,rowH:0.62});
txt(s,'CQ(역량질의)는 지식구조가 답하는 질의이고, 설문 문항은 조직의 연결 상태를 묻습니다. 둘은 같지 않습니다. 현재는 개념 스키마와 MAP이며 OWL·추론 테스트는 하지 않았습니다.',M,5.55,CW,0.8,{fontSize:15,bold:true,color:HX.navy});
source(s,'Białas(2010) §2 pp.2–3 (방법만 차용, 서지 보강 필요); Noy & McGuinness(2001) Step 1, PDF pp.4–5; 시트 온톨로지규칙(R11).');

// ---------- 20 응답 설계
s=slide('응답은 “모름·범위 밖·변경 없음·미운영”을 따로 받습니다','5장 · 문항과 응답','응답 설계의 핵심은 결측을 한 덩어리로 처리하지 않는 것입니다. 모름은 DK, 연구 범위상 적용되지 않으면 NA, 변경 사건이 없었으면 NC, 필요한 프로세스가 운영되지 않으면 NO로 따로 기록합니다. 낮은 품질이나 우수 점수로 바꾸지 않습니다. 단위는 한 조직의 BCMS이고 조직당 한 명이 답하면 핵심정보제공자 보고임을 밝힙니다. 기간 12개월과 1에서 5 척도는 후보이며 인지면접 후 확정합니다. 출처: 시트 응답설계, 수정이력 R13.');
[['DK','모름','응답자 지식 부족. 낮은 품질이나 해당 없음으로 변환하지 않음',HX.gray],['NA','범위 밖','연구 범위상 정당하게 적용되지 않는 관계. 사유를 수집',HX.blue],['NC','변경 없음','TM에 필요한 변경 사건이 없었던 경우. 우수 점수·결측으로 대체하지 않음',HX.green],['NO','프로세스 미운영','필요한 프로세스가 없으면 구조 결손으로 기록. 일괄 NA 처리 금지',HX.red]].forEach((c,i)=>{const x=M+i*3.07;card(s,x,1.7,2.9,2.7,{shadow:true,bar:c[3]});txt(s,c[0],x+0.3,1.82,1.2,0.5,{fontSize:26,bold:true,color:c[3]});txt(s,c[1],x+1.2,1.88,1.6,0.45,{fontSize:16,bold:true,color:HX.navy,valign:'middle'});txt(s,c[2],x+0.3,2.5,2.45,1.85,{fontSize:14});});
table(s,[['항목','후보 규칙','확정 조건'],['단위·기간','한 조직의 BCMS · 최근 12개월','전문가·인지면접에서 확정'],['척도','1~5 정도 척도 후보','앵커는 인지면접 후 확정. 일반 설문용 확정본 아님']],M,4.65,CW,[2.4,4.6,5.13],{fs:14,rowH:0.5});
source(s,'시트 응답설계(V4); 수정 이력 R13. 척도 개발 절차: Boateng 외(2018) Table 1.');

// ---------- 21 Gate
s=slide('검증은 여덟 개의 관문을 순서대로 통과합니다','6장 · 검증과 한계','검증은 Gate 1에서 8까지입니다. 범위를 고정하고, 관계의 의미를 검토하고, 관계와 문항을 따로 전문가 심사하고, 인지면접으로 줄이고, 예비조사로 측정모형을 정하고, ORAS와의 판별타당도를 보고, 구조적 관계를 검증한 뒤 제3장 연구방법에 쓰는 순서입니다. 지금은 Gate 1이 확정되었고 다음이 Gate 2입니다. 출처: 시트 검증계획; Boateng 외(2018) Table 1; Polit 외(2007) 초록; MacKenzie 외(2011) pp.302–303.');
const gt=B['검증계획'];
table(s,[['Gate','목적','핵심 주의']].concat(gt.map((r,i)=>[{text:r['Gate'],options:{bold:true,color:i===0?HX.green:i===1?HX.orange:HX.navy}},r['목적'],r['완료 조건·주의']])),M,1.55,CW,[1.3,3.4,7.43],{fs:12,rowH:0.52});
source(s,'시트 검증계획(V4). Gate 3: I-CVI .78 이상 권고(Polit 외 2007, 초록 확인) + 우연 합의 보정, 6인 5/6=.833. Gate 5: MacKenzie 외(2011) pp.302–303.');

// ---------- 22 점수 안 내는 이유
s=slide('점수를 아직 내지 않는 이유: 측정모형이 먼저입니다','6장 · 검증과 한계','이전 버전은 다섯, 여섯 차원을 평균 내고 동일가중 지수를 자동으로 만들었습니다. 하지만 지표와 개념의 관계가 반영적인지 형성적인지에 따라 평균이 의미를 갖기도, 갖지 못하기도 합니다. MacKenzie 등은 이 선택이 개념 정의에 달려 있다고 다룹니다. 그래서 반영적, 형성적, 프로파일 가운데 무엇인지 정하기 전에는 점수를 만들지 않습니다. 표본 수도 모형에 맞춰 설계하고 N이 150 이상이라는 고정 기준은 쓰지 않습니다. 출처: S10 pp.302–303; 수정이력 R12 R14.');
[['반영적 후보','지표가 하나의 잠재 개념을 반영',HX.blue,'EFA/CFA 등으로 검증'],['형성적·복합 지표 후보','지표가 개념을 구성',HX.orange,'다른 모형 평가 절차 필요'],['프로파일 후보','개념별 상태를 점수 합산 없이 제시',HX.green,'조직별 프로파일로 보고']].forEach((c,i)=>{const x=M+i*4.12;card(s,x,1.7,3.9,2.55,{shadow:true,bar:c[2]});txt(s,c[0],x+0.3,1.85,3.4,0.5,{fontSize:18,bold:true,color:c[2]});txt(s,c[1],x+0.3,2.5,3.4,0.8,{fontSize:15});txt(s,c[3],x+0.3,3.4,3.4,0.7,{fontSize:14,color:HX.gray});});
table(s,[['중단한 방식','이유'],['차원 평균·동일가중 지수 자동 산출','측정모형(반영적/형성적/프로파일)과 결측 규칙 확정 전에는 의미 보증 불가'],['N≥150·r<.85 단독 판별타당도 기준','최종 모형에 맞춘 표본 설계, ORAS 근거 확보 후 판단'],['개인 응답 수 = 조직 표본 수','조직 내 군집 구조와 합의도 검토']],M,4.5,CW,[5.0,7.13],{fs:14,rowH:0.5});
source(s,'MacKenzie, Podsakoff & Podsakoff(2011), MIS Quarterly 35(2), pp.302–303 · 시트 응답설계·검증계획 · 수정 이력 R12·R14. Diamantopoulos & Winklhofer(2001)는 서지만 확인(직접 근거로 미사용).');

// ---------- 23 한계/열린 과제
s=slide('아직 해결하지 못한 것들을 숨기지 않습니다','6장 · 검증과 한계','마지막으로 한계입니다. 외부 문헌 중 몇 편은 본문이 아닌 초록만 확인했고, 몇 편은 서지만 있어 본문 확인이 필요합니다. Białas의 게재지와 연도도 아직 보강하지 못했습니다. ORAS 척도는 후보 문헌만 있고 확정하지 못했습니다. 연결품질의 요인 수와 측정모형, 관계 공백 네 곳도 남아 있습니다. 이 목록은 앞으로 제가 직접 해결해야 할 일입니다. 출처: 시트 외부학술근거·보류및누락·검증계획.');
table(s,[['영역','열린 과제','상태'],['외부 문헌','S06·S07·S14는 초록만 확인; S02·S05·S08·S09·S11·S12는 본문·표준 원문 확인 필요','연구자 확인 예정'],['Białas(2010)','게재지·권호·DOI 등 서지 정보','보강 필요'],['ORAS','원저·판본·문항·사용 조건·한국어 적용 근거 (후보 문헌 미확정)','Gate 6'],['개념·모형','연결품질 차원 수, 책임명확성의 역할, FC 종료 기준과 경로, 측정모형','Gate 2·5'],['범위','POL·AWR·WARN·REC 운영 연결 공백과 추가 추출 후보 M01–M05','Gate 2'],['관계 판단','24개 운영 후보의 산출물·사용 목적·필수성에 대한 전문가 검토','Gate 2–3']],M,1.6,CW,[2.0,8.0,2.13],{fs:14,rowH:0.65});
source(s,'시트 외부학술근거·보류및누락·검증계획(V4). “연구자 확인 예정” 항목은 이 발표 준비 과정에서 재확인하지 못했다.');

// ---------- 24 방법 서술안
s=slide('제3장 연구방법에 쓸 문장(안)','6장 · 검증과 한계','논문 본문에 들어갈 방법 서술안입니다. 한 가지 원칙은 이미 수행한 작업과 앞으로 수행할 검증을 문장에서 분리하는 것입니다. 22개 프로세스를 내용 영역으로 설정하고 관계 근거를 추출한 것은 수행한 작업이고, 전문가 심사와 인지면접, 측정모형 검증, ORAS 판별타당도, 구조적 관계 검증은 예정된 작업입니다. 출처: Arias Table 5 §4.3; Białas §2; Gotel & Finkelstein §5.1; Pipino 외 pp.214–215; Boateng 외 Table 1.');
card(s,M,1.6,CW,2.35,{bar:HX.green,fill:'F1F8F4',line:'CBE6D6'});chip(s,'수행한 작업',M+0.3,1.72,1.6,HX.green,{fs:11});
txt(s,'본 연구는 Arias-Aranda 등(2026)의 22개 BCMS 프로세스를 내용 영역으로 설정하였다. 프로세스 설명에서 관계 근거를 추출하고, Białas의 온톨로지 표현방식을 참고하여 객체 유형, 산출물, 관계 의미와 출처를 구조화하였다. 운영 관계 후보와 포함 관계·집단 진술·근거 부족 관계를 구분하였다.',M+0.3,2.15,CW-0.6,1.7,{fontSize:15});
card(s,M,4.1,CW,2.35,{bar:HX.gray,fill:'F3F6FA'});chip(s,'예정된 검증',M+0.3,4.22,1.6,HX.gray,{fs:11});
txt(s,'정합성, 근거 추적가능성, 연결 증빙가능성, 변경전파 적시성을 연결품질 후보 개념으로 검토하며, 책임명확성과 개선조치 완결성의 역할은 별도로 평가한다. 전문가 심사와 인지면접으로 문항을 수정·축소하고 적합한 측정모형을 검증한 뒤, ORAS와의 판별타당도 및 조직회복탄력성과의 구조적 관계를 검증한다.',M+0.3,4.65,CW-0.6,1.7,{fontSize:15});
source(s,'연구자 서술안(V4 슬라이드 14 기준). 인용: Arias-Aranda 외(2026); Białas(2010); Gotel & Finkelstein(1994); Pipino 외(2002); Boateng 외(2018).');

// ---------- 25 V3→V4 수정
s=slide('V3에서 무엇을 고쳤는가: 과장 주장을 거두었습니다','6장 · 검증과 한계','심사자께서 물으실 부분을 미리 말씀드립니다. V3에서는 여섯 개 차원을 확정처럼 서술했고 책임성을 Accountability로 설명했으며 점수를 자동으로 계산했습니다. V4에서 이를 모두 후보와 검토안으로 낮췄고 이번 V5에서도 그 기준을 유지합니다. 또 V5 작성 중 증빙성의 Białas 인용 쪽 번호를 p.6에서 p.5로 바로잡았습니다. 출처: 시트 수정이력 R01–R26.');
const RH=Object.fromEntries(B['수정이력'].map(r=>[r['ID'],r]));
table(s,[['항목','V3의 문제','수정']].concat(['R02','R06','R08','R09','R12','R13'].map(k=>[RH[k]['대상'],RH[k]['V3 문제'],RH[k]['V4 수정']])).concat([['B17 쪽 번호 (V5)','V4 개념 근거가 B17을 PDF p.6으로 표기','Białas PDF 5쪽에서 확인하여 p.5로 정정 (R26)']]),M,1.55,CW,[2.2,4.4,5.53],{fs:12,rowH:0.55});
source(s,'시트 수정이력 R02·R06·R08·R09·R12·R13 (V4) 및 R26 (V5). 전체 목록은 시트 수정이력.');

// ---------- 26 증거 수준 읽는 법
s=slide('이 발표의 인용을 읽는 법: 세 가지 확인 수준','7장 · 참고문헌과 부록','모든 인용이 같은 수준으로 확인된 것은 아닙니다. 첫째, Arias와 Białas의 72개 원문은 제공된 PDF에서 쪽 단위로 문자열을 대조했습니다. 둘째, 외부 학술 문헌은 제가 앞선 검토에서 확인한 수준을 그대로 기록했으며 이번에는 다시 확인하지 못했습니다. 셋째, 연구자의 해석과 정의는 근거가 아니라 제안입니다. 문자열이 일치해도 해석이나 측정의 타당성은 보증되지 않습니다. 출처: outputs/quote_verification.json; 시트 외부학술근거·참고문헌.');
[['① 문자열 대조','Arias·Białas 72개 인용을 제공 PDF의 지정 쪽에서 공백·하이픈·따옴표 차이를 무시하고 대조. 일치 72/72 (2026-10-09). 번역은 연구자 참고 번역.',HX.blue],['② 연구자 확인(V4 기록)','외부 문헌 15건: 본문 확인 6건 · 초록·소개만 4건 · 서지만 5건(S02·S05·S09, 표준 S11·S12). 이번 작업에서 재확인하지 못함.',HX.gold],['③ 연구자 해석·정의','관계 정규화, 개념 정의, 문항 문구, 분류. 근거가 아니라 검증 대상 제안.',HX.orange]].forEach((c,i)=>{const x=M+i*4.12;card(s,x,1.7,3.9,3.6,{shadow:true,bar:c[2]});txt(s,c[0],x+0.3,1.85,3.45,0.5,{fontSize:18,bold:true,color:c[2]});txt(s,c[1],x+0.3,2.5,3.45,2.7,{fontSize:14});});
txt(s,'문자 일치는 연결의 타당성, 해석의 타당성, 측정의 타당성에 대한 증거가 아닙니다.',M,5.55,CW,0.4,{fontSize:16,bold:true,color:HX.navy});
source(s,'outputs/quote_verification.json (pdftotext 대조, 2026-10-09). 외부 문헌 확인 수준: 시트 외부학술근거(연구자 V4 기록).');

// ---------- 27-28 참고문헌
function refSlide(title,list){const sl=slide(title,'7장 · 참고문헌과 부록','본문에서 인용한 문헌과 확인 수준입니다. 확인 수준은 연구자 V4 기록을 따랐고 이번 작업에서 재확인하지 못한 항목은 그렇게 표시했습니다. 출처: 시트 참고문헌.');
 let y=1.5;list.forEach(r=>{const h=r.full.length>190?0.84:0.7;txt(sl,[{text:r.full,options:{fontSize:12.5,color:HX.ink,breakLine:true}},{text:'확인 수준: '+r.level+(r.doi?'  ·  doi:'+r.doi:''),options:{fontSize:11,color:HX.gray,italic:true}}],M,y,CW,h);y+=h+0.1;});
 source(sl,'시트 참고문헌(전체 서지·용도). doi가 없는 항목은 이 작업에서 확인하지 못함.');}
refSlide('참고문헌 (1/3): 두 핵심 논문과 개념 근거',ST.refs.slice(0,6));
refSlide('참고문헌 (2/3): 개념 근거와 측정·방법 문헌',ST.refs.slice(6,12));
refSlide('참고문헌 (3/3): 서지만 확인했거나 직접 근거에서 제외한 문헌',ST.refs.slice(12));

// ---------- 29-30 부록 관계 31
function appx(title,list){const sl=slide(title,'부록','부록: 관계 기록 표입니다. 관계 의미, 분류, 등급, 근거 인용 ID를 정리했고 인용 ID의 원문과 쪽은 시트 인용원문72에 있습니다. 출처: 시트 관계근거31.');
 table(sl,[['ID','출발→도착','관계 의미','분류','등급','인용','쪽·절']].concat(list.map(l=>{const q=Q[l['인용ID']];return[l['관계ID'],l['출발']+' → '+l['도착'],l['관계 의미'],l['분류'],l['V4 등급'],l['인용ID']||'—',q?('Arias p.'+q.pages+' '+q.section.split(' ')[0]):'근거 없음'];})),M,1.4,CW,[0.8,1.9,2.9,1.7,0.9,1.0,2.93],{fs:10.5,rowH:0.28});
 source(sl,'시트 관계근거31·인용원문72(V4). 등급은 문헌 직접성이며 전문가 합의가 아님. “근거 없음” 3개는 근거 보류(L11·L17·L29).');}
appx('부록 A. 관계 기록 L01–L16',LK.slice(0,16));
appx('부록 B. 관계 기록 L17–L31',LK.slice(16));

// ---------- 31 마무리
s=pres.addSlide({masterName:'CLOSING'});
s.addText('연결이 “있는가”를 넘어\n“어떤 상태로 유지되는가”를 묻기 위해',{placeholder:'title'});
s.addText([{text:'다음 걸음',options:{bold:true,fontSize:20,color:'FFFFFF',breakLine:true}},{text:'Gate 2  관계별 산출물·사용 목적·필수성 검토와 범위 공백 정리',options:{bullet:true,breakLine:true}},{text:'Gate 3–4  관계·문항의 전문가 심사, 인지면접으로 후보 축소',options:{bullet:true,breakLine:true}},{text:'Gate 5–8  측정모형, ORAS 판별타당도, 구조적 관계, 제3장 서술',options:{bullet:true,breakLine:true}},{text:'연구자 확인  외부 문헌 본문, Białas 서지, ORAS 근거',options:{bullet:true}}],{x:1.0,y:3.0,w:11.3,h:3.0,fontSize:18,color:'CADCFC',paraSpaceAfter:10,margin:0,valign:'top'});
s.addText('출처: 시트 검증계획·보류및누락. 감사합니다.',{x:1.0,y:6.6,w:11,h:0.4,fontSize:12,color:'9FB3D9',margin:0});
s.addNotes('정리하겠습니다. 22개 프로세스라는 범위, 31개 관계와 그 근거 등급, 연결품질 후보 개념과 그 학술 근거, 그리고 후보 문항까지 만들었습니다. 점수와 요인 구조는 아직 확정하지 않았고, 전문가 심사와 인지면접, 예비조사가 남아 있습니다. 감사합니다.');
await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
})();
