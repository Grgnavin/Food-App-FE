import { z } from "zod";

export const MenuSchema = z.object({
    name: z.string().min(5, { message: "Name is required"}),
    description: z.string().min(10, { message: "Description is required"}),
    price: z.number().min(0, { message: "Price cannot be negative"}),
    image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image file is required" })
});