import { useEffect, useState } from 'react';
import { FormAddContact } from './FormAddContact';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix';
import { Section } from './Section.styled';
import { EmptyEl } from './ContactList/ContactList.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const identicalContactName = contacts.some(
      ({ name }) => data.name === name
    );
    if (identicalContactName) {
      return Report.warning(
        'WARNING',
        `${data.name} is already in contacts`,
        'ok'
      );
    }
    const newContact = {
      ...data,
      id: nanoid(),
    };
    setContacts([newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value.trim());
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
      <Filter value={filter} onChange={changeFilter} />
      {visibleContacts.length ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <EmptyEl>Not found</EmptyEl>
      )}
    </Section>
  );
};
