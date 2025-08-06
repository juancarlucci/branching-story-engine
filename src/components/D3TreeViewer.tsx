// import Tree from "react-d3-tree";
// import type { RawNodeDatum, RenderCustomNodeElementFn } from "react-d3-tree";
// import { useLayoutEffect, useMemo, useRef, useState } from "react";
// import type { TreeNode } from "../types";

// interface Props {
//   root: TreeNode;
//   currentId?: number;
//   visited?: number[];
// }

// function convertToD3Tree(node: TreeNode, currentId?: number): RawNodeDatum {
//   return {
//     name: node.value === currentId ? `🔸${node.value}🔸` : `${node.value}`,
//     children: node.children?.map((child) => convertToD3Tree(child, currentId)),
//   };
// }

// export default function D3TreeViewer({ root, currentId, visited = [] }: Props) {
//   const d3Data = useMemo(
//     () => convertToD3Tree(root, currentId),
//     [root, currentId]
//   );
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 500, height: 600 });
//   const isMobile = window.innerWidth < 768;

//   useLayoutEffect(() => {
//     //* Because D3 uses SVG layout, sizing must be set before paint — not after.
//     //* So cannot use useEffect, instead must use useLayoutEffect.
//     const element = containerRef.current;
//     if (element) {
//       const { width, height } = element.getBoundingClientRect();
//       setDimensions({ width, height });
//       console.log("Tree container dimensions:", width, height);
//     }
//   }, []);

//   //*  This highlights current/visited nodes with different colors for learning
//   const renderCustomNode: RenderCustomNodeElementFn = ({ nodeDatum }) => {
//     const value = Number(nodeDatum.name.replace(/\D/g, ""));
//     const isCurrent = value === currentId;
//     const isVisited = visited?.includes(value);

//     let fill = "#4b5563";
//     if (isCurrent) fill = "#facc15";
//     else if (isVisited) fill = "#10b981";

//     return (
//       <g>
//         <circle r={15} fill={fill} stroke="white" />
//         <text fill="#fff" stroke="none" x={-5} y={5}>
//           {value}
//         </text>
//       </g>
//     );
//   };

//   return (
//     <div ref={containerRef} className="tree-viewer">
//       <div style={{ width: "100%", height: "100%"}}>
//         {dimensions.width > 0 && (
//           <Tree
//         data={d3Data}
//         orientation="vertical"
//         pathFunc="elbow"
//         zoomable={false}
//         translate={{
//             x: dimensions.width / 2,
//             y: dimensions.height / 5,
//           }}
//         nodeSize={{
//           x: isMobile ? 60 : 160,
//           y: isMobile ? 40 : 110,
//         }}
//         renderCustomNodeElement={renderCustomNode}
//         separation={{ siblings: 1, nonSiblings: 2 }}
//       />
//         )}
//       </div>
//     </div>
//   );
// }
