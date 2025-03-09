import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Queue implementation
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// Stack implementation
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}

const StackAnimation: React.FC = () => {
  const [stack] = useState<Stack<number>>(new Stack());
  const [stackItems, setStackItems] = useState<number[]>([]);
  const [stackValue, setStackValue] = useState<string>('');
  const [stackMessage, setStackMessage] = useState<string>('');
  const stackInputRef = useRef<HTMLInputElement>(null);

  const [queue] = useState<Queue<number>>(new Queue());
  const [queueItems, setQueueItems] = useState<number[]>([]);
  const [queueValue, setQueueValue] = useState<string>('');
  const [queueMessage, setQueueMessage] = useState<string>('');
  const queueInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'stack' | 'queue'>('stack');

  const updateVisualStack = () => {
    setStackItems([...stack.toArray()]);
  };

  const updateVisualQueue = () => {
    setQueueItems([...queue.toArray()]);
  };

  const handlePush = () => {
    if (!stackValue.trim()) {
      setStackMessage('Please enter a value');
      return;
    }

    const value = parseInt(stackValue);
    if (isNaN(value)) {
      setStackMessage('Please enter a valid number');
      return;
    }

    stack.push(value);
    updateVisualStack();
    setStackValue('');
    setStackMessage(`Pushed ${value} onto the stack`);
    stackInputRef.current?.focus();
  };

  const handlePop = () => {
    const popped = stack.pop();
    if (popped === undefined) {
      setStackMessage('Stack is empty');
    } else {
      setStackMessage(`Popped ${popped} from the stack`);
    }
    updateVisualStack();
  };

  const handlePeekStack = () => {
    const peeked = stack.peek();
    if (peeked === undefined) {
      setStackMessage('Stack is empty');
    } else {
      setStackMessage(`Top of the stack: ${peeked}`);
    }
  };

  const handleClearStack = () => {
    stack.clear();
    updateVisualStack();
    setStackMessage('Stack cleared');
  };

  const handleEnqueue = () => {
    if (!queueValue.trim()) {
      setQueueMessage('Please enter a value');
      return;
    }

    const value = parseInt(queueValue);
    if (isNaN(value)) {
      setQueueMessage('Please enter a valid number');
      return;
    }

    queue.enqueue(value);
    updateVisualQueue();
    setQueueValue('');
    setQueueMessage(`Enqueued ${value} to the queue`);
    queueInputRef.current?.focus();
  };

  const handleDequeue = () => {
    const dequeued = queue.dequeue();
    if (dequeued === undefined) {
      setQueueMessage('Queue is empty');
    } else {
      setQueueMessage(`Dequeued ${dequeued} from the queue`);
    }
    updateVisualQueue();
  };

  const handlePeekQueue = () => {
    const peeked = queue.peek();
    if (peeked === undefined) {
      setQueueMessage('Queue is empty');
    } else {
      setQueueMessage(`Front of the queue: ${peeked}`);
    }
  };

  const handleClearQueue = () => {
    queue.clear();
    updateVisualQueue();
    setQueueMessage('Queue cleared');
  };

  useEffect(() => {
    updateVisualStack();
    updateVisualQueue();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">{activeTab === 'stack' ? 'Stack' : 'Queue'} Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="flex mb-6 space-x-2">
          <Button
            onClick={() => setActiveTab('stack')}
            className={`${activeTab === 'stack' ? 'bg-[#7e61e9]' : 'bg-gray-200 text-gray-700'}`}
          >
            Stack
          </Button>
          <Button
            onClick={() => setActiveTab('queue')}
            className={`${activeTab === 'queue' ? 'bg-[#7e61e9]' : 'bg-gray-200 text-gray-700'}`}
          >
            Queue
          </Button>
        </div>

        {activeTab === 'stack' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={stackValue}
                  onChange={(e) => setStackValue(e.target.value)}
                  placeholder="Enter a value"
                  className="w-full"
                  ref={stackInputRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePush();
                  }}
                />
              </div>
              <Button onClick={handlePush} className="bg-[#7e61e9] hover:bg-[#6a50c7]">
                Push
              </Button>
              <Button onClick={handlePop} className="bg-red-500 hover:bg-red-600">
                Pop
              </Button>
              <Button onClick={handlePeekStack} className="bg-[#260446] hover:bg-[#3b1169]">
                Peek
              </Button>
              <Button onClick={handleClearStack} className="bg-gray-500 hover:bg-gray-600">
                Clear
              </Button>
            </div>
            
            {stackMessage && (
              <div className="mb-4 text-sm font-medium text-gray-600">
                {stackMessage}
              </div>
            )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={queueValue}
                  onChange={(e) => setQueueValue(e.target.value)}
                  placeholder="Enter a value"
                  className="w-full"
                  ref={queueInputRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEnqueue();
                  }}
                />
              </div>
              <Button onClick={handleEnqueue} className="bg-[#7e61e9] hover:bg-[#6a50c7]">
                Enqueue
              </Button>
              <Button onClick={handleDequeue} className="bg-red-500 hover:bg-red-600">
                Dequeue
              </Button>
              <Button onClick={handlePeekQueue} className="bg-[#260446] hover:bg-[#3b1169]">
                Peek
              </Button>
              <Button onClick={handleClearQueue} className="bg-gray-500 hover:bg-gray-600">
                Clear
              </Button>
            </div>
            
            {queueMessage && (
              <div className="mb-4 text-sm font-medium text-gray-600">
                {queueMessage}
              </div>
            )}
          </div>
        )}
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        {activeTab === 'stack' && (
          <div className="overflow-auto">
            <h4 className="text-lg font-semibold text-[#260446] mb-4">Stack Contents:</h4>
            <div className="flex flex-col-reverse items-center space-y-reverse space-y-2">
              {stackItems.length === 0 ? (
                <div className="text-gray-500 text-center p-4">Stack is empty</div>
              ) : (
                <AnimatePresence>
                  {stackItems.map((item, index) => (
                    <motion.div
                      key={`${index}-${item}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full max-w-md p-4 rounded-lg border-2 
                        ${index === stackItems.length - 1 ? 'border-[#7e61e9] bg-[#7e61e9]/10' : 'border-gray-300 bg-white'}
                        flex items-center justify-between`}
                    >
                      <span className="font-mono text-lg">{item}</span>
                      {index === stackItems.length - 1 && (
                        <span className="text-sm font-semibold text-[#7e61e9]">← Top</span>
                      )}
                      {index === 0 && (
                        <span className="text-sm font-semibold text-gray-500">← Bottom</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'queue' && (
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold text-[#260446] mb-4">Queue Contents:</h4>
            <div className="flex flex-row items-center space-x-2 pb-4 min-h-[100px]">
              {queueItems.length === 0 ? (
                <div className="text-gray-500 text-center p-4 w-full">Queue is empty</div>
              ) : (
                <AnimatePresence>
                  {queueItems.map((item, index) => (
                    <motion.div
                      key={`${index}-${item}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-lg border-2 
                        ${index === 0 ? 'border-red-500 bg-red-500/10' : index === queueItems.length - 1 ? 'border-[#7e61e9] bg-[#7e61e9]/10' : 'border-gray-300 bg-white'}
                        flex flex-col items-center justify-between min-w-[100px] h-[100px]`}
                    >
                      <span className="font-mono text-lg">{item}</span>
                      {index === 0 && (
                        <span className="text-sm font-semibold text-red-500">Front</span>
                      )}
                      {index === queueItems.length - 1 && (
                        <span className="text-sm font-semibold text-[#7e61e9]">Rear</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-[#260446] mb-2">Observations</h4>
              <p className="text-gray-700">
                {queueItems.length === 0 
                  ? "Queue is empty. In a queue, elements are added at the rear and removed from the front (FIFO - First In, First Out)."
                  : queueItems.length === 1
                  ? "Queue has one element which is both the front and rear element."
                  : `Queue has ${queueItems.length} elements. New elements are added at the rear (right) and removed from the front (left).`
                }
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-[#260446] mb-2">About {activeTab === 'stack' ? 'Stacks' : 'Queues'}</h4>
          <p className="text-gray-700">
            {activeTab === 'stack' 
              ? "A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. The element added last will be the first to be removed."
              : "A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. The element added first will be the first to be removed."
            }
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-[#260446] mb-2">Operations:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {activeTab === 'stack' ? (
                  <>
                    <li><span className="font-semibold">Push:</span> Add an element to the top</li>
                    <li><span className="font-semibold">Pop:</span> Remove the topmost element</li>
                    <li><span className="font-semibold">Peek:</span> View the topmost element without removing it</li>
                  </>
                ) : (
                  <>
                    <li><span className="font-semibold">Enqueue:</span> Add an element to the rear</li>
                    <li><span className="font-semibold">Dequeue:</span> Remove the element from the front</li>
                    <li><span className="font-semibold">Peek:</span> View the element at the front without removing it</li>
                  </>
                )}
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-[#260446] mb-2">Applications:</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {activeTab === 'stack' ? (
                  <>
                    <li>Function call management</li>
                    <li>Expression evaluation</li>
                    <li>Undo/Redo operations</li>
                    <li>Browser history</li>
                  </>
                ) : (
                  <>
                    <li>Print queue management</li>
                    <li>Task scheduling</li>
                    <li>Breadth-first search</li>
                    <li>Message buffers</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StackAnimation;
