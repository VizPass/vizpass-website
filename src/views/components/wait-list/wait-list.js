import React  from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import WaitItem from '../wait-item/wait-item';


function WaitList({removeWait, waits, updateWait}) {
  let waitItems = waits.map((wait, index) => {
    return (
      <WaitItem
        key={index}
        wait={wait}
        removeWait={removeWait}
        updateWait={updateWait}
      />
    );
  });

  return (
    <div className="wait-list">
      {waitItems}
    </div>
  );
}

WaitList.propTypes = {
  removeWait: PropTypes.func.isRequired,
  waits: PropTypes.instanceOf(List).isRequired,
  updateWait: PropTypes.func.isRequired
};

export default WaitList;
