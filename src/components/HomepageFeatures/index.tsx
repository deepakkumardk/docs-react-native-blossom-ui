import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { Card } from "@react-native-blossom-ui/components";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Built with Best Practices",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Blossom UI is built keeping in mind the best practices for mobile for
        both <b>Android</b> & <b>iOS</b> design guidelines.
      </>
    ),
  },
  {
    title: "Fully Customizable ",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Blossom UI is fully customizable on each level from local to global
        manager.
      </>
    ),
  },
  {
    title: "Extensive Components & Theme Support",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Blossom UI has a lot components along with Light/Dark theme support out
        of the box
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("")}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {FeatureList.map((props, idx) => (
            <Card style={{ marginBottom: 16 }}>
              <Feature key={idx} {...props} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
