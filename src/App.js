import Routing from "./routes/Routing";
import 'react-toastify/dist/ReactToastify.css'; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this
import React from "react";


function App() {
  return (
    <>
      <Routing />
      <ToastContainer
          pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App;
