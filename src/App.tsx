import Layout from "./pages/Layout/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./pages/Routes/routeConfig";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            {routes.map((route) => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
