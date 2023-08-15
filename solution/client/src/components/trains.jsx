import React, { useEffect, useState } from 'react'
import {Button, Card, Grid, Loading, Modal} from "@geist-ui/core"
import { apiGetAllTrains } from '../apiInteraction/api';


export default function Trains() {
  const [stTrains, setStTrains] = useState([])
  const [stFilteredTrain, setStFilteredTrain] = useState([])
  const [stClickTrainNo, setStClickTrainNo] = useState()
  const [stOpenModal, setStOpenModal] = useState(false)

  const fnGetData = async () =>{
    const response = await apiGetAllTrains();
    console.log(response);
    setStTrains(response.data)
  } 

  
  const fnSetFilteredTrain = () => {

    const trainNumberToFind = stClickTrainNo;
    const filteredTrain = stTrains.filter(train => train._id == trainNumberToFind);
    console.log(filteredTrain); // This will contain the train object with trainNumber: ""

    setStFilteredTrain(filteredTrain);
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

          
          <Grid lg={8} key={key}>

              <Card width="240px" height="240px"  className="m-2 w-8" key={key} onClick={() => {
 
                setStOpenModal(true);
                // setStClickTrainNo(train._id);
              
                const filteredTrain = stTrains.filter(train => train._id == train._id);
                console.log(filteredTrain);
                setStFilteredTrain(filteredTrain);
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

                <hr width="100px" />
              Seats available
              <div className="">
                AC:
                {/* {train.price.AC} */}
                {train.seatsAvailable.AC}

              </div>

              <div className="">
                sleeper:  

                {/* price: */}

                {/* {train.price.sleeper} */}
                {train.seatsAvailable.sleeper}

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
        <Modal.Title>{ stFilteredTrain && stFilteredTrain[0].trainName } </Modal.Title>
        <Modal.Subtitle> { stFilteredTrain && stFilteredTrain[0].trainNumber } </Modal.Subtitle>
        <Modal.Content>
          <p>Price Details:</p>
          Sleeper
          { stFilteredTrain && stFilteredTrain[0].price.sleeper }   
          <br />
          AC
          { stFilteredTrain && stFilteredTrain[0].price.AC }   

        </Modal.Content>
        {/* <Modal.Action passive onClick={() => setStOpenModal(false)}>Cancel</Modal.Action>
        */}
        <Modal.Action>Book NOW</Modal.Action> 
      </Modal>
    </div>
}
    </>
  )
}
