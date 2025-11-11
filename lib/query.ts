import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { foodSchema, FoodType } from "./ZodSchema";


const API_URL = "https://6852821e0594059b23cdd834.mockapi.io/Food";

// fetch
export const useFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch foods");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// search
export const useSearchFoods = (name: string) => {
  return useQuery({
    queryKey: ["searchFoods", name],
    queryFn: async () => {
      const res = await fetch(
        `https://6852821e0594059b23cdd834.mockapi.io/Food?name=${encodeURIComponent(name)}`
      );

      if (!res.ok) throw new Error("Failed to fetch search results");
      return res.json();
    },
    enabled: Boolean(name), 
  });
};


// add food
export const useAddFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFood: FoodType) => {
      const parsed = foodSchema.parse(newFood);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error("Failed to add food");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

// edit food
export const useEditFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<FoodType>;
    }) => {
      const parsed = foodSchema.partial().parse(updates);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error("Failed to edit food");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

//delete
export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete food");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};
