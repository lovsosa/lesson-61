import { useEffect, useState } from 'react'
import './App.css'
import { BASE_URL, COUNTRY, COUNTRY_LIST } from './consts';

interface Country {
  alpha3Code: string;
  independent: boolean;
  name: string;
}

interface CountryDetail {
  name: string;
  capital: string;
  population: number;
  flags: string;
  borders: Country[];
}
const App = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCode, setSelectedCode] = useState<string>()
  const [country, setCountry] = useState<CountryDetail>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(BASE_URL + COUNTRY_LIST)

        if (!response.ok) {
          throw new Error('Failed to fetch countries')
        }

        const countriesData: Country[] = await response.json()

        setCountries(countriesData)
      } catch (error) {
        console.error(error);
      }

    }

    getCountries()
  }, [])

  useEffect(() => {
    if (!selectedCode) return
    const getCountry = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL + COUNTRY + selectedCode)

        if (!response.ok) {
          throw new Error('Failed to fetch country')
        }

        const countryData = await response.json()
        const { name, capital, population } = countryData

        const borders = countryData.borders?.map((code: string) => {
          const borderCountry = countries.find(
            (item) => item.alpha3Code === code,
          );

          return borderCountry;
        });

        setCountry(
          {
            name,
            capital,
            population,
            flags: countryData.flags.png,
            borders
          }
        )
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }

    }
    getCountry()
  }, [selectedCode])

  return (
    <div className='layout'>
      <aside className='sidebar'>
        <div className='sidebarHeader'>
          <h2 className='sidebarTitle'>Countries</h2>
        </div>
        <div className='sidebarList'>
          {countries.map(c => (
            <div key={c.alpha3Code} className='sidebarItem' onClick={() => setSelectedCode(c.alpha3Code)}>
              {c.name}
            </div>
          ))}
        </div>
      </aside>
      <main className='main'>
        {loading ? (
          <div className='loader'>
            Загрузка...
          </div>
        ) : country ? (
          <div className='countryCard'>
            <img className='countryFlag' src={country.flags} alt={country.name} />
            <h1 className='countryName'>{country.name}</h1>
            <div className='countryInfo'>
              <p><span>Capital</span>{country.capital}</p>
              <p><span>Population</span>{country.population.toLocaleString()}</p>
            </div>
            {country.borders && country.borders.length > 0 && (
              <div className='countryBorders'>
                <span>Borders</span>
                <div className='borderList'>
                  {country.borders.map(b => (
                    <button key={b.alpha3Code} onClick={() => setSelectedCode(b.alpha3Code)}>
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App
