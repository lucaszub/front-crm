import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Import des pages
import Page1 from "./pages/Pallette";
import ClientPage from "./pages/ClientPage";
import Customer_table from "./components/customer_tables";
import NotesPage from "./pages/NotesPage";
import RdvManager from "./pages/Rdv";
import Todo from "./pages/Todo";

function Navbar() {
  return (
    <div className="bg-sidebar w-screen  p-5 border-b gap-5 flex items-center justify-between border-gray-200">
      <div className="flex items-center  gap-3">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-semibold text-lg">CRM Prospection</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Éléments de navbar supplémentaires (profil, notifications, etc.) */}
      </div>
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar />

          <div className="flex h-[calc(100vh-64px)]">
            <AppSidebar />

            <main className="flex-1 p-6 overflow-auto">
              <Routes>
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/" element={<Customer_table />} />
                <Route path="/rdv" element={<RdvManager />} />
                <Route path="/note" element={<NotesPage />} />

                <Route path="/Palette" element={<Page1 />} />
                <Route path="/acceuil" element={<Customer_table />} />
                <Route path="/fiche-client" element={<ClientPage />} />
                <Route path="/page4" element={<Todo />} />
                {/* <Route path="/test" element={<Clients />} /> */}
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </SidebarProvider>
  );
}

export default App;
