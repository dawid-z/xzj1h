import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Slot } from '../../core/components/slot/slot'
import Extensions from '../../core/registries/extension-registry';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%"
    },
    box: {
      width: "100%",
      marginTop: theme.spacing(2)
    },
    paper: {
    }
  })
);

export function PaymentsList() {
  const classes = useStyles();
  const shippings = useSelector((state: any) => {
    const selected = state.shipping.methods.active.find((entry: any) => entry.id === state.shippings?.selected);
    if (selected) {
      return state.payments.methods.active.filter((entry: any) => selected.payments.indexOf(entry.id) > -1);
    }
    return [];
  });

  const checked = useSelector(state => state.shippings ?.selected);

  const handleToggle = (id: string) => {
    return async () => {};
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h5" gutterBottom className={classes.box}>
        Payment method
      </Typography>
      {checked && (
        <Paper className={classes.paper}>
          <RadioGroup name="shipping-method">
            <List className={classes.list}>
              {shippings &&
                shippings.map((method: any) => (
                  <ListItem
                    key={method.id}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(method.id)}
                  >
                    <ListItemIcon>
                      <Radio
                        edge="start"
                        checked={method.id === checked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": method.id }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={method.id}
                      primary={method.name}
                      secondary={(
                        <Slot
                          matching={{ role: 'payments-list-item-secondary' }}
                          exposedProps={{ id: method.id, checked: method.id === checked }}
                        />
                      )}
                    />
                  </ListItem>
                ))}
            </List>
          </RadioGroup>
        </Paper>
      )}
    </Box>
  );
}
