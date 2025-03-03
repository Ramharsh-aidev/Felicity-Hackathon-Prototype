
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const AlgorithmDetail = () => {
  const { id } = useParams();

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
            <a href="/" className="text-primary hover:underline">
              ← Back to Algorithms
            </a>
          </nav>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Algorithm Details - {id}
            </h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Aim & Objective</h2>
                <p className="text-gray-600">
                  Understanding the core concepts and implementation details of this algorithm.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Theory</h2>
                <p className="text-gray-600">
                  Detailed explanation of the algorithm's working principles and concepts.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Implementation</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm">
                    {`// Example implementation
function algorithm(input) {
  // Implementation details
  return result;
}`}
                  </pre>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Animation</h2>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p>Algorithm visualization will be displayed here</p>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgorithmDetail;
