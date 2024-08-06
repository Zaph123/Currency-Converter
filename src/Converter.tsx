import { useEffect, useState } from "react"
import loader from './assets/loader.gif'
import { FaCircleExclamation, FaTriangleExclamation, FaAngleRight } from "react-icons/fa6"
import { motion } from "framer-motion"
// import currencyapi from '@everapi/currencyapi-js'

// cur_live_nIlpjZw8P7fXBVbxFw1LmJt8T580e0kXlRqZKg2t

 interface Currency {
  url: string
}

const Converter = (props : Currency) => {
  
  const [error, setError] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)
  const [currencyData, setCurrencyData] = useState<string[]>([])
  const [amount, setAmount] = useState('1')
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [errorAnimation, setErrorAnimation] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownTwo, setShowDropdownTwo] = useState(false)

  useEffect(() => {
    fetchCurrencies()
  }, [])
 
  useEffect(() => {
    // fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_nIlpjZw8P7fXBVbxFw1LmJt8T580e0kXlRqZKg2t')
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
      
      if(errorStatus){
        setTimeout(() =>{
         setError(`Service unavailable, Please check your connection and try again`)
        },8000)
  }
    
  }, [errorStatus])

  const sendRequest = async (url : string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setError('')
      setLoadingAnimation(true)
      errorStatus && setErrorStatus(true)
      const response = await fetch(url)
      if(!response.ok){
        setLoadingAnimation(false)
        setError("Issue may be ranging from wrong params, So Try Again")
        return;
      }
      setErrorStatus(false)
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
    // console.log(data)
    setCurrencyData(Object.keys(data))
    // console.log(currencyData);
    
  }

  const fetchRates = async () => {
    try {
      const data = await sendRequest(`${props.url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    console.log(data)
    setConvertedAmount(data.rates[toCurrency].toFixed(2))
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleOptions = (id : string) => {
     const search = currencyData.filter(c => c === id)
     setFromCurrency(search[0])
     console.log(search)
  }

  const handleOptionsTwo = (id : string) => {
     const search = currencyData.filter(c => c === id)
     setToCurrency(search[0])
     console.log(search)
  }
  
  const handleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleDropdownTwo = () => {
    setShowDropdownTwo(!showDropdownTwo)
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
      rotate: -90
    },
    right: {
      rotate: 0
    }
  }

  return (
    <div className="wrapper">
      <motion.h1 layout style={{color: "#2a2a2a", textAlign: "center"}}>Currency Converter App</motion.h1>
      <motion.p layout className="info">Results are based on the <b>latest</b> Exchange Rates used Globally</motion.p>
          {errorAnimation && <img src={loader} />}
          {error !== '' &&
           <motion.div initial={{scale: 0}} animate={{scale: 1}}>
            <FaTriangleExclamation className="error-triangle"/>
            </motion.div>
        }
        {error !== '' && <h4 className="errMsg"><FaCircleExclamation /><span>{error}</span></h4>}
      {!errorStatus && 
      <motion.div 
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
            <p>Please Wait...</p>
            </div>
            }
            <div className="row-1">
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="row-2">
              <div className="col col-1">
              {/* <label htmlFor="from">
              <select name="from-currency" id="from" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {currencyData.map(c => {
                  return (
                    <option value={c} key={`from_${c}`}>
                      {c}
                    </option>
                  )
                })}
              </select>
              </label> */}
            <div className="select" onClick={handleDropdown}>
            <h4>{fromCurrency}</h4>
            <motion.div
            variants={showAngle}
            initial='right'
            animate={showDropdown ? "up" : "right"}
            >
              <FaAngleRight className="angle-icon"/>
            </motion.div>
            <motion.div
            variants={variants}
            initial='hide'
            animate={showDropdown ? "show" : "hide"}
            className="dropdown"
            >
              {currencyData.map(c => {
                  return (
                    <p key={`to_${c}`} onClick={() => handleOptions(c)}>
                      {c}
                    </p>
                  )
                })}
              </motion.div>
          </div>
              </div>
              <div className="exchange-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z">
                </path></svg>
              </div>
              <div className="col col-2">
              {/* <label htmlFor="to">
              <select name="to-currency" id="to"  value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {currencyData.map(c => {
                  return (
                    <option value={c} key={`to_${c}`}>
                      {c}
                    </option>
                  )
                })}
              </select>
              </label> */}
              <div className="select" onClick={handleDropdownTwo}>
            <h4>{toCurrency}</h4>
            <motion.div
            variants={showAngle}
            initial='right'
            animate={showDropdownTwo ? "up" : "right"}
            >
              <FaAngleRight className="angle-icon"/>
            </motion.div>
            <motion.div
            variants={variants}
            initial='hide'
            animate={showDropdownTwo ? "show" : "hide"}
            className="dropdown"
            >
              {currencyData.map(c => {
                  return (
                    <p key={`to_${c}`} onClick={() => handleOptionsTwo(c)}>
                      {c}
                    </p>
                  )
                })}
              </motion.div>
          </div>
              </div>
            </div>
            <div className="row-3">
            {errorStatus 
            ? <img src={loader} />
            : <h1>{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</h1>
           }
            </div>
          </form>
          
        </div>
      </motion.div>}
    </div>
  )
}

export default Converter
