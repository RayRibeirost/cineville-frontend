# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Instala o bash
RUN apk add --no-cache bash

WORKDIR /app

# Copia os arquivos de dependências e instala todas as dependências (incluindo as de desenvolvimento)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts --network-timeout-100000

# Copia o arquivo .env necessário para o build
COPY .env ./

# Copia todo o código da aplicação para dentro do container
COPY . .

# Compila o código (ajuste o comando conforme definido no seu package.json)
RUN yarn build

# Etapa 2: Imagem final de produção
FROM node:20-alpine

WORKDIR /app

# Forçar o Docker a esperar o build da Etapa 1 terminar 100%.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/public ./public

# Instala o bash e o curl na imagem final
RUN apk add --no-cache bash curl

# Copia os arquivos de dependências para instalar somente as dependências de produção
RUN yarn install --frozen-lockfile --ignore-scripts --network-timeout-600000
RUN npm install --save --legacy-peer-deps @sentry/node @sentry/tracing

# Expõe a porta que a aplicação irá utilizar
EXPOSE $PORT

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
