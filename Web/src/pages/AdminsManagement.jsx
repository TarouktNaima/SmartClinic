import UsersManagement from "./UsersManagement";

export default function AdminsManagement() {
  return (
    <UsersManagement
      title="Admins Management"
      subtitle="Search, edit and manage admins professionally."
      searchPlaceholder="Search admin..."
      emptyText="No admins found."
      apiUrl="http://127.0.0.1:8000/api/admins"
      roleName="Admin"
    />
  );
}