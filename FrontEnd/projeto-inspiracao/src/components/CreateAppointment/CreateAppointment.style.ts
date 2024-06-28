import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Dropdown = styled.select`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const AppointmentContainer = styled.div`
  padding: 20px;
  width: 100%;
  margin: 5%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
`;

export const Option = styled.option`
  padding: 10px;
  background-color: #fff;
  color: #333;
`;

export const AppointmentDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SelectTime = styled.div`
    margin: 30px;
    width: 50%;
    display: grid;
    gap: 10px;
    margin-bottom: 20px;
    grid-template-columns: repeat(2, max-content);
    justify-content: space-evenly;
    align-items: center;
    align-content: space-evenly;
`;

export const AppointmentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCalendarWrapper = styled.div`
.react-calendar {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px;
  margin: auto;
}
.react-calendar__navigation {
  display: flex
}

.react-calendar__navigation button {
  color: #6b6b6b;
  min-width: 44px;
  background: none;
  font-size: 16px;
  margin-top: 8px;
  font-weight: bold;
}

.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}

.react-calendar__tile {
  max-width: 100%;
  text-align: center;
  padding: 10px;
  background: none;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
}

.react-calendar__tile--now {
  background: #f0f8ff;
  border: 1px solid #76b7f3;
}

.react-calendar__tile--active {
  background: #76b7f3;
  color: white;
}

.react-calendar__tile--active:hover {
  background: #5096e4;
}

.react-calendar__tile--hover {
  background: #e0e0e0;
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__weekdays__weekday abbr {
  text-decoration: none;
}

.react-calendar__navigation button {
  border: none;
}
  
.weekend-available {
  border-radius: 100%;
  background-color: rgba(30, 155, 159, 0.5);
  color: red;
}

.weekend-unavailable {
highlight;
}

.available {
  border-radius: 100%;
  background-color: rgba(30, 155, 159, 0.5);
  color: white;
}

.unavailable {
  color: black;
}

.date-select {
  border-radius: 100%;
  background-color: rgba(32, 127, 195, 0.8);
}
`;

export const RadioGroup = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(30, 155, 159, 0.8);
  border-radius: 5px;
`;

export const RadioButton = styled.label`
  margin: 5px 0;
  font-size: 24px;
  color: white;
  input {
    margin-right: 10px;
  }
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

export const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;