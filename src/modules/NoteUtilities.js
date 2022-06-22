/*
 Input the index of the current mode,
 the index of the current chord,
 the list of accidentals within the current mode,
 and the 7th chord data from the current chord,
 and return a string representation of the seventh chord.
 
 */
export default function GetRomanNumeral(modeIndex, chordIndex, primaryAccidentals, chordSeventh) {
    const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
    const scaleDeg = (7- modeIndex + chordIndex) % 7;
    let resultString = primaryAccidentals[scaleDeg];
    let resultRoman = roman[scaleDeg];
    switch (chordIndex) {
        case 0:
        case 3:
        case 4:
            resultRoman = resultRoman.toUpperCase();
            break;
        default:
            break;
    }
    resultString += resultRoman + "" + chordSeventh;
    return resultString;
}



//Stuff that hasn't been used yet
const chromaticSharps = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const chromaticFlats = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
const diatonicString = "WWHWWWH";

/**
 * 
 * startId: how many half-steps above C the key signature starts 
 * isSharpKey: whether the key should use sharps or flat (use data array to denote this)
 * intervalString: e.g. WWHWWWH for diatonic 
 */
function getNotesInKey(startId, isSharpKey, intervalString)
{
    let noteArray = new Array(7);
    let intervalNum = 0;
    let cumulativeNoteOffset = 0;

    let localNoteArray = chromaticSharps;
    if (!isSharpKey) {
        localNoteArray = chromaticFlats;
    }

    for (intervalNum = 0; intervalNum < 7; intervalNum++)
    {
        noteArray[intervalNum] = localNoteArray[(startId + cumulativeNoteOffset) % 12];
        if (intervalString[intervalNum] === 'W') {
            cumulativeNoteOffset += 2;
        }
        else if (intervalString[intervalNum] === 'H') {
            cumulativeNoteOffset += 1;
        }
        else
        {
            console.log("Error: interval doesn't consist exclusively of W's and H's");
        }
    }

    console.log(noteArray);
    return noteArray;
}

export function testKeys()
{
    for (let i = 0; i < 12; i++)
    {
        getNotesInKey(i, true, "WWHWWWH");
    }
}