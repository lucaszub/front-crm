import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Page1 from "./pages/Pallette";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Component from "./pages/Page3";
import Page4 from "./pages/Page4";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="bg-sidebar p-5 border-b gap-5 flex border-gray-200">
          {/* Navbar avec les liens de navigation */}
          Navbar
        </div>

        <div className="h-full flex">
          <div className=" bg-sidebar w-40 p-5 h-full border-r border-gray-200">
            {/* Sidebar avec les liens de navigation */}
            <div className="flex flex-col gap-5">
              <Link to="/Palette" className="">
                Palette
              </Link>
              <Link to="/page2" className="">
                Page 2
              </Link>
              <Link to="/page3" className="">
                Page 3
              </Link>
              <Link to="/page4" className="">
                Page 4
              </Link>
            </div>
          </div>

          <div className="p-6 bg-background w-full flex flex-col gap-5">
            {/* Les différentes pages avec contenu conditionnel */}
            <Routes>
              <Route path="/Palette" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/page3" element={<Component />} />
              <Route path="/page4" element={<Page4 />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
