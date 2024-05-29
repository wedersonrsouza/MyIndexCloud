# Use a imagem oficial do Python
FROM python:3.9-buster

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de requisitos para o contêiner
COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    libgl1-mesa-dev

RUN pip install --no-cache-dir -r requirements.txt

# # Copie o restante do código para o contêiner
# COPY . .

# Comando para executar o contêiner
CMD ["tail -f /dev/null"]
