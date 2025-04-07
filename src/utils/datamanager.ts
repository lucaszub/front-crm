import { API_URL } from "@/config";

// Interfaces
export interface Client {
  id: string;
  name: string;
  email: string;
  entreprise: string;
  numero: string;
  status: "Actif" | "Prospect" | "Inactive";
  adresse: string;
}

export interface Rdv {
  id: string;
  title: string;
  clientId: string;
  date: string;
  location?: string;
  description?: string;
}

export interface Note {
  id: string;
  content: string;
  clientId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  clientId: string;
  completed: boolean;
  dueDate?: string;
  priority?: string;
}

// GET Requests
export const getClients = async (): Promise<Client[]> => {
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des clients");
  }
  return response.json();
};

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des notes");
  }
  return response.json();
};

// GET Requests
export const getRdvs = async (): Promise<Rdv[]> => {
  const response = await fetch(`${API_URL}/rdvs`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des rendez-vous");
  }
  return response.json();
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des tâches");
  }
  return response.json();
};

// POST Requests
export const addClient = async (client: Client): Promise<void> => {
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du client");
  }
};

export const addNote = async (note: Note): Promise<void> => {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la note");
  }
};

// POST Requests
export const addRdv = async (rdv: {
  title: string;
  client_id: string;
  date: string;
  location?: string;
  description?: string;
}): Promise<Rdv> => {
  const response = await fetch(`${API_URL}/rdvs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rdv),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du rendez-vous");
  }

  return response.json();
};

export const addTask = async (task: Task): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la tâche");
  }
};
