[![pipeline status](https://gitlab.com/getmoredev/backend/api/badges/master/pipeline.svg)](https://gitlab.com/getmoredev/backend/api/commits/master)

# api

Esse é o repositório da API backend da GETMORE.

## Pré-requisitos

### 1. Instale o Docker
Siga as instruções de instalação [aqui](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository).

### 2. Instale o Docker Compose

    sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-Linux-x86_64
	sudo chmod +x /usr/local/bin/docker-compose

## Como desenvolver

Primeiro, copie o template do arquivo .env:

    cp .env.example .env

Agora, modifique o arquivo .env com os valores apropriados.

**Para iniciar o servidor, basta rodar `sudo docker-compose up --build`.**
