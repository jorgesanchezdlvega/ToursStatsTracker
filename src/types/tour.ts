
import { z } from "zod";

export const tourFormSchema = z.object({
  tour_type: z.enum(["Gamla Stan", "Södermalm", "Vasa Tour", "Custom"]),
  custom_tour_name: z.string().optional(),
  tour_category: z.enum(["Free Tour", "Private Tour"]),
  date: z.date(),
  time: z.string(),
  number_of_people: z.number().min(1),
  weather: z.enum(["Sunny", "Cloudy", "Rainy", "Snowy"]),
  money_collected: z.number().min(0),
});

export type TourFormData = z.infer<typeof tourFormSchema>;

export type TourFormProps = {
  editingTour?: {
    id: string;
    tour_type: "Gamla Stan" | "Södermalm" | "Vasa Tour" | "Custom";
    tour_category: "Free Tour" | "Private Tour";
    date: string;
    time: string;
    number_of_people: number;
    weather: "Sunny" | "Cloudy" | "Rainy" | "Snowy";
    money_collected: number;
    score: number;
  };
  onCancel?: () => void;
};
