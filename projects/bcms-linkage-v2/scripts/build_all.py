"""data/*.json -> outputs/BCMS_연계성_V2.xlsx, outputs/BCMS_연계성_V2_근거정의서.md, survey/survey_items_v2.(json|csv)
사전 조건: scripts/verify_quotes.py 실행(outputs/quote_verification.json), scripts/mkmap.py 실행(지도 PNG).
엑셀 수식 재계산은 별도로 LibreOffice recalc(README 참조)."""
import csv,json,os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from common import load,out,ROOT,DOMAIN_ORDER,CORE_NAME
from openpyxl import Workbook
from openpyxl.styles import Font,PatternFill,Alignment,Border,Side
from openpyxl.utils import get_column_letter as CL
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.drawing.image import Image

Q={q['id']:q for q in load('quotes.json')}; LK=load('links.json'); IT=load('items.json'); DF=load('definitions.json')
RT=load('relation_types.json'); HL=load('held_links.json'); OB=load('objects.json'); RESP=load('respondent_items.json')
OBJ={o['id']:o for o in OB}
ver=json.load(open(out('quote_verification.json'),encoding='utf-8'))
VOK={r['id']:r['ok'] for r in ver['quotes']}; VDATE=ver['date']
assert not ver['failures'],'인용 검증 실패가 있으므로 빌드를 중단합니다'
def nm(i): return CORE_NAME if i=='CORE' else f"{i} {OBJ[i]['name']}"
FN='맑은 고딕'
F=lambda b=False,c='000000',s=10,i=False: Font(name=FN,bold=b,color=c,size=s,italic=i)
HF=PatternFill('solid',fgColor='1D4E89'); INF=PatternFill('solid',fgColor='FFF9DB'); GREY=PatternFill('solid',fgColor='F2F4F7')
OPF=PatternFill('solid',fgColor='FDECEA'); QF=PatternFill('solid',fgColor='EAF3FB'); BLUE='0000FF'
thin=Side(style='thin',color='D0D5DD'); BD=Border(left=thin,right=thin,top=thin,bottom=thin)
WR=Alignment(wrap_text=True,vertical='top'); CT=Alignment(horizontal='center',vertical='center',wrap_text=True)
wb=Workbook()
def hdr(ws,row,vals,widths=None):
    for j,v in enumerate(vals):
        c=ws.cell(row,1+j,v); c.font=F(True,'FFFFFF'); c.fill=HF; c.alignment=CT; c.border=BD
    if widths:
        for j,w in enumerate(widths): ws.column_dimensions[CL(1+j)].width=w
def put(ws,r,c,v,font=None,al=WR,fill=None,fmt=None):
    x=ws.cell(r,c,v); x.font=font or F(); x.alignment=al; x.border=BD
    if fill: x.fill=fill
    if fmt: x.number_format=fmt
    return x
def title(ws,t,sub=None):
    ws['A1']=t; ws['A1'].font=F(True,'101828',14)
    if sub: ws['A2']=sub; ws['A2'].font=F(False,'475467',10,True)
def qtxt(ids): return ' / '.join(ids) if ids else '(없음)'

# 안내
ws=wb.active; ws.title='안내'
title(ws,'BCMS 프로세스 간 연계성 — 문항은행 V2 (인용 근거와 연구자 의견 분리판)','박사논문 프로젝트 · 근거: Arias-Aranda et al.(2026) Appl. Sci. 16, 3219 / Białas(2010) Ontological approach to the BCMS development')
rows=[
('V2 핵심 변경','① 모든 근거는 PDF 원문과 자동 대조한 영문 인용문(쪽 번호 포함)으로 제시. ② 인용이 말하는 것과 연구자 해석·가정을 열로 분리. ③ 연구자 의견에 해당하는 용어는 [정의서]에서 정의. ④ 증거유형을 E1/E2/E3으로 재분류(V1은 일부 과대평가). ⑤ 연결을 출발→도착 한 쌍으로 쪼갬(25→31개).'),
('표기 규칙','파란 바탕 열 = 논문 인용(원문 대조 완료) · 빨간 바탕 열 = 연구자 의견(해석·가정·지표화). 연구자 번역(한국어)은 참고용이며 원문 대조 대상이 아님.'),
('증거유형','E1 = 원문이 S→T 연결을 직접 서술 · E2 = 원문이 연결을 서술하나 출발/도착 일부를 연구자가 특정·보완 · E3 = 원문에 연결 서술 없음(연구자 가정 또는 Białas 유추). 집계: E1 26개 / E2 2개 / E3 3개.'),
('시트 구성','정의서 · 인용근거(64) · 연결(31) · 관계유형(7) · 보류연결 · 객체(22) · 트리플 · 관계매트릭스 · 온톨로지맵 · 문항(108) · 보유·응답자정보 · 응답입력 · 연결점수 · 점수요약 · 검증'),
('사용 순서','① 정의서·연결 시트 검토(연구자 의견 열에 동의 여부 판단) → ② 문항 시트에서 전문가 6인 적합도(1~4) 입력, I-CVI·판정 자동 계산 → ③ 설문 응답을 응답입력 7행부터 입력 → ④ 연결점수·점수요약·검증 확인'),
('입력 칸','노란 바탕 + 파란 글씨 = 직접 입력. 응답입력 6행은 예시이며 집계에서 제외(집계는 7~56행).'),
('응답 척도','1 전혀 그렇지 않다 · 2 그렇지 않다 · 3 보통이다 · 4 그렇다 · 5 매우 그렇다 · 9 해당 없음/모르겠음(결측 처리)'),
('Białas 차용 범위','방법만 차용(competency question, object slot의 domain/range, data slot, 검증 방식). 클래스 목록과 관계 이름은 BS 25999 기반이라 쓰지 않음.'),
('중요한 한계','Arias는 프로세스가 핵심인지를 검증했을 뿐 프로세스 간 연결은 검증하지 않았음. 연결 31개는 전문가 검증 전 가설. R·V·U 구분, 관계유형 이름, 영역 분류, 집단 노드 CORE는 두 논문에 없는 연구자 설계.'),
('검증 기록',f'인용문 {ver["quotes_ok"]}/{ver["quotes_total"]} 및 객체 {ver["objects_ok"]}/{ver["objects_total"]}가 PDF 원문과 일치(검증일 {VDATE}). 재검증: scripts/verify_quotes.py'),
]
for i,(a,b) in enumerate(rows):
    put(ws,4+i,1,a,F(True),fill=GREY); put(ws,4+i,2,b); ws.row_dimensions[4+i].height=62 if len(b)>150 else 34
