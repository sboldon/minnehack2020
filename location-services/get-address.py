import sys
import os
from location import Address


def main(argv):
    address = Address()
    print(address.getAddress())


if __name__ == "__main__":

    main(sys.argv[1:])
