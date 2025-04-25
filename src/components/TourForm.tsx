
import React from "react"; // Add React import
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TourFormProps } from "@/types/tour";
import { useTourForm } from "@/hooks/useTourForm";
import { TourTypeField } from "./tour-form/TourTypeField";
import { TourDetailsFields } from "./tour-form/TourDetailsFields";
import { TourMetricsFields } from "./tour-form/TourMetricsFields";

export default function TourForm({ editingTour, onCancel }: TourFormProps) {
  const { form, tourType, onSubmit } = useTourForm({ editingTour, onCancel });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <TourTypeField form={form} tourType={tourType} />
        <TourDetailsFields form={form} tourType={tourType} />
        <TourMetricsFields form={form} />

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {editingTour ? 'Update' : 'Add'} Tour
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
