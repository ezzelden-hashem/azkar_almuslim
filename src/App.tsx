import { RouterProvider } from "react-router";
import "./styles/App.css";
import { router } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
