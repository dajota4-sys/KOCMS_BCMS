import tempfile
import unittest
from pathlib import Path

from organizer.core import (list_history, stable_files, read_journal, CATEGORIES, apply_plan, build_plan, classify,
                            latest_journal, sanitize_folder, scan, undo)


class FakeAI:
    def classify_batch(self, files, known):
        return {str(f): "02_강의자료/통계학특론" for f in files}


class CoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.src, self.dest = self.tmp / "D", self.tmp / "D" / "대학원"
        self.src.mkdir()

    def touch(self, rel):
        p = self.src / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text("x")
        return p

    def test_rules(self):
        self.assertEqual(classify(Path("HW3_final.pdf"))[0], CATEGORIES["assignments"])
        self.assertEqual(classify(Path("arxiv_2301.pdf"))[0], CATEGORIES["papers"])
        self.assertEqual(classify(Path("result.csv"))[0], CATEGORIES["research"])
        self.assertIsNone(classify(Path("scan0001.pdf"))[0])

    def test_existing_folder_match(self):
        self.assertEqual(classify(Path("베이지안통계_메모.txt"), ["베이지안통계"])[0], "베이지안통계")

    def test_scan_skips_system_project_and_dest(self):
        self.touch("a.pdf"); self.touch("setup.exe")
        self.touch("proj/.git/x"); self.touch("proj/code.py")
        self.touch("$RECYCLE.BIN/z.pdf"); self.touch("sub/b.pdf")
        self.dest.mkdir(); (self.dest / "old.pdf").write_text("x")
        names = {f.name for f in scan([self.src], self.dest, recursive=True)}
        self.assertEqual(names, {"a.pdf", "b.pdf"})
        self.assertEqual({f.name for f in scan([self.src], self.dest)}, {"a.pdf"})

    def test_apply_undo_and_no_overwrite(self):
        a = self.touch("hw1.pdf")
        (self.dest / CATEGORIES["assignments"]).mkdir(parents=True)
        (self.dest / CATEGORIES["assignments"] / "hw1.pdf").write_text("existing")
        plan = build_plan([a], self.dest)
        j = apply_plan(plan, self.dest)
        self.assertEqual((self.dest / CATEGORIES["assignments"] / "hw1.pdf").read_text(), "existing")
        self.assertTrue((self.dest / CATEGORIES["assignments"] / "hw1 (1).pdf").exists())
        self.assertFalse(a.exists())
        self.assertEqual(latest_journal(self.dest), j)
        self.assertEqual(undo(j), (1, 0))
        self.assertTrue(a.exists())
        self.assertIsNone(latest_journal(self.dest))  # 모두 되돌림
        self.assertEqual(undo(j), (0, 0))  # 두 번 되돌려도 안전

    def test_history_and_partial_undo(self):
        a, b = self.touch("hw1.pdf"), self.touch("arxiv_1.pdf")
        j = apply_plan(build_plan([a, b], self.dest), self.dest, source="auto")
        h = list_history(self.dest)
        self.assertEqual(len(h), 1)
        self.assertEqual((h[0]["source"], len(h[0]["items"])), ("auto", 2))
        self.assertEqual(h[0]["items"][0]["folder"], CATEGORIES["assignments"])
        self.assertEqual(undo(j, indices=[0]), (1, 0))  # 한 파일만 되돌림
        self.assertTrue(a.exists() and not b.exists())
        self.assertEqual(sum(it["undone"] for it in read_journal(j)["items"]), 1)
        self.assertEqual(latest_journal(self.dest), j)  # 아직 남음
        j2 = apply_plan(build_plan([a], self.dest), self.dest)  # 같은 초에도 덮어쓰지 않음
        self.assertNotEqual(j, j2)

    def test_undo_reports_restored_paths(self):
        a = self.touch("hw1.pdf")
        j = apply_plan(build_plan([a], self.dest), self.dest)
        restored = []
        undo(j, restored=restored)
        self.assertEqual(restored, [a])

    def test_legacy_journal(self):
        import json
        a = self.touch("hw1.pdf")
        j = apply_plan(build_plan([a], self.dest), self.dest)
        data = read_journal(j)["items"]
        j.write_text(json.dumps([{"src": d["src"], "dst": d["dst"]} for d in data]), encoding="utf-8")
        self.assertEqual(len(list_history(self.dest)[0]["items"]), 1)
        self.assertEqual(undo(j), (1, 0))

    def test_stable_files(self):
        import os, time
        a, b = self.touch("old.pdf"), self.touch("new.pdf")
        os.utime(a, (time.time() - 60, time.time() - 60))
        self.assertEqual(stable_files([a, b], 5), [a])

    def test_ai_fallback_creates_new_folder(self):
        f = self.touch("scan0001.pdf")
        plan = build_plan([f], self.dest, FakeAI())
        self.assertEqual(plan[0].dst_folder, "02_강의자료/통계학특론")
        self.assertEqual(plan[0].source, "ai")

    def test_sanitize_blocks_traversal(self):
        self.assertEqual(sanitize_folder("../../Windows/System32/x"), "Windows/System32")
        self.assertEqual(sanitize_folder(""), CATEGORIES["misc"])


if __name__ == "__main__":
    unittest.main()


class ConfigTests(unittest.TestCase):
    def tearDown(self):
        from organizer.core import load_config
        load_config(Path("/nonexistent.json"))  # 기본값 복원

    def test_custom_config(self):
        import json
        from organizer.core import load_config
        p = Path(tempfile.mkdtemp()) / "c.json"
        p.write_text(json.dumps({
            "categories": {"papers": "A_논문", "mycls": "Z_내수업", "misc": "기타"},
            "keywords": {"mycls": "bayes|베이지안", "bad": "x", "papers": "(["},
        }, ensure_ascii=False), encoding="utf-8")
        errs = load_config(p)
        self.assertEqual(len(errs), 2)  # 없는 카테고리 + 잘못된 정규식
        self.assertEqual(classify(Path("베이지안_노트.pdf"))[0], "Z_내수업")
        self.assertEqual(classify(Path("zzz.pdf"))[0], None)

    def test_broken_json_falls_back(self):
        from organizer.core import load_config
        p = Path(tempfile.mkdtemp()) / "c.json"
        p.write_text("{oops", encoding="utf-8")
        self.assertEqual(len(load_config(p)), 1)
        self.assertEqual(classify(Path("hw1.pdf"))[0], CATEGORIES["assignments"])
