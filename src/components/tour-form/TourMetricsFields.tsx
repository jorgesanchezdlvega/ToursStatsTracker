
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TourFormData } from "@/types/tour";

interface TourMetricsFieldsProps {
  form: UseFormReturn<TourFormData>;
}

export function TourMetricsFields({ form }: TourMetricsFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="number_of_people"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of People</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                min={1}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weather"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weather</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Sunny">Sunny</SelectItem>
                <SelectItem value="Cloudy">Cloudy</SelectItem>
                <SelectItem value="Rainy">Rainy</SelectItem>
                <SelectItem value="Snowy">Snowy</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="money_collected"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Money Collected (SEK)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                min={0}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
