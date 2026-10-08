# Página de manutenção Aura

Página estática em HTML, pronta para publicação como stack no Portainer usando Docker e Nginx.

## Personalizar o logo

O logo já está incluído em `assets/aura_logo_dourado_degrade.png`. A imagem será exibida centralizada. Se o arquivo não existir, a página mostra o texto AURA como alternativa. Para usar outro nome/formato, altere o caminho do `<img>` em `index.html`.

## WhatsApp

O botão já está configurado para o número **(11) 96999-3165**, usando o formato internacional `5511969993165`. O link está no `href` do elemento `a.whatsapp` em `index.html`.

## Subir no Portainer

1. Envie este repositório para o GitHub/GitLab.
2. No Portainer, abra **Stacks** → **Add stack**.
3. Escolha **Repository**, informe a URL do repositório e a branch.
4. Use o `Dockerfile` da raiz para build da imagem, ou crie a imagem no seu pipeline e informe-a na stack.
5. Publique a porta do container `80` em uma porta livre do host ou configure seu proxy reverso para encaminhar para a porta `80` do container.

Exemplo de stack Docker Compose (ajuste o nome da imagem após construir e enviar para seu registry):

```yaml
services:
  aura-manutencao:
    image: seu-registry/aura-manutencao:latest
    ports:
      - "8081:80"
    restart: unless-stopped
```

Depois, acesse `http://IP-DO-SERVIDOR:8081` ou configure um domínio no proxy reverso apontando para o serviço.
