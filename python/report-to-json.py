#!/usr/bin/env python3

xlsx_inpath = "../data"
json_outpath = "../data"

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
            print(word.strip())
            word = word.strip().lower()
            for i in range(0, len(word) - 1):
                if not word[i] in markov_dict:
                    markov_dict[word[i]] = [word[i+1]]
                else:
                    markov_dict[word[i]].append(word[i+1])
    return markov_dict

foo = make_markov()
print(foo)
# main(xlsx_inpath, json_outpath)
