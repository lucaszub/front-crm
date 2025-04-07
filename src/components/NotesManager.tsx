import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import data from "@/data/data.json"; // Import des données centralisées

interface Note {
  id: string;
  content: string;
  clientId: string;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
}

interface NotesManagerProps {
  clients: Client[];
}

const NotesManager: React.FC<NotesManagerProps> = ({ clients }) => {
  const [notes, setNotes] = useState<Note[]>(data.notes); // Initialisation avec les données des notes
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  // Ajouter une nouvelle note
  const handleAddNote = () => {
    if (!newNoteContent.trim() || !selectedClientId) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newNote: Note = {
      id: (notes.length + 1).toString(),
      content: newNoteContent,
      clientId: selectedClientId,
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent("");
    setSelectedClientId("");
  };

  // Supprimer une note
  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  // Mettre à jour une note
  const handleUpdateNote = (noteId: string, updatedContent: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, content: updatedContent } : note
    );
    setNotes(updatedNotes);
  };

  // Filtrer les notes par client sélectionné
  const filteredNotes = notes.filter(
    (note) => note.clientId === selectedClientId
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une note</CardTitle>
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
              <label htmlFor="note" className="block text-sm font-medium">
                Contenu de la note
              </label>
              <Textarea
                id="note"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Écrire une note..."
              />
            </div>
            <Button onClick={handleAddNote}>Ajouter la note</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes associées</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotes.length > 0 ? (
            <ul className="space-y-4">
              {filteredNotes.map((note) => (
                <li key={note.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Ajoutée le{" "}
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateNote(
                            note.id,
                            prompt("Modifier la note :", note.content) ||
                              note.content
                          )
                        }
                      >
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune note pour ce client.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesManager;
