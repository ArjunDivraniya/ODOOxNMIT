import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "in-review", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    dueDate: {
      type: Date,
    },
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
