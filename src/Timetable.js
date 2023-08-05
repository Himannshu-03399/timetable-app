import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { 
  dropdownOptions1, 
  dropdownOptions2,
  dropdownOptions3,
} from './BasketData';
import courses from './BasketData';
import ShowTimetable from './Showtt';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Timetable = () => {
  const navigate = useNavigate();
  const [selectedElectives, setSelectedElectives] = useState([]);
  const [elective, setElective] = useState({
    basket1: null,
    basket2: null,
    basket3: null,
  });

  useEffect(() => {
    console.log(selectedElectives);
  }, [selectedElectives]);

  const handleBasket1Change = (selectedElective) => {
    setElective((prevElective) => ({
      ...prevElective,
      basket1: selectedElective,
    }));
  };

  const handleBasket2Change = (selectedElective) => {
    setElective((prevElective) => ({
      ...prevElective,
      basket2: selectedElective,
    }));
  };

  const handleBasket3Change = (selectedElective) => {
    setElective((prevElective) => ({
      ...prevElective,
      basket3: selectedElective,
    }));
  };

  const submitElectives = () => {
    let id1 = elective.basket1.value;
    let id2 = elective.basket2.value;
    let id3 = elective.basket3.value;
    const selected = [courses[id1], courses[id2], courses[id3]];
    setSelectedElectives(selected);
    // console.log(selected);
    while(!selected) {

    }
    navigate('/tt/' + encodeURIComponent(JSON.stringify(selected)));
  };
  
  const handleSelectFocus = (event) => {
    event.target.blur(); // This will prevent the keyboard from showing up on mobile devices
  };

  return (
    <div>
      <h1 className='title'>Timetable</h1>
      <Select
        options={dropdownOptions1}
        onChange={handleBasket1Change}
        value={elective.basket1}
        placeholder="Select basket 1 elective"
        onFocus={handleSelectFocus} 
      />
      <br/>
      <Select
        options={dropdownOptions2}
        onChange={handleBasket2Change}
        value={elective.basket2}
        placeholder="Select basket 2 elective"
        onFocus={handleSelectFocus}
      />
      <br/>
      <Select
        options={dropdownOptions3}
        onChange={handleBasket3Change}
        value={elective.basket3}
        placeholder="Select basket 3 elective"
        onFocus={handleSelectFocus}
      />
      <button onClick={submitElectives}>SUBMIT</button>
    </div>
  );
};

export default Timetable;
