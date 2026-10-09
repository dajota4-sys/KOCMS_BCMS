// V5 연구배경·필요성·목적·방법 PPT (build_deck_v5.js의 헬퍼 재사용본): data/v5/*.json + data/quotes.json -> outputs/BCMS_연구모형_활용근거_V5.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const {applyTheme}=require(path.join(process.env.PPTX_SKILL_DIR||'/mnt/skills/public/pptx','scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const B=J('data/v5/v4_baseline.json'), ST=J('data/v5/story.json');
const Q=Object.fromEntries(J('data/quotes.json').concat(J('data/v5/background_quotes.json')).concat(J('data/v5/oras_quotes.json')).map(q=>[q.id,q]));
const OBJ=B['객체22'], LK=B['관계근거31'], IT=Object.fromEntries(B['예비문항179'].map(r=>[r['문항ID'],r])), CQ=Object.fromEntries(B['품질개념6'].map(r=>[r['코드'],r]));
const OUT=path.join(ROOT,'outputs','BCMS_연구모형_활용근거_V5.pptx');
const THEME={name:'BCMS Story',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'E8892B',accent2:'2F6DB5',accent3:'3E9B63',accent4:'D6A21A',accent5:'C0392B',accent6:'6B7A90',hlink:'2F6DB5',folHlink:'6B7A90'}};
const HX={navy:'14213D',blue:'2F6DB5',orange:'E8892B',green:'3E9B63',gold:'D6A21A',red:'C0392B',gray:'6B7A90',light:'F3F6FA',line:'D5DAE3',ink:'1F2937'};
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
pres.title='연구 모형의 활용 이유와 설명 방식 (V5)'; pres.author='박사논문 프로젝트';
pres.theme={headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕'};
const W=13.33,H=7.5,M=0.6,CW=W-2*M, SH=pres.shapes;
const TITLE_FOOT='BCMS 연계성 연구 · 연구 모형 활용 근거 · V5';
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


async function main(){
const s=slide('연구 모형을 쓰는 이유와, 모형으로 설명하는 방법','연구 모형 (활용 근거)','연구 모형을 왜 쓰는지와 어떻게 설명할지를 한 장으로 말씀드립니다. 이유는 세 가지입니다. 첫째, Arias와 Białas는 BCMS가 조직 회복탄력성을 뒷받침한다고 서술하지만 연결 상태와의 관련성을 측정하지 않았으므로 이를 검증할 모형이 필요합니다. 둘째, 결과 개념인 조직회복탄력성에는 Duchek의 세 역량 틀에 기반한 ORAS가 있어 결과를 세 역량으로 나눠 설명할 수 있습니다. 셋째, ORAS 저자도 인과를 확정할 수 없다고 밝히듯 횡단 자기보고 자료는 구조적 관련성으로 말하는 것이 정직합니다. 설명은 개념 정의, 가설 검증, 해석의 세 단계로 하며, 가설별 연결 영역은 제 해석이고 검증 대상입니다. 출처: Arias p.1 A68; Białas p.1 B23; ORAS p.3, 6, 17.');
// 왼쪽: 왜
txt(s,'왜 연구 모형인가',M,1.5,5.0,0.4,{fontSize:18,bold:true,color:HX.navy});
const why=[['①','서술은 있으나 실증이 없다','Arias는 BCMS 프로세스 참조모델이 조직 회복탄력성 강화를 목표로 한다고(A68, p.1), Białas는 BCMS가 회복탄력성을 뒷받침한다고(B23, p.1) 서술한다. 두 논문 모두 연결 상태와의 관련성은 측정하지 않았다 → 관련성을 검증할 모형이 필요.',HX.blue,'Arias·Białas 문자열 대조'],
['②','결과 개념에 구조가 있다','ORAS는 Duchek(2020)의 세 역량 틀(p.3)에 기반하고 역량별 12문항(p.6)이다 → 결과를 H1a–c로 나눠 “어떤 연결이 어떤 역량과 관련되는가”를 설명할 수 있다. 단, ORAS는 초기 검증 단계(N≈130).',HX.green,'ORAS 문자열 대조'],
['③','인과가 아닌 관련성을 말하기 위해','ORAS 저자도 자료는 가능한 연결을 시사할 뿐 확정적 인과를 설정할 수 없다고 밝힌다(p.17). 횡단 자기보고 자료는 구조적 관련성 모형이 정직한 해석 틀이다.',HX.orange,'ORAS p.17']];
why.forEach((c,i)=>{const y=1.95+i*1.55;card(s,M,y,5.05,1.45,{bar:c[3],shadow:false});txt(s,c[0]+'  '+c[1],M+0.25,y+0.06,4.7,0.32,{fontSize:14,bold:true,color:c[3]});txt(s,c[2],M+0.25,y+0.4,4.7,0.95,{fontSize:11});});
// 오른쪽: 어떻게
const rx=5.95,rw=W-rx-M;
txt(s,'어떻게 모형으로 설명할 것인가',rx,1.5,rw,0.4,{fontSize:18,bold:true,color:HX.navy});
[['① 개념 정의','연계성(측정모형 확정 후) · 조직회복탄력성(ORAS 3역량)',HX.blue],['② 가설 검증','H1 전체 + H1a–c 역량별 구조적 관련성(SEM)',HX.green],['③ 해석','방향·크기·역량별 차이, 인과 표현 금지',HX.orange]].forEach((c,i)=>{const w=(rw-0.3)/3,x=rx+i*(w+0.15);s.addShape(SH.RECTANGLE,{x,y:1.95,w,h:0.8,fill:{color:c[2]},line:{color:c[2],width:0}});txt(s,c[0],x+0.12,2.0,w-0.2,0.32,{fontSize:13,bold:true,color:'FFFFFF'});txt(s,c[1],x+0.12,2.3,w-0.2,0.45,{fontSize:10,color:'FFFFFF'});});
table(s,[['가설','연결 측면 (연구자 해석 · 검증 대상)','ORAS 근거 (Duchek 역량 서술, p.3)'],
[{text:'H1',options:{bold:true}},'프로세스 연계성 전체 → 조직회복탄력성','회복탄력성은 세 역량으로 구성 (O07)'],
[{text:'H1a\nAnticipation',options:{bold:true}},'요구사항→BIA→리스크평가→전략·계획 등 사전 준비 연결','준비는 위험관리·비상계획·BCP 통찰을 통합 (O08)'],
[{text:'H1b\nCoping',options:{bold:true}},'사고대응·훈련·경보·복구 등 대응 연결 (INC·EXE·WARN·REC)','중단 발생 시 대처, 위기관리와 명확한 연결 (O09)'],
[{text:'H1c\nAdaptation',options:{bold:true}},'평가·감사→개선→변경 연결 (PERF·AUD·CI·CHG)','예기치 못한 사건에 적응·전환하는 능력 (O10)']],rx,2.85,rw,[1.25,2.9,rw-4.15],{fs:10,rowH:0.5});
card(s,rx,5.85,rw,0.7,{fill:'F3F6FA',line:HX.gray});txt(s,[{text:'해석 원칙  ',options:{bold:true,color:HX.navy}},{text:'(+) 방향은 사전가설이며 결과로 확인 · “구조적 관련성·예측관계”로 표현 · 역량별 계수 차이로 연결 영역별 의미를 설명 · 조직 단위·공통방법편의 검토 · 상위요인/개별 결과 선택은 측정모형 확인 후 결정'}],rx+0.2,5.88,rw-0.4,0.65,{fontSize:10});
source(s,'Arias-Aranda 외(2026) p.1 (A68) · Białas(2010) p.1 (B23) · Domínguez-Ortega, Marynissen & Errea Rodríguez(2026) JCCM 34:e70164, p.3(O07–O10)·6·17 (PDF 문자열 대조 10/10). 가설별 “연결 측면” 배정은 연구자 해석이며 문헌이 직접 서술한 것이 아님.');
await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
}
main();
