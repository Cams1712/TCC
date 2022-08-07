import styled, { createGlobalStyle } from 'styled-components'

export const CreateGlobalStyle = createGlobalStyle`
    * {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important; 
    }

    body {
        background: rgb(247, 247, 247);
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: black;
    }
`

export const Menu = styled.div`
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 5% !important;
    background-color: rgb(247, 247, 247);
`

export const Logo = styled.p`
    font-size: 1.5rem;
    font-family: 'Quicksand', sans-serif !important;
`

export const Responsivo = styled.div`
    width: 100vw;
    height: 40vh;
    position: fixed;
    z-index: 10000 !important;
    left: 0;
    top: 60px;
    background: black;
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        padding: 0 5% !important;
    }
`