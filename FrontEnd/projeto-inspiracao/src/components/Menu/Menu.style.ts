import styled from 'styled-components';

export const Sidebar = styled.nav`
  width: 20%;
  min-height: 500px;
  height: auto;
  background: rgba(32, 127, 195);
  color: white;
  padding: 1rem;
`;

export const ListMenu = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LinkMenu = styled.a`
  display: flex;
  color: white;
  padding: 10px;
  font-size: 24px;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

export const Welcome = styled.p`
  display: flex;
  color: white;
  padding: 10px;
  padding-bottom: 30px;
  font-size: 32px;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;