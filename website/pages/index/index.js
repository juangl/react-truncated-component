import React, { Component } from "react";
import Head from "next/head";

import TopBar from "./topBar";

import IntroContainer from "./introContainer";
import Logo from "./logo";
import IntroTitle from "./introTitle";
import LiveResult from "./liveResult";
import IntroContentContainer from "./introContentContainer";

export default class App extends Component {
  render() {
    return (
      <>
        <TopBar />
        <IntroContainer>
          <Head>
            <title>React Truncated Component</title>
          </Head>

          <IntroContentContainer>
            <Logo />
            <IntroTitle />
            <LiveResult />
          </IntroContentContainer>
        </IntroContainer>
      </>
    );
  }
}
