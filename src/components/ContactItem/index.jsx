import PropTypes from 'prop-types';
import {
  ContactData,
  ContactDelete,
  ContactItemEl,
  ContactName,
  ContactNumber,
} from './ContactItem.styled';
import { useDispatch } from 'react-redux';
import { deleteContactAction } from 'store/contacts/sliceContacts';

export const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(deleteContactAction(contactId));
  };
  return (
    <ContactItemEl>
      <ContactData>
        <ContactName>{name}: </ContactName>
        <ContactNumber>{number}</ContactNumber>
      </ContactData>
      <ContactDelete type="button" onClick={() => deleteContact(id)}>
        <svg viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
      </ContactDelete>
    </ContactItemEl>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  onDeleteContact: PropTypes.func,
};