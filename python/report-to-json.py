#!/usr/bin/env python3

import json
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
    def obf_str(self, s):
        outs = ""
        for l in s:
            if l.isalpha():
                outs += mask.next()
            else:
                outs += l
        return outs
    def obf_arr(self, arr):
        out_arr = []
        for s in arr:
            out_arr.append(self.obf_str(s))
        return out_arr

# Unpacking the array in an Excel field
def field_list_to_array(s):
    fixed = s.replace('\',', '",').replace(', \'', ', "').replace('[\'','["').replace('\']','"]')
    return json.loads(fixed)

def main(inpath, outpath):
    import os
    import pandas as pd

    for filename in os.listdir(inpath):
        if filename.endswith(".xlsx"):
            df = pd.read_excel('../data/' + filename)
            # convert field lists
            df["Cluster Members"] = df["Cluster Members"].apply(field_list_to_array)

            # obfuscate
            df["Cluster Name"] = df["Cluster Name"].apply(mask.obf_str)
            df["Cluster Members"] = df["Cluster Members"].apply(mask.obf_arr)

            # end obfuscate

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
main(xlsx_inpath, json_outpath)
