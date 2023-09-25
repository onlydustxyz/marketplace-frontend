FROM rust:1.72-bullseye AS builder

WORKDIR /app
COPY . .

RUN cargo build --workspace --release

ARG BIN_NAME
ARG DATADOG_LABEL

RUN cp /app/target/release/${BIN_NAME} /usr/local/bin/app

# Add labels
LABEL com.datadoghq.ad.logs=${DATADOG_LABEL}

# Install dependencies and CA certificates
RUN apt-get update && apt-get install -y libpq5 ca-certificates
RUN update-ca-certificates

# Configure Rocket to listen on exposed port 80
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=80
EXPOSE 80

# Create unprivileged app user
RUN adduser --disabled-password --gecos "" od-app-user
USER od-app-user:od-app-user

ENTRYPOINT ["/usr/local/bin/app"]
