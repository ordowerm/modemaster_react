import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GetRomanNumeral from './NoteUtilities.js';



/*
 * Helper functions
 * 
 */
/*
  Prints scale degrees + accidentals within primary mode.
 */
export function GetNotesString(accidentals,notes) {
    let result = [];
    for (let i = 0; i < accidentals.length; i++) {
        result.push(accidentals[i] + notes[i]);
    }
    return result;
}


/*
 * 
 * Populates the top rows of the info pane 
 * 
 */
export function TopRow(primaryData) {
    //console.log("in top row: " + primaryData);
    return (
        <Row className="PrimaryRow" style={{ backgroundColor: primaryData.primaryColor }}>
            <Col>
                <Row>
                    <Col id="mode-name">{primaryData.name}</Col>
                </Row>

                <Row>
                    <Col id="mode-tagline">{primaryData.tagline}</Col>
                </Row>

                <Row id="mode-note-row" >

                    {GetNotesString(primaryData.accidentals,primaryData.noteIds).map((item) =>
                        <Col className={"note-col"} key={"Note" + item}>{item}</Col>
                    )}

                </Row>

            </Col>
        </Row>
    );
}


/*
 
 Populates the bottom rows of the info pane
 
 */
export function BottomRow(secondaryData, primaryData, primaryIndex, secondaryIndex) {

    const deg = (7 + secondaryIndex - primaryIndex) % 7 + 1
    if (
        secondaryData != null &&
        'primaryColor' in secondaryData
        ) {

        return (
            <Row className="SecondaryRow" style={{ backgroundColor: secondaryData.primaryColor }}>
                <Col>
                    <Row className="secondary-data-row">
                        <Col className="secondary-data-title">{"Scale Degree: "}</Col>
                        <Col className="secondary-data-content">{primaryData.accidentals[deg-1]+deg}</Col>
                    </Row>

                    <Row className="secondary-data-row">
                        <Col className="secondary-data-title">{"7th Chord: "}</Col>
                        <Col className="secondary-data-content">{GetRomanNumeral(primaryIndex, secondaryIndex, primaryData.accidentals, secondaryData.seventhchord)}</Col>
                    </Row>

                    <Row className="secondary-data-row">
                        <Col className="secondary-data-title">{"Chord Scale: "}</Col>
                        <Col className="secondary-data-content">{secondaryData.name}</Col>
                    </Row>

                    <Row className="secondary-data-row">
                        <Col className="secondary-data-title">{"Tensions: "}</Col>
                        <Col className="secondary-data-content">{secondaryData.tensions[0] + "9   " + secondaryData.tensions[1] + "11   " + secondaryData.tensions[2] + "13"}</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

