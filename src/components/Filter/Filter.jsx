import styles from './filter.module.scss';
import PropTypes from 'prop-types';

const Filter = ({ filter, filterValue }) => (
  <div className={styles.filter}>
    <h3 className={styles.title}>Find contact by name</h3>
    <input
      className={styles.input}
      type="text"
      name="filter"
      onChange={filter}
      value={filterValue}
    />
  </div>
);

Filter.proprTypes = {
  filter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
export default Filter;
