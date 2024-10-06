import UserCard from "@/components/admin/UserCard";
import { useMutation, useSWRAPI } from "@/hooks";
import AdminLayout from "@/layouts/Admin";
import { USER_TYPE } from "@/types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminHome = () => {
  const { mutation } = useMutation();
  const { data: users, mutate } = useSWRAPI<USER_TYPE[]>(`admin/all-users`);

  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(`admin/delete-user`, {
            method: "POST",
            body: { _id: userId },
            isAlert: true,
          });

          if (res?.status === 200) {
            Swal.fire(
              "Deleted!",
              "The user has been deleted successfully.",
              "success"
            );
            mutate?.(); // Refresh the list after post-delete
          } else {
            Swal.fire(
              "Error",
              res?.results?.message || "Something went wrong.",
              "error"
            );
          }
        } catch (error: any) {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  return (
    <AdminLayout title="USER LIST">
      <section className="w-full 2xl:main-container">
        <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <UserCard key={user?._id} user={user} handleDelete={handleDelete} />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminHome;
