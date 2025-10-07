import React, { useEffect, useState } from "react";
import { getAllData, deleteDataById } from "../../api/backendClients";
import { CodingQuestionStyles as styles } from "./CodingQuestionStyles";
import type { CodingQuestionData } from "./CodingQuestionTypes";
import CodingQuestionForm from "./CodingQuestionForm";
import ConfirmModal from "./../common/ConfirmModal";

export const CodingQuestion = () => {
    const [questions, setQuestions] = useState<CodingQuestionData[]>([]);
    const [currentAction, setCurrentAction] = useState<{
        type: "add" | "edit" | "clone";
        question: CodingQuestionData | null;
    } | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const apiEndPoint = "codingquestion";
    const apiMessage = "Coding Question";

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const data: CodingQuestionData[] = await getAllData(
            apiEndPoint,
            apiMessage
        );
        setQuestions(data);
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            await deleteDataById(apiEndPoint, deleteId, apiMessage);
            setShowConfirm(false);
            setDeleteId(null);
            fetchQuestions();
        }
    };

    return (
        <div className={styles.listContainer}>
            <h1 className={styles.title}>Coding Questions</h1>

            {/* List */}
            <button
                className={styles.buttonSubmit}
                onClick={() =>
                    setCurrentAction({ type: "add", question: null })
                }
            >
                Add New Question
            </button>

            <ul className={styles.list}>
                {questions.map((q) => (
                    <li key={q.id} className={styles.listItem}>
                        <h2 className="font-bold">{q.questionTitle}</h2>
                        <p className={styles.listKeyDesc}>{q.questionDesc}</p>
                        <p className={styles.listKey}>
                            Difficulty: {q.difficulty}
                        </p>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() =>
                                    setCurrentAction({
                                        type: "edit",
                                        question: q,
                                    })
                                }
                                className={styles.buttonEdit}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(q.id!)}
                                className={styles.buttonDelete}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentAction({
                                        type: "clone",
                                        question: q,
                                    })
                                }
                                className={styles.buttonEdit}
                            >
                                Clone
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Form Modal */}
            {currentAction && (
                <CodingQuestionForm
                    action={currentAction.type}
                    question={currentAction.question}
                    onClose={() => {
                        setCurrentAction(null);
                        fetchQuestions();
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this question?"
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};
