import React, { Component } from "react";

import ReactTruncateFormat from "react-truncated-component";

import TopBar from "./TopBar";
import NumberOfLinesInput from "./NumberOfLinesInput";
import Container from "./Container";
import Logo from "./logo";
import LiveResultBox from "./LiveResultBox";
import SiteTitle from "./SiteTitle";
import TruncationEnabled from "./truncationEnabled";
import LiveSettingsContainer from "./LiveSettingsContainer";
import Ellipsis from "./Ellipsis";

export default class App extends Component {
  state = {
    numberOfLines: 5,
    isTruncationEnabled: true,
  };

  onSeeMoreClick = () => {
    this.setState({
      isTruncationEnabled: false,
    });
  };

  render() {
    return (
      <Container>
        <TopBar />
        <Logo />

        <SiteTitle />

        <LiveSettingsContainer>
          <NumberOfLinesInput
            disabled={!this.state.isTruncationEnabled}
            value={this.state.numberOfLines}
            onChange={e => {
              this.setState({
                numberOfLines: e.target.value,
              });
            }}
          />

          <TruncationEnabled
            checked={this.state.isTruncationEnabled}
            onChange={e => {
              this.setState({
                isTruncationEnabled: e.target.checked,
              });
            }}
          />
        </LiveSettingsContainer>

        <LiveResultBox>
          <ReactTruncateFormat
            ellipsis={<Ellipsis onClick={this.onSeeMoreClick} />}
            numberOfLines={
              this.state.isTruncationEnabled ? this.state.numberOfLines : null
            }
            lineHeight={20}
          >
            <p>
              <i>
                <b>Nothomyrmecia</b>
              </i>
              , also known as the <b>dinosaur ant</b> or <b>dawn ant</b>, is a
              rare{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Genus"
                title="Genus"
              >
                genus
              </a>{" "}
              of{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Ant"
                title="Ant"
              >
                ants
              </a>{" "}
              consisting‍‍ of a single{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Species"
                title="Species"
              >
                species
              </a>
              ,{" "}
              <i>
                <b>Nothomyrmecia macrops</b>
              </i>
              . These ants live in South Australia, nesting in old-growth{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Mallee_Woodlands_and_Shrublands"
                title="Mallee Woodlands and Shrublands"
              >
                mallee
              </a>{" "}
              woodland and{" "}
              <i>
                <a
                  target="_black"
                  href="https://en.wikipedia.org/wiki/Eucalyptus"
                  title="Eucalyptus"
                >
                  Eucalyptus
                </a>
              </i>{" "}
              woodland. The full distribution of <i>Nothomyrmecia</i> has never
              been assessed, and it is unknown how widespread the species truly
              is; its potential range may be wider if it does favour{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Old-growth_forest"
                title="Old-growth forest"
              >
                old-growth
              </a>{" "}
              mallee woodland.
            </p>
            <p>
              Possible threats to its survival include habitat destruction and
              climate change. <i>Nothomyrmecia</i> is most active when it is
              cold because workers encounter fewer competitors and predators
              such as{" "}
              <i>
                <a
                  target="_black"
                  href="https://en.wikipedia.org/wiki/Carpenter_ant"
                  title="Carpenter ant"
                >
                  Camponotus
                </a>
              </i>{" "}
              and{" "}
              <i>
                <a
                  target="_black"
                  href="https://en.wikipedia.org/wiki/Iridomyrmex"
                  title="Iridomyrmex"
                >
                  Iridomyrmex
                </a>
              </i>
              , and it also increases hunting success. Thus, the increase of
              temperature may prevent them from foraging and very few areas
              would be suitable for the ant to live in. As a result, the{" "}
              <a
                href="https://en.wikipedia.org/wiki/International_Union_for_Conservation_of_Nature"
                title="International Union for Conservation of Nature"
              >
                IUCN
              </a>{" "}
              lists the ant as{" "}
              <a
                target="_black"
                href="https://en.wikipedia.org/wiki/Critically_Endangered"
                title="Critically Endangered"
              >
                Critically Endangered
              </a>
              .
            </p>
          </ReactTruncateFormat>
        </LiveResultBox>
      </Container>
    );
  }
}
