import { Container } from '@mui/material';
import Footer from './Footer';
import Nav from './Nav';
import React from 'react';

export default function Layout(props) {
  return (
    <>
      <Nav />
      <Container component="main" maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
}
