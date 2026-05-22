"""Interactive Lesson 1 tutorial for beginning Python learners.

Run normally:
    python lesson_tutorial.py

Run a quick content check:
    python lesson_tutorial.py --self-test
"""

from __future__ import annotations

import contextlib
import io
import sys
import textwrap
from dataclasses import dataclass
from typing import Iterable


APP_TITLE = "Python Tutorial Library"
APP_SUBJECT = "Python Fundamentals"
APP_VERSION = "1.0.0"
LESSON_TITLE = "Lesson 1: Introduction to Python Programming"
WIDTH = 78


@dataclass(frozen=True)
class Example:
    title: str
    purpose: str
    code: str
    expected: str
    runnable: bool = True


@dataclass(frozen=True)
class QuickCheck:
    question: str
    answer: str


@dataclass(frozen=True)
class Section:
    title: str
    summary: str
    ideas: tuple[str, ...]
    examples: tuple[Example, ...]
    mistake: str
    quick_check: QuickCheck


@dataclass(frozen=True)
class Challenge:
    title: str
    task: tuple[str, ...]
    hint: str
    solution: str


def dedent(text: str) -> str:
    """Return clean left-aligned text for display."""
    return textwrap.dedent(text).strip("\n")


def wrap(text: str, indent: int = 0) -> str:
    """Wrap prose to the tutorial width."""
    prefix = " " * indent
    return textwrap.fill(
        text,
        width=WIDTH,
        initial_indent=prefix,
        subsequent_indent=prefix,
        replace_whitespace=False,
    )


def divider(char: str = "-") -> str:
    return char * WIDTH


def show_header(title: str) -> None:
    print()
    print(divider("="))
    print(title.center(WIDTH))
    print(divider("="))


def pause(message: str = "Press Enter to continue...") -> None:
    input(f"\n{message}")


def ask_choice(prompt: str, valid: Iterable[str]) -> str:
    valid_set = {item.lower() for item in valid}
    while True:
        choice = input(prompt).strip().lower()
        if choice in valid_set:
            return choice
        print("Please choose one of: " + ", ".join(sorted(valid_set)))


def print_code(code: str) -> None:
    print(divider())
    print(dedent(code))
    print(divider())


def run_code(code: str) -> str:
    """Execute a safe tutorial snippet and capture printed output."""
    namespace: dict[str, object] = {}
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(dedent(code), namespace)
    return output.getvalue().rstrip()


