"""배경·필요성 인용(data/v5/background_quotes.json) 문자열 대조. 사용: python3 -I scripts/verify_background_quotes.py --arias X.pdf|.txt --bialas Y.pdf|.txt
(.pdf는 pdftotext로 추출, .txt는 쪽을 \\f로 구분한 추출본)"""
import argparse,json,os,re,subprocess,sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def norm(s):
    for a in '“”‘’―‖„"\'‗‚`´­': s=s.replace(a,'')
    return re.sub(r'[\s\-‐‑‒–—]','',s)
def pages(p):
    t=subprocess.run(['pdftotext',p,'-'],capture_output=True,text=True,check=True).stdout if p.endswith('.pdf') else open(p,encoding='utf-8').read()
    return t.split('\f')
ap=argparse.ArgumentParser();ap.add_argument('--arias',required=True);ap.add_argument('--bialas',required=True);a=ap.parse_args()
pg={'Arias':pages(a.arias),'Białas':pages(a.bialas)}
Q=json.load(open(os.path.join(ROOT,'data/v5/background_quotes.json'),encoding='utf-8'));res=[]
for q in Q: res.append(dict(id=q['id'],pages=q['pages'],ok=norm(q['text']) in norm(pg[q['source']][int(q['pages'])-1])))
json.dump(res,open(os.path.join(ROOT,'outputs/background_quote_verification.json'),'w'),indent=1)
print(sum(r['ok'] for r in res),'/',len(res),[r['id'] for r in res if not r['ok']]);sys.exit(0 if all(r['ok'] for r in res) else 1)
