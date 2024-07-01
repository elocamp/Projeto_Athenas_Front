import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PostPessoa from "./components/postPessoa/PostPessoa";
import UpdatePessoa from "./components/updatePessoa/UpdatePessoa";
import NoMatch from "./components/noMatch/NoMatch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pessoas" element={<PostPessoa />} />
        <Route path="/pessoas/:id" element={<UpdatePessoa />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