SECTIONS: tuple[Section, ...] = (
    Section(
        title="1. What Python Is and Why It Is Useful",
        summary=(
            "Python is a general-purpose programming language. That means it "
            "is not limited to one job. People use it for web apps, automation, "
            "data science, cybersecurity, artificial intelligence, math, file "
            "processing, desktop tools, and quick experiments."
        ),
        ideas=(
            "Python is high level: you write instructions that are closer to human language than machine code.",
            "Python is object oriented: later lessons will show how data and behavior can be grouped into objects.",
            "Python is dynamically typed: a variable can refer to a string now and a number later, because Python checks the object at runtime.",
            "Python is platform independent for most beginner programs: the same script can usually run on Windows, macOS, and Linux.",
            "Python automatically manages memory for you, so beginners do not manually allocate and free memory.",
            "Python is open source, which means the language implementation and ecosystem are openly available.",
            "An IDE is an Integrated Development Environment. It gives you an editor, run button, project tools, and error messages in one place.",
            "IDLE, the command-line Python shell, and PyCharm are all ways to write or test Python code.",
        ),
        examples=(
            Example(
                title="A first tiny program",
                purpose="Show that Python can send text to the screen.",
                code='print("Python is ready!")',
                expected="Python is ready!",
            ),
        ),
        mistake=(
            "Do not worry if the first tool you use feels unfamiliar. The Python "
            "language is the important part. An IDE is just a helper around it."
        ),
        quick_check=QuickCheck(
            question="What is one reason Python is considered beginner friendly?",
            answer="Its syntax is readable, it is high level, and it does not require explicit type declarations for simple variables.",
        ),
    ),
    Section(
        title="2. Your First Program and print()",
        summary=(
            "A Python program is a set of instructions saved in a file that "
            "usually ends with .py. The classic first program prints a greeting."
        ),
        ideas=(
            "The function print() displays information in the terminal.",
            "Text inside quotes is called a string.",
            "Parentheses after a function name mean you are calling that function.",
            "A file named hello_world.py can be run by Python as a script.",
            "Python reads most simple scripts from top to bottom.",
        ),
        examples=(
            Example(
                title="Hello, world",
                purpose="Use print() with a string literal.",
                code='print("Hello, world!")',
                expected="Hello, world!",
            ),
            Example(
                title="Printing several values",
                purpose="Show that print() can receive more than one value.",
                code='print("Python", "is", "friendly")',
                expected="Python is friendly",
            ),
        ),
        mistake=(
            "Forgetting one quote or one closing parenthesis is common. If Python "
            "says SyntaxError, check punctuation before changing the whole program."
        ),
        quick_check=QuickCheck(
            question='What does print("Hello") do?',
            answer="It displays the text Hello in the terminal.",
        ),
    ),
    Section(
        title="3. Coding Standards, PEP 8, Comments, and Docstrings",
        summary=(
            "Coding standards are agreed rules for writing code clearly. Python's "
            "most common style guide is PEP 8. Clear style matters because code is "
            "read many more times than it is written."
        ),
        ideas=(
            "Use spaces consistently. Python uses indentation to understand code blocks.",
            "Avoid placing several statements on one line. One clear instruction per line is easier to read.",
            "Use one space around most operators, like total = price * quantity.",
            "A comment starts with # and explains why code exists or clarifies a tricky line.",
            "An inline comment goes after code and should be separated by at least two spaces.",
            "A block comment appears above the code it describes.",
            "A docstring is a string at the top of a file, function, class, or method that documents what it does.",
        ),
        examples=(
            Example(
                title="Readable spacing and comments",
                purpose="Compare meaningful names, spacing, and a short comment.",
                code="""
                # Calculate the total price before tax.
                quantity = 3
                price = 19.99
                total = quantity * price
                print(total)
                """,
                expected="59.97",
            ),
            Example(
                title="A module docstring",
                purpose="Show where a file-level docstring belongs.",
                code='''
                """Small practice script for Lesson 1."""

                greeting = "Good day"
                print(greeting)
                ''',
                expected="Good day",
            ),
        ),
        mistake=(
            "A comment should not repeat the obvious. For example, x = x + 1 "
            "does not need '# add one to x' unless the reason matters."
        ),
        quick_check=QuickCheck(
            question="What character starts a single-line Python comment?",
            answer="The # character.",
        ),
    ),
    Section(
        title="4. Keywords, Statements, and Indentation",
        summary=(
            "Keywords are words Python reserves for its own grammar. Statements "
            "are instructions Python can execute. Indentation tells Python which "
            "statements belong together."
        ),
        ideas=(
            "You cannot use keywords such as if, for, while, True, None, or class as variable names.",
            "Keywords are case sensitive. True is a keyword, but true is just an undefined name unless you create it.",
            "Use help('keywords') in Python to see the keyword list.",
            "An assignment such as score = 10 is a statement.",
            "A block begins after a colon and continues while the indentation stays aligned.",
            "Long statements can continue inside parentheses, brackets, or braces. A backslash can also continue a line, but parentheses are usually clearer.",
        ),
        examples=(
            Example(
                title="Indentation creates a block",
                purpose="Show that the indented print belongs to the if statement.",
                code="""
                is_ready = True

                if is_ready:
                    print("The block ran.")

                print("The program is done.")
                """,
                expected="The block ran.\nThe program is done.",
            ),
            Example(
                title="A readable multi-line statement",
                purpose="Use parentheses to split a calculation across lines.",
                code="""
                total = (
                    3 + 4 + 5
                    + 6 + 8
                )
                print(total)
                """,
                expected="26",
            ),
        ),
        mistake=(
            "Mixing indentation levels by accident causes IndentationError. Pick "
            "four spaces per level and keep the block aligned."
        ),
        quick_check=QuickCheck(
            question="Why is if = 5 invalid Python?",
            answer="Because if is a reserved keyword used by Python's syntax.",
        ),
    ),
    Section(
        title="5. Variables, Constants, Naming, and Case Sensitivity",
        summary=(
            "A variable is a name that refers to a value. Beginners often imagine "
            "a variable as a labeled box. In Python, the label points to an object "
            "such as a string, number, list, or dictionary."
        ),
        ideas=(
            "Create a variable with assignment: name = value.",
            "Python infers the type from the value, so you do not write string firstname = 'John'.",
            "Use descriptive lowercase names with underscores, such as first_name or total_price.",
            "Do not start a variable name with a digit.",
            "Do not use special symbols like !, @, #, $, or % in names.",
            "Python is case sensitive: firstname, firstName, and FirstName are different names.",
            "Constants are values you promise not to change. Python cannot enforce this, so programmers write constants in uppercase, such as TAX_RATE = 0.13.",
            "Multiple assignment can assign several names at once.",
        ),
        examples=(
            Example(
                title="Single and multiple assignment",
                purpose="Create variables and print them.",
                code="""
                first_name = "John"
                last_name = "Bello"
                city = country = "Ottawa"

                print(first_name)
                print(last_name)
                print(city, country)
                """,
                expected="John\nBello\nOttawa Ottawa",
            ),
            Example(
                title="Constants by convention",
                purpose="Use uppercase to signal a value should not be changed.",
                code="""
                TAX_RATE = 0.13
                price = 100
                tax = price * TAX_RATE
                print(tax)
                """,
                expected="13.0",
            ),
        ),
        mistake=(
            "Do not copy inconsistent capitalization from old slides. Firstname "
            "and firstname are different variables, so choose one clear style."
        ),
        quick_check=QuickCheck(
            question="Which name is better for a beginner variable: x or total_price?",
            answer="total_price, because it explains what the value means.",
        ),
    ),
    Section(
        title="6. Types, type(), Casting, and Basic Output Rules",
        summary=(
            "Every value in Python has a type. The type tells Python what kind of "
            "thing the value is and what operations make sense for it."
        ),
        ideas=(
            "Use type(value) to inspect a value's type.",
            "Common beginner types include int, float, str, bool, list, tuple, dict, and set.",
            "Casting means converting a value to another type using functions like str(), int(), and float().",
            "print(x, y) prints separate values with a space between them.",
            "x + y means addition for numbers but joining for strings.",
            "You cannot add an int and a str directly. Convert first or print them as separate values.",
        ),
        examples=(
            Example(
                title="Inspecting and casting types",
                purpose="Use type(), str(), int(), and float().",
                code="""
                x = 5
                y = "John"
                print(type(x))
                print(type(y))
                print(str(3))
                print(int("3"))
                print(float(3))
                """,
                expected="<class 'int'>\n<class 'str'>\n3\n3\n3.0",
            ),
            Example(
                title="Comma output versus plus",
                purpose="Show the safest beginner way to print mixed types.",
                code="""
                age = 5
                name = "John"
                print(name, age)
                print(name + " is " + str(age))
                """,
                expected="John 5\nJohn is 5",
            ),
        ),
        mistake=(
            "If Python says TypeError about str and int, it is usually telling "
            "you to convert one value or print with commas."
        ),
        quick_check=QuickCheck(
            question='Why does "5" + 7 fail?',
            answer='"5" is a string and 7 is an integer. Convert one value or print them separately.',
        ),
    ),
    Section(
        title="7. Literals: Numbers, Booleans, Strings, None, and Collections",
        summary=(
            "A literal is a raw value written directly in code. For example, 3.14, "
            '"Python", True, None, and [1, 2, 3] are literals.'
        ),
        ideas=(
            "Integer literals are whole numbers, such as 36 or -12.",
            "Float literals use decimals or scientific notation, such as 10.34 or 3.5e2.",
            "Complex numbers use j for the imaginary part, such as 3.14j.",
            "Boolean literals are True and False. Capitalization matters.",
            "String literals are characters inside quotes.",
            "None means no value or nothing has been set yet.",
            "Collection literals include lists [], tuples (), dictionaries {}, and sets {}.",
        ),
        examples=(
            Example(
                title="Numeric literals",
                purpose="Show different ways to write numbers.",
                code="""
                binary_value = 0b1010
                decimal_value = 200
                octal_value = 0o310
                hex_value = 0x12c
                float_value = 3.5e2
                complex_value = 3.14j

                print(binary_value, decimal_value, octal_value, hex_value)
                print(float_value)
                print(complex_value.imag, complex_value.real)
                """,
                expected="10 200 200 300\n350.0\n3.14 0.0",
            ),
            Example(
                title="Collection literals",
                purpose="Create the four main beginner collections.",
                code="""
                fruits = ["apple", "mango", "orange"]
                numbers = (1, 2, 3)
                alphabet = {"a": "apple", "b": "ball", "c": "cat"}
                vowels = {"a", "e", "i", "o", "u"}

                print(fruits)
                print(numbers)
                print(alphabet)
                print(vowels)
                """,
                expected="The set order may display differently because sets are unordered.",
            ),
        ),
        mistake=(
            "Do not write true, false, or none in lowercase. Python's literals "
            "are True, False, and None."
        ),
        quick_check=QuickCheck(
            question="What literal means 'there is no value here yet'?",
            answer="None.",
        ),
    ),
    Section(
        title="8. Strings, Escape Sequences, Methods, and Formatting",
        summary=(
            "A string is a sequence of characters. Strings are used for names, "
            "sentences, file paths, messages, and almost every kind of text."
        ),
        ideas=(
            "Strings can use single quotes, double quotes, or triple quotes.",
            "Triple quotes can hold text across multiple lines.",
            "Escape sequences begin with a backslash, such as \\n for newline and \\t for tab.",
            "Use an escape character when the quote you need would otherwise end the string.",
            "String methods create useful transformed values, such as upper(), lower(), capitalize(), count(), find(), strip(), replace(), split(), and join().",
            "Strings are immutable, so methods return new strings instead of changing the original one.",
            "format() and f-strings can place variable values inside messages. This tutorial uses format() because it appears in Lesson 1.",
        ),
        examples=(
            Example(
                title="String methods",
                purpose="Practice capitalize(), find(), replace(), count(), and strip().",
                code="""
                sentence = "What a wonderful day"
                messy = "-----python training-----"

                print(sentence.capitalize())
                print(sentence.find("day"))
                print(sentence.replace("day", "evening"))
                print(sentence.count("a"))
                print(messy.strip("-"))
                """,
                expected="What a wonderful day\n17\nWhat a wonderful evening\n3\npython training",
            ),
            Example(
                title="Output formatting",
                purpose="Format numbers with commas and fixed decimals.",
                code="""
                quantity = 10000
                total = 1507500
                price = 150.75
                campus = "Ottawa Campus"

                message = 'It costed me ${0:,} to buy {1:,} quantity of office supplies in "{2}". Individual price was {3:.2f}.'
                print(message.format(total, quantity, campus, price))
                """,
                expected='It costed me $1,507,500 to buy 10,000 quantity of office supplies in "Ottawa Campus". Individual price was 150.75.',
            ),
        ),
        mistake=(
            "Backslashes matter. 'Today is \"Thursday\"' is valid because the "
            "inner quotes are escaped when they would otherwise end the string."
        ),
        quick_check=QuickCheck(
            question='What does "Python".lower() return?',
            answer='It returns "python". The original string is not changed.',
        ),
    ),
    Section(
        title="9. Lists: Ordered, Changeable Collections",
        summary=(
            "A list stores an ordered sequence of items. Ordered means every item "
            "has a position. Changeable means you can add, remove, and replace "
            "items after the list is created."
        ),
        ideas=(
            "List indexes start at 0, so the first item is list_name[0].",
            "Use negative indexes to count from the end, such as list_name[-1].",
            "A slice such as fruits[0:3] returns items from index 0 up to but not including index 3.",
            "Use len(list_name) to count items.",
            "Common list methods include append(), insert(), index(), count(), sort(), remove(), reverse(), pop(), extend(), clear(), and copy().",
            "Use a for loop to visit every item in a list.",
            "Use range(len(list_name)) when you specifically need index numbers.",
            "List comprehension is compact, but beginners should first understand regular for loops.",
        ),
        examples=(
            Example(
                title="Indexing and slicing a list",
                purpose="Read one item and several items from a list.",
                code="""
                fruits = ["apple", "mango", "orange", "banana", "grape"]

                print(fruits[1])
                print(fruits[0:3])
                print(fruits[2:])
                print(len(fruits))
                """,
                expected="mango\n['apple', 'mango', 'orange']\n['orange', 'banana', 'grape']\n5",
            ),
            Example(
                title="Changing and looping through a list",
                purpose="Append, replace, insert, reverse, and loop.",
                code="""
                cars = ["Honda", "Toyota", "Mercedes", "Ferrari", "Nissan", "Hyundai"]
                cars.append("Ford")
                cars[-1] = "Kia"
                cars.insert(2, "Chevrolet")
                cars.reverse()

                for car in cars:
                    print(car)
                """,
                expected="Kia\nHyundai\nNissan\nFerrari\nMercedes\nChevrolet\nToyota\nHonda",
            ),
        ),
        mistake=(
            "The last valid positive index is len(items) - 1. If a list has six "
            "items, index 6 is already too far."
        ),
        quick_check=QuickCheck(
            question="Why is cars[-1] useful?",
            answer="It points to the last item even if the list grows or shrinks.",
        ),
    ),
    Section(
        title="10. Tuples: Ordered, Mostly Unchangeable Collections",
        summary=(
            "A tuple is an ordered collection like a list, but it is immutable. "
            "After a tuple is created, you do not change its individual items."
        ),
        ideas=(
            "Tuples use parentheses, such as fruit_tuple = ('banana', 'apple').",
            "Tuple indexing and slicing work like list indexing and slicing.",
            "Tuples are useful when data should stay protected from accidental changes.",
            "To 'change' a tuple, convert it to a list, change the list, then convert back.",
            "Unpacking assigns tuple items to variable names.",
            "The number of unpacking variables must match the number of tuple values unless you use * to collect extras.",
            "Use + to join tuples and * to repeat a tuple.",
            "Tuple methods are count() and index().",
        ),
        examples=(
            Example(
                title="Tuple indexing, unpacking, joining, and methods",
                purpose="Practice the tuple features from Lesson 1.",
                code="""
                fruit_tuple_one = ("banana", "Apple", "Mango", "Grape", "Orange")
                print(fruit_tuple_one[2])

                banana, apple, mango, grape, orange = fruit_tuple_one
                print(banana, apple, mango, grape, orange)
                print(fruit_tuple_one.count("Grape"))

                fruit_tuple_two = ("Kiwi", "Lemon", "Lime")
                combined = fruit_tuple_one + fruit_tuple_two
                print(combined.index("Lemon"))
                """,
                expected="Mango\nbanana Apple Mango Grape Orange\n1\n6",
            ),
        ),
        mistake=(
            "If unpacking gives ValueError, count the values and count the variable "
            "names. They usually do not match."
        ),
        quick_check=QuickCheck(
            question="What is the main difference between a list and a tuple?",
            answer="A list is changeable. A tuple is immutable after it is created.",
        ),
    ),
    Section(
        title="11. Dictionaries: Key-Value Data",
        summary=(
            "A dictionary stores pairs of keys and values. Use a dictionary when "
            "you want to look up information by a meaningful label."
        ),
        ideas=(
            "A dictionary literal uses braces with key: value pairs.",
            "Keys are used to find values, like car['brand'].",
            "Dictionary values can be strings, numbers, lists, or other objects.",
            "Use keys() to get the keys, values() to get values, and items() to get key-value pairs.",
            "Use get() when a key might be missing.",
            "Use update() to add or replace key-value pairs.",
            "Use pop() to remove a known key and popitem() to remove the last inserted pair.",
        ),
        examples=(
            Example(
                title="Ford car dictionary",
                purpose="Create a dictionary and inspect keys and items.",
                code="""
                car = {
                    "brand": "Ford",
                    "model": "Mustang",
                    "year": 2022,
                }

                print(car["brand"])
                print(list(car.keys()))
                print(list(car.items()))
                """,
                expected="Ford\n['brand', 'model', 'year']\n[('brand', 'Ford'), ('model', 'Mustang'), ('year', 2022)]",
            ),
        ),
        mistake=(
            "The PDF challenge says print keys as Ford, Mustang, 2022, but those "
            "are values. The correct dictionary keys are brand, model, and year."
        ),
        quick_check=QuickCheck(
            question='In {"brand": "Ford"}, which part is the key?',
            answer='The key is "brand"; the value is "Ford".',
        ),
    ),
    Section(
        title="12. Sets: Unique, Unordered Collections",
        summary=(
            "A set stores unique items. Sets are useful when duplicates should be "
            "removed or when you need comparisons like union, difference, and "
            "intersection."
        ),
        ideas=(
            "Sets use braces, such as ratings = {1, 2, 3}.",
            "Duplicates are automatically removed.",
            "Sets are unordered, so indexes and slicing do not work.",
            "Use add() to add one item.",
            "Use update() to add many items from another iterable.",
            "remove() deletes an item but raises an error if the item is missing.",
            "discard() deletes an item if present and does nothing if missing.",
            "difference() returns items that are in one set but not another.",
            "union() returns a new set containing items from both sets.",
        ),
        examples=(
            Example(
                title="Set basics",
                purpose="Convert a list to a set and compare sets.",
                code="""
                set_rating_one = set([1, 2, 3, 4, 5])
                set_rating_two = {5, 6, 7, 8, 9, 10}
                set_rating_two.add(11)
                set_rating_two.add(12)

                print(set_rating_one.difference(set_rating_two))

                set_rating_three = set_rating_two.copy()
                set_rating_three.remove(8)
                set_rating_three.discard(20)
                print(8 in set_rating_three)
                """,
                expected="{1, 2, 3, 4}\nFalse",
            ),
        ),
        mistake=(
            "Do not depend on set display order. Python may print the same set in "
            "a different order because sets are unordered."
        ),
        quick_check=QuickCheck(
            question="Which set method is safer when the item might not exist: remove() or discard()?",
            answer="discard(), because it does not raise an error for a missing item.",
        ),
    ),
    Section(
        title="13. Type Conversion, Input, Output, and Import",
        summary=(
            "Type conversion changes a value from one type to another. Input lets "
            "a user type information into a program. Import lets your program use "
            "code from another module."
        ),
        ideas=(
            "Implicit conversion happens automatically when Python safely combines compatible types, such as int plus float becoming float.",
            "Explicit conversion is when you call int(), float(), str(), list(), tuple(), or set() yourself.",
            "Data can be lost during explicit conversion. For example, int(-10.6) becomes -10.",
            "input(prompt) always returns a string.",
            "Convert input with int() or float() before doing math.",
            "print() has optional sep and end parameters.",
            "import math gives access to math.pi as math.pi.",
            "from math import pi imports pi directly.",
        ),
        examples=(
            Example(
                title="Implicit and explicit conversion",
                purpose="Show automatic float conversion and manual string-to-int conversion.",
                code="""
                num_int = 123
                num_float = 1.23
                num_new = num_int + num_float
                print(num_new)
                print(type(num_new))

                num_str = "456"
                converted = int(num_str)
                print(num_int + converted)
                """,
                expected="124.23\n<class 'float'>\n579",
            ),
            Example(
                title="print() sep and end",
                purpose="Customize print output.",
                code="""
                print(1, 2, 3, 4)
                print(1, 2, 3, 4, sep="#", end="&")
                """,
                expected="1 2 3 4\n1#2#3#4&",
            ),
            Example(
                title="Input example",
                purpose="Show how input should be converted before math.",
                code="""
                first = int(input("Enter first number: "))
                second = int(input("Enter second number: "))
                total = first + second
                print("The sum of {0} and {1} is {2}".format(first, second, total))
                """,
                expected="Depends on the two numbers typed by the user.",
                runnable=False,
            ),
        ),
        mistake=(
            "If input gives you '5', that is text, not the number 5. Convert it "
            "before doing arithmetic."
        ),
        quick_check=QuickCheck(
            question="What type does input() return?",
            answer="A string.",
        ),
    ),
    Section(
        title="14. Operators",
        summary=(
            "Operators are symbols or keywords that perform operations on values. "
            "For example, + can add numbers, == can compare values, and in can "
            "test membership."
        ),
        ideas=(
            "Arithmetic operators include +, -, *, /, %, //, and **.",
            "/ always returns a float. // performs floor division.",
            "% returns the remainder after division.",
            "Comparison operators include ==, !=, >, <, >=, and <=. They return True or False.",
            "Assignment operators include =, +=, -=, *=, /=, and %=.",
            "Logical operators are and, or, and not.",
            "Identity operators are is and is not. They test whether two names refer to the same object.",
            "Membership operators are in and not in. They test whether a value appears in a sequence or collection.",
        ),
        examples=(
            Example(
                title="Arithmetic and comparison",
                purpose="Use numbers to produce values and booleans.",
                code="""
                x = 15
                y = 4

                print("x + y =", x + y)
                print("x - y =", x - y)
                print("x * y =", x * y)
                print("x > y is", x > y)
                print("x < y is", x < y)
                """,
                expected="x + y = 19\nx - y = 11\nx * y = 60\nx > y is True\nx < y is False",
            ),
            Example(
                title="Special operators",
                purpose="Use identity and membership operators.",
                code="""
                x = 5
                y = 5
                text = "Hello"

                print(x is y)
                print(x is not text)
                print("H" in text)
                print("z" not in text)
                """,
                expected="True\nTrue\nTrue\nTrue",
            ),
        ),
        mistake=(
            "Use == to compare values. A single = assigns a value to a variable."
        ),
        quick_check=QuickCheck(
            question="What is the difference between = and ==?",
            answer="= assigns a value. == checks whether two values are equal.",
        ),
    ),
)


