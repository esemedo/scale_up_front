import React from 'react'

function TimePickerWithRange({time, setTime, disabled}: TimePickerWithRangeProps) {
   
    const handleStartTimeChange = (e: { target: { value: any; }; }) => {
      setTime({...time,from: e.target.value});
    };
    
    const handleEndTimeChange = (e: { target: { value: any; }; }) => {
      setTime({...time,to: e.target.value});
    };
    return (
      <div>
        <label>
          Début :
          <input type="time" disabled={disabled} value={time?.from} onChange={handleStartTimeChange} step={2} />
        </label>
        <label>
          Fin :
          <input type="time" disabled={disabled} value={time?.to} onChange={handleEndTimeChange} step={2} />
        </label>
    
      </div>
    );
}

export default TimePickerWithRange
