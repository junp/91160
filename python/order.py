#_*_coding=utf8_*_
import time
import urllib
import urllib2
import re
import time
import ConfigParser

class order():
	def __init__(self):
		self.initConfig()

	#配置
	def initConfig(self):
		cf = ConfigParser.ConfigParser()
		cf.read('config.ini')
		

		#用户ID
		self._member_id = cf.get('user', 'member_id')

		#手机号
		self._phone = cf.get('user', 'phone')

		#支付方式
		self._pay_method = cf.get('pay', 'pay_method')

		#医生ID
		self._doctor_id = cf.get('hospital', 'doctor_id')

		#排班
		self._sch_id = cf.get('hospital', 'sch_id')

		#号源
		self._detl_id = cf.get('hospital', 'detl_id')

		# 验证码
		self._captcha = cf.get('check', 'captcha')

		#短信验证码
		self._ny_sms_code = cf.get('check', 'ny_sms_code')

		#手机验证
		self._phone_check = cf.get('check', 'phone_check')

		#cookie
		self._cookie = cf.get('header', 'cookie')
		

	#提交
	def submit(self):
		value = {
			'captcha': self._captcha,
			'member_id': self._member_id,
			'pay_method': self._pay_method,
			'schid': self._sch_id,
			'doctor_id': self._doctor_id,
			'phone': self._phone,
			'ny_sms_code': self._ny_sms_code,
			'phone_check': self._phone_check,
			'detlid': self._detl_id
		}

		data = urllib.urlencode(value)

		#提交地址
		req = urllib2.Request('http://sz.91160.com/guahao/ysubmit.html')

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
		req.add_header('Cookie', self._cookie)
		req.add_header('Content-Length', len(data))
		req.add_data(data)

		try:
			res = urllib2.urlopen(req)
			html = res.read().decode('utf-8')

			print html
	
		except :
			print 'error'

if __name__ == '__main__':
	myOrder = order()
	myOrder.submit()

