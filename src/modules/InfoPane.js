import { UserContext } from './UserContext';
import { TopRow, BottomRow } from './InfoPaneHelpers';
import { useContext } from 'react';
import Container  from 'react-bootstrap/Container';
import '../styles/InfoPane.css';

/*
 * 
 * This function returns the content to render in the top portion of the app.
 * 
 * 
 */

export function InfoPane() {
  

    const userContext = useContext(UserContext);


    
    if ('modeData' in userContext &&
        'primaryId' in userContext &&
        'secondaryId' in userContext &&
        userContext.modeData.length > 0

    ) {
        return (
            <Container id="info-pane-container">
                {TopRow(userContext.modeData[userContext.primaryId])}
                {BottomRow(userContext.modeData[userContext.secondaryId], userContext.modeData[userContext.primaryId], userContext.primaryId, userContext.secondaryId)}
            </Container>
        );
    }
        
    
}

export default InfoPane;