# Explanation of Constants Folder

## Overview:
I'm storing certain constants as JSON files. 

Why store them as a runtime-accessed JSON file, as opposed to a JavaScript module that can be imported during a build? 
From a portfolio standpoint, I'd like to show that I know how to make REST API calls, and the syntax is identical.

--- 
## drawConstants.json:
This file contains constants used for programmatically drawing the mode wheel svg.

Here's the breakdown of each field associated with the **drawingConstants** key:

### drawingConstants:
divNumber:
 :  Number of "wedges" into which the mode wheel should be divided. Its default value is 7, to match the seven diatonic modes.

 :  Realistically, I could hardcode this into ModeWheel.js, since it will not change within the context of this application. However, the shape I'm using here is pretty attractive, so if I ever want to reuse this format, the ability to programmatically create wheels of different sizes could be useful. I'm looking at you, "Circle of Fifths" web application!


width:
 :  The SVG Viewbox width. Divide this by two to obtain the length of viewbox's apothem, which is to be treated as the maximum "radius" to use when drawing the ModeWheel's circles and arcs.


height:
 :  SVG Viewbox height.

strokeSize:
 :  The size of the stroke used when drawing SVG elements.

innerRadius:
 :  Proportion of maximum radius used when rendering the sector on the inside of the ModeWheel. 

 :  It should be large enough to legibly display "♭VIIMaj7" in a serif font.

outerRadiusNear:
 :  When drawing the outer sections of the ModeWheel, there's an outer arc and an inner arc, each with different radii. This is the radius of the inner arc.
  
outerRadiusFar:
 :  The radius of the outer arc.

 radiusModeNameTextPath:
  :  Along the outer sections of each mode wheel, text should display the name of the mode associated with that section. This is the radius used when generating the arc used for the text path containing these names.

radius_wwhwwwh:
 :  Intervals between notes of a scale can be broken down into "whole steps" (2 semitones between notes) and "half steps" (1 semitone between notes).

 :  These intervals are frequently denoted with the letters W and H, such that the Major Scale / Ionian Mode consists of the pattern WWHWWWH as you move in ascending order from one note to the next. 

 :  To emphasize the relationship between each mode, we draw the letters W and H between each outer section using an SVG Text Path.

 :  This field contains the radius used to programmatically generate those text paths.
    
   
chordTextRadius:
 :  Inside the inner sectors, text representing the  7th chords of each scale degree should render. This field gives a ballpark estimate for where to put the center of the textbox.


highlightStrokeSize:
 :  When a mode/chord is selected, the SVG should overlay the just-clicked/just-tapped with a thicker, highlit stoke. This represents the stroke size for the overlay.

  ---
  ## modeData.json 
  This file contains the constants used when displaying/calculating note data.

  It consists of a single key, **mode**, whose value is an array containing the constants that correspond to each of the diatonic modes.

  Each element in the array contains the following fields. In this file, I've included a description of what each field signifies:

  ### Elements of the "mode" array

  name:
   :  The Grecian name of the mode, such as Ionian, Dorian, etc.

  tagline:
   :  Brief description of the mode's tonality/vibe for use in the InfoPane.

  seventhchord:
   :  The tonality of the mode's seventh chord. Can be Maj7, Min7, (dominant)7, or ø7.
   
  accidentals:
  :  Array of 7 strings, each corresponding to a scale degree of the Ionian scale. If the selected mode can be constructed by applying an accidental to the nth scale degree of the Ionian scale, the corresponding accidental symbol will appear in the (n-1)th index here (zero-indexed).

  :  This is used for displaying accidentals in the InfoPane, as well as chords in the ModeWheel.

  tensions:
  : Array of 3 strings, each corresponding to whether an accidental should be applied at the 9th, 11th, and 13th scale degree, in order. 
  : Technically, I could just access the 2nd, 4th, and 6th scale degrees from the accidentals field to accomplish this. That might be a fun way to show off array destructuring in React or something. I'll consider refactoring.

  primaryColor:
  : Todd (the person for whom I'm making this app) associates certain modes with certain colors. Since these aren't "technically" part of the note data, I could migrate them into a separate JSON file or even into a CSS stylesheet. I like having it here, though.
  : The primary color is bright, and it should be used as the backdrop when text is to be displayed.

  secondaryColor:
  :  A darker version of the color associated with the mode currently selected. The entire app's background should be set to this color when a user selects a mode.