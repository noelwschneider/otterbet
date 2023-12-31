// Style Tools
import { styles } from '../../../../../styling/styles';

// Style Components
import { Grid } from '@mui/material';


export default function Header({ game }) {
  //! Rename
  const { date, time } = game

  //! Rename
  const getDateTimeData = (date, time) => {

    // UTC offset for central time right now
    //& eventually this will be a variable determined by user settings
    const offset = -5;

    let month = Number(date[5] + date[6]);
    let day = Number(date[8] + date[9]);
    let hours = Number(time[0] + time[1]);
    let minutes = Number(time[3] + time[4]);

    // AM or PM
    //& There is probably a real-world name for this. My current name is not descriptive

    let segmentIndicator = ''
    // Adjust for user timezone
    //& This does not currently have anything for month crossover
    if (hours + offset < 0) {
      // Move day back
      day--;

      // Adjust time
      hours = 24 + (hours + offset);
    } else if (hours + offset > 24) {
      // Move day forward
      day++;

      // Adjust time
      hours = (hours + offset) - 24;
    } else {
      hours = hours + offset;
    }

    // Set 'am' or 'pm'
    if (hours === 0 || hours < 12) {
      segmentIndicator = 'am';
    } else if (hours >= 12 && hours !== 24) {
      segmentIndicator = 'pm';
    }

    // Adjust to 12-hour format
    if (hours > 12) {
      hours -= 12;
    }

    if (minutes < 10) {
      const minutesString = `${minutes}`;
      minutes = minutesString.padStart(2, 0);
    }

    return `${month}/${day} at ${hours}:${minutes}${segmentIndicator}`;
  }
  let gameDate = getDateTimeData(date, time);

  return (
    <Grid
      container
      item xs={12}
      sx={styles.markets.itemHeaderContainer}>

      <Grid
        item xs={6}
        sx={styles.markets.itemHeaderDate}>
        {gameDate}
      </Grid>

      <Grid
        item xs={2}
        sx={styles.markets.itemHeaderCell}>
        Spread
      </Grid>

      <Grid
        item xs={2}
        sx={styles.markets.itemHeaderCell}>
        ML
      </Grid>

      <Grid
        item xs={2}
        sx={styles.markets.itemHeaderCell}>
        O/U
      </Grid>

    </Grid>
    )
}