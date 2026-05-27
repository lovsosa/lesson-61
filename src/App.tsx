import { useEffect, useState } from 'react'
import './App.css'
import { BASE_URL, COUNTRY, COUNTRY_LIST } from './consts';

interface Countries {
  alpha3Code: string;
  independent: boolean;
  name: string;
}

interface Country {
  name: string;
  capital: string;
  population: number;
  flags: string;
  borders?: string[];
}
const App = () => {
  const [countries, setCountries] = useState<Countries[]>([])
  const [correctCountry, setCorrectCountry] = useState<string>()
  const [country, setCountry] = useState<Country>()

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(BASE_URL + COUNTRY_LIST)

        if (!response.ok) {
          throw new Error('Failed to fetch countries')
        }

        const countriesData: Countries[] = await response.json()

        setCountries(countriesData)
      } catch (error) {
        console.error(error);
      }

    }

    getCountries()
  }, [])

  useEffect(() => {
    if (!correctCountry) return
    const getCountry = async () => {
      try {
        const response = await fetch(BASE_URL + COUNTRY + correctCountry)

        if (!response.ok) {
          throw new Error('Failed to fetch country')
        }

        const countryData = await response.json()
        const { name, capital, population } = countryData

        const borders = countryData.borders?.map((code: string) => {
          const borderCountry = countries.find(
            (item) => item.alpha3Code === code,
          );

          return borderCountry?.name;
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
      }

    }
    getCountry()
  }, [correctCountry, countries])

  return (
    <div className='layout'>
      <aside className='sidebar'>
        <div className='sidebarHeader'>
          <h2 className='sidebarTitle'>Countries</h2>
        </div>
        <div className='sidebarList'>
          {countries.map(c => (
            <div key={c.alpha3Code} className='sidebarItem' onClick={() => setCorrectCountry(c.alpha3Code)}>
              {c.name}
            </div>
          ))}
        </div>
      </aside>
      <main className='main'>
        <h2>{country?.name}</h2>
      </main>
    </div>
  )
}

export default App
