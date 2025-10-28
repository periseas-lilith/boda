import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function AppBarNav({ whatsappUrl, onGo }) {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter:'blur(6px)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow:1, fontFamily:'Dancing Script, cursive' }}>Aidali & Jorge</Typography>
        <Box sx={{ display:{ xs:'none', sm:'block' } }}>
          <Button onClick={()=>onGo('#ceremonia')}>Ceremonia</Button>
          <Button onClick={()=>onGo('#recepcion')}>Recepción</Button>
          <Button onClick={()=>onGo('#religiosa')}>Religiosa</Button>
        </Box>
        <Button variant="contained" color="primary" href={whatsappUrl} target="_blank">RSVP</Button>
      </Toolbar>
    </AppBar>
  )
}
