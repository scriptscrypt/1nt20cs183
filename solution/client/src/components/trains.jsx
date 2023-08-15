import React, { useEffect, useState } from 'react'
import {Card, Loading} from "@geist-ui/core"
import { apiGetAllTrains } from '../apiInteraction/api';


export default function Trains() {
  const [stTrains, setStTrains] = useState([])

  const fnGetData = async () =>{
    const response = await apiGetAllTrains();
    console.log(response);
    setStTrains(response.data)
  } 
  
  useEffect(() =>{
    fnGetData();
  }, [])
  
  return (
    <>
    <div className="">
    <div onClick={fnGetData}> Refresh</div>
    {!stTrains && <Loading/>}

      {stTrains && 
      stTrains.map((train, key)=>{ 

        return(

          <Card key={key}>
           <p>
            {train.trainNumber}
           </p> 
           <p>
            {train.trainName}
           </p> 

          </Card>
          )
        })
      }
      </div>
    </>
  )
}
