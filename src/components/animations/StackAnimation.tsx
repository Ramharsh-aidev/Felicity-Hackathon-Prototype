
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Stack implementation
class Stack<T> {
  private items: T[];
  
  constructor() {
    this.items = [];
  }
  
  push(element: T): void {
    this.items.push(element);
  }
  
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }
  
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  size(): number {
    return this.items.length;
  }
  
  getItems(): T[] {
    return [...this.items];
  }

  // Search for a value and return true if found
  search(value: T): boolean {
    return this.items.includes(value);
  }
  
  // Get the position of a value in the stack (from top)
  searchPosition(value: T): number {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i] === value) {
        return this.items.length - 1 - i;
      }
    }
    return -1;
  }

  clear(): void {
    this.items = [];
  }
}

const StackAnimation: React.FC = () => {
  const [stack] = useState<Stack<number>>(new Stack<number>());
  const [stackItems, setStackItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const updateStackItems = () => {
    setStackItems([...stack.getItems()]);
  };
  
  const handlePush = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }
    
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }
    
    stack.push(value);
    updateStackItems();
    setInputValue('');
    setMessage(`Pushed ${value} onto the stack`);
    inputRef.current?.focus();
  };
  
  const handlePop = () => {
    const popped = stack.pop();
    if (popped === undefined) {
      setMessage('Stack is empty');
    } else {
      setMessage(`Popped ${popped} from the stack`);
    }
    updateStackItems();
  };
  
  const handlePeek = () => {
    const top = stack.peek();
    if (top === undefined) {
      setMessage('Stack is empty');
    } else {
      setMessage(`Top element is ${top}`);
      setHighlightIndex(stackItems.length - 1);
      
      // Reset highlight after 2 seconds
      setTimeout(() => {
        setHighlightIndex(null);
      }, 2000);
    }
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setSearchResult('Please enter a value to search');
      return;
    }
    
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      setSearchResult('Please enter a valid number');
      return;
    }
    
    const found = stack.search(value);
    const position = stack.searchPosition(value);
    
    if (found) {
      setSearchResult(`Found ${value} at position ${position} from the top`);
      
      // Highlight the found element
      const index = stackItems.length - 1 - position;
      setHighlightIndex(index);
      
      // Reset highlight after 2 seconds
      setTimeout(() => {
        setHighlightIndex(null);
      }, 2000);
    } else {
      setSearchResult(`${value} not found in the stack`);
    }
  };
  
  const handleClear = () => {
    stack.clear();
    updateStackItems();
    setMessage('Stack cleared');
  };
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6">Stack Visualization</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
              className="w-full sm:w-48"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePush();
              }}
            />
            <Button onClick={handlePush} className="bg-green-500 text-white hover:bg-green-600">
              Push
            </Button>
            <Button onClick={handlePop} className="bg-red-500 text-white hover:bg-red-600">
              Pop
            </Button>
            <Button onClick={handlePeek} className="bg-blue-500 text-white hover:bg-blue-600">
              Peek
            </Button>
            <Button onClick={handleClear} className="bg-gray-500 text-white hover:bg-gray-600">
              Clear
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a number"
              className="w-full sm:w-48"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button onClick={handleSearch} className="bg-purple-500 text-white hover:bg-purple-600">
              Search
            </Button>
            {searchResult && (
              <span className={`ml-2 text-sm ${searchResult.includes('Found') ? 'text-green-600' : 'text-red-600'}`}>
                {searchResult}
              </span>
            )}
          </div>
        
          {message && (
            <div className="mb-4 text-sm font-medium text-gray-600">
              {message}
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-64 bg-gray-100 rounded-md p-4 shadow-inner min-h-[400px]">
            {/* Stack label */}
            <div className="absolute top-0 left-0 right-0 bg-gray-200 py-2 text-center text-sm font-medium rounded-t-md">
              Stack
            </div>
            
            {/* Stack items */}
            <div className="mt-10 flex flex-col-reverse">
              <AnimatePresence>
                {stackItems.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">Empty</div>
                ) : (
                  stackItems.map((item, index) => (
                    <motion.div
                      key={`${index}-${item}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: highlightIndex === index ? 1.1 : 1,
                        backgroundColor: highlightIndex === index ? 'rgba(99, 102, 241, 0.2)' : 'white'
                      }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={`border-2 ${
                        index === stackItems.length - 1 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-300'
                      } rounded-md p-4 m-2 text-center font-medium ${
                        highlightIndex === index ? 'ring-2 ring-indigo-400' : ''
                      }`}
                    >
                      <div className="text-lg">{item}</div>
                      {index === stackItems.length - 1 && (
                        <div className="text-xs text-indigo-500 font-bold mt-1">TOP</div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            
            {/* Stack bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-2 text-center text-sm font-medium rounded-b-md">
              Bottom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackAnimation;
