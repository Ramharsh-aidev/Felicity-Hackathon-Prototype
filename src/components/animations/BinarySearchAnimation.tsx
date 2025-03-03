
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BinarySearchAnimation: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<string>('');
  const [customArray, setCustomArray] = useState<string>('');
  const [searchSteps, setSearchSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [animation, setAnimation] = useState<{
    left: number;
    right: number;
    mid: number;
    found: boolean;
  }>({ left: -1, right: -1, mid: -1, found: false });
  const [isCustomArrayOpen, setIsCustomArrayOpen] = useState<boolean>(false);

  // Generate a sorted array of random numbers
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
    const sortedArray = [...randomArray].sort((a, b) => a - b);
    setArray(sortedArray);
  };

  const handleSetCustomArray = () => {
    try {
      // Parse the custom array input
      const parsedArray = customArray
        .split(',')
        .map(item => parseInt(item.trim()))
        .filter(item => !isNaN(item));
      
      if (parsedArray.length === 0) {
        setSearchResult('Please enter valid numbers separated by commas');
        return;
      }
      
      // Sort the array
      const sortedArray = [...parsedArray].sort((a, b) => a - b);
      setArray(sortedArray);
      setSearchResult('Custom array set successfully');
      setIsCustomArrayOpen(false);
    } catch (error) {
      setSearchResult('Error parsing array. Please enter valid numbers separated by commas');
    }
  };

  // Function to perform binary search and record steps
  const binarySearch = (arr: number[], targetValue: number) => {
    const steps: string[] = [];
    let left = 0;
    let right = arr.length - 1;
    let found = false;
    let step = 0;

    steps.push(`Starting binary search for target ${targetValue} in sorted array`);
    setAnimation({ left, right, mid: -1, found: false });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push(`Step ${step + 1}: Checking element at index ${mid} (value: ${arr[mid]})`);
      setAnimation({ left, right, mid, found: false });
      
      if (arr[mid] === targetValue) {
        steps.push(`Found target ${targetValue} at index ${mid}!`);
        setAnimation({ left, right, mid, found: true });
        found = true;
        break;
      } else if (arr[mid] < targetValue) {
        steps.push(`${arr[mid]} < ${targetValue}, so search in the right half`);
        left = mid + 1;
      } else {
        steps.push(`${arr[mid]} > ${targetValue}, so search in the left half`);
        right = mid - 1;
      }
      
      step++;
    }
    
    if (!found) {
      steps.push(`Target ${targetValue} not found in the array.`);
    }
    
    return steps;
  };

  // Function to handle search button click
  const handleSearch = () => {
    if (!target.trim()) {
      setSearchResult('Please enter a target value');
      return;
    }
    
    const targetValue = parseInt(target);
    if (isNaN(targetValue)) {
      setSearchResult('Please enter a valid number');
      return;
    }
    
    const steps = binarySearch(array, targetValue);
    setSearchSteps(steps);
    setCurrentStep(0);
    
    // Set search result message
    const found = steps[steps.length - 1].includes('Found');
    setSearchResult(found ? `Found ${targetValue} in the array!` : `${targetValue} not found in the array`);
  };

  // Function to move to the next step
  const handleNextStep = () => {
    if (currentStep < searchSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Update animation based on step text
      const stepText = searchSteps[currentStep + 1];
      
      // Extract left and right bounds from step
      if (stepText.includes('search in the right half')) {
        const mid = animation.mid;
        setAnimation(prev => ({ ...prev, left: mid + 1 }));
      } else if (stepText.includes('search in the left half')) {
        const mid = animation.mid;
        setAnimation(prev => ({ ...prev, right: mid - 1 }));
      } else if (stepText.includes('Checking element at index')) {
        const midMatch = stepText.match(/index (\d+)/);
        if (midMatch && midMatch[1]) {
          const midIndex = parseInt(midMatch[1]);
          setAnimation(prev => ({ ...prev, mid: midIndex }));
        }
      } else if (stepText.includes('Found target')) {
        setAnimation(prev => ({ ...prev, found: true }));
      }
    }
  };

  // Function to move to the previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Recompute animation state from previous steps
      const prevStepText = searchSteps[currentStep - 1];
      const initialState = { left: 0, right: array.length - 1, mid: -1, found: false };
      
      // We need to replay all steps up to the current one to get the correct animation state
      let tempAnimation = { ...initialState };
      
      for (let i = 0; i <= currentStep - 1; i++) {
        const step = searchSteps[i];
        
        if (step.includes('Checking element at index')) {
          const midMatch = step.match(/index (\d+)/);
          if (midMatch && midMatch[1]) {
            tempAnimation.mid = parseInt(midMatch[1]);
          }
        } else if (step.includes('search in the right half')) {
          tempAnimation.left = tempAnimation.mid + 1;
        } else if (step.includes('search in the left half')) {
          tempAnimation.right = tempAnimation.mid - 1;
        } else if (step.includes('Found target')) {
          tempAnimation.found = true;
        }
      }
      
      setAnimation(tempAnimation);
    }
  };

  // Function to reset the search
  const handleReset = () => {
    setSearchSteps([]);
    setCurrentStep(-1);
    setSearchResult(null);
    setAnimation({ left: -1, right: -1, mid: -1, found: false });
    setTarget('');
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6">Binary Search Visualization</h3>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter target value"
            className="w-48"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Button onClick={handleSearch} className="bg-green-500 hover:bg-green-600 text-white">
            Search
          </Button>
          <Button onClick={() => generateRandomArray()} className="bg-blue-500 hover:bg-blue-600 text-white">
            New Array
          </Button>
          <Button onClick={() => setIsCustomArrayOpen(!isCustomArrayOpen)} className="bg-purple-500 hover:bg-purple-600 text-white">
            {isCustomArrayOpen ? 'Hide Custom Array' : 'Set Custom Array'}
          </Button>
          {searchSteps.length > 0 && (
            <Button onClick={handleReset} variant="outline" className="bg-gray-50 text-gray-600 hover:bg-gray-100">
              Reset
            </Button>
          )}
        </div>

        {isCustomArrayOpen && (
          <div className="mb-4 flex gap-2">
            <Input
              type="text"
              value={customArray}
              onChange={(e) => setCustomArray(e.target.value)}
              placeholder="Enter numbers separated by commas (e.g., 1, 5, 10, 15)"
              className="flex-1"
            />
            <Button onClick={handleSetCustomArray} className="bg-indigo-500 hover:bg-indigo-600 text-white">
              Set Array
            </Button>
          </div>
        )}

        {searchResult && (
          <div className={`mb-4 text-sm font-medium ${searchResult.includes('Found') ? 'text-green-600' : 'text-red-600'}`}>
            {searchResult}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Array visualization */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-6 text-[#260446]">Array</h4>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                className={`relative w-12 h-12 flex items-center justify-center rounded-md border-2 
                  ${animation.mid === index 
                    ? (animation.found ? 'bg-green-100 border-green-500' : 'bg-yellow-100 border-yellow-500') 
                    : animation.left <= index && index <= animation.right && animation.left !== -1 
                      ? 'bg-blue-100 border-blue-500' 
                      : 'bg-white border-gray-300'}`}
                animate={{
                  scale: animation.mid === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium">{value}</span>
                <span className="absolute -bottom-5 text-xs text-gray-500">{index}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Search steps visualization */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold mb-4 text-[#260446]">Search Steps</h4>
            
            {searchSteps.length === 0 ? (
              <p className="text-gray-500">Enter a target value and click Search to start visualization.</p>
            ) : (
              <div>
                <div className="max-h-[200px] overflow-y-auto mb-4 pr-2 scrollbar-hide">
                  <AnimatePresence mode="wait">
                    {searchSteps.slice(0, currentStep + 1).map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 mb-2 rounded-md ${
                          index === currentStep 
                            ? 'bg-blue-100 border-l-4 border-blue-500' 
                            : 'bg-white border-l-4 border-transparent'
                        }`}
                      >
                        {step}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    onClick={handlePrevStep} 
                    disabled={currentStep <= 0}
                    className="flex items-center gap-1"
                    variant="outline"
                  >
                    <ArrowLeft size={16} />
                    Previous Step
                  </Button>
                  <Button 
                    onClick={handleNextStep} 
                    disabled={currentStep >= searchSteps.length - 1}
                    className="flex items-center gap-1"
                    variant="outline"
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchAnimation;
