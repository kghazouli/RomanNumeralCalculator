const CalcDisplay = ({ value, current_value }) => {
  return (
        <div className="display">
            <div className="previous_display" > {value} </div>
            <input className="calc_display" type="text" readOnly value={current_value} />
        </div>
  );
}
                                                                                                                                                                                                                                                                                                                                                             