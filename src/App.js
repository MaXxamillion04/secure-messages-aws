import React, { Component,useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'

import Amplify, { Auth, API } from 'aws-amplify';
import aws_exports from './aws-exports';
import Header from './Header'
import { listMessages } from './graphql/queries';
import {createMessage as createMessageMutation, deleteMessage as deleteMessageMutation } from './graphql/mutations'
Amplify.configure(aws_exports);
const initialFormState = {subject:'', description:''}
function App() {
  const [messages,setMessages] = useState([]);
  const [formData,setFormData] = useState(initialFormState)

useEffect(()=>{
  fetchMessages()
}, []);

async function fetchMessages() {
  const apiData = await API.graphql({ query:listMessages });
  setMessages(apiData.data.listMessages.items);
}

async function createMessage() {
  if (!formData.subject || !formData.description) return;
  console.log("try post");
  try{
    await API.graphql({ query: createMessageMutation, variables: { input: formData } });
  } catch(e){
    console.log(e);
  }
  console.log(formData)
  setMessages([ ...messages, formData ]);
  setFormData(initialFormState);
}

async function deleteMessage({ id }) {
  const newMessagesArray = messages.filter(message => message.id !== id);
  setMessages(newMessagesArray);
  await API.graphql({ query: deleteMessageMutation, variables: { input: { id } }});
}

    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Updated automatically using Amazon AWS Amplify.
            V1.03
          </p>
          <input
        onChange={e => setFormData({ ...formData, 'subject': e.target.value})}
        placeholder="Message Subject"
        value={formData.subject}
          />
          <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Message Description"
        value={formData.description}
          />
          <button onClick={createMessage}>Create Message</button>

          <div style={{marginBottom: 30}}>
        {
          messages.map(message => (
            <div key={message.id || message.subject}>
              <h2>{message.subject}</h2>
              <p>{message.description}</p>
              <button onClick={() => deleteMessage(message)}>Delete Message</button>
            </div>
          ))
        }
      </div>
        </header>
      </div>
    );
  
}

export default withAuthenticator(App, false);
