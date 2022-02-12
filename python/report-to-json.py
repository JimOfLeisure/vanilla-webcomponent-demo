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
            df.to_json("../data/" + filename[0:-4] + ".json", orient="records", indent=2)

main(xlsx_inpath, json_outpath)
