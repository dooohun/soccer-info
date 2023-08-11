import { styled } from "styled-components";

export const FormState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
`;

const RedCircle = styled(Circle)`
  background-color: red;
`;

const YellowCircle = styled(Circle)`
  background-color: yellow;

`;

const GreenCircle = styled(Circle)`
  background-color: green;
`;

export default function FormStyle({ form }) {
  const threeChar = form?.slice(0, 3);
  if (threeChar !== undefined) {
    return (
      <>
        {[...threeChar].map((char, idx) => {
          return (
            <FormState key={idx}>
              {char === "L" && <RedCircle>L</RedCircle>}
              {char === "D" && <YellowCircle>D</YellowCircle>}
              {char === "W" && <GreenCircle>W</GreenCircle>}
            </FormState>
          )
        })}
      </>
    )
  }
}
