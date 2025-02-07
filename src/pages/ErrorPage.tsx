import React from "react";
import { Link } from "react-router";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";

const ErrorPage: React.FC = () => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
    }}
  >
    <CardHeader
      title="Błąd autentykacji"
      titleTypographyProps={{ component: "h1" }}
    />
    <CardContent>
      <Typography gutterBottom>Nie masz dostępu do tej strony</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary" component={Link} to="/">
        Wróć na stronę główną
      </Button>
    </CardActions>
  </Card>
);

export default ErrorPage;