CHALLENGES: tuple[Challenge, ...] = (
    Challenge(
        title="Keyword research with help()",
        task=(
            "Use the help function to get information about yield, while, and, and True.",
            'Example pattern: help("break")',
        ),
        hint='Run Python interactively or put help("yield") in a script.',
        solution=dedent(
            """
            help("yield")
            help("while")
            help("and")
            help("True")
            """
        ),
    ),
    Challenge(
        title="Docstring, same-value assignment, comment, and print",
        task=(
            'Write a docstring containing: "Assigning same value to multiple variables".',
            'Create two variables and assign the same value "Good day" at the same time.',
            'Add the comment "this prints the two assigned variables" above the print calls.',
            "Print your two variables.",
        ),
        hint="Use first_variable = second_variable = value.",
        solution=dedent(
            '''
            """Assigning same value to multiple variables"""

            greeting_one = greeting_two = "Good day"

            # this prints the two assigned variables
            print(greeting_one)
            print(greeting_two)
            '''
        ),
    ),
    Challenge(
        title="String method practice",
        task=(
            'Create a variable and assign "What a wonderful day" to it.',
            "Print the capitalized sentence.",
            'Find the index of "day".',
            'Replace "day" with "evening".',
        ),
        hint="Use capitalize(), find('day'), and replace('day', 'evening').",
        solution=dedent(
            '''
            sentence = "What a wonderful day"

            print(sentence.capitalize())
            print(sentence.find("day"))
            print(sentence.replace("day", "evening"))
            '''
        ),
    ),
    Challenge(
        title="Count and strip string content",
        task=(
            'Count the total number of "o" characters in this string:',
            '"Python scripting is good. Python is used across a wide variety of industries."',
            'Remove all "-" characters before and after "python training" in this string:',
            '"--------------------python training-------"',
        ),
        hint="Use count('o') and strip('-').",
        solution=dedent(
            '''
            sentence = "Python scripting is good. Python is used across a wide variety of industries."
            python_sentence = "--------------------python training-------"

            print(sentence.count("o"))
            print(python_sentence.strip("-"))
            '''
        ),
    ),
    Challenge(
        title="Formatted office-supply sentence",
        task=(
            "Create variables: quantity = 10000, total = 1507500, price = 150.75.",
            'Use those values to print: It costed me $1,507,500 to buy 10,000 quantity of office supplies in "Ottawa Campus". Individual Price of the item was 150.75.',
            "Use formatting rather than manually typing the formatted numbers.",
        ),
        hint="Use {0:,} for comma-separated numbers and {2:.2f} for two decimal places.",
        solution=dedent(
            '''
            quantity = 10000
            total = 1507500
            price = 150.75
            campus = "Ottawa Campus"

            print(
                'It costed me ${0:,} to buy {1:,} quantity of office supplies in "{2}". '
                "Individual Price of the item was {3:.2f}.".format(
                    total, quantity, campus, price
                )
            )
            '''
        ),
    ),
    Challenge(
        title="List basics with cars",
        task=(
            "Create a list of cars: Honda, Toyota, Mercedes, Ferrari, Nissan, Hyundai.",
            "Print the list.",
            'Append "Ford" and print the list.',
            "Print only Mercedes.",
            "Find and print the index of Ferrari.",
            "Remove Honda from the list.",
            "Print the new list.",
        ),
        hint="Mercedes is at index 2 in the original list. Ferrari can be found with index().",
        solution=dedent(
            '''
            cars = ["Honda", "Toyota", "Mercedes", "Ferrari", "Nissan", "Hyundai"]
            print(cars)

            cars.append("Ford")
            print(cars)

            print(cars[2])
            print(cars.index("Ferrari"))

            cars.remove("Honda")
            print(cars)
            '''
        ),
    ),
    Challenge(
        title="List updates, dynamic last item, insert, reverse, and clear",
        task=(
            "Create the cars list again.",
            'Change the last item to "Kia" using a dynamic index.',
            'Add "Chevrolet" to index 2.',
            "Print after each major change.",
            "Reverse the list in descending/reversed order.",
            "Empty all members of the list.",
        ),
        hint="The dynamic last item is cars[-1] or cars[len(cars) - 1].",
        solution=dedent(
            '''
            cars = ["Honda", "Toyota", "Mercedes", "Ferrari", "Nissan", "Hyundai"]
            print(cars)

            cars[-1] = "Kia"
            print(cars)

            cars.insert(2, "Chevrolet")
            print(cars)

            cars.reverse()
            print(cars)

            cars.clear()
            print(cars)
            '''
        ),
    ),
    Challenge(
        title="Loop through a list three ways",
        task=(
            "Create the cars list again.",
            "Print each member on its own line using a for loop with indexes.",
            "Print each member on its own line using a direct for loop.",
            "Print each member on its own line using list comprehension syntax.",
        ),
        hint="Use range(len(cars)) for index looping.",
        solution=dedent(
            '''
            cars = ["Honda", "Toyota", "Mercedes", "Ferrari", "Nissan", "Hyundai"]

            for index in range(len(cars)):
                print(cars[index])

            for car in cars:
                print(car)

            [print(car) for car in cars]
            '''
        ),
    ),
    Challenge(
        title="Tuple fruit practice",
        task=(
            "Create fruit_tuple_one with banana, Apple, Mango, Grape, Orange.",
            "Print the tuple.",
            "Print only Mango.",
            "Unpack fruit_tuple_one and print all variables.",
            'Count how many times "Grape" occurs.',
            "Create fruit_tuple_two with Kiwi, Lemon, Lime.",
            "Join the two tuples and print the result.",
            'Find the index of "Lemon" in the combined tuple.',
        ),
        hint="Use tuple_one + tuple_two to combine tuples.",
        solution=dedent(
            '''
            fruit_tuple_one = ("banana", "Apple", "Mango", "Grape", "Orange")
            print(fruit_tuple_one)
            print(fruit_tuple_one[2])

            banana, apple, mango, grape, orange = fruit_tuple_one
            print(banana, apple, mango, grape, orange)

            print(fruit_tuple_one.count("Grape"))

            fruit_tuple_two = ("Kiwi", "Lemon", "Lime")
            combined_tuple = fruit_tuple_one + fruit_tuple_two
            print(combined_tuple)
            print(combined_tuple.index("Lemon"))
            '''
        ),
    ),
    Challenge(
        title="Ford dictionary practice",
        task=(
            'Create a dictionary for a Ford car with "brand": "Ford", "model": "Mustang", and "year": 2022.',
            "Print only the keys.",
            "Print a tuple for each key-value pair.",
        ),
        hint="Use keys() and items().",
        solution=dedent(
            '''
            car = {
                "brand": "Ford",
                "model": "Mustang",
                "year": 2022,
            }

            print(car.keys())
            print(car.items())
            '''
        ),
    ),
    Challenge(
        title="Set practice with ratings",
        task=(
            "Convert [1, 2, 3, 4, 5] to a set called set_rating_one.",
            "Create set_rating_two with {5, 6, 7, 8, 9, 10}.",
            "Add 11 and 12 to set_rating_two.",
            "Print both sets.",
            "Return and print a set containing only members in set_rating_one but not set_rating_two. Expected content: {1, 2, 3, 4}.",
            "Copy set_rating_two to set_rating_three.",
            "Remove 8 from set_rating_three.",
            "Try removing 20 from set_rating_three without causing an error.",
            "Print set_rating_three after removals.",
        ),
        hint="Use difference(), copy(), remove(8), and discard(20).",
        solution=dedent(
            '''
            list_rating_one = [1, 2, 3, 4, 5]
            set_rating_one = set(list_rating_one)
            set_rating_two = {5, 6, 7, 8, 9, 10}

            set_rating_two.add(11)
            set_rating_two.add(12)

            print(set_rating_one)
            print(set_rating_two)
            print(set_rating_one.difference(set_rating_two))

            set_rating_three = set_rating_two.copy()
            set_rating_three.remove(8)
            set_rating_three.discard(20)
            print(set_rating_three)
            '''
        ),
    ),
    Challenge(
        title="Operators and input-driven sum",
        task=(
            "Create two variables and assign 5 and 7.",
            "Add and store the sum.",
            'Format the output as: "The sum of 5 and 7 is 12".',
            "Convert the code to read two inputs from the user.",
            'Ensure the output dynamically maps to: "The sum of firstinput and secondinput is sum".',
        ),
        hint="Remember input() returns strings, so convert with int().",
        solution=dedent(
            '''
            first_number = 5
            second_number = 7
            total = first_number + second_number
            print("The sum of {0} and {1} is {2}".format(first_number, second_number, total))

            first_input = int(input("Enter the first number: "))
            second_input = int(input("Enter the second number: "))
            input_total = first_input + second_input
            print("The sum of {0} and {1} is {2}".format(first_input, second_input, input_total))
            '''
        ),
    ),
)


