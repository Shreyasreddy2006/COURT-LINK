const token = '135b4fb0b9c910e1a523e187ac4fdd8e369d58e6';
async function getCourtData(){
    let response = await fetch("https://www.courtlistener.com/api/rest/v4/courts/" , {
         method : 'GET',
         headers : {
            'Authorization': `Token ${token}`
         }
    });

    let data = await response.json();
    const len = data.results.length;
    for(let i = 0;i<len;i++){
      let name =  data.results[i].full_name;
      let juris = data.results[i].jurisdiction;
      let sname = data.results[i].short_name;
      let sdate = data.results[i].start_date;
      let url = data.results[i].url;

      let courtInfo = `
        <div class="court-card">
          <h3>${name}</h3>
          <p><strong>Jurisdiction:</strong> ${juris}</p>
          <p><strong>Short Name:</strong> ${sname}</p>
          <p><strong>Start Date:</strong> ${sdate}</p>
          <a href="${url}" target="_blank">More Info</a>
        </div>
      `;

      document.getElementById("court").innerHTML += courtInfo;
    }
}
getCourtData();

async function getPeopleData(){
  let response = await fetch("https://www.courtlistener.com/api/rest/v4/positions/" , {
      method : 'GET',
      headers : {
        'Authorization': `Token ${token}`
      }
  });

  let data = await response.json();
  const len = data.results.length;
  for(let i = 0;i<len;i++){
      let dobc = data.results[i].person.dob_country;
      let gender = data.results[i].person.gender;
      let fname = data.results[i].person.name_first;
      let mname = data.results[i].person.name_middle;
      let lname = data.results[i].person.name_last;
      let position = data.results[i].position_type;

      let judgeinfo = `
         <h3>${fname} ${mname} ${lname}</h3>
         <p><strong>First-Name:</strong> ${fname}</p>
         <p><strong>Middle-Name:</strong> ${mname}</p>
         <p><strong>Last-Name:</strong> ${lname}</p>
         <p><strong>Position:</strong> ${position}</p>
         <p><strong>Gender:</strong> ${gender}</p>
         <p><strong>Citizen of:</strong> ${dobc}</p>
      `;

      document.getElementById("judge").innerHTML += judgeinfo;
  }
  
}
getPeopleData();
async function getAudio() {
  let response = await fetch("https://www.courtlistener.com/api/rest/v4/audio/" , {
    method : 'GET',
    headers : {
       'Authorization': `Token ${token}`
    }
  });

  let data = await response.json();
  const len = data.results.length;
  for(let i = 0;i<len;i++){
     let cname = data.results[i].case_name;
     let durl = data.results[i].download_url;
     let judges = data.results[i].judges;

     let audio = `
        <p><strong>Case-Name :</strong>${cname}</p>
        <p><strong>Judges:</strong>${judges}</p>
        <a href="${durl}">Download</a>;
      `;
      
      document.getElementById("audio").innerHTML += audio;
  }
}
getAudio();

document.addEventListener('keydown' , (event)=>{
   if(event.key === 'H' || event.key === 'h'){
      window.scrollTo({top:0});
   }
})
