import React from 'react';
import {useEffect, useRef} from 'react';
import algosdk from 'algosdk';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { axios } from './base';
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

export default function UserProfile(props) {
  const {classes, db, user, cheerio} = props;
  let [profileJsx, setProfileJsx] = React.useState('');
  let [analysisJsx, setAnalysisJsx] = React.useState('');
  let [userData, setUserData] = React.useState({});
  let [mnemonicBox, setMnemonicBox] = React.useState(false);
  let [mnemonic, setMnemonic] = React.useState('');


  console.log(user);
  const keyWordsMap = {
    "name" : "Name",
    "accountAddress" : "Account Address",
    "company" : "Company",
    "position" : "Position",
    "yoe" : "Years of Experience",
    "salary" : "Salary ($/year)"
  }

  //from ZipRecruiter
  const avgSalaries = {
    "software engineer" : 98495,
    "senior software engineer": 118706,
    "software developer": 85929,
    "senior software developer": 109921,
    "hardware engineer": 102037,
    "senior hardware engineer": 118563,
    "ux designer": 97873,
    "senior ux designer": 118242,
    "cloud engineer": 129567,
    "senior cloud engineer": 141706,
    "front end engineer": 111789,
    "senior front end engineer": 132069,
    "engineer": 73081,
    "senior engineer": 104865
  }

  let userRef = db.collection('users').doc((user.email).split('.').join(''));

  const mounted = useRef();
  useEffect(() => {
      if (!mounted.current && profileJsx == '') {
          renderProfile();
      } 
      if (analysisJsx == '') {
        renderAnalysis();
      }
  });
  
  const renderProfile = async () => {
    if (!user) return;
    let jsx = [];
    let getDoc = await userRef.get()
    .then(async (doc) => {
      if (!doc.exists) {
        return <>Profile not found. </>;
      } else {
        const data = doc.data();
        setUserData(data);
        for (var a in keyWordsMap) {
          console.log(keyWordsMap[a], data[a]);
          jsx.push(<span className='profileEntry' key={a}>{keyWordsMap[a]} : <b>{data[a]}</b>  <br></br></span>)
        }

      }
      setProfileJsx(jsx);
      renderAnalysis();
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  const renderAnalysis = async () => {
    const { position = '', yoe = '', salary = '', accountAddress = '' } = userData;
    const avgSalary = avgSalaries[position.toLowerCase()] || 56516; //or average US salary
    const jsx = [];
    const absDiff = Math.abs(salary - avgSalary);
    const more = (salary - avgSalary) > 0;
    jsx.push(<>You are making <b>${absDiff}</b> {more ? 'more' : 'less'} than what an average {avgSalaries[position.toLowerCase()] ? position.toLowerCase() : 'worker'} makes in the United States. </>);
    if (!more) {
      if (yoe >=2 && yoe < 3) {
        jsx.push(<>Given your years of experience, you should aim for a promotion and a raise soon if circumstances permit. </>);
      } else if (yoe >= 3) {
        jsx.push(<>Given your years of experience, you should ask for a promotion and a raise soon if circumstances permit. </>);
      } else if (yoe > 5) {
        jsx.push(<>Given your ample experience as a {position.toLowerCase()}, it is definitely time for a promotion and a raise if you have not gotten one recently. </>);
      }
      if (avgSalaries["senior " + position.toLowerCase()]) {
        const seniorDiff = avgSalaries["senior " + position.toLowerCase()] - salary;
        jsx.push(<>You could be making <b>${seniorDiff}</b> more as a senior {position.toLowerCase()}. 
        Don't be afraid to bring up your career goals and aspirations, there may be people who can help get you there.
         You can do it!<br></br><br></br>
        Fun fact: Studies found that you are likely to get more promotions at the age of 
        25 and 30 years old than any other age group.</>);
      }
    } else {
      jsx.push(<>Keep up the good work! Think about how you can elevate others and help them get to where you are today. </>);
    }
    console.log(userData);
    setAnalysisJsx(jsx);
  }

  const algoexplorerUrl = "https://testnet.algoexplorer.io/address/" + userData.accountAddress;

  async function reportSalaryToBlockchain() {
    const objToSend = {
      "position" : userData.position,
      "yearsOfExperience" : userData.yoe,
      "gender" : userData.gender,
      "salary" : userData.salary
    }
    var secret_key = algosdk.mnemonicToSecretKey(mnemonic);
    const txn = { 
      "to": "43DYQRD5K5QWVUALPG25XHT5KR3FXUUBX3MABK7CVFMZEMIZAL5WRRIFMI",
      "fee": 0,
      "amount": 100000,
      "firstRound": 51,
      "lastRound": 61,
      "genesisID": "devnet-v33.0",
      "genesisHash": "JgsgCaCTqIaLeVhyL6XlRu3n7Rfk2FxMeK+wRSaQ7dI=",
      "closeRemainderTo": "IDUTJEUIEVSMXTU4LGTJWZ2UE2E6TIODUKU6UW3FU3UKIQQ77RLUBBBFLA",
      "note": algosdk.encodeObj(objToSend)
    };
    var signedTxn = algosdk.signTransaction(txn, secret_key.sk);
  }

  return (
    <><Grid container spacing={4}><Grid item key="userProfile" xs={12} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <div className="app-box">
                            <div className='app-box-title'>User Profile</div>
                              <div className='app-box-content'>{profileJsx}
                              {(!mnemonicBox && user && !user.onchain) ?  <>
                              <div className='margintop2'>Sharing your salary is anonymous on the Algorand blockchain as long as you do not reveal your account address to anyone.
                                 Only the following fields will be shared: your gender, position, years of experience, and salary. Sharing your salary will help promote wage equality, and help
                                  others with making their job decisions.
                              </div>
                              <Button className='app-button' onClick={() => { setMnemonicBox(true)}
                                                        }  variant="contained" color="primary" className={classes.button}> Share your salary on-chain</Button></> : null}
                              {mnemonicBox && (
                                <>
                                <div>
                                <span className='margintop2'>First, visit <a href="https://bank.testnet.algorand.network/" target="_blank">the Algorand dispenser</a> to get some Algos for this blockchain transaction. 
                                Copy your account address shown above into the target address field on the dispenser page, complete the CAPTCHA and dispense. To check if the transaction was successful, 
                                <a href={algoexplorerUrl} target="_blank"> visit this link to the Algoexplorer</a>. You should have a balance of 100 Algos (it might take a minute).</span></div>
                                <TextField 
                                    placeholder="Enter your private key (mnemonic phrase)"
                                    multiline={true}
                                    rows={2}
                                    rowsMax={4}
                                    onChange={ (event) => {setMnemonic(event.target.value) }}
                                    margin="normal"
                                    variant="outlined"
                                  /><br></br>
                                  <Button className='app-button' onClick={() => { }
                                }  variant="contained" color="primary"  onClick={() => { reportSalaryToBlockchain()}} className={classes.button}> Submit</Button>&nbsp;&nbsp;&nbsp;
                                <Button className='app-button' onClick={() => { setMnemonicBox(false)}
                                                        }  variant="contained" color="primary" className={classes.button}> Cancel</Button></>
                              )}
                              </div>
                        </div>
                    </div>
                  </Card>
      </Grid>
      <Grid item key="profileAnalysis" xs={12} md={6}>
                        <Card className={classes.card}>
                          <div className={classes.cardDetails}>
                              <div className="app-box">
                                  <div className='app-box-title'>Performance Analysis</div>
                                    <div className='app-box-content no-word-break'>{analysisJsx}</div>
                                    <a href="https://testnet.algoexplorer.io/address/43DYQRD5K5QWVUALPG25XHT5KR3FXUUBX3MABK7CVFMZEMIZAL5WRRIFMI" target="_blank">Browse others' salaries on-chain</a>
                              </div>
                          </div>
                        </Card>
      </Grid></Grid></>
  );
}