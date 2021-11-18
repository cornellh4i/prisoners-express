import React from "react";
import Cards from './components/Cards'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const font =  "'Open Sans', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    }
  })

export default function App() {
  return (
    <ThemeProvider theme = {theme}>
    <div style={{}}>
      <h4></h4>
      <Cards/>
      <p> </p>
    </div>
    </ThemeProvider>
  );
}