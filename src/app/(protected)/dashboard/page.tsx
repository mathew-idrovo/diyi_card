import { auth } from "@/auth";
import TableComponent from "@/components/Table";

import { getUsers } from "@/lib/useService";
import { columns } from "@/utils/TableConfig";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  console.log(session);
  if (!session) return <div>Not authenticated</div>;
  const users = await getUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <TableComponent
        columns={columns}
        data={users}
        emptyContent="No users found"
      />
      <Button className="button-primary max-h-10" color="primary">
        <Link className="link-button" href="/dashboard/create">
          Añadir
        </Link>
      </Button>
    </div>
  );
}
