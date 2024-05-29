import fitz


def extract_text_from_image_pdf(pdf_path):
    try:
        pdf_document = fitz.open(pdf_path)
        text = ""
        for page in pdf_document: # iterate the document pages
            text += page.get_text() # get plain text encoded as UTF-8
        
        return text
    except Exception as e:
        return f"Erro ao extrair texto: {str(e)}"

# if __name__ == "__main__":
#     pdf_file_path = "caminho/para/seu/arquivo.pdf"
#     extracted_text = extract_text_from_image_pdf(pdf_file_path)
#     print(extracted_text)
