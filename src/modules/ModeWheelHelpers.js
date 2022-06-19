import GetRomanNumeral from './NoteUtilities.js';

/*
    This module contains the helper functions used in ModeWheel.js to construct the SVG image. 
 
 */


/*
Builds an inner section of the SVG. It does not rotate it.
Input id attribute and color attributes, + drawing constants
*/
export function DrawInnerPath(id, color, data,callback) {

    //draw segment denoting start point of inner arc
    const innerArcStart = data.width / 2.0 * data.innerRadius;
    const angle = (2.0 * Math.PI) / 7.0;
    const xOffset = data.width / 2.0 * data.innerRadius * Math.cos(angle);
    const yOffset = data.height - data.width / 2.0 * data.innerRadius * Math.sin(angle);

    return (
        <path className={data.classname} fill={color} id={"inner-path-" + id.toString()} onClickCapture={callback}
            d={
                "M 0 " + data.height.toString() + " " +
                "l " + innerArcStart.toString() + " 0 " +
                "A " + innerArcStart.toString() + " " + innerArcStart.toString() + " " +
                "0 0 0 " + xOffset.toString() + " " + yOffset.toString() +
                " Z"

            } />
    );
}



/**
 * 
 * Builds the outer path of the mode wheel
 * 
 */
export function DrawOuterPath(id, color, data, callback) {
    let outerArcStartNear = data.width / 2.0 * data.outerRadiusNear;
    let angle = (2 * Math.PI) / 7.0;
    let outerArcEndNearX = outerArcStartNear * Math.cos(angle);
    let outerArcEndNearY = data.height - outerArcStartNear * Math.sin(angle);
    let outerArcRadius = data.width / 2.0 * data.outerRadiusFar;
    let outerArcStartXFar = outerArcRadius * Math.cos(angle);
    let outerArcStartYFar = data.height - outerArcRadius * Math.sin(angle);
    let classNameType = data.classname;
    
    return (
        <path className={classNameType} fill={color} id={"outer-path-" + id.toString()} onClickCapture={callback}
            d={
                "M " + outerArcStartNear.toString() + " " + data.height.toString() + " " +
                "A " + outerArcStartNear.toString() + " " + outerArcStartNear.toString() + " 0 0 0 " + outerArcEndNearX.toString() + " " + outerArcEndNearY.toString() + " " +
                "L " + outerArcStartXFar.toString() + " " + outerArcStartYFar.toString() +
                "A " + outerArcRadius.toString() + " " + outerArcRadius.toString() + " 0 0 1 " + outerArcRadius.toString() + " " + data.height.toString() + " " +
                "Z"


            } />
    );

}


/*
 * 
 * Draws the name of the mode along the outer sections
 *
 * 
 */
export function DrawModeTextPath(modeName, svgParams,callback) {
    //Constants for programmatically constructing id attribute values for each text path.
    const pathSuffix = "-textpath";
    const textPathClassName = "textpath-invis"; //set this to match field in .css file
    const textSuffix = "-wheel-text";
    const textClassName = "textpath-mode-text";

    let pathId = modeName + pathSuffix;

    //move to starting point of arc
    let angle = (2 * Math.PI) / 7.0;
    let arcStartPointX = svgParams.width / 2.0 * svgParams.radiusModeNameTextPath * Math.cos(angle);
    let arcStartPointY = svgParams.height - svgParams.width / 2.0 * svgParams.radiusModeNameTextPath * Math.sin(angle);

    let rad = svgParams.width / 2.0 * svgParams.radiusModeNameTextPath;



    return (
        <g onClickCapture={callback}>
            <path className={[svgParams.className, textPathClassName].join(" ")} id={pathId}
                d=
                {
                    "M " + arcStartPointX.toString() + " " + arcStartPointY.toString() + " " +
                    "A " + rad.toString() + " " + rad.toString() + " 0 0 1 " + rad.toString() + " " + svgParams.height.toString()

                }
                

            />
            <text className={textPathClassName} id={modeName + textSuffix} >
                {/*
                 
                 For some reason, I can't seem to set the startOffset and dominantBaseline fields in the accompanying .css style and have it render here.

                   As a result, I'm hardcoding their values into the tag below:
                 
                 */}
                <textPath className={textClassName} startOffset={"50%"} dominantBaseline={"middle"} href={"#" + pathId} >
                   {modeName.toUpperCase()}
                </textPath>
            </text>

        </g>

    );// path + textpath;
}



/*
 
 Draws the 7th chord text

 TO DO: Convert to JSX
 
 
 */
