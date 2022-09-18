import type { PlasmoContentScript } from "plasmo";
import queryString from 'query-string';
import React from 'react';
import { Storage } from "@plasmohq/storage";

require('dotenv').config()

const storage = new Storage()

type ContainerProps = {
  children: React.ReactNode; // 👈️ type children
};

const matches = ["https://www.tokopedia.com/search*"]

if (process.env.APP_MODE) {
  matches.push("http://localhost:3000/search*")
}

export const config: PlasmoContentScript = {
  matches
}

export const getRootContainer = () => {
  let existingNode = document.querySelector('body')
  let newNode = document.createElement("div")
  existingNode.prepend(newNode)
  return newNode
}

const Container = (props: ContainerProps) => {
  return <div style={{ 
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: 12, 
    boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px', 
    width: 'unset' }}>{props.children}</div>;
};

const App = () => {
  const saveSearch = async (event) => {
    event.preventDefault();
    await storage.set("key", window.location.search)
  }

  const loadSearch = async (event) => {
    event.preventDefault();
    let params = await storage.get("key");
    let search = queryString.parse(params);
    console.log(search);
  }
  return (
    <Container>
      <form action="#">
        <label htmlFor="filter">History</label>
        <select name="filter" id="filter">
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
        </select>
        <button onClick={saveSearch}>Save</button>
        <button onClick={loadSearch}>Load</button>
      </form>
    </Container>
  )
}

export default App