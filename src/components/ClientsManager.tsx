import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClients, addClient } from "@/utils/datamanager";

interface Client {
  id: string;
  name: string;
  email: string;
  entreprise: string;
  numero: string;
  status: "Actif" | "Prospect" | "Inactive";
  adresse: string;
}

const ClientsManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]); // Liste des clients
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    email: "",
    entreprise: "",
    numero: "",
    status: "Actif",
    adresse: "",
  });

  // Charger les clients depuis l'API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        console.log(data);
        setClients(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    };

    fetchClients();
  }, []);

  // Ajouter un nouveau client
  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email || !newClient.entreprise) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newClientObj: Client = {
      id: (clients.length + 1).toString(), // Génération d'un ID temporaire
      name: newClient.name!,
      email: newClient.email!,
      entreprise: newClient.entreprise!,
      numero: newClient.numero || "",
      status: newClient.status as "Actif" | "Prospect" | "Inactive",
      adresse: newClient.adresse || "",
    };

    try {
      await addClient(newClientObj); // Appel à l'API pour ajouter le client
      setClients([newClientObj, ...clients]); // Mise à jour locale
      setNewClient({
        name: "",
        email: "",
        entreprise: "",
        numero: "",
        status: "Actif",
        adresse: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du client :", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
                placeholder="Nom du client"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient({ ...newClient, email: e.target.value })
                }
                placeholder="Email du client"
              />
            </div>
            <div>
              <label htmlFor="entreprise" className="block text-sm font-medium">
                Entreprise
              </label>
              <Input
                id="entreprise"
                value={newClient.entreprise}
                onChange={(e) =>
                  setNewClient({ ...newClient, entreprise: e.target.value })
                }
                placeholder="Entreprise du client"
              />
            </div>
            <div>
              <label htmlFor="numero" className="block text-sm font-medium">
                Numéro de téléphone
              </label>
              <Input
                id="numero"
                value={newClient.numero}
                onChange={(e) =>
                  setNewClient({ ...newClient, numero: e.target.value })
                }
                placeholder="Numéro de téléphone"
              />
            </div>
            <div>
              <label htmlFor="adresse" className="block text-sm font-medium">
                Adresse
              </label>
              <Input
                id="adresse"
                value={newClient.adresse}
                onChange={(e) =>
                  setNewClient({ ...newClient, adresse: e.target.value })
                }
                placeholder="Adresse du client"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Statut
              </label>
              <select
                id="status"
                value={newClient.status}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    status: e.target.value as "Actif" | "Prospect" | "Inactive",
                  })
                }
                className="w-full border rounded-md p-2"
              >
                <option value="Actif">Actif</option>
                <option value="Prospect">Prospect</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <Button onClick={handleAddClient}>Ajouter le client</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
        </CardHeader>
        <CardContent>
          {clients.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Nom</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Entreprise
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Numéro</th>
                  <th className="border border-gray-300 px-4 py-2">Statut</th>
                  <th className="border border-gray-300 px-4 py-2">Adresse</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.entreprise}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.numero}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {client.adresse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Aucun client disponible.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsManager;
