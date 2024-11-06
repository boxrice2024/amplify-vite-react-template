// import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Import useLocation
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignInPage from "./scenes/signin";  // Import the renamed SignIn component

import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation(); // Get the current route

  // Conditionally render sidebar and topbar only if not on SignInPage
  const shouldShowSidebarAndTopbar = location.pathname !== "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {shouldShowSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {shouldShowSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<SignInPage />} /> {/* Default route is SignIn */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/faq" element={<FAQ />} />
              {/* Redirect any unknown route to sign-in */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// const client = generateClient<Schema>();
//
// function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
//
//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }, []);
//
//   function createTodo() {
//     client.models.Todo.create({ content: window.prompt("Todo content") });
//   }
//
//   return (
//     <main>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         Hello World!
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div>
//     </main>
//   );
// }

export default App;
