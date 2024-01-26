"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

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
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftIcon, HomeIcon, UpdateIcon } from "@radix-ui/react-icons";
import Footer from "@/components/Footer";

type MyData = {
  _id: string;
  id: string;
  full_url: string;
  createdAt: string;
};

const columns: ColumnDef<MyData>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }: any) => (
      <div className="capitalize">
        {parseInt(row.getValue("_id").toString().substring(0, 8), 16)}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Short URL",
    cell: ({ row }) => (
      <Link
        href={`https://hit-go.vercel.app/${row.getValue("id")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`https://hit-go.vercel.app/${row.getValue("id")}`}
      </Link>
    ),
  },
  {
    accessorKey: "full_url",
    header: "Original URL",
    cell: ({ row }) => (
      <Link
        href={row.getValue("full_url")}
        className=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <ScrollArea className=" w-56">{row.getValue("full_url")}</ScrollArea>
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
  const access_token = useStore((state) => state.access_token);
  const [data, setData] = React.useState<MyData[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getURLs(access_token);
      if (res.data.error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: res.data.error,
          variant: "destructive",
        });
      } else {
        setData(res.data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
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
  });

  return (
    <>
      <Header />
      <main className="p-2">
        <div className="m-2 md:max-w-[80%] mx-auto">
          <h1 className="font-bold text-red-900 text-xl my-5">
            {isLoggedIn ? "Your URLs." : "We are sorry 😥."}
          </h1>
          <div className="rounded-md border ">
            {isLoggedIn ? (
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
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <UpdateIcon className="animate-spin mr-2" />
                            Loading....
                          </div>
                        ) : (
                          "0 Record Found !"
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="p-2">
                <h1 className="p-5 text-xl font-bold">
                  Please login first to see your URLs
                </h1>
                <Link
                  href={"/"}
                  className="underline flex items-center ml-5 mb-5"
                >
                  <ArrowLeftIcon className="mr-2" />
                  Go Back To Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
