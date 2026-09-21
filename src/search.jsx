import { useState } from "react";

const products = [
    { id: 1, name: "iPhone", category: "mobile" },
    { id: 2, name: "MacBook", category: "laptop" },
    { id: 3, name: "Samsung", category: "mobile" },
    { id: 4, name: "Dell", category: "laptop" }
  ];


const Search = () => {
    const [value, setValue] = useState([]);

    const filterValue = products.filter((data) => {
        return data.category.toLowerCase().includes(value)
    })
    console.log("filterValue", filterValue)
    return (
        <>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <br /><br />
            {filterValue.length > 0 ?
            filterValue.map((data) => {
                return (
                    `${data.name}`
                )
            })
        : <p>No user found</p>}
        </>
    )
}

export default Search