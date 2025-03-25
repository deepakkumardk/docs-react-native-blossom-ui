import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import {
  Button,
  Spacer,
  Text,
  useBlossomTheme,
} from "@react-native-blossom-ui/components";
import UIShowcase from "@site/src/pages/UIShowcase";

const sloganPrefix = "With Great library comes";
const sloganSuffix = " Great Customizability";

import { TypeAnimation } from "react-type-animation";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colors } = useBlossomTheme();

  return (
    <div>
      <div className={styles.headerContainer}>
        <div>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[1000, "Blossom", 1000, "Awesome", 1000]}
            speed={20}
            style={{
              fontSize: 56,
              fontWeight: "500",
              color: colors.success500,
            }}
            repeat={Infinity}
          />
          <span
            style={{
              fontSize: 56,
            }}
          >
            UI
          </span>
        </div>

        <Text style={{ fontSize: 22, marginVertical: 6 }} status="primary">
          {sloganPrefix}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: colors.success500,
            }}
          >
            {sloganSuffix}
          </Text>
        </Text>

        <div
          className={styles.buttons}
          style={{
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "flex-start",
          }}
        >
          <Link to="/docs/intro">
            <Button title="Get Started" status="info" />
          </Link>
          <Spacer width={20} height={2} />
          <Link to="/docs/category/components">
            <Button title="Docs" status={null} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Create Awesome Blossom UI"
    >
      <HomepageHeader />

      <div
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          typography="h4"
          status="primary"
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          Largest React-Native UI Component Library
        </Text>
      </div>
      <div className={styles.showcaseContainer}>
        <UIShowcase />
        {/* <div className={styles.mobileBorder}>
          <div className={styles.notch} />
          <div className={styles.bottomBar} />
          <iframe src="https://react-native-blossom-ui-showcase-app.vercel.app" />
        </div> */}
      </div>

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
