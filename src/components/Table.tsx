"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface TableComponentProps {
  columns: { key: string; label: string }[];
  data: any[];

  emptyContent?: string;
}

export default function TableComponent({
  columns,
  data,

  emptyContent,
}: TableComponentProps) {
  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "id":
        return item.id;
      case "name":
        return item.name;
      case "email":
        return item.email;
      case "role":
        return item.role || "N/A";
      case "createdAt":
        return new Date(item.createdAt).toLocaleString();
      case "updatedAt":
        return new Date(item.updatedAt).toLocaleString();
      default:
        return null;
    }
  };
  return (
    <Table
      className="relative flex-grow"
      classNames={{ table: "min-h-[10rem]", wrapper: "shadow-none px-0" }}
    >
      <TableHeader className="bg-primary" columns={columns}>
        {({ key, label }) => (
          <TableColumn className="title-head-table" key={key}>
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent || "No data available"}
        itemID="id"
        items={data}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="text-row-table">
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
