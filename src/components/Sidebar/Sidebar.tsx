import type { Country } from "../../App"
import './Sidebar.css'

interface Props {
  countries: Country[];
  onSelect: (value: string) => void;
}

const Sidebar = ({ countries, onSelect }: Props) => {
  return (
    <aside className='sidebar'>
      <div className='sidebarHeader'>
        <h2 className='sidebarTitle'>Countries</h2>
      </div>
      <div className='sidebarList'>
        {countries.map(c => (
          <div key={c.alpha3Code} className='sidebarItem' onClick={() => onSelect(c.alpha3Code)}>
            {c.name}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar