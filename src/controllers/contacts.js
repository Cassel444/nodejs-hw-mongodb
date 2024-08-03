import createHttpError from "http-errors";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactsById,
    updateContact
} from "../services/contacts.js";

export const getContactsController = async (req, res) => {

    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {

    const { contactId } = req.params;

    const contact = await getContactsById(contactId);

    if (!contact) {
        throw (createHttpError(404, "Contact not found"));
    }

    res.json({
        status: 200,
        message: `Succesfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res, next) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body, {
        upsert: true,
    });

    if (!result) {
        throw (createHttpError(404, "Contact not found"));
    }
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Successfully upserted  a contact!",
        data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
        throw (createHttpError(404, "Contact not found!"));
    }
    res.status(204).end();
};
