import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const buildTaskStatusData = (tasks) => {
  const buckets = {
    todo: 0,
    "in-progress": 0,
    "in-review": 0,
    done: 0,
  };

  tasks.forEach((task) => {
    if (buckets[task.status] !== undefined) {
      buckets[task.status] += 1;
    }
  });

  return [
    { name: "To Do", value: buckets.todo },
    { name: "In Progress", value: buckets["in-progress"] },
    { name: "In Review", value: buckets["in-review"] },
    { name: "Done", value: buckets.done },
  ];
};

export const getAdminDashboardStats = async (req, res) => {
  try {
    const [projects, tasks, totalUsers] = await Promise.all([
      Project.find().populate("teamMembers", "name email"),
      Task.find(),
      User.countDocuments(),
    ]);

    const now = new Date();
    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => new Date(p.endDate) < now).length;
    const activeProjects = totalProjects - completedProjects;

    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const inProgressTasks = tasks.filter((t) => t.status === "in-progress" || t.status === "in-review").length;

    const projectData = projects.slice(0, 12).map((project) => {
      const projectTaskList = tasks.filter((task) => String(task.project) === String(project._id));
      const projectCompletedTasks = projectTaskList.filter((task) => task.status === "done").length;
      const progress = projectTaskList.length > 0 ? Math.round((projectCompletedTasks / projectTaskList.length) * 100) : 0;

      return {
        id: project._id,
        name: project.name,
        members: project.teamMembers?.length || 0,
        progress,
      };
    });

    res.json({
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
      totalUsers,
      taskStatusData: buildTaskStatusData(tasks),
      projectData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserDashboardStats = async (req, res) => {
  try {
    const [projects, tasks] = await Promise.all([
      Project.find({
        $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }],
      }),
      Task.find({ assignedTo: req.user._id }),
    ]);

    const completedTasks = tasks.filter((task) => task.status === "done").length;
    const activeTasks = tasks.filter((task) => task.status !== "done").length;

    const now = new Date();
    const upcomingDeadlines = tasks.filter((task) => {
      if (!task.dueDate || task.status === "done") return false;
      const diffMs = new Date(task.dueDate).getTime() - now.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    res.json({
      totalProjectsJoined: projects.length,
      activeTasks,
      completedTasks,
      upcomingDeadlines,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReportsData = async (req, res) => {
  return getAdminDashboardStats(req, res);
};
