import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://youtu.be/xnRVC2ysL8w"
          >
            Video Walkthrough - 5min ⏱️
          </Link>
        </div>
        <br />
        <br />
        <p><b>Welcome to the Impact Framework.</b></p>
        <p> Impact Framework allows anyone to estimate the environmental impact of their software. </p>
        <p> Whether you're a user or developer, on this site you will find step-by-step instructions for working with Impact Framework.
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Documentation for the Impact Framework />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
