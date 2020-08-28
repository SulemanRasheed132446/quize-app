import styled from 'styled-components';

type ButtonWrapperProps = {
    correct: boolean,
    userClicked: boolean
}



export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s;

    :hover {
        opacity: 0.5;
    }

    button {
        color: white;
        text-transform: uppercase;
        text-decoration: none;
        background:${({ correct, userClicked }) =>
        correct
            ? 'green'
            : !correct && userClicked
                ? 'red'
                : 'orange'

    };
        padding: 0.8rem;
        border: 4px solid  #f6b93b;
        display: inline-block;
        transition: all 0.4s;
        cursor: pointer;
        width: 100%;
        margin-top: 0.5rem;
        
    }


`;