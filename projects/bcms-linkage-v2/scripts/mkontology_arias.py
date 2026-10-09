"""BCMS 연계성 온톨로지 맵 — 기초 초안(V5). 22개 객체는 Arias 기정(유지), 선·표식은 연구·학습 범위.
입력: data/v5/v4_baseline.json (관계근거31·객체22). 출력: outputs/BCMS_온톨로지맵_Arias연결_V5.png"""
import json,math,os
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B=json.load(open(os.path.join(ROOT,'data/v5/v4_baseline.json'),encoding='utf-8'))
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'); f=lambda s:ImageFont.truetype(FP,s)
objs={o['ID']:o for o in B['객체22']}; links=[l for l in B['관계근거31'] if l['출발'] in objs and l['도착'] in objs and l['분류'] in ('운영 후보','위계 표시')]
W,H=2800,1740
img=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(img)
LX=[300,850,1400,1950,2500]; LANE_BG=['#f4f7fb','#fbf6ee','#f2f8f3','#faf3f6','#f5f3fa']
LANE_T=['① 요구·분석','② 전략·계획·이행','③ 대응·복구·훈련','④ 평가·개선·변경','⑤ 거버넌스·이해관계자']
LANE_Y1=1560
for i,x in enumerate(LX):
    d.rectangle([x-250,190,x+250,LANE_Y1],fill=LANE_BG[i],outline='#d0d5dd'); d.text((x,225),LANE_T[i],font=f(34),fill='#344054',anchor='mm')
d.text((60,40),'Arias가 서술한 BCMS 프로세스 간 연결',font=f(54),fill='#101828')
d.text((60,112),'22개 프로세스 유형(Arias-Aranda 외 2026, Table 5)과 §4.3의 연결 서술 · 화살표 = 출발 프로세스의 산출물이 도착 프로세스에 입력·기준으로 이어짐',font=f(26),fill='#475467')
d.text((60,152),'영역 구분은 연구자 정리 · 원문에 직접 서술되거나 연구자가 정규화한 연결 26개 (근거 보류 3개·집단 진술 2개 제외)',font=f(23),fill='#667085')
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
    return (GRN if l['분류']=='위계 표시' else BLUE),None,''
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
for (m,i,col,fc) in []: pass
ly=LANE_Y1+50; x=60
for lab,col in [('연결: 출발 프로세스의 산출물이 도착 프로세스의 입력·기준이 됨',BLUE),('포함: 사고·비상 대응이 경보·복구를 하위 프로세스로 포함',GRN)]:
    d.line([(x,ly),(x+90,ly)],fill=col,width=6); d.polygon([(x+90,ly),(x+68,ly-12),(x+68,ly+12)],fill=col); d.text((x+110,ly),lab,font=f(26),fill='#344054',anchor='lm'); x+=1250
d.text((60,ly+55),'출처: 객체 — Arias-Aranda 외(2026) Appl. Sci. 16, 3219, Table 5 (PDF p.14). 연결 — §4.3 pp.14–16 (연구자 정규화, 시트 관계근거31). 개념 스키마 단계로 OWL 구현·추론은 하지 않음.',font=f(22),fill='#667085')
img.save(os.path.join(ROOT,'outputs/BCMS_온톨로지맵_Arias연결_V5.png')); print(img.size)
