#!/usr/bin/env python3
"""Fix edge-case transform artifacts from glazepulse → bindpulse."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {".git", "node_modules", "dist", ".next", "coverage"}

FIXES = [
    ("bindingJobes", "bindingJobs"),
    ("BindingJobes", "BindingJobs"),
    ("prisma.kiln", "prisma.press"),
    ("mockPrisma.kiln", "mockPrisma.press"),
    ("kiln:", "press:"),
    ("include: { kiln", "include: { press"),
    ("{ kiln", "{ press"),
    ("kilnType", "pressType"),
    ("kiln_type", "press_type"),
    ("KILN_TYPE", "PRESS_TYPE"),
    ("formatPressType(kilnType", "formatPressType(pressType"),
    ("for (const kiln of", "for (const press of"),
    ("const kilnData", "const pressData"),
    ("const kilns =", "const presses ="),
    ("kilns[", "presses["),
    ("...kiln,", "...press,"),
    ("./dto/kiln.dto", "./dto/press.dto"),
    ("./dto/firing-batch.dto", "./dto/binding-job.dto"),
    ("./dto/glaze-checklist.dto", "./dto/finishing-checklist.dto"),
    ("./dto/clay-order.dto", "./dto/material-order.dto"),
    ("./dto/firing-rate.dto", "./dto/service-rate.dto"),
    ("Integration test kiln", "Integration test press"),
    ("const fraunces =", "const ebGaramond ="),
    ("const sourceSans =", "const libreBaskerville ="),
    ("${fraunces.variable}", "${ebGaramond.variable}"),
    ("${sourceSans.variable}", "${libreBaskerville.variable}"),
]


def main() -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or any(s in path.parts for s in SKIP):
            continue
        if path.suffix not in {".ts", ".tsx", ".js", ".json", ".md", ".sh", ".css", ".prisma", ".sql", ".yml"}:
            continue
        if "fix-transform.py" in str(path):
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        original = content
        for old, new in FIXES:
            content = content.replace(old, new)
        if content != original:
            path.write_text(content, encoding="utf-8")
    print("Fix pass complete.")


if __name__ == "__main__":
    main()
