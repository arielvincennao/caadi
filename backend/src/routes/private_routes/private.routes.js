import express from "express"
import * as adminController from "../controllers/private.controller.js"
const router = express.Router()

// CRUD sectoins
router.get("/sections", adminController.getAllSections)
router.get("/sections/:id", adminController.getSectionById)
router.post("/sections", adminController.createSection)
router.put("/sections/:id", adminController.updateSection)
router.delete("/sections/:id", adminController.deleteSection)