def all_examples() -> list[tuple[Section, Example]]:
    examples: list[tuple[Section, Example]] = []
    for section in SECTIONS:
        for example in section.examples:
            examples.append((section, example))
    return examples


def show_section(section: Section) -> None:
    show_header(section.title)
    print(wrap(section.summary))
    print()
    print("Key ideas:")
    for idea in section.ideas:
        print(wrap("- " + idea, indent=2))

    print("\nExamples:")
    for index, example in enumerate(section.examples, start=1):
        print(wrap(f"{index}. {example.title}: {example.purpose}", indent=2))
        print_code(example.code)
        print("Expected output:")
        print(wrap(example.expected, indent=2))
        if example.runnable:
            choice = ask_choice("Run this example now? (y/n): ", {"y", "n"})
            if choice == "y":
                print("\nActual output:")
                try:
                    actual = run_code(example.code)
                    print(actual if actual else "(no output)")
                except Exception as exc:  # pragma: no cover - interactive guard
                    print(f"Example raised {type(exc).__name__}: {exc}")
        else:
            print("This example uses input(), so it is shown but not auto-run.")

    print("\nCommon beginner mistake:")
    print(wrap(section.mistake))
    print("\nQuick check:")
    print(wrap(section.quick_check.question))
    ask_choice("Reveal answer? (y/n): ", {"y", "n"})
    print(wrap(section.quick_check.answer))
    pause()


