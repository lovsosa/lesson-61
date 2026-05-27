import type { CountryDetail } from "../../App";

interface Props {
  loading: boolean;
  country?: CountryDetail;
  onSelect: (value: string) => void;
}

const AboutCountry = ({ loading, country, onSelect }: Props) => {
  return (
    <main className='main'>
      {loading ? (
        <div className='loader'>
          Загрузка...
        </div>
      ) : country ? (
        <div className='countryCard'>
          {country.flags ? <img className='countryFlag' src={country.flags} alt={country.name} /> : null}
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
                  <button key={b.alpha3Code} onClick={() => onSelect(b.alpha3Code)}>
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </main>
  )
}

export default AboutCountry