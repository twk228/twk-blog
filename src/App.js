import "./App.scss";
import { useRoutes } from "react-router-dom";
import router from "./router";

function App() {
  const element = useRoutes(router.routes);
  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
