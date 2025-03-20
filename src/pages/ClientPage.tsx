import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/config";

interface Client {
  id: string;
  name: string;
  entreprise: string;
  role: string;
  status: "Actif" | "Inactif" | "Prospect";
  email: string;
  numero: string;
  avatarUrl: string;
}

interface Interaction {
  id: string;
  date: string;
  type: string;
  description: string;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

interface Note {
  id: string;
  date: string;
  content: string;
}

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
    useState<boolean>(false);
  const [isAddInteractionDialogOpen, setIsAddInteractionDialogOpen] =
    useState<boolean>(false);
  const [newTask, setNewTask] = useState<{ title: string; dueDate: string }>({
    title: "",
    dueDate: "",
  });
  const [newInteraction, setNewInteraction] = useState<{
    type: string;
    description: string;
  }>({
    type: "",
    description: "",
  });

  useEffect(() => {
    async function fetchClients(): Promise<void> {
      const res = await fetch(`${API_URL}/clients`);
      const data = await res.json();
      setClients(data);
      if (data.length > 0) {
        setSelectedClientId(data[0].id);
      }
    }
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      async function fetchClientData(): Promise<void> {
        const [interactionsRes, tasksRes, notesRes] = await Promise.all([
          fetch(`${API_URL}/clients/${selectedClientId}/interactions`),
          fetch(`${API_URL}/clients/${selectedClientId}/tasks`),
          fetch(`${API_URL}/clients/${selectedClientId}/notes`),
        ]);
        const [interactionsData, tasksData, notesData] = await Promise.all([
          interactionsRes.json(),
          tasksRes.json(),
          notesRes.json(),
        ]);
        setInteractions(interactionsData);
        setTasks(tasksData);
        setNotes(notesData);
      }
      fetchClientData();
    }
  }, [selectedClientId]);

  const handleAddNote = async (): Promise<void> => {
    if (newNote.trim() === "") return;

    const newNoteObj: Note = {
      id: `${notes.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      content: newNote,
    };

    const res = await fetch(`${API_URL}/clients/${selectedClientId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNoteObj),
    });

    if (res.ok) {
      setNotes([newNoteObj, ...notes]);
      setNewNote("");
    }
  };

  const handleAddTask = async (): Promise<void> => {
    if (newTask.title.trim() === "" || newTask.dueDate === "") return;

    const newTaskObj: Task = {
      id: `${tasks.length + 1}`,
      title: newTask.title,
      dueDate: newTask.dueDate,
      status: "À faire",
    };

    const res = await fetch(`${API_URL}/clients/${selectedClientId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskObj),
    });

    if (res.ok) {
      setTasks([...tasks, newTaskObj]);
      setNewTask({ title: "", dueDate: "" });
      setIsAddTaskDialogOpen(false);
    }
  };

  const handleAddInteraction = async (): Promise<void> => {
    if (
      newInteraction.type.trim() === "" ||
      newInteraction.description.trim() === ""
    )
      return;

    const newInteractionObj: Interaction = {
      id: `${interactions.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      type: newInteraction.type,
      description: newInteraction.description,
    };

    const res = await fetch(
      `${API_URL}/clients/${selectedClientId}/interactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInteractionObj),
      }
    );

    if (res.ok) {
      setInteractions([newInteractionObj, ...interactions]);
      setNewInteraction({ type: "", description: "" });
      setIsAddInteractionDialogOpen(false);
    }
  };

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fiche Client</h1>
        <div className="space-x-2">
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClient && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={selectedClient.avatarUrl} />
                  <AvatarFallback>
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{selectedClient.name}</h2>
                <p className="text-gray-500">{selectedClient.entreprise}</p>
                <Badge
                  className={
                    selectedClient.status === "Actif"
                      ? "bg-green-500"
                      : selectedClient.status === "Prospect"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }
                >
                  {selectedClient.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Rôle:</span>{" "}
                  {selectedClient.role}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedClient.email}
                </p>
                <p>
                  <span className="font-medium">Téléphone:</span>{" "}
                  {selectedClient.numero}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Suivi client</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="interactions">
                <TabsList className="mb-4">
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  <TabsTrigger value="tasks">Tâches</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                {/* Onglet Interactions */}
                <TabsContent value="interactions">
                  <div className="mb-4">
                    <Button onClick={() => setIsAddInteractionDialogOpen(true)}>
                      Ajouter une interaction
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {interactions.map((interaction) => (
                        <TableRow key={interaction.id}>
                          <TableCell>{interaction.date}</TableCell>
                          <TableCell>{interaction.type}</TableCell>
                          <TableCell>{interaction.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Onglet Tâches */}
                <TabsContent value="tasks">
                  <div className="mb-4">
                    <Button onClick={() => setIsAddTaskDialogOpen(true)}>
                      Ajouter une tâche
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Date d'échéance</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                task.status === "Terminé"
                                  ? "bg-green-500"
                                  : task.status === "En cours"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }
                            >
                              {task.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Onglet Notes */}
                <TabsContent value="notes">
                  <div className="mb-4">
                    <Textarea
                      placeholder="Ajouter une note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleAddNote}>Ajouter</Button>
                  </div>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <Card key={note.id}>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm text-gray-500">
                            {note.date}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          {note.content}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialogue pour ajouter une tâche */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Titre de la tâche"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddTask}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue pour ajouter une interaction */}
      <Dialog
        open={isAddInteractionDialogOpen}
        onOpenChange={setIsAddInteractionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle interaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              onValueChange={(value) =>
                setNewInteraction({ ...newInteraction, type: value })
              }
              value={newInteraction.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type d'interaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Appel">Appel</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Réunion">Réunion</SelectItem>
                <SelectItem value="Visite">Visite</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Description de l'interaction"
              value={newInteraction.description}
              onChange={(e) =>
                setNewInteraction({
                  ...newInteraction,
                  description: e.target.value,
                })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddInteraction}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientPage;