ws.column_dimensions['A'].width=18; ws.column_dimensions['B'].width=140

# 정의서
w=wb.create_sheet('정의서'); title(w,'정의서 — 용어별 정의, 유형(인용 정의 / 연구자 정의), 근거 인용','유형이 "연구자 정의"인 항목은 두 논문에 없는 연구자의 판단이며, 박사논문에서 연구자가 직접 확정해야 하는 부분')
hdr(w,4,['ID','용어','유형','정의','근거 인용 ID','근거 인용 원문(첫 번째)','근거·한계 설명'],[7,22,20,70,16,60,60])
for i,d in enumerate(DF):
    r=5+i; res='연구자' in d['type']
    put(w,r,1,d['id']); put(w,r,2,d['term'],F(True)); put(w,r,3,d['type'],fill=OPF if d['type'].startswith('연구자') else None)
    put(w,r,4,d['definition'],fill=OPF if res else None); put(w,r,5,qtxt(d['quotes']))
    put(w,r,6,f'=IFERROR(INDEX(인용근거!$E$5:$E$68,MATCH(LEFT(E{r},3),인용근거!$A$5:$A$68,0)),"")' if d['quotes'] else '(해당 인용 없음)',fill=QF if d['quotes'] else None)
    put(w,r,7,d['note']); w.row_dimensions[r].height=95
w.freeze_panes='C5'

# 인용근거
w=wb.create_sheet('인용근거'); title(w,'인용 근거 라이브러리 — PDF 원문과 자동 대조한 인용문 64개','쪽 = PDF 쪽 번호(Arias는 저널 쪽 번호와 동일). 한국어 번역은 연구자 번역(참고용)이며 대조 대상이 아님.')
hdr(w,4,['인용ID','출처','PDF 쪽','절','원문(영어, verbatim)','한국어 번역(연구자 번역·참고)','사용처','원문 대조'],[8,9,8,22,80,60,40,18])
for i,q in enumerate(Q.values()):
    r=5+i
    for j,v in enumerate([q['id'],q['source'],q['pages'],q['section'],q['text'],q['ko'],q['use'],f"일치 ({VDATE})" if VOK[q['id']] else '불일치']):
        put(w,r,1+j,v,F(True) if j==0 else None,fill=QF if j==4 else None)
    w.row_dimensions[r].height=62
w.freeze_panes='E5'; w.auto_filter.ref='A4:H68'
assert len(Q)==64

# 객체
wo=wb.create_sheet('객체'); title(wo,'객체 — Arias Table 5의 22개 BCMS 프로세스','범주·PDCA·재난관리주기: Table 5(p.14) / 전문가 지명률: Table 2–4(pp.11–13, 전문가 39명) / 대표 산출물: 연구자 제안')
hdr(wo,4,['ID','프로세스(한글)','Arias 원문 이름','범주','PDCA','재난관리주기','전문가 지명률(%)','Arias 합의 구분(80/20)','대표 산출물(연구자 제안)','관련 연결 수'],[8,26,50,8,9,14,13,22,36,11])
for i,o in enumerate(OB):
    r=5+i
    for j,v in enumerate([o['id'],o['name'],o['arias_name'],o['category'],o['pdca'],o['lifecycle']]): put(wo,r,1+j,v,fill=QF if j in(2,3,4,5) else None)
    put(wo,r,7,o['expert_pct'],F(c=BLUE),CT,QF)
    put(wo,r,8,f'=IF(G{r}>=80,"범주 1 (채택)",IF(G{r}>=20,"범주 2 (토론)","범주 3 (기각)"))')
    put(wo,r,9,o['artefact'],fill=OPF)
    put(wo,r,10,f'=COUNTIF(연결!$D$5:$D$35,A{r})+COUNTIF(연결!$E$5:$E$35,A{r})',al=CT)
r=5+len(OB)+1
put(wo,r,1,'주: 지명률 합의 구분은 참고용이다. Arias는 합의에 미달한 프로세스도 ISO 22301 요건(A45)을 이유로 핵심 프로세스로 유지했고, CRM(3%)도 참조모델에 포함해야 한다고 보았다(p.13). "BCMS 계획"은 프로젝트로 분류되어 제외했다(A48).',F(i=True,c='475467'))
wo.merge_cells(start_row=r,start_column=1,end_row=r,end_column=10); wo.row_dimensions[r].height=36; wo.freeze_panes='C5'

