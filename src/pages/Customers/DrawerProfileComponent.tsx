import { useState, useEffect } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  entreprise: string;
  status: string;
  numero: string;
  role: string;
  interaction: string;
  note: string;
}

interface DrawerProfileComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number | null;
}

export const DrawerProfileComponent: React.FC<DrawerProfileComponentProps> = ({
  open,
  onOpenChange,
  userId,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (userId !== null) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  const fetchUserProfile = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data: UserProfile = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setUserProfile(null);
  };

  return (
    <Drawer open={open} onOpenChange={handleClose} direction="right">
      <DrawerContent>
        <div className="p-4 w-full max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Profil utilisateur</h2>
          {userProfile ? (
            <div>
              <p>
                <strong>Nom: </strong>
                {userProfile.name}
              </p>
              <p>
                <strong>Email: </strong>
                {userProfile.email}
              </p>
              <p>
                <strong>Entreprise: </strong>
                {userProfile.entreprise}
              </p>
              <p>
                <strong>Numéro: </strong>
                {userProfile.numero}
              </p>
              <p>
                <strong>Statut: </strong>
                {userProfile.status}
              </p>
              <p>
                <strong>Rôle: </strong>
                {userProfile.role}
              </p>
              <p>
                <strong>Interaction: </strong>
                {userProfile.interaction}
              </p>
              <p>
                <strong>Note: </strong>
                {userProfile.note}
              </p>
            </div>
          ) : (
            <p className="text-sm">Chargement du profil...</p>
          )}
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
