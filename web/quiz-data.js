// Static quiz banks for the Python Tutorial Library drill mode.
// These are practice questions, not secure graded exam data.

window.PY_TUTORIAL_QUIZZES = {
  lesson1: {
    lesson: "lesson1",
    title: "Lesson 1 Python Fundamentals Drill",
    questions: [
      {
        id: "l1-q1",
        type: "choice",
        text: "Which Python statement prints text to the console?",
        options: [
          { label: "A", text: "show(\"Hello\")" },
          { label: "B", text: "print(\"Hello\")" },
          { label: "C", text: "console.write(\"Hello\")" },
          { label: "D", text: "display Hello" }
        ],
        correctLabels: ["B"],
        hint: "Look for the built-in function introduced in the first program.",
        explanation: "print() sends values to the console. The string being printed belongs inside parentheses.",
        sourceRef: { label: "Review Lesson 1: Tools and First Output", href: "#study-tools", route: "study" }
      },
      {
        id: "l1-q2",
        type: "multi",
        text: "Select the variable names that follow normal Python naming rules.",
        options: [
          { label: "A", text: "student_name" },
          { label: "B", text: "2students" },
          { label: "C", text: "totalScore" },
          { label: "D", text: "class" }
        ],
        correctLabels: ["A", "C"],
        hint: "Names cannot start with a number and cannot be reserved keywords.",
        explanation: "student_name and totalScore are legal names. A name cannot begin with a digit, and class is a Python keyword.",
        sourceRef: { label: "Review Lesson 1: Variables and Types", href: "#study-variables", route: "study" }
      },
      {
        id: "l1-q3",
        type: "written",
        text: "What built-in function tells you the data type of a value?",
        acceptedAnswers: ["type"],
        hint: "It is commonly written with parentheses around the value.",
        explanation: "type(value) returns the class/type of the value, such as int, str, list, or dict.",
        sourceRef: { label: "Review Lesson 1: Variables and Types", href: "#study-variables", route: "study" }
      },
      {
        id: "l1-q4",
        type: "choice",
        text: "Which collection is mutable and uses square brackets?",
        options: [
          { label: "A", text: "tuple" },
          { label: "B", text: "list" },
          { label: "C", text: "set" },
          { label: "D", text: "dictionary" }
        ],
        correctLabels: ["B"],
        hint: "Mutable means items can be changed after the collection is created.",
        explanation: "Lists use square brackets and can be appended, removed from, sorted, reversed, and updated.",
        sourceRef: { label: "Review Lesson 1: Collections", href: "#study-collections", route: "study" }
      },
      {
        id: "l1-q5",
        type: "multi",
        text: "Which operators are used for membership checks in Python?",
        options: [
          { label: "A", text: "in" },
          { label: "B", text: "not in" },
          { label: "C", text: "is" },
          { label: "D", text: "==" }
        ],
        correctLabels: ["A", "B"],
        hint: "Membership asks whether a value appears inside a collection or string.",
        explanation: "in and not in check membership. is checks identity, and == checks equality.",
        sourceRef: { label: "Review Lesson 1: Operators", href: "#study-operators", route: "study" }
      }
    ]
  },

  lesson2: {
    lesson: "lesson2",
    title: "Lesson 2 Flow Control Drill",
    questions: [
      {
        id: "l2-q1",
        type: "choice",
        text: "What does an if statement do?",
        options: [
          { label: "A", text: "Repeats code a fixed number of times" },
          { label: "B", text: "Runs a block only when a condition is true" },
          { label: "C", text: "Imports a module" },
          { label: "D", text: "Creates a string" }
        ],
        correctLabels: ["B"],
        hint: "Think of a branch in the program.",
        explanation: "if creates conditional branching. The indented block runs only when the condition evaluates to True.",
        sourceRef: { label: "Review Lesson 2: Conditional Logic", href: "#lesson2-if", route: "lesson2-study" }
      },
      {
        id: "l2-q2",
        type: "multi",
        text: "Which statements can change how a loop continues?",
        options: [
          { label: "A", text: "break" },
          { label: "B", text: "continue" },
          { label: "C", text: "elif" },
          { label: "D", text: "import" }
        ],
        correctLabels: ["A", "B"],
        hint: "One leaves the loop; one jumps to the next iteration.",
        explanation: "break exits a loop early. continue skips the rest of the current iteration and moves to the next one.",
        sourceRef: { label: "Review Lesson 2: Loop Control", href: "#lesson2-break", route: "lesson2-study" }
      },
      {
        id: "l2-q3",
        type: "written",
        text: "What function is commonly used with for loops to produce a sequence of numbers?",
        acceptedAnswers: ["range"],
        hint: "It can be called with start, stop, and step values.",
        explanation: "range() creates an iterable sequence of integers, which is often used to control for loops.",
        sourceRef: { label: "Review Lesson 2: Loops", href: "#lesson2-loops", route: "lesson2-study" }
      },
      {
        id: "l2-q4",
        type: "choice",
        text: "In Python, what must be indented after an if, for, or while header?",
        options: [
          { label: "A", text: "The code block controlled by the header" },
          { label: "B", text: "Only comments" },
          { label: "C", text: "Only import statements" },
          { label: "D", text: "Nothing; indentation is optional" }
        ],
        correctLabels: ["A"],
        hint: "Python uses indentation as structure.",
        explanation: "The indented block belongs to the control statement above it. Incorrect indentation changes meaning or causes errors.",
        sourceRef: { label: "Review Lesson 2: Blocks and Flow", href: "#lesson2-flow", route: "lesson2-study" }
      },
      {
        id: "l2-q5",
        type: "multi",
        text: "Which are common command-line argument concepts?",
        options: [
          { label: "A", text: "sys.argv stores command-line inputs" },
          { label: "B", text: "Arguments always arrive as integers" },
          { label: "C", text: "argparse can define named options" },
          { label: "D", text: "Command-line inputs often need conversion before math" }
        ],
        correctLabels: ["A", "C", "D"],
        hint: "Command-line data is text until your program converts it.",
        explanation: "sys.argv and argparse can read command-line input. Those values are text strings unless converted.",
        sourceRef: { label: "Review Lesson 2: Command-Line Arguments", href: "#lesson2-cli", route: "lesson2-study" }
      }
    ]
  },

  lesson3: {
    lesson: "lesson3",
    title: "Lesson 3 Functions Drill",
    questions: [
      {
        id: "l3-q1",
        type: "choice",
        text: "What keyword sends a value back from a function?",
        options: [
          { label: "A", text: "return" },
          { label: "B", text: "print" },
          { label: "C", text: "def" },
          { label: "D", text: "yielded" }
        ],
        correctLabels: ["A"],
        hint: "Printing shows a value, but does not give it back to the caller.",
        explanation: "return gives a value back to the code that called the function.",
        sourceRef: { label: "Review Lesson 3: Function Basics", href: "#lesson3-define-call", route: "lesson3-study" }
      },
      {
        id: "l3-q2",
        type: "multi",
        text: "Which statements describe function parameters and arguments correctly?",
        options: [
          { label: "A", text: "A parameter is a name in the function definition" },
          { label: "B", text: "An argument is a value passed into the call" },
          { label: "C", text: "Every function must have at least one parameter" },
          { label: "D", text: "Parameters can make a function reusable" }
        ],
        correctLabels: ["A", "B", "D"],
        hint: "Compare the function definition to the function call.",
        explanation: "Parameters are placeholders in the definition. Arguments are the real values supplied during the call.",
        sourceRef: { label: "Review Lesson 3: Parameters", href: "#lesson3-parameters", route: "lesson3-study" }
      },
      {
        id: "l3-q3",
        type: "written",
        text: "What is the name for a function that calls itself?",
        acceptedAnswers: ["recursive", "recursion"],
        hint: "It needs a base case to stop.",
        explanation: "A recursive function calls itself. A base case prevents it from calling itself forever.",
        sourceRef: { label: "Review Lesson 3: Recursion", href: "#lesson3-recursion", route: "lesson3-study" }
      },
      {
        id: "l3-q4",
        type: "choice",
        text: "What does lambda create?",
        options: [
          { label: "A", text: "A short anonymous function" },
          { label: "B", text: "A module folder" },
          { label: "C", text: "A file object" },
          { label: "D", text: "A dictionary key" }
        ],
        correctLabels: ["A"],
        hint: "It is often used when a small function is needed temporarily.",
        explanation: "lambda creates a small anonymous function expression.",
        sourceRef: { label: "Review Lesson 3: Lambda", href: "#lesson3-lambda", route: "lesson3-study" }
      },
      {
        id: "l3-q5",
        type: "multi",
        text: "Which statements about map() and filter() are correct?",
        options: [
          { label: "A", text: "map() transforms each item" },
          { label: "B", text: "filter() keeps items that pass a test" },
          { label: "C", text: "filter() always changes every item" },
          { label: "D", text: "Both can work with functions" }
        ],
        correctLabels: ["A", "B", "D"],
        hint: "One transforms; one selects.",
        explanation: "map() applies a function to items. filter() keeps items where the function returns a truthy result.",
        sourceRef: { label: "Review Lesson 3: map and filter", href: "#lesson3-filter-map", route: "lesson3-study" }
      }
    ]
  },

  lesson4: {
    lesson: "lesson4",
    title: "Lesson 4 Files and Modules Drill",
    questions: [
      {
        id: "l4-q1",
        type: "choice",
        text: "Why is with open(...) commonly preferred for file handling?",
        options: [
          { label: "A", text: "It automatically closes the file when the block ends" },
          { label: "B", text: "It converts all files to JSON" },
          { label: "C", text: "It prevents all syntax errors" },
          { label: "D", text: "It only works for binary files" }
        ],
        correctLabels: ["A"],
        hint: "The context manager handles cleanup.",
        explanation: "with open(...) uses a context manager, which closes the file even if an error happens inside the block.",
        sourceRef: { label: "Review Lesson 4: File Handling", href: "#lesson4-files", route: "lesson4-study" }
      },
      {
        id: "l4-q2",
        type: "multi",
        text: "Which file modes are commonly used with open()?",
        options: [
          { label: "A", text: "r for reading" },
          { label: "B", text: "w for writing and replacing" },
          { label: "C", text: "a for appending" },
          { label: "D", text: "z for automatic formatting" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Think read, write, append.",
        explanation: "r reads, w writes from the start and can replace existing contents, and a appends to the end.",
        sourceRef: { label: "Review Lesson 4: File Modes", href: "#lesson4-open", route: "lesson4-study" }
      },
      {
        id: "l4-q3",
        type: "written",
        text: "What Python keyword loads another module?",
        acceptedAnswers: ["import"],
        hint: "You used it with standard library modules.",
        explanation: "import loads a module so your program can use functions, classes, or variables defined there.",
        sourceRef: { label: "Review Lesson 4: Modules", href: "#lesson4-modules", route: "lesson4-study" }
      },
      {
        id: "l4-q4",
        type: "choice",
        text: "What does __init__.py traditionally indicate inside a folder?",
        options: [
          { label: "A", text: "The folder can behave like a Python package" },
          { label: "B", text: "The folder contains only images" },
          { label: "C", text: "The folder is deleted after import" },
          { label: "D", text: "The folder cannot contain modules" }
        ],
        correctLabels: ["A"],
        hint: "Packages organize related modules.",
        explanation: "__init__.py is associated with package initialization and package structure.",
        sourceRef: { label: "Review Lesson 4: Packages", href: "#lesson4-packages", route: "lesson4-study" }
      },
      {
        id: "l4-q5",
        type: "multi",
        text: "Which habits help when working with inventory or record files?",
        options: [
          { label: "A", text: "Use consistent field order" },
          { label: "B", text: "Validate data before saving" },
          { label: "C", text: "Ignore file paths completely" },
          { label: "D", text: "Keep read and write behavior clear" }
        ],
        correctLabels: ["A", "B", "D"],
        hint: "Record files become easier when structure is predictable.",
        explanation: "Consistent records, validation, and clear file modes help prevent broken inventory files.",
        sourceRef: { label: "Review Lesson 4: Inventory Files", href: "#lesson4-write-read", route: "lesson4-study" }
      }
    ]
  },

  lesson5: {
    lesson: "lesson5",
    title: "Lesson 5 Pandas Drill",
    questions: [
      {
        id: "l5-q1",
        type: "choice",
        text: "Which Pandas object is a two-dimensional table with rows and columns?",
        options: [
          { label: "A", text: "Series" },
          { label: "B", text: "DataFrame" },
          { label: "C", text: "Tuple" },
          { label: "D", text: "Exception" }
        ],
        correctLabels: ["B"],
        hint: "It is the main table structure in Pandas.",
        explanation: "A DataFrame stores tabular data in rows and columns.",
        sourceRef: { label: "Review Lesson 5: DataFrames", href: "#lesson5-dataframes", route: "lesson5-study" }
      },
      {
        id: "l5-q2",
        type: "multi",
        text: "Which operations are common Pandas data inspection steps?",
        options: [
          { label: "A", text: "head()" },
          { label: "B", text: "tail()" },
          { label: "C", text: "describe()" },
          { label: "D", text: "teleport()" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Inspection means looking at shape, samples, and summaries.",
        explanation: "head(), tail(), and describe() are common inspection methods.",
        sourceRef: { label: "Review Lesson 5: Analysis", href: "#lesson5-analysis", route: "lesson5-study" }
      },
      {
        id: "l5-q3",
        type: "written",
        text: "What Pandas function reads a CSV file into a DataFrame?",
        acceptedAnswers: ["read_csv"],
        hint: "It belongs to the pandas module and includes CSV in the name.",
        explanation: "pd.read_csv() reads comma-separated data into a DataFrame.",
        sourceRef: { label: "Review Lesson 5: Reading Files", href: "#lesson5-reading", route: "lesson5-study" }
      },
      {
        id: "l5-q4",
        type: "choice",
        text: "What does groupby() usually prepare data for?",
        options: [
          { label: "A", text: "Grouped summaries or aggregations" },
          { label: "B", text: "Deleting Python itself" },
          { label: "C", text: "Turning a DataFrame into a keyword" },
          { label: "D", text: "Preventing all missing data" }
        ],
        correctLabels: ["A"],
        hint: "It groups rows by shared values.",
        explanation: "groupby() separates data into groups, then an aggregation such as sum(), mean(), or count() can summarize each group.",
        sourceRef: { label: "Review Lesson 5: Analysis", href: "#lesson5-analysis", route: "lesson5-study" }
      },
      {
        id: "l5-q5",
        type: "multi",
        text: "Which warnings about Pickle are correct?",
        options: [
          { label: "A", text: "Only unpickle data from trusted sources" },
          { label: "B", text: "Pickle is Python-specific" },
          { label: "C", text: "Pickle is always the best format for public data exchange" },
          { label: "D", text: "Pickle can store Python objects as bytes" }
        ],
        correctLabels: ["A", "B", "D"],
        hint: "Pickle is useful, but not a universal safe format.",
        explanation: "Pickle can serialize Python objects, but loading untrusted pickle data is unsafe and the format is Python-specific.",
        sourceRef: { label: "Review Lesson 5: Pickle", href: "#lesson5-pickle", route: "lesson5-study" }
      }
    ]
  },

  lesson6: {
    lesson: "lesson6",
    title: "Lesson 6 Exception Handling Drill",
    questions: [
      {
        id: "l6-q1",
        type: "choice",
        text: "Which block catches an exception in Python?",
        options: [
          { label: "A", text: "except" },
          { label: "B", text: "finally only" },
          { label: "C", text: "define" },
          { label: "D", text: "loop" }
        ],
        correctLabels: ["A"],
        hint: "It pairs with try.",
        explanation: "The except block handles exceptions raised inside the try block.",
        sourceRef: { label: "Review Lesson 6: try and except", href: "#lesson6-try-except", route: "lesson6-study" }
      },
      {
        id: "l6-q2",
        type: "multi",
        text: "Which are built-in exception types?",
        options: [
          { label: "A", text: "ValueError" },
          { label: "B", text: "ZeroDivisionError" },
          { label: "C", text: "IndexError" },
          { label: "D", text: "LoopHappyError" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "They describe common runtime problems.",
        explanation: "ValueError, ZeroDivisionError, and IndexError are built-in exception types.",
        sourceRef: { label: "Review Lesson 6: Built-In Exceptions", href: "#lesson6-builtins", route: "lesson6-study" }
      },
      {
        id: "l6-q3",
        type: "written",
        text: "What keyword can deliberately throw an exception?",
        acceptedAnswers: ["raise"],
        hint: "Use it when your program needs to signal a problem intentionally.",
        explanation: "raise starts an exception deliberately, often after detecting invalid data.",
        sourceRef: { label: "Review Lesson 6: Raising Exceptions", href: "#lesson6-raise", route: "lesson6-study" }
      },
      {
        id: "l6-q4",
        type: "choice",
        text: "When does the else block of try/except run?",
        options: [
          { label: "A", text: "When no exception was raised in the try block" },
          { label: "B", text: "Before try starts" },
          { label: "C", text: "Only when every exception is ignored" },
          { label: "D", text: "Only when finally fails" }
        ],
        correctLabels: ["A"],
        hint: "else means the try block completed normally.",
        explanation: "try/except/else uses else for code that should run only after the try block succeeds.",
        sourceRef: { label: "Review Lesson 6: else and finally", href: "#lesson6-else-finally", route: "lesson6-study" }
      },
      {
        id: "l6-q5",
        type: "multi",
        text: "Which are good validation habits?",
        options: [
          { label: "A", text: "Convert user input carefully" },
          { label: "B", text: "Catch only the exceptions you understand" },
          { label: "C", text: "Give users useful error messages" },
          { label: "D", text: "Silently ignore every error" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Validation is about controlled response, not hiding problems.",
        explanation: "Careful conversion, targeted exception handling, and clear feedback make programs safer and easier to debug.",
        sourceRef: { label: "Review Lesson 6: Validation Patterns", href: "#lesson6-validation", route: "lesson6-study" }
      }
    ]
  },

  lesson7: {
    lesson: "lesson7",
    title: "Lesson 7 Cryptography Drill",
    questions: [
      {
        id: "l7-q1",
        type: "choice",
        text: "What does symmetric encryption use?",
        options: [
          { label: "A", text: "The same shared key for encryption and decryption" },
          { label: "B", text: "No keys at all" },
          { label: "C", text: "Only a public key" },
          { label: "D", text: "Only a password hint" }
        ],
        correctLabels: ["A"],
        hint: "Symmetric means the key relationship is the same on both sides.",
        explanation: "Symmetric encryption uses a shared secret key to encrypt and decrypt.",
        sourceRef: { label: "Review Lesson 7: Symmetric Encryption", href: "#lesson7-symmetric", route: "lesson7-study" }
      },
      {
        id: "l7-q2",
        type: "multi",
        text: "Which are typical goals of cryptography?",
        options: [
          { label: "A", text: "Confidentiality" },
          { label: "B", text: "Integrity" },
          { label: "C", text: "Authentication" },
          { label: "D", text: "Making passwords visible" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Think of protecting secrecy, proving data was not altered, and proving identity.",
        explanation: "Cryptography can support confidentiality, integrity, authentication, and non-repudiation.",
        sourceRef: { label: "Review Lesson 7: Foundations", href: "#lesson7-foundations", route: "lesson7-study" }
      },
      {
        id: "l7-q3",
        type: "written",
        text: "What is the common name for a one-way value created from data to check integrity?",
        acceptedAnswers: ["hash", "digest", "message digest"],
        hint: "It should change when the original data changes.",
        explanation: "A hash or message digest is a one-way summary used to detect changes.",
        sourceRef: { label: "Review Lesson 7: Authentication", href: "#lesson7-authentication", route: "lesson7-study" }
      },
      {
        id: "l7-q4",
        type: "choice",
        text: "What does a digital certificate help bind together?",
        options: [
          { label: "A", text: "An identity and a public key" },
          { label: "B", text: "A string and a list" },
          { label: "C", text: "A loop and a variable" },
          { label: "D", text: "A private key and everyone on the internet" }
        ],
        correctLabels: ["A"],
        hint: "Certificates support trust in public-key systems.",
        explanation: "Digital certificates help connect an identity to a public key through a trusted certificate authority.",
        sourceRef: { label: "Review Lesson 7: Certificates", href: "#lesson7-certificates", route: "lesson7-study" }
      },
      {
        id: "l7-q5",
        type: "multi",
        text: "Which statements about passwords are good security practice?",
        options: [
          { label: "A", text: "Store password hashes, not plain-text passwords" },
          { label: "B", text: "Use salts to make attacks harder" },
          { label: "C", text: "Reuse one shared password for every account" },
          { label: "D", text: "Use slow password hashing algorithms where appropriate" }
        ],
        correctLabels: ["A", "B", "D"],
        hint: "Password storage should limit damage if a database is exposed.",
        explanation: "Password systems should hash and salt passwords. Plain-text storage is unsafe.",
        sourceRef: { label: "Review Lesson 7: Passwords", href: "#lesson7-passwords", route: "lesson7-study" }
      }
    ]
  },

  lesson8: {
    lesson: "lesson8",
    title: "Lesson 8 Scapy and Packet Analysis Drill",
    questions: [
      {
        id: "l8-q1",
        type: "choice",
        text: "What is Wireshark primarily used for?",
        options: [
          { label: "A", text: "Capturing and inspecting network packets" },
          { label: "B", text: "Editing Python keywords" },
          { label: "C", text: "Formatting spreadsheets only" },
          { label: "D", text: "Replacing all firewalls" }
        ],
        correctLabels: ["A"],
        hint: "It helps you see network traffic.",
        explanation: "Wireshark captures and displays packet traffic so analysts can inspect protocols and communication.",
        sourceRef: { label: "Review Lesson 8: Wireshark", href: "#lesson8-wireshark", route: "lesson8-study" }
      },
      {
        id: "l8-q2",
        type: "multi",
        text: "Which are Scapy packet concepts?",
        options: [
          { label: "A", text: "Layers can be stacked with /" },
          { label: "B", text: "Packets can be summarized" },
          { label: "C", text: "Packets can be sent and received" },
          { label: "D", text: "Packets are always legal to send on any network" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Scapy is powerful, so permission matters too.",
        explanation: "Scapy can build, summarize, send, receive, and inspect packets. Use it only in authorized environments.",
        sourceRef: { label: "Review Lesson 8: Scapy Purpose", href: "#lesson8-scapy-purpose", route: "lesson8-study" }
      },
      {
        id: "l8-q3",
        type: "written",
        text: "What Scapy function captures packets from the network?",
        acceptedAnswers: ["sniff"],
        hint: "It shares its name with the act of listening to traffic.",
        explanation: "sniff() captures packets, often with filters, counts, or callback functions.",
        sourceRef: { label: "Review Lesson 8: Sniffing", href: "#lesson8-sniffing", route: "lesson8-study" }
      },
      {
        id: "l8-q4",
        type: "choice",
        text: "Which Scapy command sends packets at layer 3?",
        options: [
          { label: "A", text: "send()" },
          { label: "B", text: "sendp()" },
          { label: "C", text: "print()" },
          { label: "D", text: "input()" }
        ],
        correctLabels: ["A"],
        hint: "Layer 2 sending includes the letter p.",
        explanation: "send() sends layer 3 packets. sendp() is used for layer 2 frames.",
        sourceRef: { label: "Review Lesson 8: Send and Receive", href: "#lesson8-send-receive", route: "lesson8-study" }
      },
      {
        id: "l8-q5",
        type: "multi",
        text: "Which tools or methods help inspect packet contents?",
        options: [
          { label: "A", text: "summary()" },
          { label: "B", text: "nsummary()" },
          { label: "C", text: "hexdump()" },
          { label: "D", text: "dropna()" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "These are packet-display helpers, not Pandas cleaning tools.",
        explanation: "summary(), nsummary(), and hexdump() are common Scapy inspection helpers.",
        sourceRef: { label: "Review Lesson 8: Commands", href: "#lesson8-commands", route: "lesson8-study" }
      }
    ]
  },

  lesson9: {
    lesson: "lesson9",
    title: "Lesson 9 Web Scraping Drill",
    questions: [
      {
        id: "l9-q1",
        type: "choice",
        text: "What should you check before scraping a website?",
        options: [
          { label: "A", text: "Terms of service, robots guidance, and permission boundaries" },
          { label: "B", text: "Only the color of the page" },
          { label: "C", text: "Whether Python keywords are uppercase" },
          { label: "D", text: "Nothing, because scraping is always allowed" }
        ],
        correctLabels: ["A"],
        hint: "Legal and ethical boundaries come before code.",
        explanation: "Scraping should respect terms, permissions, robots guidance, rate limits, and privacy.",
        sourceRef: { label: "Review Lesson 9: Legal and Ethical Boundaries", href: "#lesson9-legal", route: "lesson9-study" }
      },
      {
        id: "l9-q2",
        type: "multi",
        text: "Which libraries or tools appear in basic web scraping workflows?",
        options: [
          { label: "A", text: "requests" },
          { label: "B", text: "Beautiful Soup" },
          { label: "C", text: "Selenium" },
          { label: "D", text: "pickle.load as a browser" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "One downloads, one parses, and one can drive a browser.",
        explanation: "requests fetches pages, Beautiful Soup parses HTML, and Selenium automates browser interaction.",
        sourceRef: { label: "Review Lesson 9: Libraries", href: "#lesson9-libraries", route: "lesson9-study" }
      },
      {
        id: "l9-q3",
        type: "written",
        text: "Which HTTP method is commonly used to request a page or resource?",
        acceptedAnswers: ["get"],
        hint: "It is the method in requests.get().",
        explanation: "GET is commonly used to retrieve a page or resource from a server.",
        sourceRef: { label: "Review Lesson 9: Requests", href: "#lesson9-requests", route: "lesson9-study" }
      },
      {
        id: "l9-q4",
        type: "choice",
        text: "What does Beautiful Soup parse?",
        options: [
          { label: "A", text: "HTML or XML content" },
          { label: "B", text: "Only Python bytecode" },
          { label: "C", text: "Only encrypted passwords" },
          { label: "D", text: "Only CSV formulas" }
        ],
        correctLabels: ["A"],
        hint: "It helps navigate tags and elements.",
        explanation: "Beautiful Soup parses markup so code can search tags, text, attributes, and relationships.",
        sourceRef: { label: "Review Lesson 9: Beautiful Soup", href: "#lesson9-bs4", route: "lesson9-study" }
      },
      {
        id: "l9-q5",
        type: "multi",
        text: "Which are responsible scraper design choices?",
        options: [
          { label: "A", text: "Avoid sending too many rapid requests" },
          { label: "B", text: "Handle missing elements gracefully" },
          { label: "C", text: "Store extracted data in a clear format such as CSV or Excel" },
          { label: "D", text: "Assume every page structure stays the same forever" }
        ],
        correctLabels: ["A", "B", "C"],
        hint: "Real pages change, and servers deserve care.",
        explanation: "Good scrapers are respectful, defensive, and organized about output data.",
        sourceRef: { label: "Review Lesson 9: Export", href: "#lesson9-export", route: "lesson9-study" }
      }
    ]
  }
};
