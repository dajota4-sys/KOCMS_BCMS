"""22x22 관계 MAP PNG (V5): data/v5/v4_baseline.json의 관계근거31 + 객체22 -> outputs/BCMS_관계MAP_22x22_V5.png"""
import json,os
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D=json.load(open(os.path.join(ROOT,'data/v5/v4_baseline.json'),encoding='utf-8'))
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc')
F=lambda s:ImageFont.truetype(FP,s)
ids=[o['ID'] for o in D['객체22']]; n=len(ids)
cell={}
for l in D['관계근거31']:
    if l['출발'] not in ids or l['도착'] not in ids: continue
    cell[(l['출발'],l['도착'])]=l
COL={'E1':('#2F6DB5','#FFFFFF'),'E2':('#E8892B','#FFFFFF'),'H':('#3E9B63','#FFFFFF'),'Q':('#B9C0CA','#333333')}
def kind(l):
    if l['분류']=='위계 표시': return 'H'
    if l['분류']=='근거 보류': return 'Q'
    return l['V4 등급']
cw,ch=70,46; x0,y0=290,190; Wd=x0+n*cw+40; Ht=y0+n*ch+170
im=Image.new('RGB',(Wd,Ht),'white'); d=ImageDraw.Draw(im)
d.text((30,24),'Arias 22개 BCMS 프로세스 유형 관계 MAP (V5)',font=F(34),fill='#14213D')
d.text((30,74),'행 Y = 출발 유형 · 열 X = 도착 유형 · 셀 = 관계 ID.  빈 셀은 미등록이며 관계 부재의 증거가 아님.',font=F(20),fill='#444')
lx=30
for k,t in (('E1','E1 직접 서술'),('E2','E2 정규화'),('H','H 위계(포함)'),('Q','? 근거 보류')):
    d.rounded_rectangle((lx,116,lx+34,144),5,fill=COL[k][0]); d.text((lx+44,118),t,font=F(20),fill='#222'); lx+=240
SH={'BIA':'BIA·중요도분석','STR':'BC전략·솔루션','PLAN':'BC계획·절차','WARN':'경보·소통','DOC':'문서화된정보','COM':'협의·소통','INC':'사고·비상대응','EXE':'훈련·연습','AWR':'인식·역량·교육','CHG':'변경관리'}
names={o['ID']:SH.get(o['ID'],o['한국어']) for o in D['객체22']}
for j,i in enumerate(ids):
    x=x0+j*cw; d.rectangle((x,y0-40,x+cw,y0),fill='#14213D',outline='white'); d.text((x+cw/2,y0-20),i,font=F(18),fill='white',anchor='mm')
for r,i in enumerate(ids):
    y=y0+r*ch; d.rectangle((30,y,x0,y+ch),fill='#14213D',outline='white'); d.text((40,y+ch/2),f'{i}',font=F(18),fill='white',anchor='lm'); d.text((x0-8,y+ch/2),names[i],font=F(13),fill='#CADCFC',anchor='rm')
    for c,j in enumerate(ids):
        x=x0+c*cw; bg='#F3F6FA' if (r+c)%2 else '#FFFFFF'
        if r==c: bg='#D5DAE3'
        d.rectangle((x,y,x+cw,y+ch),fill=bg,outline='#E1E6EE')
        l=cell.get((i,j))
        if l:
            k=kind(l); b,fg=COL[k]; d.rounded_rectangle((x+4,y+5,x+cw-4,y+ch-5),6,fill=b)
            d.text((x+cw/2,y+ch/2),l['관계ID']+('?' if k=='Q' else ''),font=F(17),fill=fg,anchor='mm')
yb=y0+n*ch+24
for t in ('집단 진술(주석): L27 거의 모든 BCMS 결과의 COM 소통 · L30 핵심 프로세스에 자원 지원. CORE는 23번째 객체가 아님.',
          '합계 31개 기록 = 운영 후보 24 + 위계 2(L13·L14) + 집단 진술 2(L27·L30) + 근거 보류 3(L11·L17·L29). 지도 셀 29개 + 주석 2개.',
          '출처: 객체 — Arias-Aranda 외(2026) Table 5, p.14. 관계 — §4.3 pp.14–16에서 연구자가 추출·정규화. E1/E2는 문헌 직접성이며 전문가 합의가 아님.'):
    d.text((30,yb),t,font=F(18),fill='#333'); yb+=34
im.save(os.path.join(ROOT,'outputs/BCMS_관계MAP_22x22_V5.png'))
print(len(cell),'cells',Wd,Ht)
