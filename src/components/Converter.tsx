import React, { useEffect, useState } from "react"
import loader from '../assets/loader.gif'
import { FaCircleExclamation, FaTriangleExclamation, } from "react-icons/fa6"
import { motion } from "framer-motion"
import SelectCurrency from "./SelectCurrency"
import atlas from '../assets/img/Atlas.png'
import CurrencyInput from "react-currency-input-field"
// import currencyapi from '@everapi/currencyapi-js'

// cur_live_nIlpjZw8P7fXBVbxFw1LmJt8T580e0kXlRqZKg2t

interface Currency {
  url: string
}

// interface obj {
//   name: string,
//   symbol: string,
//   flag: string
// }


interface currencyDataIndex {
  [key: string]: string
}


const Converter = (props: Currency) => {

  const [error, setError] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)
  // const [currency, setCurrency] = useState<obj[]>([])
  const [currencyData, setCurrencyData] = useState<currencyDataIndex>({ USD: 'USD', EUR: 'EUR' })
  const [currencyName, setCurrencyName] = useState<string[]>([])
  const [amount, setAmount] = useState('1')
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [errorAnimation, setErrorAnimation] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownTwo, setShowDropdownTwo] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredName, setFilteredName] = useState<string[]>([])
  const [showFilteredName, setShowFilteredName] = useState<boolean>(false)

  useEffect(() => {
    fetchCurrencies()
  }, [])

  useEffect(() => {
    // fetch('https://restcountries.eu/rest/v2/all')
    // .then(res => res.json())
    // .then(data => console.log(data))
    //   const client = new currencyapi("cur_live_nIlpjZw8P7fXBVbxFw1LmJt8T580e0kXlRqZKg2t")
    //   client.latest({
    //     base_currency: 'USD',
    //     currencies: 'EUR'
    // }).then(response => {
    //     console.log(response)
    // });
  })

  useEffect(() => {
    fetchRates()
  }, [amount, fromCurrency, toCurrency])


  useEffect(() => {
    setTimeout(() => {
      setErrorAnimation(false)
    }, 8000)

    if (errorStatus) {
      setTimeout(() => {
        setError(`Service unavailable, Please check your internet connection and try again`)
      }, 8000)
    }

  }, [errorStatus])

  const sendRequest = async (url: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setError('')
      setLoadingAnimation(true)
      errorStatus && setErrorStatus(true)
      const response = await fetch(url)
      if (!response.ok) {
        setLoadingAnimation(false)
        setError("Issue may be ranging from wrong params, So Try Again")
        return;
      }
      setErrorStatus(false)
      setErrorAnimation(false)
      setLoadingAnimation(false)
      const data = await response.json()
      return data;

    } catch (error) {
      setErrorStatus(true)
      setErrorAnimation(true)
    }
  }

  const fetchCurrencies = async () => {
    const data = await sendRequest(`${props.url}/currencies`)
    setCurrencyData(data)
    // const keys : obj = {
    //   name: "joshua",
    //   symbol: "aug",
    //   flag: aud
    // }
    // const dataKey = Object.keys(data) as (keyof obj)[]
    // for (let i = 0; i < dataKey.length ; i++){
    //   const key = dataKey[i]
    //   // const myObj : obj {
    //   //   name: 
    //   // }
    //   // console.log(key, keys[key]);

    // }
    // console.log(Object.values(data))
    setCurrencyName(Object.keys(data))
    setFilteredName(currencyName)
    // console.log(currencyName);

  }
  // useEffect(() => {
  //   for(i = 0, i < currencyNa)
  // }, [])

  const fetchRates = async () => {
    try {
      const data = await sendRequest(`${props.url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      console.log(data)
      setConvertedAmount(data.rates[toCurrency].toFixed(2))
    } catch (error) {
      console.log(error)
    }

  }

  const handleDropdown = () => {
    setShowDropdown(!showDropdown)
    setShowDropdownTwo(false)
  }

  const handleDropdownTwo = () => {
    setShowDropdown(false)
    setShowDropdownTwo(!showDropdownTwo)
  }

  const handleOptions = async (id: string) => {
    const search = currencyName.filter(c => c === id)
    setFromCurrency(search[0])
  }

  const handleOptionsTwo = async (id: string) => {
    const search = currencyName.filter(c => c === id)
    setToCurrency(search[0])
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase().trim())
    if (searchQuery === "") {
      setShowFilteredName(false)
    } else {
      setShowFilteredName(true)
    }
    const filter = currencyName.filter(c => c.toLowerCase().includes(searchQuery))
    setFilteredName(filter)
    console.log(filteredName);
    console.log(searchQuery);

  }

  const variants = {
    show: {
      height: "250px"
    },
    hide: {
      height: "0"
    }
  }
  
  const showAngle = {
    up: {
      rotate: 90
    },
    right: {
      rotate: 0
    }
  }


  return (
    <div className="wrapper">
      <div className="bg-img">
        <img src={atlas} alt="atlas" />
      </div>
      <div className="heading">
      <motion.h1 layout className="heading-text" style={{ color: "#2a2a2a", textAlign: "center" }}>Always get the real Exchange Rates around the world</motion.h1>
      <motion.p layout className="info">Results are based on the <b>latest</b> Exchange Rates used Globally</motion.p>
      </div>
         {errorAnimation && <img src={loader} />}
      {errorStatus &&
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{delay: 8}}>
          <FaTriangleExclamation className="error-triangle" />
        </motion.div>
      }
      {error && <h4 className="errMsg"><FaCircleExclamation /><span>{error}</span></h4>}

      {!errorStatus && <motion.div
        className="wrapper-parent"
        initial={{
          opacity: 0,
          y: "50px"
        }}
        animate={{
          opacity: 1,
          y: "0"
        }}
        transition={{
          duration: .5,
          type: "spring",
          ease: "backInOut"
        }}
      >
        <div className="inner">
          <form action="#">
            {loadingAnimation &&
              <div className="loader">
                <img src={loader} />
                <p>Getting Data...</p>
              </div>
            }

            <div className="row-1">
              <SelectCurrency
                currencyName={currencyName}
                handleSearchChange={handleSearchChange}
                showFilteredName={showFilteredName}
                filteredName={filteredName}
                showDropdown={showDropdown}
                handleOptions={handleOptions}
                variants={variants}
                handleDropdown={handleDropdown}
                Currency={fromCurrency}
                currencyData={currencyData}
                showAngle={showAngle}
              >
                <p className="currencyChange from">From</p>
              </ SelectCurrency>
              <div className="exchange-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z">
                  </path></svg>
              </div>
              <SelectCurrency
                currencyName={currencyName}
                handleSearchChange={handleSearchChange}
                showFilteredName={showFilteredName}
                filteredName={filteredName}
                showDropdown={showDropdownTwo}
                handleOptions={handleOptionsTwo}
                variants={variants}
                handleDropdown={handleDropdownTwo}
                Currency={toCurrency}
                currencyData={currencyData}
                showAngle={showAngle}
              >
                <p className="currencyChange to">To</p>
              </ SelectCurrency>
            </div>

            <div className="row-2">
              <CurrencyInput
                value={amount}
                onValueChange={(amount) => setAmount(amount ?? '')}
                intlConfig={{ locale: "en-US", currency: fromCurrency }}
                allowDecimals={true}
                allowNegativeValue={false}
              />
            </div>

            <div className="row-3">
              {errorStatus
                ? <img src={loader} />
                : <h1>{`${amount} ${fromCurrency}  =  ${convertedAmount} ${toCurrency}`}</h1>
              }
            </div>
          </form>

        </div>
      </motion.div>}
      <footer>
        <p>Powered by Einstein Technologies</p>
      </footer>
    </div>
  )
}

export default Converter
