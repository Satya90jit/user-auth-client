import useAuth from "@/hooks/useAuth";
import withProtectedRoute from "@/hooks/withProtectedRoute";
import PublicLayout from "@/layouts/public";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const MyProfilePage = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const LogOut = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5B50A1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform logout operations
        await logOut(); // Call logOut from the hook to clear session/local storage

        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been successfully logged out.",
        }).then(() => {
          // Redirect to login page after the success alert
          router.push("/login");
        });
      }
    });
  };

  return (
    <PublicLayout>
      <section className="bg-white rounded-lg shadow-lg border p-6 w-full md:max-w-xl mx-auto my-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-700">{user?.name}</h1>
          <p className="text-sm text-gray-500">User Profile</p>
          <div className="w-full border-t border-gray-200 mt-4"></div>
          <div className="w-full mt-4 space-y-3">
            {/* Email */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
            </div>
            {/* Age */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Age:</span>
              <span className="text-gray-800">{user?.age}</span>
            </div>
            {/* Address */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Address:</span>
              <span className="text-gray-800">{user?.address}</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div onClick={LogOut} className="mt-6">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              Logout
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default withProtectedRoute(MyProfilePage);
