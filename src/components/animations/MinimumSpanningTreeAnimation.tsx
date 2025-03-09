import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw, SkipForward, SkipBack } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Edge = {
  source: string;
  target: string;
  weight: number;
};

type Step = {
  mst: Edge[];
  currentEdge?: Edge;
  rejected?: boolean;
  message: string;
  complete?: boolean;
};

const MinimumSpanningTreeAnimation: React.FC = () => {
  // Graph represented as a list of edges with weights
  const [edges, setEdges] = useState<Edge[]>([
    { source: 'A', target: 'B', weight: 7 },
    { source: 'A', target: 'D', weight: 5 },
    { source: 'B', target: 'C', weight: 8 },
    { source: 'B', target: 'D', weight: 9 },
    { source: 'B', target: 'E', weight: 7 },
    { source: 'C', target: 'E', weight: 5 },
    { source: 'D', target: 'E', weight: 15 },
    { source: 'D', target: 'F', weight: 6 },
    { source: 'E', target: 'F', weight: 8 },
    { source: 'E', target: 'G', weight: 9 },
    { source: 'F', target: 'G', weight: 11 }
  ]);

  // Set of all nodes (vertices) in the graph
  const [nodes, setNodes] = useState<string[]>([]);

  // Animation state
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  
  const intervalRef = useRef<number | null>(null);

  // Get all unique nodes from edges
  const extractNodes = (edges: Edge[]) => {
    const nodeSet = new Set<string>();
    edges.forEach(edge => {
      nodeSet.add(edge.source);
      nodeSet.add(edge.target);
    });
    return [...nodeSet].sort();
  };

  // Kruskal's algorithm to find the MST
  const kruskalMST = () => {
    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const steps: Step[] = [];
    
    // Disjoint set operations
    const parent: { [key: string]: string } = {};
    const rank: { [key: string]: number } = {};
    
    // Initialize disjoint sets
    nodes.forEach(node => {
      parent[node] = node;
      rank[node] = 0;
    });
    
    // Find operation with path compression
    const find = (node: string): string => {
      if (parent[node] !== node) {
        parent[node] = find(parent[node]);
      }
      return parent[node];
    };
    
    // Union operation with rank
    const union = (x: string, y: string) => {
      const rootX = find(x);
      const rootY = find(y);
      
      if (rootX === rootY) return;
      
      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
    };
    
    // Add initial step
    steps.push({
      mst: [],
      message: "Starting Kruskal's algorithm with an empty MST"
    });
    
    const mst: Edge[] = [];
    let totalMstWeight = 0;
    
    // Process each edge in sorted order
    for (const edge of sortedEdges) {
      const { source, target, weight } = edge;
      
      // If including this edge doesn't form a cycle
      if (find(source) !== find(target)) {
        union(source, target);
        mst.push(edge);
        totalMstWeight += weight;
        
        // Add step for accepting an edge
        steps.push({
          mst: [...mst],
          currentEdge: edge,
          message: `Added edge ${source}-${target} with weight ${weight} to MST`,
          complete: mst.length === nodes.length - 1
        });
      } else {
        // Add step for rejecting an edge (would form a cycle)
        steps.push({
          mst: [...mst],
          currentEdge: edge,
          rejected: true,
          message: `Rejected edge ${source}-${target} with weight ${weight} (would form a cycle)`,
          complete: mst.length === nodes.length - 1
        });
      }
      
      // MST is complete when we have n-1 edges
      if (mst.length === nodes.length - 1) {
        // Final MST step
        steps.push({
          mst,
          message: `Minimum Spanning Tree complete with total weight ${totalMstWeight}`,
          complete: true
        });
        break;
      }
    }
    
    return { steps, totalWeight: totalMstWeight };
  };

  // Initialize the animation
  const initializeAnimation = () => {
    const nodesArray = extractNodes(edges);
    setNodes(nodesArray);
    
    setCurrentStep(0);
    setIsPlaying(false);
    
    const { steps, totalWeight } = kruskalMST();
    setSteps(steps);
    setTotalWeight(totalWeight);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Step forward
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // Step backward
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset animation
  const resetAnimation = () => {
    clearInterval(intervalRef.current!);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Calculate node positions in a circular layout
  const calculateNodePositions = () => {
    const positions: {[key: string]: {x: number, y: number}} = {};
    const center = { x: 200, y: 200 };
    const radius = 150;
    
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      positions[node] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    });
    
    return positions;
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps.length, speed]);

  // Initialize on mount
  useEffect(() => {
    initializeAnimation();
  }, []);

  const nodePositions = calculateNodePositions();
  const currentStepData = steps[currentStep];

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Minimum Spanning Tree (Kruskal's Algorithm)</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button 
                onClick={togglePlay} 
                className={isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#7e61e9] hover:bg-[#6a50c7]"}
                disabled={currentStep === steps.length - 1}
              >
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
              <Button onClick={stepBackward} disabled={currentStep === 0} variant="outline">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button onClick={stepForward} disabled={currentStep === steps.length - 1} variant="outline">
                <SkipForward className="w-4 h-4" />
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
          
          <div className="text-sm font-medium text-gray-800 p-2 bg-gray-100 rounded">
            {currentStepData?.message || ''}
          </div>
          
          <div className="text-sm flex justify-between items-center">
            <span className="text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            {currentStepData?.complete && (
              <Badge variant="outline" className="bg-green-50 text-green-800">
                Total MST Weight: {totalWeight}
              </Badge>
            )}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="relative h-[400px] w-full border rounded-lg bg-gray-50 overflow-hidden">
          {/* Draw all edges first as background */}
          {edges.map((edge, index) => {
            const sourcePos = nodePositions[edge.source];
            const targetPos = nodePositions[edge.target];
            
            return (
              <svg 
                key={`edge-${index}`}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                <line
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
                <text
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="12"
                  dy=".3em"
                  className="bg-white px-1"
                >
                  {edge.weight}
                </text>
              </svg>
            );
          })}
          
          {/* Draw MST edges */}
          {currentStepData?.mst.map((edge, index) => {
            const sourcePos = nodePositions[edge.source];
            const targetPos = nodePositions[edge.target];
            
            return (
              <svg 
                key={`mst-edge-${index}`}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                <line
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke="#4ade80"
                  strokeWidth={3}
                />
                <text
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2}
                  textAnchor="middle"
                  fill="#166534"
                  fontWeight="bold"
                  fontSize="12"
                  dy=".3em"
                  className="bg-white px-1"
                >
                  {edge.weight}
                </text>
              </svg>
            );
          })}
          
          {/* Draw current edge being considered */}
          {currentStepData?.currentEdge && (
            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              <line
                x1={nodePositions[currentStepData.currentEdge.source].x}
                y1={nodePositions[currentStepData.currentEdge.source].y}
                x2={nodePositions[currentStepData.currentEdge.target].x}
                y2={nodePositions[currentStepData.currentEdge.target].y}
                stroke={currentStepData.rejected ? "#ef4444" : "#facc15"}
                strokeWidth={2}
                strokeDasharray={currentStepData.rejected ? "5,5" : ""}
              />
              <text
                x={(nodePositions[currentStepData.currentEdge.source].x + nodePositions[currentStepData.currentEdge.target].x) / 2}
                y={(nodePositions[currentStepData.currentEdge.source].y + nodePositions[currentStepData.currentEdge.target].y) / 2}
                textAnchor="middle"
                fill={currentStepData.rejected ? "#b91c1c" : "#854d0e"}
                fontWeight="bold"
                fontSize="12"
                dy=".3em"
                className="bg-white px-1"
              >
                {currentStepData.currentEdge.weight}
              </text>
            </svg>
          )}
          
          {/* Draw nodes */}
          {nodes.map((node) => {
            const pos = nodePositions[node];
            
            return (
              <motion.div
                key={`node-${node}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 border-2 border-blue-500"
                style={{ left: pos.x - 24, top: pos.y - 24 }}
              >
                <div className="text-lg font-bold">{node}</div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Kruskal's Algorithm</h4>
            <p className="text-gray-700">
              Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph.
              It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges is minimized.
            </p>
            <p className="text-gray-700 mt-2">
              The algorithm works by sorting all edges by weight and then adding edges to the MST one by one,
              skipping edges that would create a cycle.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border border-blue-500 mr-2"></div>
                <span className="text-gray-700">Vertex (Node)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 border border-gray-400 mr-2"></div>
                <span className="text-gray-700">Original Edge</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">MST Edge</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2"></div>
                <span className="text-gray-700">Current Edge (Being Considered)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Rejected Edge (Would Form Cycle)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MinimumSpanningTreeAnimation;
