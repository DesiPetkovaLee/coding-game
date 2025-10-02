import React, { useEffect, useState } from "react";
import { getAllData,updateData,createData,deleteDataById } from "./../../api/backendClients";

interface CodingQuestion {
    id: number | null;
    questionTitle: string;
    questionDesc: string;
    functionName: string;
    starterCode: string;
    hints: string;
    examples: string[]; // stored as array
    helperFunction?: string;
    constraints: string;
    solution: string;
    difficulty: string;
    testCases: string[]; // stored as array
}

// For frontend form
export interface CodingQuestionForm {
  id: number | null;
  questionTitle: string;
  questionDesc: string;
  functionName: string;
  starterCode: string;
  hints: string;
  examples: string;   // string for input field
  helperFunction: string;
  constraints: string;
  solution: string;
  difficulty: string;
  testCases: string;  // string for input field
}

export const CodingQuestion = () => {
    const [questions, setQuestions] = useState<CodingQuestion[]>([]);
    const [formData, setFormData] = useState<
        Omit<CodingQuestionForm, "id"> & {
            id: number | null;
            examples: string;
            testCases: string;
        }
    >({
        id: null,
        questionTitle: "",
        questionDesc: "",
        functionName: "",
        starterCode: "",
        hints: "",
        examples: "",
        helperFunction: "",
        constraints: "",
        solution: "",
        difficulty: "",
        testCases: "",
    });
    const apiEndPoint = "codingquestion"
    const apiMessage = "Coding Question"

    // Fetch all coding questions
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        const res = await getAllData(apiEndPoint,apiMessage);
        setQuestions(res.data);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

          const payload: CodingQuestion = {
              id: formData.id,
              questionTitle: formData.questionTitle,
              questionDesc: formData.questionDesc,
              functionName: formData.functionName,
              starterCode: formData.starterCode,
              hints: formData.hints,
              examples: formData.examples.split(",").map((s) => s.trim()),
              helperFunction: formData.helperFunction,
              constraints: formData.constraints,
              solution: formData.solution,
              difficulty: formData.difficulty,
              testCases: formData.testCases.split(",").map((s) => s.trim()),
          };
          
        if (formData.id) {
            // Update existing question
            await updateData(apiEndPoint, formData.id, apiMessage, payload);
        } else {
            // Create new question
            await createData(apiEndPoint, apiMessage, payload);
        }

        // Reset form back to empty
        setFormData({
            id: null,
            questionTitle: "",
            questionDesc: "",
            functionName: "",
            starterCode: "",
            hints: "",
            examples: "",
            helperFunction: "",
            constraints: "",
            solution: "",
            difficulty: "",
            testCases: "",
        });

        fetchQuestions();
    };

    const handleEdit = (question: CodingQuestion) => {
        setFormData({
            id: question.id,
            questionTitle: question.questionTitle,
            questionDesc: question.questionDesc,
            functionName: question.functionName,
            starterCode: question.starterCode,
            hints: question.hints,
            examples: question.examples?.join(", ") || "",
            helperFunction: question.helperFunction || "",
            constraints: question.constraints,
            solution: question.solution,
            difficulty: question.difficulty,
            testCases: question.testCases?.join(", ") || "",
        });
    };

    const handleDelete = async (id : number) => {
        await deleteDataById(apiEndPoint,id,apiMessage);
        fetchQuestions();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Coding Questions</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
                <input
                    type="text"
                    name="questionTitle"
                    value={formData.questionTitle}
                    onChange={handleChange}
                    placeholder="Question Title"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="questionDesc"
                    value={formData.questionDesc}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="functionName"
                    value={formData.functionName}
                    onChange={handleChange}
                    placeholder="Function Name"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="starterCode"
                    value={formData.starterCode}
                    onChange={handleChange}
                    placeholder="Starter Code"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="hints"
                    value={formData.hints}
                    onChange={handleChange}
                    placeholder="Hints"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="examples"
                    value={formData.examples}
                    onChange={handleChange}
                    placeholder="Examples (comma-separated)"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="helperFunction"
                    value={formData.helperFunction?? ""}
                    onChange={handleChange}
                    placeholder="Helper Function"
                    className="border p-2 rounded"
                />
                <textarea
                    name="constraints"
                    value={formData.constraints}
                    onChange={handleChange}
                    placeholder="Constraints"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    placeholder="Solution"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    placeholder="Difficulty"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="testCases"
                    value={formData.testCases}
                    onChange={handleChange}
                    placeholder="Test Cases (comma-separated)"
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {formData.id ? "Update" : "Add"} Question
                </button>
            </form>

            {/* List */}
            <ul className="space-y-4">
                {questions.map((q) => (
                    <li key={q.id} className="p-4 border rounded shadow">
                        <h2 className="font-bold">{q.questionTitle}</h2>
                        <p className="text-sm text-gray-600">
                            {q.questionDesc}
                        </p>
                        <p className="text-xs text-gray-500">
                            Difficulty: {q.difficulty}
                        </p>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => handleEdit(q)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(q.id!)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