# 관계유형
w=wb.create_sheet('관계유형'); title(w,'관계유형 7개 — 연구자 정의(S→T 방향으로 읽음)','Białas의 관계 이름(hasBCplan 등)은 구성 관계 위주여서 쓰지 않고, 연결의 의미를 구분하기 위해 연구자가 정의했다.')
hdr(w,4,['ID','관계유형','정의(S→T)','판정 질문','해당 연결'],[8,18,50,50,40])
for i,r_ in enumerate(RT):
    for j,v in enumerate([r_['id'],r_['name'],r_['definition'],r_['test'],r_['links']]): put(w,5+i,1+j,v,F(True) if j==1 else None,fill=OPF if j in(2,3) else None)
    w.row_dimensions[5+i].height=34

# 연결
wl=wb.create_sheet('연결'); title(wl,'연결 31개 — 인용 근거(파랑)와 연구자 의견(빨강)을 분리','E1 직접 / E2 부분(연구자 보완) / E3 가정. 주 인용 원문은 인용근거 시트에서 자동으로 가져옴.')
H=['ID','영역','연결(S→T)','출발 S','도착 T','관계유형','증거유형','집단','주 인용 ID','주 인용 원문(PDF 대조 완료)','보조 인용 ID','인용이 확립하는 사실','연구자 의견: 해석·보완·가정','연구자 의견: 측정 지표화(R/V/U)','Białas 대응','검증 필요 사항','문항 수','점검']
hdr(wl,4,H,[6,18,26,8,8,14,9,6,10,70,14,55,60,55,35,35,8,8])
for i,l in enumerate(LK):
    r=5+i
    vals=[l['id'],l['domain'],f"{nm(l['source'])} → {nm(l['target'])}",l['source'],l['target'],l['relation'],l['evidence'],'집단' if l['group'] else '',qtxt(l['quotes_primary'])]
    for j,v in enumerate(vals): put(wl,r,1+j,v,F(True) if j in(0,6) else None,CT if j in(0,3,4,6,7) else WR)
    wl.cell(r,7).fill=PatternFill('solid',fgColor={'E1':'D1FADF','E2':'FEF0C7','E3':'FEE4E2'}[l['evidence']])
    put(wl,r,10,f'=IFERROR(INDEX(인용근거!$E$5:$E$68,MATCH(LEFT(I{r},3),인용근거!$A$5:$A$68,0)),"원문에 S→T 연결 서술 없음")',fill=QF)
    put(wl,r,11,qtxt(l['quotes_support'])); put(wl,r,12,l['established'],fill=QF)
    put(wl,r,13,l['researcher'],fill=OPF); put(wl,r,14,l['indicator'],fill=OPF); put(wl,r,15,l['bialas']); put(wl,r,16,l['validation'])
    put(wl,r,17,f'=COUNTIF(문항!$D$5:$D$112,A{r})',al=CT); put(wl,r,18,f'=IF(Q{r}=3,"OK","확인")',F(True),CT)
    wl.row_dimensions[r].height=150
wl.freeze_panes='D5'; wl.auto_filter.ref='A4:R35'

# 보류연결
w=wb.create_sheet('보류연결'); title(w,'보류·제외한 후보 연결 — 채택하지 않은 이유','연구자 결정란에 포함/제외를 직접 기록(노란 칸)')
hdr(w,4,['ID','출발','도착','후보 내용','채택하지 않은 이유(인용 근거 부재)','권고','연구자 결정'],[7,10,12,38,70,16,18])
for i,h in enumerate(HL):
    for j,v in enumerate([h['id'],h['source'],h['target'],h['idea'],h['reason'],h['decision']]): put(w,5+i,1+j,v)
    put(w,5+i,7,None,F(c=BLUE),CT,INF); w.row_dimensions[5+i].height=48

# 트리플
wt=wb.create_sheet('트리플'); title(wt,'온톨로지 트리플(주어–관계–목적어)','관계 트리플은 S—relation→T. ProcessLink 트리플은 연결을 개체로 보고 R·V·U 문항을 연결(Białas의 data slot 응용, 연구자 설계).')
hdr(wt,4,['주어','관계','목적어','연결 ID','증거유형','구분'],[24,18,24,9,9,18]); r=5
for l in LK:
    for t in [(l['source'],l['relation'],l['target'],'프로세스 관계')]:
        for j,v in enumerate([t[0],t[1],t[2],l['id'],l['evidence'],t[3]]): put(wt,r,1+j,v)
        r+=1
for l in LK:
    for t in [(f"Link_{l['id']}",'rdf:type','ProcessLink'),(f"Link_{l['id']}",'hasSource',l['source']),(f"Link_{l['id']}",'hasTarget',l['target']),(f"Link_{l['id']}",'hasRelationType',l['relation']),(f"Link_{l['id']}",'reflected',f"{l['id']}-R"),(f"Link_{l['id']}",'verified',f"{l['id']}-V"),(f"Link_{l['id']}",'updated',f"{l['id']}-U")]:
        for j,v in enumerate([t[0],t[1],t[2],l['id'],l['evidence'],'ProcessLink 객체']): put(wt,r,1+j,v)
        r+=1
wt.freeze_panes='A5'; wt.auto_filter.ref=f'A4:F{r-1}'

# 매트릭스
wm=wb.create_sheet('관계매트릭스'); title(wm,'관계 매트릭스 — 행(출발 S) → 열(도착 T)','셀 = 연결 ID, 굵은 글씨 = E1, 이탤릭 = E2, 빨간 글씨 = E3. CORE = 집단 노드(연구자 생성)')
ids=[o['id'] for o in OB]+['CORE']
for j,k in enumerate(ids):
    c=wm.cell(4,2+j,k); c.font=F(True,'FFFFFF'); c.fill=HF; c.alignment=CT; c.border=BD; wm.column_dimensions[CL(2+j)].width=8
    c=wm.cell(5+j,1,k); c.font=F(True,'FFFFFF'); c.fill=HF; c.alignment=CT; c.border=BD
