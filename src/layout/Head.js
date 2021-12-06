import React, { useEffect, useState } from "react";
import {
  AppBar,
  createStyles,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as MaterialLink } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "./Menu";
const Headstyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: "relative",
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.grey["100"]}`,
      backgroundColor: "white",
    },
    inline: {
      display: "inline",
    },
    flex: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    productLogo: {
      display: "inline-block",
      borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
      marginLeft: 32,
      paddingLeft: 24,
      [theme.breakpoints.up("md")]: {
        paddingTop: "1.5em",
      },
    },
    tagline: {
      display: "inline-block",
      marginLeft: 10,
      [theme.breakpoints.up("md")]: {
        paddingTop: "0.8em",
      },
    },
    iconContainer: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    iconButton: {
      float: "right",
    },
    tabContainer: {
      marginLeft: 32,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    tabItem: {
      paddingTop: 20,
      paddingBottom: 20,
      minWidth: "auto",
    },
  })
);

const Head = (props) => {
  const classes = Headstyles();
  const [value, setValue] = useState(0);
  const [menuDrawer, setDrawer] = useState(false);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const mobileMenuOpen = (event) => {
    setDrawer(true);
  };

  const mobileMenuClose = (event) => {
    setDrawer(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const current = () => {
    if (props.currentPath === "/home") {
      return 0;
    }
    if (props.currentPath === "/dashboard") {
      return 1;
    }
    if (props.currentPath === "/signup") {
      return 2;
    }
    if (props.currentPath === "/wizard") {
      return 3;
    }
    if (props.currentPath === "/cards") {
      return 4;
    }
  };
  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <img
                    width={20}
                    src="https://via.placeholder.com/150"
                    alt="site logo"
                  />
                  <span className={classes.tagline}>DoorPicker</span>
                </Link>
              </Typography>
            </div>
            {!props.noTabs && (
              <React.Fragment>
                <div className={classes.productLogo}>
                  <Typography>A general marketplace for all</Typography>
                </div>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={mobileMenuOpen}
                    className={classes.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer
                    anchor="right"
                    open={menuDrawer}
                    onClose={mobileMenuClose}
                    onOpen={mobileMenuOpen}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, index) => (
                        <ListItem
                          component={item.external ? MaterialLink : Link}
                          href={item.external ? item.pathname : null}
                          to={
                            item.external
                              ? null
                              : {
                                  pathname: item.pathname,
                                  search: props?.location?.search,
                                }
                          }
                          button
                          key={item.label}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current() || value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {Menu.map((item, index) => (
                      <Tab
                        key={index}
                        component={item.external ? MaterialLink : Link}
                        href={item.external ? item.pathname : null}
                        to={
                          item.external
                            ? null
                            : {
                                pathname: item.pathname,
                                search: props.location?.search,
                              }
                        }
                        classes={{ root: classes.tabItem }}
                        label={item.label}
                      />
                    ))}
                  </Tabs>
                </div>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Head;
