import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import {
  Button,
  Text,
  useBlossomTheme,
} from "@react-native-blossom-ui/components";
import UIShowcase from "@site/src/pages/UIShowcase";

const sloganPrefix = "With Great library comes";
const sloganSuffix = " Great Customizability";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colors } = useBlossomTheme();

  return (
    <header>
      <div style={{ margin: 100 }}>
        <Text
          style={{
            fontSize: 56,
          }}
        >
          Build Awesome
          <Text
            style={{
              fontSize: 56,
              fontWeight: "500",
              backgroundColor: colors.successTransparent200,
            }}
          >
            {" "}
            Blossom UI{" "}
          </Text>
        </Text>
        <br />
        <Text style={{ fontSize: 22 }} status="primary">
          {sloganPrefix}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              backgroundColor: colors.successTransparent200,
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
        </div>
      </div>
    </header>
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
      <UIShowcase />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
