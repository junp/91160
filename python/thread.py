import threading
import time
import random
import urllib
import urllib2
import cookielib
import re
import time

start = time.time()
_i = 0
_i2 = 0
class mythread(threading.Thread):
	def __init__(self, threadname):
		threading.Thread.__init__(self, name = threadname)

	def run(self):
		self.order()

	def fun(self):
		time.sleep(1)
		#print 'fun'

	def order(self):
		idx = random.randint(0,2)
		value = {
			'member_id': '2367964',
			'pay_method': '2',
			'unit_id': '103',
			'sch_id': '2701573',
			'detl_id': ['10617822','10617823','10617824'][idx]
		}

		data = urllib.urlencode(value)

		cookie = cookielib.LWPCookieJar()
		cookie.load('cookie.txt')
		opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
		urllib2.install_opener(opener)
		req = urllib2.Request('http://weixin.91160.com/index.php?c=order&a=submit')
		
		proxy = ['web-proxy.oa.com:8080','web-proxy.oa.com:8080','proxy.tencent.com:8080'][idx]
		#req.set_proxy(proxy, 'http')
		req.add_header('Origin', 'http://weixin.91160.com')
		req.add_header('Content-Type', 'application/x-www-form-urlencoded')
		req.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
		req.add_header('Accept-Encoding', 'gzip, deflate')
		req.add_header('Accept-Language', 'en-US,en;q=0.5')
		req.add_header('Connection', 'keep-alive')
		req.add_header('Host', 'weixin.91160.com')
		req.add_header('Referer', "http://weixin.91160.com/index.php?c=order&a=confirm&unit_id="+value['unit_id']+"&sch_id="+value['sch_id']+"&detl_id="+value['detl_id'])
		req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')
		req.add_header('Content-Length', len(data))
		req.add_data(data)
		res = urllib2.urlopen(req)
		html = res.read().decode('utf-8')
		m = re.search(u'\u8bf7\u7a0d\u540e\u518d\u8bd5', html)
		if m:

			global _i
			_i+=1
			print 'later ',_i
		else:
			global _i2
			_i2+=1
			print 'ok',_i2
		diff = time.time() - start
		print diff
		time.sleep(0.1)
		self.order()


def func1():
	num = threading.activeCount()
	i = 0
	while num < 50:
		print 'current num:%d',num
		t = mythread('t1'+str(i))
		t.start()
		num+=1


func1()