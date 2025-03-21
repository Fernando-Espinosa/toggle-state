import { Box, Grid, IconButton } from '@mui/material';
import styled from 'styled-components';

// The reasoning to use styled-components, is that it's tightly coupled with material ui.

export const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 0 0 16px 0;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
