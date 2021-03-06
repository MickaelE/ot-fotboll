// @ts-ignore
import React, {useState} from 'react';
import MaterialJsonSchemaForm from "@rjsf/material-ui";
import  { Redirect} from "react-router-dom";
// Internals
import givenSchema from '../schemas/form.json';
import givenUISchema from '../schemas/ui-schema.json';
import givenFormData from '../schemas/form-data.json';


export default function RegForm() {
    const [formData, setFormData] = React.useState(givenFormData);
    const [submitted, setSubmitted] = useState(false);
    const divStyle = {
        marginLeft: '10%',
        marginRight: '40%',
    };

    const onSubmit = (value, callback) => {

        var json = JSON.stringify(formData);
        const url = 'https://xmie-ot-data.mdbgo.io/api/registration'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        };
        fetch(url, requestOptions)
            .then(response =>{
                setSubmitted(true)
                return response.json()
            } )
            .catch(error => console.log('Form submit error', error))
        if (submitted) {
            return <Redirect push to={{
                pathname: '/'
            }}
            />
        }
    }
    const onCancel = () => {
        console.log('on reset being called');
    }

    const onFormChanged = ({ formData }) => setFormData(formData);

    return (

    <div style={divStyle}>
        <MaterialJsonSchemaForm
            // Define Schema
            schema={givenSchema}
            uiSchema={givenUISchema}
          //  xhrSchema={givenXhrSchema || {}}
            formData={formData}
            // Define Event handlers
            onChange={onFormChanged}
            onSubmit={onSubmit}
            // Every Prop below is optional - every prop above this line is required
            onCancel={onCancel} /* optional */

            /* Optional Prop to auto submit form on press of enter */
            submitOnEnter
        /></div>
    );
}
