import { z } from "zod";

export const foodSchema = z.object({
  name: z.string().min(2, "Name is required"),
  restaurantName: z.string().min(2, "Restaurant name is required"),
  image: z.string().url("Invalid image URL"),
  logo: z.string().url("Invalid logo URL"),
  avatar: z.string().url("Invalid avatar URL"),
  rating: z.number().min(0).max(5),
  Price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  open: z.boolean(),
  status: z.enum(["Open", "Closed"]),
});

export type FoodType = z.infer<typeof foodSchema>;
