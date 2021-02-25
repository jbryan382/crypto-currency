import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {
  const [currencyResponse, setCurrencyResponse] = useState({ rates: [] })
  const [amount, setAmount] = useState(1)

  useEffect(async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/exchange_rates`
    )
    setCurrencyResponse(response.data)
  }, [])

  useEffect(() => {
    console.log(currencyResponse)
  }, [currencyResponse])

  function sanitizeAmount() {
    return amount
  }

  return (
    <>
      <h1> Crypto-Currency-Converter</h1>
      <ul>
        {Object.entries(currencyResponse.rates).map(
          ([currencyCode, currencyDetails]) => {
            return (
              <li key={currencyCode}>
                {currencyDetails.name} ({currencyCode}):
                {(currencyDetails.value * amount).toFixed(2)}
              </li>
            )
          }
        )}
      </ul>
      <input
        type="number"
        onChange={(event) => setAmount(event.target.value)}
        value={sanitizeAmount()}
      />
    </>
  )
}
