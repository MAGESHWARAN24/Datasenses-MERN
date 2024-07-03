import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {GrFormPrevious} from "react-icons/gr";
import {GrFormNext} from "react-icons/gr";
import {MdKeyboardDoubleArrowLeft} from "react-icons/md";
import {MdKeyboardDoubleArrowRight} from "react-icons/md";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {format} from "date-fns";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card} from "@/components/ui/card";
import {toast} from "@/components/ui/use-toast";
export default function DataTable() {
  const [columnDef, setColumnDef] = React.useState([
    {
      id: "Selected-Row",
      header: ({table}) => (
        <>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select"
            key={1}
          />
        </>
      ),
      cell: ({row}) => (
        <div className="flex items-center justify-center" key={row}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
  ]);
  const {id} = useParams();
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState();
  const [shareURL, setShareURL] = React.useState();
  const tableInstance = useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
      rowSelection: rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
  });

  React.useEffect(() => {
    const fetch = async () => {
      const path = `${apiPath.repository.fetch}${id}`;
      (await applicationAPI(path))
        .fetch()
        .then((response) => {
          if (response.status === 200) {
            response.data.columns.forEach((ele) => {
              const {Id, Header, Type, Name} = ele;

              setColumnDef((pre) => [
                ...pre,
                {
                  accessorKey: Name,
                  header: ({column}) => {
                    return (
                      <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting()}
                      >
                        {Header}
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                      </Button>
                    );
                  },
                  cell: ({row}) => (
                    <>
                      {Type.includes("Date")
                        ? format(row.getValue(Name), "MMM/dd/yyyy")
                        : row.getValue(Name)}
                    </>
                  ),
                },
              ]);
            });
            response.data.data.forEach((ele) => {
              setData((pre) => [...pre, ele.content]);
            });
            setShareURL(response.data.shareURL);
          }
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, [id]);
  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(shareURL);
    toast({
      title: "Link copied to clipboard.",
    });
  };
  return (
    <>
      <header className="h-[5%] w-full flex flex-col items-start justify-center p-5">
        <nav className="font-bold text-xl">Repository</nav>
      </header>
      <main className="h-[95%] w-full">
        <div className="h-[5%] w-full p-5 flex flex-row items-center gap-5">
          <Input
            className="w-1/2 h-10"
            placeholder="search"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <div className="h-10 flex flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => tableInstance.setPageIndex(0)}
            >
              <MdKeyboardDoubleArrowLeft />
            </Button>
            <Button
              variant="outline"
              disabled={!tableInstance.getCanPreviousPage()}
              onClick={() => tableInstance.previousPage()}
            >
              <GrFormPrevious />
            </Button>
            <Button
              variant="outline"
              disabled={!tableInstance.getCanNextPage()}
              onClick={() => tableInstance.nextPage()}
            >
              <GrFormNext />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
              }
            >
              <MdKeyboardDoubleArrowRight />
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Input readOnly value={shareURL} className="w-96" />
            <Button onClick={handleCopyClipBoard}>Copy Link</Button>
          </div>
        </div>
        <div className="p-10 h-[80%] w-full ">
          <Table>
            <TableHeader>
              {tableInstance.getHeaderGroups().map((headerGrp) => (
                <TableRow key={headerGrp.id}>
                  {headerGrp.headers.map((headerEl) => (
                    <TableHead key={headerEl.column.id}>
                      {flexRender(
                        headerEl.column.columnDef.header,
                        headerEl.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {tableInstance.getRowModel().rows.length ? (
                <>
                  {tableInstance.getRowModel().rows.map((rowEl) => (
                    <TableRow key={rowEl.id}>
                      {rowEl.getVisibleCells().map((colEl) => {
                        return (
                          <TableCell key={colEl.id}>
                            {flexRender(
                              colEl.column.columnDef.cell,
                              colEl.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </>
              ) : (
                <div className="w-full h-10 text-center">
                  {"No Content to display"}
                </div>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}

// <div className="w-full h-10 flex flex-row gap-3 justify-end p-5 z-10">
//   <Button variant="outline" onClick={() => tableInstance.setPageIndex(0)}>
//     <MdKeyboardDoubleArrowLeft />
//   </Button>
//   <Button
//     variant="outline"
//     disabled={!tableInstance.getCanPreviousPage()}
//     onClick={() => tableInstance.previousPage()}
//   >
//     <GrFormPrevious />
//   </Button>
//   <Button
//     variant="outline"
//     disabled={!tableInstance.getCanNextPage()}
//     onClick={() => tableInstance.nextPage()}
//   >
//     <GrFormNext />
//   </Button>
//   <Button
//     variant="outline"
//     onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
//   >
//     <MdKeyboardDoubleArrowRight />
//   </Button>
// </div>;
