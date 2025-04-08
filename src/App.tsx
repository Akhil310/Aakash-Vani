import React, { useState, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Data {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const KEY = '526e77d760806dfad30b2f86833087b5';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hist, setHist] = useState<string[]>([]);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }, [mode]);

  const getWeather = async (val: string) => {
    if (!val) return;
    setLoad(true);
    setErr(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${KEY}&units=metric`
      );
      setData(res.data);
      setLoad(false);
      setHist((prev) => [val, ...prev.filter(c => c !== val)].slice(0, 5));
    } catch {
      setErr('City not found or network issue.');
      setData(null);
      setLoad(false);
    }
  };

  const handleSearch = () => getWeather(city);
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-all bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-gray-900 dark:to-black text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-6">🌤️ Aakash Vani</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKey}
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ring-blue-500"
        />
        {'\u00A0\u00A0\u00A0'}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Check Weather
        </button>
        {'\u00A0\u00A0\u00A0'}
        <button
          onClick={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
          className="px-3 py-2 ml-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Toggle {mode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {load && <p className="mt-4 animate-pulse">🌍 Fetching sky vibes...</p>}
      {err && <p className="mt-4 text-red-600">❌ {err}</p>}

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-6 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl w-80 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">📍 {data.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icon"
            className="mx-auto"
          />
          <p className="text-xl">🌡️ {data.main.temp} °C</p>
          <p>{data.weather[0].main}</p>
          <p>💧 {data.main.humidity}%</p>
          <p>💨 {data.wind.speed} km/h</p>
        </motion.div>
      )}

      {hist.length > 0 && (
        <div className="mt-6 w-full max-w-xs">
          <h3 className="text-lg font-semibold mb-2">Recent</h3>
          <div className="flex flex-wrap gap-2">
            {hist.map((item, idx) => (
              <button
                key={idx}
                onClick={() => getWeather(item)}
                className="px-3 py-1 bg-white rounded-lg shadow hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
