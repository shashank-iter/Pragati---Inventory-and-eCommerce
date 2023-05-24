import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Demo from "./pages/dashboard/Demo";

function App() {
  // const key =  URLSearchParams(window.location.search);
  // const param = new URLSearchParams(location.search);
  // const key = param.get('key');
  // console.log(param);
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="/demo/*" element={<Demo />} /> */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    // <div>{JSON.stringify(key)}</div>
    // <Demo/>
  );
}

export default App;
