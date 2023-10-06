import { FormAddContact } from './FormAddContact';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { Report } from 'notiflix';
import { Section } from './Section.styled';
import { EmptyEl } from './ContactList/ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from 'store/contacts/sliceContacts';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.filter.filter);

  const addContact = data => {
    const identicalContactName = contacts?.some(
      ({ name }) => data.name === name
    );
    if (identicalContactName) {
      return Report.warning(
        'WARNING',
        `${data.name} is already in contacts`,
        'ok'
      );
    }
    dispatch(addContactAction(data));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Section>
      <h2>Phonebook</h2>
      <FormAddContact addContact={addContact} />
      <h2>Contacts</h2>
      <Filter />
      {contacts ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        <EmptyEl>Not found</EmptyEl>
      )}
    </Section>
  );
};
