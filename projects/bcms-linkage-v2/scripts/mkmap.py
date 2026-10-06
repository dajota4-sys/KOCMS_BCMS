"""온톨로지 맵 V2 PNG 생성 (data/links.json, data/objects.json 기반).
선 모양 = 증거유형(E1 실선 / E2 파선 / E3 점선+빨강), 선 색 = 연결 영역, 원 안 번호 = 연결 ID.
한글 폰트: 환경변수 KFONT 또는 WenQuanYi Zen Hei 기본 경로."""
import math,os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from PIL import Image,ImageDraw,ImageFont
from common import load,out,DOMAIN_ORDER,CORE_NAME
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc')
f=lambda s:ImageFont.truetype(FP,s)
objs={o['id']:o for o in load('objects.json')}; links=load('links.json')
W,H=2800,2100
img=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(img)
LX=[300,850,1400,1950,2500]
LANE_BG=['#f4f7fb','#fbf6ee','#f2f8f3','#faf3f6','#f5f3fa']
for i,x in enumerate(LX):
    d.rectangle([x-250,150,x+250,1880],fill=LANE_BG[i],outline='#d0d5dd')
    d.text((x,185),DOMAIN_ORDER[i],font=f(34),fill='#344054',anchor='mm')
d.text((60,45),'BCMS 프로세스 연계성 온톨로지 맵 (V2)',font=f(52),fill='#101828')
d.text((60,108),'객체 = Arias(2026) Table 5의 22개 프로세스 · 연결 = L01~L31 · 선 모양 = 증거유형(E1 직접 / E2 부분 / E3 가정)',font=f(26),fill='#475467')
POS={'REQ':(0,400),'BIA':(0,740),'RA':(0,1100),
'STR':(1,400),'IMP':(1,600),'PLAN':(1,850),'RES':(1,1250),
'WARN':(2,420),'INC':(2,600),'REC':(2,810),'EXE':(2,1030),'AWR':(2,1170),
'SUP':(3,400),'AUD':(3,570),'PERF':(3,770),'CI':(3,960),'CHG':(3,1180),'DOC':(3,1420),
'POL':(4,400),'GOV':(4,600),'COM':(4,860),'CRM':(4,1250)}
NW,NH=270,84
CORE_Y=1740
def ctr(k):
    if k=='CORE': return (1400,CORE_Y)
    l,y=POS[k]; return (LX[l],y)
