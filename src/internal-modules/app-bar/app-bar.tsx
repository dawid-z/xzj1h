import * as React from "react";
import { useDispatch, useStore } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Slot } from "../../core/components/slot/slot";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export function Appbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" color={"transparent"}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Slots - PoC
        </Typography>
        <Slot
          matching={{
            locations: ["Page:Header", "Checkout:Header"],
            role: "action-button"
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
