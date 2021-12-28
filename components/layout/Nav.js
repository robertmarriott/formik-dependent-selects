import { AppBar, Link, Toolbar, Typography } from '@mui/material';

import NextLink from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/" passHref>
          <Link>
            <Typography variant="h6" color="white" noWrap>
              Formik Dependent Selects
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}
