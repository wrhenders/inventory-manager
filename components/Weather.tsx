import { useState, useEffect } from "react";

const Weather = ({ lat, lon }) => {
  const [desc, setDesc] = useState("Loading...");
  const [temp, setTemp] = useState("Loading...");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async () => {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );
    const weather = await weatherRes.json();
    try {
      setDesc(weather.weather[0]["description"]);
      setTemp(weather.main.temp);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h3>
        {desc}
        <br />
        {temp}
        {"\u00B0 F"}
      </h3>
    </div>
  );
};

export default Weather;
