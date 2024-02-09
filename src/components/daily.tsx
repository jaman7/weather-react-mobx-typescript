interface IProps {
  date?: string;
  day?: string;
  sunset?: string;
  sunrise?: string;
  icon?: string;
  description?: string | null | undefined;
  tempDay?: number | null | undefined;
  tempMorning?: number | null | undefined;
  tempNight?: number | null | undefined;
  front?: string;
}

const Daily = ({
  date,
  day,
  sunset,
  sunrise,
  icon,
  description,
  tempDay,
  tempMorning,
  tempNight,
  front,
}: IProps) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  return (
    <>
      <div className="item flip">
        <div className={`bg${front}`}>
          <div className="item-column">
            <span>{date}</span>
            <span>{day}</span>

            <div className="item-column">
              <span>Sunset</span>
              <span>{sunset}</span>
              <span>Sunrise</span>
              <span>{sunrise}</span>
            </div>
          </div>

          <div className="item-column">
            <h4 className="description">{description}</h4>
            <img className="img-fluid" src={iconUrl} alt="" />
            <h4>{tempDay}&#176;</h4>
          </div>

          <div className="item-column">
            <h3 className="temp">
              <span>Morning: </span>
              {tempMorning}&#176;
            </h3>
            <h3 className="temp">
              <span>Night: </span>
              {tempNight}&#176;
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Daily;
