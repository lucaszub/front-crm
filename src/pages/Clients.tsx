import ClientsManager from "@/components/ClientsManager";

const Clients: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Clients</h1>
      <ClientsManager />
    </div>
  );
};

export default Clients;
