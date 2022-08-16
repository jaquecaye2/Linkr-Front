import React, { useRef } from "react";
import loading from "../../assets/images/loading.svg";
import styled from "styled-components";

const InfiniteScroll = ({ fetchMore }) => {
  const containerRef = useRef();

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        //observer.disconnect();
        fetchMore();
      }
    }, options);

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Carregando>
        <img src={loading} alt="carregando..." />
        <h1>Loading more posts...</h1>
      </Carregando>
    </div>
  );
};

const Carregando = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 50px;
  }

  h1 {
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 400;
    color: #6D6D6D;
  }
`;

export default InfiniteScroll;
