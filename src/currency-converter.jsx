import { useEffect, useState } from "react";

const CurrenyConverter = () => {
    const [currencyData, setCurrencyData] = useState(null);
    const [query, setQuery] = useState({
        amount: 1,
        from: 'USD',
        to: 'INR'
    });
    const { amount, from, to } = query;
    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${from}&to${to}`);
            const data = await response.json();
            console.log("currency data", data);
            setCurrencyData(data);
        }
        fetchApi();
    }, [amount, from, to]);

    console.log("currency data", currencyData);
    const currencies = currencyData
        ? [currencyData.base, ...Object.keys(currencyData.rates)]
        : [];

    return (
        <div>
            <h1>Currency Converter</h1>
            <p>This is a simple currency converter component.</p>
            <select value={from} onChange={(e) => setQuery({ ...query, from: e.target.value })}>
                {currencies.map((currency) => {
                    return (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    )
                })}
            </select>
            &nbsp; to &nbsp;
            <select value={to} onChange={(e) => setQuery({ ...query, to: e.target.value })}>
                {currencies.map((currency) => {
                    return (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    )
                })}
            </select>
            {currencyData && (
                <p>
                    {amount} {from} = {currencyData.rates[to]} {to}
                </p>
            )}
        </div>
    );
};

export default CurrenyConverter;