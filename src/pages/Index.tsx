
import React, { useState } from "react"; // Add React import
import TourForm from "@/components/TourForm";
import TourTable from "@/components/TourTable";
import Dashboard from "@/components/Dashboard";
import EditTourDialog from "@/components/EditTourDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Define the Tour type to match what's used in TourTable
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

const Index = () => {
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: tours = [] } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      
      // Ensure tour_category is of the correct type
      return data.map(tour => ({
        ...tour,
        tour_category: tour.tour_category as "Free Tour" | "Private Tour"
      })) as Tour[];
    },
  });

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingTour(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Stockholm Tour Tracker</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Add New Tour</h2>
              <TourForm />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tour History</h2>
              <TourTable tours={tours} onEdit={handleEditTour} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <Dashboard />
          </div>
        </div>
      </div>
      <EditTourDialog 
        tour={editingTour} 
        open={isEditDialogOpen} 
        onClose={handleCloseEditDialog} 
      />
    </div>
  );
};

export default Index;