def study_sections_menu() -> None:
    while True:
        show_header("Study Sections")
        for index, section in enumerate(SECTIONS, start=1):
            print(f"{index:>2}. {section.title}")
        print(" B. Back")

        choice = input("\nChoose a section: ").strip().lower()
        if choice == "b":
            return
        if choice.isdigit() and 1 <= int(choice) <= len(SECTIONS):
            show_section(SECTIONS[int(choice) - 1])
        else:
            print("That section does not exist yet.")
            pause()


def example_runner_menu() -> None:
    examples = all_examples()
    while True:
        show_header("Runnable Example Walkthroughs")
        for index, (section, example) in enumerate(examples, start=1):
            marker = "run" if example.runnable else "read"
            print(f"{index:>2}. [{marker}] {example.title} ({section.title})")
        print(" B. Back")

        choice = input("\nChoose an example: ").strip().lower()
        if choice == "b":
            return
        if not (choice.isdigit() and 1 <= int(choice) <= len(examples)):
            print("Please choose a listed example.")
            pause()
            continue

        section, example = examples[int(choice) - 1]
        show_header(example.title)
        print(wrap(f"Section: {section.title}"))
        print(wrap(example.purpose))
        print_code(example.code)
        print("Expected output:")
        print(wrap(example.expected, indent=2))
        if example.runnable:
            print("\nActual output:")
            try:
                actual = run_code(example.code)
                print(actual if actual else "(no output)")
            except Exception as exc:  # pragma: no cover - interactive guard
                print(f"Example raised {type(exc).__name__}: {exc}")
        else:
            print("\nThis example requires user input, so it is not auto-run.")
        pause()


