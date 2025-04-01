import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Settings from "./pages/Settings";
import Subscriptions from "./pages/Subscriptions";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="vaste-lasten" element={<Subscriptions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>404 - Pagina niet gevonden</div>} />
        </Route>
      </Routes>
  );
}

export default App;