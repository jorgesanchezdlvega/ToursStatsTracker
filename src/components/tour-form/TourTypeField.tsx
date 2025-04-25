
import React from "react"; // Add React import
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TourFormData } from "@/types/tour";

interface TourTypeFieldProps {
  form: UseFormReturn<TourFormData>;
  tourType: TourFormData["tour_type"];
}

export function TourTypeField({ form, tourType }: TourTypeFieldProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="tour_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tour Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tour type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Gamla Stan">Gamla Stan</SelectItem>
                <SelectItem value="Södermalm">Södermalm</SelectItem>
                <SelectItem value="Vasa Tour">Vasa Tour</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {tourType === "Custom" && (
        <FormField
          control={form.control}
          name="custom_tour_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Tour Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter custom tour name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
