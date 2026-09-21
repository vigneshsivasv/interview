import { useEffect, useState } from "react";
import styled from "styled-components";
import useDebouncer from "./useDebouncer";


const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Tr = styled.tr`
  padding: 8px 12px;
`;

const Td = styled.td`
  border: 1px solid red;
  padding: 8px;
`;

const Loader = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 20px;
`;

const Input = styled.input`
    border: 1px solid #999;
    padding: 9px 12px;
    width: 90%;
    border-radius: 8px;
    background: #eee;
    margin: 12px;
`

const App = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { debounceValue } = useDebouncer(value, 1000);

    const limit = debounceValue ? 0 : 10;
    const totalPage = limit > 0 ? Math.ceil(100 / limit) : 0;

    const SearchValue = data.filter((values) => values?.firstName?.toLowerCase()?.includes(debounceValue?.toLowerCase()));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const skip = (page - 1) * limit;
                const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
                const value = await response.json();
                setData(value.users);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page, debounceValue, limit])


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    // setDebounceValue(value);
    //     }, 1000)
    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [value])


    return (
        <>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            {loading ? <Loader>Loading data...</Loader> :
                <Table>
                    <thead>
                        <Tr style={{ background: '#fee' }}>
                            {data.length > 0 &&
                                Object.keys(data[0]).map((d) => (
                                    <Td key={d}>{d}</Td>
                                ))}
                        </Tr>
                    </thead>

                    <tbody>
                        {SearchValue.map((u) => (
                            <Tr key={u.id}>
                                {Object.keys(u).map((key) => (
                                    <Td key={key}>
                                        {typeof u[key] === "object"
                                            ? JSON.stringify(u[key])
                                            : u[key]}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            }
            <Pagination>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >Prev
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPage(index + 1)}
                        style={{
                            background: page === index + 1 ? "blue" : "white",
                            color: page === index + 1 ? "white" : "black",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={page === totalPage}
                    onClick={() => setPage((prev) => prev + 1)}
                >Next
                </button>
            </Pagination>

        </>
    )
}

export default App;
