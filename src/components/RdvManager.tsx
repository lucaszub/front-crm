import React, { useState, useEffect } from "react";
import { getRdvs, addRdv } from "@/utils/datamanager";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
}

interface RdvManagerProps {
  clients: Client[];
}

const RdvManager: React.FC<RdvManagerProps> = ({ clients }) => {
  const [rdvs, setRdvs] = useState<any[]>([]); // Liste des rendez-vous
  const [newRdvTitle, setNewRdvTitle] = useState<string>(""); // Titre du nouveau rendez-vous
  const [newRdvDate, setNewRdvDate] = useState<string>(""); // Date du nouveau rendez-vous
  const [newRdvLocation, setNewRdvLocation] = useState<string>(""); // Lieu du rendez-vous
  const [newRdvDescription, setNewRdvDescription] = useState<string>(""); // Description du rendez-vous
  const [selectedClientId, setSelectedClientId] = useState<string>(""); // Client sélectionné
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  // Charger les rendez-vous depuis l'API
  const fetchRdvs = async () => {
    setLoading(true);
    try {
      const data = await getRdvs(); // Appel API pour récupérer les rendez-vous
      setRdvs(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous :", error);
      setError("Impossible de charger les rendez-vous. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRdvs();
  }, []);

  // Ajouter un nouveau rendez-vous
  const handleAddRdv = async () => {
    if (
      !newRdvTitle.trim() ||
      !newRdvDate ||
      !selectedClientId ||
      !newRdvLocation.trim() ||
      !newRdvDescription.trim()
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newRdv = {
      title: newRdvTitle,
      client_id: selectedClientId,
      date: newRdvDate,
      location: newRdvLocation,
      description: newRdvDescription,
    };

    try {
      await addRdv(newRdv); // Appel API pour ajouter un rendez-vous
      await fetchRdvs(); // Recharger la liste des rendez-vous après l'ajout
      setNewRdvTitle("");
      setNewRdvDate("");
      setNewRdvLocation("");
      setNewRdvDescription("");
      setSelectedClientId("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error);
      setError("Impossible d'ajouter le rendez-vous. Veuillez réessayer.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un rendez-vous</CardTitle>
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
              <label htmlFor="title" className="block text-sm font-medium">
                Titre du rendez-vous
              </label>
              <Input
                id="title"
                value={newRdvTitle}
                onChange={(e) => setNewRdvTitle(e.target.value)}
                placeholder="Titre du rendez-vous"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date du rendez-vous
              </label>
              <Input
                id="date"
                type="datetime-local"
                value={newRdvDate}
                onChange={(e) => setNewRdvDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium">
                Lieu du rendez-vous
              </label>
              <Input
                id="location"
                value={newRdvLocation}
                onChange={(e) => setNewRdvLocation(e.target.value)}
                placeholder="Lieu du rendez-vous"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="description"
                value={newRdvDescription}
                onChange={(e) => setNewRdvDescription(e.target.value)}
                placeholder="Description du rendez-vous"
              />
            </div>
            <Button onClick={handleAddRdv}>Ajouter le rendez-vous</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rendez-vous associés</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500">Chargement des rendez-vous...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : rdvs.length > 0 ? (
            <ul className="space-y-4">
              {rdvs.map((rdv) => (
                <li key={rdv.id} className="border rounded-md p-4">
                  <p className="text-sm font-bold">{rdv.title}</p>
                  <p className="text-sm text-gray-700">
                    {new Date(rdv.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{rdv.location}</p>
                  <p className="text-sm text-gray-500">{rdv.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun rendez-vous disponible.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RdvManager;
