#_*_encoding:utf8_*_
import ConfigParser
import urllib
import urllib2
import cookielib

cf = ConfigParser.ConfigParser()
cf.read("config.ini")

def order():
	cookie = cookielib.LWPCookieJar()
	cookie.load('cookie.txt')
	opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
	urllib2.install_opener(opener)
	req = urllib2.Request('http://weixin.91160.com/index.php?c=account&a=index')

	req.set_proxy(cf.get('proxy', 'host'), 'http')

	req.add_header('Content-Type', 'application/x-www-form-urlencoded')
	req.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
	req.add_header('Accept-Encoding', 'gzip, deflate')
	req.add_header('Accept-Language', 'en-US,en;q=0.5')
	req.add_header('Connection', 'keep-alive')
	req.add_header('Host', 'weixin.91160.com')
	req.add_header('Referer', 'http://weixin.91160.com/index.php?c=user&a=login')
	req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')
	req.add_header('Content-Length', '0')

	res = urllib2.urlopen(req)
	#print len(data)
	print res.read()

if __name__ == '__main__':
	order()