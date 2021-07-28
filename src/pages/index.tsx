import React, { Fragment, FunctionComponent } from "react";
import Head from "next/head";

import AboutContent from "../../content/about.mdx";
import { MainContainer } from "../components/MainContainer/MainContainer";
import { MainNavBar } from "../components/MainNavBar/MainNavBar";

const About: FunctionComponent = () => (
  <Fragment>
    <Head>
      <title>About LISA</title>
    </Head>
    <MainNavBar />
    <MainContainer>
      <AboutContent />
    </MainContainer>
  </Fragment>
);
export default About;
