import styles from './contactList.module.scss';
import ContactItem from 'components/ContactItem/ContactItem';
import PropTypes from 'prop-types';

const ContactList = ({ filterSearch, remove }) => {
  const list = filterSearch.map(({ id, name, number }) => (
    <ContactItem
      key={id}
      id={id}
      name={name}
      number={number}
      removeItem={remove}
    />
  ));

  return <ul className={styles.list}>{list}</ul>;
};
ContactList.propTypes = {
  filterSearch: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};
export default ContactList;
