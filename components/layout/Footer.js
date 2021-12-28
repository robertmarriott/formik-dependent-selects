import { Container } from '@mui/material';
import React from 'react';

export default function Layout() {
  return (
    <Container component="footer" maxWidth="lg" sx={{ pt: 1, pb: 2 }}>
      <p>
        <small>&copy; Company Name</small>
      </p>
    </Container>
  );
}
