import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes);
app.use("/tasks",taskRoutes);

app.get("/",(req,res)=>{
    res.end("HI");
});

export default app;
