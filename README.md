#  CODE FOR YOUR LIFE

**Year: 2030 — Location: United Kingdom, Bakerloo Bunker**  
AI controls the world. You wake in an underground bunker. To survive, you must pass coding challenges.  
Correct answers move you forward. Wrong answers drop you down.

This repo contains a **React + Phaser** game chore structure:

- **React (UI)**: screens, overlays, forms, HUD, questions (with MUI).
- **Phaser (engine)**: levels, scenes, player, enemies, collisions, triggers.
- **EventBus**: bridge to talk between React and Phaser.
- **Backend**: Spring Boot + MySQL on Railway (or Firebase option) to serve users, levels, objects, questions.

---

## Gameplay Flow

1. **Start Screen (React)**  
   - Shows game title and buttons: **Login**, **Signup**, **Continue as Guest**.

2. **Authentication (React + Backend)**  
   - Player logs in or signs up.  
   - User info is stored in backend (Spring Boot/MySQL or Firebase).  

3. **Setup (React)**  
   - Player chooses a character.  
   - Session is created with initial values (level, score, etc.).  

4. **Story Scene (Phaser + React Typewriter)**  
   - Story intro is displayed.  
   - Player can continue or skip.  

5. **Game Preload (Phaser)**  
   - Environment, objects, and music are loaded dynamically.  

6. **Game Scene (Phaser)**  
   - Player moves through a level.  
   - Encounters AI enemies, terminals, or traps.  

7. **Questions (React + MUI overlay on Phaser)**  
   - Reaching a terminal triggers a **Question Panel**.  
   - Player answers coding questions.  
     -  Correct -> score increases, path forward unlocks.  
     -  Wrong -> drop to lower level or lose points.  

8. **Progression**  
   - Levels get harder, with different environments and music.  
   - The story reveals the twist: **you are AI being tested**.  

---

##  Backend Data

The backend (Spring Boot + MySQL on Railway) serves data for gameplay:

- **Users** -> login/signup, track score and progress.  
- **Environments** -> bunker/underwater/etc., with music and background.  
- **Objects** -> robots, terminals (friend or enemy).  
- **Game Setup** -> spawn positions, speed, movement rules.  
- **Questions** -> coding challenges linked to levels.  
- **Question Test Cases** -> validate answers for coding questions.  

---

##  Project Structure and what each folder/file does

### `src/api/`
This folder will contain all the functions that talk to the backend (Spring Boot or Firebase).  
Each file will group related API calls:

### `src/appState/`
This folder holds **React Contexts** and **custom hooks** that provide global state for the whole app.  
Think of it as the “control center” - any component in the app can read or update these values.

