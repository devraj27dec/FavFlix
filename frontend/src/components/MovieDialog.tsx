import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { MovieData } from "@/lib/types";


interface MovieDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MovieData) => void;
  initialData?: Partial<MovieData>; 
  isEdit?: boolean;
}

export function MovieDialog({
  open,
  onClose,
  onSubmit,
  initialData = {},
  isEdit = false,
}: MovieDialogProps) {
  const [formData, setFormData] = useState<MovieData>({
    title: "",
    director: "",
    type: "",
    budget: 0,
    duration:"",
    location: "",
    year: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev:any) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev:any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-6">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Movie Details" : "Add New Movie"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify the movie details below and save changes."
              : "Fill in the information below to add a new movie."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="director">Director</Label>
            <Input
              id="director"
              placeholder="Enter Director Name"
              value={formData.director}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Movie Type</Label>
            <Input
              id="type"
              placeholder="Enter Movie Type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter Budget"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              placeholder="Enter Year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="text"
              placeholder="Enter Duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="year">Image</Label>
            <Input
              id="image"
              type="file"
              placeholder="Add Image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEdit ? "Update Movie" : "Add Movie"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
