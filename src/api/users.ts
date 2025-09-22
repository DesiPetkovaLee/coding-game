// This is a mock API

// --- MOCK USER DATABASE ---(normally this should live in the Postgres DB) 
const MOCK_USERS = [
    { id: 1, name: "Purbai", email: "purbai@example.com" },
];

interface UserData {
    id: number;
    name: string;
    email: string;
    characterId?: number | null; 
}

// --- MOCK API FUNCTIONS ---(to replace the contents of these functions with fetch calls to our SB backend api.)

export const loginUser = async (email: string): Promise<{ user: UserData | null }> => {
    // Notes - replace this mock logic with a real API call to SB backend.
    // can use this function to perform the "authorisation GET request".
    // const response = await fetch(`https://our-api.com/users/auth?email=${email}`);
    // if (response.ok) {
    //     const user = await response.json();
    //     return { user };
    // } else {
    //     return { user: null };
    // }

    console.log(`[MOCK] Checking database for email: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // simulating network delay

    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
        console.log("[MOCK] User found:", user);
        return { user };
    } else {
        console.log("[MOCK] User not found.");
        return { user: null };
    }
};

interface SignupData {
    name: string;
    email: string;
}

export const signupUser = async (signupData: SignupData): Promise<{ user: UserData | null, error?: string }> => {
    // replace this with a real API call (POST request)
    console.log("[MOCK] Attempting to sign up user:", signupData);
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === signupData.email.toLowerCase());
    if (existingUser) {
        console.log("[MOCK] Signup failed: Email already exists.");
        return { user: null, error: "Email already exists." };
    }

    const newUser = {
        id: MOCK_USERS.length + 1,
        name: signupData.name,
        email: signupData.email,
    };
    MOCK_USERS.push(newUser);
    console.log("[MOCK] Signup successful. New user:", newUser);
    return { user: newUser };
};
