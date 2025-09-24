"use client";

import type { User as AppUser } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { users as initialUsers } from "@/lib/data";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useRouter }from "next/navigation";


interface UserContextType {
  users: AppUser[];
  currentUser: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  setCurrentUserById: (id: string | null) => void;
  addUser: (user: AppUser) => void;
  updateCurrentUser: (updatedData: Partial<AppUser>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<AppUser[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // If there's a Firebase user, find the corresponding app user from our mock data.
        // In a real app, you might fetch this from Firestore.
        const appUser = userList.find(u => u.email === user.email);
        setCurrentUser(appUser || null);
      } else {
        const demoUser = userList.find(u => u.id === 'Random@gmail.com');
        if (currentUser && currentUser.id === 'Random@gmail.com') {
           // Don't log out demo user on auth state change unless explicit
        } else {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [userList, currentUser]);

  const setCurrentUserById = useCallback((id: string | null) => {
    if (id === null) {
      auth.signOut(); // This will trigger onAuthStateChanged, which will set currentUser to null
      router.push('/login');
      return;
    }
    const user = userList.find(u => u.id === id) || null;
    setCurrentUser(user);
     if (user?.email !== 'Random@gmail.com') {
        // This is a real firebase user, onAuthStateChanged will handle it
    }
  }, [userList, router]);

  const addUser = (user: AppUser) => {
    setUserList(prevUsers => [...prevUsers, user]);
  };
  
  const updateCurrentUser = (updatedData: Partial<AppUser>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...updatedData };
    
    setCurrentUser(updatedUser);
    setUserList(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  };


  return (
    <UserContext.Provider value={{ users: userList, currentUser, firebaseUser, loading, setCurrentUserById, addUser, updateCurrentUser }}>
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
