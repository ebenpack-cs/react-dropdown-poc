import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import logo from './logo.svg';
import './App.css';

// react-responsive-select
import ReactResponsiveSelect from 'react-responsive-select';
import 'react-responsive-select/dist/ReactResponsiveSelect.css';

// react-dropdown
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// react-select
import Select, { components } from 'react-select';

import Flag from 'react-country-flag';

const caretIcon = (
    <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px"
         viewBox="351.584 2118.292 11.848 6.338">
        <g>
            <path
                d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/>
        </g>
    </svg>
);

const Country = ({code, text}) => <span><Flag code={code} svg/> {text}</span>;

const Example = ({title, children}) => (
    <div style={{width: '400px', margin: '50px auto'}}>
        <h2>{title}</h2>
        {children}
    </div>
);

class MyReduxFormifiedSelect extends Component {
    render ()  {
        const { input: { value, onChange } } = this.props;
        // I'm sure this could be made better, but right now, this is getting re-rendered a bunch,
        // just because app is itself re-rendering a bunch. So right here we're just figuring out
        // which value has been selected (if any), and setting it explicitly, in order to ensure we're displaying the
        // correct selected value. FU redux forms.
        const selectedValue = (countries.find(c => c.code === value) || countries[1]).code;
        return <ReactResponsiveSelect
            name="react-responsive-select"
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
            customLabelRenderer={({text, value}) =>
                // This customizes the selected label. If this wasn't here, we wouldn't see the flag on the select
                text && value &&
                    <Country code={value} text={text}/>
            }
            caretIcon={caretIcon}
            prefix=""
            selectedValue={selectedValue}
            onChange={args => {
                // This wires up the select into redux forms
                onChange(args.value);
            }}
        />
    }
}

const countries = [
    {code: 'US', text: 'America! Heck yeah!'},
    {code: 'CA', text: 'Canada, eh?'}
];

const App = (props) => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            <form>
                <Example title="React Responsive Select">
                    <Field
                        name="ReactResponsiveSelect"
                        component={MyReduxFormifiedSelect}
                    />
                </Example>
                <Example title="React Dropdown">
                    <Dropdown
                        options={countries.map(c => ({value: c.code, label: c.text}))}
                        onChange={e => console.log(e)}
                        value={{value: countries[1].code, label: countries[1].text}}
                        placeholder="Select an option"
                    />
                </Example>
                <Example title="React Select">
                <Select
                    options={countries}
                    components={{
                        Option: props =>
                            <div style={{margin: '20px 0'}}>
                                <components.Option {...props}>
                                    <Country code={props.data.code} text={props.data.text}/>
                                </components.Option>
                            </div>
                    }}
                />
            </Example>
                <button type="submit" onClick={props.handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);

export default reduxForm({
    form: "simple", // a unique identifier for this form
    onSubmit: data => console.log(data)
})(App);
