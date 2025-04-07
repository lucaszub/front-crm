import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasks, addTask } from "@/utils/datamanager";

interface Task {
  id: string;
  title: string;
  clientId: string;
  completed: boolean;
}

interface Client {
  id: string;
  name: string;
}

interface TodoManagerProps {
  clients: Client[];
}

const TodoManager: React.FC<TodoManagerProps> = ({ clients }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Liste des tâches
  const [newTaskTitle, setNewTaskTitle] = useState<string>(""); // Titre de la nouvelle tâche
  const [selectedClientId, setSelectedClientId] = useState<string>(""); // Client sélectionné

  // Charger les tâches depuis l'API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche
  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !selectedClientId) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newTask: Task = {
      id: "", // L'ID sera généré par le backend
      title: newTaskTitle,
      clientId: selectedClientId,
      completed: false,
    };

    try {
      await addTask(newTask); // Appel à l'API pour ajouter la tâche
      setTasks((prevTasks) => [newTask, ...prevTasks]); // Mise à jour locale
      setNewTaskTitle("");
      setSelectedClientId("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  // Basculer l'état d'une tâche (terminée ou non)
  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrer les tâches par client sélectionné
  const filteredTasks = tasks.filter(
    (task) => task.clientId === selectedClientId
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une tâche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="client" className="block text-sm font-medium">
                Client
              </label>
              <select
                id="client"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Sélectionner un client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="task" className="block text-sm font-medium">
                Titre de la tâche
              </label>
              <Input
                id="task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Titre de la tâche"
              />
            </div>
            <Button onClick={handleAddTask}>Ajouter la tâche</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tâches associées</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length > 0 ? (
            <ul className="space-y-4">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={`border rounded-md p-4 ${
                    task.completed ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-sm ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <Button size="sm" onClick={() => handleToggleTask(task.id)}>
                      {task.completed ? "Non terminé" : "Terminé"}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune tâche pour ce client.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoManager;
