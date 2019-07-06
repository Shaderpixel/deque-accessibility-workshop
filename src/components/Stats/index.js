import React from 'react';
import PropTypes from 'prop-types';
import Histogram from '../Histogram';
import './index.css';

const Stats = ({ stats }) => (
  <div className="Stats">
    <div className="confined">
      {stats.map(({ label, value, icon, histogram }) => (
        <div
          className={`Stat ${histogram ? 'with-chart' : ''}`}
          key={`${label}-${value}`}
        >
          <h2 aria-live="polite" aria-relevant="all" aria-atomic="true">
            <div className="Stat__value">
              {icon && (
                <img
                  className="Stat__value-icon"
                  src={icon}
                  alt=""
                  role="presentation"
                />
              )}
              {histogram ? (
                <Histogram data={histogram} />
              ) : (
                <span>{value}</span>
              )}
            </div>
            <div>
              <div className="Stat__label">{label}</div>
              {histogram && (
                <div className="Histogram__value-wrap">
                  <span className="Histogram__value">{value}</span>
                  <span>avg</span>
                </div>
              )}
            </div>
          </h2>
        </div>
      ))}
    </div>
  </div>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
      histogram: PropTypes.arrayOf(PropTypes.object)
    })
  )
};

export default Stats;