wm.column_dimensions['A'].width=8; cell={}
for l in LK: cell.setdefault((l['source'],l['target']),[]).append(l)
for i,a in enumerate(ids):
    for j,b in enumerate(ids):
        ls=cell.get((a,b),[])
        if ls:
            ev=ls[0]['evidence']; put(wm,5+i,2+j,','.join(x['id'] for x in ls),F(ev=='E1','B42318' if ev=='E3' else '000000',9,ev=='E2'),CT,PatternFill('solid',fgColor='D6E6F7'))
        else: put(wm,5+i,2+j,None,al=CT)
wm.freeze_panes='B5'

# 문항
wq=wb.create_sheet('문항'); title(wq,'문항은행 108문항 (연결 93 + 종합 6 + 검증 9)','연결 문항은 모두 "연구자 문항화"이며, 연결의 근거는 연결 시트의 인용을 따른다. 전문가 6인의 적합도(1~4)를 L~Q열에 입력.')
hdr(wq,4,['문항ID','파트','영역','연결ID','연결(S→T)','상태','문항','증거유형','역문항','응답입력 열','근거 구분','전문가1','전문가2','전문가3','전문가4','전문가5','전문가6','I-CVI','판정'],[9,14,20,8,30,9,70,9,8,10,22,8,8,8,8,8,8,9,12])
resp_start=2+10+22; col_of={it['id']:CL(resp_start+i) for i,it in enumerate(IT)}
LKD={l['id']:l for l in LK}
for i,it in enumerate(IT):
    r=5+i; lk=LKD.get(it['link'])
    dm=lk['domain'] if lk else ('종합' if it['part'].startswith('D') else '검증')
    put(wq,r,1,it['id'],F(True)); put(wq,r,2,it['part']); put(wq,r,3,dm)
    put(wq,r,4,it['link'] or None,al=CT)
    put(wq,r,5,f'=IFERROR(INDEX(연결!$C$5:$C$35,MATCH(D{r},연결!$A$5:$A$35,0)),"")')
    put(wq,r,6,it['state'],al=CT); put(wq,r,7,it['text'],fill=OPF)
    put(wq,r,8,f'=IFERROR(INDEX(연결!$G$5:$G$35,MATCH(D{r},연결!$A$5:$A$35,0)),"")',al=CT)
    put(wq,r,9,'Y' if it['reverse'] else '',al=CT); put(wq,r,10,col_of[it['id']],al=CT)
    put(wq,r,11,it['basis_type']+('' if not it['basis_quotes'] else ' · 인용 '+qtxt(it['basis_quotes'])))
    for j in range(6): put(wq,r,12+j,None,F(c=BLUE),CT,INF)
    put(wq,r,18,f'=IFERROR(COUNTIF(L{r}:Q{r},">=3")/COUNT(L{r}:Q{r}),"")',al=CT,fmt='0.00')
    put(wq,r,19,f'=IF(R{r}="","",IF(R{r}>=검증!$B$4,"채택","수정·토론"))',al=CT)
    wq.row_dimensions[r].height=32
wq.freeze_panes='H5'; wq.auto_filter.ref='A4:S112'
dv=DataValidation(type='whole',operator='between',formula1='1',formula2='4',allow_blank=True,showErrorMessage=True,error='1~4'); wq.add_data_validation(dv); dv.add('L5:Q112')
NI=len(IT); assert NI==108

# 보유·응답자정보
wp=wb.create_sheet('보유·응답자정보'); title(wp,'Part A 응답자·조직 정보(10) / Part B 프로세스 보유 확인(22)','Part B: 1 운영한다 · 2 부분적으로 운영한다 · 3 운영하지 않는다 · 4 모르겠다. 연결 문항은 출발·도착 프로세스가 모두 1·2일 때만 제시(설문 구현 시 survey/SURVEY_SPEC.md 참조).')
hdr(wp,4,['ID','구분','항목','응답 방식','응답입력 열'],[8,10,36,52,12]); r=5
for i,a in enumerate(RESP['partA']):
    for j,v in enumerate([a['id'],'Part A',a['item'],a['options'],CL(2+i)]): put(wp,r,1+j,v)
    r+=1
for i,o in enumerate(OB):
    for j,v in enumerate([f'B{i+1:02d}','Part B',f"{o['id']} {o['name']}",'1 운영 / 2 부분 / 3 미운영 / 4 모름',CL(12+i)]): put(wp,r,1+j,v)
    r+=1

# 응답입력
wr=wb.create_sheet('응답입력'); title(wr,'응답 입력 (7행부터 최대 50명)','6행은 예시(집계 제외). 연결·종합·검증 문항: 1~5 또는 9. 보유 확인: 1~4.')
FIRST,LAST=7,56
heads=['응답자ID']+[a['id'] for a in RESP['partA']]+[f'B{i:02d}' for i in range(1,23)]+[it['id'] for it in IT]
for j,h in enumerate(heads):
    c=wr.cell(5,1+j,h); c.font=F(True,'FFFFFF'); c.fill=HF; c.alignment=CT; c.border=BD; wr.column_dimensions[CL(1+j)].width=12 if j==0 else 8
