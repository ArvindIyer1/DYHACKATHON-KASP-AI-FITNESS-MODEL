"use client";

import type { User as AppUser } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { users as initialUsers } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";


interface UserContextType {
  users: AppUser[];
  currentUser: AppUser | null;
  loading: boolean;
  setCurrentUserById: (id: string | null) => void;
  addUser: (user: AppUser) => void;
  updateCurrentUser: (updatedData: Partial<AppUser>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<AppUser[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Handle NextAuth session changes
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }
    
    setLoading(false);
    
    if (session?.user?.email) {
      // Find or create user from Google OAuth
      let user = userList.find(u => u.email === session.user!.email);
      
      if (!user) {
        // Create new user from Google OAuth data
        const newUser: AppUser = {
          id: session.user.email,
          name: session.user.name || "New User",
          email: session.user.email,
          avatarId: "avatar-1", // Default avatar
          points: 0,
          streak: 0,
          achievements: [],
          activityLog: [],
          fitnessGoals: "",
          experienceLevel: "Beginner"
        };
        
        setUserList(prev => [...prev, newUser]);
        setCurrentUser(newUser);
      } else {
        setCurrentUser(user);
      }
    } else if (status === "unauthenticated") {
      // Initialize with demo user for local authentication
      const demoUser = userList.find(u => u.id === 'Random@gmail.com');
      if (!currentUser && demoUser) {
        setCurrentUser(demoUser);
      }
    }
  }, [session, status, userList, currentUser]);

  const setCurrentUserById = useCallback((id: string | null) => {
    if (id === null) {
      setCurrentUser(null);
      router.push('/login');
      return;
    }
    const user = userList.find(u => u.id === id) || null;
    setCurrentUser(user);
  }, [userList, router]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const user = userList.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [userList]);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    if (session) {
      await signOut({ redirect: false });
    }
    router.push('/login');
  }, [router, session]);

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
    <UserContext.Provider value={{ users: userList, currentUser, loading, setCurrentUserById, addUser, updateCurrentUser, login, logout }}>
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
