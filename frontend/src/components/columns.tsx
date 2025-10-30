import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { MovieData } from "@/lib/types";


export const columns = (
  onMovieEdit: (id: number) => void,
  onMovieDelete: (id: number) => void
): ColumnDef<MovieData>[] => [
  { 
    header: "S.No",
    cell: ({ row }) => row.index + 1,
    size: 80
  },
  { accessorKey: "title", header: "Title"},
  { accessorKey: "director", header: "Director" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "duration", header: "Time" },
  { accessorKey: "year", header: "Year" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const movie = row.original;
      return (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onMovieEdit(movie.mid!)}
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onMovieDelete(movie.mid!)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    },
  },
];
