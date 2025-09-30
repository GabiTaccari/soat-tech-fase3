# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

RUN npx prisma generate

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "dev"]
