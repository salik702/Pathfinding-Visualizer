<div align="center">

<!-- Header Banner — Cylinder style, cyan/electric theme -->
<img src="https://capsule-render.vercel.app/api?type=shark&color=0:020817,40:0c1a3a,70:0e3a6e,100:020817&height=230&section=header&text=PATHFINDING%20VISUALIZER&fontSize=58&fontColor=ffffff&animation=fadeIn&fontAlignY=45&desc=BFS%20%7C%20Dijkstra%20%7C%20A-Star%20%7C%20Design%20and%20Analysis%20of%20Algorithms&descAlignY=68&descSize=17&descColor=67e8f9" width="100%"/>

<br/>

<!-- Header Typing Animation — no special chars that break URLs -->
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=800&size=21&duration=2800&pause=800&color=22D3EE&center=true&vCenter=true&repeat=true&width=880&height=52&lines=Visualize+BFS%2C+Dijkstra+and+A-Star+on+a+2D+Grid;Step-by-Step+Animation+with+Speed+Control;Place+Walls%2C+Weights%2C+Start+and+Target+Nodes;Compare+Algorithms+with+Live+Stats+Panel" alt="Typing SVG" />

<br/><br/>

<!-- Badge Row 1 -->
<p>
  <img src="https://img.shields.io/badge/COURSE-DAA%20%E2%80%94%20Algorithms-0ea5e9?style=for-the-badge&logo=bookstack&logoColor=white&labelColor=020817" />
  <img src="https://img.shields.io/badge/FRAMEWORK-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=020817" />
  <img src="https://img.shields.io/badge/LANGUAGE-JavaScript%20ESNext-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=020817" />
  <img src="https://img.shields.io/badge/STATUS-COMPLETE-22c55e?style=for-the-badge&logo=checkmarx&logoColor=white&labelColor=020817" />
</p>

<!-- Badge Row 2 -->
<p>
  <img src="https://img.shields.io/badge/ALGO-BFS%20%7C%20Dijkstra%20%7C%20A--Star-22d3ee?style=for-the-badge&logo=graphql&logoColor=white&labelColor=020817" />
  <img src="https://img.shields.io/badge/GRID-Interactive%202D%20Canvas-f97316?style=for-the-badge&logo=figma&logoColor=white&labelColor=020817" />
  <img src="https://img.shields.io/badge/BUILD-Vite%20%2B%20npm-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=020817" />
</p>

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> PROJECT.INIT — WHAT IS THIS?`

**Pathfinding Visualizer** is a web-based interactive tool built for the **Design & Analysis of Algorithms (DAA)** course. It renders BFS, Dijkstra, and A-Star on a 2D grid with real-time step-by-step animation. Users configure start/target positions, draw walls, and set node weights — then watch and compare how each algorithm explores and resolves the shortest path.

Built with **React + Vite** for fast HMR-driven development. Useful for teaching algorithm intuition and demonstrating complexity trade-offs in a live demo setting.

<br/>

<div align="center">

| `MODULE` | `ROLE` | `STATE` |
| :------: | :----- | :-----: |
| 🗺️ Grid Engine | 2D vertex graph — walls, weights, start, target | `✅ ACTIVE` |
| 🔵 BFS | Unweighted shortest path via level-order traversal | `✅ READY` |
| 🟠 Dijkstra | Weighted shortest path with binary-heap priority queue | `✅ READY` |
| 🟢 A-Star | Heuristic-guided optimal search | `✅ READY` |
| 📊 Stats Panel | Nodes visited · Path length · Exec time · Steps | `🟢 ONLINE` |
| 🎛️ Controls | Algo picker · Speed slider · Wall/weight mode · Reset | `⚡ LIVE` |

</div>

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> DEMO.VIDEO — SEE IT IN ACTION`

> 🎬 **BFS floods every cell. Dijkstra respects weights. A-Star cuts straight to the target. Watch all three live.**

<!-- Upload your video to any GitHub Issue via drag-drop, copy the generated link, replace below -->


https://github.com/user-attachments/assets/c7ff2c81-a844-4a6e-95f0-e2649d2af229



