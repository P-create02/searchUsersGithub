import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import  {DPie, DColumn}  from '../charts/index';

const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item

    if(!language) return total 

    if(!total[language]){
      total[language] = {label: language, value: 1, stars: stargazers_count}
    }
    else{
      total[language] = {...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count}
    }
    return total
  }, {})

  const mostUsed = Object.values(languages).sort((a, b) =>{
    return b.value - a.value
  }).slice(0, 5)

  // Stars
  let {stars} = repos.reduce((total, item) => {
    const { stargazers_count, name } = item
    total.stars[stargazers_count] = {label: name, value: stargazers_count}

    return total
  }, {
    stars: {},
  })
  stars = Object.values(stars).slice(-5).reverse()

  return <section className="section" style={{boxShadow: '0 0 10px #fff', margin: '3rem 0'}}>
    <Wrapper className='section-center'>
      <DPie data={mostUsed} className='ch01'/>
      <DColumn data={stars} className='ch02'/>
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  padding: 2rem 1rem;
  display: grid;
  justify-items: center;
  box-shadow: 0 0 5px #fff;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
