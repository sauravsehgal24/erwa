# Use the lightweight Alpine-based PostgreSQL image
FROM postgres:alpine

# Set environment variables
ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=YourStrongPassword \
    POSTGRES_DB=erwadb

# Expose PostgreSQL default port
EXPOSE 5432

# Allow remote connections by modifying postgresql.conf
# RUN echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf \
#     && echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

# Start PostgreSQL
CMD ["postgres"]
