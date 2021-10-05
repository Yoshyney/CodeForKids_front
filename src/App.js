import React, {useState} from "react";
import Board from "./component/Board" ;
import Card from "./component/Card" ;
import Drawer from "./component/Drawer" ;

function App() {
  const [state, setstate] = useState(false);

  const toggler = () => {
    state ? setstate(false): setstate(true);
  }

  return (
    <div className="App">
      <main className="flexbox">

        <Board id="board" className="board">
        </Board>

        <button id="button-drawer" className="button-drawer" onClick={toggler}>Edit</button>
        {state ? 
          <Drawer id="drawer" className="drawer">
            <Card id="card-1" className="card" draggable="true">
              <p>MOUV FORWARD</p>
            </Card>
            <Card id="card-2" className="card" draggable="true">
              <p>WHILE</p>
            </Card>
            <Card id="card-3" className="card" draggable="true">
              <p>END WHILE</p>
            </Card>
          </Drawer> 
          : null
        }

      </main>
    </div>
  );
}

export default App;
