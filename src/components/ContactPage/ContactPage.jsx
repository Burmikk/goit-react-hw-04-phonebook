import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import Filter from 'components/Filter/Filter';
import styles from './contactPage.module.scss';

const getFromLocalStorage = () => JSON.parse(localStorage.getItem('contacts'));

const ContactPage = () => {
  const [contacts, setContacts] = useState(getFromLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const checkForMatch = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (checkForMatch) {
      return alert(`${data.name} is already in contacts`);
    }
    const newContact = { id: nanoid(2), ...data };
    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };

  //Функция ниже возвращает либо contacts либо отфильтрованый массив с контактами.
  //Дальше она передается в компонент ContactList который создает разметку искользуя эти данные

  const filterSearch = () => {
    if (!filter) {
      return contacts;
    }
    const newContact = contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return newContact;
  };

  const handleRemove = id => {
    setContacts(prevState => {
      const newState = prevState.filter(item => item.id !== id);
      return newState;
    });
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={onFilter} filterValue={filter} />
        {contacts.length !== 0 && (
          <ContactList filterSearch={filterSearch()} remove={handleRemove} />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
