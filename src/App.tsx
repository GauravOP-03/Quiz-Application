import Home from "./Pages/Home";
import Instruction from "./Pages/Instruction";
import Question from "./Pages/Question";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/instruction", element: <Instruction /> },
    { path: "/instruction/question", element: <Question /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
