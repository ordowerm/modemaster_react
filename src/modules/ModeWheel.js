import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react';
import { MakeGroup, DrawIntervals, DrawSelections, DrawChordTextPath } from './ModeWheelHelpers';
import { Container } from 'react-bootstrap';
import '../styles/ModeWheel.css';

const drawConstantsUri = "./constants/drawConstants.json";


function DrawWheel(svgParams,args) {
    let groupJsx = [];
    let localWidth = 100;
    let localHeight = 100;
    //console.log(svgParams);
    //console.log(args);
    const userContext = useContext(UserContext);


    if (
        svgParams != null &&
        args != null &&
        'drawingConstants' in svgParams &&
        'modeData' in args
    ) {

        //Add Unselected Sections of Mode Wheel
        for (let i = 0; i < 7; i++) {
            let modeName = "group"; //default value if modeData isn't loaded
            let color = "#8080FF"; // " "
            if (
                args.modeData != null &&
                args.modeData.length > 0
            )
            {
                modeName = args.modeData[i].name;
                color = args.modeData[i].primaryColor;
            }

            groupJsx.push(MakeGroup(svgParams.drawingConstants, i, modeName, color,userContext.setPrimary,userContext.setSecondary));
        }

        

        return (
            <Container id="modewheel-container">
                <svg viewBox={"0 0 " + localWidth + " " + localHeight} stroke="#000" >
                    {groupJsx}
                    {DrawChordTextPath(svgParams.drawingConstants, userContext.modeData, userContext.primaryId, userContext.secondaryId, userContext.setSecondary)}
                    {DrawIntervals(svgParams.drawingConstants)}
                    {DrawSelections(userContext, svgParams.drawingConstants)}
                </svg>
            </Container>
        );
    }
}




//ModeWheel main rendering function
export default function ModeWheel() {
    const [drawParams, setParams] = useState(null);
    const userContext = useContext(UserContext);

    useEffect(() => {
        fetch(drawConstantsUri)
            .then((res) => res.json())
            .then((data) => setParams(data));
    }, []);

    return DrawWheel(drawParams, userContext);
           
        
}