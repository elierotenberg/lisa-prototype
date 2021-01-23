import { Fragment, FunctionComponent } from "react";
import Head from "next/head";

import AboutContent from "../../content/about.mdx";
import { MainContainer } from "../components/MainContainer/MainContainer";

const About: FunctionComponent = () => (
  <Fragment>
    <Head>
      <title>About LISA</title>
    </Head>
    <MainContainer>
      <AboutContent />
    </MainContainer>
  </Fragment>
);
export default About;
