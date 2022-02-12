#!/usr/bin/env python3

from random import choice


xlsx_inpath = "../data"
json_outpath = "../data"

mask = None

class obfuscate:
    def __init__(self, markov_dict, seed_c="s"):
        self.md = markov_dict
        self.last_c = seed_c
    def __next__(self):
        return self.next()
    def next(self):
        self.last_c = choice(self.md[self.last_c])
        return self.last_c

def main(inpath, outpath):
    import os
    import pandas as pd

    for filename in os.listdir(inpath):
        if filename.endswith(".xlsx"):
            df = pd.read_excel('../data/' + filename)
            print(df)
            df.to_json("../data/" + filename[0:-5] + ".json", orient="records", indent=2)

def make_markov():
    import os
    markov_dict = {}
    with open("words.txt") as file:
        for word in file.readlines():
            word = word.strip().lower()
            for i in range(0, len(word) - 1):
                if not word[i] in markov_dict:
                    markov_dict[word[i]] = [word[i+1]]
                else:
                    markov_dict[word[i]].append(word[i+1])
    return markov_dict

mask = obfuscate(make_markov())
foo = ""
for i in range(1,100):
    foo = foo + mask.next()

print(foo)
# main(xlsx_inpath, json_outpath)
