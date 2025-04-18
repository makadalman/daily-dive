import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GetDive from "./GetDiveData";

export default function DiveCard() {
  return (
    <div style={{ justifyItems: "center" }}>
      <Card  variant="outlined" orientation="horizontal"
        sx={{
          minHeight: '200px',
          width: {
            lg: 800, // theme.breakpoints.up('lg')
            xl: 900, // theme.breakpoints.up('xl')
          },
          backgroundColor: '#fff',
          borderColor: '#000',
        }}>
        <CardContent>
          <Typography variant="body1" sx={{margin: "0 0 5px 0"}}>
            Here's the dive
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
    const dive = GetDive()
    
    const formattedDive = typeof(dive) == 'object' ? dive.join("-") : ''
    const filteredArray = dive.map((item) => (item = images.find(image => image.key === item)));

    // return ( <p>{formattedDive}</p>)
    return (
      <>
        <p>{formattedDive}</p>
        <ImageList cols={dive.length} gap={4} sx={{ marginBottom: 0 }}>
            {filteredArray.map((item) => (
                <ImageListItem key={item.key} sx={{ border: 1 }} style={{height: "fit-content"}}>
                <img
                    srcSet={`${item.img}?auto=format&dpr=2 2x`}
                    src={`${item.img}?auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{ objectFit: "contain" }}
                />
                </ImageListItem>
            ))}
        </ImageList>
      </>
    )
}
