// import axios from 'axios';
// import { useState, useEffect } from 'react';
import Routes from './components/Routes';


function App() {
  // // Declare useState hook //
  // const [authState, setAuthState] = useState({
  //   id: 0,
  //   username: '',
  //   email: '',
  //   biography: '',
  //   image: '',
  //   status: false,
  // });
  // Execute this function immediately when the page is opened //
  // If there are an error changes the authState to false      //
  // Else changes the authState to true                        //
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}api/sign/auth`, {
  //       headers: {
  //         JWToken: sessionStorage.getItem('JWToken'),
  //       },
  //     })

  //     .then((res) => {
  //       if (res.data.error) {
  //         setAuthState({ ...authState, status: false });
  //       } else {
  //         setAuthState({
  //           id: res.data.id,
  //           username: res.data.username,
  //           email: res.data.email,
  //           biography: res.data.biography,
  //           image: res.data.image,
  //           isAdmin: res.data.isAdmin,
  //           status: true,
  //         });
  //       }
  //     });
  // });
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
