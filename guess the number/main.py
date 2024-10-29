import random # importing a library called "random".

# creating a simple terminal design.

# asking the user for a range of numbers to randomly generate and added to the variables.
start_index = int(input("Enter the starting index of the guessing range: "))
print("-------------------------------------------------------------------------")
end_index = int(input("Enter the eding index of the guessing range: "))

# generate random number and adding it to "random_num" variable.
random_num = random.randint(start_index, end_index)

# creating a while loop wich works till user exits.
guess = 0
count = 0
while guess != random_num:
    # add 1 to the count variable after each iteration to count how many tries it took the user to guess the number.
    count += 1
    # the user begins to guess the number.
    guess = int(input("Enter your guess: "))
    # if the number entered by the user is less than the generated one, we  print "Too low".
    if guess < random_num:
        print("Too low 🤏")
        print("-------------------------------------------------------------------------")
    # if more, print "Too high".
    elif guess > random_num:
        print("Too high  💪")
        print("-------------------------------------------------------------------------")

# if the user guessed right, the while loop will end and we will print "You Win!" and how many tries did it take him.
print("-------------------------------------------------------------------------")
print("You Win!👌")
print("-------------------------------------------------------------------------")
print("Attempts needed:" ,count)