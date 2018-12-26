import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import SternGroveTheme from "typography-theme-stern-grove";

SternGroveTheme.plugins = [
  new CodePlugin(),
  () => ({ "p:last-child": { marginBottom: 0 } }),
];

const typography = new Typography(SternGroveTheme);

const GlobalStyle = createGlobalStyle`
  html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          padding: 0;
        }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          {this.props.styleTags}
        </Head>
        <body>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
