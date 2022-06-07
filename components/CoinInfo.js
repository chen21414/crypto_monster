import { ThemeProvider, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { Line } from "react-chartjs-2";
import { HistoricalChart } from '../config/api';
import { chartDays } from "../config/data";
import SelectButton from './Banner/SelectButton';

const CoinInfo = ({coin}) => {
const [historicalData, setHistoricalData] = useState()
const [days, setDays] = useState(1);

const {currency} = CryptoState()

const fetchHistoricalData = async () => {
  const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
  //const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30')

  setHistoricalData(data.prices)
}

console.log('coin', coin)
console.log('currency', currency)
console.log('days', days)
console.log('history data', historicalData)

useEffect(()=>{
  fetchHistoricalData();
},[days])

  return (
    <ThemeProvider>
      <div
      // container
      style={{
        width: '75%',
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        padding: 40,
        // [theme.breakpoints.down('md')]: {
        //   width: '100%',
        //   marginTop: 0,
        //   padding: 20,
        //   paddingTop: 0,
        // },
      }}
      >
        {/* chart */}
        {
          !historicalData ? (
            <CircularProgress
              style={{color: 'gold'}}
              size={250}
              thickness={1}
            />
          ) : (
            <>
            <Line
             data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                }
              }
            }}
            />
            <div
              style={{
                display:'flex',
                marginTop:20,
                justifyContent:'space-around',
                width:'100%',
              }}
            >
              {/* buttons */}
              {chartDays.map(day => (
                <SelectButton
                  key={day.value}
                  onClick={()=>setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
            </>
          )
        }
        {/* button */}
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo