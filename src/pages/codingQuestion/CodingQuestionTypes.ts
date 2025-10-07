export interface CodingQuestionData {
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
export interface CodingQuestionFormData {
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