import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config";
interface DrawerComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    entreprise: "",
    status: "",
    numero: "",
    role: "",
    adresse: "",
  });

  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setApiResponse(data);
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    // Reset form data or perform any other cancel action
    setFormData({
      name: "",
      email: "",
      entreprise: "",
      status: "",
      numero: "",
      role: "",
      adresse: "",
    });
    onOpenChange(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau contact</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour ajouter un nouveau
            contact.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <form className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <label className="block text-sm font-medium">Nom</label>
                <Input
                  type="text"
                  name="name"
                  className="w-full"
                  placeholder="Entrez le nom"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  className="w-full"
                  placeholder="Entrez l'email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Entreprise</label>
                <Input
                  type="text"
                  name="entreprise"
                  className="w-full"
                  placeholder="Entrez l'entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Statut</label>
                <Input
                  type="text"
                  name="status"
                  className="w-full"
                  placeholder="Entrez le statut"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Numéro</label>
                <Input
                  type="text"
                  name="numero"
                  className="w-full"
                  placeholder="Entrez le numéro"
                  value={formData.numero}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Rôle</label>
                <Input
                  type="text"
                  name="role"
                  className="w-full"
                  placeholder="Entrez le rôle"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Adresse</label>
                <Input
                  type="text"
                  name="adresse"
                  className="w-full"
                  placeholder="Entrez l'adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4 w-full">
              <Button
                type="button"
                className="w-full mr-2"
                onClick={handleSubmit}
              >
                Valider
              </Button>
              <Button
                type="button"
                className="w-full ml-2"
                onClick={handleCancel}
              >
                Annuler
              </Button>
            </div>
          </form>
          {apiResponse && (
            <div className="mt-4 w-full">
              <h3 className="text-lg font-bold">Réponse de l'API :</h3>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DrawerComponent;
