import React, { useRef, useEffect} from "react";
import * as d3 from "d3";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GetDive from "./GetDiveData";

import IC from "./diagrams/4way/IC.png";
import OC from "./diagrams/4way/OC.png";
import PT from "./diagrams/4way/PT.png";
import TL from "./diagrams/4way/TL.png";

export default function DiveCard() {
  return (
    <div style={{ justifyItems: "center" }}>
      <Card  variant="outlined" orientation="horizontal" id="diveCard"
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
          <DisplayDive id="displayDive" />
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
    // const dive = GetDive()
    const dive = ["M", "1"]
    const formattedDive = typeof(dive) == 'object' ? dive.join("-") : ''
    const filteredArray = dive.map((item) => (item = images.find(image => image.key === item)));

    // return ( <p>{formattedDive}</p>)
    return (
      <>
        <p>{formattedDive}</p>
        <ImageList cols={dive.length} gap={4} sx={{ marginBottom: 0 }}>
            {filteredArray.map((item) => (
                <ImageListItem key={item.key} sx={{ border: 1 }} style={{height: "fit-content"}}>
                Diagram({item})
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

const Diagram = ({item}) => {
  const ref = useRef()

  useEffect(() => {
    const data = [
      { image: TL, x: 30, y: 40, r: 45, size: 50 },
      { image: PT, x: 65, y: 25, r: 135, size: 50 },
      { image: OC, x: 80, y: 60, r: 225, size: 50 },
      { image: IC, x: 45, y: 75, r: 315, size: 50 }
  ];

    const svg = d3.select(ref.current)
            .append("svg")
            .attr("style", "border: 1px solid; padding: 16px; margin: 16px")
            .attr("id", item.key)

        svg.selectAll("image")
            .data(data)
            .enter()
            .append("image")
            .attr("xlink:href", d => d.image)
            .attr("style", d => imageStyle(d))
            .attr("width", d => d.size)
            .attr("height", d => d.size)
            .attr("class", "image-element");
  }, [])

  // return (
  //   <svg
  //     ref={ref}
  //   />)
}

const imageStyle = (d) => {

  // let top = "top: " + d.size/2 + "px;";
  // let left = "left: " + d.size/2 + "px;";
  // let translate = "transform: rotate(" + d.r + "deg);";
  let translate = "transform: translate(" + d.x + "px," + d.y + "px) rotate(" + d.r + "deg);";

  return translate
}


{/* <svg><image xlink:href="/daily-dive/static/media/TL.ee616aa65328beb57a1a.png" style="transform: translate(30px,40px) rotate(45deg);" width="50" height="50" class="image-element"></image><image xlink:href="/daily-dive/static/media/OC.007a0c2adca860a821c9.png" style="transform: translate(65px,25px) rotate(135deg);" width="50" height="50" class="image-element"></image><image xlink:href="/daily-dive/static/media/PT.dd42949fbf8d43e2c236.png" style="transform: translate(80px,60px) rotate(225deg);" width="50" height="50" class="image-element"></image><image xlink:href="/daily-dive/static/media/IC.e8dd1614fcd11d187244.png" style="transform: translate(46px,75px) rotate(315deg);" width="50" height="50" class="image-element"></image></svg> */}