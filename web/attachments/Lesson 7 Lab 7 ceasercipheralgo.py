def generateKey(string, key):
    key = list(key)
    if len(string) == len(key):
        return key
    else:
        for i in range(len(string) - len(key)):
            key.append(key[i % len(key)])
    return "".join(key)

def encryption(string, key):
    encrypt_text = []
    for i in range(len(string)):
        x = (ord(string[i]) + ord(key[i])) % 26
        x += ord('A')
        encrypt_text.append(chr(x))
    return "".join(encrypt_text)

def decryption(encrypt_text, key):
    decrypt_text = []
    for i in range(len(encrypt_text)):
        x = (ord(encrypt_text[i]) - ord(key[i]) + 26) % 26
        x += ord('A')
        decrypt_text.append(chr(x))
    return "".join(decrypt_text)

if __name__ == "__main__":
    string = input("Enter the message: ").upper()
    keyword = input("Enter the keyword: ").upper()
    key = generateKey(string, keyword)
    encrypt_text = encryption(string, key)
    print("Generated Key:", key)
    print("Encrypted message:", encrypt_text)
    print("Decrypted message:", decryption(encrypt_text, key))
