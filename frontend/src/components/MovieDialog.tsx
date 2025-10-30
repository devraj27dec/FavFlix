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
import { MovieType, type MovieShema } from "@/lib/schema";
import toast from "react-hot-toast";


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
  const [formData, setFormData] = useState<MovieShema>({
    title: "",
    director: "",
    type: "",
    budget: 0,
    duration:"",
    location: "",
    year: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (initialData) {
      setFormData((prev:any) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev:any) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = () => {

    const result = MovieType.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err:any) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      toast.error("Please fix validation errors before submitting.");
      return;
    }

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
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Director */}
          <div className="grid gap-2">
            <Label htmlFor="director">Director *</Label>
            <Input
              id="director"
              placeholder="Enter Director Name"
              value={formData.director}
              onChange={handleChange}
              className={errors.director ? "border-red-500" : ""}
            />
            {errors.director && (
              <p className="text-red-500 text-sm">{errors.director}</p>
            )}
          </div>

          {/* Type */}
          <div className="grid gap-2">
            <Label htmlFor="type">Movie Type *</Label>
            <Input
              id="type"
              placeholder="Enter Movie Type"
              value={formData.type}
              onChange={handleChange}
              className={errors.type ? "border-red-500" : ""}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* Budget */}
          <div className="grid gap-2">
            <Label htmlFor="budget">Budget *</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter Budget"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: Number(e.target.value) })
              }
              className={errors.budget ? "border-red-500" : ""}
            />
            {errors.budget && (
              <p className="text-red-500 text-sm">{errors.budget}</p>
            )}
          </div>

          {/* Location */}
          <div className="grid gap-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Year */}
          <div className="grid gap-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="text"
              placeholder="Enter Year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? "border-red-500" : ""}
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
          </div>

          {/* Duration */}
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration *</Label>
            <Input
              id="duration"
              type="text"
              placeholder="Enter Duration"
              value={formData.duration}
              onChange={handleChange}
              className={errors.duration ? "border-red-500" : ""}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>

          {/* Image */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, image: file.name }));
                }
              }}
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
