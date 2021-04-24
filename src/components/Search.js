import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GithubContext } from '../context/context';

const Search = () => {
  const { request, error, searchGithubUser, loading } = React.useContext(GithubContext)
  const [user, setUser] = React.useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(user){
      searchGithubUser(user)
    }
  } 

  return <section className='section'>
    <Wrapper className='section-center main'>
      {error.show && (
        <ErrorWrapper>
          <p>{error.msg}</p>
        </ErrorWrapper>
      )}
       <p>REQUEST  <progress max='60' value={parseFloat(request)} style={{height: '1.5rem'}}></progress> {request} / 60</p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <MdSearch />
          <input type="text" placeholder='Enter Github User' value={user} onChange={(e) => setUser(e.target.value)}/>
          {request > 0 && !loading && <button className="submit">search</button>}
        </div>
      </form>
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1.75rem 1rem;

  @media (min-width: 768px) {
    grid-template-columns: max-content 1fr;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }

  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;

    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }

    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }

    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }

    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }

  p {
    /* margin-bottom: 0; */
    padding-top: 0.75rem;
    color: var(--clr-grey-5);
    font-weight: 400;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
