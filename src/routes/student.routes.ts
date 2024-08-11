import { Router } from "express";
import { register } from "../controllers/Authentication/student.register";
import { login } from "../controllers/Authentication/student.login";
import { verify_token } from "../helper/jwtVerify";
import { logout } from "../controllers/Authentication/student.logout";
import { getProfile } from "../controllers/Profile/student.getProfile";
import { updateProfile } from "../controllers/Profile/student.updateProfile";
import { deleteProfile } from "../controllers/Profile/student.deleteProfile";
import { fileComplaint } from "../controllers/Complaint/student.fileComplaint";
import { getAllComplaint } from "../controllers/Complaint/student.getAllCompalint";
import { getSpecificComplaint } from "../controllers/Complaint/student.getSpecificComplaint";
import { deleteComplaint } from "../controllers/Complaint/student.deleteComplaint";
import { updateComplaint } from "../controllers/Complaint/student.updateComplaint";
import { getNotifications } from "../controllers/Notification/student.getNotifications";
import { readNotification } from "../controllers/Notification/student.markReadNotification";
import { getComments } from "../controllers/Complaint/student.getComments";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", verify_token, logout);
router.get("/student/getProfile", verify_token, getProfile);
router.patch("/student/updateProfile", verify_token, updateProfile);
router.delete("/student/deleteProfile", verify_token, deleteProfile);
router.post("/student/fileComplaint", verify_token, fileComplaint);
router.get("/student/getAllComplaints", verify_token, getAllComplaint);
router.get("/student/getComplaint/:id", verify_token, getSpecificComplaint);
router.delete("/student/deleteComplaint/:id", verify_token, deleteComplaint);
router.patch("/student/updateComplaint/:id", verify_token, updateComplaint);
router.get("/student/getNotifications", verify_token, getNotifications);
router.patch("/student/readNotification/:id", verify_token, readNotification);
router.get("/student/getComments/:id", verify_token, getComments);

export default router;
