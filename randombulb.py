import threading, random, sys

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

light = 0
def lightbulb():
    global light
    light = (light + 1) %2
    if light == 0:
        print('false')
        sys.stdout.flush()
    else:
        print('true')
        sys.stdout.flush()

def main():
    set_interval(lightbulb, 3)

#start process
if __name__ == '__main__':
    main()


