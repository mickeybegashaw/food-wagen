import { z } from "zod";

export const foodSchema = z.object({
  name: z.string().min(2, "Food name is required"),
  restaurantName: z.string().min(2, "Restaurant name is required"),

  image: z.string().url("Invalid food image URL").optional(),
  logo: z.string().url("Invalid restaurant image URL").optional(),

  rating: z.string().min(0).max(5),

  open: z.boolean(),

});

export type FoodType = z.infer<typeof foodSchema>;
