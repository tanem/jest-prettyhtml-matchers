# Jest version matrix

Each directory here is one jest version the matchers are tested against. A
directory holds nothing but a `package.json` naming its jest version; the
sources, the jest configs and the tsconfig are all generated into it by
`scripts/test.ts` and are gitignored.

## Which versions live here

Boundary versions only: the **first and last minor of each major** named in the
`peerDependencies` range, plus any minor that changed behaviour worth pinning.
Adding a boundary means replacing the previous last-minor for that major, not
accumulating versions — otherwise the matrix grows without bound and every run
pays for it.

The matrix must span every major the `peerDependencies` range claims. It ran
from 25 to 29 for a while after support for 30 was declared, which meant the
newest supported major was the one version nobody tested.

## Why each directory pins three versions

They are one chain, and picking a jest version fixes the other two. `ts-jest`
majors track jest majors, and each `ts-jest` accepts only a narrow TypeScript
range:

| jest | ts-jest | typescript |
| ---- | ------- | ---------- |
| 25   | 25.x    | 3.x        |
| 26   | 26.x    | 4.x        |
| 27   | 27.x    | 4.x        |
| 28   | 28.x    | 5.x        |
| 29   | 29.x    | 5.x        |
| 30   | 29.x    | 5.x        |

Every directory used to float `ts-jest` at `29.x` regardless of its jest
version. That worked until ts-jest 29.4.12 narrowed its jest peer to
`^29 || ^30`, at which point installing anything below jest 29 failed outright —
and a failed install used to count as a pass, so the matrix went green while
testing nothing. Leaving `typescript` unpinned failed the same way from the
other end: npm was free to install TypeScript 7, which ts-jest 29 cannot drive.