<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> EXECUTION.FLOW — HOW IT WORKS`

```
╔══════════════════════════════════════════════════════════════════════╗
║              PATHFINDING VISUALIZER — EXECUTION PIPELINE            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   [01]  🖱️  GRID SETUP                                               ║
║         └─► Click/drag to place walls (obstacles)                    ║
║         └─► Set weighted nodes (higher traversal cost)               ║
║         └─► Drag Start (S) and Target (T) to any cell                ║
║                                                                      ║
║   [02]  🎛️  CONFIGURE & SELECT                                        ║
║         └─► Pick algorithm: BFS / Dijkstra / A-Star                  ║
║         └─► A-Star: choose heuristic (Manhattan / Euclidean)         ║
║         └─► Adjust speed slider before or during animation           ║
║                                                                      ║
║   [03]  🔍  GRAPH TRAVERSAL                                           ║
║         └─► Grid = G(V, E) — each cell is a vertex                   ║
║         └─► 4-neighbor edges; weight from node or uniform 1          ║
║         └─► Visited cells animate in real-time, frame by frame       ║
║                                                                      ║
║   [04]  🛤️  PATH RECONSTRUCTION                                       ║
║         └─► Backtrack from Target to Start via came-from map         ║
║         └─► Optimal path highlighted distinctly after traversal      ║
║                                                                      ║
║   [05]  📊  STATS READOUT                                             ║
║         └─► Nodes visited · Path length · Time · Steps               ║
║         └─► Run all three algorithms and compare side-by-side        ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> ALGO.SPEC — ALGORITHM ANALYSIS`

<div align="center">

| `ALGORITHM` | `WEIGHTED?` | `TIME COMPLEXITY` | `SPACE` | `OPTIMAL?` | `HEURISTIC` |
| :---------: | :---------: | :---------------: | :-----: | :--------: | :---------: |
| 🔵 BFS | ❌ No | `O(V + E) ≈ O(n)` | `O(n)` | ✅ By edges | None |
| 🟠 Dijkstra | ✅ Yes | `O(n log n)` | `O(n)` | ✅ Non-neg weights | None |
| 🟢 A-Star | ✅ Yes | `≤ O(n log n)` | `O(n)` | ✅ If admissible | Manhattan / Euclidean |

</div>

<br/>

### `> HEURISTICS FOR A-STAR`

| `HEURISTIC` | `FORMULA` | `MOVEMENT` | `ADMISSIBLE?` |
| :---------: | :-------: | :--------: | :-----------: |
| Manhattan | `h = \|x₁−x₂\| + \|y₁−y₂\|` | 4-way grid | ✅ Yes |
| Euclidean | `h = √((x₁−x₂)² + (y₁−y₂)²)` | 8-way / diagonal | ✅ Yes |

> An **admissible** heuristic never overestimates the true cost — guaranteeing A-Star returns the optimal path.

<br/>

### `> CORRECTNESS (Summary)`

- **BFS** — Explores in layers of increasing distance; first reach = shortest path by edge count.
- **Dijkstra** — Greedy relaxation with a min-heap; non-negative weights ensure monotone cost reduction.
- **A-Star** — Optimal when `h(n) ≤ h*(n)` (admissible) and `h(n) ≤ c(n,n') + h(n')` (consistent).

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> DAA.THEORY — GRAPH MODEL`

The grid is modeled as a graph **G = (V, E)** where:

- Each cell is a **vertex** in V
- Edges connect **4-neighbors** (up, down, left, right)
- Edge weights come from node weights or default to **uniform 1** (BFS)
- Obstacles are treated as **removed vertices** (unreachable)

**Algorithm Selection Rationale:**

| `SCENARIO` | `BEST CHOICE` | `REASON` |
| :--------- | :-----------: | :------- |
| Unweighted grid, minimize hops | BFS | Guaranteed fewest edges; O(n) |
| Weighted grid, exact shortest path | Dijkstra | Relaxation with non-negative weights |
| Weighted grid, fast with direction | A-Star | Heuristic reduces explored nodes |
| Teaching comparison | All three | Visualize trade-offs side by side |

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> STACK.LOAD — TECHNOLOGIES`

<div align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/JSX-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />

</div>

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> PROJECT.STRUCTURE — REPO LAYOUT`

```text
pathfinding-visualizer/
├── public/
├── src/
│   ├── main.jsx                   ← React entry point
│   ├── App.jsx                    ← Root app component
│   ├── App.css / index.css        ← Global styles
│   ├── algorithms/
│   │   ├── bfs.js                 ← Breadth-First Search
│   │   ├── dijkstra.js            ← Dijkstra's Algorithm
│   │   ├── astar.js               ← A-Star Search
│   │   └── utils.js               ← Shared path reconstruction utils
│   ├── helpers/
│   │   └── gridHelper.js          ← Grid init, reset, neighbor logic
│   └── components/
│       ├── Grid.jsx               ← 2D grid renderer
│       ├── Node.jsx               ← Individual cell component
│       ├── Controls.jsx           ← Algorithm picker, speed, actions
│       └── StatsPanel.jsx         ← Live stats display
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> LOCAL.SETUP — RUN ON YOUR MACHINE`

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd pathfinding-visualizer

# 2. Install dependencies
npm install

