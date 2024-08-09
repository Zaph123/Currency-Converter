import { motion } from "framer-motion"
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6"
import React, {ReactNode} from "react"

interface ShowAngle {
  [key: string]: {rotate: number}
}

interface Variants {
  [key: string]: {opacity: number, y: string}
}

interface CountryCurrency {
  [key: string]: {
    country: string;
  currency: string;
  }
}


interface Props {
    handleDropdown: React.MouseEventHandler<HTMLDivElement>,
    currencyName: string,
    currencyData: CountryCurrency[],
    showAngle: ShowAngle,
    showDropdown: boolean,
    variants: Variants,
    handleOptions: (id: string) => void,
    showFilteredName: boolean,
    filteredName: CountryCurrency[],
    children: ReactNode,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  
   const SelectCurrency= ({children, handleDropdown, handleOptions, showFilteredName, filteredName, currencyName, handleSearchChange, currencyData, showAngle, showDropdown, variants} : Props) => {
      
    return (
        <div className="col col-2">
          {/* {menu.map((c) => {
            const keys = Object.keys(c)[0]
            return (
              <div>{c[keys].name}</div>
            )
          })} */}
          {children}
              <div className="select-box" onClick={handleDropdown}>
               <div className="text">
                  <h4>{currencyName}</h4>
                  <span>{currencyData.map(c => {
                    return c[currencyName]?.country
                  })}</span>
                  {/* <span>{currencyName}</span> */}
               </div>
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
              transition={{
                duration: .5,
                type: "spring",
                ease: "backInOut"
              }}
              className="dropdown"
              >
                <div className="search-box" onClick={e => e.stopPropagation()}>
                  <FaMagnifyingGlass style={{color: "#292929"}}/>
                  <input type="text" placeholder="Search Currency..." onChange={handleSearchChange}/>
                </div>
                {showFilteredName ? (filteredName.map(c => {
                   const keys = Object.keys(c)[0]
                    return (
                      <p key={`from_${c[currencyName]?.currency}`} onClick={() => handleOptions(c[currencyName].currency)}>
                        <span>{c[keys]?.country}</span>
                        <span>{c[keys]?.currency}</span>
                      </p>
                    )
                  })) : (currencyData.map((c) => {
                    const keys = Object.keys(c)[0]
                    return (
                      <p key={`from_${c[keys]?.currency}`} onClick={() => handleOptions(c[keys]?.currency)}>
                        <span>{c[keys]?.country}</span>
                        <span>{c[keys]?.currency}</span>
                      </p>
                    )
                  }))}
                </motion.div>
            </div>
                </div>
      )
   }
  
   export default SelectCurrency;