import React from 'react';
import {useEffect, useRef} from 'react';
import algosdk from 'algosdk';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fbase } from './base';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Markdown from './Markdown';
import TextField from '@material-ui/core/TextField';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import '../css/style.css'; // Tell Webpack that Button.js uses these styles
import { blockStatement } from '@babel/types';

const db = fbase.firestore();
const useStyles = makeStyles(theme => ({
  formControl : {
    display: 'block',
    width: 160
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://unsplash.com/photos/dZxQn4VEv2M)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

export default function Blog() {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [yoe, setYoe] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [salary, setSalary] = React.useState('');
  const [signUpEnabled, setSignUpEnabled] = React.useState(false);
  const [newUserData, setNewUserData ] = React.useState({});

  const [siEmail, setSiEmail] = React.useState('');
  const [siPassword, setSiPassword] = React.useState('');
  const [signInEnabled, setSignInEnabled] = React.useState(false);

  const [signUpFeedback, setSignUpFeedback] = React.useState(null);
  const [signUpSuccess, setSignUpSuccess] = React.useState(false);


    const createUser = () => {
        console.log(email, password);
        fbase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            setSignUpSuccess(false);
            renderSignUpFeedback(null, null, errorMessage);
            return;
        });
        setSignUpSuccess(true);
        var keys = algosdk.generateAccount();
        var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
        newUserData.accountAddress = keys.addr;
        addUserToDatabase(newUserData);
        renderSignUpFeedback(keys.addr, mnemonic, null);
    }

    const addUserToDatabase = (newUserData) => {
        const userRef = db.collection("users").add(newUserData);  
    }

    const userSignIn = () => {
        fbase.auth().signInWithEmailAndPassword(siEmail, siPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const renderSignUpFeedback = (accountAddress, privateKey, errorMessage) => {
        if (!signUpSuccess) {
            setSignUpFeedback(<>{errorMessage}</>);
        } else {
            setSignUpFeedback(<>Success! Your account address is {accountAddress}. Please copy and save this private key save as this is the last time you will have access to it:
            <br>{privateKey}</br></>);
        }
    }

    const isUserSignedIn = () => {
    fbase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('ye');
        } else {
          console.log('no');
        }
      });
}

  const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) {
        mounted.current = true;
    } else {
        // do componentDidUpate logic
        setSignUpButtonState();
        setSignInButtonState();  
        isUserSignedIn();
    }
    });

  const setSignUpButtonState = () => {
    if (!signInEnabled && password != '' && password == password2 && email != '' && name != '' && company != ''
    && yoe != '' && gender != '' && phone != '' && position != '' && salary != '') {
        const user = {
            "email" : email,
            "name" : name,
            "company" : company,
            "yoe" : yoe,
            "gender" : gender,
            "phone" : phone,
            "position" : position,
            "salary": salary
        }
        setNewUserData(user);
        setSignUpEnabled(true);
    } else {
        setSignUpEnabled(false);
    }
  };

  const setSignInButtonState = () => {
    if (siPassword != '' && siEmail != '' && !signUpEnabled) {
        setSignInEnabled(true);
    } else {
        setSignInEnabled(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
          <div className="app-logo">
            salarysprout<i className="fas fa-leaf"></i>
          </div>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: 'none' }}
                src="https://unsplash.com/photos/dZxQn4VEv2M"
                alt="background"
              />
            }
            <div />
            <Grid container className="app-intro">
              <Grid >
                <div className='app-slogan'>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
              <><Grid item key="signUp" xs={12} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <div className="app-box">
                            <div className='app-box-title'>Sign Up</div>
                            <div className='app-box-blurb'>When you sign up for an account, an account 
                            address and a private key in the form of a mnemonic phrase will be generated for you. Please keep your private key
                            safe and sound as we do not keep your private key, and 
                            this will be the only time that you will see it. </div>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            id="filled-password-input"
                            label="Password (min 6 characters)"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            />  
                        <TextField
                            id="filled-password-input"
                            label="Confirm Password (min 6 characters)"
                            className={classes.textField}
                            onChange={(event) => {
                                setPassword2(event.target.value);
                            }}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            />  
                        <TextField
                            required
                            id="outlined-required"
                            label="Phone Number"
                            onChange={(event) => {
                                setPhone(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Company"
                            onChange={(event) => {
                                setCompany(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Position"
                            onChange={(event) => {
                                setPosition(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Gender"
                            onChange={(event) => {
                                setGender(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            onChange={(event) => {
                                setYoe(event.target.value);
                            }}
                            label="Years of Experience"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Salary ($/year)"
                            onChange={(event) => {
                                setSalary(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                            <Button className='app-button' onClick={() => {
                                                            createUser()
                                                            }
                                                        }  variant="contained" disabled={!signUpEnabled} color="primary" className={classes.button}> Sign up</Button>
                              </div>
                            {signUpFeedback &&
                            <div className={`app-box-blurb signUp-feedback ${signUpSuccess ? 'positiveFeedback' : 'negativeFeedback'}`}>{signUpFeedback}</div>}
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://unsplash.com/photos/dZxQn4VEv2M"
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
              </Grid>
              <Grid item key="signIn" xs={12} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <div className="app-box">
                            <div className='app-box-title'>Sign In</div>
                        <TextField
                            required
                            id="outlined-required"
                            label="E-mail"
                            onChange={(event) => {
                                setSiEmail(event.target.value);
                            }}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            onChange={(event) => {
                                setSiPassword(event.target.value);
                            }}
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            />  
                        <Button className='app-button' disabled={!signInEnabled} 
                                                        onClick={() => {
                                                            userSignIn()
                                                            }
                                                        } 
                                                        variant="contained" 
                                                        color="primary" className={classes.button}>Sign in</Button>
                        </div>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://unsplash.com/photos/dZxQn4VEv2M"
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
              </Grid></>
          </Grid>
          {/* End sub featured posts */}
        </main>
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Built by Anastasia, Angelina, Arfa and Sam at Technica 2019 🚀
          </Typography>
        </Container>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}