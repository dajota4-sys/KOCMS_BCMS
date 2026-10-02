import tempfile
import unittest
from pathlib import Path

from organizer.core import (CATEGORIES, apply_plan, build_plan, classify,
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
        self.assertEqual(undo(j), (1, 0))
        self.assertTrue(a.exists())
        self.assertEqual(latest_journal(self.dest), j)

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
