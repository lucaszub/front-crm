import NotesManager from "@/components/NotesManager";
import { clientsData } from "@/data/clientsData"; // Assurez-vous que le chemin est correct

const NotesPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Notes</h1>
      <NotesManager clients={clientsData} />
    </div>
  );
};

export default NotesPage;