def quick_checks_menu() -> None:
    while True:
        show_header("Quick Checks")
        for index, section in enumerate(SECTIONS, start=1):
            print(f"{index:>2}. {section.title}")
        print(" A. Answer all in order")
        print(" B. Back")

        choice = input("\nChoose a quick check: ").strip().lower()
        if choice == "b":
            return
        if choice == "a":
            selected_sections = SECTIONS
        elif choice.isdigit() and 1 <= int(choice) <= len(SECTIONS):
            selected_sections = (SECTIONS[int(choice) - 1],)
        else:
            print("Please choose a listed quick check.")
            pause()
            continue

        for section in selected_sections:
            show_header(section.title)
            print(wrap(section.quick_check.question))
            input("\nThink of your answer, then press Enter...")
            print("\nSuggested answer:")
            print(wrap(section.quick_check.answer))
            pause()


def show_challenge(challenge: Challenge) -> None:
    while True:
        show_header(challenge.title)
        print("Task:")
        for step in challenge.task:
            print(wrap("- " + step, indent=2))

        print("\nOptions:")
        print(" H. Show hint")
        print(" S. Show solution")
        print(" B. Back")

        choice = ask_choice("\nChoose: ", {"h", "s", "b"})
        if choice == "h":
            print("\nHint:")
            print(wrap(challenge.hint))
            pause()
        elif choice == "s":
            print("\nSolution:")
            print_code(challenge.solution)
            pause()
        else:
            return