wr.cell(4,1,'응답자').font=F(True); wr.cell(4,2,'Part A').font=F(True); wr.cell(4,12,'Part B').font=F(True); wr.cell(4,resp_start,'Part C·D·E (1~5, 9)').font=F(True)
ex={'A01':'제조업','A02':'300~999','A03':'3~5년','A04':'보유','A05':'BC 관리자','A06':'8','A07':'1','A08':'2','A09':'부분','A10':'일부'}
for j,h in enumerate(heads):
    c=wr.cell(6,1+j); v='EX-예시' if h=='응답자ID' else ex.get(h, 1 if h.startswith('B') and h[1:].isdigit() else [4,3,4,3,5,4,3,9,4][j%9])
    c.value=v; c.font=F(i=True,c='7F7F7F'); c.alignment=CT; c.fill=GREY; c.border=BD
for r in range(FIRST,LAST+1):
    for j in range(len(heads)):
        c=wr.cell(r,1+j); c.fill=INF; c.font=F(c=BLUE); c.alignment=CT; c.border=BD
dvL=DataValidation(type='list',formula1='"1,2,3,4,5,9"',allow_blank=True,showErrorMessage=True,error='1~5 또는 9'); dvB=DataValidation(type='list',formula1='"1,2,3,4"',allow_blank=True,showErrorMessage=True,error='1~4')
wr.add_data_validation(dvL); wr.add_data_validation(dvB)
dvB.add(f'L{FIRST}:{CL(33)}{LAST}'); dvL.add(f'{CL(resp_start)}{FIRST}:{CL(resp_start+NI-1)}{LAST}'); wr.freeze_panes='B7'
def rng(i): return f'응답입력!${col_of[i]}${FIRST}:${col_of[i]}${LAST}'

# 연결점수
wc=wb.create_sheet('연결점수'); title(wc,'응답자별 연결 점수 (R·V·U 3문항 평균, 9 제외, 최소 2문항 응답 시 산출)')
hdr(wc,5,['응답자ID']+[l['id'] for l in LK]+['종합 연결 지수'],[12]+[7]*31+[14]); lastc=CL(1+len(LK))
for i,r in enumerate(range(FIRST,LAST+1)):
    rr=6+i; put(wc,rr,1,f'=IF(응답입력!A{r}="","",응답입력!A{r})',al=CT)
    for j,l in enumerate(LK):
        rg=f"응답입력!{col_of[l['id']+'-R']}{r}:{col_of[l['id']+'-U']}{r}"
        put(wc,rr,2+j,f'=IF(COUNTIF({rg},"<9")>=2,AVERAGEIF({rg},"<9"),"")',al=CT,fmt='0.00')
    put(wc,rr,2+len(LK),f'=IFERROR(AVERAGE(B{rr}:{lastc}{rr}),"")',F(True),CT,fmt='0.00')
AGG=CL(2+len(LK)); wc.freeze_panes='B6'

# 점수요약
ws2=wb.create_sheet('점수요약'); title(ws2,'점수 요약 — 연결·영역·증거유형·상태별 평균 (응답입력 7~56행, 9 제외)')
hdr(ws2,4,['ID','연결(S→T)','영역','증거유형','반영(R)','확인(V)','갱신(U)','연결 점수','응답 수','R−U 격차','해석'],[7,34,22,9,10,10,10,11,9,10,28])
for i,l in enumerate(LK):
    r=5+i
    put(ws2,r,1,l['id']); put(ws2,r,2,f"{l['source']} → {l['target']}"); put(ws2,r,3,l['domain']); put(ws2,r,4,l['evidence'],al=CT)
    for j,s in enumerate('RVU'): put(ws2,r,5+j,f'=IFERROR(AVERAGEIF({rng(l["id"]+"-"+s)},"<9"),"")',al=CT,fmt='0.00')
    put(ws2,r,8,f'=IFERROR(AVERAGE(E{r}:G{r}),"")',F(True),CT,fmt='0.00')
    put(ws2,r,9,'='+'+'.join(f'COUNTIF({rng(l["id"]+"-"+s)},"<9")' for s in 'RVU'),al=CT)
    put(ws2,r,10,f'=IF(AND(ISNUMBER(E{r}),ISNUMBER(G{r})),E{r}-G{r},"")',al=CT,fmt='0.00')
    put(ws2,r,11,f'=IF(J{r}="","",IF(J{r}>=1,"방치 의심(반영≫갱신)",IF(J{r}<=-0.5,"점검 필요(갱신>반영)","균형")))')
n=len(LK); e=4+n; r0=e+2
put(ws2,r0,1,'영역별 평균',F(True))
for i,d in enumerate(DOMAIN_ORDER):
    put(ws2,r0+1+i,2,d); put(ws2,r0+1+i,3,f'=IFERROR(AVERAGEIF($C$5:$C${e},B{r0+1+i},$H$5:$H${e}),"")',F(True),CT,fmt='0.00')
r1=r0+7; put(ws2,r1,1,'증거유형별 평균',F(True))
for i,t in enumerate(['E1','E2','E3']):
    put(ws2,r1+1+i,2,t); put(ws2,r1+1+i,3,f'=IFERROR(AVERAGEIF($D$5:$D${e},B{r1+1+i},$H$5:$H${e}),"")',F(True),CT,fmt='0.00')
r2=r1+5; put(ws2,r2,1,'상태별 평균',F(True)); SUMR=[]
for i,(nm_,cl) in enumerate([('반영(R)','E'),('확인(V)','F'),('갱신(U)','G')]):
    put(ws2,r2+1+i,2,nm_); put(ws2,r2+1+i,3,f'=IFERROR(AVERAGE({cl}5:{cl}{e}),"")',F(True),CT,fmt='0.00'); SUMR.append(r2+1+i)
