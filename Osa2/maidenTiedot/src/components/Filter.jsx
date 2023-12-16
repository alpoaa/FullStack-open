const Filter = ({filterValue, onFilterChange}) => {
    return (
        <div>
            find countries: <input value={filterValue} onChange={onFilterChange}/>
        </div>
    )
}

export default Filter