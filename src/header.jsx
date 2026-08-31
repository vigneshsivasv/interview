import styled from "styled-components";

const Input = styled.input`
  width: 300px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: blue;
  }

  &::placeholder {
    color: #999;
  }
`;


const Header = ({search, setSearch}) => {

    return (
        <>
            <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter your name" />
        </>
    )
}

export default Header;