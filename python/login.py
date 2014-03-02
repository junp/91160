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
print cf.get('header','cookie')
data = urllib.urlencode(value)

'''
Accept:application/json, text/javascript, */*; q=0.01
Accept-Encoding:gzip,deflate,sdch
Accept-Language:zh-CN,zh;q=0.8
Connection:keep-alive
Content-Length:93
Content-Type:application/x-www-form-urlencoded; charset=UTF-8
Cookie:ip_city=sz; PHPSESSID=6b4f2ecd92e5c4a29689ee4212d6a2de; _nykj_health=1; _nykj_disease=1; _app_link_=1; _nyjy_unit_notic_=1; ny_images_code=e5hnyXFCR8PtwIgRA.PftIRwGeoNFaIpdsH2swHa1lPz7AF3WdgV4quDs8je6VSl61mla6WzsWBcJHIA; _nyjy_notic_=1; login_username=13434757283; __utma=29285236.944845738.1392041856.1393606473.1393656432.46; __utmb=29285236.42.10.1393656432; __utmc=29285236; __utmz=29285236.1392041856.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=1.472714759.1393606573.1393606573.1393658157.2; __utmb=1.3.10.1393658157; __utmc=1; __utmz=1.1393606573.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Hm_lvt_c4e8e5b919a5c12647962ea08462e63b=1392037898,1392041856; Hm_lpvt_c4e8e5b919a5c12647962ea08462e63b=1393658301; ny_images_code_dologin=e3KZqjUpFWC88jfWMJ2Dje1jPQj3aC7kzDEoDe%2Bcc8eglOC9fWtGuEBf.%2BmmcPgQngHxq2ZjSEn3TA6w
Host:sz.91160.com
Origin:http://sz.91160.com
Referer:http://sz.91160.com/user/login.html
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36
X-Requested-With:XMLHttpRequest
'''
def login():
	cookie_file = 'cookie.txt'
	cookie = cookielib.LWPCookieJar(cookie_file)
	cookie.save()
	opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
	urllib2.install_opener(opener)

	req = urllib2.Request('http://weixin.91160.com/index.php?c=user&a=login')

	#req.set_proxy(cf.get('proxy', 'host'), 'http')

	req.add_header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
	req.add_header('Accept', 'application/json, text/javascript, */*; q=0.01')
	req.add_header('Accept-Encoding', 'gzip,deflate,sdch')
	req.add_header('Accept-Language', 'zh-CN,zh;q=0.8')
	req.add_header('Connection', 'keep-alive')
	req.add_header('Host', '91160.com')
	req.add_header('Referer', 'http://sz.91160.com/user/login.html')
	req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36')
	rea.add_header('X-Requested-With','XMLHttpRequest')
	req.add_header('Content-Length', len(data))

	req.add_data(data)

	res = urllib2.urlopen(req)
	print len(data)
	print res.read()
	cookie.save()

if __name__ == '__main__':
	login()
