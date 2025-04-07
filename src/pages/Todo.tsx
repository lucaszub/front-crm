import TodoManager from "@/components/TodoManager";
import { clientsData } from "@/data/clientsData";

const Todo: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Tâches</h1>
      <TodoManager clients={clientsData} />
    </div>
  );
};

export default Todo;
