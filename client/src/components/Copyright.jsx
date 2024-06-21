import { Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
    >
      Copyright © Ayush Gupta {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
