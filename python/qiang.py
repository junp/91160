import threading
import time
import random
import urllib
import urllib2
import re
import time
import ConfigParser
import order

myOrder = order.order()

class mythread(threading.Thread):
	def __init__(self, threadname):
		threading.Thread.__init__(self, name = threadname)

	def run(self):
		myOrder.submit()

def func1():
	num = 0
	while num < 150:
		print num
		t = mythread('t1'+str(num))
		t.start()
		num+=1


func1()