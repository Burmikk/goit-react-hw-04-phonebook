import PropTypes from 'prop-types';

import styles from './contactItem.module.scss';
const ContactItem = ({ id,name, number, removeItem }) => (
  <li className={styles.item}>
    <p className={styles.name}>{name}</p>
    <p className={styles.number}>{number}</p>
    <button className={styles.btn} onClick={() => removeItem(id)}>
      Delete
    </button>
  </li>
);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ContactItem;
