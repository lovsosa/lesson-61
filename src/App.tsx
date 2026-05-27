import { useEffect, useState } from 'react'
import './App.css'
import { BASE_URL, COUNTRY, COUNTRY_LIST } from './consts';
import Sidebar from './components/Sidebar/Sidebar';
import AboutCountry from './components/AboutCountry/AboutCountry';

export interface Country {
  alpha3Code: string;
  independent: boolean;
  name: string;
}

export interface CountryDetail {
  name: string;
  capital: string;
  population: number;
  flags?: string;
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

  const chooseCountry = (alfaCode: string) => {
    setSelectedCode(alfaCode)
  }

  return (
    <div className='container'>
      <Sidebar countries={countries} onSelect={chooseCountry} />
      <AboutCountry loading={loading} country={country} onSelect={chooseCountry} />
    </div>
  )
}

export default App
