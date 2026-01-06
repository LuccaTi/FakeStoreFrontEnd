import { Card, CardContent, Typography, Box, Button, CardActions } from '@mui/material';

function SummaryCard({ icon, title, value, color = 'grey.300', onNavigate }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ 
          bgcolor: color, 
          p: 2, 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mr: 2
        }}>
          {icon}
        </Box>
        <Box>
          <Typography color="text.secondary">{title}</Typography>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" onClick={onNavigate}>Ver Detalhes</Button>
      </CardActions>
    </Card>
  );
}

export default SummaryCard;