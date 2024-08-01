import createHttpError from "http-errors";
import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await contactsCollection.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);

    if (!contact) {
        throw (createHttpError(404, "Contact not found"));
    }
    return contact;
};

export const createContact = async (payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findByIdAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,

        },
    );
    if (!rawResult || !rawResult.value) {
        throw (createHttpError(404, "Contact not found"));

    }
    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    };
};

export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findOneAndDelete({
        _id: contactId,
    });

    if (!contact) {
        throw (createHttpError(404, "Contact not found!"));
    }
    return contact;
};
