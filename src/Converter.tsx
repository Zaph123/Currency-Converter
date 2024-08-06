import { useEffect, useState } from "react"
import loader from './assets/loader.gif'
import { FaCircleExclamation, FaArrowsLeftRight} from "react-icons/fa6"
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
    // setTimeout(() => {
      //   setLoadingAnimation(false)
      // }, 8000)
      
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
  
  return (
    <div className="wrapper">
      <motion.h1 layout style={{color: "#2a2a2a", textAlign: "center"}}>Currency Converter App</motion.h1>
          {errorStatus && 
          <>
            <img src={loader} />
          </>
        }
        {error !== '' && <h4 className="errMsg"><FaCircleExclamation />{error}</h4>}
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
            <p className="info">Results are based on the <b>latest</b> exchange rates Globally</p>
            <div className="row-1">
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="row-2">
              <div className="col col-1">
              <label htmlFor="from">
              <select name="from-currency" id="from" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {currencyData.map(c => {
                  return (
                    <option value={c} key={`from_${c}`}>
                      {c}
                    </option>
                  )
                })}
              </select>
              </label>
              </div>
              <div className="exchange-icon">
                <FaArrowsLeftRight />
              </div>
              <div className="col col-2">
              <label htmlFor="to">
              <select name="to-currency" id="to"  value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {currencyData.map(c => {
                  return (
                    <option value={c} key={`to_${c}`}>
                      {c}
                    </option>
                  )
                })}
              </select>
              </label>
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
