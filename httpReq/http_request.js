const axios = require('axios');

const url='http://localhost:3000/'

exports.demo= async (req, res) => {
axios.get(
  url,
  {headers: {
      "name" : "value"
    }
  }
)
.then((response) => {
    var response = response.data;
  },
  (error) => {
    var status = error.response.status
  }
);
}

var yourtoken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidW9rb3JvY2hhNzJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMlRYR2J4S1BQT3RJaHVKYllzb2dIdWNwdy5CbC93a0MxS1ppOG5BYTlVTHNDLlVXc3QubHkiLCJ1c2VyX25hbWUiOiJVZ29tYXJ0aW5zIiwiZmlyc3RfbmFtZSI6IlVnb2NodWt3dSIsImxhc3RfbmFtZSI6Ik1hcnRpbnMiLCJhZ2UiOjMxLCJfaWQiOiI2MzVkNWRhZWQ0Y2YxMGU0NmFkZjFjOWIiLCJjcmVhdGVkX2F0IjoiMjAyMi0xMC0yOVQxNzowNjo1NC43MDZaIn0sImlhdCI6MTY2NzIwODg5OCwiZXhwIjoxNjY3MjEyNDk4fQ.-utQji4cJez6jhmAHa-SFn4wDUJ0DPMZuDTzhIngn88";


exports.demo2= async (req, res) => {
  
  var body={
    "title": "demo11",
      "description":"hot5" ,
      "author": "ugom",
   
      "read_count":1,
      "reading_time":"4h" ,
      "tags":"building" ,
      "body": "gggfddb. gffdddd,ffffvvc vgff, ffstyuuiii"
  }
  axios.post(
    url+"create_blog",
    body,
    {headers: {
      "Content-type": "Application/json",
"Authorization": `Bearer ${yourtoken}`
      }
    }
  )
  .then((response) => {
      var status = response.status;
      var message  = response.statusText + " "+"blog created" ;
      return res.json({ status: true, message });
    },
    (error) => {
      var status = error.response.status
      var message = error.response.statusText;
      return res.json({ status, message  });
    }
  );
  }