# 3. Start dev server (Vite HMR)
npm run dev
# → Open http://localhost:5173
```

```bash
# Production build
npm run build

# Preview production bundle
npm run preview
```

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> CONTROLS.MAP — HOW TO USE`

| `ACTION` | `HOW TO DO IT` |
| :------- | :------------- |
| 🟢 Move Start | Click and drag the green start node |
| 🔴 Move Target | Click and drag the red target node |
| 🧱 Draw Walls | Click or drag across empty grid cells |
| ⚖️ Set Weight | Switch to weight mode → click cells |
| ▶️ Run | Select algorithm → press **Start** |
| ⏸️ Pause | Hit **Stop** anytime during animation |
| 🔄 Reset | **Clear** wipes the entire grid |
| ⚡ Speed | Drag the speed slider before or during run |

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> FUTURE.WORK — ROADMAP`

- [ ] Diagonal movement + 8-neighbor support
- [ ] Bi-directional BFS and Dijkstra
- [ ] Jump Point Search (JPS) for large grids
- [ ] Maze generation (Recursive Division, Prim's, DFS)
- [ ] Tie-breaking strategies for A-Star
- [ ] Grid import / export as JSON
- [ ] Step-by-step replay recorder
- [ ] Benchmark mode — random grids, multiple runs, average stats

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> CONTRIBUTION.PROTOCOL`

```bash
# Fork → branch → commit → PR
git checkout -b feature/your-improvement
git add .
git commit -m "feat: describe your change"
git push origin feature/your-improvement
```

Follow code style in `eslint.config.js`. Describe what your PR changes and why.

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

## `> REFERENCES`

- Cormen, Leiserson, Rivest, Stein — *Introduction to Algorithms (CLRS)* — BFS & Dijkstra proofs
- Russell & Norvig — *AI: A Modern Approach* — A-Star and heuristic search
- Hart, Nilsson, Raphael (1968) — Original A-Star research paper

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%"/>

<div align="center">

<!-- Footer Waving Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:020817,40:0c1a3a,70:0e3a6e,100:020817&height=200&section=footer&text=SALIK%20AHMAD&fontSize=52&fontColor=ffffff&animation=twinkling&fontAlignY=45&desc=CS%20Student%20%E2%80%A2%20AI%20%2F%20ML%20Engineer%20%E2%80%A2%20Algorithm%20Enthusiast&descAlignY=68&descSize=16&descColor=67e8f9" width="100%"/>

<br/>

<!-- Footer Typing — fixed: no asterisk, no em-dash, simple ASCII only -->
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=15&duration=3200&pause=1000&color=22D3EE&center=true&vCenter=true&repeat=true&width=860&height=42&lines=Visualizing+algorithms%2C+one+node+at+a+time.;BFS+floods+every+cell.+Dijkstra+weighs+each+step.;A-Star+cuts+straight+to+the+target.;Visit+salikahmad.vercel.app" alt="Footer Typing" />

<br/><br/>

<!-- Skill Capsule -->
<img src="https://capsule-render.vercel.app/api?type=soft&color=0:020817,100:0e3a6e&height=58&text=React%20%20%7C%20%20Vite%20%20%7C%20%20JavaScript%20%20%7C%20%20BFS%20%20%7C%20%20Dijkstra%20%20%7C%20%20A-Star&fontSize=16&fontColor=67e8f9&animation=fadeIn" width="80%"/>

<br/><br/>

<!-- Social Links -->
<a href="https://salikahmad.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Website-salikahmad.vercel.app-22d3ee?style=for-the-badge&labelColor=020817&color=0e3a6e" />
</a>
&nbsp;
<a href="https://www.linkedin.com/in/salik-ahmad-programmer/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=020817" />
</a>
&nbsp;
<a href="https://www.kaggle.com/salikahmad702" target="_blank">
  <img src="https://img.shields.io/badge/Kaggle-Notebooks-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white&labelColor=020817" />
</a>
&nbsp;
<a href="https://github.com/SalikAhmad702" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-Profile-ffffff?style=for-the-badge&logo=github&logoColor=black&labelColor=020817" />
</a>

<br/><br/>

<img src="https://img.shields.io/badge/FOCUS-Algorithms%20%2F%20AI--ML-22d3ee?style=for-the-badge&labelColor=020817" />
&nbsp;
<img src="https://img.shields.io/badge/COURSE-DAA%20Spring%202026-f97316?style=for-the-badge&labelColor=020817" />
&nbsp;
<img src="https://img.shields.io/badge/STACK-React%20%2F%20Vite%20%2F%20JS-6366f1?style=for-the-badge&labelColor=020817" />

<br/><br/>

<sub>⭐ Star this repo if it helped you understand pathfinding algorithms better.</sub>

</div>
