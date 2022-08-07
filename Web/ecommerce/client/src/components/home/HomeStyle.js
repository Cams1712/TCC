import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: auto;
    margin-top: 60px !important;
`

export const Title = styled.p`
    font-size: 1.5rem;
    color: #333;
`

export const Desc = styled.p`
    margin-top: .5rem !important;
    font-size: 1rem;
    color: gray;
`

export const Card = styled.div`
    width: 95%;
    height: 100%;
    background-color: red;
    
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`