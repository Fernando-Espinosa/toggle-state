import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

export const ExamplePage2 = () => {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Explanation:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>
              <strong>Seamless Navigation:</strong> React Router manages routing
              on the client side without requiring a full page refresh,
              resulting in extremely smooth transitions between pages.
            </li>
            <li>
              <strong>Immediate Library Loading:</strong> Since the libraries
              and resources for each route are pre-loaded or cached, content
              displays without any noticeable delay, enhancing overall
              responsiveness.
            </li>
          </ul>
        </Typography>
      </Box>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
  );
};
