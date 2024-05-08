/**
 * Create App Bar navigation component with Material UI
 * - npm install @mui/material @mui/icons-material
 * 
 * Note: @emotion/react and @emotion/styled are required for the @mui/material package
 * - npm install @emotion/react @emotion/styled
 * 
 * Code copied directly from https://mui.com/material-ui/react-app-bar/
 * 
 * Contents of App.css and Index.css can be deleted in order to use Material UI styling
 */

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cool App
          </Typography>
          <Button component={Link} to="/" color="inherit">Posts</Button>
          <Button component={Link} to="/Comments" color="inherit">Comments</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
