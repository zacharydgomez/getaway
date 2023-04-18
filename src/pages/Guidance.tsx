import { useState, useEffect} from "react"
import axios from "axios";
import TherapistList from "../components/TherapistList"

const Guidance = () =>{

  const [userLat, setLat] = useState(0);
  const [userLong, setLong] = useState(0);
  const [pagetoken, setpagetoken] = useState(null);
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    //function get the user lat and long
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setLat(latitude);
      setLong(longitude);
      setGeolocationLoaded(true);
    });
  }, [])

  useEffect(() => {
    //if lat and long has been loaded run get request
    if (geolocationLoaded) {
      getAllTherapists()
    }
  }, [geolocationLoaded, userLat, userLong])


const getAllTherapists = ()=>{
  axios.get('/therapist/search', {
    params:{
      lat: userLat,
      long: userLong
    }
  })
  .then((response)=>{
    setTherapists(response.data.results)
    setpagetoken(response.data.next_page_token)
  })
  .catch((err)=>{
    console.error(err, "could not get therpaists clientside")
  })
}

const getNextTwenty = () =>{
  axios.get('/therapist/next20', {
    params: {
      pagetoken: pagetoken
    }
  })
  .then((response)=>{
    setpagetoken(response.data.next_page_token)
    setTherapists(response.data.results)

  })
  .catch((err)=>{
    console.error('failed to get next twenty search results', err)
  })
}

console.log('hi',therapists)

  return (
    <div>
    <h1>Guidance</h1>
    <button onClick={getNextTwenty}>Next20</button>
    <TherapistList therapists={therapists}/>
    </div>
  )
  }

  export default Guidance;