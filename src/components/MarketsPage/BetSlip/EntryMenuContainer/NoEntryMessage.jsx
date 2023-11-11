import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Style Components
import Typography from '@mui/material/Typography';


export default function NoEntryMessage() {
  return (<>
    <Typography variant="h5">You don't have any entries!</Typography>
    <Typography variant="h5">
      <Link to="/create-entry">Create a sandbox</Link> or <Link>join a contest</Link> to get started!
    </Typography>
  </>)
}