put(ws2,r2+5,2,'종합 연계성 지수(31연결 평균)',F(True)); put(ws2,r2+5,3,f'=IFERROR(AVERAGE(H5:H{e}),"")',F(True),CT,fmt='0.00'); ws2.freeze_panes='A5'

# 검증
wv=wb.create_sheet('검증'); title(wv,'검증 — 기준값 · 구조 점검 · 자료 기반 점검 · 검증 계획','기준값(파란 글씨)은 관례이며 연구자가 조정. Arias 합의 기준은 A43·A44 인용에 근거')
hdr(wv,3,['기준','값','설명'],[40,16,80])
for i,(a,b,c) in enumerate([('내용타당도 I-CVI 기준',0.78,'전문가 6~10인 패널의 관례(정의서 D16: 연구자 선택, 논문 근거 없음)'),('Arias 합의 채택 기준',0.8,'정의서 D15 / 인용 A43·A44'),('Arias 합의 기각 기준',0.2,'정의서 D15 / 인용 A44'),('Cronbach α / ω 기준',0.7,'연결별 3문항 신뢰도(통계 프로그램에서 산출)'),('문항-총점 상관 기준',0.3,'통계 프로그램'),('상태 간 상관 상한',0.85,'R·V·U가 하나로 붕괴하지 않는지(통계 프로그램)')]):
    put(wv,4+i,1,a); put(wv,4+i,2,b,F(c=BLUE),CT,INF); put(wv,4+i,3,c)
r=11; hdr(wv,r,['구조 점검','현재 값','기대 값','결과'])
chk=[('총 문항 수','=COUNTA(문항!A5:A112)',108),('연결 문항 수(Part C)','=COUNTIF(문항!B5:B112,"C 연결")',93),('추적성 OK 문항 수','=COUNTIF(문항!K5:K112,"*")',108)]
chk=[('총 문항 수','=COUNTA(문항!A5:A112)',108),('연결 문항 수(Part C)','=COUNTIF(문항!B5:B112,"C 연결")',93),
('반영(R) 문항 수','=COUNTIF(문항!F5:F112,"반영")',31),('확인(V) 문항 수','=COUNTIF(문항!F5:F112,"확인")',31),('갱신(U) 문항 수','=COUNTIF(문항!F5:F112,"갱신")',31),
('연결당 문항 3개 충족 연결 수','=COUNTIF(연결!R5:R35,"OK")',31),('증거유형 E1 연결 수','=COUNTIF(연결!G5:G35,"E1")',26),('증거유형 E2 연결 수','=COUNTIF(연결!G5:G35,"E2")',2),('증거유형 E3 연결 수','=COUNTIF(연결!G5:G35,"E3")',3),
('집단 노드 연결 수','=COUNTIF(연결!H5:H35,"집단")',2),('객체(프로세스) 수','=COUNTA(객체!A5:A26)',22),('인용문 수','=COUNTA(인용근거!A5:A68)',64),('원문 대조 일치 인용 수','=COUNTIF(인용근거!H5:H68,"일치*")',64)]
for i,(a,f_,ex_) in enumerate(chk):
    rr=r+1+i; put(wv,rr,1,a); put(wv,rr,2,f_,al=CT); put(wv,rr,3,ex_,F(c=BLUE),CT); put(wv,rr,4,f'=IF(B{rr}=C{rr},"OK","확인")',F(True),CT)
rr=r+len(chk)+2; put(wv,rr,1,'전문가 판정(문항 시트)',F(True),fill=GREY)
put(wv,rr+1,1,'채택 문항 수'); put(wv,rr+1,2,'=COUNTIF(문항!S5:S112,"채택")',al=CT)
put(wv,rr+2,1,'수정·토론 문항 수'); put(wv,rr+2,2,'=COUNTIF(문항!S5:S112,"수정·토론")',al=CT)
put(wv,rr+3,1,'평가 미입력 문항 수'); put(wv,rr+3,2,f'={NI}-B{rr+1}-B{rr+2}',al=CT)
rr+=5; hdr(wv,rr,['자료 기반 점검(응답 입력 후)','값','기대','결과'])
pairs=[('역문항 일관성: G01 vs RV1','G01','RV1'),('역문항 일관성: L01-R vs RV2','L01-R','RV2'),('역문항 일관성: L22-R vs RV3','L22-R','RV3'),('역문항 일관성: L16-U vs RV4','L16-U','RV4')]
for i,(a,x,y) in enumerate(pairs):
    q=rr+1+i; put(wv,q,1,a); put(wv,q,2,f'=IFERROR(CORREL({rng(x)},{rng(y)}),"자료 부족")',al=CT,fmt='0.00'); put(wv,q,3,'음(−)의 상관'); put(wv,q,4,f'=IF(ISNUMBER(B{q}),IF(B{q}<0,"OK","확인"),"")',F(True),CT)
