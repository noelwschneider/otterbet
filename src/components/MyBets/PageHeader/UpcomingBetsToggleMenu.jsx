// Style
import { styles } from '../../../styling/styles';
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';


export default function UpcomingBetsToggleMenu({ props }) {
  const { upcomingBetsView, setUpcomingBetsView } = props;

  const handleChange = (_, newValue) => {
    if (newValue === null) return;
    setUpcomingBetsView(newValue);
  }

  return (
    <ToggleButtonGroup
      value={upcomingBetsView}
      exclusive
      onChange={handleChange}
      sx={styles.myBets.betsViewToggleContainer}
    >
      <ToggleButton value={true}
        style={upcomingBetsView
          ? styles.myBets.activeViewToggle
          : styles.myBets.inactiveViewToggle
        }>
        <Typography variant="h6" >
          Upcoming
        </Typography>
      </ToggleButton>

      <ToggleButton value={false}
        style={upcomingBetsView
          ? styles.myBets.inactiveViewToggle
          : styles.myBets.activeViewToggle}>
        <Typography variant="h6" >
          Completed
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}