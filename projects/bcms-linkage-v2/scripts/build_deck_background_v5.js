// V5 연구배경·필요성·목적·방법 PPT (build_deck_v5.js의 헬퍼 재사용본): data/v5/*.json + data/quotes.json -> outputs/BCMS_연구배경·필요성·목적·방법_V5.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const {applyTheme}=require(path.join(process.env.PPTX_SKILL_DIR||'/mnt/skills/public/pptx','scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const B=J('data/v5/v4_baseline.json'), ST=J('data/v5/story.json');
const Q=Object.fromEntries(J('data/quotes.json').concat(J('data/v5/background_quotes.json')).map(q=>[q.id,q]));
const OBJ=B['객체22'], LK=B['관계근거31'], IT=Object.fromEntries(B['예비문항179'].map(r=>[r['문항ID'],r])), CQ=Object.fromEntries(B['품질개념6'].map(r=>[r['코드'],r]));
const OUT=path.join(ROOT,'outputs','BCMS_연구배경·필요성·목적·방법_V5.pptx');
const THEME={name:'BCMS Story',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'E8892B',accent2:'2F6DB5',accent3:'3E9B63',accent4:'D6A21A',accent5:'C0392B',accent6:'6B7A90',hlink:'2F6DB5',folHlink:'6B7A90'}};
const HX={navy:'14213D',blue:'2F6DB5',orange:'E8892B',green:'3E9B63',gold:'D6A21A',red:'C0392B',gray:'6B7A90',light:'F3F6FA',line:'D5DAE3',ink:'1F2937'};
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
pres.title='BCMS 연계성 연구: 배경·필요성·목적·방법 (V5)'; pres.author='박사논문 프로젝트';
pres.theme={headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕'};
const W=13.33,H=7.5,M=0.6,CW=W-2*M, SH=pres.shapes;
const TITLE_FOOT='BCMS 연계성 연구 · 배경·필요성·목적·방법 · V5';
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

function refSlide(title,list){const sl=slide(title,'참고문헌','본문에서 인용한 문헌과 확인 수준입니다. 확인 수준은 연구자 V4 기록을 따랐고 이번 작업에서 재확인하지 못한 항목은 그렇게 표시했습니다.');
 let y=1.5;list.forEach(r=>{const h=r.full.length>190?0.84:0.7;txt(sl,[{text:r.full,options:{fontSize:12.5,color:HX.ink,breakLine:true}},{text:'확인 수준: '+r.level+(r.doi?'  ·  doi:'+r.doi:''),options:{fontSize:11,color:HX.gray,italic:true}}],M,y,CW,h);y+=h+0.1;});
 source(sl,'시트 참고문헌(전체 서지·용도). doi가 없는 항목은 이 작업에서 확인하지 못함.');}
// ---- 본문 슬라이드
function q3(s,ids,labels,y,h,fs){const n=ids.length,w=(CW-0.2*(n-1))/n;ids.forEach((id,i)=>{const x=M+i*(w+0.2);card(s,x,y,w,h,{bar:HX.blue,fill:'EEF4FB',line:'C9DAF0'});
 chip(s,labels[i],x+0.25,y+0.14,w-0.5,HX.blue,{fs:10.5});txt(s,'“'+en(id)+'”',x+0.25,y+0.56,w-0.5,h*0.5,{fontSize:fs||13,italic:true,color:HX.navy});txt(s,ko(id),x+0.25,y+0.56+h*0.5,w-0.5,h*0.42,{fontSize:(fs||13)-0.5});});}
const lab=id=>{const q=Q[id];return `${id} · ${q.source==='Arias'?'Arias':'Białas'} ${q.section} · PDF p.${q.pages}`;};
async function main(){
// 1 표지
let s=pres.addSlide({masterName:'TITLE_DARK'});
s.addText('왜 이 연구를 하는가',{placeholder:'title'});
s.addText([{text:'BCMS 연계성 연구의 연구배경 · 연구필요성 · 연구목적 · 연구방법',options:{breakLine:true}},{text:'인용근거와 학술근거를 함께 제시하는 박사논문 발표자료 V5 · 2026년 10월 9일 기준',options:{fontSize:16,color:'9FB3D9'}}],{placeholder:'body'});
s.addText('근거: Arias-Aranda 외(2026) · Białas(2010, 서지 보강 필요) · 외부 학술 문헌(참고문헌 슬라이드). 인용문은 PDF 문자열 대조 후 사용.',{x:1.0,y:6.5,w:11.3,h:0.4,fontSize:12,color:'9FB3D9',margin:0});
s.addNotes('오늘은 연계성 설문을 어떻게 만들었는지가 아니라, 왜 이 연구를 하는가를 말씀드립니다. 연구배경, 연구필요성, 연구목적, 연구방법의 순서이며, 모든 주장 옆에 인용근거와 학술근거를 표시합니다.');
// 2 구성과 규칙
s=slide('발표 구성과 근거를 읽는 규칙','발표 안내','네 부분으로 말씀드립니다. 배경은 무엇이 알려져 있는가, 필요성은 무엇이 비어 있는가, 목적은 그래서 무엇을 하려는가, 방법은 어떻게 하려는가입니다. 근거는 색으로 구분합니다. 파랑은 논문 원문 인용, 주황은 제 해석, 회색 점선은 아직 확정하지 않은 후보나 예정 작업입니다. 출처: 구성은 연구자.');
[['Ⅰ','연구배경','무엇이 알려져 있는가',HX.blue],['Ⅱ','연구필요성','무엇이 비어 있는가',HX.orange],['Ⅲ','연구목적','그래서 무엇을 하는가',HX.green],['Ⅳ','연구방법','어떻게 하는가',HX.navy]].forEach((c,i)=>{const x=M+i*3.07;card(s,x,1.7,2.9,2.2,{shadow:true,bar:c[3]});txt(s,c[0],x+0.3,1.85,1,0.6,{fontSize:28,bold:true,color:c[3]});txt(s,c[1],x+0.3,2.55,2.5,0.5,{fontSize:20,bold:true,color:HX.navy});txt(s,c[2],x+0.3,3.1,2.5,0.6,{fontSize:15});});
card(s,M,4.2,3.9,1.9,{bar:HX.blue,fill:'EEF4FB',line:'C9DAF0'});txt(s,'원문 인용',M+0.3,4.3,3.4,0.4,{fontSize:16,bold:true,color:HX.blue});txt(s,'논문의 문장 그대로. 쪽·절 표시. PDF 문자열 대조로 일치 확인.',M+0.3,4.8,3.4,1.2,{fontSize:14});
card(s,M+4.12,4.2,3.9,1.9,{bar:HX.orange,fill:'FEF3E6',line:'F5D3A8'});txt(s,'연구자 해석',M+4.42,4.3,3.4,0.4,{fontSize:16,bold:true,color:HX.orange});txt(s,'인용을 BCMS 연결 연구에 적용한 제 판단. 근거가 아니라 검증 대상.',M+4.42,4.8,3.4,1.2,{fontSize:14});
s.addShape(SH.RECTANGLE,{x:M+8.24,y:4.2,w:3.9,h:1.9,fill:{color:'F3F6FA'},line:{color:HX.gray,width:1.25,dashType:'dash'}});txt(s,'후보·예정',M+8.54,4.3,3.4,0.4,{fontSize:16,bold:true,color:HX.gray});txt(s,'아직 확정하지 않은 개념, 앞으로 수행할 검증.',M+8.54,4.8,3.4,1.2,{fontSize:14});
source(s,'구성: 연구자. 인용 확인 방법: scripts/verify_quotes.py, verify_background_quotes.py (outputs/ 결과 파일).');

// ===== Ⅰ 연구배경
s=slide('배경 ①: 조직의 연속성을 BCMS가 뒷받침합니다','Ⅰ 연구배경','첫째 배경입니다. Arias는 많은 조직이 연속성에 대한 대비가 부족하고 그 중요성을 인식하지 못한다고 말합니다. 업무연속성은 중단 사건 뒤에도 허용 수준으로 제품과 서비스를 유지하는 조직의 능력이며, 이는 ISO 22301과 22313의 정의를 Arias가 인용한 것입니다. Białas는 BCMS가 조직 회복탄력성과 대응·복구 능력을 뒷받침한다고 씁니다. 출처: A57 A58 A68 Arias PDF p.1; B23 Białas PDF p.1.');
q3(s,['A57','A58','B23'],[lab('A57'),lab('A58'),lab('B23')],1.65,3.35,13);
interpCard(s,'연속성은 “있다/없다”가 아니라 중단 뒤에도 유지되는 조직의 능력이며, BCMS는 그 능력과 조직 회복탄력성을 뒷받침하는 체계로 서술된다. 본 연구의 최종 관심 개념인 조직회복탄력성은 이 배경에서 도출한 연구자의 선택이다.',M,5.15,CW,1.35,'연구자 해석');
source(s,'Arias-Aranda 외(2026) Appl. Sci. 16, 3219, PDF p.1 (A57·A58, 정의는 ISO 22301·22313 인용) · Białas(2010) PDF p.1 (B23, 서지 보강 필요). 문자열 대조 일치.');

s=slide('배경 ②: BCMS는 서로 연관된 프로세스로 이루어진 시스템입니다','Ⅰ 연구배경','둘째, BCMS의 구조입니다. ISO 22301 요구사항은 프로세스 기반 BCMS의 계획과 이행, 운영, 모니터링, 개선을 다룬다고 Arias는 설명합니다. Białas는 BCMS가 성격이 다른 많은 프로세스를 포함하고 이들이 복잡하게 상호 연관된다고 합니다. 여기에 Arias §2.1의 프로세스 정의, 즉 상호 연결되거나 상호작용하는 활동이라는 문장이 더해집니다. 출처: A69 Arias p.2; B19 Białas p.1; A01 Arias p.4.');
q3(s,['A69','B19','A01'],[lab('A69'),lab('B19'),lab('A01')],1.65,3.35,12.5);
interpCard(s,'BCMS의 성능은 개별 프로세스의 수행뿐 아니라 프로세스 사이를 오가는 산출물·기준이 이어지는 방식에도 달려 있다고 볼 수 있다. 이는 세 문장을 종합한 연구자 해석이며, 원문이 “연결의 품질”을 직접 말하는 것은 아니다.',M,5.15,CW,1.35,'연구자 해석');
source(s,'Arias-Aranda 외(2026) PDF p.2 (A69), §2.1 p.4 (A01) · Białas(2010) PDF p.1 (B19). 문자열 대조 일치.');

s=slide('배경 ③: 표준은 요구사항 중심이며 운영 모델이 없습니다','Ⅰ 연구배경','셋째, 표준의 한계입니다. Arias에 따르면 ISO 22301은 요구사항 중심이며 BCMS의 운영에 초점을 두지 않아서 프로세스 참조모델을 담고 있지 않습니다. 조직이 체크리스트 방식으로 요구사항을 수행하면 지속 가능한 운영으로 이어지지 않는다는 어려움도 지적합니다. 정보보안관리와 달리 업무연속성관리에는 표준에서 도출된 프로세스 참조모델이 없다고 합니다. 출처: A59 A60 A61 Arias PDF p.2.');
q3(s,['A59','A60','A61'],[lab('A59'),lab('A60'),lab('A61')],1.65,3.35,12.5);
interpCard(s,'표준은 “무엇을 갖추어야 하는가”를, 운영 참조모델은 “어떻게 돌아가는가”를 다룬다. 조직이 표준을 충족하더라도 프로세스 사이의 운영이 실제로 이어지는지는 별도의 질문이 된다.',M,5.15,CW,1.35,'연구자 해석');
source(s,'Arias-Aranda 외(2026) PDF p.2 (A59·A60·A61). ISO 22301:2019 자체는 이 작업에서 원문을 확인하지 못했으며 Arias의 서술로만 인용함. 문자열 대조 일치.');

s=slide('배경 ④: Arias가 22개 프로세스의 참조모델을 제시했습니다','Ⅰ 연구배경','넷째, 이 연구의 출발점인 Arias의 작업입니다. 그들은 업무연속성 핵심 프로세스 참조모델을 개발하는 것을 주된 목적으로 삼았고, 활동 수준의 입력, 출력, 인터페이스, 상호작용을 기술하는 모델이 프로세스의 조정을 돕는다고 봅니다. 시범 적용의 핵심 발견도 프로세스와 역할 사이의 상호작용이 강조된다는 것입니다. 이 22개 프로세스 유형이 제 연구의 객체 범위입니다. 출처: A63 p.2; A62 p.3; A64 p.18; Table 5 p.14.');
q3(s,['A63','A62','A64'],[lab('A63'),lab('A62'),lab('A64')],1.65,3.35,12.5);
card(s,M,5.15,CW,1.35,{bar:HX.navy,fill:'F3F6FA'});txt(s,[{text:'본 연구가 가져오는 것  ',options:{bold:true,color:HX.navy}},{text:'Table 5의 22개 BCMS 프로세스 유형(PDF p.14)을 객체 범위로, §4.3의 프로세스별 입력·산출 서술(pp.14–16)을 연결 근거로 사용한다. 전문가 인터뷰로 검증된 프로세스 목록이라는 점이 객체 선정의 학술적 근거이다(Abstract, p.1).'}],M+0.3,5.25,CW-0.6,1.2,{fontSize:14.5});
source(s,'Arias-Aranda 외(2026) PDF p.2 (A63), p.3 (A62), p.18 (A64), Table 5 p.14, Abstract p.1. 문자열 대조 일치. 22개 이름·지명률은 원문 대조 22/22 일치.');

// ===== Ⅱ 연구필요성
s=slide('필요성 ①(이론): “연결은 어떤 상태인가”가 비어 있습니다','Ⅱ 연구필요성','이론적 필요성입니다. Arias는 프로세스 목록과 상호작용의 중요성을 정리했지만, 연결의 품질을 정의하거나 측정한 연구는 아닙니다. Arias의 후속 연구 계획도 관리체계 참조모델, 벤치마킹, 퍼지추론 의사결정 지원이며 연결 상태 측정은 아닙니다. 따라서 빈 곳이 있다고 판단합니다. 다만 이 판단은 제가 확인한 범위의 판단이며 체계적 문헌검토로 보강해야 합니다. 출처: A62 A64 A65; Arias §6 pp.18–19.');
[['문헌이 말하는 것',HX.blue,'• 상호작용·인터페이스를 기술한 모델이 프로세스 조정을 돕는다 (A62, p.3)\n• 시범 적용에서 프로세스와 역할의 상호작용이 강조되었다 (A64, p.18)\n• 후속 연구는 역량·성숙 논의, 관리체계 참조모델, 벤치마킹, 퍼지추론 의사결정 지원 (A65·§6, p.19)',['Arias 문자열 대조 일치']],
 ['비어 있는 것',HX.orange,'• 연결의 품질(대응·근거·증빙·변경 전파)을 정의한 개념\n• 그 개념을 조직 담당자에게 묻는 문항\n• 연결 상태를 타당화한 측정 절차\n\n※ Arias는 연결품질 척도를 검증한 연구가 아니다 (V4 자료 역할표)',['연구자 판단 · 문헌검토 보강 필요']],
 ['본 연구의 대응',HX.green,'• 22개 유형 사이 연결을 인용과 함께 구조화 (31 관계)\n• 연결품질 후보 4 + 관리조건 1 + 경로 1을 정의하고 근거 위치 표시\n• 문항 후보를 만들어 내용타당화·측정모형 검증 설계',['수행 + 예정 (Gate 2–8)']]].forEach((c,i)=>{const w=(CW-0.4)/3,x=M+i*(w+0.2);card(s,x,1.65,w,4.85,{shadow:true,bar:c[1]});txt(s,c[0],x+0.3,1.78,w-0.5,0.5,{fontSize:19,bold:true,color:c[1]});txt(s,c[2],x+0.3,2.35,w-0.5,3.4,{fontSize:13.5});lvChip(s,c[3][0],x+0.3,5.95,w-0.6);});
source(s,'Arias-Aranda 외(2026) PDF p.3 (A62), p.18 (A64), p.19 (A65 및 §6 후속 연구 Step 1–3). “비어 있는 것”은 연구자가 확인한 범위의 판단이며 선행연구 체계적 검토는 연구자 수행 과제.');

s=slide('필요성 ②(실무): 체크리스트만으로는 연결 운영을 알 수 없습니다','Ⅱ 연구필요성','실무적 필요성입니다. Arias는 체크리스트 방식이 지속 가능한 운영으로 이어지지 않는다고 하고, 참조모델을 그대로 적용하는 것도 부적절하다고 합니다. Białas는 업무연속성 관리자가 시스템의 정합성과 효율을 위해 프로세스의 많은 세부를 숙지해야 한다고 씁니다. 조직마다 연결 상태가 다르다면 이를 진단할 수단이 필요합니다. 출처: A60 p.2; A66 p.18; B20 Białas p.1.');
q3(s,['A60','A66','B20'],[lab('A60'),lab('A66'),lab('B20')],1.65,3.35,12.5);
interpCard(s,'연결이 문서상 정의되어 있는지(존재)와 조직에서 실제로 이어지는지(운영 상태)는 다른 문제이다. 후자를 조직별로 진단하려면 담당자가 답할 수 있는 측정 도구가 필요하다. 이 논리는 세 원문에 근거한 연구자의 추론이다.',M,5.15,CW,1.35,'연구자 해석');
source(s,'Arias-Aranda 외(2026) PDF p.2 (A60), p.18 (A66) · Białas(2010) PDF p.1 (B20). 문자열 대조 일치. 조직별 진단 도구의 필요는 연구자 추론.');

s=slide('필요성 ③(연구 체계): 연결 상태를 먼저 측정해야 합니다','Ⅱ 연구필요성','연구 체계상의 필요성입니다. Arias는 BCMS 프로세스의 식별과 정렬이 사이버 위협에 대한 조직 회복탄력성을 높인다고 서술하고, Białas는 BCMS가 조직 회복탄력성을 뒷받침한다고 합니다. 그러나 두 논문 모두 연결의 상태와 회복탄력성의 관련성을 실증하지는 않습니다. 그 관련성을 검증하려면 먼저 연결 상태를 재는 타당한 도구가 있어야 합니다. 이 관계는 구조적 관련성으로 검증하며 인과로 말하지 않습니다. 출처: A68 Arias Abstract p.1; B23 Białas p.1; 검증계획 Gate 7.');
q3(s,['A68','B23'],[lab('A68'),lab('B23')],1.65,2.9,13.5);
card(s,M,4.7,CW,1.8,{bar:HX.gray,fill:'F3F6FA'});txt(s,[{text:'연구자 논리  ',options:{bold:true,color:HX.orange}},{text:'BCMS가 회복탄력성을 뒷받침한다는 서술은 있으나, BCMS 내부 연결의 상태가 그 관련성에 어떻게 닿는지는 측정된 바 없다 → ① 연결 상태 측정 도구 개발 → ② 측정모형 검증 → ③ 조직회복탄력성과의 구조적 관련성 검증(Gate 7). 횡단 자기보고 SEM은 인과 효과 입증으로 표현하지 않는다. 회복탄력성 척도(ORAS)는 원저·판본이 아직 확정되지 않았다(Gate 6).'}],M+0.3,4.85,CW-0.6,1.6,{fontSize:14});
source(s,'Arias-Aranda 외(2026) Abstract PDF p.1 (A68) · Białas(2010) PDF p.1 (B23) · 시트 검증계획 Gate 6·7. ORAS 근거는 이 작업에서 확정하지 못함(후보 문헌 미확인).');

s=slide('필요성 정리: 문헌의 근거, 빈 곳, 본 연구의 대응','Ⅱ 연구필요성','지금까지를 한 표로 정리합니다. 각 줄은 근거 인용, 비어 있는 부분, 본 연구의 대응, 그리고 그 대응이 이미 수행된 것인지 예정인지를 보여 줍니다. 출처: 표의 인용 ID는 시트 배경인용과 부록 슬라이드 참조.');
table(s,[['영역','문헌 근거','비어 있는 부분','본 연구의 대응','상태'],
['프로세스 참조모델','A55·A61 (Arias p.1–2)','22개 유형은 제시, 연결 상태 측정은 범위 밖','22개 유형을 객체로 채택','수행'],
['연결 서술','A62·A64, §4.3 (A11–A31)','산출물 전달 서술은 있으나 품질 기준·응답 도구 없음','31개 관계 기록 + 개념 후보 6 + 문항 후보','수행(후보)'],
['운영 실무','A60·A66 (Arias p.2·18)','체크리스트 이상의 연결 진단 수단','담당자 보고 문항, 내용타당화·인지면접','예정'],
['결과 연결','A68·B23 (Arias p.1·Białas p.1)','연결 상태와 조직회복탄력성의 관련성 미검증','측정모형 확인 후 구조적 관련성 검증(인과 아님)','예정']],M,1.55,CW,[1.9,2.6,3.6,3.0,1.03],{fs:12.5,rowH:0.8});
txt(s,'빈 곳의 판단은 제가 확인한 범위에 한정되며, 선행연구의 체계적 검토로 확인하는 것이 연구자 과제로 남아 있습니다.',M,5.6,CW,0.5,{fontSize:14,bold:true,color:HX.navy});
source(s,'Arias-Aranda 외(2026) PDF pp.1–3, 18, §4.3; Białas(2010) PDF p.1; 시트 검증계획·외부학술근거. 상태는 연구 진행 기록(V4).');

// ===== Ⅲ 연구목적
s=slide('연구목적: 연결의 품질을 근거 있게 정의하고 측정할 도구를 만든다','Ⅲ 연구목적','연구목적을 말씀드립니다. 총괄 목적은 Arias의 22개 프로세스 유형 사이의 운영 연결에 대해, 문헌 근거에 기반한 연결품질 개념과 설문 문항 후보를 개발하고 타당화 절차를 설계하는 것입니다. 세부 목적은 네 가지이며, 앞의 두 가지는 이미 후보 수준으로 수행했고 뒤의 두 가지는 예정입니다. 출처: 시트 검증계획, 시작점; 연구자 확정(V4).');
card(s,M,1.6,CW,1.35,{bar:HX.green,fill:'F1F8F4',line:'CBE6D6'});txt(s,[{text:'총괄 목적  ',options:{bold:true,color:HX.green}},{text:'Arias-Aranda 외(2026)의 22개 BCMS 프로세스 유형 사이의 운영 연결에 대해, 문헌 근거에 기반한 연결품질 개념과 설문 문항 후보를 개발하고, 그 타당화 절차를 거쳐 조직회복탄력성과의 구조적 관련성을 검증한다.'}],M+0.3,1.72,CW-0.6,1.15,{fontSize:15.5});
[['목적 1','연결의 구조화','22개 유형 사이 연결을 인용 근거와 함께 31개 관계로 정리',HX.blue,'수행'],['목적 2','개념의 정의','연결품질 후보 4, 관리조건 1, 경로 1의 정의와 학술근거',HX.blue,'수행(후보)'],['목적 3','문항 개발·검증','문항 후보 개발, 전문가 내용타당화, 인지면접',HX.gray,'예정'],['목적 4','측정모형·구조 검증','측정모형 확인, ORAS 판별타당도, 구조적 관련성',HX.gray,'예정']].forEach((c,i)=>{const x=M+i*3.07;card(s,x,3.2,2.9,3.2,{shadow:true,bar:c[3]});txt(s,c[0],x+0.3,3.32,2.4,0.4,{fontSize:14,bold:true,color:c[3]});txt(s,c[1],x+0.3,3.75,2.5,0.5,{fontSize:18,bold:true,color:HX.navy});txt(s,c[2],x+0.3,4.35,2.45,1.4,{fontSize:14});chip(s,c[4],x+0.3,5.85,1.5,c[3],{fs:11,h:0.3});});
source(s,'연구자 확정 범위(V4 시작점) · 시트 검증계획 Gate 1–8. 목적 3·4는 아직 수행하지 않은 검증이며 완료된 것으로 서술하지 않는다.');

s=slide('연구질문: 네 개의 질문과 그에 답하는 방법','Ⅲ 연구목적','연구질문 네 개입니다. 첫째, 22개 프로세스 사이에서 문헌이 직접 서술하는 운영 연결은 무엇인가. 둘째, 연결의 품질은 어떤 개념으로 정의할 수 있는가. 셋째, 개념을 대표하는 문항은 내용타당도를 갖는가. 넷째, 측정모형은 어떠하며 조직회복탄력성과 구조적으로 관련되는가. 앞의 둘은 후보 수준까지 수행했고, 뒤의 둘은 예정입니다. 출처: 시트 검증계획 Gate 2–7; 연구자 설계.');
table(s,[['질문','내용','답하는 방법','진행'],['RQ1','Arias 22개 유형 사이에서 문헌이 직접 서술하는 운영 연결은 무엇인가?','원문 인용 → 연구자 정규화 → 관계 기록과 등급 (E1/E2/E3)','31개 기록 수행, 전문가 검토 예정(Gate 2)'],['RQ2','연결의 품질은 어떤 개념으로 정의할 수 있는가?','개념별 학술근거 위치·전이 한계 기록, 역할 구분(품질·조건·경로)','후보 6 수행, 요인 수 미확정'],['RQ3','개념을 대표하는 문항은 내용타당도를 갖는가?','관계·문항 별도 전문가 심사(I-CVI), 인지면접','예정(Gate 3–4)'],['RQ4','측정모형은 어떠하며 조직회복탄력성과 구조적으로 관련되는가?','측정모형 선택·검증, ORAS 판별타당도, 구조적 관련성(인과 아님)','예정(Gate 5–7)']],M,1.55,CW,[0.9,4.3,4.6,2.33],{fs:12.5,rowH:0.95});
source(s,'시트 검증계획 Gate 2–7(V4). I-CVI: Polit 외(2007) 초록. 측정모형: MacKenzie 외(2011) pp.302–303. 구조적 관련성은 인과 효과로 표현하지 않음(R14).');

s=slide('연구의 범위: 무엇을 하고, 무엇을 하지 않는가','Ⅲ 연구목적','범위를 분명히 합니다. 대상은 Arias의 22개 프로세스 유형 사이의 운영 연결이고, 단위는 한 조직의 BCMS이며 담당자 보고로 측정합니다. 하지 않는 것은 연결품질 4요인 확정 주장, 자동 점수, 인과 주장, 고정 문항 수와 고정 표본 기준, 그리고 BCMS 전체의 몇 퍼센트를 측정한다는 주장입니다. 출처: 수정이력 R01–R16 (V4).');
table(s,[['하는 것','하지 않는 것'],['22개 BCMS 프로세스 유형 사이의 운영 연결(운영 후보 24개)','연결품질이 확정된 요인 구조라는 주장'],['문헌 인용에 근거한 관계·개념·문항의 구조화와 검증 설계','차원 평균·동일가중 지수 등 자동 점수 (측정모형 확정 전)'],['한 조직의 BCMS를 단위로 한 담당자(핵심정보제공자) 보고','연계성이 조직회복탄력성의 원인이라는 인과 주장'],['위계·집단 진술·근거 보류 관계의 구분 보존','고정 문항 수·N≥150·r<.85 단독 판별 기준, BCMS 전체 포괄률(%)']],M,1.65,CW,[6.0,6.13],{fs:14,rowH:0.8});
source(s,'시트 수정이력 R01·R02·R09·R12·R14·R16(V4); Arias §4.3 pp.14–16; MacKenzie 외(2011) pp.302–303.');

// ===== Ⅳ 연구방법
s=slide('연구방법 개관: 근거에서 문항으로, 문항에서 검증으로','Ⅳ 연구방법','전체 방법을 한 장으로 봅니다. 앞의 네 단계, 즉 객체 추출, 관계 추출, 개념 정의, 문항 후보 개발은 후보 수준으로 수행했습니다. 뒤의 단계들은 전문가 내용타당화, 인지면접과 예비조사 및 측정모형, 판별타당도와 구조적 관련성 검증, 연구방법 서술입니다. 수행한 것과 예정인 것을 구분해 표시합니다. 출처: 시트 검증계획 Gate 1–8; Boateng 외(2018) Table 1.');
const st=[['①','객체 추출','Arias Table 5',HX.blue],['②','관계 추출','§4.3 인용·등급',HX.blue],['③','개념 정의','학술근거·한계',HX.blue],['④','문항 후보','179 은행',HX.blue],['⑤','내용타당화','전문가 심사',HX.gray],['⑥','인지면접·예비조사','측정모형 선택',HX.gray],['⑦','판별·구조 검증','ORAS·SEM',HX.gray]];
st.forEach((c,i)=>{const w=1.62,x=M+i*(w+0.13);s.addShape(SH.RECTANGLE,{x,y:1.8,w,h:1.9,fill:{color:c[3]===HX.blue?c[3]:'F3F6FA'},line:{color:c[3],width:c[3]===HX.blue?0:1.25,dashType:c[3]===HX.blue?'solid':'dash'}});
 txt(s,c[0],x+0.1,1.9,w-0.2,0.5,{fontSize:24,bold:true,color:c[3]===HX.blue?'FFFFFF':HX.gray,align:'center'});txt(s,c[1],x+0.08,2.5,w-0.16,0.6,{fontSize:14,bold:true,color:c[3]===HX.blue?'FFFFFF':HX.navy,align:'center'});txt(s,c[2],x+0.08,3.15,w-0.16,0.5,{fontSize:12,color:c[3]===HX.blue?'DCE8F7':HX.gray,align:'center'});});
chip(s,'수행(후보 수준) ①–④',M,3.95,3.2,HX.blue,{fs:12});chip(s,'예정 ⑤–⑦ (Gate 2–7) · ⑧ 연구방법 서술(Gate 8)',M+3.4,3.95,5.2,HX.gray,{fs:12});
table(s,[['단계','학술·인용 근거','확인 수준'],['①②','Arias-Aranda 외(2026) Table 5 p.14, §4.3 pp.14–16; Białas(2010) §2 pp.2–3; Noy & McGuinness(2001) Step 1','PDF 문자열 대조 / 연구자 본문 확인'],['③','Gotel & Finkelstein(1994) §5.1; Wang & Strong(1996) App. D1; Pipino 외(2002) pp.214–215','연구자 본문 확인(V4)'],['④⑤⑥','Boateng 외(2018) Table 1; Polit 외(2007); MacKenzie 외(2011) pp.302–303','본문 확인 / 초록만 확인']],M,4.5,CW,[1.1,8.0,3.03],{fs:11.5,rowH:0.45});
source(s,'시트 검증계획·외부학술근거(V4). 확인 수준은 참고문헌 슬라이드 참조. 단계 ①–④는 V4 기준 후보 수준이며 전문가 판단을 거치지 않았다.');

s=slide('방법 ①②: 객체와 관계를 인용에서 추출합니다','Ⅳ 연구방법','첫 두 단계입니다. 객체는 Arias Table 5의 22개 프로세스 유형입니다. 관계는 Arias §4.3의 프로세스 설명에서 출발 유형의 산출물이 도착 유형의 입력이나 기준이 된다는 문장을 찾아 인용하고, 제가 끝점과 의미를 정규화하여 기록합니다. 표현 방식은 Białas의 클래스, 인스턴스, 슬롯, 역량질의를 참고했고, 범위 설정은 Noy와 McGuinness의 Step 1을 따랐습니다. 출처: Table 5 p.14; §4.3 pp.14–16; Białas §2 pp.2–3.');
[['객체 추출',HX.blue,'• 대상: Arias Table 5의 22개 유형 (관리 1 · 핵심 17 · 지원 4)\n• 이름·전문가 지명률을 PDF와 대조 (22/22 일치)\n• 유형 ≠ 조직의 실제 프로세스 인스턴스'],['관계 추출',HX.orange,'• §4.3에서 산출물 전달 문장을 인용 (A11–A31)\n• 연구자 정규화: 끝점·방향·의미 표기\n• 등급 E1 직접 / E2 정규화 / E3 근거 부족\n• 분류: 운영 후보 24 · 위계 2 · 집단 2 · 보류 3'],['표현·범위 방법',HX.green,'• Białas: 클래스·인스턴스, object/data slot, 역량질의(방법만 차용)\n• Noy & McGuinness: 영역·용도·질의로 범위 설정\n• 개념 스키마 5층: ProcessType, Artifact, ProcessLink, LinkObservation, ImprovementPathObservation\n• OWL 구현·추론은 하지 않음']].forEach((c,i)=>{const w=(CW-0.4)/3,x=M+i*(w+0.2);card(s,x,1.65,w,4.85,{shadow:true,bar:c[1]});txt(s,c[0],x+0.3,1.78,w-0.5,0.5,{fontSize:19,bold:true,color:c[1]});txt(s,c[2],x+0.3,2.4,w-0.5,3.9,{fontSize:14});});
source(s,'Arias-Aranda 외(2026) Table 5 p.14, §4.3 pp.14–16 · Białas(2010) §2 pp.2–3(방법만 차용) · Noy & McGuinness(2001) Step 1 PDF pp.4–5 · 시트 관계근거31·온톨로지규칙.');

s=slide('방법 ③: 개념은 출처 → 적용 정의 → 전이 한계 순으로 정의','Ⅳ 연구방법','개념 정의 방법입니다. 각 개념마다 출처 문헌이 실제로 말하는 범위와, 제가 BCMS 연결에 적용해 정의한 내용, 그리고 전이의 한계를 따로 적습니다. 예를 들어 정합성은 Wang과 Strong의 표현 일관성과 의미적 정합성을 구별하고, 추적성은 Gotel과 Finkelstein의 전방·후방 중 후방만 조작화했습니다. 확인 수준이 낮은 근거는 그대로 표시합니다. 출처: 시트 품질개념6·인용지도.');
table(s,[['개념','학술·인용 근거','문헌이 말하는 범위','적용 한계'],['CO 정합성','S03 App. D1 · S06 초록','표현 일관성 ≠ 의미적 정합성; S06은 본문 미확인','내용 동일성이 아님, 확정 요인 아님'],['TR 추적가능성','S01 §5.1 PDF p.4','전방·후방 추적','후방만 조작화'],['EV 증빙가능성','B17 Białas p.5','기록이 인증 증거로 사용','연결 전체 차원은 연구자 확장, TR과 중복 검토'],['TM 변경전파 적시성','S04 pp.214–215','과업 맥락의 적시성 ≠ currency','전달 기한은 연구자 정의'],['AC 책임명확성','A49·A50 · S07 초록','프로세스 전체 책임; Accountability는 설명·판단·결과 포함','담당 지정만 묻는 관리조건 후보'],['FC 개선조치 완결성','A23·A25·A29','개선 활용 서술, 닫힌 순환 미실증','경로 후보, 개념 보류']],M,1.55,CW,[2.4,2.8,4.4,2.53],{fs:12,rowH:0.62});
source(s,'시트 품질개념6·인용지도(V4, B17 쪽 p.5 정정). Gotel & Finkelstein(1994); Wang & Strong(1996); Pipino 외(2002); Zowghi & Gervasi(2003, 초록); Bovens(2007, 초록).');

s=slide('방법 ④⑤: 문항 후보는 별도 심사로 내용타당도를 확인합니다','Ⅳ 연구방법','문항 개발과 내용타당화입니다. Boateng 등의 척도 개발 절차에서 영역 정의, 문항 생성, 내용타당화는 앞 단계입니다. 저는 관계의 적절성과 문항의 적합성, 명료성, 응답 가능성을 서로 다른 평가로 나누고, 전문가 6인이 평가하면 I-CVI 0.78 이상, 즉 6명 중 5명 이상 적절 평가를 보조 기준으로 씁니다. Polit 등은 우연 합의의 보정도 필요하다고 보며, 수치만으로 채택하지 않고 의견과 개념 누락을 함께 판단합니다. 출처: Boateng Table 1; Polit 외 초록; 시트 검증계획 Gate 3.');
[['문항 개발',HX.blue,'• 연결 내용 + 품질 개념이 모두 적합한 곳에서만 문항 생성\n• 예: “BIA에서 도출·승인된 요구사항이 전략 선정의 근거가 될 때 …” (L06)\n• 전 관계 × 전 개념의 일률 배정 금지\n• 179개는 검토 은행 (최종 수 아님)'],['전문가 내용타당화',HX.orange,'• 관계 타당성과 문항 적합성·명료성·응답 가능성을 별도 평가\n• I-CVI .78 이상 권고(Polit 외 2007, 초록), 6인 5/6=.833\n• 우연 합의 보정과 의견·개념 누락을 함께 판단\n• 수치만으로 채택하지 않음'],['근거 위치',HX.green,'• Boateng 외(2018) Table 1: domain·item generation, content validity, 인지면접 등 절차\n• 고정 문항 수나 6요인을 보증하지 않음\n• 80/20 자동 규칙·60문항 규칙은 사용하지 않음(R14·R17)']].forEach((c,i)=>{const w=(CW-0.4)/3,x=M+i*(w+0.2);card(s,x,1.65,w,4.85,{shadow:true,bar:c[1]});txt(s,c[0],x+0.3,1.78,w-0.5,0.5,{fontSize:19,bold:true,color:c[1]});txt(s,c[2],x+0.3,2.4,w-0.5,3.9,{fontSize:14});});
source(s,'Boateng 외(2018) Front. Public Health 6:149, Table 1(본문 확인, V4) · Polit 외(2007) Res. Nurs. Health 30(4), 459–467(초록만 확인, V4) · 시트 검증계획 Gate 3·수정이력 R14·R17.');

s=slide('방법 ⑥: 인지면접·예비조사로 줄이고 측정모형을 고릅니다','Ⅳ 연구방법','다음은 인지면접과 예비조사, 측정모형입니다. 담당자가 문항을 이해하는지, 근거를 찾을 수 있는지, 응답 가능한지를 인지면접으로 확인하고 179개를 줄입니다. 측정모형은 반영적, 형성적, 프로파일 가운데 개념 정의에 맞게 선택하며, 요인분석 결과만으로 정하지 않습니다. MacKenzie 등은 이 선택이 지표와 구성개념의 관계에 달려 있다고 다룹니다. 표본은 최종 모형에 맞춰 설계하고 고정 N 기준은 쓰지 않습니다. 응답은 DK, NA, NC, NO를 구분합니다. 출처: MacKenzie 외 pp.302–303; 시트 검증계획 Gate 4–5; 응답설계.');
table(s,[['단계','내용','근거·주의'],['인지면접(Gate 4)','이해·근거 검색·응답 가능성, TR/EV 중복, TM 조건 확인 후 후보 축소','179개 전부를 배포하지 않음'],['예비조사(Gate 5)','분포·결측·응답 코드 점검 후 측정모형 평가','한 조직 1인 응답이면 핵심정보제공자 보고임을 명시'],['측정모형 선택','반영적 → EFA/CFA · 형성적·복합 → 다른 모형 절차 · 프로파일 보고','MacKenzie 외(2011) pp.302–303; 요인분석만으로 결정하지 않음'],['응답 코드','DK 모름 · NA 범위 밖 · NC 변경 없음 · NO 프로세스 미운영','결측과 낮은 품질로 변환하지 않음 (R13)']],M,1.6,CW,[2.6,5.7,3.83],{fs:12.5,rowH:0.85});
source(s,'MacKenzie, Podsakoff & Podsakoff(2011) MIS Quarterly 35(2), pp.302–303(본문 확인, V4) · 시트 검증계획 Gate 4–5·응답설계 · 수정이력 R12–R14.');

s=slide('방법 ⑦: 연결 상태와 조직회복탄력성의 구조적 관련성을 검증합니다','Ⅳ 연구방법','마지막 검증입니다. 측정모형이 확인되면 기존 회복탄력성 척도와의 판별타당도를 보고, 연결 상태와 조직회복탄력성의 구조적 관련성을 검증합니다. 다만 횡단 자기보고 자료이므로 인과 효과로 표현하지 않고, 공통방법편의와 집계 수준을 검토합니다. 회복탄력성 척도 ORAS는 원저와 판본, 문항, 한국어 적용 근거를 아직 확정하지 못했으며 상관 0.85 단독 기준으로 판단하지 않습니다. 출처: 시트 검증계획 Gate 6·7; 수정이력 R14·R15.');
card(s,M,1.8,3.7,2.1,{bar:HX.gray,fill:'F3F6FA'});txt(s,'BCMS 연계성',M+0.3,1.95,3.2,0.5,{fontSize:20,bold:true,color:HX.navy});txt(s,'연결품질 후보 개념\n(측정모형 확정 후)',M+0.3,2.55,3.2,1.2,{fontSize:14});
s.addShape(SH.RIGHT_ARROW,{x:M+3.9,y:2.55,w:2.4,h:0.8,fill:{color:HX.orange},line:{color:HX.orange,width:0}});txt(s,'구조적 관련성\n(인과 아님)',M+3.95,2.55,2.0,0.8,{fontSize:12,bold:true,color:'FFFFFF',align:'center',valign:'middle'});
card(s,M+6.5,1.8,3.7,2.1,{bar:HX.gray,fill:'F3F6FA'});txt(s,'조직회복탄력성',M+6.8,1.95,3.2,0.5,{fontSize:20,bold:true,color:HX.navy});txt(s,'측정도구 미확정\n(ORAS는 후보, 근거 확보 중)',M+6.8,2.55,3.2,1.2,{fontSize:14});
table(s,[['Gate','검증 내용','주의'],['Gate 6','ORAS 원저·판본·문항·사용 조건·한국어 적용 근거 확보, 개념 중복·판별타당도','현재 파일에 ORAS 척도 확정 근거 없음. r<.85 단독 판정 금지'],['Gate 7','측정모형 검증 후 연계성→조직회복탄력성 구조적 관계','횡단 자기보고 SEM을 인과로 표현하지 않음, 공통방법편의·집계 수준 검토']],M,4.2,CW,[1.2,6.2,4.73],{fs:12.5,rowH:0.75});
source(s,'시트 검증계획 Gate 6·7(V4)·수정이력 R14·R15. 회복탄력성의 배경 서술: Arias Abstract p.1 (A68), Białas p.1 (B23). ORAS의 출처는 이 작업에서 확정하지 못함.');

s=slide('진행 위치: Gate 1 확정, 다음은 Gate 2','Ⅳ 연구방법','현재 위치입니다. 범위를 고정하는 Gate 1은 확정되었고, 다음은 관계별 산출물과 사용 목적, 필수성을 검토하는 Gate 2입니다. 이어 관계와 문항의 별도 전문가 심사, 인지면접, 예비조사와 측정모형, 판별타당도, 구조 검증, 연구방법 서술 순입니다. 출처: 시트 검증계획.');
const gts=B['검증계획'];
gts.forEach((r,i)=>{const w=1.45,x=M+i*(w+0.07),done=i===0,cur=i===1;s.addShape(SH.RECTANGLE,{x,y:1.8,w,h:0.75,fill:{color:done?HX.green:cur?HX.orange:'F3F6FA'},line:{color:done?HX.green:cur?HX.orange:HX.gray,width:1,dashType:done||cur?'solid':'dash'}});s.addText(r['Gate'],{x,y:1.8,w,h:0.75,fontSize:14,bold:true,color:done||cur?'FFFFFF':HX.gray,align:'center',valign:'middle',margin:0});});
chip(s,'확정',M,2.7,1.0,HX.green,{fs:11,h:0.28});chip(s,'다음',M+1.1,2.7,1.0,HX.orange,{fs:11,h:0.28});chip(s,'예정',M+2.2,2.7,1.0,HX.gray,{fs:11,h:0.28});
table(s,[['Gate','목적','완료 조건·주의']].concat(gts.map(r=>[r['Gate'],r['목적'],r['완료 조건·주의']])),M,3.15,CW,[1.2,3.4,7.53],{fs:10.5,rowH:0.34});
source(s,'시트 검증계획(V4). 완료된 작업과 예정된 검증을 분리하여 서술한다(Gate 8).');

// ===== 학술근거 정리
s=slide('학술근거 지도: 각 주장이 어느 문헌의 어디에 근거하는가','인용근거와 학술근거','핵심 주장별로 근거 문헌과 위치, 확인 수준을 한 표로 정리했습니다. 원문 쪽을 확인한 것과 초록만 확인한 것, 제가 해석한 것을 구분해 읽어 주십시오. 출처: 시트 인용지도, 참고문헌, 외부학술근거.');
table(s,[['주장','근거','위치','확인 수준'],['BCMS 참조모델 부재·표준은 요구사항 중심','Arias-Aranda 외(2026)','p.1 Abstract(A55), p.2(A59·A61)','PDF 문자열 대조'],['BCMS는 프로세스 기반·상호 연관','Arias(A69) · Białas(B19)','Arias p.2, Białas p.1','PDF 문자열 대조'],['체크리스트식 접근의 한계','Arias(A60·A66)','p.2, p.18','PDF 문자열 대조'],['BCMS와 조직 회복탄력성','Arias(A68) · Białas(B23)','Arias p.1, Białas p.1','PDF 문자열 대조(관련성 실증은 아님)'],['22개 객체와 연결 서술','Arias Table 5, §4.3','p.14, pp.14–16','PDF 문자열 대조 72/72'],['추적가능성(TR)','Gotel & Finkelstein(1994)','§5.1 PDF p.4','연구자 본문 확인(V4)'],['적시성(TM)','Pipino 외(2002)','pp.214–215','연구자 본문 확인(V4)'],['정합성(CO)','Wang & Strong(1996); Zowghi & Gervasi(2003)','App. D1; 초록','본문 확인 / 초록만'],['책임명확성(AC) 범위 구별','Bovens(2007)','출판사 초록','초록만 확인'],['척도 개발·내용타당화·측정모형','Boateng 외(2018); Polit 외(2007); MacKenzie 외(2011)','Table 1; 초록; pp.302–303','본문 확인 / 초록만 / 본문 확인']],M,1.5,CW,[3.6,3.5,2.9,2.13],{fs:10.5,rowH:0.4});
source(s,'시트 인용지도·참고문헌(V4, 이번 발표용 18개 배경 인용 추가). 연구자 확인은 V4 기록이며 이번 작업에서 재확인하지 못함.');

s=slide('인용을 읽는 법과 이번 발표에서 확인한 것·확인하지 못한 것','인용근거와 학술근거','인용 확인 상태를 정직하게 밝힙니다. Arias와 Białas의 인용문은 제공된 PDF의 지정 쪽에서 문자열을 대조했고, 기존 72개와 이번 배경 인용 18개가 모두 일치했습니다. 외부 문헌 15건은 제가 앞서 기록한 확인 수준을 그대로 적었고 이번에는 다시 확인하지 못했습니다. 문자열이 일치해도 해석과 측정의 타당성은 보증되지 않습니다. 출처: outputs/quote_verification.json, outputs/background_quote_verification.json.');
[['① 문자열 대조','Arias·Białas 인용 90개 (기존 72 + 배경 18)를 제공 PDF의 지정 쪽에서 대조하여 일치. 번역은 연구자 참고 번역.',HX.blue],['② 연구자 확인(V4 기록)','외부 문헌 15건: 본문 확인 6 · 초록·소개만 4 · 서지만 5. 이번 작업에서 재확인하지 못함.',HX.gold],['③ 연구자 해석·정의','관계 정규화, 개념 정의, 문항, 필요성 논리. 근거가 아니라 검증 대상.',HX.orange]].forEach((c,i)=>{const x=M+i*4.12;card(s,x,1.7,3.9,3.1,{shadow:true,bar:c[2]});txt(s,c[0],x+0.3,1.85,3.45,0.5,{fontSize:18,bold:true,color:c[2]});txt(s,c[1],x+0.3,2.5,3.45,2.2,{fontSize:14});});
card(s,M,5.0,CW,1.45,{fill:'FFFFFF',line:HX.orange});txt(s,[{text:'한계  ',options:{bold:true,color:HX.orange}},{text:'ISO 22301·22313·27001 등 표준은 Arias의 서술을 통해서만 인용하며 원문을 확인하지 않았다. Białas의 게재지·연도·DOI, ORAS 척도의 원저·판본은 확정하지 못했다. “비어 있는 곳”의 판단은 체계적 문헌검토로 보강해야 한다.'}],M+0.3,5.1,CW-0.6,1.3,{fontSize:14});
source(s,'outputs/quote_verification.json(72/72), outputs/background_quote_verification.json(18/18); 시트 외부학술근거·참고문헌(V4 기록).');

refSlide('참고문헌 (1/3): 두 핵심 논문과 개념 근거',ST.refs.slice(0,6));
refSlide('참고문헌 (2/3): 개념 근거와 측정·방법 문헌',ST.refs.slice(6,12));
refSlide('참고문헌 (3/3): 서지만 확인했거나 직접 근거에서 제외한 문헌',ST.refs.slice(12));

// 부록 인용 대조표
const BQ=J('data/v5/background_quotes.json');
[[0,9],[9,18]].forEach(([a,b],k)=>{const sl=slide(`부록 ${k+1}/2. 배경·필요성 인용 원문 (PDF 문자열 대조 일치)`,'부록','부록: 이번 발표에서 새로 사용한 배경·필요성 인용 원문입니다. 모두 제공 PDF의 지정 쪽에서 문자열 대조로 일치했습니다. 번역은 연구자의 참고 번역입니다.');
 table(sl,[['ID','출처·쪽','원문','참고 번역']].concat(BQ.slice(a,b).map(q=>[q.id,`${q.source} ${q.section} p.${q.pages}`,q.text,q.ko])),M,1.45,CW,[0.7,1.9,5.4,4.13],{fs:9.5,rowH:0.5});
 source(sl,'Arias-Aranda 외(2026) Appl. Sci. 16, 3219; Białas(2010). outputs/background_quote_verification.json. 번역은 참고용.');});

// 마무리
s=pres.addSlide({masterName:'CLOSING'});
s.addText('근거가 있는 연결의 정의에서\n조직 회복탄력성과의 관련성까지',{placeholder:'title'});
s.addText([{text:'정리',options:{bold:true,fontSize:20,color:'FFFFFF',breakLine:true}},{text:'배경  BCMS는 상호 연관된 프로세스의 시스템이지만 표준은 요구사항 중심이다',options:{bullet:true,breakLine:true}},{text:'필요성  연결의 상태를 정의하고 측정한 도구가 확인된 범위에서 없다',options:{bullet:true,breakLine:true}},{text:'목적  22개 유형 사이 연결의 품질 개념·문항을 개발하고 타당화한다',options:{bullet:true,breakLine:true}},{text:'방법  인용 → 관계 → 개념 → 문항 → 전문가·인지면접 → 측정모형 → 구조적 관련성',options:{bullet:true}}],{x:1.0,y:3.0,w:11.3,h:3.2,fontSize:18,color:'CADCFC',paraSpaceAfter:10,margin:0,valign:'top'});
s.addText('출처: 본 발표 각 슬라이드. 감사합니다.',{x:1.0,y:6.6,w:11,h:0.4,fontSize:12,color:'9FB3D9',margin:0});
s.addNotes('정리하겠습니다. 배경은 BCMS가 상호 연관된 프로세스의 시스템이라는 것, 필요성은 연결의 상태를 정의하고 측정하는 도구가 제가 확인한 범위에서 없다는 것, 목적은 22개 유형 사이 연결의 품질 개념과 문항을 개발하고 타당화하는 것, 방법은 인용에서 시작해 전문가 심사와 인지면접, 측정모형, 구조적 관련성 검증으로 이어지는 것입니다. 감사합니다.');
await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
}
main();
