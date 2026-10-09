"""Arias PDF 지정 쪽을 PNG로 캡처하고 data/quotes.json의 인용문을 노란색으로 표시.
사용: python3 -I scripts/capture_pages.py --pdf <Arias.pdf> --pages 4 5 14 15 16 [--out outputs/arias_pages]"""
import argparse,json,os,re,subprocess,html
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap=argparse.ArgumentParser();ap.add_argument('--pdf',required=True);ap.add_argument('--pages',type=int,nargs='+',required=True);ap.add_argument('--out',default=os.path.join(ROOT,'outputs/arias_pages'));ap.add_argument('--dpi',type=int,default=130);a=ap.parse_args()
os.makedirs(a.out,exist_ok=True)
FP=os.environ.get('KFONT','/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc')
def norm(w): return re.sub(r'[“”‘’"\'‗‚`´­\-‐‑‒–—]','',w).lower()
Q=[q for q in json.load(open(os.path.join(ROOT,'data/quotes.json'),encoding='utf-8')) if q['source']=='Arias']
lo,hi=min(a.pages),max(a.pages)
bb=subprocess.run(['pdftotext','-bbox','-f',str(lo),'-l',str(hi),a.pdf,'-'],capture_output=True,text=True).stdout
words=[];pg=lo-1
for line in bb.splitlines():
    if '<page ' in line: pg+=1
    m=re.search(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',line)
    if m: words.append((pg,*(float(m.group(i)) for i in range(1,5)),html.unescape(m.group(5))))
nw=[(w,norm(w[5])) for w in words if norm(w[5])]
hl={p:[] for p in a.pages}; found=[]
for q in Q:
    toks=[norm(t) for t in q['text'].split() if norm(t)]
    n=len(toks)
    for i in range(len(nw)-n+1):
        seg=[x[1] for x in nw[i:i+n]]
        if seg[:-1]==toks[:-1] and seg[-1].startswith(toks[-1]) or seg==toks:
            for j,(w,_) in enumerate(nw[i:i+n]):
                if w[0] in hl: hl[w[0]].append((w[1:5],q['id'] if j==0 else None))
            found.append((q['id'],nw[i][0][0]));break
f=ImageFont.truetype(FP,22);s=a.dpi/72
subprocess.run(['pdftoppm','-r',str(a.dpi),'-png','-f',str(lo),'-l',str(hi),a.pdf,os.path.join(a.out,'_tmp')],check=True)
for p in a.pages:
    fn=[x for x in os.listdir(a.out) if x.startswith('_tmp') and int(re.findall(r'(\d+)\.png',x)[0])==p][0]
    im=Image.open(os.path.join(a.out,fn)).convert('RGBA');ov=Image.new('RGBA',im.size,(0,0,0,0));d=ImageDraw.Draw(ov)
    for (x0,y0,x1,y1),tag in hl[p]:
        d.rectangle([x0*s-1,y0*s,x1*s+1,y1*s],fill=(255,214,0,110))
        if tag:
            tw=d.textlength(tag,font=f); d.rounded_rectangle([16,y0*s-2,16+tw+14,y0*s+24],radius=6,fill=(47,109,181,235)); d.text((23,y0*s-1),tag,font=f,fill='white')
    out=Image.alpha_composite(im,ov).convert('RGB'); out.save(os.path.join(a.out,f'Arias_p{p:02d}.png')); os.remove(os.path.join(a.out,fn))
print('highlighted quotes:',sorted(set(i for i,_ in found)),len(found))
