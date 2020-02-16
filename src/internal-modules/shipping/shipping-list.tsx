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
import {Slot} from '../../core/components/slot/slot'
import Extensions from '../../core/registries/extension-registry';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%"
    },
    box: {
      width: "100%"
    }
  })
);

export function ShippingList() {
  const classes = useStyles();
  const shippings = useSelector(state => state.shipping.methods.active);
  const checked = useSelector(state => state.shippings?.selected);
  const setShippingMethod = useDispatch();

  const handleToggle = (id: string) => {
    return async () => {
      const extensions = Extensions.ShippingList.extensions() as any[];
      const results = [];
      
      for (const extension of extensions) {
        const supportedMethods = extension.getSupportedMethods();
        if (supportedMethods.indexOf(id) !== -1) {
          const result = await extension.canChange(id, checked);
          results.push(result);
          
        }
      }
      
      const canChange = results.reduce((a, b) => a && b, true);
      if (canChange) {
        setShippingMethod({ type: "SET_SHIPPING_METHOD", payload: id });
      }
    };
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h5" gutterBottom className={classes.box}>
        Shipping methods
      </Typography>

        <Paper>
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
                          matching={{ role: 'shipping-list-item-secondary'}}
                          exposedProps={{id: method.id, checked: method.id === checked}}
                        />
                      )}
                    />
                  </ListItem>
                ))}
            </List>
          </RadioGroup>
        </Paper>
    </Box>
  );
}

export function AddressBox(props: any) {
  const address = useSelector(store => store.shippings?.shipping_address);
  
  if (props.id !== 'couriermethod' || !props.checked || !address) {
    return null;
  }

  return (
    <Paper component={"span"} style={{width: '100%', display: 'inline-block'}}>
      {Object
        .entries(address)
        .map(entry => entry[1])
        .filter(v => !!v)
        .join(', ')
      }
    </Paper>
  );
}