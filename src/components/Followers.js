import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';

const Followers = () => {
  const {followers} = React.useContext(GithubContext)
  // console.log(followers);

  if(followers.length === 0){
    return <Wrapper>
      <div className="followers">
        <h2>Our friend dont have any followes</h2>
      </div>
    </Wrapper>
  }

  return <Wrapper>
    <div className="followers">
      {followers.map((follower, index) =>{
        const {avatar_url : img, html_url, login} = follower

        return <article key={index}>
          <img src={img} alt={login}/>
          <div>
            <h4>{login}</h4>
            <a href={html_url} target='_blank'>{html_url}</a>
          </div>
        </article>
      })}
    </div>
  </Wrapper>;
};

const Wrapper = styled.article`
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  box-shadow: 5px 5px 5px #fff;

  &::before {
    content: 'FOLLOWERS';
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, -100%);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
    box-shadow: -5px -5px 5px #fff;
  }

  .followers {
    overflow-y: scroll;
    height: 360px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
    h2{
      font-size: 1rem;
      text-align: center;
      padding-top: 2rem;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #888; 
      border-radius: var(--radius);
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
    ::-webkit-scrollbar-thumb {
      background: #282c35; 
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;
