import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RenderIf({ children, isTrue }) {
  return <>{isTrue ? children : null}</>;
}

function User({ id, name, picture, isFollowed }) {
  const navigate = useNavigate();

  function navegar() {
    navigate(`/user/${id}`);
  }

  return (
    <UserContainer onClick={navegar}>
      <UserPicture src={picture} alt={`${name} picture`} />
      <UserName>{name}</UserName>

      <RenderIf isTrue={isFollowed}>
        <UserFollowing>• following</UserFollowing>
      </RenderIf>
    </UserContainer>
  );
}

export default function SearchBar() {
  const ZERO = 0;

  const token = localStorage.getItem("token");

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function renderResults() {
    return searchResults.map((result, index) => (
      <User
        key={index}
        id={result.id}
        name={result.name}
        picture={result.picture}
        isFollowed={result.isFollowed}
      />
    ));
  }

  useEffect(() => {
    if (searchValue.length === ZERO) {
      setSearchResults([]);
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:6002/users?name=${searchValue}`, options)
      .then(({ data }) => setSearchResults(data))
      .catch((error) => {
        if (error.response.status === 404) {
          setSearchResults([]);
        }
      });
  }, [searchValue]);

  return (
    <SearchBarContainer>
      <Search>
        <SearchInput
          minLength={3}
          debounceTimeout={300}
          placeholder="Search for people"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <SearchIcon />
      </Search>

      <RenderIf isTrue={searchValue.length > ZERO}>
        <SearchResultsContainer>
          <RenderIf isTrue={searchResults.length > ZERO}>
            {renderResults()}
          </RenderIf>

          <RenderIf isTrue={searchResults.length === ZERO}>
            <NoResultsMessage>Nenhum usuário encontrado!</NoResultsMessage>
          </RenderIf>
        </SearchResultsContainer>
      </RenderIf>
    </SearchBarContainer>
  );
}

const UserFollowing = styled.span`
  color: #c5c5c5;
  font-size: 16px;
`;

const SearchBarContainer = styled.div`
  max-width: 563px;
  border-radius: 8px;
  background-color: #e7e7e7;

  @media (max-width: 375px) {
    margin: 0 15px;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  gap: 16px;
  background-color: #ffffff;
  border-radius: inherit;
  height: 45px;
`;

const SearchInput = styled(DebounceInput)`
  width: 100%;
  height: 100%;
  font-size: 18px;
  outline: none;
  border: none;

  ::placeholder {
    color: #c6c6c6;
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  color: #c6c6c6;
  font-size: 26px;
`;

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1;
  padding: 14px 18px;
  background-color: #e7e7e7;
  border-radius: 0 0 8px 8px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

const UserPicture = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const UserName = styled.span`
  color: #515151;
  font-size: 18px;
`;

const NoResultsMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #515151;
`;
