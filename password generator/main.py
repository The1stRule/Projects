import random # importing a library called "random"

# creating a simple terminal design
print("")
print("Welcome to my password generator: ")
print("-------------------------------------------------------------------------")
print("")
print("Here is all the symbols: 👇")

# creating a variable and storing all the simbols the password can contain
symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[];'&@$"
print(symbols)

print("")
print("-------------------------------------------------------------------------")

# asking user if he wants to add symbols and adding it to main "symbols" variable
symbols += input("Enter the symbols you want to add (if not leave it empty) : ")

print("-------------------------------------------------------------------------")
print("")

# creating a variable where i ask user the length of their password
length = int(input("Please enter a password length: "))

# creating a while loop wich works till user exits
i = 0
while True:
    # aking an user if they are ready to generate password or not (y = generate / n = exit out of the loop)
    accept = input("Are you ready to generate a password? (y or n): ").lower()
    if accept[0] == "y":
        # generating random list wich contains "length" amounth of elements,
        # then we join them using "".join() function and print the whole string
        print("".join(random.choices(symbols, k = length)))
        print("-------------------------------------------------------------------------")
        print("")
    else:
        print("Bye Bye!❌")
        break