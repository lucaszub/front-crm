import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowUpRight,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar as CalendarIcon,
  PieChart as PieChartIcon,
  BarChart2,
  List,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Types
interface Client {
  id: string;
  fullName: string;
  company: string;
  role: string;
  status: "Actif" | "Potentiel" | "Inactif";
  lastInteraction: {
    date: Date;
    type: string;
  };
  nextTask?: {
    title: string;
    dueDate: Date;
  };
}

interface Task {
  id: string;
  title: string;
  status: "À faire" | "En cours" | "Terminé";
  dueDate: Date;
  clientName: string;
  priority: "Haute" | "Moyenne" | "Basse";
}

interface InteractionData {
  type: string;
  count: number;
}

interface ClientStatusData {
  name: string;
  value: number;
}

// Données factices
const recentClients: Client[] = [
  {
    id: "1",
    fullName: "Jean Dupont",
    company: "Entreprise ABC",
    role: "Directeur Commercial",
    status: "Actif",
    lastInteraction: {
      date: new Date(2025, 2, 15),
      type: "Appel",
    },
    nextTask: {
      title: "Envoyer devis",
      dueDate: new Date(2025, 2, 20),
    },
  },
  {
    id: "2",
    fullName: "Marie Martin",
    company: "Société XYZ",
    role: "Responsable Marketing",
    status: "Potentiel",
    lastInteraction: {
      date: new Date(2025, 2, 10),
      type: "Email",
    },
    nextTask: {
      title: "Présentation produit",
      dueDate: new Date(2025, 2, 25),
    },
  },
  {
    id: "3",
    fullName: "Pierre Durand",
    company: "Groupe DEF",
    role: "Directeur Général",
    status: "Actif",
    lastInteraction: {
      date: new Date(2025, 2, 16),
      type: "Rendez-vous",
    },
  },
];

const upcomingTasks: Task[] = [
  {
    id: "1",
    title: "Envoyer devis mis à jour",
    status: "À faire",
    dueDate: new Date(2025, 2, 20),
    clientName: "Jean Dupont - Entreprise ABC",
    priority: "Haute",
  },
  {
    id: "2",
    title: "Appel de suivi",
    status: "En cours",
    dueDate: new Date(2025, 2, 18),
    clientName: "Marie Martin - Société XYZ",
    priority: "Moyenne",
  },
  {
    id: "3",
    title: "Présentation des nouveaux services",
    status: "À faire",
    dueDate: new Date(2025, 2, 25),
    clientName: "Pierre Durand - Groupe DEF",
    priority: "Haute",
  },
];

const interactionData: InteractionData[] = [
  { type: "Appel", count: 28 },
  { type: "Email", count: 45 },
  { type: "Rendez-vous", count: 12 },
];

const clientStatusData: ClientStatusData[] = [
  { name: "Actifs", value: 35 },
  { name: "Potentiels", value: 20 },
  { name: "Inactifs", value: 10 },
];

const taskStatusData = [
  { name: "À faire", value: 12 },
  { name: "En cours", value: 8 },
  { name: "Terminé", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState<string>("overview");

  const getStatusBadge = (status: Client["status"]) => {
    const statusStyles = {
      Actif: "bg-green-100 text-green-800",
      Potentiel: "bg-blue-100 text-blue-800",
      Inactif: "bg-gray-100 text-gray-800",
    };

    return <Badge className={statusStyles[status]}>{status}</Badge>;
  };

  const getTaskStatusBadge = (status: Task["status"]) => {
    const statusStyles = {
      "À faire": "bg-yellow-100 text-yellow-800",
      "En cours": "bg-blue-100 text-blue-800",
      Terminé: "bg-green-100 text-green-800",
    };

    return <Badge className={statusStyles[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    const priorityStyles = {
      Haute: "bg-red-100 text-red-800",
      Moyenne: "bg-orange-100 text-orange-800",
      Basse: "bg-blue-100 text-blue-800",
    };

    return <Badge className={priorityStyles[priority]}>{priority}</Badge>;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <div className="flex space-x-2">
          <Button
            variant={selectedView === "overview" ? "default" : "outline"}
            onClick={() => setSelectedView("overview")}
            className="flex items-center"
          >
            <PieChartIcon className="mr-2 h-4 w-4" />
            Vue d'ensemble
          </Button>
          <Button
            variant={selectedView === "clients" ? "default" : "outline"}
            onClick={() => setSelectedView("clients")}
            className="flex items-center"
          >
            <Users className="mr-2 h-4 w-4" />
            Clients
          </Button>
          <Button
            variant={selectedView === "tasks" ? "default" : "outline"}
            onClick={() => setSelectedView("tasks")}
            className="flex items-center"
          >
            <List className="mr-2 h-4 w-4" />
            Tâches
          </Button>
        </div>
      </div>

      {selectedView === "overview" && (
        <>
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Clients
                    </p>
                    <p className="text-3xl font-bold">65</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+12% ce mois</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tâches terminées
                    </p>
                    <p className="text-3xl font-bold">25</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+8% cette semaine</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tâches en cours
                    </p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-gray-500 text-sm">
                  <span>Dernière mise à jour: aujourd'hui</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tâches à faire
                    </p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-red-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>3 tâches urgentes</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques et tableaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactions par type</CardTitle>
                <CardDescription>
                  Répartition des interactions avec les clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={interactionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des clients</CardTitle>
                <CardDescription>
                  Statut des clients dans le CRM
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={clientStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        index,
                      }) => {
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x =
                          cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y =
                          cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                          >
                            {clientStatusData[index].name} (
                            {(percent * 100).toFixed(0)}%)
                          </text>
                        );
                      }}
                    >
                      {clientStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Clients récents et tâches à venir */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clients récents</CardTitle>
                <CardDescription>
                  Derniers clients ajoutés ou modifiés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière interaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>
                                {client.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {client.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {client.company}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(client.status)}</TableCell>
                        <TableCell>
                          <div>
                            {format(client.lastInteraction.date, "dd/MM/yyyy")}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.lastInteraction.type}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tâches à venir</CardTitle>
                <CardDescription>Prochaines tâches à effectuer</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tâche</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead>Priorité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">
                              {task.clientName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTaskStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          {format(task.dueDate, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {selectedView === "clients" && (
        <Card>
          <CardHeader>
            <CardTitle>Tous les clients</CardTitle>
            <CardDescription>
              Liste complète des clients dans le CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Contenu de la vue clients */}
            <p>Vue détaillée des clients à implémenter</p>
          </CardContent>
        </Card>
      )}

      {selectedView === "tasks" && (
        <Card>
          <CardHeader>
            <CardTitle>Toutes les tâches</CardTitle>
            <CardDescription>
              Liste complète des tâches à effectuer
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Contenu de la vue tâches */}
            <p>Vue détaillée des tâches à implémenter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
