import { useEffect, useState } from "react";
// https://hacker-news.firebaseio.com/v0/item/${id}.json

// https://hacker-news.firebaseio.com/v0/jobstories.json
const Users = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');

            const response = await apiUrl.json();

            const id = await Promise.all(response.map((data) => fetch(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)))
            const finalResponse = await Promise.all(id.map((data) => data.json()))
            console.log("finalResponse", finalResponse)
            setData(finalResponse)

        }
        fetchData();
    }, [])

    console.log("data", data)
    return (

        <div>
            {data?.map((d) => {
                return (
                    <div key={d.id}>
                        <div> {d.name} </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Users;