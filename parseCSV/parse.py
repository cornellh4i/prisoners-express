from markdown import markdown
import csv
import pandas as pd
import os
from bs4 import BeautifulSoup

directory = r'/Users/danielbotros/H4I/prisoners-express/parseCSV/EssayArchive'
essays = []

for filename in os.listdir(directory):
    if filename.endswith(".md"):
      html = markdown(open(directory + '/' + filename).read())
      text = "".join(BeautifulSoup(html).findAll(text=True))
      essays.append(text)
    else:
      continue

n = 0
csv_input = pd.read_csv('essay.csv')
csv_input['Text'] = ""

try:
  for x in range(len(essays)):
    glink = essays[x][essays[x].find('http'):essays[x].find("\n",essays[x].find('http'))]
    essays[x] = essays[x][essays[x].find('Year')+11:]
    i = csv_input.index[csv_input['Original Document (Google Doc)'].str.contains(glink)].tolist() #accumulate empty essays
    if len(i) > 0:
      csv_input.at[i[n], 'Text'] = essays[x]
    #  n++
    #else:
    #  continue
except:
  pass

csv_input.to_csv('essay2.csv')