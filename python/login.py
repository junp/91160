#_*_encoding:utf8_*_
import ConfigParser
import urllib
import urllib2
import cookielib

cf = ConfigParser.ConfigParser()
cf.read("config.ini")

value = {
	'card': cf.get('user', 'card'),
	'fromurl': '',
	'login_user': '',
	'password': cf.get('user', 'password')
}

data = urllib.urlencode(value)

'''
	"Content-Length": content.length,
	"Content-Type": "application/x-www-form-urlencoded",
	"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":"gzip, deflate",
	"Accept-Language":"en-US,en;q=0.5",
	"Connection":"keep-alive",
	"Host":"weixin.91160.com",
	"Referer":"http://weixin.91160.com/",
	"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0"
'''
def login():
	cookie_file = 'cookie.txt'
	cookie = cookielib.LWPCookieJar(cookie_file)
	cookie.save()
	opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
	urllib2.install_opener(opener)

	req = urllib2.Request('http://weixin.91160.com/index.php?c=user&a=login')

	req.set_proxy(cf.get('proxy', 'host'), 'http')

	req.add_header('Content-Type', 'application/x-www-form-urlencoded')
	req.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
	req.add_header('Accept-Encoding', 'gzip, deflate')
	req.add_header('Accept-Language', 'en-US,en;q=0.5')
	req.add_header('Connection', 'keep-alive')
	req.add_header('Host', 'weixin.91160.com')
	req.add_header('Referer', 'http://weixin.91160.com/index.php?c=user&a=login')
	req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')
	req.add_header('Content-Length', len(data))

	req.add_data(data)

	res = urllib2.urlopen(req)
	print len(data)
	print res.read()
	cookie.save()

if __name__ == '__main__':
	login()
