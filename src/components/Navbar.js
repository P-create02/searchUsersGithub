import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'

const getLocalStorage = () =>{
  let mood = 'light'
  if(localStorage.getItem('mood')){
    mood = localStorage.getItem('mood')
  }
  return mood
}

const Navbar = () => {
  const {logout, user, isAuthenticated, loginWithRedirect} = useAuth0()
  const isUser = isAuthenticated && user

  const [mood, setMood] = useState(getLocalStorage())
  const changeMood = () =>{
      if(mood === 'light') setMood('dark')
      else setMood('light')
  }
  useEffect(() =>{
    document.documentElement.className = mood
    localStorage.setItem('mood', mood)
  }, [mood])

  return <Wrapper className='main'>
    {isUser && user.picture && <img src={user.picture} alt={user.name} />}
    {isUser && user.name && <h4>Welcome, <strong>{user.name.toUpperCase()}</strong></h4>}

    {isUser ?
      <button onClick={() => {logout({returnTo: window.location.origin})}}><AiOutlineLogout /></button>
      :
      <button onClick={loginWithRedirect}>login</button>
    }

    <button className='mood' onClick={changeMood}>
      {mood === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  </Wrapper>;
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  padding-bottom: 4rem;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  .mood{
    position: absolute;
    top: 4%;
    right: 3%;
    font-size: 2rem;
  }
  .mood:hover{
    color: var(--clr-primary-4)
  }

  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }

  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
