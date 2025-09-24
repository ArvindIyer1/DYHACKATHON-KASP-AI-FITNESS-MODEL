"use client";

import type { User } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { users as initialUsers } from "@/lib/data";

interface UserContextType {
  users: User[];
  currentUser: User | null;
  setCurrentUserById: (id: string | null) => void;
  addUser: (user: User) => void;
  updateCurrentUser: (updatedData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const setCurrentUserById = useCallback((id: string | null) => {
    if (id === null) {
      setCurrentUser(null);
      return;
    }
    const user = users.find(u => u.id === id) || null;
    setCurrentUser(user);
  }, [users]);

  const addUser = (user: User) => {
    setUsers(prevUsers => [...prevUsers, user]);
  };
  
  const updateCurrentUser = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...updatedData };
    
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  };


  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUserById, addUser, updateCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
