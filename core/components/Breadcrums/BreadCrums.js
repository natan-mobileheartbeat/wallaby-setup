import React from 'react';
import './Breadcrums.scss';
import { NavLink } from 'react-router-dom';

const BreadCrums = props => {
  let items = props.crums.map((item, index) => {
    let showDivider = index < props.crums.length - 1;
    if (item.path) {
      return (
        <React.Fragment key={index}>
          <NavLink to={item.path}>
            <span className="mh-bc-item">{item.label}</span>
          </NavLink>
          {showDivider && <span>></span>}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          <span className="mh-bc-item">{item.label}</span>
          {showDivider && <span>></span>}
        </React.Fragment>
      );
    }
  });
  return <div className="mh-breadcrumbs">{items}</div>;
};

export default BreadCrums;
