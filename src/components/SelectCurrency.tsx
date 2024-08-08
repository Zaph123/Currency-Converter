import { motion } from "framer-motion"
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6"
import React, {ReactNode} from "react"

interface ShowAngle {
  [key: string]: {rotate: number}
}

interface Variants {
  [key: string]: {height: string}
}

interface currencyDataIndex {
  [key: string]: string
}

interface Props {
    handleDropdown: React.MouseEventHandler<HTMLDivElement>,
    Currency: string,
    currencyData: currencyDataIndex,
    showAngle: ShowAngle,
    showDropdown: boolean,
    variants: Variants,
    currencyName: string[],
    handleOptions: (id: string) => void,
    showFilteredName: boolean,
    filteredName: string[],
    children: ReactNode,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  
   const SelectCurrency= ({children, handleDropdown, handleOptions, showFilteredName, filteredName, Currency, handleSearchChange, currencyData, showAngle, showDropdown, variants, currencyName} : Props) => {
      return (
        <div className="col col-2">
          {children}
              <div className="select-box" onClick={handleDropdown}>
               <div className="text">
                  <h4>{Currency}</h4>
                  <span>{currencyData[Currency]}</span>
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
              className="dropdown"
              >
                <div className="search-box" onClick={e => e.stopPropagation()}>
                  <FaMagnifyingGlass style={{color: "#292929"}}/>
                  <input type="text" placeholder="Search Currency..." onChange={handleSearchChange}/>
                </div>
                {showFilteredName ? (filteredName.map(c => {
                    return (
                      <p key={`from_${c}`} onClick={() => handleOptions(c)}>
                        {c}
                      </p>
                    )
                  })) : (currencyName.map(c => {
                    return (
                      <p key={`from_${c}`} onClick={() => handleOptions(c)}>
                        {c}
                      </p>
                    )
                  }))}
                </motion.div>
            </div>
                </div>
      )
   }
  
   export default SelectCurrency;