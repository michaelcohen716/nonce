import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.section`
  width: 400px;
  border: 1px solid blue;
  padding: 16px;
`;

const MobileWrapper = (props) => (
    <Wrapper>
        <InnerWrapper className="d-flex flex-column">
            {props.children}
        </InnerWrapper>
    </Wrapper>
)

export default MobileWrapper;