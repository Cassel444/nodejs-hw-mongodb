import createHttpError from "http-errors";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactsById,
    updateContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/ParseFilterParams.js";

export const getContactsController = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortOrder, sortBy } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortOrder,
        sortBy,
        filter,
        userId: req.user._id,
    });

    res.json({
        status: 200,
        message: `Successfully found contacts for ${req.user.name}!`,
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {

    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactsById(contactId, userId);

    if (!contact) {
        throw (createHttpError(404, "Contact not found"));
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = {
        ...req.body,
        userId: req.user._id,
    };
    const createdContact = await createContact(contact);

    res.status(201).json({
        status: 201,
        message: `Successfully created contact for ${req.user.name}!`,
        data: createdContact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    const contact = await getContactsById(contactId, userId);

    if (contact === null) {
        throw (createHttpError(404, "Contact not found"));
    }

    const newContact = await updateContact(contactId, updateData, userId);

    res.status(200).json({
        status: 200,
        message: `Successfully updated the contact for ${req.user.name}!`,
        data: newContact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactsById(contactId, userId);

    if (!contact) {
        throw (createHttpError(404, "Contact not found!"));
    }

    await deleteContact(contactId, userId);
    res.status(204).end();
};
