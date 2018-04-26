import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactResponsiveSelect from 'react-responsive-select';
import 'react-responsive-select/dist/ReactResponsiveSelect.css';

import Flag from 'react-country-flag';

const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

const Country = ({code, text}) => <span><Flag code={code} svg/> {text}</span>;

const FlagSelector = ({countries}) => (
    <ReactResponsiveSelect
        name="make1"
        options={
            countries.map(country => ({
                value: country.code,
                text: country.text,
                markup: <Country {...country} />
            }))
        }
        onSubmit={() => {
            console.log("Handle form submit here")
        }}
        customLabelRenderer={({text, value}) => text && value && <Country code={value} text={text} />
        }
        caretIcon={caretIcon}
        prefix=""
        selectedValue={countries[1].text}
        onChange={(newValue) => {
            console.log(newValue)
        }}
    />
);

const App = (props) => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            <div style={{width: '400px', margin: '50px auto'}}>
                <FlagSelector
                    countries={[
                        {code: 'US', text: 'America! Fuck yeah!'},
                        {code: 'CA', text: 'Canada, eh?'}
                    ]}
                />
            </div>
        </div>
    </div>
);

export default App;
