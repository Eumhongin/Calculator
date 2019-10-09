const functions = require('firebase-functions');
const express = require('express');
const tools = require('./module/mod')
const fire = require('./module/fire')
const app = express();
var bodyParser = require('body-parser')

// app.set('images', 'images')
// app.set('views', 'views')
app.set('view engine', 'ejs')
app.use('/f', express.static(__dirname + '/module'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
let paymentDutToDate = 15;
let creditCardCycle = 2;
var firebaseConfig = {
  apiKey: "AIzaSyDz3I3Am3Mf9d-tVXPsvt7rhtGW_whbcZ8",
  authDomain: "calculator-d5bb6.firebaseapp.com",
  databaseURL: "https://calculator-d5bb6.firebaseio.com",
  projectId: "calculator-d5bb6",
  storageBucket: "",
  messagingSenderId: "906615886232",
  appId: "1:906615886232:web:df634cc4926d39c9"
};

let firebase = require('firebase')
firebase.initializeApp(firebaseConfig)


// tools.setFirebase(firebase)
const database = firebase.database();




// app.get('/getlist',(req,res) => {
//   database.ref().once('value').then(snapshot => {
//     return res.json(snapshot.val())
//   })
// })

app.get('/', (req, res) => {
  
  res.render('index', {
    title: 'Express',
    
  })
  // fire.displayFirebase(database)

})

app.get('/helloworld',(req,res,next) => {
 res.json({
   msg : "helloworld!!"
 })
})


app.get('/total',(req,res) => {
  let objs = [];
  let sum = 0;
  database.ref('2019').once('value').then((snapshot) => {
    snapshot.forEach((month)=> {
      month.forEach((payment)=>{
        payment.forEach((day) => {
          // console.log(items.val());
          day.forEach((items) => {
            objs.push({
              desc: items.val().SpentMoneyDescription,
              money: parseInt(items.val().SpentMoney)
            })
            sum += parseInt(items.val().SpentMoney)
          })
      
        })
      })
    })
    return true
  }).then(() => {
    // return true
 

    console.log(jsFriendlyJSONStringify(objs))
    return res.render('total', {
      title: 'Express',
      obj: objs,
      testobj: jsFriendlyJSONStringify(objs),
      sum : sum

    })
  }).catch(err => {
    return res.json({err : err.code})
  })
})



app.post('/CreateMoneyCell', (req, res) => {
  const date = new Date();
  let yearToMove, monthToMove, dayToMove;
  let originalYear = date.getFullYear()
  let originalMonth = 1 + date.getMonth()
  let originalDate = date.getDate()
  let TotalSpreadOut;
  let holdingSpreadOut;
  yearToMove = originalYear;
  monthToMove = originalMonth;
  dayToMove = originalDate;

  let isSpreadOut = req.body.SpentMoneySpreadOut !== '' && req.body.SpentMoneySpreadOut > 0 ? true : false;
  let MoneyInfo = {
    //년 월 일 금액 할부 어디에썼는지 작성자 수정됬는지 timestamp
    SpentYear: date.getFullYear(),
    SpentMonth: date.getMonth() + 1,
    SpentDay: date.getDate(),
    SpentMoneyPlace: req.body.SpentMoneyPlace,
    SpentMoney: req.body.SpentMoney,
    SpentMoneyDescription: req.body.SpentMoneyDescription,


  }
  // 할부일때랑 할부아닐때랑.
  if (isSpreadOut) {


    //할부 개월수 달아주고
    MoneyInfo.SpreadOut = req.body.SpentMoneySpreadOut
    TotalSpreadOut = MoneyInfo.SpreadOut;
    holdingSpreadOut = MoneyInfo.SpreadOut;
    // 할부 개월수 만큼 update해주고
    //원금을 할부 개월수만큼 나눠주고.
    console.log(typeof (MoneyInfo.SpreadOut));

    const DividedMoneyBySpreadOut = parseInt(MoneyInfo.SpentMoney / MoneyInfo.SpreadOut)
    // Object에 넣어주고.
    MoneyInfo.SpreadOutMoney = DividedMoneyBySpreadOut



    console.log(`할부 개월수 : ${MoneyInfo.SpreadOut}개월`);
    console.log(`달마다 내야하는 돈  : ${DividedMoneyBySpreadOut}원`)

    for (let index = 0; index < TotalSpreadOut; index++) {

      if ((originalMonth + index) / 12 !== 0 && (originalMonth + index) % 12 === 0) {
        yearToMove++
        database.ref(`${yearToMove}/1/SpreadOutPayment/${dayToMove}`).once('value').then(snapshot => {
          MoneyInfo.SpreadOut = holdingSpreadOut-1;
          if (snapshot.exists()) {
            snapshot.ref.update({
              [snapshot.numChildren()]: MoneyInfo
            })
          } else {
            snapshot.ref.update({
              0: MoneyInfo
            })
          }
          holdingSpreadOut -= 1;
          return true;
        }).then(() => {
          if (holdingSpreadOut === 1) {
            res.send('<script>alert("Success!!");location.href="./";</script>')

          }
          return true;
        }).catch(err => {
          return res.status(400).json({
            err: err.code
          })
        })
      } else {
        database.ref(`${yearToMove}/${(originalMonth+index)% 12 + 1}/SpreadOutPayment/${dayToMove}`).once('value').then(snapshot => {
            MoneyInfo.SpreadOut = holdingSpreadOut-1;
            if (snapshot.exists()) {
              snapshot.ref.update({
                [snapshot.numChildren()]: MoneyInfo
              })
            } else {
              snapshot.ref.update({
                0: MoneyInfo
              })
            }
            holdingSpreadOut -= 1;
            return true;
          }).then(() => {
            if (holdingSpreadOut === 1) {
              res.send('<script>alert("Success!!");location.href="./";</script>')

            }
            return true;
          })
          .catch(err => {
            return res.status(400).json({
              err: err.code
            })
          })
      }


    }



  } else {
    console.log(yearToMove)
    console.log(monthToMove)
    database.ref(`${yearToMove}/${monthToMove}/DirectPayment/${dayToMove}`).once('value').then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.numChildren());

          snapshot.ref.update({
            [snapshot.numChildren()]: MoneyInfo
          })
        } else {
          snapshot.ref.update({
            0: MoneyInfo
          })


        }


        return res.send('<script>alert("Success!!");location.href="./";</script>')

      })
      .catch(err => {
        return res.status(400).json({
          err: err.code
        })
      })
  }

})


function jsFriendlyJSONStringify(s) {
  return JSON.stringify(s).
    replace(/\\r/g, ' ')
}

exports.api = functions.https.onRequest(app)