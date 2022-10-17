import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Line />
      <h2>{"Look like you're lost"}</h2>
      <span>the page you are looking for not avaible!</span>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Line = styled.div`
  border-bottom: 1px solid white;
  width: 30%;
`;

export default NotFound;
