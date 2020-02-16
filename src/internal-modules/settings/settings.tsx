import React from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Portal from "@material-ui/core/Portal";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "300px"
    }
  })
);

export function ToggleRegions() {
  const toggle = useDispatch();
  const store = useStore() as any;
  const [checked, setChecked] = React.useState(
    store.getState().config.regions_visible
  );
  const classes = useStyles();

  const handleChange = (evt: any, value: boolean) => {
    setChecked(value);
    toggle({ type: "TOGGLE_REGION_VISIBLE", payload: value });
  };

  return (
    <List className={classes.list}>
      <ListItem>
        <ListItemText id="switch-regions" primary="Show Regions" />
        <ListItemSecondaryAction>
          <Switch
            id={"switch-regions"}
            color="primary"
            checked={!!checked}
            onChange={handleChange}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

function SettingsPanel() {
  const open = useSelector(state => {
    return state.settings_visible;
  });
  const close = useDispatch();
  const container = React.useRef(null);

  const handleClose = () => {
    close({ type: "TOGGLE_SETTINGS_PANEL", payload: false });
  };

  return (
    <Portal container={container.current}>
      <Dialog open={open} onClose={() => {}}>
        <ToggleRegions />
      </Dialog>
    </Portal>
  );
}

export function SettingsButton() {
  const [open, setOpen] = React.useState(false);
  const [populated, setPopulated] = React.useState(false);
  const toggleSettings = useDispatch();
  const store = useStore();

  const handleClick = () => {
    const nextState = !open;
    setOpen(nextState);
    toggleSettings({ type: "TOGGLE_SETTINGS_PANEL", payload: nextState });
  };

  return (
    <IconButton onClick={handleClick}>
      <SettingsIcon />
      {open && <SettingsPanel />}
    </IconButton>
  );
}
