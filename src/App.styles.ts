import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%
    }

    body {
        background:black;
        color:yellow;
        margin:0;
        padding:0;
        display: flex;
        justify-content: center;
        align-items:center;
        height: 100%;

    }

    * {
        box-sizing: border-box
    }

    .App {
        width: 600px;
        margin: 0 auto;
    }

    @media only screen and (max-width: 600px) {
        .App {
            width: 300px ;
        }
    }
    
    
    input, select ,.btn{
        width: 100%;
        margin-bottom: 2rem;
        font-size: 1.4rem;
        padding: 0.3rem;
    }
    .btn{
        color: #f6b93b;
        text-transform: uppercase;
        text-decoration: none;
        background: #ffffff;
        padding: 0.8rem;
        border: 4px solid  #f6b93b;
        display: inline-block;
        transition: all 0.4s ;
        margin-top: 2rem;

    }
    .btn:hover {               
        color: #ffffff;
        background: #f6b93b;
        border-color: #f6b93b;
    }
    .title {
        text-align: center;
        font-size: 2rem;
    }
    p {
        color: #f6b93b;
        text-transform: uppercase;
        background: #ffffff;
        padding: 0.8rem;
        border: 4px solid  #f6b93b;
        margin-top: 2rem;
        text-align:center
    }
    .score {
        background-color:#f6b93b;
        color:black;
    }
    .spinner {
        margin: auto;
    }
`;