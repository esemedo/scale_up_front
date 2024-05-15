import React, { useState, useEffect } from "react";
import axios from 'axios';

function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(0); // State for current week offset
  const [deis, setDeis] = useState([]); // State for DEIs

  const url = "http://localhost:3000/api/dei"

  useEffect(() => {
    // Fetch DEIs when component mounts
    axios.get(url)
      .then(response => {
        setDeis(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const today = new Date();
  const dayNames = ["lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const getDateForOffset = (offset: number) => {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + (offset - 1) + currentWeek * 7); // Adjust offset for current week
    return newDate.getDate();
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const getDeisForDate = (date: number) => {
    return deis.filter(dei => new Date(dei.dueDate).getDate() === date);
  };

  return (
    <div className="bottom mx-auto mt-4 flex flex-col rounded-3xl bg-white p-8 shadow-lg">
      <div className="flex justify-between items-center">
        <button onClick={handlePreviousWeek} className="btn btn-sm">
          Précédent
        </button>
        <h3 className="text-lg">Calendrier</h3>
        <button onClick={handleNextWeek} className="btn btn-sm">
          Suivant
        </button>
      </div>
      <ul className="flex flex-row gap-2 overflow-x-auto">
        {dayNames.map((day, index) => {
          const date = getDateForOffset(index);
          const deisForDate = getDeisForDate(date);
          return (
            <li
              key={index}
              className={`day-body w-44 rounded-2xl bg-[#f0f2fc] ${index === today.getDay() ? 'current-day' : ''}`} // Highlight current day
            >
              <div className="day-header rounded-t-xl bg-light-gray py-1 text-center">
                <h6>{day} {date}</h6>
              </div>
              <div className="day-content h-28">
                {deisForDate.map(dei => (
                  <div key={dei.id}>{dei.name}</div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Calendar;