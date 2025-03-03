import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';

const DijkstrasAlgorithmAnimation: React.FC = () => {
  const [graph, setGraph] = useState<{[key: string]: {[key: string]: number}}>({
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 },
  });
  const [distances, setDistances] = useState<{[key: string]: number}>({});
  const [previousNodes, setPreviousNodes] = useState<{[key: string]: string | null}>({});
  const [visited, setVisited] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [source, setSource] = useState<string>('A');
  const [message, setMessage] = useState<string>('');
  
  const intervalRef = useRef<number | null>(null);
  
  // Initialize Dijkstra's algorithm
  const initializeDijkstra = () => {
    const nodes = Object.keys(graph);
    const initialDistances: {[key: string]: number} = {};
    const initialPrevious: {[key: string]: string | null} = {};
    
    nodes.forEach(node => {
      initialDistances[node] = node === source ? 0 : Infinity;
      initialPrevious[node] = null;
    });
    
    setDistances(initialDistances);
    setPreviousNodes(initialPrevious);
    setVisited([]);
    setCurrent(null);
    setStep(0);
    
    // Generate all steps for the animation
    const generatedSteps = generateDijkstraSteps(graph, source);
    setSteps(generatedSteps);
    setMessage('Initialized Dijkstra\'s algorithm. Starting from node ' + source);
  };
  
  // Generate all steps for the Dijkstra's algorithm animation
  const generateDijkstraSteps = (graph: {[key: string]: {[key: string]: number}}, source: string) => {
    const nodes = Object.keys(graph);
    const steps = [];
    
    // Initialize
    const distances: {[key: string]: number} = {};
    const previous: {[key: string]: string | null} = {};
    const visited: string[] = [];
    
    nodes.forEach(node => {
      distances[node] = node === source ? 0 : Infinity;
      previous[node] = null;
    });
    
    // Add initial state
    steps.push({
      distances: {...distances},
      previous: {...previous},
      visited: [...visited],
      current: null,
      message: 'Starting Dijkstra\'s algorithm from node ' + source
    });
    
    // Algorithm steps
    while (visited.length < nodes.length) {
      // Find node with minimum distance
      let minDistance = Infinity;
      let minNode = null;
      
      for (const node of nodes) {
        if (!visited.includes(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          minNode = node;
        }
      }
      
      // If no reachable nodes, break
      if (minNode === null || distances[minNode] === Infinity) {
        steps.push({
          distances: {...distances},
          previous: {...previous},
          visited: [...visited],
          current: null,
          message: 'Some nodes are unreachable from source'
        });
        break;
      }
      
      // Add to visited
      visited.push(minNode);
      
      // Add step for selecting current node
      steps.push({
        distances: {...distances},
        previous: {...previous},
        visited: [...visited],
        current: minNode,
        message: `Selected node ${minNode} with distance ${distances[minNode]}`
      });
      
      // Update distances to neighbors
      for (const neighbor in graph[minNode]) {
        const newDist = distances[minNode] + graph[minNode][neighbor];
        
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = minNode;
          
          // Add step for updating neighbor
          steps.push({
            distances: {...distances},
            previous: {...previous},
            visited: [...visited],
            current: minNode,
            examining: neighbor,
            message: `Updated distance to ${neighbor} via ${minNode} to ${newDist}`
          });
        } else {
          // Add step for examining but not updating neighbor
          steps.push({
            distances: {...distances},
            previous: {...previous},
            visited: [...visited],
            current: minNode,
            examining: neighbor,
            message: `Examined ${neighbor}, but current path is better`
          });
        }
      }
    }
    
    // Add final state
    steps.push({
      distances: {...distances},
      previous: {...previous},
      visited: [...visited],
      current: null,
      message: 'Algorithm complete - shortest paths found'
    });
    
    return steps;
  };
  
  // Reset the animation
  const resetAnimation = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    initializeDijkstra();
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Effect for auto-playing the animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setStep(prevStep => {
          if (prevStep < steps.length - 1) {
            return prevStep + 1;
          } else {
            setIsPlaying(false);
            return prevStep;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps, speed]);
  
  // Effect for updating the state based on the current step
  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const currentStep = steps[step];
      setDistances(currentStep.distances);
      setPreviousNodes(currentStep.previous);
      setVisited(currentStep.visited);
      setCurrent(currentStep.current);
      setMessage(currentStep.message);
    }
  }, [step, steps]);
  
  // Initialize on mount
  useEffect(() => {
    initializeDijkstra();
  }, []);
  
  // Calculate positions for nodes (in a circular layout)
  const nodePositions = () => {
    const nodes = Object.keys(graph);
    const radius = 150;
    const center = { x: 250, y: 200 };
    const positions: {[key: string]: {x: number, y: number}} = {};
    
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      positions[node] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    });
    
    return positions;
  };
  
  const positions = nodePositions();
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Dijkstra's Algorithm Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={togglePlay} className={isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#7e61e9] hover:bg-[#6a50c7]"}>
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button onClick={resetAnimation} className="bg-red-500 hover:bg-red-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-white"
              >
                <option value="2000">Slow</option>
                <option value="1000">Medium</option>
                <option value="500">Fast</option>
                <option value="250">Very Fast</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm font-medium text-gray-600">
            {message}
          </div>
          
          <div className="text-sm text-gray-500">
            Step {step} of {steps.length - 1}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="relative h-[400px] w-full">
          {/* Draw edges */}
          {Object.entries(graph).map(([node, neighbors]) => 
            Object.entries(neighbors).map(([neighbor, weight]) => {
              // Only draw each edge once
              if (node < neighbor) {
                const startPos = positions[node];
                const endPos = positions[neighbor];
                
                // Determine if this edge is part of the shortest path
                const isShortestPath = previousNodes[neighbor] === node || previousNodes[node] === neighbor;
                
                return (
                  <svg 
                    key={`${node}-${neighbor}`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  >
                    <line
                      x1={startPos.x}
                      y1={startPos.y}
                      x2={endPos.x}
                      y2={endPos.y}
                      stroke={isShortestPath ? "#4ade80" : "#d1d5db"}
                      strokeWidth={isShortestPath ? 3 : 1}
                    />
                    <text
                      x={(startPos.x + endPos.x) / 2}
                      y={(startPos.y + endPos.y) / 2}
                      fill="#4b5563"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      className="bg-white px-1"
                    >
                      {weight}
                    </text>
                  </svg>
                );
              }
              return null;
            })
          )}
          
          {/* Draw nodes */}
          {Object.keys(graph).map(node => {
            const pos = positions[node];
            const isVisited = visited.includes(node);
            const isCurrent = node === current;
            const isExamining = steps[step]?.examining === node;
            
            let nodeColor = "bg-blue-100 border-blue-500";
            if (isVisited) nodeColor = "bg-green-100 border-green-500";
            if (isExamining) nodeColor = "bg-yellow-100 border-yellow-500";
            if (isCurrent) nodeColor = "bg-purple-100 border-purple-500";
            if (node === source) nodeColor = "bg-red-100 border-red-500";
            
            return (
              <motion.div
                key={node}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  x: isCurrent ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  x: isCurrent ? { repeat: 0, duration: 0.5 } : undefined
                }}
                className={`absolute w-12 h-12 rounded-full flex items-center justify-center border-2 ${nodeColor}`}
                style={{ left: pos.x - 24, top: pos.y - 24 }}
              >
                <div className="text-lg font-bold">{node}</div>
                <div className="absolute -bottom-8 text-xs bg-white px-1 rounded">
                  {distances[node] === Infinity ? "∞" : distances[node]}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Dijkstra's Algorithm</h4>
            <p className="text-gray-700">
              Dijkstra's algorithm finds the shortest path between nodes in a graph. It works by 
              visiting vertices in order of increasing distance from the source, and for each vertex, 
              relaxing all outgoing edges.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Source Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-500 mr-2"></div>
                <span className="text-gray-700">Current Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2"></div>
                <span className="text-gray-700">Node Being Examined</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">Visited Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border border-blue-500 mr-2"></div>
                <span className="text-gray-700">Unvisited Node</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DijkstrasAlgorithmAnimation;
src/components/animations/MinimumSpanningTreeAnimation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';

const MinimumSpanningTreeAnimation: React.FC = () => {
  const [graph, setGraph] = useState<{[key: string]: {[key: string]: number}}>({
    A: { B: 7, D: 5 },
    B: { A: 7, C: 8, D: 9, E: 7 },
    C: { B: 8, E: 5 },
    D: { A: 5, B: 9, E: 15, F: 6 },
    E: { B: 7, C: 5, D: 15, F: 8, G: 9 },
    F: { D: 6, E: 8, G: 11 },
    G: { E: 9, F: 11 }
  });
  const [mst, setMst] = useState<{[key: string]: {[key: string]: number}}>({});
  const [visited, setVisited] = useState<string[]>([]);
  const [currentEdge, setCurrentEdge] = useState<[string, string] | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [totalWeight, setTotalWeight] = useState<number>(0);
  
  const intervalRef = useRef<number | null>(null);
  
  // Initialize Prim's algorithm for MST
  const initializePrim = () => {
    const nodes = Object.keys(graph);
    
    if (nodes.length === 0) return;
    
    setMst({});
    setVisited([]);
    setCurrentEdge(null);
    setStep(0);
    setTotalWeight(0);
    
    // Generate all steps for the animation
    const generatedSteps = generatePrimSteps(graph);
    setSteps(generatedSteps);
    setMessage('Initialized Prim\'s algorithm for Minimum Spanning Tree');
  };
  
  // Generate all steps for the Prim's algorithm animation
  const generatePrimSteps = (graph: {[key: string]: {[key: string]: number}}) => {
    const nodes = Object.keys(graph);
    const steps = [];
    
    if (nodes.length === 0) return steps;
    
    // Start with first node
    const startNode = nodes[0];
    const visited: string[] = [startNode];
    const mst: {[key: string]: {[key: string]: number}} = {};
    let totalWeight = 0;
    
    // Add initial state
    steps.push({
      visited: [...visited],
      mst: {...mst},
      currentEdge: null,
      message: `Starting Prim's algorithm from node ${startNode}`,
      totalWeight
    });
    
    // Continue until all nodes are in the MST
    while (visited.length < nodes.length) {
      let minWeight = Infinity;
      let nextNode = '';
      let fromNode = '';
      
      // Check all edges from visited nodes to unvisited nodes
      for (const node of visited) {
        for (const neighbor in graph[node]) {
          if (!visited.includes(neighbor) && graph[node][neighbor] < minWeight) {
            minWeight = graph[node][neighbor];
            nextNode = neighbor;
            fromNode = node;
          }
        }
      }
      
      // If no connecting edge found, break (graph may be disconnected)
      if (minWeight === Infinity) {
        steps.push({
          visited: [...visited],
          mst: {...mst},
          currentEdge: null,
          message: 'Graph is disconnected - MST not possible',
          totalWeight
        });
        break;
      }
      
      // Add examining edge step
      steps.push({
        visited: [...visited],
        mst: {...mst},
        currentEdge: [fromNode, nextNode],
        message: `Examining edge ${fromNode}-${nextNode} with weight ${minWeight}`,
        totalWeight,
        examining: true
      });
      
      // Add edge to MST
      if (!mst[fromNode]) mst[fromNode] = {};
      if (!mst[nextNode]) mst[nextNode] = {};
      mst[fromNode][nextNode] = minWeight;
      mst[nextNode][fromNode] = minWeight;
      
      visited.push(nextNode);
      totalWeight += minWeight;
      
      // Add edge added step
      steps.push({
        visited: [...visited],
        mst: {...mst},
        currentEdge: [fromNode, nextNode],
        message: `Added edge ${fromNode}-${nextNode} to MST (weight: ${minWeight})`,
        totalWeight,
        examining: false
      });
    }
    
    // Add final state
    steps.push({
      visited: [...visited],
      mst: {...mst},
      currentEdge: null,
      message: `MST complete with total weight ${totalWeight}`,
      totalWeight
    });
    
    return steps;
  };
  
  // Reset the animation
  const resetAnimation = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    initializePrim();
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Effect for auto-playing the animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setStep(prevStep => {
          if (prevStep < steps.length - 1) {
            return prevStep + 1;
          } else {
            setIsPlaying(false);
            return prevStep;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps, speed]);
  
  // Effect for updating the state based on the current step
  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const currentStep = steps[step];
      setVisited(currentStep.visited);
      setMst(currentStep.mst);
      setCurrentEdge(currentStep.currentEdge);
      setMessage(currentStep.message);
      setTotalWeight(currentStep.totalWeight);
    }
  }, [step, steps]);
  
  // Initialize on mount
  useEffect(() => {
    initializePrim();
  }, []);
  
  // Calculate positions for nodes (in a circular layout)
  const nodePositions = () => {
    const nodes = Object.keys(graph);
    const radius = 150;
    const center = { x: 250, y: 200 };
    const positions: {[key: string]: {x: number, y: number}} = {};
    
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      positions[node] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    });
    
    return positions;
  };
  
  const positions = nodePositions();
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Minimum Spanning Tree Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={togglePlay} className={isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#7e61e9] hover:bg-[#6a50c7]"}>
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button onClick={resetAnimation} className="bg-red-500 hover:bg-red-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-white"
              >
                <option value="2000">Slow</option>
                <option value="1000">Medium</option>
                <option value="500">Fast</option>
                <option value="250">Very Fast</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm font-medium text-gray-600">
            {message}
          </div>
          
          <div className="text-sm text-gray-500">
            Step {step} of {steps.length - 1}
            {totalWeight > 0 && <span className="ml-4">Total MST Weight: {totalWeight}</span>}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="relative h-[400px] w-full">
          {/* Draw all edges (gray) */}
          {Object.entries(graph).map(([node, neighbors]) => 
            Object.entries(neighbors).map(([neighbor, weight]) => {
              // Only draw each edge once
              if (node < neighbor) {
                const startPos = positions[node];
                const endPos = positions[neighbor];
                
                // Determine if this edge is in the MST
                const inMST = mst[node]?.[neighbor] !== undefined;
                
                // Determine if this is the current edge being considered
                const isCurrentEdge = currentEdge && 
                  ((currentEdge[0] === node && currentEdge[1] === neighbor) || 
                   (currentEdge[0] === neighbor && currentEdge[1] === node));
                
                const examining = steps[step]?.examining && isCurrentEdge;
                
                let strokeColor = "#d1d5db"; // Default gray
                let strokeWidth = 1;
                
                if (examining) {
                  strokeColor = "#facc15"; // Yellow for examining
                  strokeWidth = 3;
                } else if (isCurrentEdge) {
                  strokeColor = "#ec4899"; // Pink for current edge
                  strokeWidth = 3;
                } else if (inMST) {
                  strokeColor = "#4ade80"; // Green for MST
                  strokeWidth = 3;
                }
                
                return (
                  <svg 
                    key={`${node}-${neighbor}`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  >
                    <line
                      x1={startPos.x}
                      y1={startPos.y}
                      x2={endPos.x}
                      y2={endPos.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                    />
                    <text
                      x={(startPos.x + endPos.x) / 2}
                      y={(startPos.y + endPos.y) / 2}
                      fill="#4b5563"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      className="bg-white px-1"
                    >
                      {weight}
                    </text>
                  </svg>
                );
              }
              return null;
            })
          )}
          
          {/* Draw nodes */}
          {Object.keys(graph).map(node => {
            const pos = positions[node];
            const isVisited = visited.includes(node);
            
            let nodeColor = "bg-blue-100 border-blue-500"; // Unvisited
            if (isVisited) {
              nodeColor = "bg-green-100 border-green-500"; // In MST
            }
            if (node === visited[0]) {
              nodeColor = "bg-red-100 border-red-500"; // Start node
            }
            
            return (
              <motion.div
                key={node}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute w-12 h-12 rounded-full flex items-center justify-center border-2 ${nodeColor}`}
                style={{ left: pos.x - 24, top: pos.y - 24 }}
              >
                <div className="text-lg font-bold">{node}</div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Minimum Spanning Tree</h4>
            <p className="text-gray-700">
              A Minimum Spanning Tree (MST) is a subset of edges from a connected, weighted graph that connects all
              vertices together with the minimum possible total edge weight, without forming cycles.
            </p>
            <p className="text-gray-700 mt-2">
              This visualization uses Prim's algorithm, which grows the MST one vertex at a time, starting from an
              arbitrary vertex and at each step adding the lowest-weight edge that connects a vertex in the MST to a
              vertex outside it.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Starting Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">Node in MST</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border border-blue-500 mr-2"></div>
                <span className="text-gray-700">Node not in MST</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2" style={{backgroundColor: "#4ade80"}}></div>
                <span className="text-gray-700">Edge in MST</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2" style={{backgroundColor: "#facc15"}}></div>
                <span className="text-gray-700">Edge being examined</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MinimumSpanningTreeAnimation;
src/components/animations/GreedyBestFirstSearchAnimation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';

const GreedyBestFirstSearchAnimation: React.FC = () => {
  const [graph, setGraph] = useState<{[key: string]: string[]}>({
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'H'],
    F: ['C', 'G'],
    G: ['F'],
    H: ['E', 'I'],
    I: ['H']
  });
  
  // Heuristic values (estimated distance to goal)
  const [heuristic, setHeuristic] = useState<{[key: string]: number}>({
    A: 8,
    B: 4,
    C: 3,
    D: 5,
    E: 2,
    F: 1,
    G: 6,
    H: 3,
    I: 0  // Goal node has heuristic of 0
  });
  
  const [startNode, setStartNode] = useState<string>('A');
  const [goalNode, setGoalNode] = useState<string>('I');
  const [visited, setVisited] = useState<string[]>([]);
  const [frontier, setFrontier] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [parentMap, setParentMap] = useState<{[key: string]: string}>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  const intervalRef = useRef<number | null>(null);
  
  // Initialize Greedy Best-First Search
  const initializeSearch = () => {
    setVisited([]);
    setFrontier([startNode]);
    setCurrent(null);
    setPath([]);
    setParentMap({});
    setStep(0);
    setIsComplete(false);
    
    // Generate all steps for the animation
    const generatedSteps = generateSearchSteps(graph, startNode, goalNode, heuristic);
    setSteps(generatedSteps);
    setMessage('Initialized Greedy Best-First Search algorithm');
  };
  
  // Generate all steps for the Greedy Best-First Search animation
  const generateSearchSteps = (
    graph: {[key: string]: string[]}, 
    start: string, 
    goal: string, 
    heuristic: {[key: string]: number}
  ) => {
    const steps = [];
    const visited: string[] = [];
    const frontier: string[] = [start];
    const parentMap: {[key: string]: string} = {};
    
    // Add initial state
    steps.push({
      visited: [...visited],
      frontier: [...frontier],
      current: null,
      path: [],
      parentMap: {...parentMap},
      message: `Starting Greedy Best-First Search from node ${start} to ${goal}`
    });
    
    let pathFound = false;
    
    while (frontier.length > 0 && !pathFound) {
      // Sort frontier based on heuristic values (lowest first)
      frontier.sort((a, b) => heuristic[a] - heuristic[b]);
      
      // Get the node with the lowest heuristic value
      const current = frontier.shift()!;
      visited.push(current);
      
      // Add step for selecting current node
      steps.push({
        visited: [...visited],
        frontier: [...frontier],
        current,
        path: [],
        parentMap: {...parentMap},
        message: `Selected node ${current} with heuristic value ${heuristic[current]}`
      });
      
      // Check if goal reached
      if (current === goal) {
        // Reconstruct path
        const path: string[] = [];
        let curr = current;
        while (curr) {
          path.unshift(curr);
          curr = parentMap[curr];
        }
        
        // Add goal reached step
        steps.push({
          visited: [...visited],
          frontier: [...frontier],
          current,
          path,
          parentMap: {...parentMap},
          message: `Goal reached! Path: ${path.join(' → ')}`,
          isComplete: true
        });
        
        pathFound = true;
        break;
      }
      
      // Process neighbors
      for (const neighbor of graph[current]) {
        if (!visited.includes(neighbor) && !frontier.includes(neighbor)) {
          frontier.push(neighbor);
          parentMap[neighbor] = current;
          
          // Add step for adding neighbor to frontier
          steps.push({
            visited: [...visited],
            frontier: [...frontier],
            current,
            examining: neighbor,
            path: [],
            parentMap: {...parentMap},
            message: `Added ${neighbor} to frontier with heuristic ${heuristic[neighbor]}`
          });
        }
      }
      
      // If frontier is empty and goal not reached
      if (frontier.length === 0 && !pathFound) {
        steps.push({
          visited: [...visited],
          frontier: [],
          current: null,
          path: [],
          parentMap: {...parentMap},
          message: `No path found from ${start} to ${goal}`,
          isComplete: true
        });
      }
    }
    
    return steps;
  };
  
  // Reset the animation
  const resetAnimation = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    initializeSearch();
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Effect for auto-playing the animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setStep(prevStep => {
          if (prevStep < steps.length - 1) {
            return prevStep + 1;
          } else {
            setIsPlaying(false);
            return prevStep;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps, speed]);
  
  // Effect for updating the state based on the current step
  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const currentStep = steps[step];
      setVisited(currentStep.visited);
      setFrontier(currentStep.frontier);
      setCurrent(currentStep.current);
      setParentMap(currentStep.parentMap);
      setMessage(currentStep.message);
      setPath(currentStep.path || []);
      setIsComplete(currentStep.isComplete || false);
    }
  }, [step, steps]);
  
  // Initialize on mount
  useEffect(() => {
    initializeSearch();
  }, []);
  
  // Calculate positions for nodes (in a grid layout)
  const nodePositions = () => {
    const gridSize = 3; // 3x3 grid
    const cellSize = 100;
    const startX = 100;
    const startY = 100;
    const positions: {[key: string]: {x: number, y: number}} = {
      A: { x: startX, y: startY },
      B: { x: startX + cellSize, y: startY },
      C: { x: startX + 2 * cellSize, y: startY },
      D: { x: startX, y: startY + cellSize },
      E: { x: startX + cellSize, y: startY + cellSize },
      F: { x: startX + 2 * cellSize, y: startY + cellSize },
      G: { x: startX, y: startY + 2 * cellSize },
      H: { x: startX + cellSize, y: startY + 2 * cellSize },
      I: { x: startX + 2 * cellSize, y: startY + 2 * cellSize },
    };
    
    return positions;
  };
  
  const positions = nodePositions();
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Greedy Best-First Search Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={togglePlay} className={isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#7e61e9] hover:bg-[#6a50c7]"}>
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button onClick={resetAnimation} className="bg-red-500 hover:bg-red-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-white"
              >
                <option value="2000">Slow</option>
                <option value="1000">Medium</option>
                <option value="500">Fast</option>
                <option value="250">Very Fast</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm font-medium text-gray-600">
            {message}
          </div>
          
          <div className="text-sm text-gray-500">
            Step {step} of {steps.length - 1}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="relative h-[400px] w-full">
          {/* Draw edges */}
          {Object.entries(graph).map(([node, neighbors]) =>
            neighbors.map(neighbor => {
              // Only draw each edge once (avoid duplicates)
              if (node < neighbor) {
                const startPos = positions[node];
                const endPos = positions[neighbor];
                
                // Determine if this edge is part of the final path
                const isPathEdge = path.length > 1 && path.some((n, i) => 
                  i < path.length - 1 && 
                  ((path[i] === node && path[i+1] === neighbor) || 
                   (path[i] === neighbor && path[i+1] === node))
                );
                
                // Determine if this edge connects current node to its parent
                const isCurrentParentEdge = current && parentMap[current] && 
                  ((node === current && neighbor === parentMap[current]) || 
                   (node === parentMap[current] && neighbor === current));
                
                let edgeColor = "#d1d5db"; // Default gray
                let edgeWidth = 1;
                
                if (isPathEdge) {
                  edgeColor = "#4ade80"; // Green for final path
                  edgeWidth = 3;
                } else if (isCurrentParentEdge) {
                  edgeColor = "#ec4899"; // Pink
                  edgeWidth = 2;
                }
                
                return (
                  <svg 
                    key={`${node}-${neighbor}`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  >
                    <line
                      x1={startPos.x}
                      y1={startPos.y}
                      x2={endPos.x}
                      y2={endPos.y}
                      stroke={edgeColor}
                      strokeWidth={edgeWidth}
                    />
                  </svg>
                );
              }
              return null;
            })
          )}
          
          {/* Draw nodes */}
          {Object.keys(positions).map(node => {
            const pos = positions[node];
            const isStart = node === startNode;
            const isGoal = node === goalNode;
            const isVisited = visited.includes(node);
            const isCurrent = node === current;
            const isInFrontier = frontier.includes(node);
            const isExamining = steps[step]?.examining === node;
            const isInPath = path.includes(node);
            
            let nodeColor = "bg-blue-100 border-blue-500"; // Default
            if (isGoal) nodeColor = "bg-green-100 border-green-500";
            if (isStart) nodeColor = "bg-red-100 border-red-500";
            if (isInFrontier) nodeColor = "bg-yellow-100 border-yellow-500";
            if (isVisited) nodeColor = "bg-purple-100 border-purple-500";
            if (isCurrent) nodeColor = "bg-indigo-100 border-indigo-500";
            if (isExamining) nodeColor = "bg-orange-100 border-orange-500";
            if (isInPath) nodeColor = "bg-lime-200 border-lime-600";
            
            return (
              <motion.div
                key={node}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  x: isCurrent ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  x: isCurrent ? { repeat: 0, duration: 0.5 } : undefined
                }}
                className={`absolute w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 ${nodeColor}`}
                style={{ left: pos.x - 24, top: pos.y - 24 }}
              >
                <div className="text-lg font-bold">{node}</div>
                <div className="text-xs">{heuristic[node]}</div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Greedy Best-First Search</h4>
            <p className="text-gray-700">
              Greedy Best-First Search is an informed search algorithm that uses a heuristic function to estimate
              the cost from the current node to the goal. At each step, it expands the node that appears to be closest
              to the goal, based solely on the heuristic.
            </p>
            <p className="text-gray-700 mt-2">
              Unlike A* search, Greedy Best-First Search does not consider the cost to reach the current node,
              making it potentially faster but not guaranteed to find the shortest path.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Start Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">Goal Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-indigo-100 border border-indigo-500 mr-2"></div>
                <span className="text-gray-700">Current Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2"></div>
                <span className="text-gray-700">Frontier Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-500 mr-2"></div>
                <span className="text-gray-700">Visited Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-lime-200 border border-lime-600 mr-2"></div>
                <span className="text-gray-700">Path Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border border-blue-500 mr-2"></div>
                <span className="text-gray-700">Unexplored Node</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">The number inside each node is its heuristic value</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GreedyBestFirstSearchAnimation;
Now, let's update the AlgorithmDetail.tsx page to use our new animations:

src/pages/AlgorithmDetail.tsx
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectionSortAnimation from "@/components/animations/SelectionSortAnimation";
import DijkstrasAlgorithmAnimation from "@/components/animations/DijkstrasAlgorithmAnimation";
import MinimumSpanningTreeAnimation from "@/components/animations/MinimumSpanningTreeAnimation";
import GreedyBestFirstSearchAnimation from "@/components/animations/GreedyBestFirstSearchAnimation";
import { topicDetails } from "@/data/topics";

const AlgorithmDetail = () => {
  const { id } = useParams();
  
  // Find the corresponding topic from our data
  const findTopicDetail = () => {
    if (!id) return null;
    
    // Split the ID to get the field and topic
    const [field, topic] = id.split('/');
    if (!field || !topic) return null;
    
    const fullId = topic;
    return topicDetails[fullId] || null;
  };

  const topicDetail = findTopicDetail();

  // Fallback content for algorithms that don't have specific implementations
  const defaultContent = {
    title: id ? id.split('/').pop() : "Algorithm",
    aim: "Understanding the core concepts and implementation details of this algorithm.",
    theory: "Detailed explanation of the algorithm's working principles and concepts.",
    implementation: `// Example implementation
function algorithm(input) {
  // Implementation details
  return result;
}`
  };

  // Get the content for the current algorithm
  const content = topicDetail || defaultContent;

  const renderAnimation = () => {
    if (!id) return null;
    
    // Render the appropriate animation based on the algorithm ID
    if (id === "data-structures/selection-sort") {
      return <SelectionSortAnimation />;
    } else if (id === "data-structures/minimum-spanning-trees") {
      return <MinimumSpanningTreeAnimation />;
    } else if (id === "data-structures/dijkstra") {
      return <DijkstrasAlgorithmAnimation />;
    } else if (id === "artificial-intelligence/greedy-best-first") {
      return <GreedyBestFirstSearchAnimation />;
    }
    
    // Default animation placeholder
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p>Animation for {id.split('/').pop()} will be available soon!</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <nav className="mb-8">
            <a href="/computer-science" className="text-primary hover:underline">
              ← Back to Computer Science Topics
            </a>
          </nav>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
            
            <Tabs defaultValue="aim" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="aim">Aim & Objective</TabsTrigger>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="animation">Animation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="aim" className="space-y-4">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Aim & Objective</h2>
                  <p className="text-gray-600">
                    {content.aim || "To understand the implementation and working of this algorithm."}
                  </p>
                  <p className="text-gray-600 mt-4">
                    {content.objective || "Learn how to implement and use this algorithm to solve various problems."}
                  </p>
                </section>
              </TabsContent>
              
              <TabsContent value="theory">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Theory</h2>
                  <div className="text-gray-600 space-y-4 whitespace-pre-line">
                    {content.theory || "Detailed theory for this algorithm will be available soon."}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="implementation">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Implementation</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      {content.implementation || "// Implementation coming soon"}
                    </pre>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="animation">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Animation</h2>
                  {renderAnimation()}
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgorithmDetail;
Now, let's finalize our work by updating the topic details to ensure our new animations can be accessed from the UI:

src/data/topics.ts
// ... keep existing code (import statements, interfaces) 

export const ComputerScienceFields: FieldType[] = [
  {
    id: "data-structures",
    title: "Data Structures",
    topics: [
      {
        id: "stack",
        title: "Stack",
        description: "A linear data structure that follows the LIFO principle",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "linked-list",
        title: "Linked List",
        description: "A linear data structure where elements are stored in nodes",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "binary-search",
        title: "Binary Search",
        description: "An efficient search algorithm that works on sorted arrays",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "selection-sort",
        title: "Selection Sort",
        description: "A simple comparison-based sorting algorithm",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "radix-sort",
        title: "Radix Sort",
        description: "A non-comparative sorting algorithm that sorts data with integer keys",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "topological-sort",
        title: "Topological Sort",
        description: "A linear ordering of vertices in a directed acyclic graph",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "minimum-spanning-trees",
        title: "Minimum Spanning Trees",
        description: "A subset of edges that connects all vertices with minimum total edge weight",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "dijkstra",
        title: "Dijkstra's Algorithm",
        description: "An algorithm for finding the shortest paths between nodes in a graph",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "red-black-tree",
        title: "Red Black Tree",
        description: "A self-balancing binary search tree",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      }
    ]
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    topics: [
      {
        id: "policy-iteration",
        title: "Policy Iteration",
        description: "An algorithm to find the optimal policy in reinforcement learning",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "value-iteration",
        title: "Value Iteration",
        description: "An algorithm to find the optimal value function in reinforcement learning",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "q-learning",
        title: "Q-Learning",
        description: "A model-free reinforcement learning algorithm",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "dfs",
        title: "AI Depth First Search",
        description: "A search algorithm used for traversing tree or graph data structures",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "greedy-best-first",
        title: "Greedy Best First Search",
        description: "A search algorithm that expands the most promising node",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "bayesian-network",
        title: "Construction of Bayesian Network",
        description: "A probabilistic graphical model that represents variables and their dependencies",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      }
    ]
  }
];

export const topicDetails: Record<string, TopicDetail> = {
  // ... keep existing code (keep existing topic details)
  
  "dijkstra": {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    aim: "To understand and implement Dijkstra's algorithm for finding shortest paths in a graph.",
    objective: "Learn how to efficiently find the shortest path from a source node to all other nodes in a weighted graph.",
    theory: `Dijkstra's algorithm is a popular algorithm used to find the shortest path between nodes in a graph. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

The algorithm finds the shortest path tree from a single source node, producing the shortest path from the source to every other node in the graph. It can be used for graphs with non-negative edge weights.

Key characteristics:
- Works on both directed and undirected graphs
- Requires all edge weights to be non-negative
- Uses a greedy approach, always choosing the nearest unvisited vertex
- Has a time complexity of O(V²) using an adjacency matrix, or O(E + V log V) using a priority queue
- Widely used in routing protocols, GPS navigation, robotics, and network optimization

The basic algorithm works as follows:
1. Assign a tentative distance value to every vertex: 0 for the source, infinity for all others
2. Mark all vertices as unvisited
3. Set the source vertex as the current vertex
4. For the current vertex, consider all its unvisited neighbors and calculate their tentative distances by adding the edge weight to the current vertex's distance
5. If this distance is less than the previously recorded tentative distance, update it
6. When all neighbors are considered, mark the current vertex as visited
7. If the destination vertex has been marked visited or if the smallest tentative distance among unvisited vertices is infinity (indicating unreachable vertices), stop
8. Otherwise, select the unvisited vertex with the smallest tentative distance as the new current vertex and go back to step 4`,
    implementation: `
// Implementation of Dijkstra's algorithm
function dijkstra(graph, source) {
  // Initialize distances with infinity for all vertices except source
  const distances = {};
  const previous = {};
  const vertices = Object.keys(graph);
  const unvisited = new Set(vertices);
  
  vertices.forEach(vertex => {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  });
  
  distances[source] = 0;
  
  // Main algorithm loop
  while (unvisited.size > 0) {
    // Find vertex with minimum distance
    let current = null;
    let minDistance = Infinity;
    
    for (const vertex of unvisited) {
      if (distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        current = vertex;
      }
    }
    
    // If no reachable vertices remain, break
    if (current === null || distances[current] === Infinity) {
      break;
    }
    
    // Remove current from unvisited
    unvisited.delete(current);
    
    // Update distances to neighbors
    for (const neighbor in graph[current]) {
      if (unvisited.has(neighbor)) {
        const alt = distances[current] + graph[current][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
  }
  
  return { distances, previous };
}

// Example usage:
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2, F: 6 },
  E: { C: 10, D: 2, F: 3 },
  F: { D: 6, E: 3 }
};

const result = dijkstra(graph, 'A');
console.log("Distances from A:", result.distances);

// Reconstruct path from A to F
function getPath(previous, start, end) {
  const path = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path;
}

console.log("Path from A to F:", getPath(result.previous, 'A', 'F'));
    `,
    difficulty: "Hard",
    test: {
      questions: [
        {
          question: "What is the time complexity of Dijkstra's algorithm using a priority queue?",
          options: ["O(V²)", "O(E log V)", "O(E + V log V)", "O(V + E)"],
          answer: 2
        },
        {
          question: "Dijkstra's algorithm can work on graphs with negative edge weights.",
          options: ["True", "False"],
          answer: 1
        },
        {
          question: "What data structure is commonly used to efficiently implement Dijkstra's algorithm?",
          options: ["Stack", "Queue", "Priority Queue", "Linked List"],
          answer: 2
        }
      ]
    }
  },
  
  "minimum-spanning-trees": {
    id: "minimum-spanning-trees",
    title: "Minimum Spanning Trees",
    aim: "To understand the concept of minimum spanning trees and how to find them in connected, weighted graphs.",
    objective: "Learn how to implement algorithms like Prim's and Kruskal's to find the minimum spanning tree of a graph.",
    theory: `A Minimum Spanning Tree (MST) is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together without any cycles and with the minimum possible total edge weight.

An MST has several important properties:
- It includes exactly n-1 edges, where n is the number of vertices
- It contains no cycles (it's a tree)
- It's a spanning tree (connects all vertices)
- The sum of edge weights is minimized

Two classical algorithms for finding MSTs are:

1. Prim's Algorithm:
   - Starts with a single vertex and grows the MST one vertex at a time
   - In each step, adds the lowest-weight edge that connects a vertex in the MST to a vertex outside it
   - Uses a priority queue to efficiently find the next edge to add
   - Works well for dense graphs

2. Kruskal's Algorithm:
   - Sorts all edges by weight and processes them in ascending order
   - For each edge, adds it to the MST if it doesn't create a cycle
   - Uses a disjoint-set data structure (Union-Find) to detect cycles
   - Works well for sparse graphs

MSTs have many applications, including:
- Network design (minimizing the cost of connecting all points)
- Approximation algorithms for NP-hard problems like the Traveling Salesman Problem
- Cluster analysis in data mining
- Image segmentation in computer vision`,
    implementation: `
// Implementation of Prim's algorithm for MST
function primMST(graph) {
  const vertices = Object.keys(graph);
  if (vertices.length === 0) return { mst: {}, totalWeight: 0 };
  
  // Initialize variables
  const mst = {};
  const visited = new Set();
  let totalWeight = 0;
  
  // Start with the first vertex
  const startVertex = vertices[0];
  visited.add(startVertex);
  
  // Continue until all vertices are in the MST
  while (visited.size < vertices.length) {
    let minWeight = Infinity;
    let minEdge = null;
    
    // Find the minimum-weight edge connecting a visited and an unvisited vertex
    for (const vertex of visited) {
      for (const neighbor in graph[vertex]) {
        if (!visited.has(neighbor) && graph[vertex][neighbor] < minWeight) {
          minWeight = graph[vertex][neighbor];
          minEdge = [vertex, neighbor];
        }
      }
    }
    
    // If no connecting edge found, graph is disconnected
    if (minEdge === null) {
      console.log("Graph is disconnected");
      break;
    }
    
    // Add the edge to the MST
    const [from, to] = minEdge;
    if (!mst[from]) mst[from] = {};
    if (!mst[to]) mst[to] = {};
    mst[from][to] = minWeight;
    mst[to][from] = minWeight;
    
    // Mark the new vertex as visited
    visited.add(to);
    totalWeight += minWeight;
  }
  
  return { mst, totalWeight };
}

// Example usage:
const graph = {
  A: { B: 7, D: 5 },
  B: { A: 7, C: 8, D: 9, E: 7 },
  C: { B: 8, E: 5 },
  D: { A: 5, B: 9, E: 15, F: 6 },
  E: { B: 7, C: 5, D: 15, F: 8, G: 9 },
  F: { D: 6, E: 8, G: 11 },
  G: { E: 9, F: 11 }
};

const result = primMST(graph);
console.log("Minimum Spanning Tree:", result.mst);
console.log("Total Weight:", result.totalWeight);

// Function to print the edges in the MST
function printMSTEdges(mst) {
  const edges = [];
  for (const vertex in mst) {
    for (const neighbor in mst[vertex]) {
      // Print each edge only once
      if (vertex < neighbor) {
        edges.push(\`\${vertex}-\${neighbor}: \${mst[vertex][neighbor]}\`);
      }
    }
  }
  return edges;
}

console.log("MST Edges:", printMSTEdges(result.mst));
    `,
    difficulty: "Hard",
    test: {
      questions: [
        {
          question: "How many edges does a minimum spanning tree have for a graph with n vertices?",
          options: ["n", "n-1", "n+1", "2n"],
          answer: 1
        },
        {
          question: "Which of these algorithms can find a minimum spanning tree?",
          options: ["Dijkstra's Algorithm", "Prim's Algorithm", "Breadth-First Search", "Depth-First Search"],
          answer: 1
        },
        {
          question: "A minimum spanning tree contains cycles.",
          options: ["True", "False"],
          answer: 1
        }
      ]
    }
  },
  
  "greedy-best-first": {
    id: "greedy-best-first",
    title: "Greedy Best-First Search",
    aim: "To understand how Greedy Best-First Search works as an informed search algorithm.",
    objective: "Learn how to implement Greedy Best-First Search for pathfinding in various applications.",
    theory: `Greedy Best-First Search is an informed search algorithm that uses a heuristic to guide its exploration. Unlike uninformed search methods like breadth-first or depth-first search, it leverages additional knowledge about the problem domain to make more intelligent decisions about which paths to explore.

Key characteristics:
- Expands the most promising node first, determined by a heuristic function h(n)
- The heuristic h(n) estimates the cost from the current node to the goal
- Always chooses the path that appears best at the moment
- Does not consider the cost of reaching the current node (unlike A* search)
- Is not guaranteed to find the optimal (shortest) path
- Often faster than uninformed search methods

The algorithm works as follows:
1. Maintain a priority queue (frontier) ordered by the heuristic value h(n)
2. Start by adding the initial state to the frontier
3. Until the goal is reached or the frontier is empty:
   a. Remove the node with the lowest h(n) value from the frontier
   b. If this node is the goal, return the solution
   c. Otherwise, expand the node and add its children to the frontier
   d. For each child, calculate the heuristic value h(n)
   e. Sort the frontier based on these heuristic values

Greedy Best-First Search is "greedy" because it always follows the most promising path without considering the cost incurred so far. This can lead to suboptimal solutions when the heuristic is misleading, but it often finds a reasonable solution quickly.

Common applications include:
- Path finding in games and robotics
- Puzzle solving
- Network routing
- As a component in more complex algorithms like A*`,
    implementation: `
// Implementation of Greedy Best-First Search
function greedyBestFirstSearch(graph, start, goal, heuristic) {
  // Priority queue (frontier) ordered by heuristic value
  const frontier = [start];
  // To track the path
  const cameFrom = {};
  // To avoid revisiting nodes
  const visited = new Set();
  
  while (frontier.length > 0) {
    // Sort frontier by heuristic value (lowest first)
    frontier.sort((a, b) => heuristic[a] - heuristic[b]);
    
    // Get the node with the lowest heuristic value
    const current = frontier.shift();
    
    // If goal is reached, reconstruct and return the path
    if (current === goal) {
      return reconstructPath(cameFrom, start, goal);
    }
    
    // Mark as visited
    visited.add(current);
    
    // Explore neighbors
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor) && !frontier.includes(neighbor)) {
        frontier.push(neighbor);
        cameFrom[neighbor] = current;
      }
    }
  }
  
  // No path found
  return null;
}

// Helper function to reconstruct the path
function reconstructPath(cameFrom, start, goal) {
  const path = [goal];
  let current = goal;
  
  while (current !== start) {
    current = cameFrom[current];
    path.unshift(current);
  }
  
  return path;
}

// Example usage:
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'H'],
  F: ['C', 'G'],
  G: ['F'],
  H: ['E', 'I'],
  I: ['H']
};

// Heuristic values (estimated distance to goal)
const heuristic = {
  A: 8,
  B: 4,
  C: 3,
  D: 5,
  E: 2,
  F: 1,
  G: 6,
  H: 3,
  I: 0  // Goal node has heuristic of 0
};

const path = greedyBestFirstSearch(graph, 'A', 'I', heuristic);
console.log("Path from A to I:", path);
    `,
    difficulty: "Medium",
    test: {
      questions: [
        {
          question: "What does Greedy Best-First Search use to guide its search?",
          options: ["Random selection", "Depth of the node", "A heuristic function", "Breadth-first ordering"],
          answer: 2
        },
        {
          question: "Greedy Best-First Search always finds the optimal (shortest) path.",
          options: ["True", "False"],
          answer: 1
        },
        {
          question: "How does Greedy Best-First Search differ from A* search?",
          options: [
            "It doesn't use a heuristic", 
            "It doesn't consider the cost to reach the current node", 
            "It expands nodes in a random order", 
            "It cannot find a valid path"
          ],
          answer: 1
        }
      ]
    }
  }
};