import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import api from "../apiClient/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TaskManager({ user }) {
  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");
  const [dueDate, setDueDate] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Filters
  const [filterPriority, setFilterPriority] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");
  const [filterDate, setFilterDate] = React.useState("");
  const nav = useNavigate();

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const newTask = {
      title,
      priority,
      status: "In Progress",
      due_date: dueDate || new Date().toISOString().split("T")[0],
    };

    setLoading(true);
    try {
      let res = await api.post("/tasks", newTask);
      if (res?.data?.status == 1) {
        setTitle("");
        setPriority("Medium");
        setDueDate("");
        await fetchTasks();
        toast.success(res?.data?.message);
      }
      else{
        toast.error(res?.data?.message)
      }
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      let res = await api.delete(`/tasks/${id}`);
      if (res?.data?.status == 1) {
        setTasks(tasks.filter((t) => t.id !== id));
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskField = async (id, field, value) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const updatedTask = { ...task, [field]: value };
      // instant UI update
      let res = await api.put(`/tasks/${id}`, updatedTask);
      if (res?.data?.status == 1) {
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
        toast.success(res?.data?.message);
      }
      else{
        toast.error(res?.data?.message)
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // ✅ Filtering logic
  const filteredTasks = tasks.filter((t) => {
    const priorityMatch = filterPriority ? t.priority === filterPriority : true;
    const statusMatch = filterStatus ? t.status === filterStatus : true;
    const dateMatch = filterDate ? t.due_date === filterDate : true;
    return priorityMatch && statusMatch && dateMatch;
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "title",
      headerName: "Task Title",
      flex: 1,
      renderCell: (params) => (
        <Stack justifyContent={"center"} height={"100%"}>
          <TextField
            value={params.row.title}
            variant="standard"
            onChange={(e) =>
              updateTaskField(params.row.id, "title", e.target.value)
            }
            fullWidth
          />
        </Stack>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Stack justifyContent={"center"} height={"100%"}>
          <Select
            value={params.row.priority}
            onChange={(e) =>
              updateTaskField(params.row.id, "priority", e.target.value)
            }
            size="small"
            fullWidth
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </Stack>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Stack justifyContent={"center"} height={"100%"}>
          <Select
            value={params.row.status}
            onChange={(e) =>
              updateTaskField(params.row.id, "status", e.target.value)
            }
            size="small"
            fullWidth
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Stack>
      ),
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 1,
      renderCell: (params) => (
        <Stack justifyContent={"center"} height={"100%"}>
          <TextField
            type="date"
            value={params.row.due_date || ""}
            onChange={(e) =>
              updateTaskField(params.row.id, "due_date", e.target.value)
            }
            size="small"
            fullWidth
          />
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => deleteTask(params.row.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      {/* Filter Section */}
      <Stack flexDirection={"row"} justifyContent={"space-between"} my={1}>
        <Stack flexDirection={"row"} gap={1}>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>

          <TextField
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            size="small"
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFilterPriority("");
              setFilterStatus("");
              setFilterDate("");
            }}
          >
            Clear Filters
          </Button>
        </Stack>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            toast.error("Logged Out!!");
            localStorage.clear();
            nav("/");
          }}
        >
          LOGOUT
        </Button>
      </Stack>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Stack flex={1}>
          <TextField
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            fullWidth
          />
        </Stack>
        <Stack>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            size="small"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </Stack>
        <Stack>
          <TextField
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            size="small"
          />
        </Stack>
        <Button variant="contained" color="success" onClick={addTask}>
          Add
        </Button>
      </div>

      {/* Loader or Table */}

      <Box sx={{ width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={filteredTasks}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rowHeight={55}
          disableRowSelectionOnClick
          sx={{
            height: 400,
            "& .MuiDataGrid-cell": { outline: "none" },
            ".MuiDataGrid-columnHeader": {
              backgroundColor: "#00000022",
            },
            ".MuiDataGrid-cell, .MuiDataGrid-cell--textLeft": {
              outline: "none!important",
            },
            "& .MuiDataGrid-row": {
              borderWidth: 0,
              borderBottom: "1.55px dashed #37383961",
            },
            borderRadius: 2,
          }}
        />
      </Box>
    </div>
  );
}
