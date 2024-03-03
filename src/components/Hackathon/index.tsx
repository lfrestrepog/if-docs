import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Illustration from '@site/static/img/hackathon.svg'
import CalendarIcon from '@site/static/img/calendarIcon.svg'

type WorkshopItem = {
  date: string;
  link: string;
};

const WorkshopList: WorkshopItem[] = [
  {
    date: "March 6 2024 9:30 AM GMT",
    link: "https://grnsft.org/if/workshop-6-3-am"
  },
  {
    date: "March 6 2024 4:30 PM GMT",
    link: "https://grnsft.org/if/workshop-6-3-pm"
  },
  {
    date: "March 13 2024 9:30 AM GMT",
    link: "https://grnsft.org/if/workshop-13-3-am"
  },
  {
    date: "March 13 2024 4:30 PM GMT",
    link: "https://grnsft.org/if/workshop-13-3-pm"
  },
];

function Workshop({ date, link }: WorkshopItem) {
  return (
    <div className={styles.worshopWrapper}>
      <div className={styles.worshopDate}>
        <CalendarIcon />
        <p>{new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
          hour12: true,
        })}</p>
      </div>
      <div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener" 
          className={clsx('button button--secondary ', styles.button)}
        >Sign up</a>
      </div>
    </div>
  );
}

export default function Hackathon(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className='row'>
          <div className='col col--6'>
            <h1 className={styles.title}>Join an upcoming <br />
              <span>1hr live training</span> for Impact Framework</h1>
            <p>Sign up for a 1-hour Impact Framework demo to improve how you measure software to reduce its environmental impact.</p>
            <div className={styles.workshopList}>
              {WorkshopList.map((props, idx) => (
                <Workshop key={idx} {...props} />
              ))}
            </div>
          </div>
          <div className={clsx('col', styles.illustrationWrapper)}>
            <Illustration />
          </div>
        </div>
      </div>
    </section>
  );
}
