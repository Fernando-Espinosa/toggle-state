import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

function ToggleInfoDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        <InfoIcon sx={{ mr: '4px' }} /> IMPORTANT INFORMATION
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">Project Information</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            1. This is to solve question 4. To emulate a database locally, we
            utilize the browser's local storage.
          </Typography>
          <Typography gutterBottom>
            2. Each time a user toggles a card, the updated state is saved in
            local storage. This data persists until the cache is cleared or the
            local storage is manually reset.
          </Typography>
          <Typography gutterBottom>
            3. We implement an optimistic update strategy to provide immediate
            feedback, ensuring a seamless and responsive user experience. With
            this approach, the UI instantly reflects changes, and if an update
            fails, it reverts to the previous state to maintain data integrity.
          </Typography>
          <Typography gutterBottom>
            4. For demonstration purposes, try toggling Card 6 to see an error
            scenario in action.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ToggleInfoDialog;
