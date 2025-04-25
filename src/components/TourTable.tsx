import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

type Tour = {
  id: string;
  tour_type: "Gamla Stan" | "Södermalm" | "Vasa Tour" | "Custom";
  tour_category: "Free Tour" | "Private Tour";
  date: string;
  time: string;
  number_of_people: number;
  weather: "Sunny" | "Cloudy" | "Rainy" | "Snowy";
  score: number;
  money_collected: number;
};

type TourTableProps = {
  tours: Tour[];
  onEdit: (tour: Tour) => void;
};

export default function TourTable({ tours, onEdit }: TourTableProps) {
  const queryClient = useQueryClient();

  // Sort tours by date in descending order (most recent first)
  const sortedTours = [...tours].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (error) throw error;
      
      toast({
        title: "Tour deleted successfully",
        description: "The tour has been removed from the system.",
      });
      
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tour. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>People</TableHead>
            <TableHead>Weather</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>{tour.tour_type}</TableCell>
              <TableCell>{tour.tour_category}</TableCell>
              <TableCell>{format(new Date(tour.date), 'PP')}</TableCell>
              <TableCell>{tour.time}</TableCell>
              <TableCell>{tour.number_of_people}</TableCell>
              <TableCell>{tour.weather}</TableCell>
              <TableCell>{tour.score.toFixed(1)}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(tour)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(tour.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
