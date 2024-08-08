import express from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import {
    createContactSchema,
    updateContactSchema
} from "../db/validation/contact.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";


const router = express.Router();

const jsonParser = express.json();

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId("contactId"), ctrlWrapper(getContactByIdController));

router.post("/", jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValidId("contactId"), jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete("/:contactId", isValidId("contactId"), ctrlWrapper(deleteContactController));

export default router;
