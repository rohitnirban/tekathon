'use client'

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  wetlandName: z.string().min(1, "Wetland Name is required"),
  coordinates: z.string().min(1, "Coordinates are required"),
  district: z.string().min(1, "District is required"),
  village: z.string().min(1, "Village is required"),
  wetlandType: z.enum(["Inland", "Coastal"]),
  wetlandSubType: z.string().optional(),
  area: z.string().min(1, "Area is required"),
  khasraNo: z.string().min(1, "Khasra No. is required"),
  isRegulated: z.boolean(),
  recentImage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const WetlandUploadForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wetlandType: "Inland",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
    // Send data to the server here
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="wetlandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wetland Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Village*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="wetlandType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wetland Type*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wetlandSubType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wetland Sub-Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (in acres)*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="khasraNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khasra No.*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isRegulated"
            render={({ field }) => (
              <FormItem>
                  <Checkbox />
                <FormLabel className='ml-2'>Is Regulated?</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recentImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recent Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default WetlandUploadForm;
