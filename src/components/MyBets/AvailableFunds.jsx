// Hooks
import useStore from '../../hooks/useStore';

// Style
import { styles } from '../../styling/styles';
import { Typography } from '@mui/material';


export default function AvailableFunds({ index }) {
  const entries = useStore("entries");
  const funds = Number(entries[index].funds).toFixed(2);

  return (
    <Typography
      variant="h5"
      sx={styles.myBets.availableFundsText}>
      <strong>Available funds: </strong>
      ${funds}
    </Typography>)
}