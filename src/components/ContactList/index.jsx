import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem';
import { ContactListStyled } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  return (
    <ContactListStyled>
      {contacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />;
      })}
    </ContactListStyled>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};
