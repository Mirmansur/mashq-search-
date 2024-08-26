import { useState, useEffect } from "react";

const fetchCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Posts = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setFilteredCountries(data);
    };

    getCountries();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none shadow-md p-3 rounded-md w-full md:w-1/3 border border-gray-300"
            />
            <select
              name="region"
              className="outline-none p-3 shadow-md rounded-md ml-4 w-full md:w-1/4 border border-gray-300"
            >
              <option value="Filter by Region">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries
              .filter((country) => {
                return search.toLowerCase() === ""
                  ? country
                  : country.name.common.toLowerCase().includes(search);
              })
              .map((country) => (
                <div
                  key={country.cca3}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {country.name.common}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Population: {country.population.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Region: {country.region}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Subregion: {country.subregion}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
