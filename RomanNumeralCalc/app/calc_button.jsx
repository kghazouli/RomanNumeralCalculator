const CalcButton = ({value, onButtonClick}) => {
  return(
      <button className="calc_button" onClick={() => onButtonClick(value)}>
       {value}
      </button>
  );
}
                                                                                                                                                                                                                                                                                                   