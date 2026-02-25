import PropTypes from 'prop-types';

const DatePicker = ({ setDate, dateRange }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-center gap-y-1 gap-x-4">
      <div className="w-full sm:w-1/2">
        <label htmlFor="date-from" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
        <input
          id="date-from"
          type="date"
          value={dateRange.split(',')[0] || ''}
          onChange={(e) => {
            const to = dateRange.split(',')[1] || '';
            setDate(`${e.target.value || ''},${to}`);
          }}
          placeholder="From"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      <div className="w-full sm:w-1/2">
        <label htmlFor="date-to" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
        <input
          id="date-to"
          type="date"
          value={dateRange.split(',')[1] || ''}
          onChange={(e) => {
            const from = dateRange.split(',')[0] || '';
            setDate(`${from},${e.target.value || ''}`);
          }}
          placeholder="To"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
    </div>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  setDate: PropTypes.func.isRequired,
  dateRange: PropTypes.string.isRequired,
};