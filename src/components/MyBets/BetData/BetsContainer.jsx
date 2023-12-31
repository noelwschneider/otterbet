// Hooks
import useStore from '../../../hooks/useStore';

// Components
import MyBetsItem from './MyBetsItem';

// Utilities
import isFinished from '../../../utilities/isFinished';


export default function BetsContainer({props}) {
  const {
    selectedEntryIndex, 
    upcomingBetsView } = props;

  const userBets = useStore("myBets");
  const entries = useStore("entries");

  return (<>
    {userBets.map(bet => {
      return (
        // Render bet card if:
          // The current bet is on the selected entry
          // AND it matches the upcoming/completed toggle selection
        (bet.entry_id === entries[selectedEntryIndex].id
          && upcomingBetsView === !isFinished(bet))
        && <MyBetsItem key={bet.id} view={upcomingBetsView} bet={bet} />
      )
    })}
  </>)
}