import React, { useState } from 'react';
 

function App() {
  const [userData, setUserData] =  useState(null);
  function getData() {
     fetch('http://localhost:8000/score',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'test': 'test',
        'Cookie': 'connect.sid=s%3AKgmo41bI8zlI6BBySl8of9wFcXBkw8yN.9MUTeggv%2BF0%2BSN1UWsddCCmooJ4E88nfUHjDOErXuDE'
      }
    }).then((res)=> {
      console.log(res, typeof res);
      if ( res.status === 404) {
        console.log(res.statusText)
      } else if (res.status === 200) {

        return res.json();
      }
    }).then((r)=>console.log('res', r)).catch(console.error);
  }
  return (
    <div>
      <header>
        personality test
      </header>
      <section>
        <div>
          <button type='button' onClick={getData}>
            Get Score
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