- **auth/**  
  - Purpose: Manages user authentication.  
  - Stores: current user object (id, name, email), whether they’re logged in, and their auth token.  
  - Provides functions like `login()`, `logout()`, and `signup()`.  
  - Example usage: The `LoginPage` calls `login()`, and then any component (like HUD) can show the logged-in player’s name without needing to pass props around.

- **session/**  
  - Purpose: Keeps track of the current game run.  
  - Stores: current level id, score, time left, progress, whether the game is paused.  
  - Provides functions to update state (e.g., `setScore(…)`, `advanceLevel(…)`, `pause()`).  
  - Example usage: The Phaser game emits an event like `SCORE_CHANGED`, React updates `GameSessionContext`, and the `Score` component automatically shows the new value.

- **settings/**  
  - Purpose: Stores player preferences.  
  - Stores: sound/music volume, text speed for story typewriter, accessibility options (like high contrast or skip story).  
  - Provides functions like `setVolume(…)`, `toggleMute()`, `setTextSpeed()`.  
  - Example usage: If a player changes volume in the HUD, that preference is saved in `SettingsContext`, and all components (React + Phaser) respect it.  


### `src/components/`
This folder contains **reusable React UI building blocks**.  
They are not full pages by themselves, but smaller pieces you can plug into pages or overlay on top of the Phaser game.

- **auth/**  
  - `LoginForm.tsx` -> Input fields (email, password) + submit button. Calls `api/users.login` when submitted.  
  - `SignupForm.tsx` -> Input fields (name, email, password) + submit button. Calls `api/users.signup`.  
  - These forms handle user entry and connect to the `AuthContext`.

- **game/**  
  - `GameCanvas.tsx` -> The **bridge** between React and Phaser. It mounts the Phaser game inside a `<div>` and allows React overlays (like HUD or QuestionPanel) to sit on top.  
  - `HUD.tsx` -> Heads-Up Display container. Holds `Score`, `Timer`, and control buttons (pause/mute).  
  - `Score.tsx` -> Reads score from `GameSessionContext` and displays it. Updates automatically when the score changes.  
  - `Timer.tsx` -> Shows countdown or elapsed time. Connects to session state or events from Phaser.  
  -  These components let React display information while Phaser runs the game.

- **questions/**  
  - `QuestionPanel.tsx` -> Overlay dialog that opens when a player interacts with a terminal. It listens for `OPEN_QUESTION` events from Phaser via the EventBus.  
  - `MultipleChoice.tsx` -> Renders a coding question with 3–4 options. Calls `onSubmit(answer)` when the player clicks one.  
  - `CodeEditor.tsx` -> A small code editor UI for write-your-own-answer questions (later stages). Sends code to the backend or a local worker to be checked.  
  - `runTests.worker.ts` -> A Web Worker that runs code test cases in the background so the UI doesn’t freeze.  
  - These components let players answer coding challenges, which is the core gameplay mechanic.

- **setup/**  
  - `CharacterSelect.tsx` -> UI to let players pick a character or role. Saves choice into `GameSessionContext` and/or backend.  
  - `UserConfigForm.tsx` -> Extra setup options (difficulty, accessibility). Saves preferences into `SettingsContext`.  
  - Sets the stage for the player’s identity and initial game settings.

- **start/**  
  - `StartScreen.tsx` -> First screen players see. Shows the title **CODE FOR YOUR LIFE** and three buttons: **Login**, **Signup**, **Continue as Guest**.  
  - This is the entry point into the whole app.

- **story/**  
  - `Typewriter.tsx` -> Displays story text with a typing animation. Used in the intro story scene (Year 2030, Bakerloo Bunker backstory).  
  -  This creates immersion and delivers the game’s narrative before gameplay starts.

- **ui/** 
This folder contains small, reusable UI elements (buttons, modals, progress bars) used throughout the app to keep design consistent.

- `Button.tsx` -> Custom button with consistent styling (variants, sizes). Used across forms, HUD, and menus.

- `Modal.tsx` -> Generic modal dialog for overlays (e.g., QuestionPanel, Settings). Handles open/close, focus, and backdrop.

- `ProgressBar.tsx` -> Simple progress indicator. Used for timers, loading bars, or showing level/question progress.

This folder contains small, reusable UI elements (buttons, modals, progress bars) used throughout the app to keep design consistent.


### `src/constants/`
- **events.ts** -> Holds **shared constant values** that never change.  
Used to avoid typos and keep code consistent across the app. Defines all EventBus event names (strings) for React <-> Phaser communication.  
  Example: `OPEN_QUESTION`, `ANSWER_CORRECT`, `SCORE_CHANGED`.  
  Instead of writing `"OPEN_QUESTION"` everywhere, both sides import it from here. 

### `src/hooks/`
- **useEventBus.ts** -> reusable hook to subscribe/unsubscribe to EventBus events (to be confirmed)  

### `src/pages/`
- **auth/** -> `LoginPage`, `SignupPage`.  
- **setup/** -> wraps setup components.  
- **start/** -> wraps StartScreen.  
- **story/** -> shows Typewriter scene.  
- **levelSelect/** -> wraps LevelSelect.  

### `src/phaser/`
This folder contains all the **Phaser engine code**.  
It controls the game world (movement, levels, enemies, collisions) and communicates with React through the EventBus.

- **core/**  
  - `config.ts` -> Phaser configuration (canvas size, physics settings, background color, list of scenes to load in order).  
    Example: BootScene -> PreloadScene -> StoryScene -> GameScene.  
  - `EventBus.ts` -> A single **event emitter** used for communication between Phaser and React.  
    Example: GameScene emits `OPEN_QUESTION`, and React’s QuestionPanel listens for it.  
  - `game.ts` -> Functions to create/destroy the Phaser game instance.  
    Example: `initGame(containerElement)` runs `new Phaser.Game(config)` when `GameCanvas` mounts in React.

- **prefabs/**  
  Prefabs are **reusable objects** (classes) you can spawn in different scenes.  
  - `Player.ts` -> Defines the player character: sprite, movement controls (WASD/arrow keys), animations, collisions.  
  - `AIEnemy.ts` -> Defines an enemy (robot/AI). Can patrol, chase, or attack the player depending on config.  
  - `Terminal.ts` -> Defines an interactable computer. When the player reaches it, emits an event like:  
    ```ts
    EventBus.emit("OPEN_QUESTION", { questionId: 1 });
    ```
    which tells React to open a QuestionPanel.

- **scenes/**  
  Scenes are the **different states or screens** inside Phaser. Each scene is like a mini-game area.
  - `BootScene.ts` -> First scene. Very small. Sets up scaling, background, and transitions to PreloadScene.  
  - `PreloadScene.ts` -> Loads all assets (images, sounds, tilemaps) for the next level. Talks to the backend to know what to load. Then starts GameScene or StoryScene.  
  - `GameScene.ts` -> The main gameplay scene. Spawns the map, player, enemies, and terminals. Listens to answers from React (via EventBus) to unlock paths or apply penalties.  
  - `UIScene.ts` -> (Optional) Draws simple Phaser-based UI if needed. Most UI will come from React/MUI, but this is useful for in-canvas effects like floating score popups.  
  - `StoryScene.ts` -> A story-specific scene. Can either show text/images in Phaser or hand off to React’s Typewriter component.  

- **systems/**  
  Systems are **helper modules** that keep scenes clean.  
  - `mapLoader.ts` -> Loads a level layout from backend data (background image, platforms, spawn positions).  
  - `movement.ts` -> Handles keyboard controls, physics updates, and movement logic for the Player prefab.  
  - `questionsTriggers.ts` -> Checks if the player overlaps with a Terminal or trigger area. If so, emits `OPEN_QUESTION` to React.  

- **types/**  
  Shared TypeScript interfaces that describe the shape of data coming from the backend.  
  - Example:  
    ```ts
    export interface LevelDTO {
      id: number;
      desc: string;
      environment: { background: string; canvas: [number, number]; music: string };
      objects: ObjectDTO[];
      questions: QuestionDTO[];
    }
    ```
  - This ensures both Phaser and React know exactly what a “level” or “question” looks like.


### `src/theme/`
- **theme.ts** -> MUI theme (colors, typography, bunker look).  

---

##  EventBus contract (React <-> Phaser)

**Phaser -> React**
- `OPEN_QUESTION` -> show question overlay.  
- `SCORE_CHANGED` -> update HUD.  
- `PLAYER_DROPPED` -> drop level.  

**React -> Phaser**
- `ANSWER_CORRECT` -> continue.  
- `ANSWER_WRONG` -> penalise.  
- `PAUSE` / `RESUME`.  


---

## Running the Game

```bash
npm install
npm run dev
# open http://localhost:5173




----------------->>>>> DEFAULT README.md BELOW <<<<<<<<<------------------------------------------



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
