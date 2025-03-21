import { Button } from '@mui/material';

// Button component to clear localStorage, acting as a local DB reset.
export const ClearLocalStorageButton = () => {
  const handleClear = () => {
    localStorage.clear();
    alert('Local storage cleared!');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClear}
      sx={{ mb: 2 }}
    >
      Clear Local Storage
    </Button>
  );
};
