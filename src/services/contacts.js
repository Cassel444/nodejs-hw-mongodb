import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find()
        .merge(contactsQuery)
        .countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };

};

export const getContactsById = (contactId) => ContactsCollection.findById(contactId);

export const createContact = (payload) => {
    return ContactsCollection.create(payload);
};

export const updateContact = (contactId, payload) => {
    return ContactsCollection.findByIdAndUpdate(
        contactId, payload, { new: true }); // чи буде повернуто оновлений документ //
};

export const deleteContact = (contactId) => {
    return ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
};
