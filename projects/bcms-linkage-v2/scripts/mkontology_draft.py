"""BCMS 연계성 온톨로지 맵 — 기초 초안(V5). 22개 객체는 Arias 기정(유지), 선·표식은 연구·학습 범위.
입력: data/v5/v4_baseline.json (관계근거31·객체22). 출력: outputs/BCMS_온톨로지맵_기초초안_V5.png"""
import json,math,os
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B=json.load(open(os.path.join(ROOT,'data/v5/v4_baseline.json'),encoding='utf-8'))
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'); f=lambda s:ImageFont.truetype(FP,s)
objs={o['ID']:o for o in B['객체22']}; links=[l for l in B['관계근거31'] if l['출발'] in objs and l['도착'] in objs]
W,H=3600,2140
img=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(img)
LX=[300,850,1400,1950,2500]; LANE_BG=['#f4f7fb','#fbf6ee','#f2f8f3','#faf3f6','#f5f3fa']
LANE_T=['① 요구·분석','② 전략·계획·이행','③ 대응·복구·훈련','④ 평가·개선·변경','⑤ 거버넌스·이해관계자']
LANE_Y1=1620
for i,x in enumerate(LX):
    d.rectangle([x-250,190,x+250,LANE_Y1],fill=LANE_BG[i],outline='#d0d5dd'); d.text((x,225),LANE_T[i],font=f(34),fill='#344054',anchor='mm')
