import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function DiveCard() {
  return (
    <div style={{ margin: "30px 15% 0 15%" }}>
      <Card  variant="outlined" orientation="horizontal"
        sx={{
          minHeight: '280px',
          minWidth: 500,
          backgroundColor: '#fff',
          borderColor: '#000',
        }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            4way - Open/Advanced
          </Typography>
          <Typography variant="body1" sx={{margin: "0 0 5px 0"}}>
            Here's the dive - need the generator function

          </Typography>
          <DisplayDive />
        </CardContent>
      </Card>
    </div>
  );
}

function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { 
        images.push({img: r(item), key: item.replace('./', '').replace('.png', '')})
    });
    return images;
}
const images = importAll(require.context('./diagrams/4way', false, /\.(png|jpe?g|svg)$/));

function DisplayDive() {
    const dive = ['1','2','3']
    //,'4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22'];

    const filteredArray = dive.map((item) => (item = images.find(image => image.key === item)));

    return (
        <ImageList cols={4} gap={4} variant="masonry">
            {filteredArray.map((item) => (
                <ImageListItem key={item.key} sx={{ border: 1 }}>
                <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

function GenerateDive() {
    const formations = [
        { formation: "A", score: 1}
    ]

    const c = formations.length;
    const random = new random();
    while(c>0){
        const r = random.nextInt(c--);
        const card = formations.get(r);
        formations.remove(r);
    }
}