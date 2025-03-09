import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectionSortAnimation from "@/components/animations/SelectionSortAnimation";
import DijkstrasAlgorithmAnimation from "@/components/animations/DijkstrasAlgorithmAnimation";
import MinimumSpanningTreeAnimation from "@/components/animations/MinimumSpanningTreeAnimation";
import GreedyBestFirstSearchAnimation from "@/components/animations/GreedyBestFirstSearchAnimation";
import { topicDetails } from "@/data/topics";
import { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlgorithmDetail = () => {
  const { id } = useParams();
  const [activeLanguage, setActiveLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  
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
    implementation: {
      javascript: `// Example implementation
function algorithm(input) {
  // Implementation details
  return result;
}`,
      python: `# Example implementation
def algorithm(input):
    # Implementation details
    return result`,
      java: `// Example implementation
public class Algorithm {
    public static Object algorithm(Object input) {
        // Implementation details
        return result;
    }
}`,
      cpp: `// Example implementation
#include <iostream>

template<typename T>
T algorithm(T input) {
    // Implementation details
    return result;
}`,
      c: `// Example implementation
#include <stdio.h>

void* algorithm(void* input) {
    // Implementation details
    return result;
}`,
      csharp: `// Example implementation
public class Algorithm {
    public static object AlgorithmMethod(object input) {
        // Implementation details
        return result;
    }
}`
    },
    objective: "Learn how to implement and use this algorithm to solve various problems."
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

  const copyCode = () => {
    const implementationContent = typeof content.implementation === 'object' 
      ? content.implementation[activeLanguage] || content.implementation.javascript
      : content.implementation;
    
    navigator.clipboard.writeText(implementationContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                  
                  <div className="mb-4 overflow-hidden rounded-md border">
                    <div className="bg-[#1e1e1e] rounded-t-md">
                      <div className="flex overflow-x-auto">
                        <TabsList className="bg-transparent h-10 w-full justify-start rounded-none p-0">
                          <TabsTrigger 
                            value="javascript" 
                            onClick={() => setActiveLanguage("javascript")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "javascript" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            JavaScript
                          </TabsTrigger>
                          <TabsTrigger 
                            value="python" 
                            onClick={() => setActiveLanguage("python")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "python" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            Python
                          </TabsTrigger>
                          <TabsTrigger 
                            value="java" 
                            onClick={() => setActiveLanguage("java")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "java" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            Java
                          </TabsTrigger>
                          <TabsTrigger 
                            value="cpp" 
                            onClick={() => setActiveLanguage("cpp")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "cpp" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            C++
                          </TabsTrigger>
                          <TabsTrigger 
                            value="c" 
                            onClick={() => setActiveLanguage("c")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "c" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            C
                          </TabsTrigger>
                          <TabsTrigger 
                            value="csharp" 
                            onClick={() => setActiveLanguage("csharp")}
                            className={`rounded-none px-4 py-2 h-10 text-sm text-white/70 data-[state=active]:bg-[#2d2d2d] data-[state=active]:text-white ${activeLanguage === "csharp" ? "border-b-2 border-[#7e61e9]" : ""}`}
                          >
                            C#
                          </TabsTrigger>
                        </TabsList>
                        <div className="flex items-center px-2 ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyCode}
                            className="h-8 w-8 text-white/70 hover:text-white"
                          >
                            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1e1e1e] p-4 overflow-x-auto">
                      <pre className="text-sm text-white font-mono">
                        {typeof content.implementation === 'object' 
                          ? content.implementation[activeLanguage] || content.implementation.javascript
                          : content.implementation}
                      </pre>
                    </div>
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
