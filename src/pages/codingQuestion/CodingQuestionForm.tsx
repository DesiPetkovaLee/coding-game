import React, { useState } from "react";
import { createData, updateData } from "../../api/backendClients";
import { CodingQuestionStyles as styles } from "./codingQuestionStyles";
import type {
    CodingQuestionData,
    CodingQuestionFormData,
} from "./CodingQuestionTypes";

interface Props {
    action: "add" | "edit" | "clone";
    question: CodingQuestionData | null;
    onClose: () => void;
}

const CodingQuestionForm: React.FC<Props> = ({ action, question, onClose }) => {
    const [formData, setFormData] = useState<CodingQuestionFormData>({
        id: action === "edit" ? question?.id ?? null : null, // if clone, id should be null
        questionTitle: question?.questionTitle ?? "",
        questionDesc: question?.questionDesc ?? "",
        functionName: question?.functionName ?? "",
        starterCode: question?.starterCode ?? "",
        hints: question?.hints ?? "",
        examples: question?.examples?.join("\n") ?? "",
        helperFunction: question?.helperFunction ?? "",
        constraints: question?.constraints ?? "",
        solution: question?.solution ?? "",
        difficulty: question?.difficulty ?? "",
        testCases: question?.testCases?.join("\n") ?? "",
    });

    const apiEndPoint = "codingquestion";
    const apiMessage = "Coding Question";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: CodingQuestionData = {
            id: action === "edit" ? formData.id : null,
            questionTitle: formData.questionTitle,
            questionDesc: formData.questionDesc,
            functionName: formData.functionName,
            starterCode: formData.starterCode,
            hints: formData.hints,
            examples: formData.examples.split("\n").map((s) => s.trim()),
            helperFunction: formData.helperFunction,
            constraints: formData.constraints,
            solution: formData.solution,
            difficulty: formData.difficulty,
            testCases: formData.testCases.split("\n").map((s) => s.trim()),
        };

        
        console.log("data: ", JSON.stringify({formData}));
        const saveData = true;

        if (saveData){
        if (action === "edit" && formData.id) {
            console.log("action: ", action);
            await updateData(apiEndPoint, formData.id, apiMessage, payload);
        } else {
            console.log("action - else - sending formData: ", action);
            await createData(apiEndPoint, apiMessage, payload);
        }
    }

        onClose();
    };

    return (
        <div className={styles.editOverlayContainer}>
            <div className={styles.editWindow}>
                <h2 className={styles.title}>
                    {action === "add"
                        ? "Add New Question"
                        : action === "edit"
                        ? "Edit Question"
                        : "Clone Question"}
                </h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="questionTitle">Question Title</label>
                    <input
                        type="text"
                        name="questionTitle"
                        id="questionTitle"
                        value={formData.questionTitle}
                        onChange={handleChange}
                        placeholder="Question Title"
                        className={styles.input}
                        required
                    />
                    <label htmlFor="questionDesc">Question Description</label>
                    <textarea
                        name="questionDesc"
                        id="questionDesc"
                        value={formData.questionDesc}
                        onChange={handleChange}
                        placeholder="Description"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="functionName">Function Name</label>
                    <input
                        type="text"
                        name="functionName"
                        id="functionName"
                        value={formData.functionName}
                        onChange={handleChange}
                        placeholder="Function Name"
                        className={styles.input}
                        required
                    />
                    <label htmlFor="starterCode">Starter Code</label>
                    <textarea
                        name="starterCode"
                        id="starterCode"
                        value={formData.starterCode}
                        onChange={handleChange}
                        placeholder="Starter Code"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="hints">Hints</label>
                    <textarea
                        name="hints"
                        id="hints"
                        value={formData.hints}
                        onChange={handleChange}
                        placeholder="Hints"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="examples">Examples</label>
                    <textarea
                        name="examples"
                        id="examples"
                        value={formData.examples}
                        onChange={handleChange}
                        placeholder="Enter one example per line"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="helperFunction">Helper Function</label>
                    <textarea
                        name="helperFunction"
                        id="helperFunction"
                        value={formData.helperFunction}
                        onChange={handleChange}
                        placeholder="Helper Function"
                        className={styles.textArea}
                    />
                    <label htmlFor="constraints">Constraints</label>
                    <textarea
                        name="constraints"
                        id="constraints"
                        value={formData.constraints}
                        onChange={handleChange}
                        placeholder="Constraints"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="solution">Solution</label>
                    <textarea
                        name="solution"
                        id="solution"
                        value={formData.solution}
                        onChange={handleChange}
                        placeholder="Solution"
                        className={styles.textArea}
                        required
                    />
                    <label htmlFor="difficulty">Difficulty Level</label>
                    <input
                        type="text"
                        name="difficulty"
                        id="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        placeholder="Difficulty"
                        className={styles.input}
                        required
                    />
                    <label htmlFor="testCases">Test Cases</label>
                    <textarea
                        name="testCases"
                        id="testCases"
                        value={formData.testCases}
                        onChange={handleChange}
                        placeholder="Enter one test case per line"
                        className={styles.textArea}
                        required
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.buttonEdit}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.buttonSubmit}>
                            {action === "edit" ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CodingQuestionForm;
