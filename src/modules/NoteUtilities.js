/*
 Input the index of the current mode,
 the index of the current chord,
 the list of accidentals within the current mode,
 and the 7th chord data from the current chord,
 and return a string representation of the seventh chord.
 
 */
export default function GetRomanNumeral(modeIndex, chordIndex, primaryAccidentals, chordSeventh) {
    const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
    const scaleDeg = (modeIndex + chordIndex) % 7;
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
    resultString += resultRoman + " " + chordSeventh;
    return resultString;
}