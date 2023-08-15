import React, { useEffect, useState } from 'react'
import {Button, Card, Grid, Loading, Modal} from "@geist-ui/core"
import { apiGetAllTrains } from '../apiInteraction/api';


export default function Trains() {
  const [stTrains, setStTrains] = useState([])
  const [stClickTrainNo, setStClickTrainNo] = useState()
  const [stOpenModal, setStOpenModal] = useState(false)

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
    <div className="m-1" >
    <div onClick={fnGetData}> Refresh</div>
    {!stTrains && <Loading/>}

    <Grid.Container gap={2} justify="center"  height="256px">

      {stTrains && 
      stTrains.map((train, key)=>{ 
        
        return( 

          
          <Grid lg={8} >

              <Card width="240px" height="240px"  className="m-2 w-8" key={key} onClick={() => {
 
                setStOpenModal(true)
                setStClickTrainNo(train.trainNumber)
              }
               }>
              <h3>
                {train.trainName}
              </h3> 
              <h4>
                {train.trainNumber} 
              </h4> 
              <div className="">
              Departure:{
               `${train.departureTime.Hours} : ${train.departureTime.Minutes}}`
              }
              
              </div>

              <div className="">
                Delayed By: 
                {train.delayedBy} Minutes
                {/* {train.delayedBy} */}
              </div>

              </Card>
           </Grid>
          )
        })
      }

    </Grid.Container>



      </div>

      {stOpenModal &&

      <div>
      {/* <Button auto onClick={()=> setStOpenModal(true) }>Show Modal</Button> */}
      <Modal visible={stOpenModal} onClose={() => setStOpenModal(false)}>
        <Modal.Title>{ stTrains && stTrains[0].trainName } </Modal.Title>
        <Modal.Subtitle> { stTrains && stTrains[0].trainNumber } </Modal.Subtitle>
        <Modal.Content>
          <p>Train Details:</p>
          

        </Modal.Content>
        {/* <Modal.Action passive onClick={() => setStOpenModal(false)}>Cancel</Modal.Action>
        <Modal.Action>Submit</Modal.Action> */}
      </Modal>
    </div>
}
    </>
  )
}
