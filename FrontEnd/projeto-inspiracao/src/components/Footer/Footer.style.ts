import styled from 'styled-components';

export const FooterStyle = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background: rgba(32, 127, 195, 0.7);
  color: #FFFFFF;
  flex-wrap: wrap;
  border-top: 2px double #7A7A7A;
  border-bottom: 2px double #7A7A7A;

  @media only screen and (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 49%;
  border: 1px double #7A7A7A;
  border-radius: 10px;
  padding: 40px;
  font-weight: 100000;
  font-stretch: normal;
  
  h2 {
    margin-bottom: 50px;
  }

  @media only screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const InfoStyle = styled.div`
  width: 49%;
  border: 1px double #7A7A7A;
  border-radius: 10px;
  padding: 30px;
  
  h2 {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 960px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const InputStyle = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
`;

export const TextAreaStyle = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  resize: vertical;
  height: 100px;
`;

export const ButtonStyle = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #FFFFFF;
  color: #2C5EDE;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f1f1f1;
  }
`;

export const LinkStyle = styled.a`
  color: #FFFFFF;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Copyright = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #A4EAEF;
    background-color:#191919;
    height:40px;
    font-weight: 400;
    font-size: 14px;
    
    @media only screen and (max-width: 428px) {
        flex-direction: column;

        span {
            font-size: 12px;
        }
    }     
`;