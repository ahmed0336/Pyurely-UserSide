import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';




const Simple =()=> {
   
    return (
        <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
            <p>hahhah</p>
        
        </Tab>
        <Tab eventKey="profile" title="Profile">
            <p>ggg</p>
          
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
         
        </Tab>
      </Tabs>

      
      
    );
  }
  
  export default Simple;



