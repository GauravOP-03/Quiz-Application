import Home from "./Pages/Home";
import Instruction from "./Pages/Instruction";
import Question from "./Pages/Question";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Submit from "./Pages/Submit";
import Error from "./Components/Error";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/instruction", element: <Instruction /> },
    { path: "/instruction/question", element: <Question /> },
    { path: "/instruction/question/submit", element: <Submit /> },
    { path: "*", element: <Error /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
