
export interface Topic {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    icon: string;
  }
  
  export interface TopicDetail {
    id: string;
    title: string;
    aim: string;
    objective: string;
    theory: string;
    implementation: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    animation?: string;
    test?: {
      questions: {
        question: string;
        options: string[];
        answer: number;
      }[]
    };
  }
  
  export interface FieldType {
    id: string;
    title: string;
    topics: Topic[];
  }
  
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
    "stack": {
      id: "stack",
      title: "Stack Data Structure",
      aim: "To understand the implementation and working of the Stack data structure.",
      objective: "Learn how to implement and use a Stack for solving various programming problems.",
      theory: `A stack is a linear data structure that follows the Last In First Out (LIFO) principle. This means that the last element inserted into the stack is the first one to be removed.
  
  A stack has two primary operations:
  - Push: Adds an element to the top of the stack
  - Pop: Removes the element from the top of the stack
  
  Additional common operations include:
  - Peek/Top: Returns the top element without removing it
  - isEmpty: Checks if the stack is empty
  
  Stacks are used in many applications:
  - Function call management in programming languages (call stack)
  - Expression evaluation and syntax parsing
  - Undo mechanisms in text editors
  - Browser history (back button functionality)
  - Backtracking algorithms`,
      implementation: `
  class Stack {
    constructor() {
      this.items = [];
    }
    
    // Add element to the top of the stack
    push(element) {
      this.items.push(element);
      return element;
    }
    
    // Remove and return the top element
    pop() {
      if (this.isEmpty()) {
        return "Underflow - Stack is empty";
      }
      return this.items.pop();
    }
    
    // Return the top element without removing it
    peek() {
      if (this.isEmpty()) {
        return "Stack is empty";
      }
      return this.items[this.items.length - 1];
    }
    
    // Check if stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
    
    // Return the size of the stack
    size() {
      return this.items.length;
    }
    
    // Clear the stack
    clear() {
      this.items = [];
    }
    
    // Print the stack
    print() {
      console.log(this.items.toString());
    }
  }
  
  // Example usage:
  const stack = new Stack();
  stack.push(10);
  stack.push(20);
  stack.push(30);
  console.log(stack.peek()); // Output: 30
  console.log(stack.pop());  // Output: 30
  console.log(stack.size()); // Output: 2
      `,
      difficulty: "Easy",
      test: {
        questions: [
          {
            question: "What principle does a Stack follow?",
            options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "LILO (Last In Last Out)", "FILO (First In Last Out)"],
            answer: 1
          },
          {
            question: "Which of the following is NOT a standard operation of a Stack?",
            options: ["Push", "Pop", "Peek", "Insert at Middle"],
            answer: 3
          },
          {
            question: "What is the time complexity of Push operation in a Stack?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            answer: 0
          }
        ]
      }
    },
    "linked-list": {
      id: "linked-list",
      title: "Linked List Data Structure",
      aim: "To understand the implementation and working of the Linked List data structure.",
      objective: "Learn how to implement and use a Linked List for solving various programming problems.",
      theory: `A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (or link) to the next node in the sequence.
  
  Unlike arrays, linked lists don't have a fixed size and can grow or shrink dynamically during program execution.
  
  There are several types of linked lists:
  - Singly Linked List: Each node points to the next node
  - Doubly Linked List: Each node points to both the next and previous nodes
  - Circular Linked List: The last node points back to the first node
  
  Key operations in a linked list include:
  - Insertion: Adding a new node (at the beginning, end, or middle)
  - Deletion: Removing a node
  - Traversal: Visiting each node
  - Searching: Finding a node with a specific value
  
  Linked lists are useful when:
  - You need constant-time insertions/deletions from the list
  - You don't know how many items will be in the list
  - You don't need random access to elements
  - You want to insert items in the middle of the list`,
      implementation: `
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.size = 0;
    }
  
    // Add element to the end of the list
    append(value) {
      const newNode = new Node(value);
      
      // If list is empty, set the head
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        
        // Traverse to the end of the list
        while (current.next) {
          current = current.next;
        }
        
        // Set the next pointer of the last node to the new node
        current.next = newNode;
      }
      
      this.size++;
      return this;
    }
    
    // Add element to the beginning of the list
    prepend(value) {
      const newNode = new Node(value);
      
      // Set the next pointer of the new node to the current head
      newNode.next = this.head;
      // Update the head to the new node
      this.head = newNode;
      
      this.size++;
      return this;
    }
    
    // Insert at specific position
    insertAt(value, index) {
      // Check if index is valid
      if (index < 0 || index > this.size) {
        return false;
      }
      
      // If index is 0, prepend
      if (index === 0) {
        return this.prepend(value);
      }
      
      const newNode = new Node(value);
      let current = this.head;
      let previous = null;
      let count = 0;
      
      // Traverse to the desired position
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      
      // Insert the new node
      newNode.next = current;
      previous.next = newNode;
      
      this.size++;
      return true;
    }
    
    // Remove element at specific index
    removeAt(index) {
      // Check if index is valid
      if (index < 0 || index >= this.size) {
        return null;
      }
      
      let current = this.head;
      let previous = null;
      let count = 0;
      
      // If removing the head
      if (index === 0) {
        this.head = current.next;
      } else {
        // Traverse to the desired position
        while (count < index) {
          previous = current;
          current = current.next;
          count++;
        }
        
        // Remove the node
        previous.next = current.next;
      }
      
      this.size--;
      return current.value;
    }
    
    // Search for a value
    search(value) {
      let current = this.head;
      let index = 0;
      
      while (current) {
        if (current.value === value) {
          return index;
        }
        current = current.next;
        index++;
      }
      
      return -1;
    }
    
    // Get the size of the list
    getSize() {
      return this.size;
    }
    
    // Check if list is empty
    isEmpty() {
      return this.size === 0;
    }
    
    // Print the list
    print() {
      let current = this.head;
      let result = '';
      
      while (current) {
        result += current.value + (current.next ? ' -> ' : '');
        current = current.next;
      }
      
      console.log(result || 'Empty List');
      return result;
    }
  }
  
  // Example usage:
  const list = new LinkedList();
  list.append(10);
  list.append(20);
  list.prepend(5);
  list.insertAt(15, 2);
  console.log(list.print()); // Output: 5 -> 10 -> 15 -> 20
  console.log(list.search(15)); // Output: 2
  list.removeAt(2);
  console.log(list.print()); // Output: 5 -> 10 -> 20
      `,
      difficulty: "Easy",
      test: {
        questions: [
          {
            question: "What is the main advantage of a linked list over an array?",
            options: ["Faster random access", "Dynamic size", "Less memory usage", "Faster sorting"],
            answer: 1
          },
          {
            question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            answer: 0
          },
          {
            question: "In a singly linked list, each node contains:",
            options: ["Data and a pointer to the previous node", "Only data", "Data and pointers to both next and previous nodes", "Data and a pointer to the next node"],
            answer: 3
          }
        ]
      }
    },
    "binary-search": {
      id: "binary-search",
      title: "Binary Search Algorithm",
      aim: "To understand the implementation and working of the Binary Search algorithm.",
      objective: "Learn how to implement and use Binary Search for efficiently finding elements in a sorted array.",
      theory: `Binary Search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half.
  
  The algorithm follows these steps:
  1. Compare the target value with the middle element of the array
  2. If the target matches the middle element, return its position
  3. If the target is less than the middle element, continue search in the left half
  4. If the target is greater than the middle element, continue search in the right half
  5. Repeat until the target is found or the subarray size becomes zero
  
  Key characteristics of Binary Search:
  - Works only on sorted arrays
  - Has a time complexity of O(log n)
  - Significantly faster than linear search for large arrays
  - Uses the divide-and-conquer strategy
  
  Binary Search can be implemented both iteratively and recursively. The algorithm is commonly used in many applications like:
  - Dictionary lookups
  - Finding records in databases
  - Implementing efficient searching in large datasets
  - Root-finding algorithms like square root calculations`,
      implementation: `
  // Iterative Binary Search
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      // Calculate middle index
      const mid = Math.floor((left + right) / 2);
      
      // Check if target is present at mid
      if (arr[mid] === target) {
        return mid;
      }
      
      // If target is greater, ignore left half
      if (arr[mid] < target) {
        left = mid + 1;
      } 
      // If target is smaller, ignore right half
      else {
        right = mid - 1;
      }
    }
    
    // Target not found
    return -1;
  }
  
  // Recursive Binary Search
  function recursiveBinarySearch(arr, target, left = 0, right = arr.length - 1) {
    // Base case: element not found
    if (left > right) {
      return -1;
    }
    
    // Calculate middle index
    const mid = Math.floor((left + right) / 2);
    
    // Check if target is present at mid
    if (arr[mid] === target) {
      return mid;
    }
    
    // If target is greater, search in right half
    if (arr[mid] < target) {
      return recursiveBinarySearch(arr, target, mid + 1, right);
    } 
    // If target is smaller, search in left half
    else {
      return recursiveBinarySearch(arr, target, left, mid - 1);
    }
  }
  
  // Example usage:
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17];
  console.log(binarySearch(sortedArray, 7)); // Output: 3
  console.log(binarySearch(sortedArray, 6)); // Output: -1
  console.log(recursiveBinarySearch(sortedArray, 15)); // Output: 7
      `,
      difficulty: "Easy",
      test: {
        questions: [
          {
            question: "What is the time complexity of Binary Search?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            answer: 2
          },
          {
            question: "Binary Search works on which type of arrays?",
            options: ["Any array", "Only sorted arrays", "Only numeric arrays", "Only character arrays"],
            answer: 1
          },
          {
            question: "Which strategy does Binary Search employ?",
            options: ["Greedy algorithm", "Dynamic programming", "Divide and conquer", "Backtracking"],
            answer: 2
          }
        ]
      }
    },
    "selection-sort": {
      id: "selection-sort",
      title: "Selection Sort",
      aim: "To understand the implementation and working of Selection Sort algorithm.",
      objective: "Learn how to find the minimum element in an unsorted array and place it at the beginning.",
      theory: `Selection sort is a simple comparison-based sorting algorithm. 
      The algorithm divides the input list into two parts: the sublist of items already sorted, which is 
      built up from left to right, and the sublist of items remaining to be sorted that occupy the rest of the list.
      
      Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. 
      The algorithm proceeds by finding the smallest element in the unsorted sublist, 
      exchanging (swapping) it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.`,
      implementation: `
  function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      // Find the minimum element in the unsorted array
      let minIdx = i;
      
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      // Swap the found minimum element with the first element
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
    }
    
    return arr;
  }
      `,
      difficulty: "Easy",
      test: {
        questions: [
          {
            question: "What is the time complexity of Selection Sort?",
            options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            answer: 2
          },
          {
            question: "Selection Sort is an in-place algorithm?",
            options: ["True", "False"],
            answer: 0
          }
        ]
      }
    },
    "bayesian-network": {
      id: "bayesian-network",
      title: "Construction of Bayesian Network",
      aim: "To understand the principles behind Bayesian Networks and learn how to construct them.",
      objective: "Learn how to represent probabilistic relationships between random variables with a directed acyclic graph.",
      theory: `A Bayesian Network is a probabilistic graphical model that represents variables and their conditional dependencies via a directed acyclic graph (DAG). 
      
      Bayesian networks are ideal for representing situations where some information is already known and incoming data is uncertain or partially unavailable. They can be used to update beliefs given new evidence about a system.
      
      The nodes in the graph represent random variables, while the edges represent conditional dependencies. Each node is associated with a probability function that takes as input a particular set of values for the node's parent variables and gives the probability of the variable represented by the node.`,
      implementation: `
  class BayesianNode {
    constructor(name, states) {
      this.name = name;
      this.states = states;
      this.parents = [];
      this.cpt = {}; // Conditional Probability Table
    }
    
    addParent(parent) {
      this.parents.push(parent);
    }
    
    setCPT(cpt) {
      this.cpt = cpt;
    }
  }
  
  class BayesianNetwork {
    constructor() {
      this.nodes = {};
    }
    
    addNode(node) {
      this.nodes[node.name] = node;
    }
    
    // Sample inference method (simplistic)
    infer(query, evidence) {
      // This would be a complex algorithm in practice
      console.log(\`Inferring \${query} given \${JSON.stringify(evidence)}\`);
      return 0.75; // Placeholder probability
    }
  }
      `,
      difficulty: "Hard",
      test: {
        questions: [
          {
            question: "What does a Bayesian Network represent?",
            options: [
              "A decision tree for classification",
              "A neural network architecture", 
              "Probabilistic relationships between variables", 
              "A clustering algorithm"
            ],
            answer: 2
          },
          {
            question: "What is the structure of a Bayesian Network?",
            options: [
              "Undirected cyclic graph", 
              "Directed acyclic graph", 
              "Undirected acyclic graph", 
              "Directed cyclic graph"
            ],
            answer: 1
          }
        ]
      }
    }
  };
  