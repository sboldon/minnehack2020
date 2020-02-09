import React from 'react';
import { base } from '../models/config';
import Button from '@material-ui/core/Button';

const signOut = async(history) => {
  try {
    await base.auth().signOut();
    history.push('/');
  } catch(e) {
    console.log(e);
  }
}

export default function SettingsPage({ history }) {
  return (
    <div><Button onClick={() => signOut(history)}>Sign Out</Button></div>
  )
}
