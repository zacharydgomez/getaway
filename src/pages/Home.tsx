import MusicBar from '../components/MusicBar';
import NavBar from '../components/NavBar';
import React from 'react';
import { useEffect, useContext, useState } from 'react';
import CheckIn from '../components/CheckIn/CheckIn';
import HabitHome from  '../components/Habits/HabitHome'
import AffirmationHome from '../components/Affirmations/AffirmationHome'
import { UserContext, UserContextType } from '../App';
import SavedPaintings from '../components/SavedPaintings'
import axios from 'axios';
import  Button from '@mui/material/Button';
import HomePartOne from "../components/HomePartOne"
import HomePartTwo from "../components/HomePartTwo"
import { Link } from 'react-router-dom';



   interface home {
  id: number;
  habit_type: string;
  habit_name: string;
  habit_createdAt: string;
  entryId: number;
}

const Home = () => {
  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;

   const [habits, setHabits] = useState<home[]>([]);
   const [favoriteAffirmations, setFavoriteAffirmations] = useState<home[]>([]);

     useEffect(() => {
    if (userId) {
      axios
        .post('habits/list', { data: { googleId: userId.toString() } })
        .then((response) => setHabits(response.data))
        .catch((error) => console.error(error));

        axios
        .get(`/affirmations/retrieve-favorites/${userId}`)
        .then(({ data }) => {
          if (data && data.length > 0) { // check if data is not empty
            setFavoriteAffirmations(data);
            console.log(data, 'here');
          }
        })
        .catch((error) => console.error(error, 'nooo'));
    }
  }, [userId]);

console.log(favoriteAffirmations, "fav")
  return (
    <div>

<div >
<HomePartOne/>
</div>
{/* drip stuff */}
<div style={{ position: "relative" }}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/XZrWOiI.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "300px",
  }}>
  </div>

    <HomePartTwo  />
  </div>

{/* drip stuff */}
    <div style={{ textAlign: 'center',position: "relative" }}>
    <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/JVchQzl.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "0%",
    left: 0,
    width: "100%",
    height: "300px"
  }}>
  </div>
  <CheckIn />
  {/* drip stuff */}
<div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/OWafM6W.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "300px",
  }}>
    </div>
    </div>

      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.30em',
        background: "linear-gradient(45deg, #FFC7B0 0%, #FFC7B0 80%, #FF8974 100%)"
      }}
      id="affirmations"
    >

      {/* replace all this with the actual functionality when the time comes */}
      <h1 style={{fontSize:"100px", color:"white", padding:"150px", textShadow: "2px 2px 4px #000000"}}
      >AFFIRMATIONS</h1>
      <div style={{ display: "flex", justifyContent: "space-between", margin:"100px"}}>
  <img
    src="https://i.imgur.com/W3eeJwE.png"
    style={{ marginTop: "-90px" }}
  />
  <img src="https://i.imgur.com/W3eeJwE.png" />
  <img
    src="https://i.imgur.com/W3eeJwE.png"
    style={{ marginTop: "-90px" }}
  />
</div>





      <div style={{padding:"80px"}}>
        <Link to="/affirmations">
      <button>More</button>
      </Link>
      <div style={{
      margin:'60px auto',
      color: 'white',
      backgroundColor:'#FC6E47',
      width: '70%',
      height: '300px',
      textAlign:'center',
      marginBottom:'400px',
      padding:'20px',
      fontWeight:"bolder",
    }}>
      <div style={{padding:"10px"}}>
        {
    favoriteAffirmations.slice(favoriteAffirmations.length - 1).map((favorite: any) => (
      <AffirmationHome key={favorite.user_id} entryId={favorite.id} title={favorite.title} affirmations={favorite.affirmationList.split('/n')} />
    ))
  }
</div>

      </div>
      {/* <h3>Affirmations</h3> */}



      </div>
      </div>
      <div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/3FYNuGE.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "300px",
  }}>
    </div>
    </div>
      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.5em',
        backgroundColor:"#77E0D7",
        padding:"100px"
      }}
      id="habits"
    >
      {/* replace all this with the actual functionality when the time comes */}
      <h2 style={{marginTop:"200px",fontSize:"80px", color:"white", textShadow: "2px 2px 4px #000000"}}>FORM NEW HABITS</h2>
      <div style={{

      borderRadius:'40px',
      margin:'60px auto',
      color: '#6BB76A',
      backgroundColor:'#6BB76A',
      width: '70%',
      minHeight: '250px',
      textAlign:'center',
      marginBottom:'250px',
      padding:'30px'
    }}>
      <h3>HABIT CHARTS</h3>
       <div  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {habits.slice(0, 4).map((habit) => (
        <HabitHome key={habit.id}
          habit_name={habit.habit_name}
           habit_type={habit.habit_type}
           habit_createdAt={habit.habit_createdAt}
           id={habit.id}
           />
      ))}
      </div>
      {/* <HabitCreate></HabitCreate> */}
      </div>
      </div>
      <div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/QjJW1du.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "300px",
  }}>
    </div>

  </div>
<div style={{backgroundColor:"#009CAD", padding:"100px"}}>
<h2 style={{marginTop:"200px",fontSize:"80px", color:"white", textShadow: "2px 2px 4px #000000"}}>YOUR MASTERPIECE</h2>
      <SavedPaintings/>

</div>
    </div>
    <div

    style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#5C6B9E',
      backgroundColor:'#5C6B9E',

      width: '70%',
      height: '7px',
      textAlign:'center',
      marginBottom: '100px'
    }}
  >bottom shit </div>
    </div>
  );
};

export default Home;
