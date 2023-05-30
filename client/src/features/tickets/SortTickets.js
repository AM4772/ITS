import React from 'react'

const SortTickets = () => {


    function handleOrdChange(e) {
      e.preventDefault();
      if (e.target.value) {

      }
      if (e.target.value === "A-Z" || e.target.value === "Z-A") {
        setOrder(e.target.value);
      }
      if (!e.nativeEvent.inputType) {
        e.target.blur();
      }
    }

  return (

  );
}

export default SortTickets