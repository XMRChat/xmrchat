FROM ubuntu:22.04

# 1) Install curl, bash, ca-certificates, and expect
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  curl bash ca-certificates expect socat && \
  rm -rf /var/lib/apt/lists/*

# Download simplex-chat binary directly
RUN curl -L -o /usr/local/bin/simplex-chat \
  "https://github.com/simplex-chat/simplex-chat/releases/download/v6.4.5/simplex-chat-ubuntu-22_04-x86_64" && \
  chmod +x /usr/local/bin/simplex-chat

# Copy setup script to container
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 5225

ENTRYPOINT ["/entrypoint.sh"]