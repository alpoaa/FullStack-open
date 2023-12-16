import { useEffect, useState } from 'react'
import service from './services/service'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries]     = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    service
      .getData()
      .then(initialCounties => {
        setCountries(initialCounties)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <Filter filterValue={filterValue} onFilterChange={handleFilterChange} />
      <Countries countries={countries} filterValue={filterValue}/>
    </div>
  )
}

export default App
