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
    {/* <div onClick={fnGetData}> Refresh</div> */}
    {!stTrains && <Loading/>}

    <Grid.Container gap={2} justify="center"  height="256px">

      {stTrains && 
      stTrains.map((train, key)=>{ 
        
        return( 

          
          <Grid lg={8} key={key}>

              <Card width="240px" height="240px"  className="m-2 w-8 cursor-pointer" key={key} onClick={() => {
 
                setStOpenModal(true);
                // setStClickTrainNo(train._id);
              
                const filteredTrain = stTrains.filter(train => train._id == train._id);
                console.log(filteredTrain);
                setStFilteredTrain(filteredTrain);
              }
               }> 
              <h3 className='p-2 text-lg'>
                {train.trainName}
              </h3> 
              <h4 className='px-2 pb-4 font-semibold  '>
                {train.trainNumber} 
              </h4> 
              <div className="px-2">
                <div className="">
                Departure: {`${train.departureTime.Hours} : ${train.departureTime.Minutes}`}
                
                </div>

                <div className="text-red-400"> Delay: {train.delayedBy} Minutes </div>
              </div>

              <hr  className="px-2 mt-4 mb-4  mb-2 " width="200px" />
              
              <div className="px-2 mb-2"> Seats available </div>
              <div className="px-2 mt-1 flex flex-row justify-between">

              <div className="text-blue-500"> AC: {train.seatsAvailable.AC}</div>

              <div className="text-blue-500"> Sleeper: {train.seatsAvailable.sleeper}

              </div>
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
          <p className='m-2'>Price Details:</p>
          <div className=" flex flex-row justify-around ">

          <div className="rounded-md p-2 flex flex-row align-middle justify-center border border-slate-200 cursor-pointer w-32 hover:border-blue-500">
              <div className="">
                Sleeper
              </div>
              <div className="mx-1">
              ₹ { stFilteredTrain && stFilteredTrain[0].price.sleeper }   
              </div>
          </div>


          <div className="rounded-md p-2 flex flex-row align-middle justify-center border border-slate-200 cursor-pointer w-32 hover:border-blue-500"> 
              <div className="">
                AC
              </div>
              <div className="mx-1">
              ₹ { stFilteredTrain && stFilteredTrain[0].price.AC }   
              </div>
          </div>




          </div>
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
