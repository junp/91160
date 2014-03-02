import urllib
import urllib2
import json

class check():
	def __init__(self):
		self._unit_id = '239'
		self._doc_id = '2136'
		self._dep_id = '693'

	def run(self):
		value = {
		}

		data = urllib.urlencode(value)
		req = urllib2.Request('http://sz.91160.com/doc/getschmast/unit_id-'+str(self._unit_id)+'/dep_id-'+str(self._dep_id)+'/doc_id-'+str(self._doc_id)+'/date-.html')
		#req.set_proxy(proxy, 'http')
		req.add_header('Origin', 'http://sz.91160.com')
		req.add_header('Content-Type', 'application/x-www-form-urlencoded')
		req.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
		req.add_header('Accept-Encoding', 'gzip, deflate')
		req.add_header('Accept-Language', 'en-US,en;q=0.5')
		req.add_header('Connection', 'keep-alive')
		req.add_header('Host', 'sz.91160.com')
		req.add_header('Referer', 'http://sz.91160.com/guahao/ystep3.html')
		req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 ')
		req.add_header('Content-Length', len(data))
		#req.add_data(data)

		try:
			res = urllib2.urlopen(req)
			html = res.read().decode('utf-8')
			sch = json.loads(html)
			y_state = sch['sch']['am']['2014-03-03']['y_state']
			return int(y_state)
		except :
			print 0


if __name__ == '__main__':
	myCheck = check()
	print myCheck.run()