import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactsById,
    updateContact
} from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res, next) => {

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
        next(createHttpError(res.status(404).json({
            status: 404,
            message: "Contact not found",
        })
        ));
    }
    res.json({
        status: 200,
        message: `Succesfully found contact with id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(res.status(404).json({
            status: 404,
            message: "Contact not found",
        })
        ));
        return;
    }
    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(res.status(404).json({
            status: 404,
            message: "Contact not found!",
        })
        ));
    }
    res.status(204).send();
};
