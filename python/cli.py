"""
Boilerplate for quickly writing python cli scripts.

usage: cli [-h] [-c COUNT] name
e.g. python3 cli.py "example name" -c 5

output:
Hello, example name
count: 5
"""

from argparse import ArgumentParser

def main():
    parser = ArgumentParser(prog='cli')
    parser.add_argument('name', help="The user's name.") # positional argument
    parser.add_argument('-c', '--count') # option that takes a value

    args = parser.parse_args()

    print(f"Hello, {args.name}\ncount: {args.count}")


if __name__ == '__main__':
    main()
