#!/usr/bin/env python3
"""Aggregate scraped BSN shot locations into hex bins for the hero chart.

Usage: python3 scripts/build_shot_bins.py path/to/team_shots.csv

The input CSV has one row per shot and names players. It must never be
committed to this repo. Only the aggregated output is public:
src/data/heroShotBins.json holds per-bin totals and no team, player, date
or shot-level fields.

Input columns: team, made, period, bottom, left, date, player, shotType
  left    percent of full court length (28 m), measured from the baseline
  bottom  percent of court width (15 m)
Output coordinates are metres on a FIBA half court:
  w  0..15 across the court, d  0..14 out from the baseline.
"""
import csv
import json
import math
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

COURT_LENGTH_M = 28.0
COURT_WIDTH_M = 15.0
HEX_RADIUS_M = 0.5      # circumradius, pointy-top hexagons
MIN_ATTEMPTS = 10       # bins below this are not published
REQUIRED = {"made", "bottom", "left", "date", "shotType"}


def hex_round(q, r):
    x, z = q, r
    y = -x - z
    rx, ry, rz = round(x), round(y), round(z)
    dx, dy, dz = abs(rx - x), abs(ry - y), abs(rz - z)
    if dx > dy and dx > dz:
        rx = -ry - rz
    elif dy <= dz:
        rz = -rx - ry
    return rx, rz


def main(path):
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        missing = REQUIRED - set(reader.fieldnames or [])
        if missing:
            sys.exit(f"Input is missing columns: {sorted(missing)}")
        rows = list(reader)
    if not rows:
        sys.exit("Input has no rows")

    bins = defaultdict(lambda: [0, 0, 0])
    dates, teams = [], set()
    backcourt = 0
    for n, row in enumerate(rows, start=2):
        try:
            left, bottom = float(row["left"]), float(row["bottom"])
            value = int(row["shotType"][0])
            made = {"True": 1, "False": 0}[row["made"]]
            dates.append(datetime.strptime(row["date"], "%d/%m/%y").date())
        except (ValueError, KeyError, IndexError) as err:
            sys.exit(f"Row {n} could not be parsed: {err!r}")
        if value not in (2, 3) or not (0 <= left <= 100 and 0 <= bottom <= 100):
            sys.exit(f"Row {n} has an out-of-range value")
        teams.add(row.get("team", ""))
        if left > 50:           # taken from beyond half court
            backcourt += 1
            continue
        d = left / 100 * COURT_LENGTH_M
        w = bottom / 100 * COURT_WIDTH_M
        q = (math.sqrt(3) / 3 * w - d / 3) / HEX_RADIUS_M
        r = (2 / 3 * d) / HEX_RADIUS_M
        b = bins[hex_round(q, r)]
        b[0] += 1
        b[1] += made
        b[2] += value * made

    out_bins, published = [], 0
    for (q, r), (att, made, pts) in sorted(bins.items()):
        if att < MIN_ATTEMPTS:
            continue
        published += att
        out_bins.append({
            "w": round(HEX_RADIUS_M * math.sqrt(3) * (q + r / 2), 3),
            "d": round(HEX_RADIUS_M * 1.5 * r, 3),
            "att": att,
            "made": made,
            "pts": pts,
        })

    out = {
        "meta": {
            "league": "BSN",
            "firstGame": min(dates).isoformat(),
            "lastGame": max(dates).isoformat(),
            "teams": len(teams),
            "shotsInSource": len(rows),
            "shotsBeyondHalfCourtDropped": backcourt,
            "shotsInPublishedBins": published,
            "hexRadiusM": HEX_RADIUS_M,
            "minAttemptsPerBin": MIN_ATTEMPTS,
            "units": "metres; w across the court 0-15, d from the baseline 0-14",
        },
        "bins": out_bins,
    }
    dest = Path(__file__).resolve().parent.parent / "src" / "data" / "heroShotBins.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, indent=1) + "\n", encoding="utf-8")
    print(f"{len(out_bins)} bins, {published} of {len(rows)} shots -> {dest}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
