"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputField = {
  id: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
};

type UniversalDialogProps = {
  title: string;
  description?: string;
  icon?: string;
  inputs?: InputField[];
  onSubmit?: (data: Record<string, string>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PayModal({
  title,
  description,
  icon,
  inputs = [],
  onSubmit,
  open,
  onOpenChange,
}: UniversalDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {icon && (
            <img src={icon} alt="icon" className="w-20 h-20 mx-auto mb-2" />
          )}
          <div className="grid gap-4 py-2">
            {inputs.map(({ id, label, placeholder, defaultValue }) => (
              <div key={id} className="grid gap-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  placeholder={placeholder}
                  defaultValue={defaultValue}
                  onChange={(e) => handleChange(id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-2xl"
              type="submit"
            >
              Оплатить
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
