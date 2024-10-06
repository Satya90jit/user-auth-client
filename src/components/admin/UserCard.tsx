import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { USER_TYPE } from "@/types";

const UserCard = ({
  user,
  handleDelete,
}: {
  user: USER_TYPE;
  handleDelete: (_id: string) => void;
}) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center overflow-hidden">
          <img
            src="/profile.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover border border-blue-500"
          />
        </div>

        {/* User Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Age: </span>
          {user.age}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Address: </span>
          {user.address}
        </p>
      </div>

      {/* Delete Button with Tooltip */}
      <div
        onClick={() => handleDelete(user?._id)}
        className="absolute top-5 right-5"
      >
        <Tooltip title="Delete User">
          <IconButton className="text-red-500 hover:text-red-700 bg-red-300/20">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserCard;
