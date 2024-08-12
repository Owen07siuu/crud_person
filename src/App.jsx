import { useState } from 'react'
import './App.css'
import { People } from './components/People';

function App() {

  const [persons, SetPersons] = useState([
    {
        id: 1,
        name: "Carolina",
        role:"Frontend Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    },
    {
        id: 2,
        name: "Carlos",
        role:"Backend Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar1.png"
    },
    {
        id: 3,
        name: "Pedro",
        role:"Fullstack Developer",
        img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    }
]);
  return (
    <div className='container'>
      <div className='container'>
      <People
     persons={persons}
     setPersons={SetPersons}
      />
      </div>
    </div>
  )
}

export default App
