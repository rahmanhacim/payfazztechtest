import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';


const TransactionDetailPage = () =>
{
  const params = useParams();
  const [allData, setAllData] = useState([])
  //Filter data to get item id
  const getData = async () =>{
    try{
      await axios.get('bank.json')
      .then(res => {
       const response = res.data.accounts.filter(item => item.id === params.id)
       setAllData(response)
      })
      .catch(err => console.log(err))
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (allData.length === 0) {
    return null
  } 

  return (
    <div className="TransactionDetail">
      <Card>
        {allData.map((item, index) => {
          return (
            <>
              <CardContent key={item.id}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Category : {item.category}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Description : {item.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Debit : {item.debit}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Credit : {item.credit}
                </Typography>
                <CardActions>
                    <Button size="small" href='/'>Back</Button>
                </CardActions>
                </CardContent>
              </>
          )
        })}
      </Card>
      </div>
  )
}

export default TransactionDetailPage;