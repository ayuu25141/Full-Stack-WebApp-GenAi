import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Formbuild() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const MAX_LENGTH = 200; // max characters allowed

  // React Query (disabled until clicking button)
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["generateHtml", inputValue],
    queryFn: async () => {
      const res = await axios.post("http://localhost:8080/generate", {
        description: inputValue,
      });
      return res.data; // expects { html: "<form>...</form>" }
    },
    enabled: false, // do not auto-fetch
  });

  // Download generated HTML
  const downloadHtml = (html) => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-form.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input
    const trimmed = inputValue.trim();

    // Validate input
    if (!trimmed) {
      setInputError("Description cannot be empty.");
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setInputError(`Description cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }

    // Optionally: simple keyword check (form-related)
    const allowedKeywords = ["form", "input", "contact", "registration"];
    const isValid = allowedKeywords.some((k) =>
      trimmed.toLowerCase().includes(k)
    );

    if (!isValid) {
      setInputError("Only form-related requests are allowed.");
      return;
    }

    setInputError(""); // clear error
    refetch(); // trigger API call
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Build Your Form with AI
          </h2>
          <p className="text-gray-600 mt-2">
            Describe your form, and we'll generate the HTML for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Describe Your Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="form-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  What kind of form do you need?
                </label>
                <textarea
                  id="form-description"
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="e.g., A contact form with name, email, and message fields"
                  value={inputValue}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <p className="text-gray-400 text-sm mt-1">
                  {inputValue.length}/{MAX_LENGTH} characters
                </p>
                {inputError && (
                  <p className="text-red-500 text-sm mt-1">{inputError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim() || isFetching}
                className={`w-full md:w-auto px-6 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
                  !inputValue.trim() || isFetching
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isFetching ? "Generating..." : "Generate Form"}
              </button>
            </form>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Generated Form
            </h3>

            <div className="bg-gray-50 rounded-md p-4 border border-gray-200 min-h-[200px]">
              {isFetching && (
                <p className="text-gray-400 italic">Generating...</p>
              )}

              {error && <p className="text-red-500">Error: {error.message}</p>}

              {data?.html ? (
                <>
                  <div
                    className="generated-preview"
                    dangerouslySetInnerHTML={{ __html: data.html }}
                  />
                  <button
                    onClick={() => downloadHtml(data.html)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Download HTML
                  </button>
                </>
              ) : (
                <p className="text-gray-400 italic text-center py-8">
                  Your generated form will appear here.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Formbuild;
