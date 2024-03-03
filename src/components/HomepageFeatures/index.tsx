import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  idx?: number;
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Transform Observations into Impacts',
    Svg: require('@site/static/img/observations.svg').default,
    description: (
      <>Take easily observable metrics like CPU utilization, page views and installs and convert them into environmental impacts such as carbon emissions, water usage, energy consumption, and air quality.</>
    ),
  },
  {
    title: 'Buildable Plugin Ecosystem',
    Svg: require('@site/static/img/plugin.svg').default,
    description: (
      <>Engage an existing library of plugins or create new plugins within Impact Framework based on your assumptions and observations.</>
    ),
  },
  {
    title: 'Explore What-If Scenarios',
    Svg: require('@site/static/img/explore.svg').default,
    description: (
      <>Uncover the environmental impact of your software changes in real-time by examining how your software’s environmental performance changes if your application moves to the cloud or experiences shifts in its runtime.</>
    ),
  },
  {
    title: 'Decentralize Data',
    Svg: require('@site/static/img/decentralize.svg').default,
    description: (
      <>Record your observations, chosen plugins, configurations, and computed environmental impacts in a manifest file. Open the door for others to understand, verify, and challenge the entire process.</>
    ),
  },
  {
    title: 'Democratize Measurement',
    Svg: require('@site/static/img/democratize.svg').default,
    description: (
      <>Empower others to rerun your manifest file, validate your findings, or question your assumptions. They can tweak configurations, select different plugins, and run the analysis themselves.</>
    ),
  },
];

function Feature({ title, Svg, description, idx }: FeatureItem) {
  return (
    <div className={clsx(styles.featureItem, idx % 2 === 0 ? "" : styles.featureRight)}>
      <div className={styles.illustration}>
        <Svg role="img" />
      </div>
      <div className={styles.featureContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureList}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} idx={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
