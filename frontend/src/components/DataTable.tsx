"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
// import {
//   // ArrowUpDown,
//   ChevronDown,
//   //  MoreHorizontal

// } from "lucide-react"

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   // DropdownMenuItem,
//   // DropdownMenuLabel,
//   // DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import type { MovieData } from "@/lib/types";

export function DataTable({
  data,
  columns,
  onAdd,
}: {
  data: MovieData[];
  columns: ColumnDef<MovieData, any>[];
  onAdd: ()=> void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Filter Movies..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button onClick={() => onAdd()}>+Add New</Button>
        {/* <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>+ Add Movie</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your Favorite Movie</DialogTitle>
                <DialogDescription>
                  Here you add and make our list of favorite movies
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter Movie Title"
                    type="text"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="director">Director</Label>
                  <Input
                    id="director"
                    placeholder="Enter Director Name"
                    type="text"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="type">Movie Type</Label>
                  <Input id="type" placeholder="Enter Movie Type" type="text" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget (in millions)</Label>
                  <Input
                    id="budget"
                    placeholder="Enter Movie Budget"
                    type="number"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter Shooting Location"
                    type="text"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="year">Release Year</Label>
                  <Input
                    id="year"
                    placeholder="Enter Release Year"
                    type="number"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="Enter Duration (e.g., 120 mins)"
                      type="text"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Image</Label>
                    <Input type="file" placeholder="Add your Movie Image" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog> */}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
