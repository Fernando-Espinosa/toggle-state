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

  // const importantInfo = "Important Note: This update addresses the requirements of Question 4 in our coding challenge. To ensure a
  //         seamless user experience, we immediately persist the toggle state for
  //         each individual card as soon as it’s clicked. Since users expect rapid
  //         interactions without waiting for loading animations, we use an
  //         optimistic update strategy. With this approach, the UI reflects the
  //         expected state instantly, and if the underlying action fails, the
  //         state will revert to its previous setting. For demonstration purposes,
  //         please try toggling Card 6 to see how the error scenario is handled."

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
// The best way to save the toggle state to the database in React, is using a library like react-query
// It features:
// 1. Automatic caching: reduces redundant network requests.
// 2. Built-in error handling and retries: handles errors and can retry failed requests automatically.
// 3. Simplified asynchronous logic: manages loading, error, and success states seamlessly,

// IMPORTANT NOTE: This is to solve the question 4 from the coding challenge.
// Since we want to save the toggle state of each individual card, we need to do it whenever a toggle is clicked.
// But we cannot create a loading animation or do nothing, because it's a bad user experience and users
// expect immediate interactions, so in this case we apply an optimistic update.
// An optimistic update creates an action and if the action is succesful it does nothing (keep togle)
// but if it fails it rollsback to the previous state
