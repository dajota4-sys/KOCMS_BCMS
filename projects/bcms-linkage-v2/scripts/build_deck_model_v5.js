// V5 연구배경·필요성·목적·방법 PPT (build_deck_v5.js의 헬퍼 재사용본): data/v5/*.json + data/quotes.json -> outputs/BCMS_연구모형_V5.pptx
const fs=require('fs'),path=require('path');
const pptxgen=require('pptxgenjs');
const {applyTheme}=require(path.join(process.env.PPTX_SKILL_DIR||'/mnt/skills/public/pptx','scripts','apply_theme.js'));
const ROOT=path.resolve(__dirname,'..');
const J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const B=J('data/v5/v4_baseline.json'), ST=J('data/v5/story.json');
const Q=Object.fromEntries(J('data/quotes.json').concat(J('data/v5/background_quotes.json')).concat(J('data/v5/oras_quotes.json')).map(q=>[q.id,q]));
const OBJ=B['객체22'], LK=B['관계근거31'], IT=Object.fromEntries(B['예비문항179'].map(r=>[r['문항ID'],r])), CQ=Object.fromEntries(B['품질개념6'].map(r=>[r['코드'],r]));
const OUT=path.join(ROOT,'outputs','BCMS_연구모형_V5.pptx');
const THEME={name:'BCMS Story',headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕',colors:{dk1:'1F2937',lt1:'FFFFFF',dk2:'14213D',lt2:'F3F6FA',accent1:'E8892B',accent2:'2F6DB5',accent3:'3E9B63',accent4:'D6A21A',accent5:'C0392B',accent6:'6B7A90',hlink:'2F6DB5',folHlink:'6B7A90'}};
const HX={navy:'14213D',blue:'2F6DB5',orange:'E8892B',green:'3E9B63',gold:'D6A21A',red:'C0392B',gray:'6B7A90',light:'F3F6FA',line:'D5DAE3',ink:'1F2937'};
const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
pres.title='BCMS 연계성 연구 모형 (V5)'; pres.author='박사논문 프로젝트';
pres.theme={headFontFace:'맑은 고딕',bodyFontFace:'맑은 고딕'};
const W=13.33,H=7.5,M=0.6,CW=W-2*M, SH=pres.shapes;
const TITLE_FOOT='BCMS 연계성 연구 · 연구 모형 · V5';
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

function ell(s,x,y,w,h,col,t1,t2,fs){s.addShape(SH.OVAL,{x,y,w,h,fill:{color:'FFFFFF'},line:{color:col,width:2.25}});
 s.addText([{text:t1,options:{bold:true,fontSize:fs||14,color:HX.navy,breakLine:true}},{text:t2,options:{fontSize:(fs||14)-2,color:HX.gray}}],{x,y,w,h,align:'center',valign:'middle',margin:0.05,fit:'none'});}
function arr(s,x1,y1,x2,y2,o){s.addShape(SH.LINE,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),flipV:(y2<y1)!==(x2<x1)?true:false,flipH:false,line:{color:o.color||HX.navy,width:o.w||2,dashType:o.dash||'solid',endArrowType:o.noarrow?undefined:'triangle'}});}
async function main(){
const s=slide('연구 모형: 프로세스 연계성 → 조직회복탄력성(ORAS)','연구 모형 (사전가설)','연구 모형을 한 장으로 말씀드립니다. 독립 개념은 Arias의 22개 프로세스 사이의 연계성이고, 결과 개념은 조직회복탄력성입니다. 조직회복탄력성은 ORAS의 세 역량, 즉 예측과 사전대비, 대응과 흡수, 적응과 학습으로 측정합니다. 사전가설은 연계성이 높을수록 조직회복탄력성과 세 역량이 높다는 H1과 H1a에서 H1c입니다. 다만 횡단 자기보고 자료이므로 인과가 아니라 구조적 관련성으로 검증하며, ORAS 원저도 인과 관계를 확정할 수 없다고 밝힙니다. 출처: ORAS Domínguez-Ortega 외(2026) p.1, 6, 11, 16–17; 사전가설 도식은 연구자 제안.');
// 다이어그램 (왼쪽 ~7.6in)
ell(s,M,3.45,2.75,1.35,HX.blue,'재해경감활동\n프로세스 연계성','Process Connectivity',14);
ell(s,5.0,1.65,3.1,1.05,HX.green,'조직회복탄력성','Organizational Resilience',14);
ell(s,5.55,3.2,2.55,0.95,'9DBB3C','Anticipation','예측·사전대비',13);
ell(s,5.55,4.45,2.55,0.95,'2BA3B3','Coping','대응·흡수',13);
ell(s,5.55,5.65,2.55,0.95,'7E57A8','Adaptation','적응·학습',13);
// H1
s.addShape(SH.LINE,{x:M+2.7,y:2.3,w:2.35,h:1.35,flipV:true,line:{color:HX.navy,width:2.75,endArrowType:'triangle'}});
txt(s,'H1 (+)',3.7,2.35,0.9,0.3,{fontSize:13,bold:true,color:HX.navy});
// H1a-c 점선
s.addShape(SH.LINE,{x:M+2.7,y:3.55,w:2.55,h:0.1,flipV:true,line:{color:HX.navy,width:2,dashType:'dash',endArrowType:'triangle'}});
s.addShape(SH.LINE,{x:M+2.7,y:4.1,w:2.55,h:0.8,line:{color:HX.navy,width:2,dashType:'dash',endArrowType:'triangle'}});
s.addShape(SH.LINE,{x:M+2.7,y:4.3,w:2.55,h:1.8,line:{color:HX.navy,width:2,dashType:'dash',endArrowType:'triangle'}});
txt(s,'H1a (+)',4.5,3.72,0.9,0.3,{fontSize:12,bold:true,color:HX.navy});txt(s,'H1b (+)',4.85,4.2,0.9,0.3,{fontSize:12,bold:true,color:HX.navy});txt(s,'H1c (+)',3.6,5.1,0.9,0.3,{fontSize:12,bold:true,color:HX.navy});
// 점선: 조직회복탄력성 -> 세 역량 (구성 영역)
const bx=8.4;s.addShape(SH.LINE,{x:bx,y:2.7,w:0,h:3.4,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});
[[2.7,0],[3.65,0],[4.9,0],[6.1,0]].forEach(()=>{});
s.addShape(SH.LINE,{x:8.1,y:3.67,w:0.3,h:0,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});s.addShape(SH.LINE,{x:8.1,y:4.92,w:0.3,h:0,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});s.addShape(SH.LINE,{x:8.1,y:6.12,w:0.3,h:0,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});
s.addShape(SH.LINE,{x:8.1,y:2.18,w:0.3,h:0,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});s.addShape(SH.LINE,{x:8.4,y:2.18,w:0,h:0.52,line:{color:HX.gray,width:1.75,dashType:'sysDot'}});
txt(s,'구성 역량\n(ORAS)',8.5,4.0,0.9,0.7,{fontSize:11,color:HX.gray});
chip(s,'사전가설 · 검증 예정 · 인과 아님',M,6.1,4.0,HX.orange,{fs:11,h:0.3});
// 오른쪽 패널
const px=9.45,pw=W-px-M+0.0;
card(s,px,1.55,pw,2.75,{bar:HX.green,fill:'F1F8F4',line:'CBE6D6'});txt(s,'측정도구 ORAS',px+0.25,1.62,pw-0.4,0.35,{fontSize:15,bold:true,color:HX.green});
txt(s,bul(['Domínguez-Ortega, Marynissen & Errea Rodríguez(2026), JCCM 34:e70164','역량 3개(Anticipation·Coping·Adaptation) × 12문항 = 36문항 (p.6)','약 130개 응답 · 7개 조직군 (p.1)','각 역량 내부는 2하위요인 모형이 더 적합 (EFA·CFA, p.11)'],{gap:3}),px+0.25,2.0,pw-0.4,2.3,{fontSize:11.5});
card(s,px,4.4,pw,2.1,{bar:HX.orange,fill:'FEF3E6',line:'F5D3A8'});txt(s,'주의',px+0.25,4.46,pw-0.4,0.3,{fontSize:14,bold:true,color:HX.orange});
txt(s,bul(['원저 한계: N=131, 인과관계 확정 불가 (p.16–17)','3역량을 묶은 상위요인 구조는 이 논문에서 확인하지 못함 → 상위요인 vs 개별 결과는 연구자 결정','한국어 적용 근거 필요 (원저 번역은 스페인어·네덜란드어)'],{gap:3}),px+0.25,4.78,pw-0.4,1.7,{fontSize:11});
source(s,'ORAS: Domínguez-Ortega, Marynissen & Errea Rodríguez(2026), J. Contingencies & Crisis Mgmt 34, e70164, doi:10.1111/1468-5973.70164 (인용 6개 PDF 문자열 대조 일치, p.1·6·11·16·17). 가설 H1–H1c와 도식은 연구자 사전가설. 검증: 측정모형 확정 → ORAS 한국어 적용·판별타당도 → SEM(Gate 5–7).');
await pres.writeFile({fileName:OUT}); await applyTheme(OUT,THEME); console.log('saved',OUT);
}
main();
