/**
 * docs/DESIGN.md §9.2 step 6 — a static, non-interactive rendering of a term
 * lattice, drawn inline by engineering. 1px `--color-line` orthogonal edges,
 * hard-edged square nodes, no labels at this size, no external asset.
 *
 * The geometry below is decoration, not data: it is a fixed local coordinate
 * grid and it deliberately does not encode any real prerequisite relationship.
 * The real graph is §9.5 and is driven by `content/terms/*.json`, which does
 * not exist yet. The SVG is `aria-hidden` and unfocusable.
 */
const COLUMNS = [60, 228, 396, 564, 732, 900] as const;
const ROWS = [40, 110, 180] as const;

interface Point {
  readonly x: number;
  readonly y: number;
}

const NODES: readonly Point[] = COLUMNS.flatMap((x) =>
  ROWS.map((y) => ({ x, y })),
);

/** Index into NODES is `column * 3 + row`. */
const EDGES: readonly (readonly [number, number])[] = [
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 7],
  [4, 7],
  [5, 8],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 12],
  [10, 13],
  [11, 13],
  [12, 15],
  [13, 16],
  [13, 17],
];

/** Orthogonal only: horizontal and vertical segments, square corners (§9.5). */
function edgePath(a: Point, b: Point): string {
  if (a.y === b.y) {
    return `M ${a.x} ${a.y} H ${b.x}`;
  }
  const turn = Math.round((a.x + b.x) / 2);
  return `M ${a.x} ${a.y} H ${turn} V ${b.y} H ${b.x}`;
}

export function GraphTeaser() {
  return (
    <svg
      viewBox="0 0 960 220"
      className="h-auto w-full max-w-[960px]"
      aria-hidden="true"
      focusable="false"
    >
      {EDGES.map(([from, to]) => (
        <path
          key={`${from}-${to}`}
          d={edgePath(NODES[from], NODES[to])}
          fill="none"
          strokeWidth={1}
          className="stroke-line"
        />
      ))}
      {NODES.map((node) => (
        <rect
          key={`${node.x}-${node.y}`}
          x={node.x - 7}
          y={node.y - 7}
          width={14}
          height={14}
          strokeWidth={1}
          className="fill-surface-raised stroke-line"
        />
      ))}
    </svg>
  );
}
