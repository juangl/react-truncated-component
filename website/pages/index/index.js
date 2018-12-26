import React, { Component } from "react";
import Head from "next/head";

import TopBar from "./topBar";

import IntroContainer from "./introContainer";
import Logo from "./logo";
import SiteTitle from "./siteTitle";
import LiveResult from "./liveResult";
import LiveResultContainer from "./liveResultContainer";

export default class App extends Component {
  render() {
    return (
      <>
        <TopBar />
        <IntroContainer>
          <Head>
            <title>React Truncated Component</title>
          </Head>

          <LiveResultContainer>
            <Logo />
            <SiteTitle />
            <LiveResult />
          </LiveResultContainer>
        </IntroContainer>
      </>
    );
  }
}
