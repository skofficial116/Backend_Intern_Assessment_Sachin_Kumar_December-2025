import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import {
  fetchUsers,
  activateUser,
  deactivateUser,
} from "../../api/user.api";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";

const StatusBadge = ({ status }) => {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers(page);
      setUsers(res.data.users);
      setMeta(res.data);
    } catch (err) {
      toast.error("Failed to load users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleStatusChange = async (user) => {
    const isDeactivating = user.status === "active";

    if (isDeactivating && !window.confirm("Are you sure you want to deactivate this user?")) {
      return;
    }

    setUsers((prev) =>
      prev.map((u) =>
        u._id === user._id
          ? { ...u, status: isDeactivating ? "inactive" : "active" }
          : u
      )
    );

    try {
      isDeactivating
        ? await deactivateUser(user._id)
        : await activateUser(user._id);
      toast.success(`User ${isDeactivating ? "deactivated" : "activated"} successfully`);
    } catch (err) {
      loadUsers();
      toast.error("Action failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

        {loading && (
          <div className="py-10">
            <Loader message="Loading users..." />
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center py-10 text-gray-500">No users found</div>
        )}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{u.email}</td>
                    <td>{u.fullName}</td>
                    <td className="capitalize">{u.role}</td>
                    <td>
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="text-center">
                      <Button
                        variant={u.status === "active" ? "danger" : "primary"}
                        onClick={() => handleStatusChange(u)}
                      >
                        {u.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <Pagination
            page={page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
