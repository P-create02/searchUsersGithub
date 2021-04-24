import React, { useState, useEffect } from 'react';
import mainUser from './mainData/mainUser';
import mainRepos from './mainData/mainRepos';
import mainFollowers from './mainData/mainFollowers';
import axios from 'axios';
const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()


const GithubProvider = ({children}) =>{
    const [githubUser, setGithubUser] = useState(mainUser)
    const [repos, setRepos] = useState(mainRepos)
    const [followers, setFollowers] = useState(mainFollowers)

    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(0)

    const [error, setError] = useState({show: false, msg: ''})

    const searchGithubUser = async(user) =>{
        toggleError()
        setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
        console.log(response);

        if(response){
            setGithubUser(response.data)
            const { login, followers_url } = response.data

            axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            .then(response => 
                setRepos(response.data)
            )

            axios(`${followers_url}?per_page=100`)
            .then(response => 
                setFollowers(response.data)
            )
        }
        else{
            toggleError(true, 'there is no user with this username')
        }
        
        checkRequests()
        setLoading(false)
    }

    const checkRequests = () =>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) => {
            // console.log(data);
            let { rate: {remaining} } = data
            setRequest(remaining)

            if(remaining === 0){
                toggleError(true, 'sorry, you dont have rate :(')
            }
        })
        .catch((err) => console.log(err))
    }

    function toggleError(show = false, msg = ''){
        setError({show, msg})
    }
    //error
    useEffect(checkRequests, [])

    return <GithubContext.Provider value={{githubUser, repos, followers, request, error, searchGithubUser, loading}}>{children}</GithubContext.Provider>
}


export{GithubProvider, GithubContext}