d.text((60,40),'BCMS 연계성 온톨로지 맵 — 기초 초안 (V5)',font=f(54),fill='#101828')
d.text((60,112),'22개 객체 = Arias-Aranda 외(2026) Table 5 · 연구에서 유지(기정) / 선과 표식 = 본 연구가 검증·학습할 범위(후보·초안, 확정 아님)',font=f(27),fill='#475467')
d.text((60,152),'영역(①–⑤) 구분과 관계 분류는 연구자의 정리이며 Arias 원문의 분류가 아님. 관계 ID는 시트 관계근거31에서 인용 원문과 연구자 정규화를 확인.',font=f(23),fill='#667085')
POS={'REQ':(0,400),'BIA':(0,740),'RA':(0,1100),'STR':(1,400),'IMP':(1,600),'PLAN':(1,850),'RES':(1,1250),
'WARN':(2,420),'INC':(2,600),'REC':(2,810),'EXE':(2,1030),'AWR':(2,1170),'SUP':(3,400),'AUD':(3,570),'PERF':(3,770),'CI':(3,960),'CHG':(3,1180),'DOC':(3,1420),
'POL':(4,400),'GOV':(4,600),'COM':(4,860),'CRM':(4,1250)}
NW,NH=270,84
ctr=lambda k:(LX[POS[k][0]],POS[k][1])
def box(k): x,y=ctr(k); return (x-NW//2,y-NH//2,x+NW//2,y+NH//2)
NAME={'BIA':'BIA·중요도 분석','STR':'BC 전략·솔루션 결정·선정','PLAN':'BC 계획·절차 개발','EXE':'BC 계획·절차 훈련·연습','WARN':'경보·커뮤니케이션','COM':'협의·커뮤니케이션','DOC':'문서화된 정보 통제','AWR':'인식·역량·교육','INC':'사고·비상 대응','IMP':'솔루션 이행관리'}
def edge_pt(k,tx,ty,pad=6):
    x0,y0,x1,y1=box(k); cx,cy=(x0+x1)/2,(y0+y1)/2; dx,dy=tx-cx,ty-cy
    hw,hh=(x1-x0)/2+pad,(y1-y0)/2+pad; s=min(hw/abs(dx) if dx else 1e9,hh/abs(dy) if dy else 1e9); return cx+dx*s,cy+dy*s
BEND={'L23':(-55,55),'L25':(0,0),'L02':(-150,0),'L04':(0,-140),'L05':(0,-80),'L08':(-210,0),'L10':(230,0),'L19':(-200,0),'L20':(230,0),'L21':(0,330)}
LABT={'L04':0.3,'L05':0.7,'L09':0.3,'L11':0.72,'L15':0.35,'L16':0.75,'L17':0.68,'L24':0.5,'L26':0.5}
pairs={(l['출발'],l['도착']):l['관계ID'] for l in links}
def bez(p0,c,p2,n=80): return [((1-t)**2*p0[0]+2*(1-t)*t*c[0]+t*t*p2[0],(1-t)**2*p0[1]+2*(1-t)*t*c[1]+t*t*p2[1]) for t in [i/n for i in range(n+1)]]
def at(pts,t):
    Ls=[math.dist(a,b) for a,b in zip(pts,pts[1:])]; T=sum(Ls)*t; acc=0
    for (a,b),l in zip(zip(pts,pts[1:]),Ls):
        if acc+l>=T: u=(T-acc)/l if l else 0; return (a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u)
        acc+=l
    return pts[-1]
def styled(pts,col,w,dash):
    if dash is None: d.line(pts,fill=col,width=w,joint='curve'); return
    acc=0;on=True
    for a,b in zip(pts,pts[1:]):
        if on: d.line([a,b],fill=col,width=w)
        acc+=math.dist(a,b)
        if acc>(dash[0] if on else dash[1]): acc=0;on=not on
BLUE,ORG,GRN,GRY,RED,PUR='#2F6DB5','#E8892B','#3E9B63','#7C8794','#C0392B','#7C3AED'
FC_LINKS={'L16','L18','L19','L20','L23','L24','L25','L26'}
GAP={'POL','AWR','WARN','REC'}
def kind(l):
    if l['분류']=='위계 표시': return GRN,None,'H'
    if l['분류']=='근거 보류': return GRY,(5,11),'Q'
    return (ORG if l['V4 등급']=='E2' else BLUE),None,l['V4 등급']
# 객체 먼저(선 아래)
for k in POS:
    x0,y0,x1,y1=box(k)
    d.rounded_rectangle([x0,y0,x1,y1],radius=16,fill='#E8EDF4',outline='#475467',width=3)
    d.text(((x0+x1)/2,y0+26),k,font=f(26),fill='#14213D',anchor='mm'); nm=NAME.get(k,objs[k]['한국어']); d.text(((x0+x1)/2,y0+60),nm,font=f(24 if len(nm)<11 else 19),fill='#14213D',anchor='mm')
labels=[]
for l in links:
    a,b=l['출발'],l['도착']; ca,cb=ctr(a),ctr(b); mid=((ca[0]+cb[0])/2,(ca[1]+cb[1])/2); bx,by=BEND.get(l['관계ID'],(0,0))
    if (b,a) in pairs and l['관계ID'] not in BEND:
        low=l['관계ID']<pairs[(b,a)]; vx,vy=(cb[0]-ca[0],cb[1]-ca[1]) if low else (ca[0]-cb[0],ca[1]-cb[1]); n=math.hypot(vx,vy) or 1; sgn=1 if low else -1
        bx,by=-vy/n*55*sgn,vx/n*55*sgn
    ctrl=(mid[0]+2*bx,mid[1]+2*by) if (bx or by) else None
    p0=edge_pt(a,*(ctrl or cb)); p2=edge_pt(b,*(ctrl or ca))
    pts=bez(p0,ctrl,p2) if ctrl else [(p0[0]+(p2[0]-p0[0])*i/80,p0[1]+(p2[1]-p0[1])*i/80) for i in range(81)]
    col,dash,kd=kind(l); styled(pts,col,6,dash)
    a1,a2=pts[-2],pts[-1]; ang=math.atan2(a2[1]-a1[1],a2[0]-a1[0]); L=30
    d.polygon([a2,(a2[0]-L*math.cos(ang-0.4),a2[1]-L*math.sin(ang-0.4)),(a2[0]-L*math.cos(ang+0.4),a2[1]-L*math.sin(ang+0.4))],fill=col)
    labels.append((at(pts,LABT.get(l['관계ID'],0.5)),l['관계ID'],col,l['관계ID'] in FC_LINKS))
# 연결 공백 표시(객체 위 덧그림)
for k in GAP:
    x0,y0,x1,y1=box(k); 
    for i in range(0,int(x1-x0+16),22): d.line([(x0-8+i,y0-8),(min(x0-8+i+11,x1+8),y0-8)],fill=RED,width=4); d.line([(x0-8+i,y1+8),(min(x0-8+i+11,x1+8),y1+8)],fill=RED,width=4)
    for j in range(0,int(y1-y0+16),22): d.line([(x0-8,y0-8+j),(x0-8,min(y0-8+j+11,y1+8))],fill=RED,width=4); d.line([(x1+8,y0-8+j),(x1+8,min(y0-8+j+11,y1+8))],fill=RED,width=4)
    d.ellipse([x1-6,y0-30,x1+30,y0+6],fill=RED); d.text((x1+12,y0-12),'④',font=f(22),fill='white',anchor='mm')
for (m,i,col,fc) in labels:
    r=24; d.ellipse([m[0]-r-4,m[1]-r+2,m[0]+r+4,m[1]+r-2],fill='white',outline=col,width=3); d.text(m,i,font=f(21),fill=col,anchor='mm')
    if fc: d.rounded_rectangle([m[0]+r+6,m[1]-14,m[0]+r+52,m[1]+14],radius=6,fill=PUR); d.text((m[0]+r+29,m[1]),'FC',font=f(18),fill='white',anchor='mm')
# 하단: 온톨로지 층 띠
by0=LANE_Y1+40; d.text((60,by0),'온톨로지 층: Arias 기정 → 연구·학습 범위',font=f(32),fill='#101828')
cells=[('ProcessType 22','Arias Table 5 · 기정(유지)','#E8EDF4','#14213D',False),('ProcessLink 31','관계 기록: 운영 24 · 위계 2 · 집단 2 · 보류 3\n(인용→연구자 정규화→등급)',None,BLUE,True),('연결품질 개념 후보','CO · TR · EV · TM (품질 4)\nAC 관리조건 · FC 경로 후보',None,ORG,True),('LinkObservation','조직·기간·응답자·문항·응답\n(설문 문항 후보 → 전문가·인지면접)',None,GRN,True),('조직회복탄력성','측정모형 확정 후 구조적 관련성 검증\n(인과 아님 · ORAS 근거 미확정)',None,GRY,True)]
cx=60; cw=560; ch=190; cy=by0+60
for i,(t,s,fill,col,study) in enumerate(cells):
    d.rounded_rectangle([cx,cy,cx+cw,cy+ch],radius=18,fill=fill or 'white',outline=col,width=5 if study else 3)
    d.text((cx+cw/2,cy+42),t,font=f(32),fill=col if study else '#14213D',anchor='mm')
    for j,ln in enumerate(s.split('\n')): d.text((cx+cw/2,cy+100+j*38),ln,font=f(23),fill='#344054',anchor='mm')
    if i<len(cells)-1: d.polygon([(cx+cw+8,cy+ch/2-22),(cx+cw+8,cy+ch/2+22),(cx+cw+46,cy+ch/2)],fill='#667085')
    cx+=cw+55
d.text((60,cy+ch+22),'파란 테두리 = 본 연구가 검증·학습하는 층 · 회색 칸 = 선행연구(Arias)가 정리한 객체(연구에서 유지)',font=f(23),fill='#667085')
# 범례(맵 아래)
ly=cy+ch+80; x=60
d.text((x,ly),'범례',font=f(28),fill='#101828'); x+=110
for lab,col,dash in [('운영 후보·E1 직접 서술',BLUE,None),('운영 후보·E2 정규화 필요',ORG,None),('위계(포함) 표시',GRN,None),('근거 보류',GRY,(5,11))]:
    styled([(x,ly),(x+90,ly)],col,6,dash); d.text((x+102,ly),lab,font=f(23),fill='#344054',anchor='lm'); x+=500
d.rounded_rectangle([x,ly-14,x+46,ly+14],radius=6,fill=PUR); d.text((x+23,ly),'FC',font=f(18),fill='white',anchor='mm'); d.text((x+58,ly),'개선 경로 후보 연결',font=f(23),fill='#344054',anchor='lm')
d.text((60,ly+44),'화살표 = 출발→도착. 원 안 번호 = 관계 ID. 빨강 점선 테두리 = 운영 후보에 등장하지 않는 유형(연결 공백). L27·L30은 집단 진술이라 CORE 노드 없이 주석으로만 보존.',font=f(21),fill='#667085')
# 우측 패널
px=2810; pw=W-px-50
d.rounded_rectangle([px,190,px+pw,LANE_Y1],radius=18,fill='#FBFCFE',outline='#B8C4D6',width=3)
d.text((px+pw/2,235),'연구·학습 범위 (초안)',font=f(36),fill='#14213D',anchor='mm')
items=[('①','연결 관계 검증',BLUE,'운영 후보 24개(파랑·주황)의 전달 산출물·사용 목적·필수성을 전문가와 검토. 주황 E2 9개는 끝점·방향 정규화부터 확인(Gate 2).'),
('②','위계 확인',GRN,'INC가 WARN·REC를 포함(L13·L14). 포함 관계만 확인하고 전달 품질 문항에서는 제외.'),
('③','근거 보강',GRY,'L11·L17·L29(점선). 직접 근거를 찾기 전에는 문항화하지 않고 보류.'),
('④','연결 공백 정리',RED,'POL·AWR·WARN·REC는 운영 연결이 등록되지 않음. 근거 보강 또는 범위 제한으로 처리. 빈 곳 = 관계 부재의 증거 아님.'),
('⑤','연결품질 개념 학습',ORG,'각 운영 연결마다 CO 정합성·TR 근거 추적가능성·EV 증빙가능성·TM 변경전파 적시성을 후보로 검토(요인 수 미확정).'),
('⑥','관리조건·경로',PUR,'AC 책임명확성은 관리조건 후보. FC 개선조치 완결성은 여러 연결을 잇는 경로(보라 FC 표식 8개 연결)로 개념 보류.'),
('⑦','검증·관련성',GRY,'내용타당화 → 인지면접 → 예비조사·측정모형 → 조직회복탄력성과의 구조적 관련성(인과 아님).')]
y=290
def wrap(t,w,fs):
    out=[];cur=''
    for ch in t:
        if d.textlength(cur+ch,font=f(fs))>w: out.append(cur);cur=ch
        else: cur+=ch
    return out+[cur]
for n,t,col,desc in items:
    d.ellipse([px+22,y,px+72,y+50],fill=col); d.text((px+47,y+25),n,font=f(26),fill='white',anchor='mm'); d.text((px+90,y+25),t,font=f(30),fill='#14213D',anchor='lm')
    ls=wrap(desc,pw-60,22)
    for j,ln in enumerate(ls): d.text((px+30,y+66+j*30),ln,font=f(22),fill='#344054')
    y+=66+len(ls)*30+22
d.text((px+30,LANE_Y1-34),'* 모든 항목은 후보·예정이며 확정된 구조가 아님',font=f(21),fill='#667085')
d.text((60,H-36),'출처: 객체 — Arias-Aranda 외(2026) Appl. Sci. 16, 3219, Table 5 (PDF p.14). 관계 — §4.3 pp.14–16에서 연구자 추출·정규화(시트 관계근거31). 표현 방식 — Białas(2010) §2 pp.2–3 (방법만 차용). 개념 스키마 단계이며 OWL 구현·추론은 하지 않음.',font=f(21),fill='#667085')
img.save(os.path.join(ROOT,'outputs/BCMS_온톨로지맵_기초초안_V5.png')); print(img.size)
