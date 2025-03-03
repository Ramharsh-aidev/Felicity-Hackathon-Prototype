
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Generate a random memory address
const generateMemoryAddress = () => {
  return `0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
};

// Node component to visualize each element in the linked list
const Node = ({ 
  value, 
  isHead, 
  isTail, 
  memoryAddress 
}: { 
  value: number; 
  isHead: boolean; 
  isTail: boolean; 
  memoryAddress: string;
}) => {
  return (
    <div className="flex items-center">
      {isHead && (
        <div className="flex items-center mr-1">
          <div className="text-base font-semibold text-[#3B97D3] mr-2 whitespace-nowrap">Head</div>
          <div className="w-6 h-[2px] bg-[#3B97D3]"></div>
          <div className="text-[#3B97D3]">
            <ArrowRight size={16} />
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="flex items-center"
        >
          {/* Node visualization */}
          <div className="flex rounded-2xl overflow-hidden shadow-md">
            {/* Value section */}
            <div className="w-16 h-16 flex items-center justify-center bg-white border-r border-gray-200">
              <span className="text-xl font-bold text-[#3B97D3]">{value}</span>
            </div>
            
            {/* Pointer section with memory address inside */}
            <div className="w-24 h-16 flex flex-col items-center justify-center bg-gray-50 px-1">
              <div className="h-3 w-3 rounded-full bg-gray-300 mb-1"></div>
              <div className="text-xs text-gray-500 overflow-hidden text-ellipsis w-full text-center">
                {memoryAddress}
              </div>
            </div>
          </div>
          
          {/* Pointer arrow */}
          {!isTail ? (
            <div className="flex items-center mx-1">
              <div className="h-[2px] w-4 bg-gray-400"></div>
              <ChevronRight className="text-gray-400" size={14} />
            </div>
          ) : (
            <div className="flex items-center mx-1">
              <div className="h-[2px] w-4 bg-gray-400"></div>
              <ChevronRight className="text-gray-400" size={14} />
              <div className="ml-1 text-base font-semibold text-[#3B97D3]">NULL</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

class LinkedListNode {
  value: number;
  next: LinkedListNode | null;
  memoryAddress: string;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.memoryAddress = generateMemoryAddress();
  }
}

class LinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add element to the end of the list
  append(value: number) {
    const newNode = new LinkedListNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
    return true;
  }
  
  // Add element to the beginning of the list
  prepend(value: number) {
    const newNode = new LinkedListNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
    return true;
  }

  // Insert at specific position
  insertAt(value: number, index: number) {
    if (index < 0 || index > this.size) return false;
    
    if (index === 0) {
      return this.prepend(value);
    }
    
    if (index === this.size) {
      return this.append(value);
    }
    
    const newNode = new LinkedListNode(value);
    let current = this.head;
    let prev = null;
    let position = 0;
    
    while (position < index) {
      prev = current;
      current = current?.next || null;
      position++;
    }
    
    if (prev) {
      prev.next = newNode;
      newNode.next = current;
      this.size++;
      return true;
    }
    
    return false;
  }

  // Remove node by value
  remove(value: number) {
    if (!this.head) return null;
    
    if (this.head.value === value) {
      return this.removeHead();
    }
    
    let current = this.head;
    let prev = null;
    
    while (current && current.value !== value) {
      prev = current;
      current = current.next;
    }
    
    if (!current) return null;
    
    if (prev) {
      prev.next = current.next;
      
      if (current === this.tail) {
        this.tail = prev;
      }
      
      this.size--;
      return current.value;
    }
    
    return null;
  }

  // Remove the first node
  removeHead() {
    if (!this.head) return null;
    
    const removedValue = this.head.value;
    
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    
    this.size--;
    return removedValue;
  }

  // Remove the last node
  removeTail() {
    if (!this.head) return null;
    
    if (this.head === this.tail) {
      const removedValue = this.head.value;
      this.head = null;
      this.tail = null;
      this.size--;
      return removedValue;
    }
    
    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }
    
    const removedValue = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.size--;
    return removedValue;
  }

  // Convert the linked list to an array for visualization
  toArray() {
    const result = [];
    let current = this.head;
    
    while (current) {
      result.push({
        value: current.value,
        memoryAddress: current.memoryAddress
      });
      current = current.next;
    }
    
    return result;
  }

  // Search for a value and return true if found
  search(value: number) {
    let current = this.head;
    
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
}

const LinkedListAnimation: React.FC = () => {
  const [linkedList] = useState<LinkedList>(new LinkedList());
  const [listArray, setListArray] = useState<{value: number, memoryAddress: string}[]>([]);
  const [newValue, setNewValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [removeValue, setRemoveValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const updateVisualList = () => {
    setListArray([...linkedList.toArray()]);
    
    if (linkedList.size === 0) {
      setObservations('The list is empty. Add some nodes to get started!');
    } else if (linkedList.size === 1) {
      setObservations('Single node list: both Head and Tail point to the same node. Next points to NULL.');
    } else {
      setObservations('Next of last node is pointed to NULL. Each node stores a value and a pointer to the next node.');
    }
  };
  
  const handleAppend = () => {
    if (!newValue.trim()) {
      setMessage('Please enter a value');
      return;
    }
    
    const value = parseInt(newValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }
    
    linkedList.append(value);
    updateVisualList();
    setNewValue('');
    setMessage(`Appended ${value} to the end of the list`);
    inputRef.current?.focus();
  };
  
  const handlePrepend = () => {
    if (!newValue.trim()) {
      setMessage('Please enter a value');
      return;
    }
    
    const value = parseInt(newValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }
    
    linkedList.prepend(value);
    updateVisualList();
    setNewValue('');
    setMessage(`Prepended ${value} to the beginning of the list`);
    inputRef.current?.focus();
  };

  const handleInsertAt = () => {
    if (!newValue.trim() || !indexValue.trim()) {
      setMessage('Please enter both value and index');
      return;
    }
    
    const value = parseInt(newValue);
    const index = parseInt(indexValue);
    
    if (isNaN(value) || isNaN(index)) {
      setMessage('Please enter valid numbers');
      return;
    }
    
    const success = linkedList.insertAt(value, index);
    
    if (success) {
      updateVisualList();
      setNewValue('');
      setIndexValue('');
      setMessage(`Inserted ${value} at position ${index}`);
    } else {
      setMessage(`Invalid index: ${index}. Valid range: 0-${linkedList.size}`);
    }
    
    inputRef.current?.focus();
  };
  
  const handleRemove = () => {
    if (!removeValue.trim()) {
      setMessage('Please enter a value to remove');
      return;
    }
    
    const value = parseInt(removeValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }
    
    const removed = linkedList.remove(value);
    if (removed === null) {
      setMessage(`Value ${value} not found in the list`);
    } else {
      setMessage(`Removed ${value} from the list`);
      updateVisualList();
    }
    
    setRemoveValue('');
    inputRef.current?.focus();
  };
  
  const handleRemoveHead = () => {
    const removed = linkedList.removeHead();
    if (removed === null) {
      setMessage('The list is empty');
    } else {
      setMessage(`Removed ${removed} from the head of the list`);
    }
    updateVisualList();
  };
  
  const handleRemoveTail = () => {
    const removed = linkedList.removeTail();
    if (removed === null) {
      setMessage('The list is empty');
    } else {
      setMessage(`Removed ${removed} from the tail of the list`);
    }
    updateVisualList();
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
    
    const found = linkedList.search(value);
    setSearchResult(found ? `Found ${value} in the list!` : `${value} not found in the list`);
  };

  useEffect(() => {
    // Initial empty list
    updateVisualList();
  }, []);
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Linked List Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter a number"
                className="w-full"
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAppend();
                }}
              />
            </div>
            <Button onClick={handlePrepend} className="bg-[#7e61e9] hover:bg-[#6a50c7]">
              Insert At Head
            </Button>
            <Button onClick={handleAppend} className="bg-[#7e61e9] hover:bg-[#6a50c7]">
              Insert At Tail
            </Button>
            <Button onClick={handleRemoveHead} className="bg-red-500 hover:bg-red-600">
              Remove Head
            </Button>
            <Button onClick={handleRemoveTail} className="bg-red-500 hover:bg-red-600">
              Remove Tail
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
                placeholder="Index"
                className="w-1/3"
              />
              <Input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Value"
                className="w-2/3"
              />
            </div>
            <Button onClick={handleInsertAt} className="bg-[#7e61e9] hover:bg-[#6a50c7]">
              Insert At Index
            </Button>
            
            <div className="flex gap-2">
              <Input
                type="text"
                value={removeValue}
                onChange={(e) => setRemoveValue(e.target.value)}
                placeholder="Value to remove"
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRemove();
                }}
              />
              <Button onClick={handleRemove} className="bg-red-500 hover:bg-red-600 whitespace-nowrap">
                Remove
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-start">
            <div className="flex gap-2 items-center w-full sm:w-auto">
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
              <Button onClick={handleSearch} className="bg-[#260446] hover:bg-[#3b1169] whitespace-nowrap">
                Search
              </Button>
            </div>
            {searchResult && (
              <span className={`ml-2 text-sm ${searchResult.includes('Found') ? 'text-green-600' : 'text-red-600'}`}>
                {searchResult}
              </span>
            )}
          </div>
        </div>
        
        {message && (
          <div className="mb-4 text-sm font-medium text-gray-600">
            {message}
          </div>
        )}
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="overflow-x-auto pb-6">
          <div className="min-h-[120px] p-4 flex items-center">
            {listArray.length === 0 ? (
              <div className="flex items-center">
                <div className="text-base font-semibold text-[#3B97D3] mr-2">Head</div>
                <div className="flex items-center mx-1">
                  <div className="w-6 h-[2px] bg-[#3B97D3]"></div>
                  <ArrowRight className="text-[#3B97D3]" size={16} />
                </div>
                <div className="text-base font-semibold text-[#3B97D3]">NULL</div>
              </div>
            ) : (
              <div className="flex flex-nowrap items-center overflow-x-auto pb-4 scrollbar-hide">
                <AnimatePresence>
                  {listArray.map((node, index) => (
                    <Node
                      key={`${index}-${node.value}-${node.memoryAddress}`}
                      value={node.value}
                      isHead={index === 0}
                      isTail={index === listArray.length - 1}
                      memoryAddress={node.memoryAddress}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-[#260446] mb-2">Observations</h4>
          <p className="text-gray-700">{observations}</p>
        </div>
      </Card>
    </div>
  );
};

export default LinkedListAnimation;
