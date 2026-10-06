"""공통 로더. 모든 산출물은 data/*.json 하나의 원천에서 만든다."""
import json,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def load(name):
    with open(os.path.join(ROOT,'data',name),encoding='utf-8') as f: return json.load(f)
def out(*p): return os.path.join(ROOT,'outputs',*p)
DOMAIN_ORDER=['① 요구·분석','② 전략·계획·이행','③ 대응·복구·훈련','④ 평가·개선·변경','⑤ 거버넌스·이해관계자']
CORE_NAME='핵심 BCMS 프로세스 전반(집단)'
