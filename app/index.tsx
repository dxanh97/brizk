/* eslint-disable global-require */
import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import Summary from "../components/Summary";

const Wrapper = styled(View)`
  flex: 1;
`;

const App: React.FC = () => (
  <Wrapper>
    <Summary />
  </Wrapper>
);

export default App;