def challenge_bank_menu() -> None:
    while True:
        show_header("Final Challenge Bank")
        print(wrap(
            "These challenges are placed at the end so you can study first, "
            "practice second, and reveal help only when you need it."
        ))
        print()
        for index, challenge in enumerate(CHALLENGES, start=1):
            print(f"{index:>2}. {challenge.title}")
        print(" B. Back")

        choice = input("\nChoose a challenge: ").strip().lower()
        if choice == "b":
            return
        if choice.isdigit() and 1 <= int(choice) <= len(CHALLENGES):
            show_challenge(CHALLENGES[int(choice) - 1])
        else:
            print("Please choose a listed challenge.")
            pause()


def lesson_one_menu() -> None:
    while True:
        show_header(LESSON_TITLE)
        print(wrap(
            "This lesson teaches the foundations you need before writing larger "
            "programs: syntax, variables, values, strings, collections, input, "
            "output, imports, and operators."
        ))
        print()
        print("1. Study sections")
        print("2. Runnable example walkthroughs")
        print("3. Quick checks")
        print("4. Final challenge bank")
        print("5. Suggested beginner path")
        print("B. Back to chapter select")
        print("Q. Quit")

        choice = ask_choice("\nChoose: ", {"1", "2", "3", "4", "5", "b", "q"})
        if choice == "1":
            study_sections_menu()
        elif choice == "2":
            example_runner_menu()
        elif choice == "3":
            quick_checks_menu()
        elif choice == "4":
            challenge_bank_menu()
        elif choice == "5":
            show_beginner_path()
        elif choice == "b":
            return
        else:
            raise SystemExit


