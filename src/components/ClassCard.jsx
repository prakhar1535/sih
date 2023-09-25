import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';


const ClassCard = ({Class,singleClass,key}) => {
    const navigate=useNavigate()
    const courseDetailsViewHandler=(id)=>{
        navigate(`/teacher/allClasses/${id}`)

      }
  return (
    <Card key={key}  variant="outlined" style={{ width: '300px',height:'280px', margin: '10px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {Class.nameOfClass}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {Class.dateCreated}
          </Typography>
          <Typography variant="body2">
            {Class.students?Class.students.length:0} students
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>courseDetailsViewHandler(Class._id)} variant="contained" size="small">
            View Class Details
          </Button>
         

        </CardActions>
      </Card>
  )
}

export default ClassCard
