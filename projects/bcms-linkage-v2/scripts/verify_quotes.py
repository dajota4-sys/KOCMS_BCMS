"""인용문 원문 대조 검증.

사용: python3 -I scripts/verify_quotes.py --arias <Arias.pdf> --bialas <Bialas.pdf>

1) data/quotes.json의 모든 인용문이 지정한 쪽(PDF 쪽 번호)의 원문 텍스트에 실제로 존재하는지 확인
2) Arias Table 2-5의 프로세스 이름·전문가 지명률이 objects.json과 일치하는지 확인
3) links/items/definitions가 참조하는 인용 ID, 관계유형 목록, 개수의 정합성 확인
결과는 outputs/quote_verification_report.md, quote_verification.json에 저장. 실패가 있으면 종료 코드 1.
"""
import argparse,hashlib,json,re,subprocess,sys,datetime,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from common import load,out

def norm(s):
    for a in '“”‘’―‖„"\'‗‚`´': s=s.replace(a,'')
    s=s.replace('­','')
    return re.sub(r'[\s\-‐‑‒–—]','',s)
def pages(pdf,layout=False):
    cmd=['pdftotext']+(['-layout'] if layout else [])+[pdf,'-']
    t=subprocess.run(cmd,capture_output=True,text=True,check=True).stdout
    t=re.sub(r'Appl\. Sci\. 2026, 16, 3219\s*\d+ of 21','',t)
    t=re.sub(r'https://doi\.org/10\.3390/app16073219','',t)
    return t.split('\f')
def sha(p):
    h=hashlib.sha256()
    with open(p,'rb') as f: h.update(f.read())
    return h.hexdigest()

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--arias',required=True); ap.add_argument('--bialas',required=True)
    a=ap.parse_args()
    pdf={'Arias':a.arias,'Białas':a.bialas}
    pg={k:pages(v) for k,v in pdf.items()}
    quotes=load('quotes.json'); res=[]; fails=[]
    for q in quotes:
        p=q['pages'].split('-'); rng=range(int(p[0]),int(p[-1])+1)
        t=''.join(pg[q['source']][i-1] for i in rng)
        ok=norm(q['text']) in norm(t)
        res.append(dict(id=q['id'],source=q['source'],pages=q['pages'],ok=ok))
        if not ok: fails.append(f"인용 {q['id']} ({q['source']} p.{q['pages']}) 원문에서 찾지 못함")
    # objects check
    objs=load('objects.json'); lay=pages(pdf['Arias'],layout=True)
    t14=norm(pg['Arias'][13]); tab=''.join(lay[i-1] for i in (11,12,13))
    objchk=[]
    for o in objs:
        name_ok=norm(o['arias_name']) in t14
        m=re.search(re.escape(o['arias_name'])+r'\s*\|?\s*\d+\s*\((\d+)%\)',tab.replace('\n','\n'))
        pct=int(m.group(1)) if m else None
        pct_ok=(pct==o['expert_pct'])
        objchk.append(dict(id=o['id'],name_ok=name_ok,pct_in_paper=pct,pct_in_data=o['expert_pct'],pct_ok=pct_ok))
        if not name_ok: fails.append(f"객체 {o['id']} 이름이 Arias p.14에 없음")
        if not pct_ok: fails.append(f"객체 {o['id']} 지명률 불일치(논문 {pct}, 데이터 {o['expert_pct']})")
    # consistency
    qids={q['id'] for q in quotes}; links=load('links.json'); items=load('items.json'); defs=load('definitions.json'); rts=load('relation_types.json')
    for l in links:
        for q in l['quotes_primary']+l['quotes_support']:
            if q not in qids: fails.append(f"{l['id']}가 없는 인용 {q} 참조")
        if l['evidence']=='E1' and not l['quotes_primary']: fails.append(f"{l['id']}: E1인데 주 인용 없음")
        if l['evidence'] in('E2','E3') and l['evidence']=='E3' and l['quotes_primary']: fails.append(f"{l['id']}: E3인데 주 인용이 있음")
    for d in defs:
        for q in d['quotes']:
            if q not in qids: fails.append(f"{d['id']}가 없는 인용 {q} 참조")
    for it in items:
        for q in it['basis_quotes']:
            if q not in qids: fails.append(f"{it['id']}가 없는 인용 {q} 참조")
    rt_links={}
    for r in rts:
        for tok in [x.strip() for x in r['links'].split(',')]:
            if '~' in tok:
                a_,b_=tok.split('~'); rng=[f'L{n:02d}' for n in range(int(a_[1:]),int(b_[1:])+1)]
            else: rng=[tok]
            for l in rng: rt_links.setdefault(l,[]).append(r['name'])
    for l in links:
        if rt_links.get(l['id'])!=[l['relation']]: fails.append(f"{l['id']} 관계유형 불일치: links={l['relation']} relation_types={rt_links.get(l['id'])}")
    if len(links)!=31: fails.append('연결 수가 31이 아님')
    if sum(1 for i in items if i['part']=='C 연결')!=len(links)*3: fails.append('연결 문항 수가 연결×3과 다름')
    summary=dict(date=str(datetime.date.today()),pdf_sha256={k:sha(v) for k,v in pdf.items()},quotes_total=len(quotes),quotes_ok=sum(r['ok'] for r in res),
                 objects_total=len(objs),objects_ok=sum(1 for o in objchk if o['name_ok'] and o['pct_ok']),failures=fails,quotes=res,objects=objchk)
    json.dump(summary,open(out('quote_verification.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
    with open(out('quote_verification_report.md'),'w',encoding='utf-8') as f:
        f.write(f"# 인용문 원문 대조 검증 보고서\n\n- 검증일: {summary['date']}\n- Arias PDF SHA-256: `{summary['pdf_sha256']['Arias']}`\n- Białas PDF SHA-256: `{summary['pdf_sha256']['Białas']}`\n")
        f.write(f"- 인용문: {summary['quotes_ok']} / {summary['quotes_total']} 일치\n- 객체(Table 2–5 이름·지명률): {summary['objects_ok']} / {summary['objects_total']} 일치\n- 정합성 오류: {len(fails)}건\n\n")
        f.write('방법: pdftotext로 PDF 원문을 추출하고, 공백·하이픈·따옴표 차이를 무시한 뒤 지정한 PDF 쪽에서 인용문 전체가 포함되는지 검사. 한국어 번역은 대조 대상이 아니며 연구자 번역(참고용)이다.\n\n')
        if fails: f.write('## 실패 항목\n\n'+'\n'.join('- '+x for x in fails)+'\n\n')
        f.write('## 인용문별 결과\n\n| ID | 출처 | PDF 쪽 | 결과 |\n|---|---|---|---|\n')
        for r in res: f.write(f"| {r['id']} | {r['source']} | {r['pages']} | {'일치' if r['ok'] else '불일치'} |\n")
    print(f"quotes {summary['quotes_ok']}/{summary['quotes_total']}  objects {summary['objects_ok']}/{summary['objects_total']}  failures {len(fails)}")
    for x in fails: print(' -',x)
    sys.exit(1 if fails else 0)
main()
