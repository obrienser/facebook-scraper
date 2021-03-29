/*// This script parses users who liked the post on Facebook
users = []
cursor = ''
count = '500'
// NONE, LIKE, LOVE, SUPPORT, SORRY, ANGER, WOW, HAHA
reactionType = 'NONE'

doc_id = '3528946720499433'
fb_dtsg = 'AQHX80F7JTXC%3AAQHfUN5vcW56'
feedbackTargetID = 'ZmVlZGJhY2s6MzM1ODE2MDk3MDk0ODI1NA'

while(true) {
	vars = '&fb_dtsg=' + fb_dtsg +'&variables=%7B%22count%22%3A' + count + '%2C%22cursor%22%3A%22' + cursor + '%22%2C%22feedbackTargetID%22%3A%22' + feedbackTargetID + '%3D%3D%22%2C%22reactionType%22%3A%22' + reactionType + '%22%2C%22scale%22%3A1%2C%22id%22%3A%22' + feedbackTargetID + '%3D%3D%22%7D' + '&doc_id=' + doc_id
	var xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://www.facebook.com/api/graphql/', false)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send(JSON.stringify(vars))
	if (xhr.status === 200) {
		data = JSON.parse(xhr.responseText)
		if (data['data']['node']['reactors']['page_info']['end_cursor'] == null) {
			break
		}
		var edges = data['data']['node']['reactors']['edges']
		for (let i = 0; i < edges.length; i++) {
			users.push(edges[i]['node']['profile_url'])
		}
		cursor = data['data']['node']['reactors']['page_info']['end_cursor']
		console.log('Working...')
	}
	else {
		console.log('Error! Status = ' + xhr.status)
	}
}

usersToString = users.join("\n")
var element = document.createElement('a')
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(usersToString))
element.setAttribute('download', 'users.txt')
element.style.display = 'none'
document.body.appendChild(element)
element.click()
document.body.removeChild(element)
console.log('Done!')
*/
test = 123