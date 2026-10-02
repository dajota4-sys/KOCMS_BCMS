"""화면(디스플레이)이 있을 때만 도는 GUI 연기 테스트. 없으면 건너뜀."""
import os
import shutil
import tempfile
import time
import unittest
from pathlib import Path

try:
    import tkinter
    tkinter.Tk().destroy()
    HAS_TK = True
except Exception:  # tkinter 없음 / 디스플레이 없음
    HAS_TK = False


@unittest.skipUnless(HAS_TK, "tkinter/디스플레이 없음")
class GuiSmoke(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        os.environ["AIFOLDER_CONFIG"] = str(self.tmp / "cfg" / "config.json")
        self.src, self.dest = self.tmp / "src", self.tmp / "dest"
        self.src.mkdir()
        for n in ("HW1.pdf", "arxiv_1.pdf", "scan.pdf"):
            (self.src / n).write_text("x")
        os.utime(self.src / "HW1.pdf", (time.time() - 60,) * 2)
        os.utime(self.src / "arxiv_1.pdf", (time.time() - 60,) * 2)
        import organizer.gui as g
        from organizer.gui import App
        g.load_state = lambda: {"sources": [str(self.src)], "dest": str(self.dest),
                                "recursive": False, "auto_watch": False, "use_ai": False}
        g.save_state = lambda st: None
        self.app = App()

    def tearDown(self):
        self.app.root.destroy()
        shutil.rmtree(self.tmp, ignore_errors=True)

    def pump(self, secs=1.0):
        end = time.time() + secs
        while time.time() < end:
            self.app.root.update()
            time.sleep(0.02)

    def test_auto_read_apply_history_undo(self):
        a = self.app
        self.pump()  # 시작하면 폴더를 자동으로 읽음
        self.assertEqual(len(a.plan), 3)
        self.assertEqual(len(a.tree.get_children()), 3)
        # 자동 정리: 확실한 파일만 옮기고 scan.pdf(애매)는 남김
        a.auto_watch.set(True)
        a._auto_move()
        self.pump()
        self.assertTrue((self.src / "scan.pdf").exists())
        self.assertFalse((self.src / "HW1.pdf").exists())
        a.refresh_history()
        runs = a.hist.get_children()
        self.assertEqual(len(runs), 1)
        self.assertIn("자동", a.hist.item(runs[0], "values")[1])
        # 검색
        a.search.set("hw1")
        self.assertEqual(len(a.hist.get_children(runs[0])), 1)
        a.search.set("zzz")
        self.assertEqual(len(a.hist.get_children()), 0)
        a.search.set("")
        # 파일 하나만 되돌리기
        import tkinter.messagebox as mb
        mb.askyesno = lambda *x, **k: True
        child = a.hist.get_children(a.hist.get_children()[0])[0]
        a.hist.selection_set(child)
        a.undo_selected()
        self.pump()
        self.assertEqual(sum((self.src / n).exists() for n in ("HW1.pdf", "arxiv_1.pdf")), 1)


if __name__ == "__main__":
    unittest.main()
