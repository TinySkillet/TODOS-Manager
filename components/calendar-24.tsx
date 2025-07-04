"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Calendar24Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time?: string;
  setTime?: (time: string) => void;
};

export default function Calendar24({
  date,
  setDate,
  time,
  setTime,
}: Calendar24Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Label htmlFor="date-time-selection">Select Deadline</Label>
      <div className="date-time-selection flex gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                disabled={{
                  before: new Date(),
                }}
                selected={date}
                captionLayout="dropdown"
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={time}
            onChange={(e) => setTime?.(e.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>
      </div>
    </>
  );
}