q=rr+1+len(pairs); put(wv,q,1,'준거타당도: 종합 연결 지수 vs CR1'); put(wv,q,2,f'=IFERROR(CORREL(연결점수!${AGG}$6:${AGG}$55,{rng("CR1")}),"자료 부족")',al=CT,fmt='0.00'); put(wv,q,3,'양(+)의 상관'); put(wv,q,4,f'=IF(ISNUMBER(B{q}),IF(B{q}>0,"OK","확인"),"")',F(True),CT)
q+=1; put(wv,q,1,'단계 가설: 반영 ≥ 확인 ≥ 갱신(연구자 가설)')
put(wv,q,2,f'=IF(COUNT(점수요약!C{SUMR[0]}:C{SUMR[2]})=3,IF(AND(점수요약!C{SUMR[0]}>=점수요약!C{SUMR[1]},점수요약!C{SUMR[1]}>=점수요약!C{SUMR[2]}),"지지","불일치"),"자료 부족")',al=CT); put(wv,q,3,'지지'); put(wv,q,4,f'=IF(B{q}="자료 부족","",IF(B{q}=C{q},"OK","확인"))',F(True),CT)
q+=2; put(wv,q,1,'참고: CORREL은 9(해당 없음)도 포함한다. 실제 분석은 9를 결측 처리한 자료로 통계 프로그램에서 다시 산출한다. 역문항(RV1~4, CR4)은 분석 시 6−값으로 뒤집어 사용한다.',F(i=True,c='475467'))
wv.merge_cells(start_row=q,start_column=1,end_row=q,end_column=4); wv.row_dimensions[q].height=36
q+=2; hdr(wv,q,['검증 단계','방법','기준 / 산출 위치'])
plan=[('1 인용 검증','PDF 원문과 자동 대조(scripts/verify_quotes.py)','인용 64/64 일치, 객체 22/22 일치(본 파일 인용근거 시트)'),
('2 구조 점검','추적성(문항=연결 1×상태 1), 두 객체 규칙, 이중 질문 금지','위 구조 점검 + 수기 점검'),
('3 전문가 내용타당도','6~10인 적합도 평가, 연결 타당도(E2·E3 우선), 맹검 재분류','I-CVI ≥ 0.78 / 일치율 ≥ 80% 채택 · 20~80% 토론 · < 20% 삭제(Arias A44 준용)'),
('4 인지면담','5~8인 설명시키기(출발·도착 프로세스, 반영/확인/갱신 구분)','수기'),
('5 신뢰도·구조','연결별 α/ω, 문항-총점 상관, R·V·U 구분 CFA','통계 프로그램(150명 이상 권장)'),
('6 단계 가설·일관성','반영 ≥ 확인 ≥ 갱신, 역문항 음의 상관, AC1 오답 제외','본 시트'),
('7 준거·집단','연계 지수 vs CR1~4, 증거유형별(E1/E2/E3) 점수 비교, ISO 22301 인증(A04) 집단 비교','점수요약 / 통계 프로그램'),
('8 활용 검증','점수로 연결별 CQ 진단에 답이 나오는지(Białas B08 방식)','점수요약')]
for i,(a,b,c) in enumerate(plan):
    put(wv,q+1+i,1,a); put(wv,q+1+i,2,b); put(wv,q+1+i,3,c); wv.row_dimensions[q+1+i].height=34
wv.column_dimensions['B'].width=50

# 지도
wi=wb.create_sheet('온톨로지맵',9); title(wi,'온톨로지 맵 V2 — 22개 프로세스와 31개 연결','그림 파일: outputs/BCMS_온톨로지맵_V2.png · 선 모양 = 증거유형(실선 E1 / 파선 E2 / 점선 E3)')
img=Image(out('BCMS_온톨로지맵_V2.png')); img.width=1500; img.height=int(1500*2100/2800); wi.add_image(img,'A4')
wb.move_sheet('정의서',offset=0)
order=['안내','정의서','인용근거','연결','관계유형','보류연결','객체','트리플','관계매트릭스','온톨로지맵','문항','보유·응답자정보','응답입력','연결점수','점수요약','검증']
wb._sheets=[wb[n] for n in order]
for s in wb.worksheets: s.sheet_view.showGridLines=s.title not in('안내','온톨로지맵')
wb.save(out('BCMS_연계성_V2.xlsx')); print('xlsx saved')

# ---- survey json/csv
sv=[]
objs_by={o['id']:f'B{i+1:02d}' for i,o in enumerate(OB)}
for it in IT:
    lk=LKD.get(it['link'])
    sv.append(dict(id=it['id'],part=it['part'],link_id=it['link'] or None,state=it['state'],text=it['text'],reverse_scored=it['reverse'],
        scale='likert5_na9',evidence_type=lk['evidence'] if lk else None,domain=lk['domain'] if lk else None,
        requires_process_ids=[objs_by[x] for x in (lk['source'],lk['target']) if x in objs_by] if lk else [],
        basis_type=it['basis_type'],basis_quotes=it['basis_quotes']))
meta=dict(version='V2',scale=dict(type='likert5_na9',labels={'1':'전혀 그렇지 않다','2':'그렇지 않다','3':'보통이다','4':'그렇다','5':'매우 그렇다','9':'해당 없음/모르겠음(결측)'}),
          process_presence=dict(scale={'1':'운영한다','2':'부분적으로 운영한다','3':'운영하지 않는다','4':'모르겠다'},items=[dict(id=f'B{i+1:02d}',process_id=o['id'],name=o['name']) for i,o in enumerate(OB)]),
          respondent_profile=RESP['partA'],items=sv)