def show_beginner_path() -> None:
    show_header("Suggested Beginner Path")
    steps = (
        "Read sections 1 through 6 to understand the language, print(), style, variables, and types.",
        "Run examples from sections 7 and 8 until literals and strings feel comfortable.",
        "Study lists, tuples, dictionaries, and sets. These are the containers beginners use constantly.",
        "Practice type conversion and input before attempting the final operator/input challenge.",
        "Open the final challenge bank. Try each challenge before revealing hints or solutions.",
        "When stuck, compare your code to the solution one line at a time instead of copying the whole answer.",
    )
    for index, step in enumerate(steps, start=1):
        print(wrap(f"{index}. {step}", indent=2))
    pause()


def chapter_select() -> None:
    while True:
        show_header(APP_TITLE)
        print(f"Subject: {APP_SUBJECT}")
        print(f"Version: {APP_VERSION}")
        print()
        print("Choose a chapter:")
        print("1. Lesson 1: Introduction to Python Programming")
        print("2. Lesson 2: Coming soon")
        print("3. Lesson 3: Coming soon")
        print("4. Lesson 4: Coming soon")
        print("Q. Quit")

        choice = ask_choice("\nChoose: ", {"1", "2", "3", "4", "q"})
        if choice == "1":
            lesson_one_menu()
        elif choice in {"2", "3", "4"}:
            print("\nThat chapter is visible for future expansion, but Lesson 1 is the only completed tutorial right now.")
            pause()
        else:
            print("\nGood work today. Keep practicing in small pieces.")
            return


def self_test() -> int:
    """Validate tutorial content and safe runnable examples."""
    problems: list[str] = []

    if len(SECTIONS) < 14:
        problems.append("Expected at least 14 Lesson 1 sections.")
    if len(CHALLENGES) != 12:
        problems.append("Expected exactly 12 Lesson 1 challenges.")

    for section in SECTIONS:
        if not section.title or not section.summary or not section.ideas:
            problems.append(f"Section is incomplete: {section.title!r}")
        if not section.examples:
            problems.append(f"Section has no examples: {section.title}")
        if not section.quick_check.question or not section.quick_check.answer:
            problems.append(f"Section quick check is incomplete: {section.title}")

    for challenge in CHALLENGES:
        if not challenge.title or not challenge.task or not challenge.hint or not challenge.solution:
            problems.append(f"Challenge is incomplete: {challenge.title!r}")

    for section, example in all_examples():
        if not example.runnable:
            continue
        try:
            run_code(example.code)
        except Exception as exc:
            problems.append(f"Runnable example failed in {section.title}: {example.title}: {exc}")

    if problems:
        print("Self-test failed:")
        for problem in problems:
            print("- " + problem)
        return 1

    print("Self-test passed.")
    print(f"Sections: {len(SECTIONS)}")
    print(f"Examples: {len(all_examples())}")
    print(f"Challenges: {len(CHALLENGES)}")
    return 0


def main(argv: list[str]) -> int:
    if "--self-test" in argv:
        return self_test()
    chapter_select()
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
