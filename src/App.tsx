import * as React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Slot } from "./core/components/slot/slot";
import store from "./core/redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    center: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Slot matching={{ locations: ["Page:Header", "Checkout:Header"] }} />
          <Container maxWidth="xl" className={classes.center}>
            <Grid container spacing={3}>
              <Grid container item xs={12} sm={8}>
                <Slot matching={{ location: "Checkout:Main" }} />
              </Grid>
              <Grid container item xs={12} sm={4}>
                <Slot matching={{ location: "Checkout:Sidebar" }} />
              </Grid>
            </Grid>
          </Container>
          <Grid container>
            <Grid container item xs={12}>
              <Slot
                matching={{ locations: ["Page:Footer", "Checkout:Footer"] }}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    </Provider>
  );
}
