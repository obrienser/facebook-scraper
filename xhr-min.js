form_data='_____';
users=[];cursor='';interval=Math.floor(Math.random() * 700) + 11;loop=0;function scrap(){try{if(loop>0){var splits=form_data.split('22cursor%22%3A%22',2);var splits2=splits[1].split('%22%2C%22feedbackTargetID',2);form_data=splits[0]+'22cursor%22%3A%22'+cursor+'%22%2C%22feedbackTargetID'+splits2[1]}loop+=1;console.log('Working..');var xhr=new XMLHttpRequest();xhr.open('POST','https://www.facebook.com/api/graphql/',false);xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');xhr.send(JSON.stringify(form_data));if(xhr.status===200){data=xhr.responseText;data_parsed=JSON.parse(data);if(data_parsed['data']['node']['reactors']['page_info']['end_cursor']==null||loop>1000){result=users.join("\n");var element=document.createElement('a');element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(result));element.setAttribute('download','usersFromFacebook.txt');element.style.display='none';document.body.appendChild(element);element.click();document.body.removeChild(element);clearInterval(interval_id);console.log('ГОТОВО!')}else{var edges=data_parsed['data']['node']['reactors']['edges'];for(let i=0;i<edges.length;i++){users.push(edges[i]['node']['profile_url'])}cursor=data_parsed['data']['node']['reactors']['page_info']['end_cursor']}}else{console.log('Error! Status = '+xhr.status)}}catch{console.log(e)}}var interval_id=setInterval(scrap,interval);
//
