import styled from "styled-components";

//background-color: #43344f;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  disply: flex;
  justify-content: center;
`;

export const Th = styled.th`
  padding: 5px 0px;
  width: calc(100% / 3) px;
  text-align: center;
  color: #43344f;
  border-bottom: #666 1px solid;
  transition-duration: 600ms;
`;

export const Tr = styled.tr`
  border: #666 2px solid;
  transition-duration: 500ms;

  &:hover {
    background-color: #43344f;
    cursor: pointer;
    transform: scale(1.1);

    th {
      color: #fff;
    }
  }
`;

export const Table = styled.table`
  width: 80%;
  border-radius: 5px;
  border-spacing: 0;
`;

export const Title = styled.h3`
  color: #43344f;
  margin-bottom: 20px;
  max-width: 80%;
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 45px;
`;
