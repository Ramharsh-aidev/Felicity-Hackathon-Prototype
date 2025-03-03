
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { topicDetails } from "@/data/topics";

interface Question {
  id?: number;
  question: string;
  options: string[];
  correctAnswer?: number;
  answer?: number;
  explanation?: string;
}

const TestQuestions = ({ topicId }: { topicId?: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topicTitle, setTopicTitle] = useState("Practice Test");

  // Get questions based on topic or use default DSA questions
  useEffect(() => {
    // Default DSA questions in case no specific topic is provided
    const defaultQuestions: Question[] = [
      {
        id: 1,
        question: "What is the time complexity of Binary Search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: 1,
        explanation: "Binary Search has a time complexity of O(log n) because with each comparison, it halves the search space."
      },
      {
        id: 2,
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: 1,
        explanation: "A Stack follows the Last In First Out principle, where the last element added is the first one to be removed."
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: 3,
        explanation: "The worst-case time complexity of Quick Sort is O(n²), which occurs when the pivot chosen is consistently the smallest or largest element."
      },
      {
        id: 4,
        question: "Which of the following is not an in-place sorting algorithm?",
        options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        correctAnswer: 2,
        explanation: "Merge Sort is not an in-place sorting algorithm because it requires additional space proportional to the size of the input array."
      },
      {
        id: 5,
        question: "What is the space complexity of Depth First Search (DFS) algorithm?",
        options: ["O(V)", "O(E)", "O(V+E)", "O(V²)"],
        correctAnswer: 0,
        explanation: "The space complexity of DFS is O(V) where V is the number of vertices. This accounts for the recursion stack."
      },
      {
        id: 6,
        question: "Which data structure is best for implementing a priority queue?",
        options: ["Array", "Linked List", "Heap", "Stack"],
        correctAnswer: 2,
        explanation: "A Heap is the most efficient data structure for implementing a priority queue, offering O(log n) time complexity for insertion and deletion."
      },
      {
        id: 7,
        question: "What is the time complexity of accessing an element in a hash table?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        explanation: "Hash tables provide O(1) constant time complexity for accessing elements in the average case."
      },
      {
        id: 8,
        question: "Which traversal of a binary tree visits the root node first?",
        options: ["Inorder", "Preorder", "Postorder", "Level order"],
        correctAnswer: 1,
        explanation: "Preorder traversal visits the root node first, then the left subtree, and finally the right subtree."
      }
    ];

    if (topicId && topicDetails[topicId]?.test?.questions) {
      const topicQuestions = topicDetails[topicId].test.questions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        explanation: "", // Topic questions might not have explanations
      }));
      setQuestions(topicQuestions);
      setTopicTitle(topicDetails[topicId].title);
    } else {
      setQuestions(defaultQuestions);
      setTopicTitle("DSA Practice Test");
    }

    // Reset state when questions change
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTotalAttempted(0);
  }, [topicId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null || !currentQuestion) return;
    
    setIsAnswered(true);
    setTotalAttempted(prev => prev + 1);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Start over with the first question
      setCurrentQuestionIndex(0);
    }
    
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#260446]">{topicTitle}</h2>
        <div className="text-sm font-medium bg-purple-100 text-[#7e61e9] px-4 py-2 rounded-full">
          Score: {score}/{totalAttempted}
        </div>
      </div>

      <Card className="shadow-md border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
          <CardTitle className="text-[#260446]">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg font-medium text-gray-800 mb-6">{currentQuestion.question}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`
                  p-4 rounded-md border cursor-pointer transition-all
                  ${selectedOption === index ? 'border-[#7e61e9] bg-purple-50' : 'border-gray-200 hover:border-purple-200'}
                  ${isAnswered && index === currentQuestion.correctAnswer ? 'bg-green-50 border-green-300' : ''}
                  ${isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer ? 'bg-red-50 border-red-300' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <AnimatePresence>
            {isAnswered && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md"
              >
                <h3 className="font-medium text-blue-800 mb-2">Explanation</h3>
                <p className="text-blue-700 text-sm">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-purple-100 bg-gradient-to-r from-white to-purple-50">
          {!isAnswered ? (
            <Button 
              className="bg-[#7e61e9] hover:bg-[#6e51d9] text-white"
              onClick={handleSubmit}
              disabled={selectedOption === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              className="bg-[#7e61e9] hover:bg-[#6e51d9] text-white"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Start Over"}
            </Button>
          )}
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestQuestions;
