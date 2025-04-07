import React, { useState, useEffect } from "react";
import RdvManager from "@/components/RdvManager";
import { getClients, Client } from "@/utils/datamanager";

const Rdv: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await getClients(); // Appel API pour récupérer les clients
        setClients(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        setError("Impossible de charger les clients. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Chargement des clients...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Rendez-vous</h1>
      <RdvManager clients={clients} />
    </div>
  );
};

export default Rdv;
