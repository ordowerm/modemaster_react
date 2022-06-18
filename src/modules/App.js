import '../styles/App.css';
//import Container from 'react-bootstrap/Container';
import { useRef,useEffect,useState} from "react";
import ModeWheel from './ModeWheel';
import InfoPane from './InfoPane';
import { UserContext } from './UserContext';



const modeDataUri = "./constants/modeData.json"

function App() {
    const [primaryId,setPrimaryId] = useState(0);
    const [secondaryId,setSecondaryId] = useState(0);
    const bodyTagRef = useRef(document.getElementsByTagName("html")[0]);
    const rootRef = useRef(document.getElementById("root"));

    const [modeData, setModeData] = useState( []);
    const setPrimary = (val) => {
        setPrimaryId(val % 7);


    };
    const setSecondary = (val) => { setSecondaryId(val % 7); };
    const [contextValues, setValues] =
        useState(
            {
                primaryId,
                secondaryId,
                modeData:[],
                setPrimary,
                setSecondary
            }

        );
    const [isLoaded,setLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            fetch(modeDataUri)
                .then((res) => res.json())
                .then((data) => { setModeData(data.mode); })
                .then(() => { setLoaded(true) })
        }
        setValues(
            {
                primaryId,
                secondaryId,
                modeData,
                setPrimary: (val) => {
                    setPrimaryId(val);

                },
                setSecondary: (val) => {
                    setSecondaryId(val);
                }
            });
        //if (modeData[primaryId]) {
          //  (bodyTagRef.current).setAttribute('style', modeData[primaryId].secondaryColor);
        //}
        //console.log("Mode data: " + JSON.stringify(modeData[primaryId].secondaryColor));
        //console.log("Mode data: " + JSON.stringify(contextValues.modeData[primaryId].secondaryColor));


    }, [primaryId, secondaryId,modeData,isLoaded]);

    if (isLoaded) {
        

        (bodyTagRef.current).style.backgroundColor = modeData[primaryId].secondaryColor;
        (rootRef.current).style.backgroundColor = modeData[primaryId].secondaryColor;


    }
    return (
          <UserContext.Provider value={contextValues}>
              <InfoPane />
              <ModeWheel />

              
          </UserContext.Provider>
  );
}

export default App;
