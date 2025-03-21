import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mock async function that simulates an API call to update toggle state
// Instead of a real network call, it saves the state to localStorage.
const updateToggleState = async ({ id, toggle }) => {
  console.log({ id });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate failure for card 6
      if (id === 'test6') {
        reject(new Error('Simulated error for card 6'));
      } else {
        try {
          localStorage.setItem(`toggleState-${id}`, JSON.stringify(toggle));
          resolve({ id, toggle });
        } catch (error) {
          reject(error);
        }
      }
    }, 500); // Simulated 500ms network delay
  });
};

// Creates a rotating arrow animation for the expand icon.
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const GridItem = ({ id, content }) => {
  const queryClient = useQueryClient();

  // Read the initial toggle state for this card from localStorage.
  // If there is no stored value, default to true.
  const initialToggle = (() => {
    const stored = localStorage.getItem(`toggleState-${id}`);
    return stored !== null ? JSON.parse(stored) : true;
  })();

  // Set up local UI state with the initial value from localStorage.
  const [expanded, setExpanded] = useState(initialToggle);

  // Sync the query cache with the initial state on mount.
  useEffect(() => {
    queryClient.setQueryData(['toggleState', id], initialToggle);
  }, [id, initialToggle, queryClient]);

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

  const mutation = useMutation({
    mutationFn: updateToggleState,
    // Before mutation: cancel outgoing queries, save previous value,
    // and optimistically update the cache with the new toggle state.
    onMutate: async ({ id, toggle }) => {
      await queryClient.cancelQueries(['toggleState', id]);
      const previousToggle = queryClient.getQueryData(['toggleState', id]);
      queryClient.setQueryData(['toggleState', id], toggle);
      return { previousToggle, id };
    },
    // If the mutation fails, rollback to the previous toggle state.
    onError: (error, variables, context) => {
      console.log({ context, error, variables });
      queryClient.setQueryData(
        ['toggleState', context.id],
        context.previousToggle
      );
      setExpanded(context.previousToggle);
      alert('Failed to update card state. Rolling back changes.');

      console.error('Error updating local DB:', error);
    },
    // After mutation, invalidate queries to ensure fresh data is fetched.
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(['toggleState', variables.id]);
    },
    onSuccess: (data) => {
      console.log('Local DB update successful:', data);
    },
  });

  // Toggle the local state and trigger the mutation.
  // The optimistic update ensures the UI is updated immediately.
  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    mutation.mutate({ id, toggle: newExpanded });
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card>
        <CardHeader
          title={`Card ${id}`}
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleToggle}
              aria-expanded={expanded}
              aria-label="toggle content"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{content}</CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
