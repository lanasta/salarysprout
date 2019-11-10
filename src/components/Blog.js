import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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


const sections = [
];

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
];

const posts = [post1, post2, post3];

const archives = [
  'March 2020',
  'February 2020',
  'January 2020',
  'December 2019',
  'November 2019',
  'October 2019',
  'September 2019',
  'August 2019',
  'July 2019',
  'June 2019',
  'May 2019',
  'April 2019',
];

const social = ['GitHub', 'Twitter', 'Facebook'];

export default function Blog() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
          <div className="app-logo">
            salarysprout<i class="fas fa-leaf"></i>
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
              <Grid md={6} >
                <div className='app-slogan'>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
              <><Grid item key="waa" xs={12} md={6}>
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
                            label="Name"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Company"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Position"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Gender"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Years of Experience"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Salary"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                            <Button className='app-button' variant="contained" color="primary" className={classes.button}> Sign up</Button>
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
              </Grid>
              <Grid item key="woo" xs={12} md={6}>
              <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <input type='text'></input>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://unsplash.com/photos/dZxQn4VEv2M"
                      title="Image title"
                    />
                  </Hidden>
                </Card>
              </CardActionArea>
            </Grid></>
          </Grid>
          {/* End sub featured posts */}
        </main>
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Built by Anastasia, Angelina, Arfa and Sam at Technica 2019
          </Typography>
        </Container>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}