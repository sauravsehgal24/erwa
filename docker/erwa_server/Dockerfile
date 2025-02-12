# Use Ubuntu as base image
FROM ubuntu:latest

# Set non-interactive mode to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update package list and install required packages
RUN apt update && apt install -y \
    nodejs \
    npm \
    git \
    openssh-server \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Set up SSH
RUN mkdir /var/run/sshd

# Expose required ports
EXPOSE 22 8000 3000

# Start SSH and keep the container running
CMD ["/usr/sbin/sshd", "-D"]
