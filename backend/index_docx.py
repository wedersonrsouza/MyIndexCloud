import os
import re
import uuid
import docx2txt
from docx import Document
from elasticsearch import Elasticsearch

# import spacy


# def encontra_nomes(texto):
#     # Carregue o modelo de linguagem português do spaCy
#     nlp = spacy.load('pt_core_news_sm')

#     # Processe o texto
#     doc = nlp(texto)

#     lista_nomes = []
#     # Itere sobre as entidades e imprima as que são pessoas
#     for entidade in doc.ents:
#         if entidade.label_ == 'PER':
#             # print(entidade.text)
#             lista_nomes.append(entidade.text)

#     return lista_nomes



def read_docx(file_path):
    
    if str(file_path).endswith('.docx'):
        doc = Document(file_path)
        result = ' '.join([p.text for p in doc.paragraphs])
        return result
    elif str(file_path).endswith('.doc'):
        text = docx2txt.process(file_path)
        return text
        


