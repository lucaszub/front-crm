import { useEffect } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DrawerComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  onOpenChange,
}) => {
  useEffect(() => {
    console.log("Drawer opened: ", open);
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <div className="p-4 w-full flex flex-col justify-center items-center max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Ajouter un nouveau contact</h2>
          <form className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <label className="block text-sm font-medium">Prénom</label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Entrez le prénom"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Nom</label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Entrez le nom"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  className="w-full"
                  placeholder="Entrez l'email"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Numéro de téléphone
                </label>
                <Input
                  type="tel"
                  className="w-full"
                  placeholder="Entrez le numéro"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Entreprise</label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Entrez l'entreprise"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Rôle</label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Entrez le rôle"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Statut</label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Entrez le statut"
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="block text-sm font-medium">Note</label>
                <Textarea
                  className="w-full"
                  placeholder="Entrez une note"
                  rows={4}
                />
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full ">
              Valider
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
