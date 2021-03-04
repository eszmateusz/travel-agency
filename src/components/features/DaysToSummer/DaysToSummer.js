import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  countdownDays() {
    const todayDate = new Date();
    const summerStart = new Date(Date.UTC(todayDate.getUTCFullYear(), 5, 21));
    const summerEnd = new Date(Date.UTC(todayDate.getUTCFullYear(), 8, 23));

    if (
      todayDate.getUTCMonth() == summerEnd.getUTCMonth() &&
      todayDate.getUTCDate() > summerEnd.getUTCDate()
    ) {
      summerStart.setUTCFullYear(summerStart.getUTCFullYear() + 1);
    }

    const oneDay = 1000*60*60*24;

    const daysToSummer = Math.round(
      (summerStart.getTime() - todayDate.getTime()) / oneDay
    );

    if (daysToSummer === 1) {
      return '1 day to summer!';
    } else if (daysToSummer <= 0) {
      return '';
    } else {
      return daysToSummer + ' days to summer!';
    }
  }

  render() {
    const daysToSummer = this.countdownDays();
    return (
      <div className={styles.component}>
        <div className={styles.description}>{daysToSummer}</div>
      </div>
    );
  }
}

export default DaysToSummer;