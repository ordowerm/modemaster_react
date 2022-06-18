# ModeMaster

## Project Overview:
Single-page, React-based web application using functional components.
- Designed as a reference for musicians (especially guitarists) learning about the diatonic/Hellenic modes.
- Inspired by a guitar-teacher friend who wanted to convert his teaching notes into a mobile-friendly format.
---
## Design Methodology:
- Mobile-first / Responsive design
- WebApp instead of iOS or Android-specific applications -- this allows for cross-platform portability
- Based on my friend's guitar notes, which are enclosed in the design-docs folder.
- During the design process, I prioritized certain usability criteria outlined in the Nielsen Group's list of usability heuristics. 
- As an educational exercise, I included some "extra" or "unnecessary" design decisions, detailed below:

---
## Usability Considerations:
- Minimalism - the only interactive component is the wheel itself
- Visible system status - selected elements are highlighted, and the app's color scheme updates across multiple view elements to match
- User control - reversing the app to a previous state is as simple as clicking on the previously-highlighted element.
- Recognition > Recall - the highlit elements of the wheel, combined with the symmetry of the wheel's design cues the reader to how to use the app. Corresponding information is appropriately labeled, assuming that the user matches the app's demographic.
- Help & Documentation - this MVP doesn't include a help page, nor does it include the animations I hope to add later; however, the simplicity of its design, combined with reversible controls, means that a user can figure out how to use the app just by experimenting.

---
## Gratuitous Stuff:
1. Programmatic Generation of the SVG Image
2. Using the Fetch API to access constants

### - Programmatic Generation of SVG Image:
Instead of hardcoding the image and then passing in callbacks through the DOM (which is probably the 'smart' way to accomplish this), I thought it would be fun to generate the image programmatically. If I want to reuse the code to programmatically generate some other shape down the line, it'll be useful, too.

### - Using the Fetch API to Access Constants:
- There's no practical reason to do this, as far as I can tell, since it forces me to do extra error checking, adds overhead, and parses JSON unnecessarily. 
- With that said, some jobs I'm applying to want me to know how to use REST API, and this is a reasonable facsimile of it. I use the Fetch API just to prove that I know how to consume JSON-formatted RESTful API.