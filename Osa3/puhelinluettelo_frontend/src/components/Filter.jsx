const Filter = ({filterName, filterChange}) => {
    return (
        <div>
            filter numbers: <input value={filterName} onChange={filterChange}/>
        </div>
    )
}

export default Filter