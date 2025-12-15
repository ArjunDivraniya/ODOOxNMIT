import Project from "../models/Project.js";
import User from "../models/User.js";
import crypto from "crypto";

// Generate unique passkey
const generatePasskey = () => crypto.randomBytes(8).toString("hex");

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, teamMemberEmails } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find team members by email
    let teamMembers = [];
    if (teamMemberEmails && teamMemberEmails.length > 0) {
      teamMembers = await User.find({ email: { $in: teamMemberEmails } }).select("_id");
    }

    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      teamMembers: teamMembers.map((user) => user._id),
      passkey: generatePasskey(),
      createdBy: req.user._id,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search team member by email
export const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email }).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all projects for the logged-in user
export const getAllProjects = async (req, res) => {
  try {
    // Admin can see all projects, users see only their projects
    let projects;
    if (req.user.role === "admin") {
      projects = await Project.find()
        .populate("createdBy", "name email")
        .populate("teamMembers", "name email role")
        .sort({ createdAt: -1 });
    } else {
      projects = await Project.find({
        $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }],
      })
        .populate("createdBy", "name email")
        .populate("teamMembers", "name email role")
        .sort({ createdAt: -1 });
    }

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email role");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user has access to this project
    const hasAccess =
      req.user.role === "admin" ||
      project.createdBy._id.toString() === req.user._id.toString() ||
      project.teamMembers.some((member) => member._id.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, teamMemberEmails } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admin or project creator can update
    if (
      req.user.role !== "admin" &&
      project.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    // Update fields
    if (name) project.name = name;
    if (description) project.description = description;
    if (startDate) project.startDate = startDate;
    if (endDate) project.endDate = endDate;

    // Update team members if provided
    if (teamMemberEmails && teamMemberEmails.length > 0) {
      const teamMembers = await User.find({ email: { $in: teamMemberEmails } }).select("_id");
      project.teamMembers = teamMembers.map((user) => user._id);
    }

    await project.save();

    const updatedProject = await Project.findById(projectId)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email role");

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admin or project creator can delete
    if (
      req.user.role !== "admin" &&
      project.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(projectId);

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Join project using passkey
export const joinProjectWithPasskey = async (req, res) => {
  try {
    const { passkey } = req.body;

    if (!passkey) {
      return res.status(400).json({ message: "Passkey is required" });
    }

    const project = await Project.findOne({ passkey });

    if (!project) {
      return res.status(404).json({ message: "Invalid passkey" });
    }

    // Check if user is already a team member
    if (project.teamMembers.includes(req.user._id)) {
      return res.status(400).json({ message: "You are already a member of this project" });
    }

    // Add user to team members
    project.teamMembers.push(req.user._id);
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email role");

    res.json({
      message: "Successfully joined the project",
      project: updatedProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove team member from project
export const removeTeamMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only admin or project creator can remove members
    if (
      req.user.role !== "admin" &&
      project.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Remove team member
    project.teamMembers = project.teamMembers.filter(
      (member) => member.toString() !== userId
    );

    await project.save();

    res.json({ message: "Team member removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
