import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './contactForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ addContact }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const inputChange = e => {
    const { value, name } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    addContact({ ...state });

    setState({ ...INITIAL_STATE });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <label htmlFor="name">Name</label>
      <input
        className={styles.input}
        id="name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={state.name}
        onChange={inputChange}
        ref={focusRef}
      />
      <label htmlFor="number">Number</label>
      <input
        className={styles.input}
        id="number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={state.number}
        onChange={inputChange}
      />
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
