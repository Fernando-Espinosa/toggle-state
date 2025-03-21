import React from 'react';
import { Container } from '@mui/material';
import { ButtonBox, StyledGrid } from '../../App.styles';
import { ClearLocalStorageButton } from '../../components/ClearLocalStorage';
import { GridItem } from '../../components/GridItem';
import ToggleInfoDialog from '../../components/Info';

const ToggleStatePage = () => {
  // In a real app, we usually get options from an endpoint, and are dynamic not hard coded
  // so the example below is used to reflect a mock of how an endpoint response would look.
  const row1 = [
    { id: 'test1', content: 'test1' },
    { id: 'test2', content: 'test2' },
    { id: 'test3', content: 'test3' },
    { id: 'test4', content: 'test4' },
    { id: 'test5', content: 'test5' },
    { id: 'test6', content: 'test6 - Example Error' },
  ];

  const row2 = [
    { id: 'test7', content: 'test7' },
    { id: 'test8', content: 'test8' },
  ];

  return (
    <Container sx={{ mt: 3 }}>
      <ButtonBox>
        <ToggleInfoDialog />
        <ClearLocalStorageButton />
      </ButtonBox>

      <StyledGrid container spacing={2} id="group1">
        <GridItem key="info" id={'infoCard'} content={'info'} />

        {row1.map((item) => (
          <GridItem key={item.id} id={item.id} content={item.content} />
        ))}
      </StyledGrid>
      <StyledGrid container spacing={2} id="group2">
        {row2.map((item) => (
          <GridItem key={item.id} id={item.id} content={item.content} />
        ))}
      </StyledGrid>
    </Container>
  );
};

export default ToggleStatePage;
