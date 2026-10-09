"""BCMS 연계성 온톨로지 맵 — 간단 방향도(V5 초기 발표용). 22개 객체=Arias 기정, 아래는 연구·학습 방향."""
import os
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'); f=lambda s:ImageFont.truetype(FP,s)
W,H=2400,1400; im=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(im)
NAVY,BLUE,ORG,GRN,GRY='#14213D','#2F6DB5','#E8892B','#3E9B63','#7C8794'
def rr(b,fill,outline=None,w=3,r=18): d.rounded_rectangle(b,radius=r,fill=fill,outline=outline,width=w)
def T(xy,t,s,fill=NAVY,a='mm'): d.text(xy,t,font=f(s),fill=fill,anchor=a)
def arrow(x,y0,y1,col=GRY):
    d.line([(x,y0),(x,y1-24)],fill=col,width=8); d.polygon([(x-22,y1-30),(x+22,y1-30),(x,y1)],fill=col)
T((60,50),'BCMS 연계성 온톨로지 맵 — 기초 초안(방향도)',54,'#101828','lm')
T((60,110),'초기 발표용 간단 버전 · 상세 관계 지도는 별도(22×22 MAP, 온톨로지 맵 상세 초안)',26,'#667085','lm')
# 좌측 라벨
rr((60,170,330,520),'#EEF1F5',GRY,3); T((195,300),'Arias가\n연구한 것',40,NAVY); T((195,400),'(유지)',30,GRY)
rr((60,590,330,1230),'#EAF1FA',BLUE,5); T((195,820),'본 연구가\n학습할 것',40,BLUE); T((195,930),'(후보·초안)',30,BLUE)
# 1. 22개 객체
rr((360,170,2340,520),'#F6F8FB',GRY,3)
T((400,205),'22개 BCMS 프로세스 유형 (Arias-Aranda 외 2026, Table 5)',32,NAVY,'lm')
lanes=[('요구·분석',['REQ 요구사항','BIA 영향분석','RA 리스크평가']),('전략·계획·이행',['STR 전략·솔루션','PLAN 계획·절차','IMP 솔루션 이행','RES 자원관리']),('대응·복구·훈련',['INC 사고대응','WARN 경보·소통','REC 복구','EXE 훈련·연습','AWR 교육']),('평가·개선·변경',['AUD 내부감사','PERF 성과평가','SUP 공급망','CI 지속적 개선','CHG 변경관리','DOC 문서통제']),('거버넌스·이해관계자',['GOV 거버넌스','POL 정책관리','COM 협의·소통','CRM 고객관계'])]
lw=(2340-360-40)/5
for i,(t,cs) in enumerate(lanes):
    x=380+i*lw; T((x+lw/2-10,262),t,26,GRY)
    for j,c in enumerate(cs):
        y=290+j*34; rr((x,y,x+lw-20,y+30),'#DDE3EC','#9AA5B4',2,8); T((x+(lw-20)/2,y+15),c,19,NAVY)
T((2330,500),'※ 영역 구분은 연구자 정리',20,'#98A2B3','rm')
arrow(1350,520,590)
T((1380,555),'프로세스 사이를 오가는 산출물·기준',24,GRY,'lm')
# 2. 연결
rr((360,590,2340,740),'white',BLUE,5)
T((400,628),'① 연결(관계)',36,BLUE,'lm')
T((400,688),'원문에서 연결 근거를 찾아 31개 관계로 정리 → 운영 후보 24개를 전문가와 검토   예) BIA → 전략·솔루션 선정',27,'#344054','lm')
arrow(1350,740,800,BLUE)
# 3. 품질
rr((360,800,2340,1010),'white',ORG,5)
T((400,838),'② 연결의 품질 (후보)',36,ORG,'lm')
cs=[('CO','정합성'),('TR','근거 추적가능성'),('EV','증빙가능성'),('TM','변경전파 적시성')]
for i,(c,t) in enumerate(cs):
    x=400+i*350; rr((x,880,x+330,970),'#FEF3E6',ORG,3,14); T((x+165,908),c,28,ORG); T((x+165,945),t,24,NAVY)
rr((1830,880,2310,925),'#FFF8EE',ORG,2,12); T((2070,903),'AC 책임명확성 · 관리조건 후보',22,'#7A4A10')
rr((1830,932,2310,977),'#F3F4F6',GRY,2,12); T((2070,955),'FC 개선조치 완결성 · 경로(보류)',22,GRY)
arrow(1350,1010,1070,ORG)
# 4. 설문
rr((360,1070,1330,1230),'white',GRN,5); T((400,1108),'③ 설문으로 확인',36,GRN,'lm'); T((400,1175),'문항 후보 → 전문가·인지면접 → 측정모형',27,'#344054','lm')
d.polygon([(1350,1130),(1350,1170),(1410,1150)],fill=GRY)
rr((1430,1070,2340,1230),'white',GRY,5); T((1470,1108),'④ 조직회복탄력성과의 관련성',34,GRY,'lm'); T((1470,1175),'구조적 관련성 검증(인과 아님) · ORAS 근거 미확정',26,'#344054','lm')
T((60,1290),'파랑/주황/초록 = 본 연구가 학습·검증할 방향(확정 아님). 회색 = 선행연구(Arias)가 정리한 객체로 연구에서 유지.',24,'#667085','lm')
T((60,1335),'출처: 객체 Arias-Aranda 외(2026) Appl. Sci. 16, 3219, Table 5 (PDF p.14). 연결·품질 개념은 연구자 후보. 표현 방식 Białas(2010) §2 (방법만 차용).',22,'#98A2B3','lm')
im.save(os.path.join(ROOT,'outputs/BCMS_온톨로지맵_간단방향_V5.png')); print(im.size)
