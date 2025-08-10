"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

type CustomCalendarProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

const CustomCalendar = ({ value, onChange }: CustomCalendarProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 ">
      <Label htmlFor="date" className="px-1">
        Due date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            {value
              ? new Date(value).toLocaleDateString("en-GB")
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-white border-gray-300"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            className="p-1 m-0"
            onSelect={(selectedDate) => {
              onChange(selectedDate);
              setOpen(false);
            }}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default React.memo(CustomCalendar);
