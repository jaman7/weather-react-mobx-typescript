interface IProps {
  temp?: number;
  month?: string;
  day?: string;
  hour?: string;
  icon?: string;
}

const Forecast = ({ temp, month, day, hour, icon }: IProps) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <>
      <div className="item">
        <div className="item-column">
          <span>
            {month}.{day}
          </span>
          <span>{hour}:00</span>
        </div>
        <img className="img-fluid" src={iconUrl} alt="" />
        <h4>{temp}&#176;</h4>
      </div>
    </>
  );
};

export default Forecast;
