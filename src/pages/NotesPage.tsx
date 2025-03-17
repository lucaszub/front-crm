import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MoreHorizontal, Search, Filter, CalendarIcon } from "lucide-react";

// Définition des interfaces TypeScript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  clientId: string;
  clientName: string;
  category: "Général" | "Réunion" | "Appel" | "Email" | "Autre";
}

interface Client {
  id: string;
  name: string;
}

interface NewNote {
  title: string;
  content: string;
  clientId: string;
  category: "Général" | "Réunion" | "Appel" | "Email" | "Autre";
}

// Données factices pour la démonstration
const notesData: Note[] = [
  {
    id: "1",
    title: "Réunion initiale",
    content:
      "Le client est intéressé par notre offre premium. Points discutés: tarification, délais de mise en œuvre, formation des utilisateurs.",
    createdAt: new Date(2023, 4, 15, 10, 30),
    clientId: "1",
    clientName: "Jean Dupont - Entreprise ABC",
    category: "Réunion",
  },
  {
    id: "2",
    title: "Appel de suivi",
    content:
      "Le client a des questions sur les fonctionnalités d'exportation de données. Il faudra prévoir une démo spécifique sur ce point.",
    createdAt: new Date(2023, 4, 20, 14, 15),
    clientId: "1",
    clientName: "Jean Dupont - Entreprise ABC",
    category: "Appel",
  },
  {
    id: "3",
    title: "Retour sur proposition",
    content:
      "Le client a apprécié notre proposition mais souhaite des ajustements sur les délais de livraison.",
    createdAt: new Date(2023, 5, 2, 9, 0),
    clientId: "2",
    clientName: "Marie Martin - Société XYZ",
    category: "Email",
  },
  {
    id: "4",
    title: "Besoins spécifiques",
    content:
      "Le client a mentionné des besoins spécifiques concernant l'intégration avec leur ERP existant. À explorer plus en détail.",
    createdAt: new Date(2023, 5, 10, 11, 45),
    clientId: "3",
    clientName: "Pierre Durand - Groupe DEF",
    category: "Général",
  },
];