export function DrawChordTextPath(svgParams,noteData,primaryId,secondaryId,callback) {
    let text = new Array(7);
    const n = svgParams.divNumber;
    const angle = 2.0 * Math.PI / n;
    const r = svgParams.chordTextRadius * svgParams.width / 2.0;
    let i = 0;
    if (
        noteData != null &&
        noteData[primaryId] != null //&&
        //noteData[secondaryId] != null &&
        //'seventhchord' in noteData[secondaryId]

     ) {
        for (i = 0; i < n; i++) {
            const fixedIndex = i;
            text[i] = <text className="chordtext" id={"chord-text-" + i.toString()} key={"chord-text-" + i}
                x={(svgParams.width / 2.0 - r * Math.cos(7.0 * angle / 4.0 + angle * (i))).toString()}
                y={(svgParams.height / 2.0 - r * Math.sin(7.0 * angle / 4.0 + angle * (i))).toString()} onClickCapture={() => { callback(fixedIndex) }} >
                {GetRomanNumeral(primaryId, fixedIndex, noteData[primaryId].accidentals, noteData[fixedIndex].seventhchord)}
            </text>;
        }
    }
//    console.log(text);
    return <>{text}</>;
}



/*
 * Draws selection arcs using relevant parameters 
 * 
 * TODO: refactor to combine into single function
 */
function DrawSingleSelection(num, data, callback) {
    let n = 7.0;
    const offset = 360 / (2.0 * n);//(Math.PI/2.0-Math.PI/n)*360/(2*Math.PI); //offset angle to center transformation group
    if (data) {
        return (
            <g className={"selection-path"} id={"outer-selection-group"} transform={("translate(" + (data.width / 2.0).toString() + "," + -(data.height / 2.0).toString() + ") rotate(" + ((offset - 90.0) + num * offset * 2.0).toString() + " 0 " + (data.height).toString() + ")")}>
                {callback}
            </g>
        );
    }
}
export function DrawSelections(context, drawData)
{
    //console.log("In DrawSelections: primary "+context.primaryId);
    //console.log("secondary: " + context.secondaryId);
    const innerFunc = DrawInnerPath("selected", "none", drawData, () => { });
    const outerFunc = DrawOuterPath("selected", "none", drawData, () => { });

    return (
        <>
            {DrawSingleSelection(context.primaryId, drawData, outerFunc)}
            {DrawSingleSelection(context.secondaryId, drawData, innerFunc)}
        </>
        );
}

/*
Draws interval text: WWHWWWH
*/

export function DrawIntervals(svgParams) {
    //console.log("In DrawIntervals: " + svgParams);
    const Step = "WWHWWWH";
    const semiWidth = svgParams.width / 2.0;
    const semiHeight = svgParams.height / 2.0;
    let n = svgParams.divNumber;
    const angle = 2.0 * Math.PI / n;
    const r = svgParams.radius_wwhwwwh * svgParams.width / 2.0;

    let payload = new Array(7); //final jsx output
    for (let i = 0; i < n; i++) {
        let x = semiWidth + r * Math.cos(angle * (i - 1.25));

        let y = semiHeight + r * Math.sin(angle * (i - 1.25));
        let pushString = <text className={"intervaltext"} x={x} y={y} key={"interval-" + i}> {Step[i]} </text>;
        payload[i] = pushString;
    }

    //return text;*/
    return (
        <>
            {payload}
        </>
    );
}


/*
export function that adds SVG to the div corresponding to the id in the export function's argument

TO DO: refactor into JSX

*/
/*export function AddPaths(id) {
    
    let i = 0;
    let data = new DrawData();
    let addstring = AddAltText();
    for (i = 0; i < data.divnumber; i++) {
        addstring += MakeGroup(data, i, Mode[i] + "-group", PrimaryColors[i]);
    }
    addstring += DrawIntervals(data);
    addstring += DrawChordTextPath(data);

    document.getElementById(id).innerHTML = addstring;
}
*/



/*
creates a group for each set of paths, then transforms them appropriately.
*/
export function MakeGroup(svgParams, num, groupname, color, primaryCallback,secondaryCallback) {
    let n = 7.0;
    const offset = 360 / (2.0 * n);//(Math.PI/2.0-Math.PI/n)*360/(2*Math.PI); //offset angle to center transformation group
    if (svgParams) {
        return (
            <g id={groupname} key={groupname + num} transform={("translate(" + (svgParams.width / 2.0).toString() + "," + -(svgParams.height / 2.0).toString() + ") rotate(" + ((offset - 90.0) + num * offset * 2.0).toString() + " 0 " + (svgParams.height).toString() + ")")}>
                {DrawInnerPath(groupname, color, svgParams,()=>secondaryCallback(num))}
                {DrawOuterPath(groupname, color, svgParams,()=>primaryCallback(num))}
                {DrawModeTextPath(groupname, svgParams, () => primaryCallback(num))}

            </g>
        );
    }

}




