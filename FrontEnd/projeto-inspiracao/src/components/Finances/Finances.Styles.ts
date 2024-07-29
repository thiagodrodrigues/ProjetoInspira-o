import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Dropdown = styled.select`
  width: 20%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: darkgray;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

export const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const CashContainer = styled.div`
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

export const CashDetails = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CashDetail = styled.div`
  display: flex;
  justify-content: space-start;
  align-items: center;
`;

export const PageDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  flex-direction: row-reverse;
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

export const ModalOverlay = styled.div`
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

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonTransaction = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1E9B9F;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export const FiltersContainer = styled.div`
  display: inline-row;
  margin: 20px 0;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px;
  width: 20%;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: darkgray;
  margin: 5px;
`;

export const DateInput = styled(Input).attrs({ type: 'date' })`
`;

export const ErrorMessage = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: red;
`;

export const InputModal = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SelectModal = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const LabelModal = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const RadioModal = styled.label`
  display: flex;
`;

export const SpanModal = styled.label`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  font-family: Arial, sans-serif;
  padding: 5px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;
`;

export const TableHeader = styled.th`
  background-color: #1E9B9F;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:nth-child(odd) {
    background-color: #ffffff;
  }
  
  &:hover {
    background-color: #ddd;
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #dddddd;
`;

export const ActionButton = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 5px;
  cursor: pointer;
`;

export const ResultsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;