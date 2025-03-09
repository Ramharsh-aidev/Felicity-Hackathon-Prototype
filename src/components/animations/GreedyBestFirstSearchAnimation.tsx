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