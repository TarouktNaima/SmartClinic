import UsersManagement from "./UsersManagement";

export default function SecretariesManagement() {
  return (
    <UsersManagement
      title="Secretaries Management"
      subtitle="Search, edit and manage secretaries professionally."
      searchPlaceholder="Search secretary..."
      emptyText="No secretaries found."
      apiUrl="http://127.0.0.1:8000/api/secretaries"
      roleName="Secretary"
    />
  );
}