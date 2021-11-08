import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
  
export default function SingleCard() {
  return (
    <div style={{}}>
      <h4>🧢</h4>
      <Card
        style={{
          width: '330px',
          height: '351px',
          backgroundColor: 'white',
          borderRadius: '20px',
        }}
      >
        <CardContent  style={{
          padding: '0px'
        }}>
        <img src={figmaimage1} alt="prisoner art" />
          <Typography variant="h5" component="h2"
            style={{
              fontFamily: '',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '20px',
            }}
            color='black'>
            Title
          </Typography>
          
          <Typography
            style={{
              marginBottom: 12,
              fontFamily: 'open-sans',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
            }}
            color="#000000"
          >
            Author
          </Typography>

          
          <Typography
            style={{
              marginBottom: 12,
              fontFamily: 'open-sans',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '12px',
            }}
            color="#828282"
          >
            Date
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small">button.....</Button>
        </CardActions>
      </Card>
    </div>
  );
}