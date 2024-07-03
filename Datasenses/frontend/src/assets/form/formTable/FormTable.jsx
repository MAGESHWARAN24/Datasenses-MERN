import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {formatDistance} from "date-fns";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CiEdit} from "react-icons/ci";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {NavLink} from "react-router-dom";
import {useAppContext} from "@/hooks/AppContext";

const columnDef = [
  {
    accessorKey: "form_name",
    header: () => <p className="text-lg font-semibold">Name</p>,
    cell: ({row}) => {
      return <p className="text-nowrap">{row.getValue("form_name")}</p>;
    },
  },
  {
    accessorKey: "description",
    header: () => <p className="text-lg font-semibold">Description</p>,
    cell: ({row}) => {
      return (
        <div className=" text-wrap">
          {row.getValue("description") || (
            <p className="text-left">No Description</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: () => <p className="text-lg font-semibold">Create At</p>,
    cell: ({row}) => {
      return (
        <p className="text-nowrap">
          {formatDistance(row.getValue("createAt"), new Date(), {
            addSuffix: true,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <p className="text-lg font-semibold">Status</p>,
    cell: ({row}) => {
      return (
        <div className="text-nowrap">
          {console.log()}
          {row.getValue("published") ? (
            <NavLink
              to="/repository"
              className="flex flex-row items-center gap-2"
            >
              <HiOutlineDocumentReport className="size-5" />
              <p>Report</p>
            </NavLink>
          ) : (
            <NavLink
              to={`/forms/builder/${row.original._id}`}
              className="flex flex-row items-center gap-2"
            >
              <CiEdit className="size-5" />
              <p>Edit</p>
            </NavLink>
          )}
        </div>
      );
    },
  },
];

export default function FormTable() {
  const {data} = useAppContext();
  const table = useReactTable({
    columns: columnDef,
    data: data.forms.Forms,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <ScrollArea className="h-full flex flex-col p-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerEl) => (
            <TableRow key={headerEl.id}>
              {headerEl.headers.map((headEl) => (
                <TableHead key={headEl.column.id}>
                  {flexRender(
                    headEl.column.columnDef.header,
                    headEl.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {table.getRowModel().rows.map((rowEl) => (
                <TableRow key={rowEl.id}>
                  {rowEl.getVisibleCells().map((collEl) => (
                    <TableCell key={collEl.id}>
                      {flexRender(
                        collEl.column.columnDef.cell,
                        collEl.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
