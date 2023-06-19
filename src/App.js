import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const API_URL = `https://api.api-ninjas.com/v1/cats`;
const IMG_SIZE = "23rem";

function App() {
  const [cats, setCats] = useState([]);

  const sortBy = (a, b, key) => {
    if (!Object.hasOwn(a, key) || a[key] < b[key]) {
      return 1;
    } else if (!Object.hasOwn(b, key) || a[key] > b[key]) {
      return -1;
    }
    return 0;
  };

  const sortCatsBy = (key) => {
    const sortedCats = [...cats];
    sortedCats.sort((a, b) => {
      return sortBy(a, b, key);
    });
    setCats(sortedCats);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(API_URL, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        params: {
          family_friendly: 4,
        },
      });

      const dataWithId = data.map((cat, index) => {
        return { ...cat, id: index };
      });
      setCats(dataWithId);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>PUCRS | MEMES | 2023</h1>
      <h3>Marco Goedert, Fernando Elger e Aloísio Bastian</h3>
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {cats.length > 0 &&
            cats.map((cat) => (
              <Card key={cat.id} sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  image={cat.image_link}
                  alt="cat"
                  sx={{ width: IMG_SIZE, height: IMG_SIZE }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {cat.id}: {cat.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Origin: {cat.origin}
                    </Typography>
                    <CardActionArea onClick={() => sortCatsBy("meowing")}>
                      <Typography variant="body2" color="text.secondary">
                        Meowing: {cat.meowing}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("intelligence")}>
                      <Typography variant="body2" color="text.secondary">
                        Intelligence: {cat.intelligence}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("children_friendly")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Children Friendly: {cat.children_friendly}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("family_friendly")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Family Friendly: {cat.family_friendly}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("general_health")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        General Health: {cat.general_health}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("grooming")}>
                      <Typography variant="body2" color="text.secondary">
                        Grooming: {cat.grooming}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("max_life_expectancy")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Max Life Expectancy: {cat.max_life_expectancy}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("max_weight")}>
                      <Typography variant="body2" color="text.secondary">
                        Max Weight: {cat.max_weight}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("min_life_expectancy")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Min Life Expectancy: {cat.min_life_expectancy}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("min_weight")}>
                      <Typography variant="body2" color="text.secondary">
                        Min Weight: {cat.min_weight}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea
                      onClick={() => sortCatsBy("other_pets_friendly")}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Other Pets Friendly: {cat.other_pets_friendly}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("playfulness")}>
                      <Typography variant="body2" color="text.secondary">
                        Playfulness: {cat.playfulness}
                      </Typography>
                    </CardActionArea>
                    <CardActionArea onClick={() => sortCatsBy("shedding")}>
                      <Typography variant="body2" color="text.secondary">
                        Shedding: {cat.shedding}
                      </Typography>
                    </CardActionArea>
                  </CardContent>
                </Box>
              </Card>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
