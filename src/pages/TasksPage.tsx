import React, { JSX, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  MoreHorizontal,
  CheckIcon,
  ClockIcon,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Définition des interfaces TypeScript
interface Task {
  id: string;
  title: string;
  description: string;
  status: "À faire" | "En cours" | "Terminé";
  priority: "Basse" | "Moyenne" | "Haute";
  dueDate: Date;
  clientId: string;
  clientName: string;
}

interface Client {
  id: string;
  name: string;
}

interface NewTask {
  title: string;
  description: string;
  status: "À faire" | "En cours" | "Terminé";
  priority: "Basse" | "Moyenne" | "Haute";
  dueDate: Date | undefined;
  clientId: string;
}

// Données factices pour la démonstration
const taskData: Task[] = [
  {
    id: "1",
    title: "Envoyer devis mis à jour",
    description: "Suite à la réunion du 10/05, envoyer un devis actualisé",
    status: "À faire",
    priority: "Haute",
    dueDate: new Date(2023, 5, 20),
    clientId: "1",
    clientName: "Jean Dupont - Entreprise ABC",
  },
  {
    id: "2",
    title: "Appel de suivi",
    description: "Appeler pour discuter de la proposition commerciale",
    status: "En cours",
    priority: "Moyenne",
    dueDate: new Date(2023, 5, 15),
    clientId: "1",
    clientName: "Jean Dupont - Entreprise ABC",
  },
  {
    id: "3",
    title: "Présentation des nouveaux services",
    description: "Préparer une démo des nouvelles fonctionnalités",
    status: "Terminé",
    priority: "Moyenne",
    dueDate: new Date(2023, 5, 5),
    clientId: "2",
    clientName: "Marie Martin - Société XYZ",
  },
  {
    id: "4",
    title: "Renouvellement contrat",
    description: "Préparer les documents pour le renouvellement annuel",
    status: "À faire",
    priority: "Haute",
    dueDate: new Date(2023, 5, 30),
    clientId: "3",
    clientName: "Pierre Durand - Groupe DEF",
  },
];

const clientsData: Client[] = [
  { id: "1", name: "Jean Dupont - Entreprise ABC" },
  { id: "2", name: "Marie Martin - Société XYZ" },
  { id: "3", name: "Pierre Durand - Groupe DEF" },
  { id: "4", name: "Sophie Lefebvre - Compagnie GHI" },
];

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskData);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
    useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    status: "À faire",
    priority: "Moyenne",
    dueDate: undefined,
    clientId: "",
  });

  const handleAddTask = (): void => {
    if (!newTask.title || !newTask.dueDate || !newTask.clientId) {
      // Gérer la validation des champs obligatoires
      return;
    }

    // Logique pour ajouter une tâche (à implémenter avec l'API)
    console.log("Ajout de tâche:", newTask);

    // Simuler l'ajout d'une tâche (à remplacer par un appel API)
    const client = clientsData.find((c) => c.id === newTask.clientId);
    const newTaskWithId: Task = {
      id: (tasks.length + 1).toString(),
      ...newTask,
      clientName: client ? client.name : "Client inconnu",
      dueDate: newTask.dueDate as Date,
    };

    setTasks([...tasks, newTaskWithId]);

    // Réinitialiser le formulaire
    setNewTask({
      title: "",
      description: "",
      status: "À faire",
      priority: "Moyenne",
      dueDate: undefined,
      clientId: "",
    });

    setIsAddTaskDialogOpen(false);
  };

  const handleStatusChange = (
    taskId: string,
    newStatus: Task["status"]
  ): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filtrer les tâches en fonction des filtres et de la recherche
  const filteredTasks = tasks.filter((task) => {
    // Filtre par statut
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }

    // Filtre par priorité
    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }

    // Filtre par recherche (titre, description ou nom du client)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.clientName.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getPriorityBadge = (priority: Task["priority"]): JSX.Element => {
    const priorityStyles: Record<
      Task["priority"],
      { bg: string; text: string }
    > = {
      Basse: { bg: "bg-blue-100", text: "text-blue-800" },
      Moyenne: { bg: "bg-yellow-100", text: "text-yellow-800" },
      Haute: { bg: "bg-red-100", text: "text-red-800" },
    };

    return (
      <Badge
        className={`${priorityStyles[priority].bg} ${priorityStyles[priority].text}`}
      >
        {priority}
      </Badge>
    );
  };

  const getStatusBadge = (status: Task["status"]): JSX.Element => {
    const statusStyles: Record<
      Task["status"],
      { bg: string; text: string; icon: React.ReactNode }
    > = {
      "À faire": {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: <ClockIcon className="h-3 w-3 mr-1" />,
      },
      "En cours": {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <ClockIcon className="h-3 w-3 mr-1" />,
      },
      Terminé: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckIcon className="h-3 w-3 mr-1" />,
      },
    };

    return (
      <Badge
        className={`${statusStyles[status].bg} ${statusStyles[status].text} flex items-center`}
      >
        {statusStyles[status].icon}
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Tâches</h1>
        <Dialog
          open={isAddTaskDialogOpen}
          onOpenChange={setIsAddTaskDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>Nouvelle tâche</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
              <DialogDescription>
                Créez une nouvelle tâche et associez-la à un client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la tâche *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Ex: Appel de suivi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTask.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Détails de la tâche à effectuer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value: Task["status"]) =>
                      setNewTask({ ...newTask, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="À faire">À faire</SelectItem>
                      <SelectItem value="En cours">En cours</SelectItem>
                      <SelectItem value="Terminé">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priorité</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task["priority"]) =>
                      setNewTask({ ...newTask, priority: value })
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basse">Basse</SelectItem>
                      <SelectItem value="Moyenne">Moyenne</SelectItem>
                      <SelectItem value="Haute">Haute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Date d'échéance *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.dueDate ? (
                        format(newTask.dueDate, "dd MMMM yyyy", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) =>
                        setNewTask({ ...newTask, dueDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client associé *</Label>
                <Select
                  value={newTask.clientId}
                  onValueChange={(value: string) =>
                    setNewTask({ ...newTask, clientId: value })
                  }
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsData.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask}>Ajouter la tâche</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Rechercher</Label>
              <Input
                id="search"
                placeholder="Rechercher une tâche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="statusFilter">Filtrer par statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="statusFilter">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="À faire">À faire</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priorityFilter">Filtrer par priorité</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger id="priorityFilter">
                  <SelectValue placeholder="Toutes les priorités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="Basse">Basse</SelectItem>
                  <SelectItem value="Moyenne">Moyenne</SelectItem>
                  <SelectItem value="Haute">Haute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des tâches */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des tâches ({filteredTasks.length})</CardTitle>
          <CardDescription>
            Gérez vos tâches et suivez leur progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tâche</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{task.title}</div>
                        <div className="text-sm text-gray-500">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{task.clientName}</TableCell>
                    <TableCell>{format(task.dueDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(task.id, "À faire")
                            }
                          >
                            Marquer comme à faire
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(task.id, "En cours")
                            }
                          >
                            Marquer comme en cours
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(task.id, "Terminé")
                            }
                          >
                            Marquer comme terminé
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Aucune tâche trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
