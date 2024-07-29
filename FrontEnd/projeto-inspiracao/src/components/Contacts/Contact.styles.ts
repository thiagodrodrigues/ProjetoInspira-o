import styled from 'styled-components';

export const ScheduleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 30%;
`;

export const ScheduleItemValue = styled.span`
  flex: 1;
  text-align: center;
  padding: 5px;
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  margin-top: 20px;
  color: #1E9B9F;
`;

export const ScheduleList = styled.ul`
  list-style: none;
`;

export const ScheduleCard = styled.li`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

export const ScheduleCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const ScheduleItemLabel = styled.span`
  font-weight: bold;
`;

export const DetailsButtonPast = styled.a`
  background-color: rgba(32, 127, 195);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DetailsButtonFuture = styled.button`
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

export const ModalOverlay = styled.div`
  display: ${(props: any) => (props = 'false' ? 'block' : 'none')};
  position: fixed;
  z-index: 3;
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

export const Button = styled.a`
  padding: 15px;
  font-size: 1.1rem;
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