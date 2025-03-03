
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, RefreshCw } from 'lucide-react';

const SelectionSortAnimation: React.FC = () => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [customArrayInput, setCustomArrayInput] = useState<string>('');
  const [sortingState, setSortingState] = useState<{
    isSorting: boolean;
    step: number;
    minIndex: number;
    currentIndex: number;
    comparingIndex: number;
    sortedIndices: number[];
    swapping: boolean;
  }>({
    isSorting: false,
    step: 0,
    minIndex: 0,
    currentIndex: 0,
    comparingIndex: 1,
    sortedIndices: [],
    swapping: false,
  });
  const [explanation, setExplanation] = useState<string>('');
  const [speed, setSpeed] = useState<number>(500); // in milliseconds
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  
  const timerRef = useRef<number | null>(null);
  
  const resetState = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    setSortingState({
      isSorting: false,
      step: 0,
      minIndex: 0,
      currentIndex: 0,
      comparingIndex: 1,
      sortedIndices: [],
      swapping: false,
    });
    
    setExplanation('Click "Start Sort" to begin the selection sort visualization.');
    setIsAutoPlaying(false);
  };
  
  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 5) + 5; // 5 to 9 elements
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 90) + 10); // 10 to 99
    setArray(newArray);
    resetState();
  };
  
  const handleCustomArraySubmit = () => {
    try {
      const newArray = customArrayInput
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
      
      if (newArray.length < 2) {
        throw new Error('Please enter at least 2 numbers');
      }
      
      if (newArray.length > 10) {
        throw new Error('Please enter at most 10 numbers for better visualization');
      }
      
      setArray(newArray);
      resetState();
      setCustomArrayInput('');
    } catch (error) {
      setExplanation(error instanceof Error ? error.message : 'Invalid input');
    }
  };
  
  const startSorting = () => {
    setSortingState(prev => ({
      ...prev,
      isSorting: true,
      step: 0,
      minIndex: 0,
      currentIndex: 0,
      comparingIndex: 1,
      sortedIndices: [],
      swapping: false,
    }));
    
    setExplanation('Selection Sort starts by setting the first element as the minimum.');
  };
  
  const nextStep = () => {
    setSortingState(prev => {
      // Clone the array for potential swapping
      const n = array.length;
      
      // If we've completed sorting
      if (prev.sortedIndices.length === n - 1) {
        setExplanation('The array is now fully sorted! All elements are in ascending order.');
        return {
          ...prev,
          isSorting: false,
          sortedIndices: [...Array(n).keys()],
        };
      }
      
      // Main selection sort logic
      if (prev.comparingIndex < n) {
        // Still comparing within the current pass
        let newMinIndex = prev.minIndex;
        let isNewMin = false;
        
        if (array[prev.comparingIndex] < array[prev.minIndex]) {
          newMinIndex = prev.comparingIndex;
          isNewMin = true;
        }
        
        setExplanation(
          isNewMin
            ? `Comparing ${array[prev.comparingIndex]} with current minimum ${array[prev.minIndex]}. Found a new minimum: ${array[prev.comparingIndex]}.`
            : `Comparing ${array[prev.comparingIndex]} with current minimum ${array[prev.minIndex]}. It's not smaller, so the minimum doesn't change.`
        );
        
        return {
          ...prev,
          minIndex: newMinIndex,
          comparingIndex: prev.comparingIndex + 1,
          step: prev.step + 1,
        };
      } else {
        // End of current pass, swap if needed
        if (prev.minIndex !== prev.currentIndex && !prev.swapping) {
          // Start swapping animation
          setExplanation(`Swapping minimum element ${array[prev.minIndex]} with element at starting position ${array[prev.currentIndex]}.`);
          return {
            ...prev,
            swapping: true,
            step: prev.step + 1,
          };
        } else if (prev.swapping) {
          // Perform the swap
          const newArray = [...array];
          [newArray[prev.currentIndex], newArray[prev.minIndex]] = [newArray[prev.minIndex], newArray[prev.currentIndex]];
          setArray(newArray);
          
          // Move to next pass
          const newSortedIndices = [...prev.sortedIndices, prev.currentIndex];
          const newCurrentIndex = prev.currentIndex + 1;
          
          setExplanation(
            newCurrentIndex < n
              ? `${array[prev.minIndex]} is now in its correct position. Moving to the next position.`
              : 'The array is now fully sorted!'
          );
          
          return {
            ...prev,
            currentIndex: newCurrentIndex,
            minIndex: newCurrentIndex,
            comparingIndex: newCurrentIndex + 1,
            sortedIndices: newSortedIndices,
            swapping: false,
            step: prev.step + 1,
          };
        } else {
          // Element already in place (minIndex === currentIndex)
          const newSortedIndices = [...prev.sortedIndices, prev.currentIndex];
          const newCurrentIndex = prev.currentIndex + 1;
          
          setExplanation(
            `${array[prev.currentIndex]} is already in its correct position. Moving to the next position.`
          );
          
          return {
            ...prev,
            currentIndex: newCurrentIndex,
            minIndex: newCurrentIndex,
            comparingIndex: newCurrentIndex + 1,
            sortedIndices: newSortedIndices,
            step: prev.step + 1,
          };
        }
      }
    });
  };
  
  const handleAutoPlay = () => {
    if (isAutoPlaying) {
      // Stop autoplay
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsAutoPlaying(false);
    } else {
      // Start autoplay
      setIsAutoPlaying(true);
      
      if (!sortingState.isSorting) {
        startSorting();
      } else {
        autoPlayNextStep();
      }
    }
  };
  
  const autoPlayNextStep = () => {
    nextStep();
    
    timerRef.current = window.setTimeout(() => {
      if (sortingState.isSorting && isAutoPlaying) {
        autoPlayNextStep();
      } else if (!sortingState.isSorting) {
        setIsAutoPlaying(false);
      }
    }, 3000 - speed); // Invert speed: higher value = faster
  };
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Auto-run next step if auto-playing
  useEffect(() => {
    if (isAutoPlaying && !timerRef.current && sortingState.isSorting) {
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        autoPlayNextStep();
      }, 3000 - speed);
    }
  }, [sortingState, isAutoPlaying]);
  
  // Cleanup on array change
  useEffect(() => {
    resetState();
  }, [array.length]);
  
  // Initialize explanation
  useEffect(() => {
    setExplanation('Click "Start Sort" to begin the selection sort visualization.');
  }, []);
  
  return (
    <div className="p-4 w-full">
      <h3 className="text-xl font-bold mb-6">Selection Sort Visualization</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Input
              type="text"
              value={customArrayInput}
              onChange={e => setCustomArrayInput(e.target.value)}
              placeholder="Enter numbers (comma-separated)"
              className="w-full sm:w-64"
              onKeyDown={e => {
                if (e.key === 'Enter') handleCustomArraySubmit();
              }}
            />
            <Button 
              onClick={handleCustomArraySubmit}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Set Array
            </Button>
            <Button 
              onClick={generateRandomArray}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Random Array
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Speed:</span>
              <Slider 
                value={[speed]} 
                min={100} 
                max={2500} 
                step={100}
                onValueChange={(vals) => setSpeed(vals[0])}
                className="w-48"
              />
              <span className="ml-2 text-sm">
                {speed < 1000 ? 'Slow' : speed < 2000 ? 'Medium' : 'Fast'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {!sortingState.isSorting ? (
              <Button 
                onClick={startSorting}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                disabled={sortingState.sortedIndices.length === array.length - 1}
              >
                Start Sort
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                disabled={isAutoPlaying}
              >
                Next Step
              </Button>
            )}
            
            <Button 
              onClick={handleAutoPlay}
              className={`${isAutoPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
              disabled={sortingState.sortedIndices.length === array.length - 1 && !isAutoPlaying}
            >
              {isAutoPlaying ? 'Stop Auto' : 'Auto Play'}
            </Button>
            
            <Button 
              onClick={resetState}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              disabled={!sortingState.isSorting && sortingState.step === 0}
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
            <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
            <p className="text-blue-700">{explanation}</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="font-medium text-gray-700 mb-2">Algorithm Steps</h4>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              <li>Start with the first element as the minimum.</li>
              <li>Compare it with the remaining unsorted elements to find the actual minimum.</li>
              <li>Swap the minimum with the first position of the unsorted portion.</li>
              <li>Move the boundary of the sorted portion one element to the right.</li>
              <li>Repeat until the entire array is sorted.</li>
            </ol>
          </div>
        </div>
        
        <div className="flex items-center justify-center w-full">
          <div className="w-full">
            <div className="bg-gray-100 rounded-md p-6 shadow-inner flex items-center justify-center min-h-[300px]">
              <div className="flex items-end justify-center gap-2 w-full">
                <AnimatePresence mode="sync">
                  {array.map((value, index) => {
                    const isSorted = sortingState.sortedIndices.includes(index);
                    const isMinimum = sortingState.isSorting && index === sortingState.minIndex;
                    const isCurrent = sortingState.isSorting && index === sortingState.currentIndex;
                    const isComparing = sortingState.isSorting && index === sortingState.comparingIndex;
                    const isSwapping = sortingState.swapping && (index === sortingState.minIndex || index === sortingState.currentIndex);
                    
                    // Determine bar color based on its state
                    let barColor = 'bg-gray-300';
                    
                    if (isSwapping) {
                      barColor = 'bg-yellow-400';
                    } else if (isSorted) {
                      barColor = 'bg-green-400';
                    } else if (isMinimum) {
                      barColor = 'bg-red-400';
                    } else if (isCurrent) {
                      barColor = 'bg-indigo-400';
                    } else if (isComparing) {
                      barColor = 'bg-blue-400';
                    }
                    
                    return (
                      <motion.div
                        key={`${index}-${value}`}
                        className={`${barColor} w-10 sm:w-12 md:w-16 rounded-t-md flex flex-col items-center border border-gray-400`}
                        style={{
                          height: `${Math.max(30, (value / 100) * 250)}px`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: isSwapping ? [1, 1.1, 1] : 1,
                          x: isSwapping && index === sortingState.minIndex && sortingState.currentIndex !== sortingState.minIndex ? 
                              [0, -(index - sortingState.currentIndex) * 50, 0] : 
                              isSwapping && index === sortingState.currentIndex && sortingState.currentIndex !== sortingState.minIndex ? 
                              [0, (sortingState.minIndex - index) * 50, 0] : 0,
                        }}
                        transition={{
                          duration: isSwapping ? 0.5 : 0.3,
                          scale: { duration: isSwapping ? 0.5 : 0.3 }
                        }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <div className="font-medium text-xs sm:text-sm mt-2 text-gray-800">
                          {value}
                        </div>
                        <div className="text-xs text-gray-700 absolute -bottom-6">
                          {index}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="flex items-center text-xs">
                <div className="w-4 h-4 rounded bg-green-400 mr-1"></div>
                <span>Sorted</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-4 h-4 rounded bg-indigo-400 mr-1"></div>
                <span>Current position</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-4 h-4 rounded bg-red-400 mr-1"></div>
                <span>Current minimum</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-4 h-4 rounded bg-blue-400 mr-1"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-4 h-4 rounded bg-yellow-400 mr-1"></div>
                <span>Swapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSortAnimation;