const clientsData: Client[] = [
  { id: "1", name: "Jean Dupont - Entreprise ABC" },
  { id: "2", name: "Marie Martin - Société XYZ" },
  { id: "3", name: "Pierre Durand - Groupe DEF" },
  { id: "4", name: "Sophie Lefebvre - Compagnie GHI" },
];

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(notesData);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] =
    useState<boolean>(false);
  const [isViewNoteDialogOpen, setIsViewNoteDialogOpen] =
    useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const [newNote, setNewNote] = useState<NewNote>({
    title: "",
    content: "",
    clientId: "",
    category: "Général",
  });

  const handleAddNote = (): void => {
    if (!newNote.title || !newNote.content || !newNote.clientId) {
      // Gérer la validation des champs obligatoires
      return;
    }

    // Logique pour ajouter une note (à implémenter avec l'API)
    console.log("Ajout de note:", newNote);

    // Simuler l'ajout d'une note (à remplacer par un appel API)
    const client = clientsData.find((c) => c.id === newNote.clientId);
    const newNoteWithId: Note = {
      id: (notes.length + 1).toString(),
      ...newNote,
      clientName: client ? client.name : "Client inconnu",
      createdAt: new Date(),
    };

    setNotes([newNoteWithId, ...notes]);

    // Réinitialiser le formulaire
    setNewNote({
      title: "",
      content: "",
      clientId: "",
      category: "Général",
    });

    setIsAddNoteDialogOpen(false);
  };

  const handleDeleteNote = (noteId: string): void => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleViewNote = (note: Note): void => {
    setSelectedNote(note);
    setIsViewNoteDialogOpen(true);
  };

  // Filtrer les notes en fonction des filtres et de la recherche
  const filteredNotes = notes.filter((note) => {
    // Filtre par onglet (date)
    if (activeTab === "today") {
      const today = new Date();
      if (
        note.createdAt.getDate() !== today.getDate() ||
        note.createdAt.getMonth() !== today.getMonth() ||
        note.createdAt.getFullYear() !== today.getFullYear()
      ) {
        return false;
      }
    } else if (activeTab === "week") {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      if (note.createdAt < oneWeekAgo) {
        return false;
      }
    } else if (activeTab === "month") {
      const today = new Date();
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      if (note.createdAt < oneMonthAgo) {
        return false;
      }
    }

    // Filtre par client
    if (clientFilter !== "all" && note.clientId !== clientFilter) {
      return false;
    }

    // Filtre par catégorie
    if (categoryFilter !== "all" && note.category !== categoryFilter) {
      return false;
    }

    // Filtre par recherche (titre ou contenu)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.clientName.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getCategoryColor = (category: Note["category"]): string => {
    const categoryColors: Record<Note["category"], string> = {
      Général: "bg-gray-100",
      Réunion: "bg-blue-100",
      Appel: "bg-green-100",
      Email: "bg-purple-100",
      Autre: "bg-yellow-100",
    };

    return categoryColors[category];
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Notes</h1>
        <Dialog
          open={isAddNoteDialogOpen}
          onOpenChange={setIsAddNoteDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>Nouvelle note</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle note</DialogTitle>
              <DialogDescription>
                Créez une nouvelle note et associez-la à un client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  placeholder="Ex: Réunion initiale"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client associé *</Label>
                  <Select
                    value={newNote.clientId}
                    onValueChange={(value: string) =>
                      setNewNote({ ...newNote, clientId: value })
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

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={newNote.category}
                    onValueChange={(value: Note["category"]) =>
                      setNewNote({ ...newNote, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Général">Général</SelectItem>
                      <SelectItem value="Réunion">Réunion</SelectItem>
                      <SelectItem value="Appel">Appel</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu *</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                  placeholder="Détails de la note..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddNote}>Ajouter la note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Onglets de filtrage par date */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
          <TabsTrigger value="week">Cette semaine</TabsTrigger>
          <TabsTrigger value="month">Ce mois</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" /> Rechercher
              </Label>
              <Input
                id="search"
                placeholder="Rechercher dans les notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="clientFilter" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtrer par client
              </Label>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger id="clientFilter">
                  <SelectValue placeholder="Tous les clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les clients</SelectItem>
                  {clientsData.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="categoryFilter"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" /> Filtrer par catégorie
              </Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoryFilter">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Général">Général</SelectItem>
                  <SelectItem value="Réunion">Réunion</SelectItem>
                  <SelectItem value="Appel">Appel</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card key={note.id} className="overflow-hidden">
              <CardHeader className={`${getCategoryColor(note.category)} py-3`}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {format(note.createdAt, "dd MMMM yyyy à HH:mm", {
                        locale: fr,
                      })}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewNote(note)}>
                        Voir le détail
                      </DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-sm text-gray-700 mb-2">
                  {note.content.length > 150
                    ? `${note.content.substring(0, 150)}...`
                    : note.content}
                </p>
                <p className="text-xs text-gray-500">
                  Client: {note.clientName}
                </p>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewNote(note)}
                >
                  Voir plus
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucune note trouvée</p>
          </div>
        )}
      </div>

      {/* Dialog pour voir le détail d'une note */}
      {selectedNote && (
        <Dialog
          open={isViewNoteDialogOpen}
          onOpenChange={setIsViewNoteDialogOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedNote.title}</DialogTitle>
              <DialogDescription>
                {format(selectedNote.createdAt, "dd MMMM yyyy à HH:mm", {
                  locale: fr,
                })}
                {" • "}
                {selectedNote.category}
                {" • "}
                {selectedNote.clientName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewNoteDialogOpen(false)}
              >
                Fermer
              </Button>
              <Button>Modifier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NotesPage;
