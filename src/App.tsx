import { RouterProvider } from "react-router";
import "./styles/App.css";
import { router } from "./routes/routes";

function App() {
  return (
    <div className="App" id="app-id">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
