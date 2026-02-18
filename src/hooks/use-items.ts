


import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/Configs/axiosInstance"

// Define the API response type for better TypeScript support
// This helps VS Code autocomplete your data fields!
export interface Item {
    id: string
    name: string
    category: { id: number; name: string } | null
    sub_category: { id: number; name: string } | null
    sku: string | null
    type: "Product" | "Service" | "Packaging" | "Raw Material"
    stock: number | string // API returns string "0.00"
    tax_rate?: number
    price: number | string
}

// Function to fetch data from the API
const fetchItems = async (): Promise<{ item: Item[] }> => {
    // We use the configured axios instance which handles the Auth Token automatically
    const response = await axiosInstance.post("/item/list", {})
    // Return the data part of the response
    return response.data?.data || response.data || { item: [] }
}

// Custom Hook: useItems
// This is reusable! You can call this hook in any component to get the item list.
export const useItems = () => {
    return useQuery({
        // Unique key for this query. React Query uses this to cache the data.
        queryKey: ["item"],
        // The function that actually fetches the data
        queryFn: fetchItems,
    })
}
