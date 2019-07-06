import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const monthMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

const Histogram = ({ data }) => {
  const sortedData = [...data].sort((prev, next) => {
    return prev.month > next.month ? 1 : -1;
  });
  console.log(sortedData);
  return (
    <ul
      className="Stat__value-histogram"
      aria-label="6 month average yumminess breakdown"
    >
      {sortedData.map(breakdown => (
        <li
          key={breakdown.month}
          aria-label={`${
            breakdown.yumminess
          } average yumminess for the month of ${monthMap[breakdown.month]}`}
        >
          <div aria-hidden="true" style={{ height: breakdown.yumminess }}>
            <span>{breakdown.yumminess}</span>
          </div>
          <div className="Stat__value-histogram-month">
            {monthMap[breakdown.month]}
          </div>
        </li>
      ))}
    </ul>
  );
};

Histogram.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      yumminess: PropTypes.number
    })
  )
};

export default Histogram;
