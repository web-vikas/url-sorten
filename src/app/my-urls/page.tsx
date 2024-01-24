"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getURLs } from "../action";
import useStore from "../store";
export type MyData = {
  _id: string;
  id: string;
  full_url: string;
  createdAt: string;
};

export const columns: ColumnDef<MyData>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "id",
    header: "Short URL",
    cell: ({ row }) => (
      <Link
        href={`https://shad.iv/${row.getValue("id")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`https://shad.iv/${row.getValue("id")}`}
      </Link>
    ),
  },
  {
    accessorKey: "full_url",
    header: "Original URL",
    cell: ({ row }) => (
      <Link
        href={row.getValue("full_url")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.getValue("full_url")}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>
    ),
  },
];

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const access_token = useStore((state) => state.access_token);
  const [data, setData] = React.useState<MyData[]>([]);

  const fetchData = async () => {
    try {
      const res = await getURLs(access_token);
      setData(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    if (access_token) {
      fetchData();
    }
  }, [access_token]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <main>
        <div className="w-full p-2">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
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
        </div>
      </main>
    </>
  );
}
