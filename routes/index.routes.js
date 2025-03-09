import express from "express";
import {
Github,GithubWithIssues,GithubWithRepo
} from "../controllers/index.controller.js"
const gitRouter = express.Router();

gitRouter.get("/", Github);
gitRouter.get("/:repoName", GithubWithRepo);
gitRouter.post("/:repoName/issues", GithubWithIssues);


export default gitRouter;