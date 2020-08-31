import os


def clear():
    """Clear the console based on the OS, sends a system command.
    """
    _ = os.system('cls' if os.name == 'nt' else 'clear')


def move(x=0, y=0):
    """Move the pointer to the given location. This is a lot cheaper than clear function, since
                    it overwrites the location with new data without on the console.

    Args:
                    x (int, optional): The location 'x' on the console. Defaults to 0.
                    y (int, optional): The location 'y' on the console. Defaults to 0.
    """
    print("\033[%d;%dH" % (y, x))
