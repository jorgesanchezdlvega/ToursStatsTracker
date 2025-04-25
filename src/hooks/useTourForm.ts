
import React from "react"; // Add React import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { tourFormSchema, TourFormData, TourFormProps } from "@/types/tour";

export const useTourForm = ({ editingTour, onCancel }: TourFormProps) => {
  const queryClient = useQueryClient();
  
  const form = useForm<TourFormData>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: editingTour ? {
      ...editingTour,
      date: new Date(editingTour.date),
    } : {
      tour_type: "Gamla Stan",
      tour_category: "Free Tour",
      time: "10:00", // Changed default from 12:00 to 10:00
      number_of_people: 1,
      weather: "Sunny",
      money_collected: 0,
    },
  });

  const tourType = form.watch("tour_type");
  
  React.useEffect(() => {
    if (tourType === "Vasa Tour") {
      form.setValue("tour_category", "Private Tour");
    }
  }, [tourType, form]);

  const onSubmit = async (data: TourFormData) => {
    try {
      const formattedDate = format(data.date, 'yyyy-MM-dd');
      
      // Fix score calculation
      let score = 0;
      if (data.number_of_people > 0 && data.money_collected > 0) {
        // Calculate average money per person, then divide by 20 to get a score out of 10
        score = Math.min(10, Math.max(0, (data.money_collected / data.number_of_people) / 20));
      }

      let displayTourType: "Gamla Stan" | "Södermalm" | "Vasa Tour" | "Custom" = data.tour_type;
      let customName = "";
      
      if (data.tour_type === "Custom" && data.custom_tour_name) {
        customName = data.custom_tour_name;
      }

      const tourData = {
        tour_type: displayTourType,
        tour_category: data.tour_category,
        date: formattedDate,
        time: data.time,
        number_of_people: data.number_of_people,
        weather: data.weather,
        money_collected: data.money_collected,
        score: Number(score.toFixed(1)),
        ...(customName && { custom_name: customName })
      };

      const { error } = editingTour
        ? await supabase.from("tours").update(tourData).eq('id', editingTour.id)
        : await supabase.from("tours").insert(tourData);
      
      if (error) throw error;

      toast({
        title: `Tour ${editingTour ? 'updated' : 'added'} successfully!`,
        description: `Your tour data has been ${editingTour ? 'updated' : 'saved'}.`,
      });
      
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      if (onCancel) onCancel();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingTour ? 'update' : 'add'} tour. Please try again.`,
        variant: "destructive",
      });
      console.error("Error submitting tour:", error);
    }
  };

  return {
    form,
    tourType,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
