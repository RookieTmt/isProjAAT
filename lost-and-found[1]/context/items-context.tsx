"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Item } from "@/types/item"

interface ItemsContextType {
  items: Item[]
  addItem: (item: Item) => void
  updateItemStatus: (id: string, status: "active" | "resolved") => void
  removeItem: (id: string) => void
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined)

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([])

  // Load items from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem("lostFoundItems")
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    } else {
      // Set some sample items if none exist
      const sampleItems: Item[] = [
        {
          id: "1",
          type: "lost",
          name: "Blue Backpack",
          category: "bags",
          location: "Central Mall, Food Court",
          dateLost: new Date("2023-04-15"),
          dateReported: new Date("2023-04-16"),
          description:
            "A navy blue North Face backpack with a laptop and textbooks inside. Lost during lunch at the food court.",
          contactInfo: "john.doe@example.com",
          image: null,
          status: "active",
        },
        {
          id: "2",
          type: "found",
          name: "iPhone 13",
          category: "electronics",
          location: "City Train Station, Platform 3",
          dateFound: new Date("2023-04-18"),
          dateReported: new Date("2023-04-18"),
          description: "Found an iPhone 13 in a red case on a bench at Platform 3. The screen is locked.",
          contactInfo: "jane.smith@example.com",
          image: null,
          status: "active",
        },
        {
          id: "3",
          type: "lost",
          name: "Car Keys",
          category: "keys",
          location: "University Campus, Library",
          dateLost: new Date("2023-04-10"),
          dateReported: new Date("2023-04-11"),
          description: "Lost a set of car keys with a black Toyota fob and several other keys on a silver ring.",
          contactInfo: "mike.johnson@example.com",
          image: null,
          status: "resolved",
        },
      ]
      setItems(sampleItems)
      localStorage.setItem("lostFoundItems", JSON.stringify(sampleItems))
    }
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("lostFoundItems", JSON.stringify(items))
  }, [items])

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item])
  }

  const updateItemStatus = (id: string, status: "active" | "resolved") => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItemStatus, removeItem }}>{children}</ItemsContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (context === undefined) {
    throw new Error("useItems must be used within an ItemsProvider")
  }
  return context
}
