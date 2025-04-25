
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TourForm from "@/components/TourForm";

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

interface EditTourDialogProps {
  tour: Tour | null;
  open: boolean;
  onClose: () => void;
}

export default function EditTourDialog({ tour, open, onClose }: EditTourDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>
        {tour && <TourForm editingTour={tour} onCancel={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
