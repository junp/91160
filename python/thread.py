import threading
import time

class mythread(threading.Thread):
	def __init__(self, threadname):
		threading.Thread.__init__(self, name = threadname)

	def run(self):
		self.fun()

	def fun(self):
		time.sleep(1)
		#print 'fun'

#t1 = mythread('t1')
#t2 = mythread('t2')

def func1():
	num = threading.activeCount()
	i = 0
	while num < 10:
		print 'current num:%d',num
		t = mythread('t1'+str(i))
		t.start()
		num+=1

while True:
	func1()

print threading.activeCount()