def box(k):
    x,y=ctr(k)
    if k=='CORE': return (x-1000,y-45,x+1000,y+45)
    return (x-NW//2,y-NH//2,x+NW//2,y+NH//2)
COL={'관리':('#1d4e89','white'),'핵심':('#d6e6f7','#0b2b4c'),'지원':('#e4e7ec','#344054')}
EC={'① 요구·분석':'#c2410c','② 전략·계획·이행':'#15803d','③ 대응·복구·훈련':'#7c3aed','④ 평가·개선·변경':'#be185d','⑤ 거버넌스·이해관계자':'#0369a1'}
def edge_pt(k,tx,ty,pad=6):
    x0,y0,x1,y1=box(k); cx,cy=(x0+x1)/2,(y0+y1)/2; dx,dy=tx-cx,ty-cy
    if dx==0 and dy==0: return cx,cy
    hw,hh=(x1-x0)/2+pad,(y1-y0)/2+pad
    s=min(hw/abs(dx) if dx else 1e9,hh/abs(dy) if dy else 1e9)
    return cx+dx*s,cy+dy*s
# 수동 휨(dx,dy): 중간점을 이동. 쌍방향 연결은 자동으로 수직 방향으로 벌림
BEND={'L23':(-55,55),'L25':(0,0),'L02':(-150,0),'L04':(0,-230),'L05':(0,-130),'L08':(-210,0),'L10':(230,0),'L19':(-200,0),'L20':(230,0),'L21':(0,330)}
LABT={'L04':0.3,'L05':0.7,'L09':0.3,'L11':0.72,'L15':0.35,'L16':0.75,'L17':0.68,'L24':0.5,'L26':0.5}
pairs={(l['source'],l['target']):l['id'] for l in links}
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
labels=[]
for l in links:
    a,b=l['source'],l['target']; ca,cb=ctr(a),ctr(b)
    if a=='CORE': ca=(2050,CORE_Y)
    if b=='CORE': cb=(ctr(a)[0],CORE_Y)
    mid=((ca[0]+cb[0])/2,(ca[1]+cb[1])/2); bx,by=BEND.get(l['id'],(0,0))
    if (b,a) in pairs and l['id'] not in BEND:
        low=l['id']<pairs[(b,a)]
        vx,vy=(cb[0]-ca[0],cb[1]-ca[1]) if low else (ca[0]-cb[0],ca[1]-cb[1])
        n=math.hypot(vx,vy) or 1; sgn=1 if low else -1
        bx,by=-vy/n*55*sgn,vx/n*55*sgn
    ctrl=(mid[0]+2*bx,mid[1]+2*by) if (bx or by) else None
    p0=edge_pt(a,*(ctrl or cb)) if a!='CORE' else (2060,CORE_Y-45)
    p2=edge_pt(b,*(ctrl or ca)) if b!='CORE' else (ctr(a)[0],CORE_Y-45)
    pts=bez(p0,ctrl,p2) if ctrl else [(p0[0]+(p2[0]-p0[0])*i/80,p0[1]+(p2[1]-p0[1])*i/80) for i in range(81)]
    ev=l['evidence']; col='#b42318' if ev=='E3' else EC[l['domain']]
    dash=None if ev=='E1' else (22,12) if ev=='E2' else (4,10)
    styled(pts,col,5 if ev!='E3' else 5,dash)
    a1,a2=pts[-2],pts[-1]; ang=math.atan2(a2[1]-a1[1],a2[0]-a1[0]); L=28
    d.polygon([a2,(a2[0]-L*math.cos(ang-0.4),a2[1]-L*math.sin(ang-0.4)),(a2[0]-L*math.cos(ang+0.4),a2[1]-L*math.sin(ang+0.4))],fill=col)
    labels.append((at(pts,LABT.get(l['id'],0.5)),l['id'],col,ev,l['relation']))
x0,y0,x1,y1=box('CORE')
d.rounded_rectangle([x0,y0,x1,y1],radius=14,fill='#fffbe6',outline='#b54708',width=3,)
d.text(((x0+x1)/2,(y0+y1)/2),'CORE · 핵심 BCMS 프로세스 전반 (집단 노드 — 연구자가 만든 가상 노드)',font=f(30),fill='#7a2e0e',anchor='mm')
for k in POS:
    x0,y0,x1,y1=box(k); fc,tc=COL[objs[k]['category']]
    d.rounded_rectangle([x0,y0,x1,y1],radius=16,fill=fc,outline='#475467',width=3)
    d.text(((x0+x1)/2,y0+26),k,font=f(26),fill=tc,anchor='mm')
    nm=objs[k]['name']; d.text(((x0+x1)/2,y0+60),nm,font=f(24 if len(nm)<12 else 20),fill=tc,anchor='mm')
for (m,i,col,ev,rel) in labels:
    r=24; d.ellipse([m[0]-r-4,m[1]-r+2,m[0]+r+4,m[1]+r-2],fill='white',outline=col,width=3)
    d.text(m,i,font=f(21),fill=col,anchor='mm')
# 범례
ly=1950; d.text((60,ly),'범례',font=f(28),fill='#101828'); x=160
for lab,(fc,tc) in [('관리 프로세스',COL['관리']),('핵심 프로세스',COL['핵심']),('지원 프로세스',COL['지원'])]:
    d.rounded_rectangle([x,ly-14,x+60,ly+16],radius=6,fill=fc,outline='#475467'); d.text((x+72,ly),lab,font=f(24),fill='#344054',anchor='lm'); x+=270
for lab,dash,col in [('E1 실선: 원문이 연결을 직접 서술',None,'#344054'),('E2 파선: 출발·도착 일부를 연구자가 보완',(22,12),'#344054'),('E3 점선(빨강): 원문에 서술 없음, 연구자 가정',(4,10),'#b42318')]:
    styled([(x,ly),(x+90,ly)],col,5,dash); d.text((x+100,ly),lab,font=f(22),fill='#344054',anchor='lm'); x+=560
x=160; ly2=2005
for dn in DOMAIN_ORDER:
    d.line([x,ly2,x+50,ly2],fill=EC[dn],width=6); d.text((x+60,ly2),dn,font=f(22),fill='#344054',anchor='lm'); x+=420
d.text((60,2055),'화살표 = S→T(출발→도착). 원 안 번호 = 연결 ID(연결 시트에서 인용 원문과 연구자 의견 확인). 연결·영역·관계유형·집단 노드는 연구자의 분류이며 인용 근거와 구분하여 연결 시트에 표기함. 쌍방향 선(L15/L16, L23/L25, L24/L26)은 서로 다른 연결.',font=f(20),fill='#667085')
img.save(out('BCMS_온톨로지맵_V2.png')); print('saved')
