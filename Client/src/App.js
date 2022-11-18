import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// CSS 
import '../src/asserts/CSS/bootstrap.min.css'
import './asserts/CSS/font-awesome-4.7.0/css/font-awesome.min.css'

// PAGES 
import Cover from "./pages/Cover_Page/Cover";
import Assignment_menu from "./pages/Assignment/Assignment_menu";
import Assignment_page from "./pages/Assignment/Assignment_page";
import Admin from "./pages/Admin/Admin";
import Obj_results from "./pages/Obj_results";
import Read_assessment_file from "./pages/Assignment/Read_assessment_file";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/assignment/menu" element={<Assignment_menu />} />
        <Route path="/assignment" element={<Assignment_page />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/results" element={<Obj_results />} />
        <Route path="/admin/read_assessment" element={<Read_assessment_file />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 