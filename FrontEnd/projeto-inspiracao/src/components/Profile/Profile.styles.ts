import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  width: 50%;
  margin: 5%;
  background-color: transparent;
`;

export const ProfileHeader = styled.h2`
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  img {
    padding-right: 10px;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const Value = styled.span`
  color: #555;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Button = styled.a`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #1E9B9F;
  color: white;
  margin: 10px;
  text-decoration: none;
  img {
    height: 13px;
    width: 13px;
    margin-right: 5px;
    filter: invert(100%);
  }

  &:hover {
    background-color: #14686B;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalOverlay = styled.div`
  display: ${(props: any) => (props = 'false' ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
`;

export const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ActionButton = styled.a`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  img {
    margin-right: 5px;
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;