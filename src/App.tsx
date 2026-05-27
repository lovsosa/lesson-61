import { useEffect, useState } from 'react'
import './App.css'
import { BASE_URL, COUNTRY_LIST } from './consts';

interface Countries {
  alpha3Code: string;
  independent: boolean;
  name: string;
}

const App = () => {
  const [countries, setCountries] = useState<Countries[]>([])

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

  return (
    <div>
      {countries.map(c => (
        <div key={c.alpha3Code}>{c.name}</div>
      ))}
    </div>
  )
}

export default App