os.makedirs(os.path.join(ROOT,'survey'),exist_ok=True)
json.dump(meta,open(os.path.join(ROOT,'survey','survey_items_v2.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
with open(os.path.join(ROOT,'survey','survey_items_v2.csv'),'w',encoding='utf-8-sig',newline='') as f:
    w_=csv.writer(f); w_.writerow(['id','part','link_id','state','text','reverse_scored','scale','evidence_type','domain','requires_process_ids','basis_type','basis_quotes'])
    for s in sv: w_.writerow([s['id'],s['part'],s['link_id'] or '',s['state'],s['text'],int(s['reverse_scored']),s['scale'],s['evidence_type'] or '',s['domain'] or '',';'.join(s['requires_process_ids']),s['basis_type'],';'.join(s['basis_quotes'])])
print('survey saved')

# ---- md
L=[]; A=L.append
A('# BCMS 프로세스 간 연계성 — 근거·정의서 (V2)\n')
A('> 박사논문 프로젝트 · 근거 문헌: Arias-Aranda et al.(2026) *Appl. Sci.* 16, 3219 / Białas(2010) *Ontological approach to the business continuity management system development*\n')
A(f'> 모든 영문 인용문은 PDF 원문과 자동 대조했다({ver["quotes_ok"]}/{ver["quotes_total"]} 일치, 검증일 {VDATE}). 한국어 번역은 연구자 번역(참고용)이다.\n')
A('## 0. 읽는 법\n\n- **▶ 인용**: 논문 원문을 그대로 옮긴 부분(쪽 번호 포함).\n- **▶ 연구자 의견**: 인용에 없는 해석·가정·분류·정의. 박사논문에서 연구자가 직접 확정해야 한다.\n- **증거유형** E1=원문이 S→T 연결을 직접 서술 / E2=출발·도착 일부를 연구자가 특정·보완 / E3=원문에 서술 없음(연구자 가정 또는 유추).\n')
n1=sum(1 for l in LK if l['evidence']=='E1'); A(f'- 집계: E1 {n1}개 · E2 {sum(1 for l in LK if l["evidence"]=="E2")}개 · E3 {sum(1 for l in LK if l["evidence"]=="E3")}개 (총 {len(LK)}개 연결).\n')
A('## 1. 정의서\n')
A('| ID | 용어 | 유형 | 정의 | 근거 인용 | 근거·한계 |\n|---|---|---|---|---|---|')
for d in DF: A(f"| {d['id']} | {d['term']} | {d['type']} | {d['definition']} | {', '.join(d['quotes']) or '—'} | {d['note'] or '—'} |")
A('\n## 2. 방법 근거 (Białas 인용)\n')
for k in ['B02','B03','B04','B05','B06','B07','B08','B14','B15']:
    q=Q[k]; A(f"- **{k}** (Białas p.{q['pages']}, {q['section']}) ▶ 인용: \"{q['text']}\"\n  - 번역: {q['ko']}\n  - 사용: {q['use']}")
A('\n## 3. 관계유형 7개 (연구자 정의)\n\n| 관계유형 | 정의(S→T) | 판정 질문 | 해당 연결 |\n|---|---|---|---|')
for r_ in RT: A(f"| {r_['name']} | {r_['definition']} | {r_['test']} | {r_['links']} |")
A('\n## 4. 연결 31개 — 인용과 연구자 의견\n')
for l in LK:
    A(f"### {l['id']} · {nm(l['source'])} → {nm(l['target'])}\n")
    A(f"- 영역: {l['domain']} · 관계유형: `{l['relation']}` · **증거유형 {l['evidence']}**{' · 집단 노드 포함' if l['group'] else ''}")
    if l['quotes_primary']:
        for k in l['quotes_primary']:
            q=Q[k]; A(f"- ▶ 인용 [{k}] (Arias p.{q['pages']}, {q['section']}): \"{q['text']}\"\n  - 번역: {q['ko']}")
    else: A('- ▶ 인용: 원문에 S→T 연결 서술 없음')
    for k in l['quotes_support']:
        q=Q[k]; A(f"- ▷ 보조 인용 [{k}] ({q['source']} p.{q['pages']}, {q['section']}): \"{q['text']}\"\n  - 번역: {q['ko']}")
    A(f"- 인용이 확립하는 사실: {l['established']}\n- ▶ 연구자 의견(해석·보완·가정): {l['researcher']}\n- ▶ 연구자 의견(측정 지표화): {l['indicator']}\n- Białas 대응: {l['bialas']}\n- 검증 필요: {l['validation']}\n")
    its=[i for i in IT if i['link']==l['id']]
    for i in its: A(f"  - {i['id']} ({i['state']}): {i['text']}")
    A('')
A('## 5. 보류·제외한 후보 연결\n\n| ID | 출발→도착 | 후보 | 채택하지 않은 이유 | 권고 |\n|---|---|---|---|---|')
for h in HL: A(f"| {h['id']} | {h['source']}→{h['target']} | {h['idea']} | {h['reason']} | {h['decision']} |")
A('\n## 6. 종합·검증 문항\n')
for i in IT:
    if i['part'][0] in 'DE': A(f"- {i['id']} ({i['state']}{', 역문항' if i['reverse'] else ''}): {i['text']}" + (f"  \n  근거: {i['basis_type']}" + (f" · 인용 {', '.join(i['basis_quotes'])}" if i['basis_quotes'] else '')))
A('\n## 7. 한계\n\n1. 연결 31개는 전문가 검증 전 가설이다. Arias는 프로세스가 핵심인지를 검증했을 뿐 연결을 검증하지 않았다(인용 A06: 프로세스 흐름도는 생략됨).\n2. E2·E3 연결(5개)과 포함 관계(L13·L14)·집단 노드(L27·L30)는 전문가 검증에서 우선 심사한다.\n3. R·V·U 구분, 관계유형 이름, 영역 분류, CORE 노드는 두 논문에 없는 연구자 설계다.\n4. Białas(2010)는 BS 25999 기반 프로토타입이며(B14, B15) 본 연구는 방법만 차용했다.\n5. 통계 기준(I-CVI 0.78, α 0.70 등)은 관례이며 논문 근거가 없다.\n')
open(out('BCMS_연계성_V2_근거정의서.md'),'w',encoding='utf-8').write('\n'.join(L)); print('md saved')
