# // var Papa = require('papaparse');

# // var data = csv.toArrays('essays.csv');

# // for (let i = 0; i < data.length; i++) {
# //   console.log(data[i]);
# // }

# // Papa.parse('essays.csv', {
# //   complete: function (results) {
# //     console.log(results);
# //   }
# // });

from markdown import markdown
import csv
import pandas as pd
import os
from bs4 import BeautifulSoup

directory = '/Users/kassie/Desktop/Hack4Impact/prisoners-express/PE Contributions Database'
essays = []

for filename in os.listdir(directory):
    if filename.endswith(".md"):
      #print(filename)
      html = markdown(open(directory + '/' + filename).read())
      text = "".join(BeautifulSoup(html).findAll(text=True))
      essays.append(text)
    else:
      continue

csv_input = pd.read_csv('PE Contributions Database.csv')
csv_input["Text"] = ""


for x in range(len(essays)):
  # title = essays[x][:essays[x].find("\n")]
  try:
    start = essays[x].find('http')
    end = essays[x].find("\n", start)
    if start != -1 and end != -1:
      glink = essays[x][start:end]
      lines = essays[x].split("\n")
      res = "\n".join(lines[13:])
      # print(csv_input['Original Document (Google Doc)'])
      i = csv_input.index[csv_input['Original Document (Google Doc)'] == glink].tolist()
      if len(i) > 0:
        csv_input.at[i[0], 'Text'] = res
      else:
        continue
  except:
    continue

# try:
#   for x in range(len(essays)):
#     essays[x] = essays[x][(essays[x].find('Year'))+11:]
#     title = essays[x][essays[x].find('"'):essays[x].find('"',essays[x].find('"')+1)+1]
#     if title.find(':') != -1:
#       title = title[0:title.index(':')]
#     i = csv_input.index[csv_input['Name'].str.contains(title)].tolist()
#     if len(i) > 0:
#       csv_input.at[i[0], 'Text'] = essays[x]
# except:
#   print("here")


csv_input.to_csv('attempt2.csv')
# x = 0
# header = True
# with open('essays2.csv', 'r+') as f:
#     writer = csv.writer(f)
#     for row in f:
#       if header:
#         row = row
#         header = False
#       else:
#           for x in range
#           writer.writerows(row + essays[x])
#           x = x+1
#           print(row + essays[x])
          # print(row)

# with open('essays.csv') as f:
#     reader = csv.reader(f)
#     for row in reader:
#         print(row)

#  with open('essays.csv', 'r+') as f:
#         writer = csv.writer(f)
#         reader = csv.reader(f)
#         for row in reader:
#           writer.writerow(row + filename)
#   continue

# with open('myfile.csv', 'w') as f:
#     writer = csv.writer(f)
#     writer.r
#     writer.writerow(['Bob', '25', 'Manager', 'Seattle'])
#     writer.writerow(['Sam', '30', 'Developer', 'New York'])



