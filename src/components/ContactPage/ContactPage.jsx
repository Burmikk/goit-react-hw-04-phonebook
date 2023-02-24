import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import Filter from 'components/Filter/Filter';
import styles from './contactPage.module.scss';

class ContactPage extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = data => {
    const checkForMatch = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (checkForMatch) {
      return alert(`${data.name} is already in contacts`);
    }
    const newContact = { id: nanoid(2), ...data };
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  handleRemove = name => {
    this.setState(prevState => {
      const newState = prevState.contacts.filter(item => item.name !== name);
      return { contacts: newState };
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  //Функция ниже возвращает либо contacts либо отфильтрованый массив с контактами.
  //Дальше она передается в клмпонент ContactList который создает разметку искользуя эти данные

  filterSearch = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const newContact = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return newContact;
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2 className={styles.title}>Contacts</h2>
          <Filter filter={this.onFilter} filterValue={this.state.filter} />
          {this.state.contacts.length !== 0 && (
            <ContactList
              filterSearch={this.filterSearch()}
              remove={this.handleRemove}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ContactPage;
