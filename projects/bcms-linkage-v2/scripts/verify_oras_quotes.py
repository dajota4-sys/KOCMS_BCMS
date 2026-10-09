"""ORAS 인용(data/v5/oras_quotes.json) PDF 문자열 대조. 사용: python3 -I scripts/verify_oras_quotes.py --pdf ORAS.pdf"""
import argparse,json,os,re,subprocess,sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap=argparse.ArgumentParser();ap.add_argument('--pdf',required=True);a=ap.parse_args()
n=lambda s:re.sub(r'[\s\-‐‑‒–—­]','',s.replace('’',"'"))
pg=subprocess.run(['pdftotext',a.pdf,'-'],capture_output=True,text=True,check=True).stdout.split('\f')
Q=json.load(open(os.path.join(ROOT,'data/v5/oras_quotes.json'),encoding='utf-8'));res=[dict(id=q['id'],pages=q['pages'],ok=n(q['text']) in n(pg[int(q['pages'])-1])) for q in Q]
json.dump(res,open(os.path.join(ROOT,'outputs/oras_quote_verification.json'),'w'),indent=1);print(sum(r['ok'] for r in res),'/',len(res));sys.exit(0 if all(r['ok'] for r in res) else 1)
