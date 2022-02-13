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

def foo(s):
    print("\n**************\n")
    print(s)
    print(json.loads(s))

# Unpacking the array in an Excel field
def field_list_to_array(s):
    return s.replace('\',', '",').replace(', \'', ', "').replace('[\'','["').replace('\']','"]')

def main(inpath, outpath):
    import os
    import pandas as pd

    for filename in os.listdir(inpath):
        if filename.endswith(".xlsx"):
            df = pd.read_excel('../data/' + filename)
            # obfuscate
            df["Cluster Name"] = df["Cluster Name"].apply(mask.obf_str)
            print(df["Cluster Members"][0][0:60])
            # df["Cluster Members"][1] = '"'
            # df["Cluster Members"][-2] = '"'            
            # print(df["Cluster Members"][0].replace('\',', '",').replace(', \'', ', "').replace('[\'','["').replace('\']','"]')[0:60]);
            # print(json.loads(df["Cluster Members"][0].replace('\',', '",').replace(', \'', ', "').replace('[\'','["').replace('\']','"]'))[0])
            df["Cluster Members"] = df["Cluster Members"].apply(field_list_to_array)
            df["Cluster Members"] = df["Cluster Members"].apply(json.loads)
            df["Cluster Members"] = df["Cluster Members"].apply(mask.obf_arr)
            print(df["Cluster Members"])
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
